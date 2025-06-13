#!/bin/bash

set -e

echo "Actualizando paquetes..."
sudo yum update -y

echo "🚀 Instalando Docker..."
sudo yum install -y docker

echo "Iniciando y habilitando Docker..."
sudo systemctl start docker
sudo systemctl enable docker

echo "Añadiendo usuario ec2-user al grupo docker..."
sudo usermod -aG docker ec2-user

echo "Instalando Node.js 20.x (usando Nodesource)..."
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs

echo "Instalando PM2 globalmente..."
sudo npm install -g pm2

echo "Instalando Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

echo "🚀 Instalando Nginx..."
sudo dnf install -y nginx

echo "✅ Habilitando y arrancando Nginx..."
sudo systemctl enable nginx
sudo systemctl start nginx

FRONTEND_PATH="/home/ec2-user/neobus-app/frontend"

echo "🧼 Verificando que la carpeta del frontend exista..."
if [ ! -d "$FRONTEND_PATH" ]; then
  echo "❌ Carpeta $FRONTEND_PATH no encontrada. ¿Estás seguro de que la pipeline subió los archivos?"
  exit 1
fi

echo "🔧 Configurando Nginx para servir el frontend desde $FRONTEND_PATH..."

# Creamos una copia de seguridad
sudo cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.bak.$(date +%s)

# Reemplazamos la configuración del bloque server
sudo tee /etc/nginx/nginx.conf > /dev/null <<EOF
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;

    log_format  main  '\$remote_addr - \$remote_user [\$time_local] "\$request" '
                      '\$status \$body_bytes_sent "\$http_referer" '
                      '"\$http_user_agent" "\$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile            on;
    keepalive_timeout   65;

    server {
        listen 80;
        server_name _;

        root $FRONTEND_PATH;
        index index.html;

        location / {
            try_files \$uri /index.html;
        }

        # Proxy opcional al backend en localhost:3000
        location /api/ {
            proxy_pass http://localhost:3000/;
            proxy_http_version 1.1;
            proxy_set_header Upgrade \$http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host \$host;
            proxy_cache_bypass \$http_upgrade;
        }
    }
}
EOF

echo "🧹 Asignando permisos de lectura al frontend..."
sudo chmod -R o+r $FRONTEND_PATH

echo "🔄 Reiniciando Nginx..."
sudo nginx -t && sudo systemctl restart nginx

echo "Verificando versiones instaladas..."
docker --version
docker-compose --version
node --version
npm --version
pm2 --version

echo "✅ ¡Configuración completada! Cierra sesión y vuelve a entrar para aplicar permisos de Docker."
