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
source ./scripts/config.sh

echo "Iniciando proceso de reset de la base de datos..."

# Verificar si el contenedor de PostgreSQL está corriendo
if ! docker ps | grep -q postgres; then
    handle_error "El contenedor de PostgreSQL no está corriendo"
fi

# Obtener el nombre del contenedor
CONTAINER_NAME=$(docker ps --filter "name=postgres" --format "{{.Names}}")

# Función para eliminar la base de datos
drop_database() {
    echo "Eliminando base de datos $DB_NAME..."
    if docker exec "$CONTAINER_NAME" psql -U "$DB_USER" -d postgres -c "DROP DATABASE IF EXISTS $DB_NAME;"; then
        success_message "Base de datos eliminada correctamente"
    else
        handle_error "Error al eliminar la base de datos"
    fi
}

# Función para crear la base de datos
create_database() {
    echo "Creando base de datos $DB_NAME..."
    if docker exec "$CONTAINER_NAME" psql -U "$DB_USER" -d postgres -c "CREATE DATABASE $DB_NAME;"; then
        success_message "Base de datos creada correctamente"
    else
        handle_error "Error al crear la base de datos"
    fi
}

# Función para ejecutar migraciones
run_migrations() {
    echo "Ejecutando migraciones..."

    if [ "$ENV" = "production" ]; then
        # En producción, usar los archivos compilados
        echo "Usando archivos compilados en producción..."
        if npm run typeorm migration:run -- -d dist/config/typeorm-cli.config.js; then
            success_message "Migraciones aplicadas correctamente"
        else
            handle_error "Error al aplicar migraciones"
        fi
    else
        # En desarrollo, compilar y luego ejecutar
        echo "Compilando el proyecto en desarrollo..."
        if npm run build && npm run typeorm migration:run -- -d src/config/typeorm-cli.config.ts; then
            success_message "Migraciones aplicadas correctamente"
        else
            handle_error "Error al aplicar migraciones"
        fi
    fi
}

# Función principal
main() {
    drop_database
    create_database
    run_migrations
    success_message "¡Proceso de reset completado con éxito!"
}

# Ejecutar función principal
main 