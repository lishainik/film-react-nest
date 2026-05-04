FROM nginx:latest
RUN apt-get update && apt-get install -y certbot python3-certbot-nginx && rm -rf /var/lib/apt/lists/*
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
EXPOSE 80 443
CMD ["/entrypoint.sh"]