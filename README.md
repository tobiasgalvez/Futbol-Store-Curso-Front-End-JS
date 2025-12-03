# ⚽ Futbol Store
Futbol Store es una aplicación web e-commerce diseñada para la venta de artículos deportivos de alta gama. Este proyecto simula una tienda online completa, integrando consumo de APIs externas, gestión de estado local y validación de formularios interactiva.

🚀 Características Principales
1. Carga Dinámica de Productos (Fetch API)
Los productos ya no están "hardcodeados" en el HTML.
Se consumen datos desde una API externa (FakeStoreAPI) y se transforman en tiempo real para adaptarse a la temática de fútbol (mapeo de imágenes y títulos).
Manejo de asincronía con async/await.
2. Carrito de Compras Inteligente
Funcionalidad Completa: Agregar productos, eliminar ítems y modificar cantidades dinámicamente.
Cálculos en Tiempo Real: El contador del ícono del carrito y el precio total se actualizan automáticamente.
Persistencia de Datos: Uso de LocalStorage para que el usuario no pierda su carrito al cerrar o recargar la página.
Interfaz Modal: Visualización del carrito sin navegar a otra página.
3. Formularios y Validación
Validación del lado del cliente utilizando JavaScript (DOM Manipulation).
Verificación de campos requeridos y formato de correo electrónico (Regex) antes del envío.
Integración con Formspree para el envío funcional de correos.
4. Diseño y Accesibilidad (UI/UX)
Diseño totalmente Responsivo (Mobile First) utilizando CSS Grid y Flexbox.
Metaetiquetas para SEO básico.
Navegación fluida e interactiva.
🛠️ Tecnologías Utilizadas
HTML5: Estructura semántica.
CSS3: Variables CSS, Flexbox, Grid, Animaciones y Media Queries.
JavaScript: Lógica de negocio, manipulación del DOM y Fetch API.
LocalStorage: Almacenamiento de sesión del lado del cliente.
