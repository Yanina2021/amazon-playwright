# 🧪 Challenge QA Automation – Playwright

## Descripción

Este proyecto contiene la automatización de un flujo de búsqueda y ordenamiento de productos en Amazon utilizando **Playwright + TypeScript**.
Este repositorio contiene tests automatizados usando **Playwright**. Con 2 Ramas: 
- `develop` → rama principal de desarrollo y tests
- `main` → rama de producción


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

git clone https://github.com/Yanina2021/amazon-playwright.git
cd amazon-playwright


2. Instalar dependencias:

npm install

3. Instalar navegadores de Playwright:

npx playwright install


## ▶️ Ejecución de tests hay diferentes formas:

1. Para ejecutar todos los tests:

1npx playwright test

2. Para ejecutar en modo UI:

npx playwright test --ui


----------------------------------------------------
## ▶️ Ejecución de tests en Jenkins / Pipeline (Jenkinsfile)



