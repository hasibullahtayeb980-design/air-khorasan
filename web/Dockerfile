FROM ubuntu:latest

# Set non-interactive mode for apt
ARG DEBIAN_FRONTEND=noninteractive

# Update and install required packages in a single RUN command
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y \
        apt-utils \
        locales \
        software-properties-common \
        curl \
        git

# Install Node.js using NVM
ENV NODE_VERSION=24.14.1
ENV NVM_DIR=/root/.nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash && \
    . "$NVM_DIR/nvm.sh" && \
    nvm install ${NODE_VERSION} && \
    nvm alias default v${NODE_VERSION} && \
    ln -s "$NVM_DIR/versions/node/v${NODE_VERSION}/bin/node" /usr/local/bin/node && \
    ln -s "$NVM_DIR/versions/node/v${NODE_VERSION}/bin/npm" /usr/local/bin/npm

# Verify Node.js and npm installation
RUN node --version && npm --version

# Set the locale
RUN locale-gen en_US.UTF-8
ENV LC_ALL en_US.UTF-8

# Set working directory
WORKDIR /var/www/air-khorasan/web

# Copy application files
COPY . .

EXPOSE 5173

# Install Node.js dependencies
RUN npm install
CMD npm run dev
