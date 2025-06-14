#!/bin/bash

# Colores para mensajes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

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

# Función para eliminar la base de datos
drop_database() {
    echo "Eliminando base de datos $DB_DATABASE..."
    if docker exec $CONTAINER_NAME psql -U $DB_USERNAME -c "DROP DATABASE IF EXISTS $DB_DATABASE WITH (FORCE);"; then
        success "Base de datos eliminada correctamente"
    else
        error "Error al eliminar la base de datos"
    fi
}

# Función para crear la base de datos
create_database() {
    echo "Creando base de datos $DB_DATABASE..."
    if docker exec $CONTAINER_NAME psql -U $DB_USERNAME -c "CREATE DATABASE $DB_DATABASE;"; then
        success "Base de datos creada correctamente"
    else
        error "Error al crear la base de datos"
    fi
}

# Función para ejecutar las migraciones
run_migrations() {
    echo "Ejecutando migraciones..."
    
    # Compilar el proyecto
    echo "Compilando el proyecto..."
    npm run build
    
    if [ $? -ne 0 ]; then
        error "Error al compilar el proyecto"
    fi
    
    # Ejecutar migraciones
    echo "Aplicando migraciones..."
    npm run typeorm migration:run -- -d src/config/typeorm-cli.config.ts
    
    if [ $? -eq 0 ]; then
        success "Migraciones aplicadas correctamente"
    else
        error "Error al aplicar las migraciones"
    fi
}

# Función principal
main() {
    echo "Iniciando proceso de reset de la base de datos..."
    
    # Eliminar base de datos
    drop_database
    
    # Crear base de datos
    create_database
    
    # Ejecutar migraciones
    run_migrations
    
    success "¡Proceso de reset completado con éxito!"
}

# Ejecutar función principal
main 