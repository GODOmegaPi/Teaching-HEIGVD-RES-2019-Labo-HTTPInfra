# Reverse proxy with apache (static configuration)

## Procedure

* Be aware of the same-origin policy (wich says that request can only be done in the same domain)
* Start the container res/apache_php
```sh
docker run -d res/apache_php
```
* Start the container res/express_students
```sh
docker run -d res/express_students
```
* To get the address IP of a running container, use
```sh
docker inspect <container_name> | grep -i ipaddress
```
* To enter into ssh with docker, use
```sh
docker-machine ssh
```
* You can know test if the running countainers give you content
* To enable a new module in apache, use the script located in the apache server at `/etc/apache2` with the script `a2enmod`
* To enable multiple site, use `a2ensite`

## Reverse proxy conf

* First, copy the `000-default.conf` file located at `/etc/apache2/sites-available` with the name `001-reverse-proxy.conf`
```sh
cp 000-default.conf 001-reverse-proxy.conf
```
* If VI is not installed, do (it can be a good idea to include this commands in the dockerfile)
```sh
apt-get update
apt-get install vim
```
* After the installation is done, open the file `001-reverse-proxy.conf` and write the following config (don't forget the `/` at the end of the `ipaddress:port`)
```
<VirtualHost *:80>
        ServerName demo.res.ch

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined

        ProxyPass "/api/students/" "http://172.17.0.3:3000/"
        ProxyPassReverse "/api/students/" "http://172.17.0.3:3000/"

        ProxyPass "/" "http://172.17.0.2:80/"
        ProxyPassReverse "/" "http://172.17.0.2:80/"
</VirtualHost>
```
* Now, to enable the site, you need to go to `/etc/apache2/` and use
```sh
a2ensite 001*
service apache2 reload
```
* It will fail an that is normal. We haven't enable the needed modules. For that, use
```sh
a2enmod proxy
a2enmod proxy_http
service apache2 reload
```
* Now the only last things to do: create a Dockerfile and create a config folder with our reverse proxy config for the Apach server. For the Dockerfile, use:
```sh
FROM php:7.2-apache

COPY conf/ /etc/apache2

RUN apt update && apt install -y vim
RUN a2enmod proxy proxy_http
RUN a2ensite 000-* 001-*
```
And for the config folder named `conf`, create a structure like this:
```
/conf
| - sites-available
    | - 000-default.conf
    | - 001-reverse-proxy.conf
```
* In the file `000-default.conf` put:
```sh
<VirtualHost *:80>
</VirtualHost>
```
* And in the file `001-reverse-proxy.conf` put:
```sh
<VirtualHost *:80>
        ServerName demo.res.ch

        ProxyPass "/api/animals/" "http://172.17.0.2:3000/"
        ProxyPassReverse "/api/animals/" "http://172.17.0.2:3000/"

        ProxyPass "/" "http://172.17.0.3:80/"
        ProxyPassReverse "/" "http://172.17.0.3:80/"

</VirtualHost>
```