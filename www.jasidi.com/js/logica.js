document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica del Menú Hamburguesa ---
    const menuButton = document.getElementById('menu-button');
    const closeButton = document.getElementById('close-button');
    const menuContainer = document.getElementById('menu-container');
    const menuItems = document.querySelectorAll('.menu-list a');

    if (menuButton && closeButton && menuContainer) {
        menuButton.addEventListener('click', () => {
            menuContainer.classList.add('appear-menu-container');
        });

        closeButton.addEventListener('click', () => {
            menuContainer.classList.remove('appear-menu-container');
        });

        // Cerrar el menú al hacer clic en un enlace de navegación
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                menuContainer.classList.remove('appear-menu-container');
            });
        });
    }

    // --- Efecto de 'Scroll' en la barra de navegación ---
    const navbar = document.getElementById('jasidi-navbar');
    if (navbar) {
        const addNavbarStylesOnScroll = () => {
            // Elimina la lógica de ocultar/mostrar si quieres que siempre sea fija.
            // Si quieres que cambie de estilo pero siempre esté visible,
            // asegúrate de que tu CSS para .header-scroll-up-style y .header-top-cero-style
            // solo afecte el fondo, sombra, etc., pero no la visibilidad (e.g., display: none)
            if (window.scrollY > 50) {
                navbar.classList.add('header-scroll-up-style');
                navbar.classList.remove('header-top-cero-style');
            } else {
                navbar.classList.remove('header-scroll-up-style');
                navbar.classList.add('header-top-cero-style');
            }
        };

        window.addEventListener('scroll', addNavbarStylesOnScroll);
        window.addEventListener('load', addNavbarStylesOnScroll);
    }

    // --- Desplazamiento Suave (Smooth Scroll) ---
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                // Ajusta la altura si la barra de navegación se colapsa o es diferente en móvil
                const offsetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Carrusel de Portafolio (con flechas) ---
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevArrow = document.querySelector('.carousel-arrow--left');
    const nextArrow = document.querySelector('.carousel-arrow--right');

    if (carouselItems.length > 0 && carousel && prevArrow && nextArrow) {
        let currentIndex = 0;
        const totalItems = carouselItems.length;

        // Función para mostrar el ítem actual y ocultar los demás
        const showCarouselItem = (index) => {
            carouselItems.forEach((item, i) => {
                // Remove any previous active/hidden classes if they exist from a different display logic
                item.classList.remove('active');
                item.style.display = 'none'; // Initially hide all

                if (i === index) {
                    item.classList.add('active');
                    item.style.display = 'block'; // Show only the active one
                }
            });
        };

        // Navegación con flechas
        prevArrow.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            showCarouselItem(currentIndex);
        });

        nextArrow.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalItems;
            showCarouselItem(currentIndex);
        });

        // Lógica para el auto-avance (opcional, solo para móvil si se desea)
        let autoSlideInterval;
        const startAutoSlide = () => {
            if (autoSlideInterval) clearInterval(autoSlideInterval); // Clear any existing interval
            autoSlideInterval = setInterval(() => {
                nextArrow.click(); // Simulate a click on the next button
            }, 3000);
        };

        const stopAutoSlide = () => {
            clearInterval(autoSlideInterval);
        };

        // Lógica Responsiva para el carrusel
        const handleCarouselResponsiveness = () => {
            if (window.innerWidth < 800) {
                // En pantallas pequeñas, mostramos solo un ítem a la vez y activamos flechas/auto-avance
                showCarouselItem(currentIndex); // Ensure only one is shown
                carousel.style.display = 'block'; // Make sure the carousel container is block
                carouselItems.forEach(item => item.style.flex = 'none'); // Remove flex sizing if any
                prevArrow.style.display = 'block';
                nextArrow.style.display = 'block';
                startAutoSlide(); // Start auto-slide for mobile
            } else {
                // En pantallas grandes, mostramos todos los ítems en fila (GRID/FLEX) y ocultamos flechas/auto-avance
                carousel.style.display = 'grid'; // Assuming you use grid or flex for desktop
                carouselItems.forEach(item => {
                    item.style.display = 'block'; // Show all items
                    item.classList.remove('active'); // Remove active class
                });
                prevArrow.style.display = 'none';
                nextArrow.style.display = 'none';
                stopAutoSlide(); // Stop auto-slide for desktop
            }
        };

        // Inicializar y escuchar cambios de tamaño
        handleCarouselResponsiveness();
        window.addEventListener('resize', handleCarouselResponsiveness);
    }


    // --- Formulario de Contacto (Envío a WhatsApp) ---
    const whatsappForm = document.getElementById('whatsapp-form');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');

    const alertDiv = document.createElement('div');
    alertDiv.classList.add('alert');
    document.body.appendChild(alertDiv);

    const showAlert = (message, type) => {
        alertDiv.textContent = message;
        alertDiv.classList.remove('alert-success');
        if (type === 'success') {
            alertDiv.classList.add('alert-success');
        } else {
            alertDiv.classList.remove('alert-success');
        }
        alertDiv.classList.add('alert-show');

        setTimeout(() => {
            alertDiv.classList.remove('alert-show');
        }, 3000);
    };

    if (whatsappForm) {
        whatsappForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (nameInput.value.trim() === '' || phoneInput.value.trim() === '' || messageInput.value.trim() === '') {
                showAlert('Por favor, completa todos los campos.', 'error');
                return;
            }

            // ¡CAMBIA ESTO CON TU NÚMERO! Ejemplo para Argentina (+54 9 381 XXXXXXX): '549381XXXXXXX'
            const phoneNumber = 'TU_NUMERO_DE_WHATSAPP_AQUI';

            const name = nameInput.value.trim();
            const phone = phoneInput.value.trim();
            const userMessage = messageInput.value.trim();

            const whatsappMessage = `¡Hola! Me contacto desde tu sitio web.
Nombre: ${name}
Teléfono: ${phone}
Mensaje: ${userMessage}`;

            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

            window.open(whatsappURL, '_blank');

            showAlert('¡Redirigiendo a WhatsApp! Por favor, confirma el envío.', 'success');
            whatsappForm.reset();
        });
    }
});



