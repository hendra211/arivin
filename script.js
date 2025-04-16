// Data produk
const products = [
    {
        id: 1,
        name: "Jaket Kulit Premium",
        price: 2999000,
        category: "Jaket",
        description: "Jaket kulit full-grain dengan jahitan premium.",
        image: "",
        colors: ["black", "darkblue", "cream", "red"],
        sizes: ["M", "L", "XL"]
    },
    {
        id: 2,
        name: "Tas Tote Desainer",
        price: 1299000,
        category: "Tas",
        description: "Tas tote luas dengan beberapa kompartemen dan material tahan lama.",
        image: ""
    },
    {
        id: 3,
        name: "T-Shirt Cotton Crewneck",
        price: 349000,
        category: "T-Shirt",
        description: "T-shirt 100% katun organik dengan jahitan kuat.",
        image: "assets/WhatsApp Image 2025-04-15 at 20.36.10_a948b8e4.jpg",
        colors: ["skyblue", "babypink", "cube", "navy", "wildginger", "magenta", "maroon", "white"],
        sizes: ["M", "L", "XL", "XXL"]
    },
    {
        id: 4,
        name: "Sweater Rajut Wol",
        price: 799000,
        category: "Sweater",
        description: "Sweater rajutan wol dengan desain modern.",
        image: ""
    },
    {
        id: 5,
        name: "Jaket Bomber",
        price: 200000,
        category: "Jaket",
        description: "Jaket bomber ringan dengan finishing tahan air.",
        image: "",
        colors: ["black", "darkblue", "cream", "red"],
        sizes: ["M", "L", "XL"]
    },
    {
        id: 6,
        name: "Tas Crossbody",
        price: 899000,
        category: "Tas",
        description: "Tas crossbody compact dengan tali yang bisa disesuaikan.",
        image: ""
    },
    {
        id: 7,
        name: "T-Shirt V-Neck",
        price: 299000,
        category: "T-Shirt",
        description: "T-shirt v-neck lembut dengan bahan yang nyaman.",
        image: "assets/WhatsApp Image 2025-04-15 at 20.36.12_923a2479.jpg",
        colors: ["skyblue", "babypink", "cube", "navy", "wildginger", "magenta", "maroon", "white"],
        sizes: ["M", "L", "XL", "XXL"]
    },
    {
        id: 8,
        name: "Sweater Hoodie",
        price: 649000,
        category: "Sweater",
        description: "Sweater hoodie dengan bahan fleece yang hangat.",
        image: ""
    },
    {
        id: 9,
        name: "T-Shirt Graphic Print",
        price: 399000,
        category: "T-Shirt",
        description: "T-shirt dengan desain grafis unik dan bahan nyaman.",
        image: "assets/WhatsApp Image 2025-04-15 at 20.36.10_be158a26.jpg",
        colors: ["white", "black", "red"],
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 10,
        name: "T-Shirt Sporty",
        price: 329000,
        category: "T-Shirt",
        description: "T-shirt sporty dengan bahan cepat kering.",
        image: "assets/WhatsApp Image 2025-04-15 at 20.36.11_7b638bb0.jpg",
        colors: ["blue", "grey", "white"],
        sizes: ["M", "L", "XL"]
    },
    {
        id: 11,
        name: "T-Shirt Casual Fit",
        price: 279000,
        category: "T-Shirt",
        description: "T-shirt casual fit dengan bahan lembut dan nyaman.",
        image: "assets/WhatsApp Image 2025-04-15 at 20.36.11_80841324.jpg",
        colors: ["navy", "white", "black"],
        sizes: ["S", "M", "L"]
    }
];

// Color name to hex value mapping
function getColorValue(color) {
    const colors = {
        'black': '#000000',
        'darkblue': '#00008B', 
        'cream': '#FFFDD0',
        'red': '#FF0000',
        'skyblue': '#87CEEB',
        'babypink': '#FFC0CB',
        'cube': '#6495ED',
        'navy': '#000080',
        'wildginger': '#D27D46',
        'magenta': '#FF00FF',
        'maroon': '#800000',
        'white': '#FFFFFF'
    };
    return colors[color.toLowerCase()] || '#CCCCCC';
}

