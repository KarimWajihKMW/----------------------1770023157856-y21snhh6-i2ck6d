console.log('Akwadra Super Builder Initialized');

// --- DATA ---
const categories = [
    { id: 1, name: 'برجر', icon: '🍔', color: 'bg-orange-100 text-orange-600' },
    { id: 2, name: 'بيتزا', icon: '🍕', color: 'bg-red-100 text-red-600' },
    { id: 3, name: 'آسيوي', icon: '🍱', color: 'bg-yellow-100 text-yellow-600' },
    { id: 4, name: 'صحي', icon: '🥗', color: 'bg-green-100 text-green-600' },
    { id: 5, name: 'حلى', icon: '🍩', color: 'bg-pink-100 text-pink-600' },
];

const restaurants = [
    {
        id: 101,
        name: 'برجر كينجدم',
        rating: 4.8,
        time: '20-30 دقيقة',
        delivery: '5.00 ر.س',
        image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        tags: ['برجر', 'أمريكي', 'سريع'],
        menu: [
            { id: 1, name: 'دبل تشيز برجر', price: 25.00, desc: 'قطعتين لحم مع الجبن السويسري', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
            { id: 2, name: 'بطاطس مقلية', price: 10.00, desc: 'مقرمشة مع التوابل الخاصة', image: 'https://images.unsplash.com/photo-1573080496987-a199f8cd75ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
            { id: 3, name: 'ميلك شيك فراولة', price: 15.00, desc: 'طبيعي ومنعش', image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }
        ]
    },
    {
        id: 102,
        name: 'بيتزا هت سبوت',
        rating: 4.5,
        time: '35-45 دقيقة',
        delivery: 'مجاني',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        tags: ['بيتزا', 'إيطالي'],
        menu: [
            { id: 4, name: 'بيبروني كلاسيك', price: 35.00, desc: 'البيتزا الأكثر مبيعاً', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
            { id: 5, name: 'بيتزا خضار', price: 30.00, desc: 'صحية ولذيذة', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }
        ]
    },
    {
        id: 103,
        name: 'السوشي الذهبي',
        rating: 4.9,
        time: '40-50 دقيقة',
        delivery: '12.00 ر.س',
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        tags: ['سوشي', 'ياباني', 'فاخر'],
        menu: [
            { id: 6, name: 'طبق سوشي مشكل', price: 65.00, desc: '12 قطعة متنوعة', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }
        ]
    }
];

// --- STATE ---
let cart = [];

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // Original feature preserved and enhanced
    const launchBtn = document.getElementById('launch-app-btn');
    const splashScreen = document.getElementById('splash-screen');
    const appContainer = document.getElementById('app-container');

    launchBtn.addEventListener('click', () => {
        console.log('تم النقر على البطاقة!');
        // Preserve original alert with modification for flow
        alert('أهلاً بك في عالم البناء بدون كود! جاري تحميل تطبيق المطاعم...');
        
        // Transition
        splashScreen.style.opacity = '0';
        setTimeout(() => {
            splashScreen.style.display = 'none';
            appContainer.classList.remove('hidden');
            // Trigger reflow
            void appContainer.offsetWidth;
            appContainer.style.opacity = '1';
        }, 700);
    });

    renderHome();
});

// --- RENDER FUNCTIONS ---
function renderHome() {
    // Render Categories
    const catList = document.getElementById('categories-list');
    catList.innerHTML = categories.map(cat => `
        <div class="flex flex-col items-center min-w-[70px] cursor-pointer group">
            <div class="w-14 h-14 ${cat.color} rounded-full flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                ${cat.icon}
            </div>
            <span class="text-xs font-semibold mt-2 text-gray-700">${cat.name}</span>
        </div>
    `).join('');

    // Render Restaurants
    const restList = document.getElementById('restaurants-list');
    restList.innerHTML = restaurants.map(rest => `
        <div onclick="openRestaurant(${rest.id})" class="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer flex gap-4">
            <div class="w-24 h-24 flex-shrink-0">
                <img src="${rest.image}" class="w-full h-full object-cover rounded-xl" alt="${rest.name}">
            </div>
            <div class="flex-1 py-1">
                <div class="flex justify-between items-start">
                    <h3 class="font-bold text-gray-800 text-lg leading-tight">${rest.name}</h3>
                    <span class="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                        ★ ${rest.rating}
                    </span>
                </div>
                <p class="text-gray-500 text-xs mt-1">${rest.tags.join(' • ')}</p>
                <div class="flex items-center gap-4 mt-3 text-xs text-gray-500 font-medium">
                    <span class="flex items-center gap-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        ${rest.time}
                    </span>
                    <span class="flex items-center gap-1 text-orange-600">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                        ${rest.delivery}
                    </span>
                </div>
            </div>
        </div>
    `).join('');
}

function openRestaurant(id) {
    const rest = restaurants.find(r => r.id === id);
    if (!rest) return;

    // Switch View
    document.getElementById('home-view').classList.add('hidden');
    document.getElementById('tracking-view').classList.add('hidden');
    const menuView = document.getElementById('menu-view');
    menuView.classList.remove('hidden');
    menuView.classList.add('animate-fade-in');
    
    // Render Header
    document.getElementById('menu-header').innerHTML = `
        <div class="relative h-48 rounded-2xl overflow-hidden shadow-md mb-4">
            <img src="${rest.image}" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div class="absolute bottom-4 right-4 text-white">
                <h1 class="text-2xl font-bold">${rest.name}</h1>
                <p class="text-sm opacity-90">${rest.tags.join(' • ')}</p>
            </div>
        </div>
    `;

    // Render Items
    const menuItems = document.getElementById('menu-items');
    menuItems.innerHTML = rest.menu.map(item => `
        <div class="flex items-center gap-4 bg-white p-3 rounded-xl border border-gray-50 hover:border-orange-100 transition-colors">
            <img src="${item.image}" class="w-20 h-20 rounded-lg object-cover bg-gray-100">
            <div class="flex-1">
                <h4 class="font-bold text-gray-800">${item.name}</h4>
                <p class="text-xs text-gray-500 line-clamp-2 my-1">${item.desc}</p>
                <div class="flex justify-between items-center mt-2">
                    <span class="font-bold text-orange-600">${item.price.toFixed(2)} ر.س</span>
                    <button onclick="addToCart(${rest.id}, ${item.id})" class="bg-gray-100 hover:bg-orange-500 hover:text-white text-gray-800 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm">
                        +
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    window.scrollTo(0, 0);
}

function showHome() {
    document.getElementById('menu-view').classList.add('hidden');
    document.getElementById('tracking-view').classList.add('hidden');
    document.getElementById('home-view').classList.remove('hidden');
    document.getElementById('home-view').classList.add('animate-fade-in');
    window.scrollTo(0, 0);
}

// --- CART LOGIC ---
function addToCart(restId, itemId) {
    const rest = restaurants.find(r => r.id === restId);
    const item = rest.menu.find(i => i.id === itemId);
    
    // Check if adding from same restaurant (simplified for demo)
    const existingItem = cart.find(c => c.id === itemId);
    if (existingItem) {
        existingItem.qty++;
    } else {
        cart.push({ ...item, qty: 1 });
    }
    
    updateCartUI();
    
    // Visual feedback
    const badge = document.getElementById('cart-count');
    badge.classList.remove('scale-0');
    badge.classList.add('scale-125');
    setTimeout(() => badge.classList.remove('scale-125'), 200);
}

function removeFromCart(itemId) {
    const index = cart.findIndex(c => c.id === itemId);
    if (index > -1) {
        if (cart[index].qty > 1) {
            cart[index].qty--;
        } else {
            cart.splice(index, 1);
        }
    }
    updateCartUI();
}

function updateCartUI() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    
    const badge = document.getElementById('cart-count');
    badge.textContent = count;
    if (count > 0) badge.classList.remove('scale-0');
    else badge.classList.add('scale-0');
    
    document.getElementById('cart-total').textContent = total.toFixed(2) + ' ر.س';
    
    const container = document.getElementById('cart-items-container');
    if (cart.length === 0) {
        container.innerHTML = `<p class="text-center text-gray-500 py-4">السلة فارغة، أضف بعض الطعام اللذيذ!</p>`;
        document.getElementById('checkout-btn').disabled = true;
    } else {
        document.getElementById('checkout-btn').disabled = false;
        container.innerHTML = cart.map(item => `
            <div class="flex justify-between items-center">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-orange-100 text-orange-600 rounded flex items-center justify-center font-bold text-sm">${item.qty}x</div>
                    <div>
                        <p class="font-bold text-gray-800 text-sm">${item.name}</p>
                        <p class="text-xs text-gray-500">${(item.price * item.qty).toFixed(2)} ر.س</p>
                    </div>
                </div>
                <div class="flex gap-2">
                    <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:bg-red-50 p-1 rounded transition-colors">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6"></path></svg>
                    </button>
                </div>
            </div>
        `).join('');
    }
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    const content = document.getElementById('cart-content');
    
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        // Small delay to allow display:block to apply before transform
        setTimeout(() => {
            content.classList.remove('translate-y-full');
        }, 10);
    } else {
        content.classList.add('translate-y-full');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }
}

function placeOrder() {
    toggleCart();
    
    // Show loader or just transition
    setTimeout(() => {
        cart = [];
        updateCartUI();
        
        document.getElementById('home-view').classList.add('hidden');
        document.getElementById('menu-view').classList.add('hidden');
        const trackView = document.getElementById('tracking-view');
        trackView.classList.remove('hidden');
        trackView.classList.add('animate-fade-in');
        
        window.scrollTo(0, 0);
        alert('تم استلام طلبك بنجاح! جاري التوصيل 🚀');
    }, 500);
}
