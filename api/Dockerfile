FROM php:8.5-fpm

# system deps + required libs for Symfony + doctrine
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    zip \
    unzip \
    libzip-dev \
    libicu-dev \
    libxml2-dev \
    zlib1g-dev \
    libpng-dev \
    libonig-dev \
    curl \
    && docker-php-ext-install -j$(nproc) pdo pdo_mysql zip intl opcache \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer (using official Composer image to avoid extra steps)
COPY --from=composer /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Install PHP dependencies before copying all source (cache layer)
COPY composer.json composer.lock ./
RUN composer install --no-interaction --prefer-dist --optimize-autoloader --no-scripts --no-dev --ignore-platform-reqs

# Copy app sources
COPY . ./

# Prepare cache log dirs for Symfony
RUN mkdir -p var/cache var/log && chown -R www-data:www-data var/cache var/log
RUN chown -R www-data:www-data public

EXPOSE 9000
CMD ["php-fpm"]