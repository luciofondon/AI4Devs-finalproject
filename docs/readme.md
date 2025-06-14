## Índice

0. [Ficha del proyecto](#0-ficha-del-proyecto)
1. [Descripción general del producto](#1-descripción-general-del-producto)
2. [Arquitectura del sistema](#2-arquitectura-del-sistema)
3. [Modelo de datos](#3-modelo-de-datos)
4. [Especificación de la API](#4-especificación-de-la-api)
5. [Historias de usuario](#5-historias-de-usuario)
6. [Tickets de trabajo](#6-tickets-de-trabajo)
7. [Pull requests](#7-pull-requests)

---

## 0. Ficha del proyecto

### **0.1. Tu nombre completo:**

Lucio David Fondón Terrón

### **0.2. Nombre del proyecto:**

Monitorización de los dispositivos y componentes embarcados en un autobús

### **0.3. Descripción breve del proyecto:**

# Sistema de Monitorización de Dispositivos para Autobuses


El sistema es una solución integral para la monitorización y gestión de dispositivos embarcados en autobuses. Permite el seguimiento en tiempo real del estado de todos los componentes del vehículo, incluyendo:
Pupitre del conductor con sus dispositivos:
- Lector QR
- Lector RFID
- Lector EMV
- Módem
- Impresora

Validadoras (hasta 5 por autobús) con sus lectores:
- RFID
- EMV

Cámaras (hasta 5 por autobús)

Cada dispositivo tiene un identificador único y puede estar en diferentes estados:
- Autobús, Pupitre y Validadoras: OK, Warning o KO
- Componentes individuales: OK o KO

El sistema proporciona:
- Monitorización en tiempo real
- Gestión de eventos y alertas
- Mantenimiento predictivo
- Seguridad y control de acceso
- Interfaz de usuario intuitiva
- APIs para integración con otros sistemas

La solución está diseñada para ser escalable, segura y fácil de mantener, permitiendo una gestión eficiente de toda la flota de autobuses.


### **0.4. URL del proyecto:**

https://github.com/luciofondon/neobus.git


> Puede ser pública o privada, en cuyo caso deberás compartir los accesos de manera segura. Puedes enviarlos a [alvaro@lidr.co](mailto:alvaro@lidr.co) usando algún servicio como [onetimesecret](https://onetimesecret.com/).

### 0.5. URL o archivo comprimido del repositorio

https://github.com/luciofondon/neobus.git

> Puedes tenerlo alojado en público o en privado, en cuyo caso deberás compartir los accesos de manera segura. Puedes enviarlos a [alvaro@lidr.co](mailto:alvaro@lidr.co) usando algún servicio como [onetimesecret](https://onetimesecret.com/). También puedes compartir por correo un archivo zip con el contenido


---

## 1. Descripción general del producto

> Describe en detalle los siguientes aspectos del producto:

### **1.1. Objetivo:**


Este proyecto va destinado a las personas de mantemiento para poder monitorizar de una forma sencilla los diferentes problemas físicos que hay en la flota de autobuses. 

### **1.2. Características y funcionalidades principales:**


- Ver a simple vista qué autobuses tienen algún problema.
- Identificar los componentes físicos que dan problemas. 
- Poder implantar un plan de acción para restablecer o solucionar el problema. 
- Monitorización en tiempo real.

### **1.3. Diseño y experiencia de usuario:**

#### Flujo de Usuario
1. **Login**
   - Pantalla de inicio de sesión con validación de credenciales
   - Recuperación de contraseña
   - Recordar sesión

2. **Dashboard Principal**
   - Vista general de la flota
   - Filtros rápidos por estado
   - Búsqueda por ID de autobús
   - Actualización en tiempo real

3. **Vista Detallada**
   - Información detallada por autobús
   - Estado de dispositivos
   - Historial de cambios
   - Logs de errores

#### Diseño Responsive
- Adaptación a diferentes tamaños de pantalla
- Menú colapsable en móviles
- Grid system para organización de elementos
- Touch-friendly en dispositivos móviles

#### Interacciones
- Tooltips informativos
- Notificaciones en tiempo real
- Filtros dinámicos
- Búsqueda instantánea

### **1.4. Instrucciones de instalación:**

#### Requisitos Previos
- Node.js 18.x o superior
- PostgreSQL 15.x
- Redis 7.x
- Docker y Docker Compose (opcional)

#### Instalación Local

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/luciofondon/neobus.git
   cd neobus
   ```

2. **Instalar dependencias**
   ```bash
   # Frontend
   cd frontend
   npm install

   # Backend
   cd ../backend
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   # Frontend (.env)
   REACT_APP_API_URL=http://localhost:3000
   REACT_APP_WS_URL=ws://localhost:3000

   # Backend (.env)
   DATABASE_URL=postgresql://user:password@localhost:5432/neobus
   REDIS_URL=redis://localhost:6379
   JWT_SECRET=your-secret-key
   ```

4. **Iniciar bases de datos**
   ```bash
   # PostgreSQL
   docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=password postgres:15

   # Redis
   docker run -d -p 6379:6379 redis:7
   ```

5. **Ejecutar migraciones**
   ```bash
   cd backend
   npm run migration:run
   ```

6. **Iniciar aplicaciones**
   ```bash
   # Backend
   cd backend
   npm run start:dev

   # Frontend
   cd frontend
   npm start
   ```

#### Instalación con Docker
```bash
docker-compose up -d
```

---

## 2. Arquitectura del Sistema

### **2.1. Diagrama de arquitectura:**
## Arquitectura General

```mermaid
graph TB
    subgraph "Frontend - React + TypeScript"
        UI[Interfaz de Usuario]
        Dashboard[Dashboard]
        Reports[Reportes]
    end

    subgraph "Backend - NestJS"
        API[API REST]
        Auth[Autenticación]
        Monitor[Monitorización]
        Events[Gestión de Eventos]
        ExternalDB[Adaptador BD Externa]
    end

    subgraph "Base de Datos"
        DB[(PostgreSQL)]
        Cache[(Redis)]
    end

    subgraph "Base de Datos Externa"
        ExternalDB2[(BD Estado Autobuses)]
    end

    subgraph "Autobuses"
        Bus1[Autobús 1]
        Bus2[Autobús 2]
        BusN[Autobús N]
    end

    subgraph "Dispositivos por Autobús"
        Pupitre[Pupitre]
        Validator1[Validadora 1]
        Validator2[Validadora 2]
        ValidatorN[Validadora N]
        Camera1[Cámara 1]
        Camera2[Cámara 2]
        CameraN[Cámara N]
    end

    %% Conexiones Cliente Web
    UI --> API
    Dashboard --> API
    Reports --> API

    %% Conexiones Backend
    API --> Auth
    API --> Monitor
    API --> Events
    Auth --> DB
    Monitor --> DB
    Events --> DB
    Monitor --> Cache
    Monitor --> ExternalDB
    ExternalDB --> ExternalDB2

    %% Conexiones Autobuses
    Bus1 --> Pupitre
    Bus1 --> Validator1
    Bus1 --> Validator2
    Bus1 --> Camera1
    Bus1 --> Camera2

    %% Conexiones Monitorización
    Monitor --> Bus1
    Monitor --> Bus2
    Monitor --> BusN
```

## Descripción de Componentes

### Cliente Web
- **Interfaz de Usuario**: Frontend desarrollado con React
- **Dashboard**: Visualización en tiempo real del estado de los dispositivos
- **Reportes**: Generación y visualización de informes

### Backend
- **API REST**: Endpoints para la comunicación con el frontend
- **Autenticación**: Gestión de usuarios y permisos
- **Monitorización**: Sistema de monitorización en tiempo real
- **Gestión de Eventos**: Registro y procesamiento de eventos

### Base de Datos
- **PostgreSQL**: Almacenamiento persistente de datos
- **Redis**: Caché y gestión de estados en tiempo real

### Autobuses
- Cada autobús tiene un identificador único
- Puede tener hasta 5 validadoras
- Puede tener hasta 5 cámaras
- Tiene un pupitre con múltiples dispositivos

### Dispositivos
- **Pupitre**: Contiene lectores QR, RFID, EMT, módem e impresora
- **Validadoras**: Contienen lectores RFID y EMV
- **Cámaras**: Sistema de videovigilancia

## Flujo de Datos
1. Los dispositivos envían su estado al sistema de monitorización
2. El sistema procesa y almacena los datos
3. La API proporciona acceso a los datos
4. El frontend muestra la información en tiempo real
5. Los usuarios pueden interactuar con el sistema a través de la interfaz

## Características Técnicas
- Arquitectura distribuida
- Comunicación en tiempo real
- Sistema escalable
- Alta disponibilidad
- Seguridad integrada 

### **2.2. Descripción de componentes principales:**

### Frontend (React + TypeScript)
- **Interfaz de Usuario**: 
  - Desarrollado con React
  - TypeScript para tipado estático
  - Componentes reutilizables
  - Gestión de estado con Redux/Context
- **Dashboard**: 
  - Visualización en tiempo real
  - Gráficos y métricas
  - Actualizaciones automáticas
- **Reportes**: 
  - Generación de informes
  - Exportación de datos
  - Filtros y búsqueda avanzada

### Backend (NestJS)
- **API REST**: 
  - Endpoints RESTful
  - Documentación con Swagger
  - Validación de datos
- **Autenticación**: 
  - JWT para autenticación
  - Roles y permisos
  - Middleware de seguridad
- **Monitorización**: 
  - WebSockets para tiempo real
  - Procesamiento de eventos
  - Gestión de estados
  - Integración con BD externa
- **Gestión de Eventos**: 
  - Sistema de logs
  - Notificaciones
  - Historial de eventos
- **Adaptador BD Externa**:
  - Conexión con BD de estado de autobuses
  - Sincronización de datos
  - Caché de estados

### Base de Datos
- **PostgreSQL**: 
  - Almacenamiento persistente
  - Transacciones ACID
  - Índices optimizados
- **Redis**: 
  - Caché de estados
  - Colas de mensajes
  - Sesiones

### Base de Datos Externa
- **BD Estado Autobuses**:
  - Estado actual de autobuses
  - Datos de dispositivos
  - Historial de estados
  - Sincronización periódica

### Autobuses
- Cada autobús tiene un identificador único (formato: 1234)
- Puede tener hasta 5 validadoras
- Puede tener hasta 5 cámaras
- Tiene un pupitre con múltiples dispositivos

### Dispositivos
- **Pupitre** (ID: PUP12345):
  - Lector QR
  - Lector RFID
  - Lector EMT
  - Módem
  - Impresora
- **Validadoras** (ID: VAL12345):
  - Lector RFID
  - Lector EMV
- **Cámaras**:
  - ID según fabricante
  - Estado de conexión
  - Calidad de señal
  - Almacenamiento


### **2.3. Descripción de alto nivel del proyecto y estructura de ficheros**

# Descripción de Alto Nivel y Estructura del Proyecto

## Descripción de Alto Nivel

El proyecto es un sistema de monitorización de dispositivos embarcados en autobuses que permite el seguimiento en tiempo real del estado de todos los componentes del vehículo. El sistema está dividido en dos partes principales:

### Frontend (React + TypeScript)
- Interfaz de usuario moderna y responsive
- Dashboard en tiempo real
- Sistema de reportes
- Gestión de alertas y notificaciones

### Backend (NestJS)
- API REST para comunicación con el frontend
- Integración con base de datos externa de autobuses
- Sistema de autenticación y autorización
- Gestión de eventos y monitorización

## Estructura de Ficheros

```
neobus/
├── frontend/                      # Aplicación React + TypeScript
│   ├── public/                    # Archivos estáticos
│   ├── src/
│   │   ├── assets/               # Imágenes, fuentes, etc.
│   │   ├── components/           # Componentes reutilizables
│   │   │   ├── common/           # Componentes comunes
│   │   │   ├── dashboard/        # Componentes del dashboard
│   │   │   ├── devices/          # Componentes de dispositivos
│   │   │   └── reports/          # Componentes de reportes
│   │   ├── hooks/                # Custom hooks
│   │   ├── pages/                # Páginas de la aplicación
│   │   ├── services/             # Servicios de API
│   │   ├── store/                # Estado global (Redux/Context)
│   │   ├── types/                # Definiciones de TypeScript
│   │   └── utils/                # Utilidades
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                       # Aplicación NestJS
│   ├── src/
│   │   ├── config/               # Configuraciones
│   │   ├── modules/              # Módulos de la aplicación
│   │   │   ├── auth/             # Autenticación
│   │   │   ├── devices/          # Gestión de dispositivos
│   │   │   ├── monitoring/       # Monitorización
│   │   │   └── reports/          # Generación de reportes
│   │   ├── common/               # Código compartido
│   │   │   ├── decorators/       # Decoradores personalizados
│   │   │   ├── filters/          # Filtros de excepciones
│   │   │   ├── guards/           # Guards de autenticación
│   │   │   └── interfaces/       # Interfaces comunes
│   │   ├── database/             # Configuración de bases de datos
│   │   │   ├── migrations/       # Migraciones
│   │   │   └── seeds/            # Datos iniciales
│   │   └── external/             # Integración con BD externa
│   │       ├── adapters/         # Adaptadores
│   │       └── services/         # Servicios externos
│   ├── test/                     # Tests
│   ├── package.json
│   └── tsconfig.json
│
├── docker/                        # Configuración de Docker
│   ├── frontend/
│   ├── backend/
│   └── docker-compose.yml
│
├── docs/                          # Documentación
│   ├── api/                       # Documentación de API
│   ├── architecture/              # Diagramas de arquitectura
│   └── deployment/                # Guías de despliegue
│
└── README.md                      # Documentación principal
```

## Descripción de Carpetas Principales

### Frontend
- **components/**: Componentes reutilizables de React
- **pages/**: Páginas principales de la aplicación
- **services/**: Servicios para comunicación con el backend
- **store/**: Gestión del estado global
- **types/**: Definiciones de tipos TypeScript

### Backend
- **modules/**: Módulos principales de NestJS
- **common/**: Código compartido y utilidades
- **database/**: Configuración y migraciones de bases de datos
- **external/**: Integración con la base de datos externa

### Docker
- Configuración para contenedores
- Entornos de desarrollo y producción

### Docs
- Documentación técnica
- Guías de despliegue
- Diagramas de arquitectura

## Patrones y Arquitectura

### Frontend
- Arquitectura basada en componentes
- Gestión de estado centralizada
- Patrón Container/Presenter
- Hooks personalizados para lógica reutilizable

### Backend
- Arquitectura modular con NestJS
- Patrón Repository para acceso a datos
- Servicios para lógica de negocio
- DTOs para validación de datos

### Comunicación
- REST API para operaciones CRUD
- WebSockets para actualizaciones en tiempo real
- JWT para autenticación
- Caché con Redis para mejor rendimiento


### **2.4. Infraestructura y despliegue**

# Diagrama de Infraestructura del Proyecto

## Infraestructura General

```mermaid
graph TB
    subgraph "Cliente"
        Browser[Navegador Web]
    end

    subgraph "CDN"
        CDN[Cloudflare CDN]
    end

    subgraph "Frontend"
        Nginx[Nginx]
        React[React App]
    end

    subgraph "Backend"
        NestJS[NestJS API]
        Redis[Redis Cache]
        PG[(PostgreSQL)]
    end

    subgraph "Base de Datos Externa"
        ExternalDB[(BD Autobuses)]
    end

    subgraph "Monitorización"
        Prometheus[Prometheus]
        Grafana[Grafana]
    end

    subgraph "Logging"
        ELK[ELK Stack]
    end

    %% Conexiones Cliente
    Browser --> CDN
    CDN --> Nginx

    %% Conexiones Frontend
    Nginx --> React
    React --> NestJS

    %% Conexiones Backend
    NestJS --> Redis
    NestJS --> PG
    NestJS --> ExternalDB

    %% Conexiones Monitorización
    NestJS --> Prometheus
    Prometheus --> Grafana

    %% Conexiones Logging
    NestJS --> ELK
    React --> ELK
```

## Descripción de Componentes

### Cliente
- **Navegador Web**: Acceso a la aplicación web

### CDN
- **Cloudflare**: 
  - Distribución de contenido estático
  - Protección DDoS
  - SSL/TLS

### Frontend
- **Nginx**:
  - Servidor web
  - Balanceo de carga
  - SSL/TLS
  - Caché de contenido estático
- **React App**:
  - Aplicación cliente
  - Servida por Nginx

### Backend
- **NestJS API**:
  - API REST
  - WebSockets
  - Procesamiento de datos
- **Redis**:
  - Caché de sesiones
  - Caché de estados
  - Colas de mensajes
- **PostgreSQL**:
  - Base de datos principal
  - Almacenamiento persistente
  - Transacciones ACID

### Base de Datos Externa
- **BD Autobuses**:
  - Datos de estado de autobuses
  - Sincronización periódica

### Monitorización
- **Prometheus**:
  - Recopilación de métricas
  - Alertas
- **Grafana**:
  - Visualización de métricas
  - Dashboards

### Logging
- **ELK Stack**:
  - Elasticsearch: Almacenamiento de logs
  - Logstash: Procesamiento de logs
  - Kibana: Visualización de logs

## Configuración de Entornos

### Desarrollo
- Docker Compose para entorno local
- Bases de datos en contenedores
- Hot-reload para desarrollo

### Staging
- Entorno de pruebas
- Réplica de producción
- Datos de prueba

### Producción
- Alta disponibilidad
- Balanceo de carga
- Backup automático
- Monitorización 24/7

## Seguridad

### Capas de Seguridad
- SSL/TLS en todas las conexiones
- WAF (Web Application Firewall)
- Protección DDoS
- Autenticación JWT
- Cifrado de datos sensibles

### Backup y Recuperación
- Backup diario de bases de datos
- Replicación en tiempo real
- Plan de recuperación de desastres

## Escalabilidad

### Estrategias
- Balanceo de carga horizontal
- Caché distribuido
- Base de datos replicada
- CDN para contenido estático

### Recursos
- Auto-scaling basado en carga
- Monitoreo de recursos
- Alertas de uso

### **2.5. Seguridad**

#### Autenticación y Autorización
- JWT para autenticación
- Roles y permisos basados en RBAC
- Tokens de refresco
- Sesiones seguras

#### Protección de Datos
- Cifrado de datos sensibles
- HTTPS/TLS en todas las conexiones
- Sanitización de inputs
- Validación de datos

#### Seguridad de la API
- Rate limiting
- CORS configurado
- Headers de seguridad
- Validación de tokens

#### Buenas Prácticas
- No almacenamiento de contraseñas en texto plano
- Logging de eventos de seguridad
- Auditoría de accesos
- Políticas de contraseñas

### **2.6. Tests**


# Estrategia de Testing

## Testing Frontend (React + TypeScript)

### Test Unitarios
- **Jest + React Testing Library**
  - Testing de hooks personalizados
  - Testing de utilidades
  - Testing de servicios
  - Testing de lógica de negocio

### Test de Componentes
- **React Testing Library**
  - Testing de componentes aislados
  - Testing de interacciones de usuario
  - Testing de estados de componentes
  - Testing de props y eventos

### Test E2E
- **Cypress**
  - Testing de flujos completos
  - Testing de integración con backend
  - Testing de autenticación
  - Testing de monitorización en tiempo real

## Testing Backend (NestJS)

### Test Unitarios
- **Jest**
  - Testing de servicios
  - Testing de controladores
  - Testing de DTOs
  - Testing de utilidades

### Test de Integración
- **Jest + Supertest**
  - Testing de endpoints
  - Testing de middleware
  - Testing de autenticación
  - Testing de validaciones

### Test E2E
- **Cypress**
  - Testing de API completa
  - Testing de WebSockets
  - Testing de integración con BD externa
  - Testing de flujos completos

## Estructura de Tests

```
neobus/
├── frontend/
│   ├── src/
│   │   ├── __tests__/
│   │   │   ├── unit/           # Tests unitarios
│   │   │   ├── components/     # Tests de componentes
│   │   │   └── e2e/           # Tests E2E
│   │   └── cypress/           # Configuración Cypress
│   └── jest.config.js
│
├── backend/
│   ├── src/
│   │   ├── __tests__/
│   │   │   ├── unit/          # Tests unitarios
│   │   │   ├── integration/   # Tests de integración
│   │   │   └── e2e/          # Tests E2E
│   │   └── cypress/          # Configuración Cypress
│   └── jest.config.js
```

## Cobertura de Tests

### Frontend
- **Componentes**: > 80%
- **Hooks**: > 90%
- **Utilidades**: > 90%
- **E2E**: Flujos críticos 100%

### Backend
- **Servicios**: > 80%
- **Controladores**: > 80%
- **DTOs**: > 90%
- **E2E**: Endpoints críticos 100%

## Automatización

### CI/CD
- Ejecución automática de tests en cada PR
- Reportes de cobertura
- Validación de calidad de código
- Despliegue automático si tests pasan

### Herramientas
- **Jest**: Testing unitario y de componentes
- **Cypress**: Testing E2E
- **GitHub Actions**: CI/CD
- **SonarQube**: Análisis de calidad

## Buenas Prácticas

### Frontend
- Testing de componentes aislados
- Mocks de servicios externos
- Testing de accesibilidad
- Testing de responsive design

### Backend
- Testing de casos de error
- Testing de validaciones
- Testing de seguridad
- Testing de rendimiento

### E2E
- Testing de flujos críticos
- Testing de integración
- Testing de UX
- Testing de rendimiento

---

## 3. Modelo de Datos


# Modelo de Datos

```mermaid
erDiagram
    BUS {
        string id PK "4 dígitos"
        string status "OK, WARNING, KO"
        datetime lastUpdate
    }

    PUPITRE {
        string id PK "PUP + 5 dígitos"
        string status "OK, WARNING, KO"
        string busId FK
        datetime lastUpdate
    }

    VALIDATOR {
        string id PK "VAL + 5 dígitos"
        string status "OK, WARNING, KO"
        string busId FK
        datetime lastUpdate
    }

    CAMERA {
        string id PK
        string status "OK, KO"
        string connection "CONNECTED, DISCONNECTED"
        string quality "GOOD, MEDIUM, POOR"
        string busId FK
        datetime lastUpdate
    }

    DEVICE_LOG {
        string id PK
        string deviceId FK
        string deviceType "PUPITRE, VALIDATOR, CAMERA"
        string oldStatus
        string newStatus
        string message
        datetime timestamp
    }

    BUS ||--o{ PUPITRE : "tiene"
    BUS ||--o{ VALIDATOR : "tiene"
    BUS ||--o{ CAMERA : "tiene"
    BUS ||--o{ DEVICE_LOG : "registra"
    PUPITRE ||--o{ DEVICE_LOG : "genera"
    VALIDATOR ||--o{ DEVICE_LOG : "genera"
    CAMERA ||--o{ DEVICE_LOG : "genera"

```




### **3.2. Descripción de entidades principales:**

### BUS
- **id**: Identificador único del autobús (4 dígitos)
- **status**: Estado general del autobús
- **lastUpdate**: Última actualización de estado

### PUPITRE
- **id**: Identificador único del pupitre (PUP + 5 dígitos)
- **status**: Estado del pupitre
- **busId**: Referencia al autobús
- **lastUpdate**: Última actualización

### VALIDATOR
- **id**: Identificador único de la validadora (VAL + 5 dígitos)
- **status**: Estado de la validadora
- **busId**: Referencia al autobús
- **lastUpdate**: Última actualización

### CAMERA
- **id**: Identificador único de la cámara
- **status**: Estado de la cámara
- **connection**: Estado de la conexión
- **quality**: Calidad de la señal
- **busId**: Referencia al autobús
- **lastUpdate**: Última actualización

### DEVICE_LOG
- **id**: Identificador único del log
- **deviceId**: Referencia al dispositivo
- **deviceType**: Tipo de dispositivo
- **oldStatus**: Estado anterior
- **newStatus**: Nuevo estado
- **message**: Mensaje descriptivo
- **timestamp**: Fecha y hora del cambio

## Relaciones
- Un autobús puede tener un pupitre
- Un autobús puede tener múltiples validadoras
- Un autobús puede tener entre 0 y 5 cámaras
- Cada dispositivo genera logs de cambios de estado
- Los logs están asociados tanto al dispositivo como al autobús


---

## 4. Especificación de la API

```yaml
openapi: 3.0.0
info:
  title: API de Monitorización de Autobuses
  version: 1.0.0
  description: API para la monitorización de dispositivos embarcados en autobuses

servers:
  - url: /api/v1
    description: API v1

paths:
  /buses:
    get:
      summary: Obtener estado de todos los autobuses
      description: Retorna el estado actual de todos los autobuses y sus dispositivos
      operationId: getBuses
      tags:
        - Autobuses
      responses:
        '200':
          description: Lista de autobuses y su estado
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Bus'
        '401':
          description: No autorizado
        '500':
          description: Error del servidor

  /buses/{busId}/devices:
    get:
      summary: Obtener estado de dispositivos de un autobús
      description: Retorna el estado actual de todos los dispositivos de un autobús específico
      operationId: getBusDevices
      tags:
        - Dispositivos
      parameters:
        - name: busId
          in: path
          required: true
          schema:
            type: string
            pattern: '^[0-9]{4}$'
          description: ID del autobús (4 dígitos)
      responses:
        '200':
          description: Estado de los dispositivos del autobús
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BusDevices'
        '404':
          description: Autobús no encontrado
        '500':
          description: Error del servidor

components:
  schemas:
    Bus:
      type: object
      properties:
        id:
          type: string
          pattern: '^[0-9]{4}$'
          example: "1234"
        status:
          type: string
          enum: [OK, WARNING, KO]
          example: "OK"
        devices:
          type: array
          items:
            $ref: '#/components/schemas/Device'

    BusDevices:
      type: object
      properties:
        busId:
          type: string
          pattern: '^[0-9]{4}$'
          example: "1234"
        pupitre:
          $ref: '#/components/schemas/Pupitre'
        validators:
          type: array
          items:
            $ref: '#/components/schemas/Validator'
        cameras:
          type: array
          items:
            $ref: '#/components/schemas/Camera'

    Device:
      type: object
      properties:
        id:
          type: string
          example: "PUP12345"
        type:
          type: string
          enum: [PUPITRE, VALIDATOR, CAMERA]
        status:
          type: string
          enum: [OK, WARNING, KO]
        lastUpdate:
          type: string
          format: date-time

    Pupitre:
      type: object
      properties:
        id:
          type: string
          pattern: '^PUP[0-9]{5}$'
          example: "PUP12345"
        status:
          type: string
          enum: [OK, WARNING, KO]
        devices:
          type: array
          items:
            $ref: '#/components/schemas/Device'

    Validator:
      type: object
      properties:
        id:
          type: string
          pattern: '^VAL[0-9]{5}$'
          example: "VAL12345"
        status:
          type: string
          enum: [OK, WARNING, KO]
        devices:
          type: array
          items:
            $ref: '#/components/schemas/Device'

    Camera:
      type: object
      properties:
        id:
          type: string
        status:
          type: string
          enum: [OK, KO]
        connection:
          type: string
          enum: [CONNECTED, DISCONNECTED]
        quality:
          type: string
          enum: [GOOD, MEDIUM, POOR]
```

## Descripción de Endpoints

### 1. GET /buses
- **Propósito**: Obtener el estado de todos los autobuses
- **Respuesta**: Lista de autobuses con su estado y dispositivos
- **Uso**: Dashboard principal

### 2. GET /buses/{busId}/devices
- **Propósito**: Obtener el estado detallado de los dispositivos de un autobús
- **Respuesta**: Estado del pupitre, validadoras y cámaras
- **Uso**: Vista detallada de un autobús

## Ejemplos de Uso

### Obtener todos los autobuses
```bash
curl -X GET "http://api.example.com/api/v1/buses" \
     -H "Authorization: Bearer {token}"
```

### Obtener dispositivos de un autobús
```bash
curl -X GET "http://api.example.com/api/v1/buses/1234/devices" \
     -H "Authorization: Bearer {token}"
``` 

## 5. Historias de Usuario


### 1. Monitorización en Tiempo Real

**Como** operador del sistema de monitorización  
**Quiero** ver el estado actual de todos los autobuses en un dashboard  
**Para** tener una visión general del estado de la flota

#### Criterios de Aceptación
- El dashboard debe mostrar una lista de todos los autobuses
- Cada autobús debe mostrar:
  - ID del autobús (4 dígitos)
  - Estado general (OK, WARNING, KO)
  - Estado del pupitre
  - Estado de las validadoras
  - Estado de las cámaras
- Los estados deben actualizarse automáticamente cada 30 segundos
- Debe ser posible filtrar por estado (OK, WARNING, KO)
- Debe ser posible buscar por ID de autobús

#### Tareas Técnicas
- Implementar endpoint GET /buses
- Desarrollar componente de dashboard en React
- Implementar WebSocket para actualizaciones en tiempo real
- Crear filtros y búsqueda en el frontend

### 2. Detalle de Dispositivos

**Como** técnico de mantenimiento  
**Quiero** ver el estado detallado de los dispositivos de un autobús específico  
**Para** poder identificar y diagnosticar problemas

#### Criterios de Aceptación
- Al seleccionar un autobús, mostrar vista detallada con:
  - Estado del pupitre y sus dispositivos
  - Estado de cada validadora
  - Estado de cada cámara (0-5 cámaras)
  - Última actualización de cada dispositivo
- Mostrar historial de cambios de estado en las últimas 24 horas
- Permitir ver logs de errores por dispositivo
- Mostrar indicadores visuales claros del estado (OK, WARNING, KO)

#### Tareas Técnicas
- Implementar endpoint GET /buses/{busId}/devices
- Desarrollar componente de vista detallada
- Implementar sistema de logs
- Crear visualizaciones de estado

### 3. Alertas y Notificaciones

**Como** supervisor de operaciones  
**Quiero** recibir notificaciones inmediatas cuando un dispositivo cambie a estado KO  
**Para** poder tomar acciones rápidas en caso de fallos

#### Criterios de Aceptación
- Recibir notificación cuando:
  - Un pupitre cambie a KO
  - Una validadora cambie a KO
  - Una cámara se desconecte
- Las notificaciones deben incluir:
  - ID del autobús
  - ID del dispositivo
  - Tipo de dispositivo
  - Hora del cambio
  - Último estado conocido
- Las notificaciones deben ser:
  - Visibles en el dashboard
  - Enviadas por email
  - Registradas en el sistema de logs

#### Tareas Técnicas
- Implementar sistema de notificaciones
- Desarrollar componente de alertas en el frontend
- Configurar sistema de email
- Implementar registro de eventos

### Priorización
1. Monitorización en Tiempo Real (Alta)
2. Detalle de Dispositivos (Alta)
3. Alertas y Notificaciones (Media)

### Estimación (Fibonacci)
- Monitorización en Tiempo Real: 13 puntos
  - Dashboard principal: 5 puntos
  - WebSocket y actualizaciones: 5 puntos
  - Filtros y búsqueda: 3 puntos

- Detalle de Dispositivos: 8 puntos
  - Vista detallada: 3 puntos
  - Sistema de logs: 3 puntos
  - Visualizaciones: 2 puntos

- Alertas y Notificaciones: 5 puntos
  - Sistema de notificaciones: 2 puntos
  - Componente de alertas: 2 puntos
  - Configuración de email: 1 punto

#### Escala Fibonacci
- 1: Tarea muy simple
- 2: Tarea simple
- 3: Tarea moderada
- 5: Tarea compleja
- 8: Tarea muy compleja
- 13: Tarea extremadamente compleja
- 21: Tarea que requiere investigación adicional 


---

## 6. Tickets de Trabajo


# Tickets de Desarrollo

## Backend: Implementación de WebSocket para Monitorización en Tiempo Real

### Descripción
Implementar un sistema de WebSocket en NestJS para proporcionar actualizaciones en tiempo real del estado de los dispositivos a los clientes conectados.

### Requisitos Técnicos
- NestJS 10.x
- Socket.io
- Redis para pub/sub
- TypeScript

### Tareas
1. **Configuración del WebSocket**
   ```typescript
   // websocket.gateway.ts
   @WebSocketGateway({
     cors: true,
     namespace: 'monitoring'
   })
   export class MonitoringGateway {
     @SubscribeMessage('subscribe')
     handleSubscribe(client: Socket, payload: { busId: string }) {
       // Implementar lógica de suscripción
     }
   }
   ```

2. **Implementación de Eventos**
   - Evento de cambio de estado de dispositivo
   - Evento de conexión/desconexión
   - Evento de actualización de calidad de cámara

3. **Integración con Redis**
   - Configurar pub/sub para escalabilidad
   - Implementar manejo de reconexión
   - Gestionar múltiples instancias

### Criterios de Aceptación
- [ ] Los clientes pueden suscribirse a actualizaciones de autobuses específicos
- [ ] Las actualizaciones se envían en tiempo real (< 1 segundo)
- [ ] El sistema maneja correctamente las reconexiones
- [ ] Los eventos están tipados con TypeScript
- [ ] Existen tests unitarios y de integración
- [ ] La documentación está actualizada

### Buenas Prácticas
- Usar decoradores de NestJS para WebSocket
- Implementar manejo de errores robusto
- Utilizar tipos estrictos de TypeScript
- Seguir el patrón Repository
- Implementar logging estructurado



## Frontend: Dashboard Principal de Monitorización

### Descripción
Desarrollar el componente principal del dashboard que muestra el estado de todos los autobuses y sus dispositivos en tiempo real.

### Requisitos Técnicos
- React 18.x
- TypeScript
- Material-UI
- Socket.io-client
- React-Query

### Tareas
1. **Componente Principal**
   ```typescript
   // Dashboard.tsx
   const Dashboard: React.FC = () => {
     const { data: buses, isLoading } = useQuery('buses', fetchBuses);
     const socket = useSocket();

     return (
       <DashboardContainer>
         <BusList buses={buses} />
         <StatusFilters />
         <SearchBar />
       </DashboardContainer>
     );
   };
   ```

2. **Componentes Secundarios**
   - Lista de autobuses con estado
   - Filtros de estado
   - Barra de búsqueda
   - Indicadores visuales de estado

3. **Integración WebSocket**
   - Conexión automática
   - Manejo de reconexión
   - Actualización de estado en tiempo real

### Criterios de Aceptación
- [ ] El dashboard muestra todos los autobuses
- [ ] Los estados se actualizan en tiempo real
- [ ] Los filtros funcionan correctamente
- [ ] La búsqueda es instantánea
- [ ] El diseño es responsive
- [ ] Existen tests de componentes
- [ ] La accesibilidad cumple WCAG 2.1

### Buenas Prácticas
- Usar componentes funcionales con hooks
- Implementar lazy loading
- Utilizar CSS-in-JS con Material-UI
- Seguir el patrón Container/Presentational
- Implementar error boundaries

## Base de Datos: Implementación de Sistema de Logs

### Descripción
Diseñar e implementar el sistema de logs para el tracking de cambios de estado de dispositivos.

### Requisitos Técnicos
- PostgreSQL 15.x
- TypeORM
- Migrations

### Tareas
1. **Estructura de Tablas**
   ```sql
   -- migrations/1234567890-create-device-logs.sql
   CREATE TABLE device_logs (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     device_id VARCHAR(8) NOT NULL,
     device_type VARCHAR(10) NOT NULL,
     old_status VARCHAR(10),
     new_status VARCHAR(10) NOT NULL,
     message TEXT,
     timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
     bus_id VARCHAR(4) NOT NULL,
     FOREIGN KEY (bus_id) REFERENCES buses(id)
   );

   CREATE INDEX idx_device_logs_device_id ON device_logs(device_id);
   CREATE INDEX idx_device_logs_timestamp ON device_logs(timestamp);
   ```

2. **Implementación de Repositorio**
   ```typescript
   // device-log.repository.ts
   @EntityRepository(DeviceLog)
   export class DeviceLogRepository extends Repository<DeviceLog> {
     async createLog(data: CreateDeviceLogDto): Promise<DeviceLog> {
       const log = this.create(data);
       return this.save(log);
     }

     async getDeviceLogs(deviceId: string): Promise<DeviceLog[]> {
       return this.find({
         where: { deviceId },
         order: { timestamp: 'DESC' }
       });
     }
   }
   ```

3. **Políticas de Retención**
   - Implementar particionamiento por fecha
   - Configurar limpieza automática
   - Establecer políticas de backup

### Criterios de Aceptación
- [ ] La tabla de logs está correctamente indexada
- [ ] Las consultas son eficientes
- [ ] El sistema maneja correctamente las relaciones
- [ ] Existen migraciones para rollback
- [ ] Las políticas de retención están implementadas
- [ ] Existen tests de integración

### Buenas Prácticas
- Usar UUIDs para IDs
- Implementar índices apropiados
- Seguir convenciones de nomenclatura
- Documentar todas las migraciones
- Implementar soft deletes cuando sea necesario

## Estimación
- Backend WebSocket: 5 puntos Fibonacci
- Frontend Dashboard: 8 puntos Fibonacci
- Base de Datos Logs: 3 puntos Fibonacci

## Dependencias
- Backend → Base de Datos
- Frontend → Backend
- Base de Datos → Ninguna

---

## 7. Pull Requests

#### Plantilla de PR
```markdown
## Descripción
[Descripción detallada de los cambios]

## Tipo de Cambio
- [ ] Nueva característica
- [ ] Corrección de bug
- [ ] Mejora de rendimiento
- [ ] Documentación
- [ ] Refactorización

## Checklist
- [ ] Tests añadidos/actualizados
- [ ] Documentación actualizada
- [ ] Código sigue los estándares
- [ ] Build pasa correctamente
- [ ] Linting sin errores
```

#### Proceso de Revisión
1. **Revisión de Código**
   - Cumplimiento de estándares
   - Cobertura de tests
   - Documentación
   - Rendimiento

2. **Pruebas**
   - Tests unitarios
   - Tests de integración
   - Tests E2E
   - Pruebas manuales

3. **Aprobación**
   - Mínimo 2 aprobaciones
   - Resolución de comentarios
   - Build exitoso
   - Tests pasando

#### Criterios de Aceptación
- Código limpio y bien documentado
- Tests con cobertura > 80%
- Sin conflictos de merge
- Build y tests pasando
- Documentación actualizada


