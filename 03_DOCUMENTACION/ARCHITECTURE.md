# ARCHITECTURE.md — PRD_SYSTEM GENERAL ARCHITECTURE

PRD_SYSTEM es una plataforma única e integrada compuesta por:
- **Backend Central**: Express + TypeScript en `02_PROYECTOS/MULTIMODAL_SYSTEM/backend`
- **Frontend Central**: React + Vite + Tailwind CSS en `02_PROYECTOS/MULTIMODAL_SYSTEM/frontend`
- **Base de Datos Central**: PostgreSQL 16
- **Cache & Sesiones**: Redis 7
- **Orquestación**: Docker Compose + Nginx + n8n

## Principios de Diseño
1. **Unicidad**: Una sola aplicación frontend, una sola API backend, una sola base de datos PostgreSQL.
2. **Seguridad RBAC**: Roles normados `ADMIN`, `TEACHER`, `STUDENT`, `CLIENT`.
3. **Desacoplamiento**: Patrón Adaptador/Provider para integraciones de datos externos y pasarelas de pago.
4. **Datos Reales**: Arranque con 0 registros de negocio. No se permiten datos falsos.
