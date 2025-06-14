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

# Verificar si el contenedor de PostgreSQL está corriendo
if ! docker ps | grep -q postgres; then
    handle_error "El contenedor de PostgreSQL no está corriendo"
fi

# Obtener el nombre del contenedor
CONTAINER_NAME=$(docker ps --filter "name=postgres" --format "{{.Names}}")

# Función para eliminar la base de datos
drop_database() {
    warning_message "Eliminando base de datos $DB_NAME..."
    docker exec postgres psql -U "$DB_USER" -d postgres -c "DROP DATABASE IF EXISTS $DB_NAME;" || handle_error "Error al eliminar la base de datos"
    success_message "Base de datos eliminada correctamente"
}

# Función para crear la base de datos
create_database() {
    warning_message "Creando base de datos $DB_NAME..."
    docker exec postgres psql -U "$DB_USER" -d postgres -c "CREATE DATABASE $DB_NAME;" || handle_error "Error al crear la base de datos"
    success_message "Base de datos creada correctamente"
}

# Función para ejecutar migraciones
run_migrations() {
    warning_message "Ejecutando migraciones..."
    
    if [ "$ENV" = "production" ]; then
        # En producción, usar los archivos compilados
        echo "Ejecutando migraciones en producción..."
        docker exec postgres psql -U "$DB_USER" -d "$DB_NAME" -f /app/dist/database/migrations/1700000000000-InitialSchema.js || handle_error "Error al ejecutar migración inicial"
        docker exec postgres psql -U "$DB_USER" -d "$DB_NAME" -f /app/dist/database/migrations/1700000000001-InitialData.js || handle_error "Error al ejecutar migración de datos"
        docker exec postgres psql -U "$DB_USER" -d "$DB_NAME" -f /app/dist/database/migrations/1700000000002-AddPupitreColumns.js || handle_error "Error al ejecutar migración de pupitres"
        docker exec postgres psql -U "$DB_USER" -d "$DB_NAME" -f /app/dist/database/migrations/1700000000004-UpdateValidatorColumns.js || handle_error "Error al ejecutar migración de validadores"
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
    echo "Iniciando reset de la base de datos..."
    drop_database
    create_database
    run_migrations
    success_message "Reset de la base de datos completado exitosamente"
}

# Ejecutar función principal
main 