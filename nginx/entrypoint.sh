#!/bin/bash
# Первый раз — получить сертификат
certbot --nginx -d lowmill.nomorepartiessite.ru --email lishainik@gmail.com \
  --agree-tos --no-eff-email --non-interactive

# Запустить nginx + фоновый авторенев
nginx -g "daemon off;" &
while :; do
  sleep 12h
  certbot renew --quiet
  nginx -s reload
done