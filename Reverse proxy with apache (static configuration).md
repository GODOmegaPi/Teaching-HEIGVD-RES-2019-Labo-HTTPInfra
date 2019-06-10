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