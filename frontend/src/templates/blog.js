const blog = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Daily Post | Magazine</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet"/>
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <style>
        body { background-color: #fafafa; color: #111827; }
        .masonry { column-count: 1; column-gap: 1.5rem; }
        @media (min-width: 768px) { .masonry { column-count: 2; } }
        @media (min-width: 1024px) { .masonry { column-count: 2; } }
        .masonry-item { break-inside: avoid; margin-bottom: 1.5rem; }
        
        .article-card { transition: all 0.3s ease; }
        .article-card:hover { transform: translateY(-4px); box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); }
        .article-card:hover .article-img { transform: scale(1.05); }
        
        .tag-pill { transition: all 0.2s ease; }
        .tag-pill:hover { background-color: #4338ca; color: white; border-color: #4338ca; }
    </style>
</head>
<body class="font-serif antialiased selection:bg-[#4338ca] selection:text-white">
    <!-- Navbar -->
    <nav class="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div class="flex items-center gap-4">
                <button class="p-2 -ml-2 text-gray-500 hover:text-black md:hidden">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
                <div class="hidden md:flex gap-6 text-sm font-sans font-semibold text-gray-500">
                    <a href="#" class="text-black">Design</a>
                    <a href="#" class="hover:text-black transition">Technology</a>
                    <a href="#" class="hover:text-black transition">Culture</a>
                    <a href="#" class="hover:text-black transition">Business</a>
                </div>
            </div>
            
            <a href="#" class="text-2xl font-black tracking-tight font-sans">THE POST.</a>
            
            <div class="flex items-center gap-4">
                <button class="p-2 text-gray-500 hover:text-black transition">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </button>
                <a href="#" class="hidden md:block font-sans text-sm font-semibold px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition">Subscribe</a>
            </div>
        </div>
    </nav>

    <main class="max-w-7xl mx-auto px-6 py-12">
        <!-- Hero Featured Article -->
        <section class="mb-16" data-aos="fade-up">
            <div class="relative w-full h-[500px] rounded-3xl overflow-hidden group cursor-pointer shadow-xl">
                <div class="absolute inset-0 bg-gradient-to-tr from-gray-800 to-gray-400 group-hover:scale-105 transition duration-700"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                <div class="absolute bottom-0 left-0 w-full p-8 md:p-12">
                    <span class="font-sans text-xs font-bold uppercase tracking-wider text-white bg-[#4338ca] px-3 py-1 rounded-full mb-4 inline-block">Technology</span>
                    <h1 class="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight max-w-3xl">The Future of Artificial Intelligence in Creative Industries</h1>
                    <div class="flex items-center gap-4 text-gray-300 font-sans text-sm">
                        <span class="font-semibold text-white">Sarah Jenkins</span>
                        <span>•</span>
                        <span>Oct 12, 2024</span>
                        <span>•</span>
                        <span>6 min read</span>
                    </div>
                </div>
            </div>
        </section>

        <div class="flex flex-col lg:flex-row gap-12">
            <!-- Main Content Grid -->
            <div class="lg:w-2/3">
                <div class="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
                    <h2 class="text-2xl font-bold">Latest Stories</h2>
                </div>
                
                <div class="masonry">
                    <!-- Article 1 -->
                    <article class="masonry-item article-card bg-white rounded-2xl overflow-hidden border border-gray-100 cursor-pointer" data-aos="fade-up">
                        <div class="h-48 bg-gradient-to-br from-indigo-100 to-purple-100 overflow-hidden relative">
                            <div class="absolute inset-0 article-img transition duration-500 bg-gray-200"></div>
                        </div>
                        <div class="p-6">
                            <span class="font-sans text-xs font-bold uppercase text-[#4338ca] mb-2 block">Design</span>
                            <h3 class="text-xl font-bold mb-3 leading-snug">Minimalism is dead. Long live maximalism.</h3>
                            <p class="text-gray-600 mb-4 line-clamp-3">Why designers are moving away from clean white spaces and embracing bold colors, chaotic layouts, and expressive typography in 2024.</p>
                            <div class="font-sans text-xs text-gray-500 font-medium">By Mark Rover • 4 min read</div>
                        </div>
                    </article>

                    <!-- Article 2 -->
                    <article class="masonry-item article-card bg-white rounded-2xl overflow-hidden border border-gray-100 cursor-pointer" data-aos="fade-up">
                        <div class="p-6">
                            <span class="font-sans text-xs font-bold uppercase text-[#4338ca] mb-2 block">Culture</span>
                            <h3 class="text-xl font-bold mb-3 leading-snug">The rise of digital nomad hubs in Southeast Asia</h3>
                            <p class="text-gray-600 mb-4 line-clamp-4">A deep dive into how remote work is reshaping cities like Bali and Chiang Mai, bringing both economic booms and local challenges.</p>
                            <div class="font-sans text-xs text-gray-500 font-medium">By Elena Costa • 8 min read</div>
                        </div>
                    </article>

                    <!-- Article 3 -->
                    <article class="masonry-item article-card bg-white rounded-2xl overflow-hidden border border-gray-100 cursor-pointer" data-aos="fade-up">
                        <div class="h-64 bg-gradient-to-br from-blue-100 to-green-100 overflow-hidden relative">
                            <div class="absolute inset-0 article-img transition duration-500 bg-gray-200"></div>
                        </div>
                        <div class="p-6">
                            <span class="font-sans text-xs font-bold uppercase text-[#4338ca] mb-2 block">Business</span>
                            <h3 class="text-xl font-bold mb-3 leading-snug">Bootstrap vs Venture Capital</h3>
                            <p class="text-gray-600 mb-4 line-clamp-2">Which path makes sense for the modern startup founder?</p>
                            <div class="font-sans text-xs text-gray-500 font-medium">By David Chen • 5 min read</div>
                        </div>
                    </article>
                </div>
                
                <div class="mt-8 text-center">
                    <button class="font-sans px-6 py-3 border border-gray-300 rounded-full text-sm font-bold hover:bg-gray-50 transition">Load More Articles</button>
                </div>
            </div>

            <!-- Sidebar -->
            <aside class="lg:w-1/3 space-y-10">
                <!-- Trending -->
                <div>
                    <h3 class="text-xl font-bold mb-6 border-b border-gray-200 pb-2">Trending</h3>
                    <div class="space-y-6">
                        <a href="#" class="flex gap-4 group">
                            <span class="text-4xl font-black text-gray-200 group-hover:text-[#4338ca] transition">01</span>
                            <div>
                                <h4 class="font-bold text-gray-900 group-hover:underline leading-tight mb-1">Why CSS Grid is still underutilized</h4>
                                <p class="font-sans text-xs text-gray-500">Tech • 3 min read</p>
                            </div>
                        </a>
                        <a href="#" class="flex gap-4 group">
                            <span class="text-4xl font-black text-gray-200 group-hover:text-[#4338ca] transition">02</span>
                            <div>
                                <h4 class="font-bold text-gray-900 group-hover:underline leading-tight mb-1">The psychology behind infinite scrolling</h4>
                                <p class="font-sans text-xs text-gray-500">Design • 5 min read</p>
                            </div>
                        </a>
                        <a href="#" class="flex gap-4 group">
                            <span class="text-4xl font-black text-gray-200 group-hover:text-[#4338ca] transition">03</span>
                            <div>
                                <h4 class="font-bold text-gray-900 group-hover:underline leading-tight mb-1">Sustainable practices in modern tech</h4>
                                <p class="font-sans text-xs text-gray-500">Business • 7 min read</p>
                            </div>
                        </a>
                    </div>
                </div>

                <!-- Newsletter -->
                <div class="bg-gray-100 rounded-2xl p-6 border border-gray-200 text-center font-sans">
                    <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                        <svg class="w-6 h-6 text-[#4338ca]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    </div>
                    <h3 class="text-lg font-bold mb-2 font-serif">Weekly Insights</h3>
                    <p class="text-sm text-gray-600 mb-6">Get the best stories delivered straight to your inbox every Sunday.</p>
                    <input type="email" placeholder="Email address" class="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:border-[#4338ca]">
                    <button class="w-full py-2 bg-[#4338ca] text-white rounded-lg font-bold hover:bg-indigo-800 transition shadow-md">Subscribe</button>
                </div>

                <!-- Tags Cloud -->
                <div>
                    <h3 class="text-xl font-bold mb-6 border-b border-gray-200 pb-2">Popular Tags</h3>
                    <div class="flex flex-wrap gap-2 font-sans">
                        <a href="#" class="tag-pill px-4 py-1.5 border border-gray-300 rounded-full text-xs font-semibold text-gray-600">#AI</a>
                        <a href="#" class="tag-pill px-4 py-1.5 border border-gray-300 rounded-full text-xs font-semibold text-gray-600">#WebDev</a>
                        <a href="#" class="tag-pill px-4 py-1.5 border border-gray-300 rounded-full text-xs font-semibold text-gray-600">#Startup</a>
                        <a href="#" class="tag-pill px-4 py-1.5 border border-gray-300 rounded-full text-xs font-semibold text-gray-600">#UX</a>
                        <a href="#" class="tag-pill px-4 py-1.5 border border-gray-300 rounded-full text-xs font-semibold text-gray-600">#Productivity</a>
                        <a href="#" class="tag-pill px-4 py-1.5 border border-gray-300 rounded-full text-xs font-semibold text-gray-600">#RemoteWork</a>
                    </div>
                </div>
            </aside>
        </div>
    </main>

    <footer class="bg-white border-t border-gray-200 mt-12 py-12">
        <div class="max-w-7xl mx-auto px-6 text-center font-sans">
            <a href="#" class="text-3xl font-black tracking-tight mb-4 inline-block">THE POST.</a>
            <div class="flex justify-center gap-6 text-sm text-gray-500 font-medium mb-8">
                <a href="#" class="hover:text-black">About</a>
                <a href="#" class="hover:text-black">Writers</a>
                <a href="#" class="hover:text-black">Privacy</a>
                <a href="#" class="hover:text-black">Terms</a>
            </div>
            <p class="text-xs text-gray-400">&copy; 2024 The Daily Post. All rights reserved.</p>
        </div>
    </footer>

    <script>
        AOS.init({ duration: 800, once: true });
    </script>
</body>
</html>
`;
export default blog;
