<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# NeoBus Backend

## Descripción

Backend para el sistema de monitoreo de buses NeoBus, desarrollado con NestJS y TypeORM.

## Configuración del Proyecto

```bash
# Instalar dependencias
$ npm install
```

## Configuración de la Base de Datos

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Configuración de la Base de Datos
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=neobus

# Configuración de la Aplicación
NODE_ENV=development
PORT=3000

# Configuración de TypeORM
TYPEORM_SYNCHRONIZE=false
TYPEORM_LOGGING=true

# Configuración de Seguridad
JWT_SECRET=your-secret-key
JWT_EXPIRATION=3600

# Configuración de CORS
CORS_ORIGIN=http://localhost:3000,http://localhost:4200

# Configuración de WebSocket
WS_PORT=3001

# Configuración de Logs
LOG_LEVEL=debug
```

### Configuración con Docker

```bash
# Iniciar la base de datos PostgreSQL
$ docker-compose up -d

# Verificar que el contenedor está corriendo
$ docker ps

# Ver los logs del contenedor
$ docker-compose logs -f

# Para detener la base de datos
$ docker-compose down
```

## Gestión de la Base de Datos

### Comandos Disponibles

```bash
# Inicializar la base de datos (desarrollo)
$ npm run db:init

# Inicializar la base de datos (producción)
$ npm run db:init:prod

# Reiniciar la base de datos (desarrollo)
$ npm run db:reset

# Reiniciar la base de datos (producción)
$ npm run db:reset:prod

# Ver estado de la base de datos
$ npm run db:status
```

### Migraciones

El proyecto utiliza TypeORM para la gestión de migraciones. Los siguientes comandos están disponibles:

```bash
# Generar una nueva migración
$ npm run migration:generate -- src/migrations/NombreMigracion

# Ejecutar migraciones pendientes
$ npm run migration:run

# Revertir la última migración
$ npm run migration:revert

# Sincronizar esquema (solo desarrollo)
$ npm run schema:sync

# Eliminar esquema (¡cuidado!)
$ npm run schema:drop
```

#### Cuándo usar cada comando:

1. **`migration:generate`**:
   - Cuando modificas entidades (añades/modificas/eliminas campos)
   - Genera el SQL necesario para los cambios

2. **`migration:run`**:
   - Al desplegar la aplicación
   - Cuando hay cambios pendientes en la base de datos

3. **`migration:revert`**:
   - Si necesitas deshacer la última migración
   - En caso de problemas con una migración

4. **`schema:sync`**:
   - Solo en desarrollo
   - Para actualizar rápidamente la estructura

5. **`schema:drop`**:
   - Solo en desarrollo
   - Para empezar desde cero

### Flujo de Trabajo Recomendado

1. **Durante el desarrollo**:
```bash
# 1. Hacer cambios en las entidades
# 2. Generar la migración
$ npm run migration:generate -- src/migrations/AddNewField

# 3. Revisar el archivo de migración generado
# 4. Ejecutar la migración
$ npm run migration:run
```

2. **En producción**:
```bash
# Solo ejecutar migraciones existentes
$ npm run migration:run
```

## Compilación y Ejecución

```bash
# desarrollo
$ npm run start

# modo watch
$ npm run start:dev

# producción
$ npm run start:prod
```

## Tests

```bash
# tests unitarios
$ npm run test

# tests e2e
$ npm run test:e2e

# cobertura de tests
$ npm run test:cov
```

## Despliegue

### AWS

Para desplegar en AWS, asegúrate de:

1. Configurar las variables de entorno en el panel de control de EC2
2. Usar AWS Secrets Manager para las credenciales
3. Configurar los grupos de seguridad adecuadamente
4. Usar el comando `npm run db:init:prod` para inicializar la base de datos

### Variables de Entorno en Producción

Crea un archivo `.env.production` con:

```env
# Configuración de la Base de Datos (AWS RDS)
DB_HOST=${RDS_HOSTNAME}
DB_PORT=${RDS_PORT}
DB_USERNAME=${RDS_USERNAME}
DB_PASSWORD=${RDS_PASSWORD}
DB_DATABASE=${RDS_DB_NAME}

# Configuración de la Aplicación
NODE_ENV=production
PORT=3000

# Configuración de TypeORM
TYPEORM_SYNCHRONIZE=false
TYPEORM_LOGGING=false

# Configuración de Seguridad
JWT_SECRET=your-production-secret-key
JWT_EXPIRATION=3600

# Configuración de CORS
CORS_ORIGIN=https://tu-dominio.com

# Configuración de WebSocket
WS_PORT=3001

# Configuración de Logs
LOG_LEVEL=info

# Configuración de AWS
AWS_REGION=eu-west-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
```

## Buenas Prácticas

1. **Seguridad**:
   - Nunca subas archivos `.env` a git
   - Usa contraseñas fuertes
   - Rota las claves regularmente
   - Usa IAM roles cuando sea posible

2. **Migraciones**:
   - Nombra las migraciones descriptivamente
   - Revisa las migraciones generadas
   - Mantén un historial de migraciones
   - Haz backups antes de ejecutar migraciones en producción

3. **Desarrollo**:
   - Usa `db:init` para la primera configuración
   - Usa `db:reset` cuando necesites empezar de nuevo
   - Usa `db:status` para verificar el estado

4. **Producción**:
   - Usa `db:init:prod` para el despliegue inicial
   - Usa `db:reset:prod` con precaución
   - Asegúrate de tener backups antes de usar reset

## Soporte

Para soporte y preguntas, por favor contacta al equipo de desarrollo.

## Licencia

Este proyecto está bajo la licencia MIT.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
