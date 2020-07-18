# KODO Node js Pagination Challenge.

System Requirements: Node 8.x+

### Technology

To access the API:
* Express
* MySQL 5.7

## Project setup

1. Create .env from .env.example

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

## To run the project

```
npm install
```
```
node index.js
```

## To access the API:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/7c564623edfe3ad6f149)

### Feauters

- Pagination
- Sorting
- Column filtering - Where
- Code is very modular.

## Pagination

#### page & size 
page indicates number of current page and size indicates size of response rows.

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

#### ASC
```
/post?sort=column1
```
eg: sorts ascending by column1

#### DESC

```
/post?sort=-column1
```
eg: sorts descending by column1

#### Multiple fields in sort 

```
/post?sort=column1,-column2
```
eg: sorts ascending by column1 and descending by column2

## Column filtering / Fields
- strict search -- 
```
/post?search="the Lion king"
```
- lazy search -- 
```
/post?search=the Lion king
```

### Reference
- https://github.com/o1lab/xmysql


Please feel free to contact me for any queries.

##### Contact Details

* Deepika Azad
* azaddeepika05@gmail.com
* +91 9783839582‬

