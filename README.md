# PRD_SYSTEM — PLATAFORMA UNIFICADA ECOSISTÉMICA

**PRD_SYSTEM** es una plataforma unificada modular. Reúne en un único repositorio integrado y bajo un solo sistema de autenticación central los siguientes módulos de negocio:
- **Academia de Música**: Clases, alumnos, profesores, integración Zoom y grabaciones.
- **Investigación Económica**: Proveedores oficiales (FRED, BCRA, BYMA, ECB, IMF, World Bank, BIS, INDEC).
- **E-commerce**: Catálogo, carrito, órdenes y Checkout API de Mercado Pago.
- **Trading & Backtesting**: Estrategias, gestión de riesgo y análisis cuantitativo (Solo Administrador).
- **Biblioteca Central**: Repositorio digital multi-formato con control de visibilidad.
- **PRD-Forge Core**: Motor central de generación y arquitectura.

---

## ESTRUCTURA ARQUITECTÓNICA OBJETIVO

```
PRD_SYSTEM/
├── 01_ENTORNO/                  # Infraestructura Docker, Nginx, Redis, Postgres
├── 02_PROYECTOS/
│   ├── MULTIMODAL_SYSTEM/
│   │   ├── backend/             # Node.js + Express + TypeScript API Central
│   │   └── frontend/            # React + Vite + Tailwind CSS SPA Central
│   ├── MULTIMODAL_MUSIC_SPACE/  # Recursos musicales & backing tracks
│   ├── PERSONAL_WORK_SYSTEM/    # Módulo de trabajo personal
│   ├── TRADING_SYSTEM/          # Estrategias y scripts de trading
│   └── PRD_BUSINESS/            # Módulo de negocios
├── 03_DOCUMENTACION/            # Suite completa de especificación técnica
├── 04_RESPALDOS/                # Copias de seguridad
├── 05_INSTALADORES/             # Instaladores y binarios
├── 06_AUTOMATIZACION/           # Workflows n8n y background workers
├── 07_MULTIMEDIA/               # Repositorio multimedia global
├── 08_CORE_SYSTEM/prd-forge/    # Núcleo generador PRD-Forge
└── data/                        # Persistencia de datos
```

---

## AUTENTICACIÓN Y ROLES NORMATIVOS

La pantalla única de inicio de sesión es **PRD_SYSTEM LOGIN**.

El sistema aplica **Role Based Access Control (RBAC)** estricto con los siguientes 4 roles:
- **`ADMIN`**: Acceso total al sistema, configuraciones, usuarios, economía, trading, prd-forge y logs. Redirige a `/admin/dashboard`.
- **`TEACHER`**: Acceso exclusivo al panel docente musical (sus clases, sus alumnos, Zoom, grabaciones y materiales). Redirige a `/music/teacher/dashboard`.
- **`STUDENT`**: Acceso exclusivo al panel académico "Mi Academia" (sus cursos, clases, Zoom, progreso y grabaciones asignadas). Redirige a `/music/student/dashboard`.
- **`CLIENT`**: Acceso exclusivo al e-commerce (catálogo, carrito, checkout, órdenes propias y perfil). Redirige a `/ecommerce/dashboard`.

---

## CREDENCIALES DE DESARROLLO INICIALES

> [!NOTE]
> Todos los usuarios arrancan con la contraseña por defecto: `admin123`.

| Rol | Usuario | Email |
|---|---|---|
| **ADMIN** | `admin` | `admin@prdsystem.org` |
| **TEACHER** | `docente` | `docente@prdsystem.org` |
| **STUDENT** | `alumno` | `alumno@prdsystem.org` |
| **CLIENT** | `cliente` | `cliente@prdsystem.org` |

---

## GUÍA DE INSTALACIÓN Y EJECUCIÓN

### 1. Iniciar con Docker Compose
```bash
docker-compose -f 01_ENTORNO/docker/docker-compose.yml up -d
```

### 2. Ejecución Local Backend Central
```bash
cd 02_PROYECTOS/MULTIMODAL_SYSTEM/backend
npm install
npm run dev
```

### 3. Ejecución Local Frontend Central
```bash
cd 02_PROYECTOS/MULTIMODAL_SYSTEM/frontend
npm install
npm run dev
```

### 4. Pruebas Automatizadas de Seguridad (RBAC Test Suite)
```bash
cd 02_PROYECTOS/MULTIMODAL_SYSTEM/backend
npm test
```
