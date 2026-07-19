const ecommerce = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zenith Store | Elevate Your Lifestyle</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet"/>
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <style>
        body { background-color: #fafafa; color: #111827; overflow-x: hidden; }
        .marquee {
            white-space: nowrap;
            overflow: hidden;
            box-sizing: border-box;
        }
        .marquee p {
            display: inline-block;
            padding-left: 100%;
            animation: marquee 15s linear infinite;
        }
        @keyframes marquee {
            0% { transform: translate(0, 0); }
            100% { transform: translate(-100%, 0); }
        }
        .btn-hover-anim {
            background-size: 200% auto;
            transition: 0.5s;
        }
        .btn-hover-anim:hover {
            background-position: right center;
        }
        .product-card { transition: all 0.3s ease; }
        .product-card:hover { transform: translateY(-5px); }
        .product-card:hover .product-img { transform: scale(1.05); }
        .cart-btn { transform: translateY(20px); opacity: 0; transition: all 0.3s ease; }
        .product-card:hover .cart-btn { transform: translateY(0); opacity: 1; }
    </style>
</head>
<body class="font-sans antialiased">
    <!-- Announcement Bar -->
    <div class="bg-gray-900 text-white text-xs font-semibold py-2 marquee">
        <p>🎉 Free Shipping on all orders over $100! | 30-Day Money Back Guarantee | Spring Collection Now Live</p>
    </div>

    <!-- Navbar -->
    <nav class="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div class="flex items-center gap-8">
                <a href="#" class="text-2xl font-black tracking-tighter">ZENITH.</a>
                <div class="hidden md:flex gap-6 text-sm font-medium text-gray-600">
                    <a href="#" class="text-black">New Arrivals</a>
                    <a href="#" class="hover:text-black transition">Men</a>
                    <a href="#" class="hover:text-black transition">Women</a>
                    <a href="#" class="hover:text-black transition">Accessories</a>
                </div>
            </div>
            <div class="flex items-center gap-4">
                <button class="p-2 text-gray-600 hover:text-black"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
                <button class="p-2 text-gray-600 hover:text-black"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></button>
                <button class="p-2 text-gray-600 hover:text-black relative">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                    <span class="absolute top-0 right-0 w-4 h-4 bg-[#10b981] text-white text-[10px] font-bold rounded-full flex items-center justify-center">2</span>
                </button>
            </div>
        </div>
    </nav>

    <!-- Hero -->
    <section class="max-w-7xl mx-auto px-6 py-12 md:py-24">
        <div class="flex flex-col md:flex-row items-center gap-12 bg-gray-50 rounded-3xl p-8 md:p-16 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-50 to-transparent -z-10"></div>
            
            <div class="md:w-1/2 z-10" data-aos="fade-right">
                <span class="inline-block py-1 px-3 rounded-full bg-[#10b981]/10 text-[#0891b2] text-xs font-bold uppercase tracking-wider mb-6">New Collection 2024</span>
                <h1 class="text-5xl md:text-7xl font-extrabold mb-6 leading-[1.1] tracking-tight">
                    Step Into <br/>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-[#0891b2]">The Future.</span>
                </h1>
                <p class="text-gray-500 text-lg mb-10 max-w-md">Discover our latest collection of premium sustainable apparel designed for the modern trailblazer.</p>
                <a href="#shop" class="btn-hover-anim inline-block px-10 py-4 bg-gradient-to-r from-[#10b981] via-[#0891b2] to-[#10b981] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all">Shop Collection</a>
            </div>

            <div class="md:w-1/2 relative w-full h-[400px]" data-aos="fade-left">
                <!-- Decorative SVG Placeholder -->
                <div class="absolute inset-0 flex items-center justify-center">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="w-full h-full opacity-20">
                        <path fill="#10b981" d="M47.7,-57.2C59.7,-46.5,65.8,-28.9,67.7,-11.5C69.6,5.9,67.3,23.2,58.3,37.3C49.3,51.4,33.5,62.3,16,66.6C-1.5,70.9,-20.7,68.6,-36.5,59.3C-52.3,50,-64.8,33.7,-68.8,15.6C-72.8,-2.5,-68.4,-22.4,-56.9,-36.6C-45.4,-50.8,-26.8,-59.3,-9,-51.7C8.8,-44.1,27.5,-40.4,47.7,-57.2Z" transform="translate(100 100)" />
                    </svg>
                </div>
                <div class="absolute inset-0 bg-gradient-to-br from-green-200/50 to-teal-200/50 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white">
                    <span class="text-2xl font-bold text-[#0891b2]">Hero Product Image</span>
                </div>
            </div>
        </div>
    </section>

    <!-- Categories -->
    <section class="max-w-7xl mx-auto px-6 py-12">
        <h2 class="text-xl font-bold mb-8">Shop by Category</h2>
        <div class="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
            <a href="#" class="min-w-[120px] h-32 rounded-2xl bg-gray-100 flex flex-col items-center justify-center gap-3 hover:bg-[#10b981]/10 transition group">
                <span class="text-3xl group-hover:scale-110 transition">👟</span>
                <span class="text-sm font-semibold">Sneakers</span>
            </a>
            <a href="#" class="min-w-[120px] h-32 rounded-2xl bg-gray-100 flex flex-col items-center justify-center gap-3 hover:bg-[#10b981]/10 transition group">
                <span class="text-3xl group-hover:scale-110 transition">👕</span>
                <span class="text-sm font-semibold">T-Shirts</span>
            </a>
            <a href="#" class="min-w-[120px] h-32 rounded-2xl bg-gray-100 flex flex-col items-center justify-center gap-3 hover:bg-[#10b981]/10 transition group">
                <span class="text-3xl group-hover:scale-110 transition">👖</span>
                <span class="text-sm font-semibold">Pants</span>
            </a>
            <a href="#" class="min-w-[120px] h-32 rounded-2xl bg-gray-100 flex flex-col items-center justify-center gap-3 hover:bg-[#10b981]/10 transition group">
                <span class="text-3xl group-hover:scale-110 transition">🧥</span>
                <span class="text-sm font-semibold">Jackets</span>
            </a>
            <a href="#" class="min-w-[120px] h-32 rounded-2xl bg-gray-100 flex flex-col items-center justify-center gap-3 hover:bg-[#10b981]/10 transition group">
                <span class="text-3xl group-hover:scale-110 transition">🎒</span>
                <span class="text-sm font-semibold">Bags</span>
            </a>
        </div>
    </section>

    <!-- Products Grid -->
    <section id="shop" class="max-w-7xl mx-auto px-6 py-16">
        <div class="flex justify-between items-end mb-10">
            <h2 class="text-3xl font-bold">New Arrivals</h2>
            <a href="#" class="text-sm font-semibold text-[#0891b2] hover:underline">View All &rarr;</a>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <!-- Product 1 -->
            <div class="product-card group cursor-pointer" data-aos="fade-up" data-aos-delay="0">
                <div class="relative bg-gray-100 rounded-2xl aspect-[4/5] mb-4 overflow-hidden flex items-center justify-center">
                    <div class="w-full h-full bg-gradient-to-tr from-gray-200 to-gray-50 product-img transition duration-500"></div>
                    <span class="absolute top-3 left-3 bg-white px-2 py-1 text-xs font-bold rounded">NEW</span>
                    <button class="cart-btn absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] bg-black text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#10b981] transition">Add to Cart</button>
                </div>
                <h3 class="font-bold text-gray-900 mb-1">Urban Velocity Sneaker</h3>
                <p class="text-gray-500 text-sm mb-2">Footwear</p>
                <div class="font-bold text-lg">$129.00</div>
            </div>

            <!-- Product 2 -->
            <div class="product-card group cursor-pointer" data-aos="fade-up" data-aos-delay="100">
                <div class="relative bg-gray-100 rounded-2xl aspect-[4/5] mb-4 overflow-hidden flex items-center justify-center">
                    <div class="w-full h-full bg-gradient-to-tr from-gray-200 to-gray-50 product-img transition duration-500"></div>
                    <button class="cart-btn absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] bg-black text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#10b981] transition">Add to Cart</button>
                </div>
                <h3 class="font-bold text-gray-900 mb-1">Essential Tech Hoodie</h3>
                <p class="text-gray-500 text-sm mb-2">Apparel</p>
                <div class="font-bold text-lg">$85.00</div>
            </div>

            <!-- Product 3 -->
            <div class="product-card group cursor-pointer" data-aos="fade-up" data-aos-delay="200">
                <div class="relative bg-gray-100 rounded-2xl aspect-[4/5] mb-4 overflow-hidden flex items-center justify-center">
                    <div class="w-full h-full bg-gradient-to-tr from-gray-200 to-gray-50 product-img transition duration-500"></div>
                    <span class="absolute top-3 left-3 bg-[#ef4444] text-white px-2 py-1 text-xs font-bold rounded">SALE</span>
                    <button class="cart-btn absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] bg-black text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#10b981] transition">Add to Cart</button>
                </div>
                <h3 class="font-bold text-gray-900 mb-1">Commuter Backpack</h3>
                <p class="text-gray-500 text-sm mb-2">Accessories</p>
                <div class="flex items-center gap-2">
                    <div class="font-bold text-lg text-[#ef4444]">$95.00</div>
                    <div class="text-sm text-gray-400 line-through">$120.00</div>
                </div>
            </div>

            <!-- Product 4 -->
            <div class="product-card group cursor-pointer" data-aos="fade-up" data-aos-delay="300">
                <div class="relative bg-gray-100 rounded-2xl aspect-[4/5] mb-4 overflow-hidden flex items-center justify-center">
                    <div class="w-full h-full bg-gradient-to-tr from-gray-200 to-gray-50 product-img transition duration-500"></div>
                    <button class="cart-btn absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] bg-black text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#10b981] transition">Add to Cart</button>
                </div>
                <h3 class="font-bold text-gray-900 mb-1">Cargo Joggers</h3>
                <p class="text-gray-500 text-sm mb-2">Apparel</p>
                <div class="font-bold text-lg">$75.00</div>
            </div>
        </div>
    </section>

    <!-- Trust Badges -->
    <section class="border-t border-gray-100 py-12 mt-12 bg-white">
        <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div class="flex flex-col items-center justify-center" data-aos="fade-up">
                <div class="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4 text-[#10b981]">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                </div>
                <h4 class="font-bold mb-2">Free Shipping</h4>
                <p class="text-sm text-gray-500">On all orders over $100</p>
            </div>
            <div class="flex flex-col items-center justify-center" data-aos="fade-up" data-aos-delay="100">
                <div class="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-[#0891b2]">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                </div>
                <h4 class="font-bold mb-2">30-Day Returns</h4>
                <p class="text-sm text-gray-500">Not satisfied? Return it easily.</p>
            </div>
            <div class="flex flex-col items-center justify-center" data-aos="fade-up" data-aos-delay="200">
                <div class="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4 text-[#10b981]">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                </div>
                <h4 class="font-bold mb-2">Secure Payment</h4>
                <p class="text-sm text-gray-500">Your data is always protected.</p>
            </div>
        </div>
    </section>

    <footer class="bg-gray-900 text-white py-16">
        <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
                <h3 class="text-2xl font-black tracking-tighter mb-6">ZENITH.</h3>
                <p class="text-gray-400 text-sm mb-6">Elevating modern lifestyle with premium, sustainable gear designed for the journey ahead.</p>
            </div>
            <div>
                <h4 class="font-bold mb-4">Shop</h4>
                <ul class="space-y-2 text-sm text-gray-400">
                    <li><a href="#" class="hover:text-white transition">Men</a></li>
                    <li><a href="#" class="hover:text-white transition">Women</a></li>
                    <li><a href="#" class="hover:text-white transition">Accessories</a></li>
                    <li><a href="#" class="hover:text-white transition">Sale</a></li>
                </ul>
            </div>
            <div>
                <h4 class="font-bold mb-4">Support</h4>
                <ul class="space-y-2 text-sm text-gray-400">
                    <li><a href="#" class="hover:text-white transition">FAQ</a></li>
                    <li><a href="#" class="hover:text-white transition">Shipping & Returns</a></li>
                    <li><a href="#" class="hover:text-white transition">Contact Us</a></li>
                </ul>
            </div>
            <div>
                <h4 class="font-bold mb-4">Newsletter</h4>
                <p class="text-sm text-gray-400 mb-4">Subscribe to get 10% off your first order.</p>
                <div class="flex">
                    <input type="email" placeholder="Email Address" class="bg-white/10 px-4 py-2 text-sm rounded-l-lg outline-none w-full border-y border-l border-transparent focus:border-[#10b981]">
                    <button class="bg-[#10b981] text-white px-4 py-2 rounded-r-lg text-sm font-bold hover:bg-[#0891b2] transition">&rarr;</button>
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
export default ecommerce;
