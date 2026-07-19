const saas = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SaaS Landing Page</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet"/>
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <style>
        body { background-color: #0a0e1a; color: white; overflow-x: hidden; }
        .particles-bg {
            position: absolute;
            inset: 0;
            background-image: 
                radial-gradient(circle at 20% 30%, rgba(6, 182, 212, 0.1) 0%, transparent 5%),
                radial-gradient(circle at 80% 60%, rgba(59, 130, 246, 0.1) 0%, transparent 5%),
                radial-gradient(circle at 40% 80%, rgba(6, 182, 212, 0.15) 0%, transparent 4%);
            background-size: 100px 100px;
            animation: float-particles 20s linear infinite;
            z-index: -1;
        }
        @keyframes float-particles {
            0% { background-position: 0 0; }
            100% { background-position: 100px 100px; }
        }
        .gradient-text {
            background: linear-gradient(to right, #06b6d4, #3b82f6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .card-hover:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px -10px rgba(6, 182, 212, 0.2);
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    </style>
</head>
<body class="font-sans antialiased">
    <!-- Navbar -->
    <nav class="fixed w-full z-50 top-0 bg-[#0a0e1a]/80 backdrop-blur-md border-b border-white/5">
        <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded bg-gradient-to-tr from-cyan-500 to-blue-500 flex items-center justify-center font-bold text-white">S</div>
                <span class="text-xl font-bold tracking-tight">ScaleSync</span>
            </div>
            <div class="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
                <a href="#features" class="hover:text-white transition">Features</a>
                <a href="#pricing" class="hover:text-white transition">Pricing</a>
                <a href="#testimonials" class="hover:text-white transition">Testimonials</a>
            </div>
            <div class="flex items-center gap-4">
                <a href="#" class="hidden md:block text-sm font-medium text-gray-300 hover:text-white transition">Log in</a>
                <a href="#" class="px-5 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:bg-gray-200 transition">Get Started</a>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
        <div class="particles-bg"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        
        <div class="max-w-7xl mx-auto px-6 text-center z-10 w-full" data-aos="fade-up">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
                <span class="relative flex h-2 w-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                v2.0 is now live
            </div>
            <h1 class="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
                Ship Faster.<br/>
                <span class="gradient-text">Scale Smarter.</span>
            </h1>
            <p class="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                The ultimate platform to automate your workflow, connect your tools, and unleash your team's true potential. No coding required.
            </p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#" class="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-white hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition transform hover:-translate-y-1">Start for free</a>
                <a href="#" class="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 font-semibold hover:bg-white/10 transition">Book a demo</a>
            </div>
            <p class="text-sm text-gray-500 mt-6">No credit card required. 14-day free trial.</p>
        </div>
    </section>

    <!-- Features -->
    <section id="features" class="py-24 bg-[#0a0e1a]">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center mb-16" data-aos="fade-up">
                <h2 class="text-3xl md:text-4xl font-bold mb-4">Everything you need to grow</h2>
                <p class="text-gray-400 max-w-2xl mx-auto">Powerful features designed to help your team move faster and collaborate better.</p>
            </div>

            <div class="grid md:grid-cols-3 gap-8">
                <!-- Feature 1 -->
                <div class="bg-white/[0.02] border border-white/5 rounded-2xl p-8 card-hover relative overflow-hidden group" data-aos="fade-up" data-aos-delay="100">
                    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition duration-500 origin-left"></div>
                    <div class="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-6">
                        <svg class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <h3 class="text-xl font-bold mb-3">Lightning Fast</h3>
                    <p class="text-gray-400 text-sm leading-relaxed">Built on a cutting-edge edge network, ensuring your data is always delivered in milliseconds globally.</p>
                </div>

                <!-- Feature 2 -->
                <div class="bg-white/[0.02] border border-white/5 rounded-2xl p-8 card-hover relative overflow-hidden group" data-aos="fade-up" data-aos-delay="200">
                    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition duration-500 origin-left"></div>
                    <div class="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6">
                        <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    </div>
                    <h3 class="text-xl font-bold mb-3">Bank-grade Security</h3>
                    <p class="text-gray-400 text-sm leading-relaxed">Enterprise-level encryption and advanced threat protection built-in to keep your data safe.</p>
                </div>

                <!-- Feature 3 -->
                <div class="bg-white/[0.02] border border-white/5 rounded-2xl p-8 card-hover relative overflow-hidden group" data-aos="fade-up" data-aos-delay="300">
                    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition duration-500 origin-left"></div>
                    <div class="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-6">
                        <svg class="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                    </div>
                    <h3 class="text-xl font-bold mb-3">Automated Sync</h3>
                    <p class="text-gray-400 text-sm leading-relaxed">Changes sync instantly across all devices. Never worry about conflicting versions again.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Pricing -->
    <section id="pricing" class="py-24 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/10 to-transparent -z-10 pointer-events-none"></div>
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center mb-16" data-aos="fade-up">
                <h2 class="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
                <p class="text-gray-400 max-w-2xl mx-auto">Start for free, upgrade when you need more power.</p>
            </div>

            <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
                <!-- Basic -->
                <div class="bg-white/5 border border-white/10 rounded-3xl p-8" data-aos="fade-right">
                    <h3 class="text-xl font-semibold mb-2">Starter</h3>
                    <p class="text-gray-400 text-sm mb-6">Perfect for side projects.</p>
                    <div class="text-4xl font-bold mb-6">$0<span class="text-lg text-gray-500 font-normal">/mo</span></div>
                    <ul class="space-y-4 mb-8 text-sm text-gray-300">
                        <li class="flex items-center gap-3"><svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Up to 3 projects</li>
                        <li class="flex items-center gap-3"><svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Basic analytics</li>
                        <li class="flex items-center gap-3"><svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Community support</li>
                    </ul>
                    <button class="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 transition font-semibold">Get Started</button>
                </div>

                <!-- Pro -->
                <div class="bg-gradient-to-b from-[#111827] to-[#0a0e1a] border border-cyan-500/30 rounded-3xl p-8 relative transform md:-translate-y-4 shadow-[0_0_50px_rgba(6,182,212,0.15)]" data-aos="fade-up">
                    <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-xs font-bold uppercase tracking-wider">Most Popular</div>
                    <h3 class="text-xl font-semibold mb-2">Pro</h3>
                    <p class="text-gray-400 text-sm mb-6">For professional creators.</p>
                    <div class="text-4xl font-bold mb-6">$29<span class="text-lg text-gray-500 font-normal">/mo</span></div>
                    <ul class="space-y-4 mb-8 text-sm text-gray-300">
                        <li class="flex items-center gap-3"><svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Unlimited projects</li>
                        <li class="flex items-center gap-3"><svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Advanced analytics</li>
                        <li class="flex items-center gap-3"><svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Priority 24/7 support</li>
                        <li class="flex items-center gap-3"><svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Custom domains</li>
                    </ul>
                    <button class="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg hover:shadow-blue-500/25 transition font-semibold">Start 14-day trial</button>
                </div>

                <!-- Enterprise -->
                <div class="bg-white/5 border border-white/10 rounded-3xl p-8" data-aos="fade-left">
                    <h3 class="text-xl font-semibold mb-2">Enterprise</h3>
                    <p class="text-gray-400 text-sm mb-6">For large scale teams.</p>
                    <div class="text-4xl font-bold mb-6">$99<span class="text-lg text-gray-500 font-normal">/mo</span></div>
                    <ul class="space-y-4 mb-8 text-sm text-gray-300">
                        <li class="flex items-center gap-3"><svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Everything in Pro</li>
                        <li class="flex items-center gap-3"><svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>SSO & SAML</li>
                        <li class="flex items-center gap-3"><svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Dedicated success manager</li>
                    </ul>
                    <button class="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 transition font-semibold">Contact Sales</button>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials -->
    <section id="testimonials" class="py-24 border-y border-white/5 bg-[#0d1222]">
        <div class="max-w-7xl mx-auto px-6">
            <h2 class="text-center text-2xl font-semibold mb-12">Loved by teams worldwide</h2>
            
            <div class="flex overflow-x-auto gap-6 pb-8 hide-scrollbar snap-x">
                <!-- Card 1 -->
                <div class="min-w-[300px] md:min-w-[400px] bg-white/[0.03] p-8 rounded-2xl border border-white/5 snap-center">
                    <div class="flex gap-1 text-cyan-400 mb-4">★★★★★</div>
                    <p class="text-gray-300 mb-6 line-clamp-3">"ScaleSync completely transformed how we handle our deployments. The speed is unbelievable and the interface is gorgeous."</p>
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">JD</div>
                        <div>
                            <div class="text-sm font-semibold">Jane Doe</div>
                            <div class="text-xs text-gray-500">CTO at TechFlow</div>
                        </div>
                    </div>
                </div>
                <!-- Card 2 -->
                <div class="min-w-[300px] md:min-w-[400px] bg-white/[0.03] p-8 rounded-2xl border border-white/5 snap-center">
                    <div class="flex gap-1 text-cyan-400 mb-4">★★★★★</div>
                    <p class="text-gray-300 mb-6 line-clamp-3">"We saved over 40 hours a week in manual work. The automated sync feature is a game changer for our distributed team."</p>
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">MS</div>
                        <div>
                            <div class="text-sm font-semibold">Mike Smith</div>
                            <div class="text-xs text-gray-500">Lead Dev at StartupX</div>
                        </div>
                    </div>
                </div>
                <!-- Card 3 -->
                <div class="min-w-[300px] md:min-w-[400px] bg-white/[0.03] p-8 rounded-2xl border border-white/5 snap-center">
                    <div class="flex gap-1 text-cyan-400 mb-4">★★★★★</div>
                    <p class="text-gray-300 mb-6 line-clamp-3">"The best tool we've added to our stack this year. Period. Customer support is also incredibly fast and helpful."</p>
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">AL</div>
                        <div>
                            <div class="text-sm font-semibold">Alice Lee</div>
                            <div class="text-xs text-gray-500">Product Manager</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="pt-20 pb-10 bg-[#0a0e1a]">
        <div class="max-w-7xl mx-auto px-6">
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
                <div class="col-span-2 lg:col-span-2">
                    <div class="flex items-center gap-2 mb-6">
                        <div class="w-8 h-8 rounded bg-gradient-to-tr from-cyan-500 to-blue-500 flex items-center justify-center font-bold text-white">S</div>
                        <span class="text-xl font-bold tracking-tight">ScaleSync</span>
                    </div>
                    <p class="text-gray-400 text-sm mb-6 max-w-sm">Empowering teams to build, ship, and scale faster than ever before. Join thousands of developers today.</p>
                    <div class="flex flex-col gap-2">
                        <span class="text-sm font-semibold text-white">Subscribe to our newsletter</span>
                        <div class="flex gap-2">
                            <input type="email" placeholder="Enter your email" class="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-cyan-500 flex-1"/>
                            <button class="bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition">Subscribe</button>
                        </div>
                    </div>
                </div>
                <div>
                    <h4 class="font-semibold mb-4 text-white">Product</h4>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><a href="#" class="hover:text-white transition">Features</a></li>
                        <li><a href="#" class="hover:text-white transition">Integrations</a></li>
                        <li><a href="#" class="hover:text-white transition">Pricing</a></li>
                        <li><a href="#" class="hover:text-white transition">Changelog</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4 text-white">Company</h4>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><a href="#" class="hover:text-white transition">About Us</a></li>
                        <li><a href="#" class="hover:text-white transition">Careers</a></li>
                        <li><a href="#" class="hover:text-white transition">Blog</a></li>
                        <li><a href="#" class="hover:text-white transition">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4 text-white">Legal</h4>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><a href="#" class="hover:text-white transition">Privacy Policy</a></li>
                        <li><a href="#" class="hover:text-white transition">Terms of Service</a></li>
                        <li><a href="#" class="hover:text-white transition">Security</a></li>
                    </ul>
                </div>
            </div>
            <div class="pt-8 border-t border-white/10 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
                <span>&copy; 2026 ScaleSync Inc. All rights reserved.</span>
                <div class="flex gap-4">
                    <a href="#" class="hover:text-white transition">Twitter</a>
                    <a href="#" class="hover:text-white transition">GitHub</a>
                    <a href="#" class="hover:text-white transition">Discord</a>
                </div>
            </div>
        </div>
    </footer>

    <script>
        AOS.init({ duration: 800, once: true });
    </script>
</body>
</html>
`;
export default saas;
