# Satori - Tienda de Ropa

Una tienda de ropa moderna construida con React y Vite, con integración de WhatsApp para facilitar las compras.

## 🚀 Características

- Catálogo de productos dinámico
- Detalles de productos con imágenes
- Integración directa con WhatsApp
- Interfaz responsiva y moderna

## 📁 Estructura del Proyecto

```
satori-project/
├── public/              # Archivos estáticos
├── src/
│   ├── assets/          # Imágenes y estilos globales
│   ├── components/      # Componentes reutilizables
│   ├── data/            # Base de datos simulada (JSON)
│   ├── pages/           # Vistas principales
│   ├── App.jsx          # Componente raíz
│   └── main.jsx         # Punto de entrada
├── .env.example         # Plantilla de variables de entorno
├── package.json         # Dependencias del proyecto
└── README.md           # Este archivo
```

## 🔧 Instalación

1. Clona o descarga el proyecto
2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` basado en `.env.example`:
```bash
cp .env.example .env
```

4. Edita `.env` con tus configuraciones (número de WhatsApp, etc.)

## 💻 Desarrollo

Para iniciar el servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🏗️ Build para Producción

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`

## 📝 Variables de Entorno

- `VITE_WHATSAPP_NUMBER`: Tu número de WhatsApp (ej: 5491234567890)
- `VITE_STORE_NAME`: Nombre de tu tienda
- `VITE_CURRENCY`: Moneda (ej: ARS, USD)

## 🤝 Contribuir

Si retomas este proyecto, recuerda que:
- Los productos se cargan desde `src/data/productos.json`
- Los componentes principales están en `src/components/`
- Las páginas están en `src/pages/`

¡Diviértete construyendo tu tienda! 🎨
