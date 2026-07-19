import { generateResponse } from "../config/groq.js";
import { User } from "../models/userModel.js";
import { Website } from "../models/websiteModel.js";
import extractJson from "../utils/extractJson.js";
import mongoose from "mongoose";

const masterPrompt = `
YOU ARE A SENIOR PRODUCT DESIGNER AND FRONTEND ENGINEER who builds visually striking, award-worthy websites, not generic templates.

TASK: Build a complete production-ready website for this request:
{USER_PROMPT}

TECH:
- Only HTML, Tailwind CSS, JS. One complete HTML document.
- Always include in <head>:
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet"/>
  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
- Use Tailwind utility classes for ALL styling. Write custom CSS only if Tailwind absolutely cannot handle it.
- Exactly one <script> tag (excluding CDN scripts). Initialize AOS with AOS.init() inside it.
- ALWAYS structure JS into named functions (renderHero(), renderNavbar(), renderFooter(), initApp()). Call all from initApp() at bottom.
- ES6+ only — const/let, arrow functions, template literals, querySelector. Zero var, zero jQuery.

DESIGN SYSTEM (MANDATORY):
- Color: one bold accent color (not default blue/gray) + at least one gradient (bg, button, or text) via Tailwind gradient classes. Avoid plain white sections — use tints, dark sections, or alternate light/dark.
- Typography: hero heading 48-72px, bold, tight line-height. Clear scale: hero > headings > body > captions. Use clamp() for fluid sizing.
- Layout: generous whitespace (py-20 to py-36). Use Grid/Flexbox creatively — avoid plain centered card grids only; add asymmetry, overlap, or decorative shapes.
- Depth: use Tailwind shadow classes (shadow-xl, shadow-2xl), rounded-2xl or rounded-3xl, subtle background gradients/patterns.
- Motion: use AOS attributes (data-aos="fade-up", data-aos="fade-right" etc.) for entrance animations. Hover = Tailwind hover: classes (scale, shadow growth), transitions duration-300.
- WOW FACTOR (MANDATORY): add exactly one — pick what fits the site: particle/floating background, parallax hero, glassmorphism cards (backdrop-blur), animated gradient blob, typewriter heading, custom cursor, or animated counters.
- Images: if no real source available, use Tailwind bg-gradient + rounded shapes or inline SVG instead of broken image boxes.

RESPONSIVE:
- Mobile-first using Tailwind responsive prefixes (sm: md: lg:). No horizontal scroll, touch targets ≥44px.

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