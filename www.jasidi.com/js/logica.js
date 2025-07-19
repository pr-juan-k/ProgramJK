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
            if (window.scrollY > 50) { // Cuando el scroll es mayor a 50px
                navbar.classList.add('header-scroll-up-style');
                navbar.classList.remove('header-top-cero-style'); // Asegura que no tenga el estilo inicial si lo tuviera
            } else {
                navbar.classList.remove('header-scroll-up-style');
                navbar.classList.add('header-top-cero-style'); // Vuelve al estilo inicial
            }
        };

        // Ejecutar la función en el scroll y al cargar la página
        window.addEventListener('scroll', addNavbarStylesOnScroll);
        window.addEventListener('load', addNavbarStylesOnScroll); // Para aplicar el estilo si ya hay scroll al cargar
    }

    // --- Desplazamiento Suave (Smooth Scroll) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Previene el comportamiento de salto por defecto

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Obtener la altura de la barra de navegación para compensar el desplazamiento
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const offsetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Carrusel de Portafolio ---
    const carouselItems = document.querySelectorAll('.carousel-item');
    const carousel = document.querySelector('.carousel');

    if (carouselItems.length > 0 && carousel) {
        let currentIndex = 0;

        const showCarouselItem = (index) => {
            carouselItems.forEach((item, i) => {
                item.classList.remove('active', 'left');
                if (window.innerWidth < 800) { // Solo para pantallas pequeñas
                    if (i === index) {
                        item.classList.add('active');
                    } else if (i === (index + carouselItems.length - 1) % carouselItems.length) {
                        item.classList.add('left');
                    }
                } else { // Para pantallas grandes, muestra todos los ítems sin clases especiales de carrusel
                    item.style.transform = 'none'; // Deshace las transformaciones del carrusel móvil
                }
            });
        };

        const nextCarouselItem = () => {
            currentIndex = (currentIndex + 1) % carouselItems.length;
            showCarouselItem(currentIndex);
        };

        // Auto-avanzar el carrusel solo en móviles
        if (window.innerWidth < 800) {
            setInterval(nextCarouselItem, 3000); // Cambia cada 3 segundos
            showCarouselItem(currentIndex); // Muestra el primer ítem al cargar
        }

        // Vuelve a inicializar el carrusel si la ventana se redimensiona
        window.addEventListener('resize', () => {
            showCarouselItem(currentIndex); // Vuelve a aplicar la lógica de visibilidad basada en el tamaño de pantalla
        });
    }

    // --- Formulario de Contacto ---
    const contactForm = document.querySelector('.contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    // Crear un elemento para mostrar mensajes de alerta
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('alert');
    document.body.appendChild(alertDiv);

    const showAlert = (message, type) => {
        alertDiv.textContent = message;
        alertDiv.classList.remove('alert-success'); // Limpia clases previas
        if (type === 'success') {
            alertDiv.classList.add('alert-success');
        } else {
            alertDiv.classList.remove('alert-success'); // Por defecto para errores
        }
        alertDiv.classList.add('alert-show');

        setTimeout(() => {
            alertDiv.classList.remove('alert-show');
        }, 3000); // Oculta después de 3 segundos
    };

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Previene el envío por defecto del formulario

            // Validación básica
            if (nameInput.value.trim() === '' || emailInput.value.trim() === '' || messageInput.value.trim() === '') {
                showAlert('Por favor, completa todos los campos.', 'error');
                return;
            }

            // Validación de email simple (puedes usar una regex más compleja si necesitas)
            if (!emailInput.value.includes('@') || !emailInput.value.includes('.')) {
                showAlert('Por favor, ingresa un email válido.', 'error');
                return;
            }

            // Aquí puedes añadir la lógica para enviar el formulario (por ejemplo, con Fetch API a un servidor)
            // Por ahora, solo mostraremos un mensaje de éxito simulado
            console.log('Formulario enviado:', {
                name: nameInput.value,
                email: emailInput.value,
                message: messageInput.value
            });

            showAlert('¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');

            // Limpiar el formulario
            contactForm.reset();
        });
    }
});

// ... (Mantén todo el código JavaScript anterior para el menú, scroll, carrusel, etc.) ...

// --- Formulario de Contacto (Envío a WhatsApp) ---
const whatsappForm = document.getElementById('whatsapp-form'); // Seleccionamos el formulario por su nuevo ID
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone'); // Nuevo input para el teléfono
const messageInput = document.getElementById('message');

// Crear un elemento para mostrar mensajes de alerta
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
        e.preventDefault(); // Previene el envío por defecto del formulario

        // Validación de campos
        if (nameInput.value.trim() === '' || phoneInput.value.trim() === '' || messageInput.value.trim() === '') {
            showAlert('Por favor, completa todos los campos.', 'error');
            return;
        }

        // Aquí debes colocar tu número de WhatsApp con el código de país, sin el signo '+'
        // Ejemplo para Argentina (+549381XXXXXXX): '549381XXXXXXX'
        const phoneNumber = '5493815088924'; // ¡CAMBIA ESTO CON TU NÚMERO!

        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        const userMessage = messageInput.value.trim();

        // Construir el mensaje para WhatsApp
        const whatsappMessage = `¡Hola! Me contacto desde tu sitio web.
Nombre: ${name}
Teléfono: ${phone}
Mensaje: ${userMessage}`;

        // Codificar el mensaje para la URL
        const encodedMessage = encodeURIComponent(whatsappMessage);

        // Construir la URL de WhatsApp
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        // Abrir WhatsApp en una nueva pestaña
        window.open(whatsappURL, '_blank');

        showAlert('¡Redirigiendo a WhatsApp! Por favor, confirma el envío.', 'success');

        // Opcional: Limpiar el formulario después de redirigir
        whatsappForm.reset();
    });
}
