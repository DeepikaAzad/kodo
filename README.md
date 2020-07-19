# KODO Node js Pagination Challenge.
Implement search and sort of a feed, with pagination. 

System Requirements: Node 8.x+

## Technology

* Express
* MySQL 5.7

## Project setup

1. Copy .env from .env.example and update the required fields

2. Pull MySQL server (using docker):
        - docker pull mysql:5.7
        - docker run -p 3306:3306 --name mysql -d -e MYSQL_ROOT_PASSWORD=<ROOT_PASSWORD> mysql:5.7

3. Configure mysql application:

        - docker exec -it mysql /bin/sh
        - msql -u root -p <ROOT_PASSWORD>
        - Run the initial MySQL Configuration:
            ```sql
                CREATE DATABASE IF NOT EXISTS `kodo`;
                CREATE USER IF NOT EXISTS 'kodo_app'@'%' IDENTIFIED BY '<APP_PASSWORD>';
                FLUSH PRIVILEGES;
                GRANT ALL PRIVILEGES ON kodo.* TO 'kodo_app'@'%'; // (Recommeded to grant only required permissions for the application for specific IPs.)
                FLUSH PRIVILEGES;
            ```

4. Finally copy the `APP_PASSWORD` into .env
5. Create table:

        - Run: 
        ```sql
        CREATE TABLE `post` (
            `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
            `name` varchar(50) NOT NULL,
            `image` varchar(50) NOT NULL,
            `description` varchar(1000) NOT NULL DEFAULT '',
            `dateLastEdited` varchar(50) NOT NULL DEFAULT '',
            `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (`id`),
            FULLTEXT KEY `name` (`name`,`description`)
            ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1
        ```

## To run the project

In the project directory, run the following commands:

    ```node
    npm install
    node run start
    ```

## To run the test

    ```
    npm run test
    ```

## To access the API

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/7c564623edfe3ad6f149)

## Feauters

- Generate pagination info
- Calculates total number of pages.
- Implemented sorting by `name` and `dateLastEdited`.
- Support exact match when the query contains a phrase within double quotes
- Code is very modular.

### Pagination

### page & size

Page indicates number of current page and size indicates size of response rows.

By default 20 records returned per GET request on a table.

    ```
    /post?size=50
    ```
    ```
    /post?page=2
    ```
    ```
    /post?page=2&size=50
    ```

## Order by / Sorting

### ASC

    ```
    /post?sort=column1
    ```
example: sorts ascending by column1(Default sort is ASC)

### DESC

    ```
    /post?sort=-column1
    ```
example: sorts descending by column1(Add `-` before the field).

### Multiple fields in sort

    ```
    /post?sort=column1,-column2
    ```
eg: sorts ascending by column1 and descending by column2

## Column filtering / Fields

    ```
    /post?search=the king
    ```

### Strict search

    ```
    /post?search="the king"
    ```

Please feel free to contact me for any queries.

#### Contact Details

* Deepika Azad
* azaddeepika05@gmail.com
* +91 9783839582‬
