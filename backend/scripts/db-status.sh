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

# Verificar conexión a la base de datos
echo "Verificando conexión a la base de datos..."
if ! docker exec $CONTAINER_NAME psql -U $DB_USERNAME -d $DB_DATABASE -c "\l" > /dev/null 2>&1; then
    error "No se pudo conectar a la base de datos. Verifica las credenciales y la conexión."
fi

# Mostrar información de la base de datos
echo -e "\n${GREEN}Información de la Base de Datos:${NC}"
echo "Host: $DB_HOST"
echo "Puerto: $DB_PORT"
echo "Usuario: $DB_USERNAME"
echo "Base de datos: $DB_DATABASE"

# Listar todas las tablas
echo -e "\n${GREEN}Tablas en la base de datos:${NC}"
docker exec $CONTAINER_NAME psql -U $DB_USERNAME -d $DB_DATABASE -c "\dt"

# Mostrar tamaño de la base de datos
echo -e "\n${GREEN}Tamaño de la base de datos:${NC}"
docker exec $CONTAINER_NAME psql -U $DB_USERNAME -d $DB_DATABASE -c "SELECT pg_size_pretty(pg_database_size('$DB_DATABASE'));"

# Mostrar número de registros por tabla
echo -e "\n${GREEN}Número de registros por tabla:${NC}"
docker exec $CONTAINER_NAME psql -U $DB_USERNAME -d $DB_DATABASE -c "
SELECT 
    schemaname as schema,
    relname as table,
    n_live_tup as row_count
FROM pg_stat_user_tables
ORDER BY n_live_tup DESC;"

success "\nVerificación completada con éxito!" 