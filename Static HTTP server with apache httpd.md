# Static HTTP server with apache httpd

## Procedure

* Go to [this tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-the-apache-web-server-on-ubuntu-18-04-quickstart) to setup apache 2 on ubuntu.
* You can connect to a running docker countainer by using
```bash
docker exec -it <container_name> /bin/bash
```
* You can change the default configuration of an apache server here
```bash
cd /etc/apache2
```
* To create the image we will use, use the following command
```bash
docker build -t res/apache_php .
```
* To start a new container with this freshly new image, use
```bash
docker run -d -p 9090:80 res/apache_php
```