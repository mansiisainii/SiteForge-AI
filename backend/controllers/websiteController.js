import { generateResponse } from "../config/groq.js";
import { User } from "../models/userModel.js";
import { Website } from "../models/websiteModel.js";
import extractJson from "../utils/extractJson.js";

const masterPrompt = `
YOU ARE AN EXPERT FRONTEND ENGINEER AND UI/UX DESIGNER.

TASK:
Create a complete production-ready website based on the user's request.

USER REQUEST:
{USER_PROMPT}

REQUIREMENTS:

1. TECHNOLOGY

* Use ONLY HTML, CSS, and JavaScript.
* Return ONE complete HTML document.
* Include exactly ONE <style> tag and ONE <script> tag.
* No external CSS libraries.
* No external JS libraries.
* Use system fonts only.

2. DESIGN

* Modern 2026-style UI.
* Beautiful layout and spacing.
* Professional color palette.
* Smooth animations and hover effects.
* Fully responsive on mobile, tablet, and desktop.

3. RESPONSIVENESS

* Mobile-first design.
* Use Flexbox and Grid where appropriate.
* No horizontal scrolling.
* Images must be responsive.
* Touch-friendly buttons.

4. CONTENT

* Generate realistic content.
* No lorem ipsum.
* No placeholders.
* Match the website type requested by the user.

5. FUNCTIONALITY

* Every button must work.
* Every navigation item must work.
* No broken JavaScript.
* No null element references.
* Forms must have validation.
* All interactive features must function correctly.

6. WEBSITE TYPE RULE
   IMPORTANT:
   Generate pages according to the user's request.

Examples:

* Game website → Build a playable game interface.
* Portfolio → Build portfolio sections.
* SaaS → Build SaaS landing page.
* E-commerce → Build product pages.
* Restaurant → Build restaurant website.

DO NOT force Home/About/Services/Contact if they don't fit the project.

7. CODE QUALITY

* Proper indentation.
* Readable code.
* No minified code.
* No markdown.
* No explanations.

RETURN RAW JSON ONLY:

{
"message": "Short confirmation",
"code": "<FULL HTML DOCUMENT>"
}

ABSOLUTE RULES:

* Return valid JSON only.
* Escape all quotes properly.
* Do not wrap response in markdown.
* Do not include any text outside JSON.
`;

export const generateWebsite = async (req, res) => {
  try {
    const { prompt } = req.body
    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" })
    }
    const user = await User.findById(req.user._id)
    if (!user) {
      return res.status(400).json({ message: "User not found" })
    }

    if (user.credits < 10) {
      return res.status(400).json({ message: "You have not enough credits to generate a website" })
    }

    const finalPrompt = masterPrompt.replace("{USER_PROMPT}", prompt)
    let raw = ""
    let parsed = null
    //we used for loop because ai doesnt give response in one time sometimes so thats why we gave second chance to ai
    for (let i = 0; i < 1 && !parsed; i++) {
      raw = await generateResponse(finalPrompt)
      parsed = await extractJson(raw)

      if (!parsed ) {
        raw = await generateResponse(finalPrompt + "\n\nRETURN ONLY RAW JSON")
        parsed = await extractJson(raw)
      }
    }
    if (!parsed.code) {
      return res.status(400).json({ message: "AI returned invalid response" })
    }
    const website = await Website.create({
      user: user._id,
      title: prompt.slice(0, 60),
      latestCode: parsed.code,
      conversation: [
        { role: "user", content: prompt },
        { role: "ai", content: parsed.message }
      ]
    })
    user.credits = user.credits - 10
    await user.save()
    return res.status(201).json({
      websiteId: website._id,
      remainingCredits: user.credits
    })
  } catch (error) {
  console.error("GENERATE WEBSITE ERROR:");
  console.error(error);

  return res.status(500).json({
    message: error.message,
  });
}
}

export const getWebsiteById = async (req, res) => {
  try {
    const website = await Website.findOne({
      _id: req.params.id,
      user: req.user._id
    })
    if (!website) {
      return res.status(400).json({ message: "Website not found" })
    }
    return res.status(200).json(website)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const changeWebsite = async (req, res) => {
  try {
    const { prompt } = req.body
    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" })
    }
    const website = await Website.findOne({
      _id: req.params.id,
      user: req.user._id
    })
    if (!website) {
      return res.status(400).json({ message: "Website not found" })
    }
    const user = await User.findById(req.user._id)
    if (!user) {
      return res.status(400).json({ message: "User not found" })
    }

    if (user.credits < 5) {
      return res.status(400).json({ message: "You have not enough credits to generate a website" })
    }

    const udpatePrompt = `
    UPDATE THIS HTML WEBSITE.
    
    CURRENT CODE:
    ${website.latestCode}

    USER REQUEST:
    ${prompt}

    RETURN RAW JSON ONLY:
    {
      "message":"Short confirmation",
      "code":"<UPDATE FULL HTML>"
    }
    `

    let raw = ""
    let parsed = null
    for (let i = 0; i < 2 && !parsed; i++) {
      raw = await generateResponse(udpatePrompt)
      parsed = await extractJson(raw)

      if (!parsed) {
        raw = await generateResponse(udpatePrompt + "\n\nRETURN ONLY RAW JSON")
        parsed = await extractJson(raw)
      }
    }
    if (!parsed.code) {
      return res.status(400).json({ message: "AI returned invalid response" })
    }

    website.conversation.push(
      { role: "ai", content: parsed.message },
      { role: "user", content: prompt },
    )

    website.latestCode = parsed.code
    await website.save()
    user.credits = user.credits - 5
    await user.save()
    return res.status(200).json({
      message: parsed.message,
      code: parsed.code,
      remainingCredits: user.credits
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getAllWebsite = async (req, res) => {
  try {
    const websites = await Website.find({ user: req.user._id })
    return res.status(200).json(websites)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const deployWebsite = async (req, res) => {
  try {
    const website = await Website.findOne({
      _id: req.params.id,
      user: req.user._id
    })

    if (!website) {
      return res.status(400).json({ message: "Website not found" })
    }
    if (!website.slug) {
      website.slug = website.title.toLowerCase().replace(/[^a-z0-9]/g,"").slice(0, 60) + website._id.toString().slice(-5)
    }

    website.deployed = true
    website.deployUrl = `${process.env.FRONTEND_URL}/site/${website.slug}`
    await website.save()

    return res.status(200).json({
      url: website.deployUrl
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getBySlug = async (req, res) => {
  try {  
    const website = await Website.findOne({
      slug: req.params.slug
    })
    if (!website) {
      return res.status(400).json({ message: "Website not found" })
    }
    return res.status(200).json(website)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}