# Zara Challenge

<kbd><img src="https://jorgebenitezlopez.com/github/marvel.png"></kbd>
<img src="https://img.shields.io/static/v1?label=JS&message=TypeScript&color=blue">


# Init

- npm install
- npm run dev (Para desarrollo)
- npm run build && npm run preview (Modo producción)
- npm run testvite (Test unitarios)
- npm run testcypress (Test e2e)

# Despliegue en producción

- Imagen de Docker: https://hub.docker.com/repository/docker/signados/zara-challenge-server/general
- Despliegue en servidor: https://zara-challenge-server-arm64-18.onrender.com/character/1017100


# Rutas

| URL path | Método | Descripción | Funcionalidades |
|----------|--------|--------------|-----------|
| / | GET | Buscador de personajes | Listado de personajes, buscador con contador de resultados y filtro de favoritos |
| /character/{id} | GET | Información y comics del personaje  | Información detallada del personaje y opción de hacerlo favorito ||

# Características

- Responsive
- Movile First
- Variables globales de CSS
- HTML semántico
- Flex
- SPA
- Atomic Design
- VIte
- Typescript
- Hooks (useFetch y useContext))
- Testing unitarios (Vite test) y e2e (Cypress)
- Accesibilidad al 100%
- Sin errores en la consola

# Extras

- Modo oscuro

# TODO

- Unificar los Tipos de TS
- Más Test e implementar TDD 
- SASS
- UseMemo
- React query
- Redux
- Ajustar el cambio de color
- Optimizar las variables del .env
- Implementar Function debunce para mejorar la usabilidad
