import { generateResponse } from "../config/groq.js";
import { User } from "../models/userModel.js";
import { Website } from "../models/websiteModel.js";
import extractJson from "../utils/extractJson.js";
import mongoose from "mongoose";

const masterPrompt = `
YOU ARE AN EXPERT FRONTEND DEVELOPER. Build exactly what is requested — no assumptions, no forced styles.

TASK: Build a complete website for this request:
{USER_PROMPT}

TECH:
- Single HTML file. Tailwind CSS + AOS via CDN.
- Include in <head>:
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet"/>
  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
- AOS.init({ duration: 700, once: true }) in script tag.
- ES6+ only. Zero var, zero jQuery.

DESIGN — USE JUDGMENT:
- Choose color scheme that fits the request naturally.
  Light site if it suits (bakery, kids, wedding, health).
  Dark site if it suits (tech, gaming, portfolio, SaaS).
  Don't force dark or light — match the vibe.
- Pick accent colors naturally. No restrictions.
- Typography: clear hierarchy, hero heading large and bold.
- Layout: clean, well-spaced, visually balanced.
- Cards: consistent border-radius, subtle shadow, padding.
- Animations: AOS on section entries, hover transitions.

IMAGES:
- Use Picsum for all images:
  <img src="https://picsum.photos/seed/{name}/{w}/{h}"
  class="w-full h-48 object-cover rounded-xl"/>
- Every card/product/dish/person needs an image.
- Unique seed per image. NEVER invented URLs.

CONTENT:
- Real names, real prices, real descriptions.
- BANNED: "Product 1", "Item 1", "Lorem ipsum",
  "Description here", generic placeholder text.
- Minimum 6 items in any listing section.
- Brand/site name must be creative and relevant.

HERO:
- Always full and complete — never minimal or empty.
- Real brand name + tagline + image + CTA buttons.

SECTIONS:
- Build what makes sense for the request.
- SaaS → hero, features, pricing, footer.
- Restaurant → hero, menu, about, hours, footer.
- Ecommerce → hero, products, cart, footer.
- Portfolio → hero, skills, projects, contact, footer.
- Game → playable canvas, score, restart, controls.
- Use your judgment for anything else.

FUNCTIONALITY:
- All nav links smooth scroll correctly.
- Tabs, toggles, forms all working.
- Cart functional for ecommerce.
- Games fully playable.
- Zero broken JS. Zero null refs.

RETURN EXACTLY:
---MESSAGE---
One line confirmation
---CODE---
[complete HTML]
---END---
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
    for (let i = 0; i < 2 && !parsed; i++) {
      raw = await generateResponse(finalPrompt)
      parsed = await extractJson(raw)

      if (!parsed) {
        raw = await generateResponse(finalPrompt + "\n\nFOLLOW THE EXACT FORMAT: ---MESSAGE--- ... ---CODE--- ... ---END---")
        parsed = await extractJson(raw)
      }
    }

    if (!parsed || !parsed.code) {
      return res.status(400).json({ message: "AI returned an invalid response. Please try again." })
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
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid website ID" })
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

    const updatePrompt = `
UPDATE THE FOLLOWING HTML WEBSITE BASED ON USER REQUEST.

CURRENT CODE:
${website.latestCode}

USER REQUEST:
${prompt}

RULES FOR UPDATING:
1. Make ONLY the changes the user requested. 
   Do not redesign or restructure anything else.
2. Keep all existing Tailwind classes, AOS animations, 
   and JS functions untouched unless user asked to change them.
3. Keep the same color scheme, layout, and design system.
4. Keep all working functionality intact.
5. Return the COMPLETE updated HTML file — not just the changed part.
6. No lorem ipsum, no placeholders in new content.
7. If user asks for new section/card — follow same card style 
   as existing ones (bg-white/5 border border-white/10 rounded-2xl).

RETURN EXACTLY THIS FORMAT (no markdown, no code fences):

---MESSAGE---
Short confirmation here
---CODE---
<FULL UPDATED HTML DOCUMENT HERE>
---END---
`
    let raw = ""
    let parsed = null
    for (let i = 0; i < 2 && !parsed; i++) {
      console.log(`[Groq API] Attempt ${i + 1} starting...`);
      try {
        raw = await generateResponse(udpatePrompt)
        console.log(`[Groq API] Attempt ${i + 1} response received.`);
      } catch (err) {
        console.error(`[Groq API] Attempt ${i + 1} crashed:`, err);
        return res.status(500).json({ message: "Error communicating with AI service" });
      }
      
      parsed = await extractJson(raw)

      if (!parsed) {
        console.log(`[Groq API] Retry ${i + 1} due to parsing failure...`);
        try {
          raw = await generateResponse(udpatePrompt + "\n\nFOLLOW THE EXACT FORMAT: ---MESSAGE--- ... ---CODE--- ... ---END---")
          console.log(`[Groq API] Retry ${i + 1} response received.`);
        } catch (err) {
          console.error(`[Groq API] Retry ${i + 1} crashed:`, err);
          return res.status(500).json({ message: "Error communicating with AI service" });
        }
        parsed = await extractJson(raw)
      }
    }

    if (!parsed || !parsed.code) {
      return res.status(400).json({ message: "AI returned an invalid response. Please try again." })
    }

    if (!website.conversation) {
      website.conversation = [];
    }
    website.conversation.push(
      { role: "user", content: prompt },
      { role: "ai", content: parsed.message || "Website updated." }
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
    console.error("CHANGE WEBSITE ERROR:");
    console.error(error);

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

export const saveTemplate = async (req, res) => {
  try {
    const { html, name } = req.body;
    if (!html || !name) {
      return res.status(400).json({ message: "HTML and name are required" });
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const website = await Website.create({
      user: user._id,
      title: name.slice(0, 60),
      latestCode: html,
      conversation: [
        { role: "user", content: `Create a ${name} website.` },
        { role: "ai", content: `I have created the ${name} template for you.` }
      ]
    });

    return res.status(201).json({
      websiteId: website._id,
      remainingCredits: user.credits
    });
  } catch (error) {
    console.error("SAVE TEMPLATE ERROR:");
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}