FROM php:8-fpm-alpine

ARG UID
ARG GID

ENV UID=${UID}
ENV GID=${GID}

RUN delgroup dialout

RUN addgroup -g ${GID} --system laravel
RUN adduser -G laravel --system -D -s /bin/sh -u ${UID} laravel

RUN docker-php-ext-install pdo pdo_mysql

RUN mkdir -p /var/www/html
WORKDIR /var/www/html

# Copy existing application directory permissions
COPY --chown=laravel:laravel . /var/www/html

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]
