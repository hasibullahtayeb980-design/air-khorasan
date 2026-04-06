FROM php:8.5-fpm

RUN apt-get update && apt-get install -y zip git-all curl
RUN docker-php-ext-install pdo pdo_mysql intl xsl gd pdo_pgsql zip

ENV COMPOSER_ALLOW_SUPERUSER=1

# Install Composer (using official Composer image to avoid extra steps)
COPY --from=composer:2.9 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Install PHP dependencies before copying all source (cache layer)
COPY composer.json composer.lock ./
RUN composer install --no-interaction --prefer-dist --no-scripts --no-dev

# Copy app sources
COPY . ./

RUN curl -sS https://get.symfony.com/cli/installer | bash
RUN mv /root/.symfony5/bin/symfony /usr/local/bin/symfony
RUN symfony server:ca:install && symfony book:check-requirements

EXPOSE 9000
CMD ["php-fpm"]
