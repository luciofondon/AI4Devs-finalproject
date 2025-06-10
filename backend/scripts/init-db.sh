#!/bin/bash

# Esperar a que PostgreSQL esté listo
echo "Esperando a que PostgreSQL esté listo..."
sleep 5

# Ejecutar el script de inicialización
echo "Ejecutando script de inicialización..."
psql -h localhost -U postgres -d neobus -f src/database/init.sql

echo "Base de datos inicializada correctamente" 