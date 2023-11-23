FROM php:8.1.10-fpm

WORKDIR /var/www/html

# Install dependencies
RUN apt-get update && apt-get install -y \
    libzip-dev \
    unzip \
    && docker-php-ext-install zip pdo pdo_mysql

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY composer.json composer.lock ./

RUN composer install --no-scripts --no-autoloader

COPY . .

# Generate the autoload files
RUN composer dump-autoload --no-scripts --optimize

# Set the appropriate permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache


# Add wait-for-it.sh
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /usr/bin/wait-for-it
RUN chmod +x /usr/bin/wait-for-it

EXPOSE 8005

CMD ["sh", "-c", "wait-for-it mysql:3306 -- php artisan migrate && php artisan serve"]

# ENTRYPOINT [ "../docker/merchant-service-entrypoint.sh" ]