#!/bin/bash

# Colores para mensajes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuración por defecto
DB_HOST=${DB_HOST:-localhost}
DB_PORT=${DB_PORT:-5432}
DB_USERNAME=${DB_USERNAME:-postgres}
DB_PASSWORD=${DB_PASSWORD:-postgres}
DB_DATABASE=${DB_DATABASE:-neobus}
MAX_RETRIES=5
RETRY_INTERVAL=5

# Función para mostrar mensajes de error
error() {
    echo -e "${RED}Error: $1${NC}" >&2
    exit 1
}

# Función para mostrar mensajes de éxito
success() {
    echo -e "${GREEN}$1${NC}"
}

# Función para mostrar mensajes de advertencia
warning() {
    echo -e "${YELLOW}$1${NC}"
}

# Cargar configuración
source ./scripts/config.sh

# Verificar si el contenedor está corriendo
if ! docker ps | grep -q postgres; then
    error "El contenedor de PostgreSQL no está corriendo. Ejecuta 'docker-compose up -d' primero."
fi

# Obtener el nombre del contenedor
CONTAINER_NAME=$(docker ps --filter "name=postgres" --format "{{.Names}}")

# Función para verificar la conexión a la base de datos
check_db_connection() {
    echo "Intentando conectar a la base de datos en $DB_HOST:$DB_PORT..."
    if ! docker exec $CONTAINER_NAME psql -U $DB_USERNAME -d postgres -c "\l" > /dev/null 2>&1; then
        error "No se pudo conectar a la base de datos. Verifica las credenciales y la conexión."
    fi
    success "Conexión exitosa a la base de datos"
}

# Función para crear la base de datos si no existe
create_database() {
    echo "Verificando si la base de datos $DB_DATABASE existe..."
    if ! docker exec $CONTAINER_NAME psql -U $DB_USERNAME -lqt | cut -d \| -f 1 | grep -qw $DB_DATABASE; then
        echo "Creando base de datos $DB_DATABASE..."
        docker exec $CONTAINER_NAME psql -U $DB_USERNAME -c "CREATE DATABASE $DB_DATABASE;"
        if [ $? -ne 0 ]; then
            error "No se pudo crear la base de datos"
        fi
        success "Base de datos creada correctamente"
    else
        warning "La base de datos $DB_DATABASE ya existe"
    fi
}

# Intentar conectar a la base de datos con reintentos
retry_count=0
while [ $retry_count -lt $MAX_RETRIES ]; do
    if check_db_connection; then
        break
    fi
    retry_count=$((retry_count + 1))
    if [ $retry_count -eq $MAX_RETRIES ]; then
        error "No se pudo conectar a la base de datos después de $MAX_RETRIES intentos"
    fi
    warning "Reintentando en $RETRY_INTERVAL segundos... (Intento $retry_count de $MAX_RETRIES)"
    sleep $RETRY_INTERVAL
done

# Crear la base de datos si no existe
create_database

# Compilar el proyecto
echo "Compilando el proyecto..."
npm run build

if [ $? -ne 0 ]; then
    error "Error al compilar el proyecto"
fi

# Ejecutar las migraciones
echo "Ejecutando migraciones..."
npm run typeorm migration:run

if [ $? -eq 0 ]; then
    success "Base de datos inicializada correctamente con las migraciones"
else
    error "Error al ejecutar las migraciones"
fi 