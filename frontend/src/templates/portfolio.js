const portfolio = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alex Carter | Developer Portfolio</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet"/>
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <style>
        body { background-color: #0f0f0f; color: white; overflow-x: hidden; }
        .bg-blob {
            position: absolute;
            width: 400px;
            height: 400px;
            background: linear-gradient(135deg, #7c3aed, #ec4899);
            filter: blur(100px);
            border-radius: 50%;
            z-index: -1;
            animation: float 10s ease-in-out infinite;
        }
        @keyframes float {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-30px) scale(1.1); }
        }
        .typewriter-container::after {
            content: '|';
            animation: blink 1s step-end infinite;
        }
        @keyframes blink { 50% { opacity: 0; } }
        .glass-card {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
        }
        .glass-card:hover {
            border-color: rgba(124, 58, 237, 0.5);
            transform: translateY(-5px);
            box-shadow: 0 10px 30px -10px rgba(124, 58, 237, 0.3);
        }
    </style>
</head>
<body class="font-sans antialiased">
    <!-- Navbar -->
    <nav class="fixed w-full z-50 top-0 transition-all duration-300 backdrop-blur-md bg-[#0f0f0f]/80 border-b border-white/10" id="navbar">
        <div class="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
            <a href="#" class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#7c3aed] to-[#ec4899]">AC.</a>
            <div class="hidden md:flex gap-8 text-sm font-medium text-gray-300">
                <a href="#about" class="hover:text-white transition">About</a>
                <a href="#skills" class="hover:text-white transition">Skills</a>
                <a href="#projects" class="hover:text-white transition">Projects</a>
                <a href="#contact" class="hover:text-white transition">Contact</a>
            </div>
            <a href="#contact" class="hidden md:inline-block px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 transition border border-white/10 text-sm font-medium">Let's Talk</a>
        </div>
    </nav>

    <!-- Hero -->
    <section class="relative min-h-screen flex items-center justify-center pt-20 px-6">
        <div class="bg-blob top-1/4 left-1/4 opacity-40"></div>
        <div class="bg-blob bottom-1/4 right-1/4 opacity-20" style="animation-delay: -5s;"></div>
        
        <div class="max-w-4xl mx-auto text-center z-10" data-aos="fade-up">
            <h2 class="text-[#7c3aed] font-semibold tracking-wider uppercase text-sm mb-4">Welcome to my universe</h2>
            <h1 class="text-6xl md:text-8xl font-extrabold mb-6 tracking-tight">Alex Carter</h1>
            <div class="text-2xl md:text-4xl text-gray-400 font-light mb-10 h-10">
                I am a <span class="text-white font-medium typewriter-container" id="typewriter"></span>
            </div>
            <div class="flex flex-wrap justify-center gap-4">
                <a href="#projects" class="px-8 py-4 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#ec4899] font-semibold hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] transition duration-300 transform hover:scale-105">View My Work</a>
                <a href="#contact" class="px-8 py-4 rounded-full glass-card font-semibold hover:text-white transition duration-300">Contact Me</a>
            </div>
        </div>
    </section>

    <!-- Skills -->
    <section id="skills" class="py-24 px-6 relative">
        <div class="max-w-6xl mx-auto">
            <h2 class="text-4xl font-bold mb-12 text-center" data-aos="fade-up">Technical Arsenal</h2>
            <div class="flex flex-wrap justify-center gap-4" data-aos="fade-up" data-aos-delay="100">
                <!-- Skill Pills -->
                <span class="px-6 py-3 rounded-full glass-card text-sm font-medium hover:text-[#ec4899] cursor-default">React.js</span>
                <span class="px-6 py-3 rounded-full glass-card text-sm font-medium hover:text-[#7c3aed] cursor-default">Next.js</span>
                <span class="px-6 py-3 rounded-full glass-card text-sm font-medium hover:text-[#ec4899] cursor-default">Node.js</span>
                <span class="px-6 py-3 rounded-full glass-card text-sm font-medium hover:text-[#7c3aed] cursor-default">TypeScript</span>
                <span class="px-6 py-3 rounded-full glass-card text-sm font-medium hover:text-[#ec4899] cursor-default">Tailwind CSS</span>
                <span class="px-6 py-3 rounded-full glass-card text-sm font-medium hover:text-[#7c3aed] cursor-default">MongoDB</span>
                <span class="px-6 py-3 rounded-full glass-card text-sm font-medium hover:text-[#ec4899] cursor-default">GraphQL</span>
                <span class="px-6 py-3 rounded-full glass-card text-sm font-medium hover:text-[#7c3aed] cursor-default">Figma</span>
            </div>
        </div>
    </section>

    <!-- Projects -->
    <section id="projects" class="py-24 px-6 bg-black/50">
        <div class="max-w-6xl mx-auto">
            <h2 class="text-4xl font-bold mb-16 text-center" data-aos="fade-up">Featured Projects</h2>
            <div class="grid md:grid-cols-3 gap-8">
                <!-- Project 1 -->
                <div class="glass-card rounded-2xl p-6 group" data-aos="fade-up" data-aos-delay="100">
                    <div class="w-full h-48 rounded-xl bg-gradient-to-br from-purple-900/50 to-black mb-6 relative overflow-hidden flex items-center justify-center">
                        <span class="text-purple-500 text-4xl group-hover:scale-110 transition duration-300">✦</span>
                    </div>
                    <div class="flex gap-2 mb-4">
                        <span class="text-xs font-semibold text-[#7c3aed] bg-[#7c3aed]/10 px-2 py-1 rounded">React</span>
                        <span class="text-xs font-semibold text-[#ec4899] bg-[#ec4899]/10 px-2 py-1 rounded">Web3</span>
                    </div>
                    <h3 class="text-2xl font-bold mb-2">Nexus Exchange</h3>
                    <p class="text-gray-400 text-sm mb-6">A decentralized exchange platform with real-time analytics and seamless token swapping capabilities.</p>
                    <a href="#" class="text-sm font-semibold flex items-center gap-2 hover:text-[#7c3aed] transition">View Project &rarr;</a>
                </div>

                <!-- Project 2 -->
                <div class="glass-card rounded-2xl p-6 group" data-aos="fade-up" data-aos-delay="200">
                    <div class="w-full h-48 rounded-xl bg-gradient-to-bl from-pink-900/50 to-black mb-6 relative overflow-hidden flex items-center justify-center">
                        <span class="text-pink-500 text-4xl group-hover:scale-110 transition duration-300">✦</span>
                    </div>
                    <div class="flex gap-2 mb-4">
                        <span class="text-xs font-semibold text-[#7c3aed] bg-[#7c3aed]/10 px-2 py-1 rounded">Next.js</span>
                        <span class="text-xs font-semibold text-[#ec4899] bg-[#ec4899]/10 px-2 py-1 rounded">Stripe</span>
                    </div>
                    <h3 class="text-2xl font-bold mb-2">Aura E-Commerce</h3>
                    <p class="text-gray-400 text-sm mb-6">Headless e-commerce storefront featuring incredibly fast page loads and a beautiful dark mode UI.</p>
                    <a href="#" class="text-sm font-semibold flex items-center gap-2 hover:text-[#7c3aed] transition">View Project &rarr;</a>
                </div>

                <!-- Project 3 -->
                <div class="glass-card rounded-2xl p-6 group" data-aos="fade-up" data-aos-delay="300">
                    <div class="w-full h-48 rounded-xl bg-gradient-to-tr from-indigo-900/50 to-black mb-6 relative overflow-hidden flex items-center justify-center">
                        <span class="text-indigo-500 text-4xl group-hover:scale-110 transition duration-300">✦</span>
                    </div>
                    <div class="flex gap-2 mb-4">
                        <span class="text-xs font-semibold text-[#7c3aed] bg-[#7c3aed]/10 px-2 py-1 rounded">Three.js</span>
                        <span class="text-xs font-semibold text-[#ec4899] bg-[#ec4899]/10 px-2 py-1 rounded">GSAP</span>
                    </div>
                    <h3 class="text-2xl font-bold mb-2">Cyber Portfolio</h3>
                    <p class="text-gray-400 text-sm mb-6">An interactive 3D portfolio showcasing experimental web GL techniques and complex animations.</p>
                    <a href="#" class="text-sm font-semibold flex items-center gap-2 hover:text-[#7c3aed] transition">View Project &rarr;</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact -->
    <section id="contact" class="py-24 px-6 relative overflow-hidden">
        <div class="bg-blob bottom-0 right-0 opacity-20 transform translate-x-1/2 translate-y-1/2"></div>
        <div class="max-w-3xl mx-auto text-center" data-aos="fade-up">
            <h2 class="text-5xl font-bold mb-6">Let's build something <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#ec4899]">extraordinary</span></h2>
            <p class="text-gray-400 mb-10 text-lg">Currently available for freelance opportunities and exciting roles.</p>
            <a href="mailto:hello@example.com" class="inline-block px-10 py-5 rounded-full bg-white text-black font-bold text-lg hover:scale-105 transition duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)]">hello@alexcarter.dev</a>
            
            <div class="flex justify-center gap-6 mt-16 text-gray-400">
                <a href="#" class="hover:text-white transition hover:-translate-y-1">Twitter</a>
                <a href="#" class="hover:text-white transition hover:-translate-y-1">LinkedIn</a>
                <a href="#" class="hover:text-white transition hover:-translate-y-1">GitHub</a>
                <a href="#" class="hover:text-white transition hover:-translate-y-1">Dribbble</a>
            </div>
        </div>
    </section>

    <footer class="py-8 text-center text-gray-500 text-sm border-t border-white/5">
        &copy; 2026 Alex Carter. Crafted with passion.
    </footer>

    <script>
        // Initialize AOS
        AOS.init({ duration: 800, once: true });

        // Typewriter Effect
        const roles = ["Full Stack Developer", "React Specialist", "UI Engineer"];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typeWriterEl = document.getElementById('typewriter');

        function type() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typeWriterEl.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typeWriterEl.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentRole.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500; // Pause before typing next
            }

            setTimeout(type, typeSpeed);
        }

        setTimeout(type, 1000);
    </script>
</body>
</html>
`;
export default portfolio;
