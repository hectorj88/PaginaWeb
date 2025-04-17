// Menú Hamburguesa
const menuHamburguesa = document.querySelector('.menu-hamburguesa');
const navLinks = document.querySelector('.nav-links');
const navContainer = document.querySelector('.nav-container');

menuHamburguesa.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navContainer.classList.toggle('menu-open');
});

// Cerrar menú al hacer click en enlace (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navContainer.classList.remove('menu-open');
    });
});

// Scroll suave para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animaciones AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 150
});

// Funcion para validar el correo ingresado por el cliente.
function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Manejo de formulario
const contactoForm = document.querySelector('.contacto-form');
contactoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = contactoForm.querySelector('input[type="text"]').value.trim();
    const email = contactoForm.querySelector('input[type="email"]').value.trim();
    const mensaje = contactoForm.querySelector('textarea').value.trim();
    
    // Simular envío
    /*contactoForm.reset();
    Swal.fire({
        icon: 'success',
        title: 'Mensaje enviado',
        text: 'Nos pondremos en contacto contigo en menos de 24 horas',
        confirmButtonColor: '#073B3A'
    });*/
    // Validar campos
    if (!validarEmail(email)) {
        Swal.fire({
            icon: 'error',
            title: 'Email inválido',
            text: 'Por favor ingresa un correo electrónico válido.',
            confirmButtonColor: '#073B3A'
        });
        return;
    }

    const templateParams = {
        name: nombre,
        email_customer: email,
        message: mensaje
    };

    // Enviar correo a tu Gmail
        // Enviar correo al cliente
    emailjs.send('service_bi24nco', 'template_85j9cbp', templateParams)
        .then(() => {
        contactoForm.reset();
        Swal.fire({
            icon: 'success',
            title: 'Mensaje enviado',
            text: 'Nos pondremos en contacto contigo en menos de 24 horas',
            confirmButtonColor: '#073B3A'
        });
        }, (error) => {
        console.error('Error enviando correo al cliente:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo enviar el correo de confirmación al cliente.',
            confirmButtonColor: '#073B3A'
        });
        });
    }, (error) => {
    console.error('Error enviando correo a ti:', error);
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo enviar el mensaje. Intenta de nuevo más tarde.',
        confirmButtonColor: '#073B3A'
    });    
});

// Efecto de cambio de header al hacer scroll
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Observer para animaciones al aparecer elementos
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(element => {
    observer.observe(element);
});