# Screenshots

![Dashboard](https://i.imgur.com/nYj6Nxt.png)
![Customers](https://i.imgur.com/CMxFroo.png)
![Add New Customer](https://i.imgur.com/flK3a5F.png)

# Prerequisites

- [Composer](https://getcomposer.org/download/)
- [Symfony](https://symfony.com/doc/6.4/the-fast-track/en/1-tools.html)
- [NodeJS](https://nodejs.org/en/download/current)

# Getting Started

## REST API
Go into the `api` directory and execute the following command:

```
composer install
```

Open `.env` file within the `api` directory and edit the `DATABASE_URL` with your database credentials.

Execute the database migrations:
```
symfony console doctrine:migrations:migrate
```

Now execute the following command to seed the database with fake data:
```
symfony console doctrine:fixtures:load
```

Then simply run the following command to run a development server for the REST API backend:
```
symfony serve
```
## Frontend Web Client

Go into the `web` directory and execute the following command:

```
npm install
```

Then simply run the following command to serve the frontend web client:
```
npm run dev
```