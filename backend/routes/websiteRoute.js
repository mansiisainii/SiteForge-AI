import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

import portfolio from '../templates/portfolio.js';
import saas from '../templates/saas.js';
import restaurant from '../templates/restaurant.js';
import ecommerce from '../templates/ecommerce.js';
import blog from '../templates/blog.js';
import agency from '../templates/agency.js';

const TEMPLATES = [
  { name: 'Portfolio', html: portfolio, gradient: "from-[#1a1a2e] to-[#2d1b69]" },
  { name: 'SaaS',  html: saas, gradient: "from-[#0a1628] to-[#1e3a5f]" },
  { name: 'Restaurant', html: restaurant, gradient: "from-[#1a0e00] to-[#3d2000]" },
  { name: 'E-commerce', html: ecommerce, gradient: "from-[#001a12] to-[#003d2a]" },
  { name: 'Blog',  html: blog, gradient: "from-[#0f0a1e] to-[#1e1240]" },
  { name: 'Agency', html: agency, gradient: "from-[#0a0a0a] to-[#1a1a1a]" },
];

const PHASES = [
  "Analyzing your idea...",
  "Designing layout and structure...",
  "Writing HTML and CSS...",
  "Adding animation and interaction...",
  "Final quality checks...",
];

const Generate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [error, setError] = useState("");
  const [loadingTemplateName, setLoadingTemplateName] = useState(null);
  const [activeTemplateIndex, setActiveTemplateIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const { userData } = useSelector((state) => state.user);

  const handleScroll = (e) => {
    const container = e.target;
    const index = Math.round(container.scrollLeft / 336); // 320px width + 16px gap
    setActiveTemplateIndex(index);
  };

  const handleUseTemplate = async (template) => {
    try {
      setLoadingTemplateName(template.name);
      setError("");

      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/website/save-template`,
        { html: template.html, name: template.name },
        { 
          withCredentials: true,
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        },
      );

      navigate(`/editor/${res.data.websiteId}`);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to save template");
    } finally {
      setLoadingTemplateName(null);
    }
  };

  const handleGenerateWebsite = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/website/generate`,
        { prompt },
        { 
          withCredentials: true,
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        },
      );

      setProgress(100);
      console.log(res);
      dispatch(
        setUserData({ ...userData, credits: res.data.remainingCredits }),
      );
      navigate(`/editor/${res.data.websiteId}`);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      setPhaseIndex(0);
      setProgress(0);
      return;
    }

    let value = 0;
    let phase = 0;

    const interval = setInterval(() => {
      const increment =
        value < 20
          ? Math.random() * 1.5
          : value < 60
            ? Math.random() * 1.2
            : Math.random() * 0.6;

      value += increment;

      if (value >= 93) value = 93;

      phase = Math.min(
        Math.floor((value / 100) * PHASES.length),
        PHASES.length - 1,
      );

      setProgress(Math.floor(value));
      setPhaseIndex(phase);
    }, 1200);

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-hidden">
      {/* Falling Light Effect */}
      <div className="pointer-events-none absolute inset-0">
        {/* beam */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-100 h-100 
                bg-linear-to-b from-white/20 via-white/10 to-transparent 
                blur-3xl opacity-40"
        />

        {/* center glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-100 h-100 
                bg-white/20 rounded-full blur-[150px]"
        />
      </div>

      {/* header */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="p-2 rounded-lg hover:bg-white/10 transition"
            >
              <ArrowLeft size={16} />
            </button>

            <h1 className="text-lg font-semibold">SITEFORGE-AI</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">

        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-center">Start from a Template</h2>
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar"
          >
            {TEMPLATES.map((tpl, i) => (
              <div key={i} className="min-w-[320px] snap-center bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col hover:bg-white/10 transition">
                <div className="relative h-[180px] w-full bg-black overflow-hidden pointer-events-none">
                  <iframe 
                    srcDoc={tpl.html}
                    scrolling="no"
                    className="absolute top-0 left-0 w-[914px] h-[514px] scale-[0.35] origin-top-left pointer-events-none bg-white"
                  />
                </div>
                <div className="p-6 flex flex-col justify-between flex-1">
                  <h3 className="text-xl font-bold mb-4">{tpl.name}</h3>
                  <button 
                    onClick={() => handleUseTemplate(tpl)} 
                    disabled={loadingTemplateName !== null || loading}
                    className="w-full py-2 bg-white/10 hover:bg-white text-white hover:text-black rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:hover:bg-white/10 disabled:hover:text-white"
                  >
                    {loadingTemplateName === tpl.name ? "Loading..." : "Use Template"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {TEMPLATES.map((_, i) => (
              <div 
                key={i} 
                className={`rounded-full transition-all duration-300 ${activeTemplateIndex === i ? 'w-2.5 h-2.5 bg-white' : 'w-2 h-2 bg-white/20'}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-4 my-8 opacity-50">
            <div className="h-px flex-1 bg-white/20"></div>
            <span className="text-sm">── or describe your own ──</span>
            <div className="h-px flex-1 bg-white/20"></div>
          </div>
        </div>

        <div className="mb-10">
          <h1 className="text-xl font-semibold mb-2">Describe Your Website</h1>

          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-56 p-6 rounded-3xl bg-black/60 border border-white/10 outline-none resize-none text-sm leading-relaxed focus:ring-2 focus:ring-white/20"
              placeholder="Describe your website in detail..."
            />
          </div>

          {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
        </div>

        <div className="flex justify-center">
          <motion.button
            onClick={handleGenerateWebsite}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            disabled={!prompt.trim() || loading}
            className={`px-14 py-4 rounded-2xl font-semibold text-lg transition
                        ${
                          prompt.trim() && !loading
                            ? "bg-white text-black"
                            : "bg-white/20 text-zinc-400 cursor-not-allowed"
                        }`}
          >
            Generate Website
          </motion.button>
        </div>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-xl mx-auto mt-12"
          >
            <div className="flex justify-between mb-2 text-xs text-zinc-400">
              <span>{PHASES[phaseIndex]}</span>
              <span>{progress}%</span>
            </div>

            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.8 }}
                className="h-full bg-linear-to-r from-white to-zinc-300"
              />
            </div>

            <div className="text-center text-xs text-zinc-400 mt-4">
              Estimated time remaining:{" "}
              <span className="text-white font-medium">~8-12 minutes</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Generate;
