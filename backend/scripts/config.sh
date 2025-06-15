#!/bin/bash

# Función para cargar variables de entorno desde un archivo .env
load_env_file() {
    if [ -f "$1" ]; then
        echo "Cargando variables de entorno desde $1"
        while IFS= read -r line; do
            # Ignorar líneas vacías y comentarios
            if [[ ! -z "$line" && ! "$line" =~ ^# ]]; then
                # Extraer nombre y valor de la variable
                name=$(echo "$line" | cut -d '=' -f1)
                value=$(echo "$line" | cut -d '=' -f2-)
                # Exportar la variable si no está vacía
                if [[ ! -z "$name" && ! -z "$value" ]]; then
                    export "$name=$value"
                fi
            fi
        done < "$1"
    fi
}

# Cargar variables de entorno según el entorno
if [ "$ENV" = "production" ]; then
    # En producción, cargar desde .env.production
    load_env_file ".env.production"
else
    # En desarrollo, cargar desde .env
    load_env_file ".env"
fi

# Valores por defecto para desarrollo local
export DB_HOST=${DB_HOST:-localhost}
export DB_PORT=${DB_PORT:-5432}
export DB_USER=${DB_USER:-postgres}
export DB_PASSWORD=${DB_PASSWORD:-postgres}
export DB_NAME=${DB_NAME:-neobus}

# Mostrar configuración (sin mostrar contraseñas)
echo "Configuración actual:"
echo "Entorno: ${ENV:-development}"
echo "Host: $DB_HOST"
echo "Puerto: $DB_PORT"
echo "Base de datos: $DB_NAME"
echo "Usuario: $DB_USER" 