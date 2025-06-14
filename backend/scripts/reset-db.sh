#!/bin/bash

# Colores para mensajes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para manejar errores
handle_error() {
    echo -e "${RED}Error: $1${NC}" >&2
    exit 1
}

# Función para mensajes de éxito
success_message() {
    echo -e "${GREEN}$1${NC}"
}

# Función para mensajes de advertencia
warning_message() {
    echo -e "${YELLOW}$1${NC}"
}

# Cargar configuración
source "$(dirname "$0")/config.sh"

echo "Iniciando proceso de reset de la base de datos..."

# Verificar y manejar el contenedor de PostgreSQL
check_postgres_container() {
    if ! docker ps | grep -q postgres; then
        warning_message "El contenedor de PostgreSQL no está corriendo"
        
        # Verificar si el contenedor existe pero está detenido
        if docker ps -a | grep -q postgres; then
            warning_message "Iniciando contenedor existente de PostgreSQL..."
            docker start postgres || handle_error "Error al iniciar el contenedor de PostgreSQL"
        else
            warning_message "Creando nuevo contenedor de PostgreSQL..."
            docker run --name postgres \
                -e POSTGRES_USER="$DB_USER" \
                -e POSTGRES_PASSWORD="$DB_PASSWORD" \
                -e POSTGRES_DB="$DB_NAME" \
                -p "$DB_PORT:5432" \
                -d postgres:latest || handle_error "Error al crear el contenedor de PostgreSQL"
        fi
        
        # Esperar a que PostgreSQL esté listo
        warning_message "Esperando a que PostgreSQL esté listo..."
        sleep 5
    fi
    
    success_message "Contenedor de PostgreSQL está corriendo"
}

# Función para verificar si la base de datos existe
check_database_exists() {
    docker exec postgres psql -U "$DB_USER" -d postgres -t -c "SELECT 1 FROM pg_database WHERE datname='$DB_NAME'" | grep -q 1
    return $?
}

# Función para crear la base de datos si no existe
ensure_database_exists() {
    if ! check_database_exists; then
        warning_message "Creando base de datos $DB_NAME..."
        docker exec postgres psql -U "$DB_USER" -d postgres -c "CREATE DATABASE $DB_NAME;" || handle_error "Error al crear la base de datos"
        success_message "Base de datos creada correctamente"
    else
        success_message "La base de datos $DB_NAME ya existe"
    fi
}

# Función para ejecutar migraciones
run_migrations() {
    warning_message "Ejecutando migraciones..."
    
    if [ "$ENV" = "production" ]; then
        # En producción, usar los archivos compilados con la configuración específica
        echo "Ejecutando migraciones en producción..."
        npm run typeorm migration:run -- -d dist/config/typeorm-cli.config.js || handle_error "Error al ejecutar migraciones"
    else
        # En desarrollo, compilar y ejecutar
        echo "Ejecutando migraciones en desarrollo..."
        npm run build || handle_error "Error al compilar el proyecto"
        npm run typeorm migration:run || handle_error "Error al ejecutar migraciones"
    fi
    
    success_message "Migraciones ejecutadas correctamente"
}

# Función principal
main() {
    echo "Iniciando proceso de base de datos..."
    check_postgres_container
    ensure_database_exists
    run_migrations
    success_message "Proceso completado exitosamente"
}

# Ejecutar función principal
main 