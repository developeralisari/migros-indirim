function applyDiscountBadges() {
    setTimeout(function () {
        const productItems = document.querySelectorAll('sm-list-page-item');
        
        productItems.forEach(function(product) {
            const originalPriceText = product.querySelector('.price .single-price-amount')?.textContent.trim();
            const discountPriceText = product.querySelector('.money-discount .sale-price')?.textContent.trim();
            const productNameText = product.querySelector('.product-name')?.textContent.trim();
            
            if (!originalPriceText || !discountPriceText || !productNameText) return;
            
            const originalPrice = parseFloat(originalPriceText.replace(',', '.'));
            const discountPrice = parseFloat(discountPriceText.replace(',', '.'));
            
            if (originalPrice && discountPrice && discountPrice < originalPrice) {
                const discountPercentage = Math.round(((originalPrice - discountPrice) / originalPrice) * 100);

                // İndirim Rozeti
                const badgeContainer = document.createElement('div');
                badgeContainer.style.display = 'flex';
                badgeContainer.style.flexDirection = 'column';
                badgeContainer.style.alignItems = 'center';
                badgeContainer.style.position = 'absolute';
                badgeContainer.style.top = '10px';
                badgeContainer.style.right = '10px';
                badgeContainer.style.zIndex = '2';
                
                const badge = document.createElement('div');
                badge.classList.add('discount-badge');
                badge.style.backgroundColor = '#e53935';
                badge.style.color = 'white';
                badge.style.padding = '5px 10px';
                badge.style.borderRadius = '12px';
                badge.style.fontSize = '14px';
                badge.style.fontWeight = 'bold';
                badge.textContent = `%${discountPercentage} İNDİRİM`;
                
                // Akakçe Bağlantısı
                const akakceLink = document.createElement('a');
                akakceLink.href = `https://www.akakce.com/arama/?q=${encodeURIComponent(productNameText)}`;
                akakceLink.target = '_blank';
                akakceLink.textContent = 'Akakçe';
                akakceLink.style.backgroundColor = '#1565c0';
                akakceLink.style.color = 'white';
                akakceLink.style.padding = '5px';
                akakceLink.style.borderRadius = '12px';
                akakceLink.style.marginBottom = '5px';
                akakceLink.style.textDecoration = 'none';
                akakceLink.style.textAlign = 'center';
                
                badgeContainer.appendChild(akakceLink);
                badgeContainer.appendChild(badge);
                
                const productImage = product.querySelector('fe-product-image');
                if (productImage) {
                    productImage.style.position = 'relative';
                    productImage.appendChild(badgeContainer);
                }
            }
        });
    }, 2000);
}

function checkUrlChange() {
    const currentUrl = window.location.href;
    const storedUrl = localStorage.getItem('lastUrl');

    if (currentUrl !== storedUrl) {
        applyDiscountBadges();
        localStorage.setItem('lastUrl', currentUrl);
    }
}

applyDiscountBadges();
setInterval(checkUrlChange, 2000);