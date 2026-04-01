FROM php:8.5.4-fpm

RUN apt-get update && apt-get install -y \
    zip unzip git curl 

RUN docker-php-ext-install pdo pdo_mysql

WORKDIR /var/www

COPY . /var/www/
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer
RUN COMPOSER_ALLOW_SUPERUSER=1 composer install --no-scripts

EXPOSE 9000
CMD ["php-fpm"]