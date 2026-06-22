import { generateResponse } from "../config/groq.js";
import { User } from "../models/userModel.js";
import { Website } from "../models/websiteModel.js";
import extractJson from "../utils/extractJson.js";

const masterPrompt = `
YOU ARE A SENIOR PRODUCT DESIGNER AND FRONTEND ENGINEER who builds visually striking, award-worthy websites, not generic templates.

TASK: Build a complete production-ready website for this request:
{USER_PROMPT}

TECH:
- Only HTML, CSS, JS. One complete HTML document.
- Exactly one <style> and one <script> tag.
- No external libraries. System fonts only (pair a bold display stack for headings with a clean stack for body).

DESIGN SYSTEM (MANDATORY):
- Color: one bold accent color (not default blue/gray) + at least one gradient (bg, button, or text). Avoid plain white sections — use tints, dark sections, or alternate light/dark.
- Typography: hero heading 48-72px, bold, tight line-height. Clear scale: hero > headings > body > captions.
- Layout: generous whitespace (80-140px section padding). Use Grid/Flexbox creatively — avoid plain centered card grids only; add asymmetry, overlap, or decorative shapes.
- Depth: soft shadows (e.g. 0 20px 60px rgba(0,0,0,0.12)), 16-24px border-radius, subtle background shapes/gradients/patterns.
- Motion: entrance animations on scroll/load, hover = transform (scale/lift/shadow growth), transitions 0.3-0.5s ease.
- Images: if no real source available, use CSS/inline SVG shapes instead of empty broken image boxes.

RESPONSIVE:
- Mobile-first, no horizontal scroll, touch targets ≥44px, use clamp() for fluid type/spacing.

CONTENT:
- Realistic, specific content matching the site type. No lorem ipsum, no placeholders.

FUNCTIONALITY:
- All buttons/nav must work (smooth scroll, toggles, validation). No broken JS, no null refs.

SITE TYPE:
- Build sections that fit the actual request (game→playable UI, portfolio→projects, SaaS→features/pricing/CTA, e-commerce→products/cart, restaurant→menu). Don't force Home/About/Services/Contact if irrelevant.

CODE QUALITY:
- Proper indentation, readable, no minified code, no markdown, no explanations.

RETURN YOUR RESPONSE IN EXACTLY THIS FORMAT (no markdown, no extra text, no code fences):

---MESSAGE---
Short confirmation here
---CODE---
<FULL HTML DOCUMENT HERE>
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

    DESIGN SYSTEM (KEEP CONSISTENT WHEN EDITING):
    - Maintain bold accent color + gradient usage.
    - Keep soft shadows (0 20px 60px rgba(0,0,0,0.12)) and 16-24px border-radius.
    - Keep hover transforms and smooth transitions (0.3-0.5s ease).
    - Keep mobile-first responsiveness, no horizontal scroll.
    - No lorem ipsum or placeholders.

    RETURN YOUR RESPONSE IN EXACTLY THIS FORMAT (no markdown, no extra text, no code fences):

    ---MESSAGE---
    Short confirmation here
    ---CODE---
    <FULL UPDATED HTML DOCUMENT HERE>
    ---END---
    `

    let raw = ""
    let parsed = null
    for (let i = 0; i < 2 && !parsed; i++) {
      raw = await generateResponse(udpatePrompt)
      parsed = await extractJson(raw)

      if (!parsed) {
        raw = await generateResponse(udpatePrompt + "\n\nFOLLOW THE EXACT FORMAT: ---MESSAGE--- ... ---CODE--- ... ---END---")
        parsed = await extractJson(raw)
      }
    }

    if (!parsed || !parsed.code) {
      return res.status(400).json({ message: "AI returned an invalid response. Please try again." })
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