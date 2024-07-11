# Use an official PHP runtime as a parent image
FROM php:8-fpm-alpine

# Install Composer globally
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

# Set the working directory
WORKDIR /var/www/html

# Ensure that the Composer executable is available
RUN chmod +x /usr/local/bin/composer

# Install necessary PHP extensions
RUN docker-php-ext-install pdo pdo_mysql

# Optional: Add project dependencies for Composer
COPY composer.json composer.lock ./
RUN composer install --no-scripts --no-autoloader
