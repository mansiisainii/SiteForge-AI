import { generateResponse } from "../config/groq.js";
import { User } from "../models/userModel.js";
import { Website } from "../models/websiteModel.js";
import extractJson from "../utils/extractJson.js";
import mongoose from "mongoose";

const masterPrompt = `
YOU ARE AN EXPERT FRONTEND DEVELOPER who builds 
complete, professional websites with real content 
and working functionality.

TASK: Build a complete website for this request:
{USER_PROMPT}

TECH:
- Single HTML file.
- Always include in <head>:
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet"/>
  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"/>
- AOS.init({ duration: 700, once: true }) in body onload.
- Custom CSS variables for brand colors in <style> tag.
- ES6+ only. Zero var, zero jQuery.

DESIGN:
- Choose color scheme that naturally fits the request.
  DO NOT force dark or light — use your judgment:
  Restaurant/bakery/wedding → warm light theme
  Tech/gaming/portfolio/SaaS → dark theme
  Health/nature → soft light greens
  Fashion → minimal black/white
- Define ONE primary brand color as CSS variable:
  :root { --primary: #HEXCODE; }
  Use it consistently on headings, buttons, accents.
- Typography: clear hierarchy, serif for elegant sites,
  sans-serif for modern/tech sites.
- Cards: rounded-xl shadow-lg with hover:scale-105 
  transition-transform duration-300.
- All sections: py-20, container mx-auto px-6.

IMAGES:
- Use Picsum with descriptive seed names:
  <img src="https://picsum.photos/seed/{topic}/{w}/{h}"
  class="w-full h-48 object-cover rounded-xl"/>
- Every card/dish/product/person MUST have an image.
- Hero section MUST have a full background image:
  style="background-image: url('https://picsum.photos/seed/hero-{topic}/1920/1080')"
  with a dark overlay div on top.
- Unique descriptive seed per image (calamari, steak, 
  team1, product-shoe, blog-tech etc.)

CONTENT — STRICT RULES:
- Real creative brand name. Never generic.
- Real item names, real prices, real descriptions.
- BANNED: "Product 1", "Item 1", "Lorem ipsum", 
  "Description here", placeholder text of any kind.
- Minimum 6 items in any listing/menu/product section.
- All text must feel like a real business wrote it.

HERO — MANDATORY:
- Full viewport height: class="relative h-screen bg-cover bg-center"
- Dark overlay: <div class="absolute inset-0 bg-black opacity-60">
- Real brand name in large bold text
- Compelling tagline
- 2 CTA buttons (primary filled + secondary outlined)
- data-aos="fade-up" with delays on each element

NAVBAR — MANDATORY:
- Sticky top with backdrop blur or solid bg
- Brand logo/name on left
- Nav links on right with smooth scroll
- CTA button (Book/Get Started/Shop Now)

SECTIONS — BUILD WHAT FITS:
- Restaurant: hero→menu(appetizers/mains/desserts)→about(2col)→hours+location(grid+map embed)→reservations(form)→footer
- SaaS/Tech: hero→features(3col grid)→how it works→pricing(3 tiers, middle highlighted)→testimonials→footer
- Ecommerce: announcement bar→hero→categories→products(grid)→cart section→footer
- Portfolio: hero(full screen)→about→skills(badges/grid)→projects(cards)→contact(form)→footer
- Blog: hero→featured article→article grid→sidebar→newsletter→footer
- Game: full playable canvas, HUD, score, restart, keyboard controls shown
- Other: infer best sections intelligently from the request

FUNCTIONALITY — ALL MUST WORK:
- Navbar links smooth scroll to correct IDs.
- Tab/toggle systems fully functional.
- Forms: all inputs, validation, success message on submit.
- Cart: add/remove items, running total.
- Games: fully playable with score tracking.
- Google Maps embed in location sections.
- Font Awesome icons in footer social links.
- Zero broken JS. Zero null refs.

FOOTER — MANDATORY:
- Dark background (bg-gray-800 or bg-gray-900)
- Brand name + address + phone + email
- Social icons using Font Awesome (Facebook, Instagram, Twitter)
- Copyright line

CODE QUALITY:
- Clean indentation, readable.
- Custom CSS only for things Tailwind cannot do.
- No markdown, no explanations in output.

RETURN EXACTLY:
---MESSAGE---
One line confirmation
---CODE---
[complete HTML document]
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
       raw = await generateResponse(updatePrompt)
        console.log(`[Groq API] Attempt ${i + 1} response received.`);
      } catch (err) {
        console.error(`[Groq API] Attempt ${i + 1} crashed:`, err);
        return res.status(500).json({ message: "Error communicating with AI service" });
      }
      
      parsed = await extractJson(raw)

      if (!parsed) {
        console.log(`[Groq API] Retry ${i + 1} due to parsing failure...`);
        try {
         raw = await generateResponse(updatePrompt + "\n\nFOLLOW THE EXACT FORMAT: ---MESSAGE--- ... ---CODE--- ... ---END---")
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