// Format harga ke Rupiah
function formatRupiah(angka) {
    return 'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

document.addEventListener('DOMContentLoaded', function() {
    // Add size selector click handler
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('size-option')) {
            const sizeOptions = e.target.parentElement.querySelectorAll('.size-option');
            sizeOptions.forEach(option => option.classList.remove('active'));
            e.target.classList.add('active');
        }
        if (e.target.classList.contains('color-option')) {
            const colorOptions = e.target.parentElement.querySelectorAll('.color-option');
            colorOptions.forEach(option => option.classList.remove('active'));
            e.target.classList.add('active');
        }
    });

    // Fungsi pencarian
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const productCards = document.querySelectorAll('.product-card');
        
        if (!searchTerm) {
            // Jika pencarian kosong, tampilkan semua produk
            productCards.forEach(card => {
                card.style.display = 'block';
            });
            return;
        }
        
        productCards.forEach(card => {
            const productId = parseInt(card.querySelector('.add-to-cart').getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            const matches = product.name.toLowerCase().includes(searchTerm) || 
                          product.description.toLowerCase().includes(searchTerm) ||
                          product.category.toLowerCase().includes(searchTerm);
            
            card.style.display = matches ? 'block' : 'none';
        });
    }
    
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('input', performSearch);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Menampilkan produk
    const productContainer = document.getElementById('product-container');
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image" style="background-color: #f5f5f5; ${product.image ? `background-image: url('${product.image}'); background-size: cover; background-position: center;` : ''}"></div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">${formatRupiah(product.price)}</div>
                <p class="product-description">${product.description}</p>
                ${product.sizes ? `
                <div class="size-selector">
                    ${product.sizes.map(size => `
                        <button class="size-option" data-size="${size}">${size}</button>
                    `).join('')}
                </div>
                ` : ''}
                ${product.colors ? `
                <div class="color-selector">
                    ${product.colors.map(color => `
                        <button class="color-option" data-color="${color}" style="background-color: ${getColorValue(color)}"></button>
                    `).join('')}
                </div>
                ` : ''}
                <button class="add-to-cart" data-id="${product.id}">+ Keranjang</button>
            </div>
        `;
        
        productContainer.appendChild(productCard);
    });

    // Handle dropdown category links
    document.querySelectorAll('.dropdown-content a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            filterProducts(category);
            
            // Update active state on category buttons
            const filterButtons = document.querySelectorAll('.category-filter button');
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.textContent === category) {
                    btn.classList.add('active');
                }
            });
        });
    });

    // Filter kategori
    const filterButtons = document.querySelectorAll('.category-filter button');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.textContent;
            filterProducts(category);
        });
    });

    function filterProducts(category) {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const productId = parseInt(card.querySelector('.add-to-cart').getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            
            if (category === 'Semua' || product.category === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Fungsi keranjang belanja
    let cart = [];
    
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            
            const size = e.target.closest('.product-card').querySelector('.size-option.active')?.dataset.size;
            const color = e.target.closest('.product-card').querySelector('.color-option.active')?.dataset.color;
            
            if (product.sizes && !size) {
                showCartNotification('Silakan pilih ukuran terlebih dahulu!');
                return;
            }
            if (product.colors && !color) {
                showCartNotification('Silakan pilih warna terlebih dahulu!');
                return;
            }
            
            const existingItem = cart.find(item => 
                item.id === productId && 
                item.size === size && 
                item.color === color
            );
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    ...product, 
                    quantity: 1, 
                    size,
                    color
                });
            }
            
            updateCartCount();
            showCartNotification(`${product.name} ditambahkan ke keranjang!`);
        }
    });

    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCount = document.querySelector('.cart-count');
        
        if (cartCount) {
            cartCount.textContent = totalItems;
        } else {
            const cartLink = document.querySelector('nav ul li:last-child a');
            cartLink.innerHTML = `<i class="fas fa-shopping-cart cart-icon"></i> Keranjang <span class="cart-count">${totalItems}</span>`;
        }
    }

    function showCartNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 500);
        }, 2000);
    }

    // Modal pesanan custom
    const modal = document.getElementById('custom-order-modal');
    const orderBtn = document.getElementById('custom-order-btn');
    const closeBtn = document.querySelector('.close');
    
    orderBtn.addEventListener('click', function() {
        modal.style.display = 'block';
    });
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Form pesanan custom
    const orderForm = document.getElementById('custom-order-form');
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Terima kasih atas permintaan pesanan custom Anda! Kami akan menghubungi Anda segera.');
        modal.style.display = 'none';
        orderForm.reset();
    });
});

// Style untuk notifikasi keranjang
const style = document.createElement('style');
style.textContent = `
.cart-notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #1a3e72;
    color: white;
    padding: 1rem 2rem;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    animation: slideIn 0.3s ease-out;
    z-index: 1000;
}

.cart-notification.fade-out {
    animation: fadeOut 0.5s ease-out;
}

@keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
}

@keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
}
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    const belanjaButton = document.getElementById('belanja-sekarang');

    if (belanjaButton) {
        belanjaButton.addEventListener('click', () => {
            belanjaButton.classList.add('active');

            // Remove the active class after the animation ends
            setTimeout(() => {
                belanjaButton.classList.remove('active');
            }, 500); // Match the duration of the animation
        });
    }
});
