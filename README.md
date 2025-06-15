# AI4Devs Final Project

Este proyecto contiene un frontend (React + Vite), un backend (NestJS) y una base de datos PostgreSQL, todo orquestado con Docker.

## URLs de acceso
- **Producción**: [http://13.61.15.14](http://13.61.15.14)
- **Desarrollo local**: [http://localhost:5173](http://localhost:5173)


## Requisitos previos
- [Docker](https://www.docker.com/get-started/) y [Docker Compose](https://docs.docker.com/compose/) instalados
- Node.js >= 18 (solo si quieres desarrollo local fuera de Docker)

## Estructura del proyecto
- `/frontend`: Aplicación web (React)
- `/backend`: API y lógica de negocio (NestJS)
- `/README.md`: Este archivo


---

## Despliegue rápido con Docker

### 1. Clona el repositorio
```bash
git clone <URL_DEL_REPO>
cd AI4Devs-finalproject
```

### 2. Levanta todos los servicios (backend, frontend y base de datos)
Desde la raíz del proyecto:

```bash
docker-compose up --build
```

Esto levantará:
- **PostgreSQL** en el puerto 5432
- **Backend NestJS** en el puerto 3000
- **Frontend React** en el puerto 5173

Puedes acceder a la app en: [http://localhost:5173](http://localhost:5173)

---

## Comandos útiles

- Parar los servicios:
  ```bash
  docker-compose down
  ```
- Ver logs de un servicio:
  ```bash
  docker-compose logs <servicio>
  # Ejemplo: docker-compose logs backend
  ```
- Reconstruir los contenedores:
  ```bash
  docker-compose up --build
  ```

---

## Desarrollo local (sin Docker)

### Backend
```bash
cd backend
npm install
npm run start:dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Base de datos
Puedes usar tu propia instancia de PostgreSQL o levantar solo la base de datos con Docker:
```bash
docker-compose up postgres
```

---

## Notas
- Asegúrate de configurar las variables de entorno necesarias en los archivos `.env` de cada servicio si es necesario.
- Para pruebas automáticas, revisa los scripts en los respectivos `package.json`.

---

¿Dudas? Abre un issue o contacta con el equipo. 