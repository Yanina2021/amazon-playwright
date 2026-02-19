# 🧪 Challenge QA Automation – Playwright

## Descripción

Este proyecto contiene la automatización de un flujo de búsqueda y ordenamiento de productos en Amazon utilizando **Playwright + TypeScript**.

## 🛠️ Tecnologías utilizadas

* **Playwright**
* **TypeScript**
* **Node.js**
* **Page Object Model (POM)**
* Variables de entorno con **.env**


## 📂 Estructura del proyecto

├── pages/
│   └── amazonPage.ts
├── specs/
│   └── amazon.spec.ts
    └── base.ts
├── .env
├── package.json
├── playwright.config.ts
└── README.md


## ⚙️ Instalación

1. Clonar el repositorio:

git clone <repo-url>
cd <repo-name>


2. Instalar dependencias:

npm install

3. Instalar navegadores de Playwright:

npx playwright install


## ▶️ Ejecución de tests

Para ejecutar todos los tests:

npx playwright test

Para ejecutar en modo UI:

npx playwright test --ui
