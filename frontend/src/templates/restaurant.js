const restaurant = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ember & Oak | Modern Dining</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet"/>
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <style>
        body { background-color: #1a0a00; color: #fdf6e3; overflow-x: hidden; font-family: 'Georgia', serif; }
        .sans { font-family: 'Helvetica Neue', sans-serif; }
        .bg-hero {
            background-image: url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=1920');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
        }
        .gradient-overlay {
            background: linear-gradient(to bottom, rgba(26, 10, 0, 0.4), rgba(26, 10, 0, 1));
        }
        .accent-text { color: #f59e0b; }
        .accent-bg { background-color: #ea580c; }
        .menu-card {
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .menu-card:hover {
            transform: translateY(-8px);
        }
        .gallery-item {
            aspect-ratio: 1;
            background: linear-gradient(45deg, #2a1100, #401a00);
            transition: all 0.5s ease;
        }
        .gallery-item:hover {
            opacity: 0.8;
            transform: scale(0.98);
        }
        .tab-btn.active {
            border-bottom: 2px solid #f59e0b;
            color: #f59e0b;
        }
        .menu-section { display: none; }
        .menu-section.active { display: block; animation: fadeIn 0.5s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    </style>
</head>
<body class="antialiased">
    <!-- Nav -->
    <nav class="fixed w-full z-50 top-0 transition-all duration-300 bg-[#1a0a00]/90 backdrop-blur-md border-b border-white/5 py-4">
        <div class="max-w-7xl mx-auto px-6 flex items-center justify-between">
            <div class="text-2xl font-bold tracking-widest uppercase">Ember <span class="accent-text">&</span> Oak</div>
            <div class="hidden md:flex gap-8 sans text-sm font-medium tracking-wide">
                <a href="#about" class="hover:text-[#f59e0b] transition">About</a>
                <a href="#menu" class="hover:text-[#f59e0b] transition">Menu</a>
                <a href="#visit" class="hover:text-[#f59e0b] transition">Visit</a>
            </div>
            <a href="#reservations" class="sans px-6 py-2.5 bg-gradient-to-r from-[#f59e0b] to-[#ea580c] text-white text-sm font-bold tracking-wider uppercase hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition">Book a Table</a>
        </div>
    </nav>

    <!-- Hero -->
    <section class="relative min-h-[90vh] flex items-center justify-center bg-hero pt-20">
        <div class="absolute inset-0 gradient-overlay"></div>
        <div class="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20" data-aos="fade-up" data-aos-duration="1200">
            <span class="sans text-[#f59e0b] tracking-[0.3em] uppercase text-sm font-bold block mb-6">Est. 2024</span>
            <h1 class="text-5xl md:text-7xl font-bold mb-8 leading-tight">Where Every Bite <br/>Tells a Story.</h1>
            <p class="sans text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 font-light">Wood-fired culinary experiences crafted with locally sourced ingredients and burning passion.</p>
            <a href="#menu" class="sans inline-block px-10 py-4 border border-[#f59e0b] text-[#f59e0b] hover:bg-[#f59e0b] hover:text-white transition duration-300 text-sm font-bold tracking-wider uppercase">Explore Menu</a>
        </div>
    </section>

    <!-- About (Asymmetric) -->
    <section id="about" class="py-24 px-6 max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row gap-16 items-center">
            <div class="md:w-1/2" data-aos="fade-right">
                <span class="sans text-[#ea580c] tracking-widest uppercase text-sm font-bold block mb-4">Our Philosophy</span>
                <h2 class="text-4xl md:text-5xl font-bold mb-6">Fire, flavor, and tradition.</h2>
                <p class="sans text-gray-400 leading-relaxed mb-6">At Ember & Oak, we believe that the best meals return to the fundamentals of cooking: an open flame and exceptional, seasonal ingredients. Our chefs meticulously curate every dish to bring out bold, primal flavors refined for the modern palate.</p>
                <p class="sans text-gray-400 leading-relaxed">Join us in a warm, intimate atmosphere where the hearth is the heart of the dining room.</p>
            </div>
            <div class="md:w-1/2 relative" data-aos="fade-left">
                <div class="aspect-[4/5] bg-gradient-to-tr from-[#3a1800] to-[#1a0a00] w-full max-w-md ml-auto relative">
                    <div class="absolute -bottom-8 -left-8 w-48 h-48 bg-[#ea580c]/20 rounded-full blur-2xl"></div>
                    <!-- Decorative image placeholder -->
                    <div class="w-full h-full border border-white/10 p-2">
                        <div class="w-full h-full bg-[#2a1100] flex items-center justify-center text-[#f59e0b] opacity-50">
                            [ Interior Image ]
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Menu -->
    <section id="menu" class="py-24 px-6 bg-[#140800]">
        <div class="max-w-5xl mx-auto">
            <div class="text-center mb-16" data-aos="fade-up">
                <h2 class="text-4xl md:text-5xl font-bold mb-4">Culinary Offerings</h2>
                <div class="w-16 h-1 bg-[#ea580c] mx-auto"></div>
            </div>

            <!-- Tabs -->
            <div class="flex justify-center gap-8 mb-12 sans border-b border-white/10">
                <button class="tab-btn active pb-4 tracking-wider uppercase font-semibold text-gray-400 transition" onclick="switchTab('starters')">Starters</button>
                <button class="tab-btn pb-4 tracking-wider uppercase font-semibold text-gray-400 transition" onclick="switchTab('mains')">Mains</button>
                <button class="tab-btn pb-4 tracking-wider uppercase font-semibold text-gray-400 transition" onclick="switchTab('desserts')">Desserts</button>
            </div>

            <!-- Starters -->
            <div id="starters" class="menu-section active">
                <div class="grid md:grid-cols-2 gap-x-12 gap-y-10">
                    <div class="menu-card border-b border-white/5 pb-6">
                        <div class="flex justify-between items-baseline mb-2">
                            <h3 class="text-xl font-bold">Charred Octopus</h3>
                            <span class="sans text-[#f59e0b] font-bold">$18</span>
                        </div>
                        <p class="sans text-sm text-gray-400">Smoked paprika, fingerling potatoes, salsa verde.</p>
                    </div>
                    <div class="menu-card border-b border-white/5 pb-6">
                        <div class="flex justify-between items-baseline mb-2">
                            <h3 class="text-xl font-bold">Bone Marrow</h3>
                            <span class="sans text-[#f59e0b] font-bold">$22</span>
                        </div>
                        <p class="sans text-sm text-gray-400">Roasted garlic jam, parsley salad, grilled sourdough.</p>
                    </div>
                    <div class="menu-card border-b border-white/5 pb-6">
                        <div class="flex justify-between items-baseline mb-2">
                            <h3 class="text-xl font-bold">Burrata & Heirloom</h3>
                            <span class="sans text-[#f59e0b] font-bold">$16</span>
                        </div>
                        <p class="sans text-sm text-gray-400">Aged balsamic, basil oil, toasted pine nuts.</p>
                    </div>
                </div>
            </div>

            <!-- Mains -->
            <div id="mains" class="menu-section">
                <div class="grid md:grid-cols-2 gap-x-12 gap-y-10">
                    <div class="menu-card border-b border-white/5 pb-6">
                        <div class="flex justify-between items-baseline mb-2">
                            <h3 class="text-xl font-bold">Dry-Aged Ribeye</h3>
                            <span class="sans text-[#f59e0b] font-bold">$58</span>
                        </div>
                        <p class="sans text-sm text-gray-400">16oz, wild mushroom demi-glace, truffled mash.</p>
                    </div>
                    <div class="menu-card border-b border-white/5 pb-6">
                        <div class="flex justify-between items-baseline mb-2">
                            <h3 class="text-xl font-bold">Wood-Fired Salmon</h3>
                            <span class="sans text-[#f59e0b] font-bold">$34</span>
                        </div>
                        <p class="sans text-sm text-gray-400">Cedar plank, asparagus, meyer lemon beurre blanc.</p>
                    </div>
                    <div class="menu-card border-b border-white/5 pb-6">
                        <div class="flex justify-between items-baseline mb-2">
                            <h3 class="text-xl font-bold">Duck Breast</h3>
                            <span class="sans text-[#f59e0b] font-bold">$38</span>
                        </div>
                        <p class="sans text-sm text-gray-400">Cherry reduction, sweet potato puree, charred broccolini.</p>
                    </div>
                </div>
            </div>

            <!-- Desserts -->
            <div id="desserts" class="menu-section">
                <div class="grid md:grid-cols-2 gap-x-12 gap-y-10">
                    <div class="menu-card border-b border-white/5 pb-6">
                        <div class="flex justify-between items-baseline mb-2">
                            <h3 class="text-xl font-bold">Smoked Chocolate Tart</h3>
                            <span class="sans text-[#f59e0b] font-bold">$12</span>
                        </div>
                        <p class="sans text-sm text-gray-400">Sea salt, bourbon caramel, vanilla bean gelato.</p>
                    </div>
                    <div class="menu-card border-b border-white/5 pb-6">
                        <div class="flex justify-between items-baseline mb-2">
                            <h3 class="text-xl font-bold">Torched Crème Brûlée</h3>
                            <span class="sans text-[#f59e0b] font-bold">$10</span>
                        </div>
                        <p class="sans text-sm text-gray-400">Orange zest, fresh berries, lavender shortbread.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Visit & Hours -->
    <section id="visit" class="py-24 px-6 border-t border-white/5">
        <div class="max-w-6xl mx-auto flex flex-col md:flex-row gap-16">
            <div class="md:w-1/2" data-aos="fade-up">
                <h2 class="text-4xl font-bold mb-8">Join Us</h2>
                <div class="sans space-y-6 text-gray-300">
                    <div>
                        <h4 class="text-white font-bold tracking-wider uppercase mb-2">Location</h4>
                        <p>123 Culinary Avenue<br/>Metropolis, NY 10001</p>
                    </div>
                    <div>
                        <h4 class="text-white font-bold tracking-wider uppercase mb-2">Hours</h4>
                        <p>Wed - Sun: 5:00 PM - 11:00 PM<br/>Mon & Tue: Closed</p>
                    </div>
                    <div>
                        <h4 class="text-white font-bold tracking-wider uppercase mb-2">Contact</h4>
                        <p>reservations@emberandoak.com<br/>+1 (555) 123-4567</p>
                    </div>
                </div>
                <div class="mt-10">
                    <a href="#" class="sans inline-block px-8 py-4 bg-white text-black font-bold tracking-wider uppercase hover:bg-gray-200 transition">Make Reservation</a>
                </div>
            </div>
            
            <!-- Instagram Gallery Grid -->
            <div class="md:w-1/2 grid grid-cols-2 gap-4" data-aos="fade-up" data-aos-delay="200">
                <div class="gallery-item"></div>
                <div class="gallery-item" style="background: linear-gradient(135deg, #401a00, #2a1100);"></div>
                <div class="gallery-item" style="background: linear-gradient(to right, #2a1100, #3a1800);"></div>
                <div class="gallery-item" style="background: linear-gradient(to bottom, #401a00, #2a1100);"></div>
            </div>
        </div>
    </section>

    <footer class="py-10 border-t border-white/5 text-center sans text-sm text-gray-500">
        <p>&copy; 2026 Ember & Oak. All rights reserved.</p>
    </footer>

    <script>
        AOS.init({ duration: 800, once: true });

        function switchTab(tabId) {
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.menu-section').forEach(sec => sec.classList.remove('active'));
            
            event.target.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        }
    </script>
</body>
</html>
`;
export default restaurant;
