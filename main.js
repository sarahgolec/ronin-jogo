(() => {
    const navbar = document.querySelector('.navbar');
    const menu = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    const imageModal = document.getElementById('modal-img');
    const enlargedImage = document.getElementById('img-ampliada');
    const imageCaption = document.getElementById('img-legenda');
    const imageCounter = document.getElementById('img-contador');
    const galleryCards = [...document.querySelectorAll('[data-gallery-image]')];
    let lastFocusedElement = null;
    let activeImageIndex = 0;

    const showGalleryImage = (index) => {
        if (!galleryCards.length || !enlargedImage || !imageCaption) return;
        activeImageIndex = (index + galleryCards.length) % galleryCards.length;
        const card = galleryCards[activeImageIndex];
        const image = card.querySelector('img');
        if (!image) return;
        enlargedImage.src = image.currentSrc || image.src;
        enlargedImage.alt = image.alt;
        imageCaption.textContent = card.querySelector('span')?.textContent.trim() || image.alt;
        if (imageCounter) imageCounter.textContent = `${activeImageIndex + 1} / ${galleryCards.length}`;
        fitEnlargedImage();
    };

    const closeMenu = (restoreFocus = false) => {
        if (!menu || !menuToggle) return;
        menu.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menu');
        if (restoreFocus) menuToggle.focus();
    };

    menuToggle?.addEventListener('click', () => {
        const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
        menu?.classList.toggle('is-open', !isOpen);
    });

    menu?.addEventListener('click', (event) => {
        if (event.target.closest('a')) closeMenu();
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.navbar')) closeMenu();
    });

    const backToTop = document.createElement('a');
    backToTop.className = 'back-to-top';
    backToTop.href = '#inicio';
    backToTop.setAttribute('aria-label', 'Voltar ao início');
    backToTop.innerHTML = '<i class="fa-solid fa-arrow-up" aria-hidden="true"></i>';
    document.body.append(backToTop);

    const updateScrollUI = () => {
        const isScrolled = window.scrollY > 24;
        navbar?.classList.toggle('is-scrolled', isScrolled);
        backToTop.classList.toggle('is-visible', window.scrollY > 500);
    };

    window.addEventListener('scroll', updateScrollUI, { passive: true });
    updateScrollUI();

    const closeImageViewer = () => {
        if (!imageModal || imageModal.hidden) return;
        imageModal.hidden = true;
        imageModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('is-modal-open');
        enlargedImage.removeAttribute('src');
        enlargedImage.style.removeProperty('width');
        enlargedImage.style.removeProperty('height');
        imageCaption.textContent = '';
        lastFocusedElement?.focus();
    };

    const fitEnlargedImage = () => {
        if (!enlargedImage?.naturalWidth || !enlargedImage.naturalHeight) return;
        enlargedImage.style.removeProperty('width');
        enlargedImage.style.removeProperty('height');
    };

    enlargedImage?.addEventListener('load', fitEnlargedImage);
    window.addEventListener('resize', fitEnlargedImage, { passive: true });

    galleryCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            if (!card.querySelector('img') || !imageModal || !enlargedImage) return;

            lastFocusedElement = card;
            showGalleryImage(index);
            imageModal.hidden = false;
            imageModal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('is-modal-open');
            imageModal.querySelector('.close-btn-img')?.focus();
        });
    });

    imageModal?.addEventListener('click', (event) => {
        if (event.target === imageModal || event.target.closest('.close-btn-img')) closeImageViewer();
        if (event.target.closest('.gallery-prev')) showGalleryImage(activeImageIndex - 1);
        if (event.target.closest('.gallery-next')) showGalleryImage(activeImageIndex + 1);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            const menuWasOpen = menuToggle?.getAttribute('aria-expanded') === 'true';
            closeImageViewer();
            closeMenu(menuWasOpen);
        }

        if (imageModal && !imageModal.hidden && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
            event.preventDefault();
            showGalleryImage(activeImageIndex + (event.key === 'ArrowRight' ? 1 : -1));
        }

        if (event.key === 'Tab' && imageModal && !imageModal.hidden) {
            const closeButton = imageModal.querySelector('.close-btn-img');
            event.preventDefault();
            closeButton?.focus();
        }
    });
})();



