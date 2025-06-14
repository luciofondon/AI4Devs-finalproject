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

# Función para verificar si un comando existe
check_command() {
    if ! command -v $1 &> /dev/null; then
        error "$1 no está instalado. Por favor, instálalo primero."
    fi
}

# Verificar comandos necesarios
check_command npm

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
    echo "Verificando conexión a la base de datos..."
    if ! docker exec $CONTAINER_NAME psql -U $DB_USERNAME -d postgres -c "\l" > /dev/null 2>&1; then
        error "No se pudo conectar a la base de datos. Verifica las credenciales y la conexión."
    fi
    success "Conexión exitosa a la base de datos"
}

# Función para crear la base de datos
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
        
        # Preguntar si se quiere recrear la base de datos
        read -p "¿Deseas eliminar y recrear la base de datos? (s/n): " response
        if [[ "$response" =~ ^[Ss]$ ]]; then
            echo "Eliminando base de datos existente..."
            docker exec $CONTAINER_NAME psql -U $DB_USERNAME -c "DROP DATABASE $DB_DATABASE;"
            echo "Creando nueva base de datos..."
            docker exec $CONTAINER_NAME psql -U $DB_USERNAME -c "CREATE DATABASE $DB_DATABASE;"
            success "Base de datos recreada correctamente"
        fi
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
    echo "Iniciando proceso de inicialización de la base de datos..."
    
    # Verificar conexión
    check_db_connection
    
    # Crear base de datos
    create_database
    
    # Ejecutar migraciones
    run_migrations
    
    success "¡Proceso completado con éxito!"
}

# Ejecutar función principal
main 