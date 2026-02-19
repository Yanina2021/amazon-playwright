# 🧪 Challenge QA Automation – Playwright

![Playwright Tests](https://github.com/Yanina2021/amazon-playwright/actions/workflows/playwright.yml/badge.svg)

## Descripción

Este proyecto contiene la automatización de un flujo de búsqueda y ordenamiento de productos en Amazon utilizando **Playwright + TypeScript**.

## 🌿 Estrategia de ramas

El repositorio utiliza dos ramas principales:

* develop → Rama principal de desarrollo y ejecución de tests.

* main → Rama estable / producción.

_________________________________________________________________________


## 🛠️ Tecnologías utilizadas

✅ Playwright

✅ TypeScript

✅ Node.js

✅ Page Object Model (POM)

✅ Variables de entorno con .env

✅ Jenkins Pipeline (Jenkinsfile)

_________________________________________________________________________

## 📂 Estructura del proyecto

├── pages/
│   └── homePage.ts
    └── login.ts
├── specs/
│   └── challange.spec.ts
  └── base.ts
├── .env
├── Jenkinsfile
├── package.json
├── playwright.config.ts
└── README.md

_________________________________________________________________________

## ⚙️ Instalación
## 1️⃣ Clonar el repositorio
git clone https://github.com/Yanina2021/amazon-playwright.git

cd amazon-playwright

## 2️⃣ Instalar dependencias
npm install

## 3️⃣ Instalar navegadores de Playwright
npx playwright install

## ▶️ Ejecución de tests
* Ejecutar todos los tests >> npx playwright test
* Ejecutar en modo UI >> npx playwright test --ui

_________________________________________________________________________

## 📊 Reportes

El proyecto genera:

* 📄 Reporte HTML automático
Ubicación: playwright-report/index.html

* Para visualizar el reporte HTML:  >> npx playwright show-report

_________________________________________________________________________

## 🚀 Ejecución en Jenkins

El proyecto incluye un Jenkinsfile para permitir la ejecución automatizada en un servidor Jenkins.

📌 Requisitos en Jenkins

* Plugin NodeJS

* Plugin Pipeline

* Plugin JUnit

* Node configurado como herramienta global

## 🛠️ Configuración del Job

* Crear nuevo Pipeline Job

* Seleccionar: Pipeline script from SCM

* SCM: Git

URL del repositorio: >>>> https://github.com/Yanina2021/amazon-playwright.git

Branch: >>>> */develop

_________________________________________________________________________
## 🔄 Flujo del Pipeline

El pipeline realiza:

* Clonado del repositorio

* Instalación de dependencias

* Instalación de navegadores Playwright

* Ejecución de tests

* Publicación de reporte HTML



