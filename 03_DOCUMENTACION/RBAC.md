# RBAC.md — ROLE BASED ACCESS CONTROL MATRIX

## Exact Roles
- `ADMIN`: Acceso total al sistema, configuraciones, usuarios, economía, trading, prd-forge, logs.
- `TEACHER`: Acceso exclusivo al panel docente musical (sus clases, sus alumnos, Zoom, grabaciones, materiales).
- `STUDENT`: Acceso exclusivo al panel académico "Mi Academia" (sus cursos, clases, Zoom, progreso, grabaciones vinculadas).
- `CLIENT`: Acceso exclusivo al e-commerce (catálogo, carrito, checkout, órdenes propias, perfil).

## Aislamiento Estricto
- Ningún usuario puede ver datos de otro usuario sin permisos explícitos.
- Respuestas no autorizadas devuelven `403 Forbidden`.
