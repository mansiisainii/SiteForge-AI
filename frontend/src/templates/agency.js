const agency = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Onyx | Creative Agency</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet"/>
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <style>
        body { background-color: #000000; color: #ffffff; overflow-x: hidden; }
        .accent-neon { color: #a3e635; }
        .bg-neon { background-color: #a3e635; }
        
        .marquee-container {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            border-top: 1px solid rgba(255,255,255,0.1);
            border-bottom: 1px solid rgba(255,255,255,0.1);
            padding: 1.5rem 0;
            background: #000;
        }
        .marquee-content {
            display: inline-block;
            animation: scroll 20s linear infinite;
        }
        .marquee-content span {
            margin-right: 3rem;
            font-size: 1.5rem;
            font-weight: 700;
            text-transform: uppercase;
            -webkit-text-stroke: 1px rgba(255,255,255,0.5);
            color: transparent;
            transition: 0.3s;
        }
        .marquee-content span:hover {
            color: #a3e635;
            -webkit-text-stroke: 0px;
        }
        @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }

        .project-card {
            position: relative;
            overflow: hidden;
            cursor: pointer;
        }
        .project-img {
            transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .project-overlay {
            position: absolute;
            inset: 0;
            background: rgba(163, 230, 53, 0.9);
            transform: translateY(100%);
            transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            color: black;
        }
        .project-card:hover .project-img {
            transform: scale(1.05);
        }
        .project-card:hover .project-overlay {
            transform: translateY(0);
        }
        
        .watermark {
            font-size: 20vw;
            font-weight: 900;
            color: rgba(255,255,255,0.02);
            position: absolute;
            bottom: -5vw;
            left: 50%;
            transform: translateX(-50%);
            pointer-events: none;
            line-height: 1;
            white-space: nowrap;
        }
    </style>
</head>
<body class="font-sans antialiased selection:bg-[#a3e635] selection:text-black">
    <!-- Navbar -->
    <nav class="fixed w-full z-50 mix-blend-difference p-6">
        <div class="flex items-center justify-between">
            <a href="#" class="text-2xl font-black tracking-tighter uppercase text-white">Onyx</a>
            <button class="text-white hover:text-[#a3e635] transition flex items-center gap-2 font-bold uppercase tracking-widest text-sm">
                <span>Menu</span>
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
        </div>
    </nav>

    <!-- Hero -->
    <section class="min-h-screen flex items-center pt-20 px-6 relative">
        <div class="absolute top-1/4 right-1/4 w-64 h-64 bg-[#a3e635]/10 rounded-full blur-[100px]"></div>
        
        <div class="max-w-7xl mx-auto w-full z-10" data-aos="fade-up">
            <h1 class="text-[12vw] md:text-[8vw] font-black leading-[0.9] tracking-tighter uppercase mb-8">
                We Build <br/>
                <span class="accent-neon italic pr-4">Digital</span> <br/>
                Experiences
            </h1>
            <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-t border-white/20 pt-8">
                <p class="text-xl md:text-2xl text-gray-400 font-light max-w-lg">A boundary-pushing creative studio specialized in web design, branding, and motion.</p>
                <a href="#work" class="inline-block w-32 h-32 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#a3e635] hover:text-black transition duration-300 font-bold uppercase tracking-widest text-xs rotate-0 hover:rotate-12">View Work</a>
            </div>
        </div>
    </section>

    <!-- Marquee -->
    <div class="marquee-container my-12">
        <div class="marquee-content">
            <span>Web Design</span>
            <span>Branding</span>
            <span>Motion Graphics</span>
            <span>UI/UX</span>
            <span>Development</span>
            <span>Strategy</span>
            <!-- duplicate for smooth infinite scroll -->
            <span>Web Design</span>
            <span>Branding</span>
            <span>Motion Graphics</span>
            <span>UI/UX</span>
            <span>Development</span>
            <span>Strategy</span>
        </div>
    </div>

    <!-- Work Section -->
    <section id="work" class="py-24 px-6 max-w-7xl mx-auto">
        <h2 class="text-4xl font-bold uppercase mb-16" data-aos="fade-right">Selected Works [24]</h2>
        
        <div class="space-y-32">
            <!-- Project 1 (Left) -->
            <div class="flex flex-col md:flex-row gap-12 items-center">
                <div class="w-full md:w-2/3 project-card rounded-xl" data-aos="fade-up">
                    <div class="aspect-[16/9] bg-gradient-to-tr from-gray-900 to-gray-800 project-img"></div>
                    <div class="project-overlay p-8">
                        <h3 class="text-4xl font-black uppercase mb-4">Nova Fintech</h3>
                        <a href="#" class="px-6 py-2 border-2 border-black rounded-full font-bold hover:bg-black hover:text-[#a3e635] transition">View Case Study</a>
                    </div>
                </div>
                <div class="w-full md:w-1/3" data-aos="fade-left">
                    <div class="text-sm font-bold text-[#a3e635] mb-2 uppercase tracking-widest">01 — Web & Branding</div>
                    <h3 class="text-3xl font-bold mb-4">Nova Fintech</h3>
                    <p class="text-gray-400 mb-6">Complete digital transformation for a leading European fintech startup, focusing on trust and speed.</p>
                </div>
            </div>

            <!-- Project 2 (Right) -->
            <div class="flex flex-col md:flex-row-reverse gap-12 items-center">
                <div class="w-full md:w-2/3 project-card rounded-xl" data-aos="fade-up">
                    <div class="aspect-[16/9] bg-gradient-to-bl from-zinc-900 to-zinc-800 project-img"></div>
                    <div class="project-overlay p-8">
                        <h3 class="text-4xl font-black uppercase mb-4">Lumina Beauty</h3>
                        <a href="#" class="px-6 py-2 border-2 border-black rounded-full font-bold hover:bg-black hover:text-[#a3e635] transition">View Case Study</a>
                    </div>
                </div>
                <div class="w-full md:w-1/3 text-left md:text-right" data-aos="fade-right">
                    <div class="text-sm font-bold text-[#a3e635] mb-2 uppercase tracking-widest">02 — eCommerce</div>
                    <h3 class="text-3xl font-bold mb-4">Lumina Beauty</h3>
                    <p class="text-gray-400 mb-6">A headless Shopify experience that redefined online cosmetic shopping with WebGL virtual try-ons.</p>
                </div>
            </div>
        </div>
        
        <div class="mt-32 text-center">
            <a href="#" class="text-2xl font-bold hover:text-[#a3e635] transition border-b-2 border-transparent hover:border-[#a3e635] pb-2 inline-block">See All Projects &rarr;</a>
        </div>
    </section>

    <!-- Stats -->
    <section class="py-24 bg-[#a3e635] text-black">
        <div class="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center" data-aos="fade-up">
            <div>
                <div class="text-5xl md:text-7xl font-black counter">50+</div>
                <div class="text-sm font-bold uppercase tracking-widest mt-2">Projects Delivered</div>
            </div>
            <div>
                <div class="text-5xl md:text-7xl font-black counter">12</div>
                <div class="text-sm font-bold uppercase tracking-widest mt-2">Design Awards</div>
            </div>
            <div>
                <div class="text-5xl md:text-7xl font-black counter">30+</div>
                <div class="text-sm font-bold uppercase tracking-widest mt-2">Global Clients</div>
            </div>
            <div>
                <div class="text-5xl md:text-7xl font-black counter">5</div>
                <div class="text-sm font-bold uppercase tracking-widest mt-2">Years Active</div>
            </div>
        </div>
    </section>

    <!-- Team -->
    <section class="py-32 px-6 max-w-7xl mx-auto">
        <h2 class="text-4xl font-bold uppercase mb-16 text-center" data-aos="fade-up">The Minds Behind</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div class="text-center group" data-aos="fade-up" data-aos-delay="0">
                <div class="w-48 h-48 mx-auto rounded-full bg-zinc-900 mb-6 relative overflow-hidden">
                    <div class="absolute inset-0 bg-[#a3e635] opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center text-black font-bold text-sm">
                        <a href="#" class="hover:underline">LinkedIn</a>
                    </div>
                </div>
                <h4 class="text-xl font-bold uppercase">Marcus Vance</h4>
                <p class="text-[#a3e635] text-sm font-bold tracking-widest mt-1">Creative Director</p>
            </div>
            <div class="text-center group" data-aos="fade-up" data-aos-delay="100">
                <div class="w-48 h-48 mx-auto rounded-full bg-zinc-900 mb-6 relative overflow-hidden">
                    <div class="absolute inset-0 bg-[#a3e635] opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center text-black font-bold text-sm">
                        <a href="#" class="hover:underline">LinkedIn</a>
                    </div>
                </div>
                <h4 class="text-xl font-bold uppercase">Elena Rostova</h4>
                <p class="text-[#a3e635] text-sm font-bold tracking-widest mt-1">Lead Developer</p>
            </div>
            <div class="text-center group" data-aos="fade-up" data-aos-delay="200">
                <div class="w-48 h-48 mx-auto rounded-full bg-zinc-900 mb-6 relative overflow-hidden">
                    <div class="absolute inset-0 bg-[#a3e635] opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center text-black font-bold text-sm">
                        <a href="#" class="hover:underline">LinkedIn</a>
                    </div>
                </div>
                <h4 class="text-xl font-bold uppercase">Jay Chen</h4>
                <p class="text-[#a3e635] text-sm font-bold tracking-widest mt-1">UX/UI Designer</p>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="relative pt-32 pb-12 overflow-hidden border-t border-white/10">
        <div class="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row justify-between items-end gap-12">
            <div>
                <h2 class="text-5xl md:text-7xl font-black uppercase mb-8">Got a project? <br/><a href="#" class="text-[#a3e635] hover:text-white transition">Let's Talk.</a></h2>
                <div class="flex gap-6 text-sm font-bold uppercase tracking-widest">
                    <a href="#" class="hover:text-[#a3e635] transition">Instagram</a>
                    <a href="#" class="hover:text-[#a3e635] transition">Twitter</a>
                    <a href="#" class="hover:text-[#a3e635] transition">Dribbble</a>
                </div>
            </div>
            <div class="text-right text-gray-500 text-sm">
                <p>123 Creative Blvd, NY 10012</p>
                <p>hello@onyxagency.com</p>
                <p class="mt-4">&copy; 2024 Onyx Studio.</p>
            </div>
        </div>
        
        <div class="watermark">ONYX</div>
    </footer>

    <script>
        AOS.init({ duration: 800, once: true });
    </script>
</body>
</html>
`;
export default agency;
