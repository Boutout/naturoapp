# NaturoApp — image statique servie par nginx
FROM nginx:1.27-alpine

# Config nginx (cache, mime PWA, healthz)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# On ne copie QUE les fichiers de l'app (pas les docs/infra/.git)
COPY index.html cours.html revision.html examen.html stats.html \
     app.js content.js style.css manifest.json sw.js \
     /usr/share/nginx/html/
COPY icons/ /usr/share/nginx/html/icons/

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=4s --retries=3 \
  CMD wget -qO- http://localhost/healthz || exit 1
