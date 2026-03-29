/* main.js - separated JavaScript for index.html */
import { analytics, logEvent } from './firebase-config.js';

const MAIN_AFF_LINK = "https://s.shopee.vn/2g6jNGrzQC";
const PRODUCTS = [
    {
        name: "Nước mắm chay Làng Chài Xưa",
        desc: "Ăn chay thanh tịnh, vị đậm đà chuẩn truyền thống – lựa chọn sạch cho người tu tập và sống lành mạnh. Xem ngay",
        image: "src/nuocmamchay.jpg",
        link: "https://s.shopee.vn/2g6jNGrzQC"
    },
    {
        name: "Nhang Sạch Thảo Mộc",
        desc: "Hương thơm dịu nhẹ, không hóa chất – giúp không gian thanh tịnh, dễ đi vào trạng thái thiền sâu. Xem ngay",
        image: "src/nhangsach.jpg",
        link: "https://s.shopee.vn/5L7UYlNsDM"
    },
    {
        name: "Bộ Tượng Tam Thánh",
        desc: "Bộ tượng mang ý nghĩa bảo hộ – thu hút năng lượng tích cực, phù hợp cho bàn thờ trang nghiêm. Xem ngay",
        image: "src/BoTuongTamThanh.jpg",
        link: "https://s.shopee.vn/10yVOkNulH"
    },
    {
        name: "Tượng Phật Quan Âm",
        desc: "Biểu tượng từ bi cứu khổ – giúp gia đạo an yên, tâm trí nhẹ nhàng hơn mỗi ngày. Xem ngay",
        image: "src/tuongphatquanam.jpg",
        link: "https://s.shopee.vn/6fcs983pxk"
    },
    {
        name: "Tượng Quan Âm Bồ Tát",
        desc: "Mang năng lượng bình an, giúp tâm an tĩnh – đặt trong nhà để cảm nhận sự che chở mỗi ngày. Xem ngay",
        image: "src/tuongmequanambotat.jpg",
        link: "https://s.shopee.vn/AACkJOXezX"
    },
    {
        name: "Tượng Quan Âm Bồ Tát",
        desc: "Tăng sự tập trung khi thiền, lan tỏa năng lượng từ bi – phù hợp bàn thờ và không gian tĩnh tâm. Xem ngay",
        image: "src/tuongmequanambotat1.jpg",
        link: "https://s.shopee.vn/7fVPKvwMyq"
    }
];

/* --- RENDER PRODUCTS --- */
const grid = document.getElementById('productGrid');

PRODUCTS.forEach((prod, index) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.onclick = () => {
        // Log product click event to Firebase
        logEvent(analytics, 'select_item', {
            items: [{
                item_id: `product_${index}`,
                item_name: prod.name,
                item_category: 'buddhist_products',
                price: 0,
                quantity: 1
            }]
        });
        
        // Also log a custom event
        logEvent(analytics, 'product_click', {
            product_name: prod.name,
            product_index: index,
            timestamp: new Date().toISOString()
        });
        
        window.open(prod.link, '_blank');
    };

    card.innerHTML = `
        <div class="product-img-wrap">
            <img src="${prod.image}" alt="${prod.name}" class="product-img" referrerPolicy="no-referrer">
        </div>
        <div class="product-info">
            <h3 class="product-name">${prod.name}</h3>
            <p class="product-desc">${prod.desc}</p>
            <span class="view-details">Xem thêm</span>
        </div>
    `;
    grid.appendChild(card);
});

const mainAffBtn = document.getElementById('mainAffBtn');
if (mainAffBtn) {
    mainAffBtn.onclick = (e) => {
        e.preventDefault();
        
        // Log button click event to Firebase
        logEvent(analytics, 'button_click', {
            button_name: 'main_affiliate_button',
            button_text: 'Xem bí quyết ăn chay',
            timestamp: new Date().toISOString()
        });
        
        // Also log as a view_item event
        logEvent(analytics, 'view_item', {
            items: [{
                item_id: 'main_feature',
                item_name: 'Ăn chay nuôi dưỡng nội tâm an yên',
                item_category: 'featured_content'
            }]
        });
        
        window.open(MAIN_AFF_LINK, '_blank');
    };
}

/* --- SCROLL EFFECTS --- */
const stickyNav = document.getElementById('stickyNav');
const reveals = document.querySelectorAll('.reveal');
let hasLoggedShopView = false;

window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    const heroImg = document.querySelector('.hero-bg img');
    if (heroImg) {
        heroImg.style.transform = `translateY(${scroll * 0.4}px) scale(1)`;
    }

    if (window.scrollY > 100) {
        stickyNav.classList.add('scrolled');
    } else {
        stickyNav.classList.remove('scrolled');
    }

    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('active');
            
            // Log when user scrolls to shop section
            if (reveal.id === 'shop' && !hasLoggedShopView) {
                hasLoggedShopView = true;
                logEvent(analytics, 'view_item_list', {
                    item_category: 'buddhist_products',
                    timestamp: new Date().toISOString()
                });
            }
        }
    });
});

/* --- FADE-IN ON LOAD --- */

// Log page view when page loads
logEvent(analytics, 'page_view', {
    page_title: 'An Nhiên Gia Đạo - Nam mô A Di Đà Phật',
    page_location: window.location.href,
    timestamp: new Date().toISOString()
});

// Log when user spends 30 seconds on the page (engagement metric)
setTimeout(() => {
    logEvent(analytics, 'engagement', {
        session_duration: 30,
        timestamp: new Date().toISOString()
    });
}, 30000);
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});
