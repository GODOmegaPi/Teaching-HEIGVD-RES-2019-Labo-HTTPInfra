# Dynamic reverse proxy configuration

## Procedure

* First of all, we'll need to create a new file called `apache2-foreground`in the same directory as the Dockerfile for the static reverse proxy. We then need to add some lines into this files so we can pass argument to our countainer to be able to say where to find the static and dynamic servers. For this, use:
```sh
#!bin/bash
set -e

echo "Static app URL: $STATIC_APP"
echo "Dynamic app URL: $DYNAMIC_APP"

rm -f /var/run/apache2/apache2.pid

exec apache2 -DFOREGROUND
```
* We need to change the Dockerfile to take this new configuration.
```sh
FROM php:7.2-apache

COPY conf/ /etc/apache2
COPY apache2-foreground /usr/local/bin/

RUN apt update && apt install -y vim
RUN a2enmod proxy proxy_http
RUN a2ensite 000-* 001-*
```
* Now we want to create an automated way of creating the config file. So we can create a folder named `template` and a file inside named `config-template.php`. We can put the following code inside the newly created php file:
```php
<?php
    $STATIC_APP = getenv('STATIC_APP');
    $DYNAMIC_APP = getenv('DYNAMIC_APP');
?>

<VirtualHost *:80>
    ServerName demo.res.ch

    ProxyPass "/api/animals/" "http://<?php print "$DYNAMIC_APP" ?>/"
    ProxyPassReverse "/api/animals/" "http://<?php print "$DYNAMIC_APP" ?>/"

    ProxyPass "/" "http://<?php print "$STATIC_APP" ?>/"
    ProxyPassReverse "/" "http://<?php print "$STATIC_APP" ?>/"

</VirtualHost>
```
* Now we need to change the Dockerfile to take care of our new config file:
```sh
FROM php:7.2-apache

COPY apache2-foreground /usr/local/bin/
COPY templates /var/apache2/templates
COPY conf/ /etc/apache2

RUN apt update && apt install -y vim
RUN a2enmod proxy proxy_http
RUN a2ensite 000-* 001-*
```
* And we need to modify the `apache2-foreground` to execute our php script:
```sh
#!bin/bash
set -e

echo "Static app URL: $STATIC_APP"
echo "Dynamic app URL: $DYNAMIC_APP"
php /var/apache2/templates/config-template.php > /etc/apache2/sites-available/001-reverse-proxy.conf

rm -f /var/run/apache2/apache2.pid

exec apache2 -DFOREGROUND
```