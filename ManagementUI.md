# Portainer
* To have an easy access and to be able to manage your docker environement very easly, use Portainer !
* First, start to pull the image from the docker hub:
```sh
docker pull portainer/portainer
```
* And then execute this command to start portainer on port `9000`:
```sh
docker volume create portainer_data
docker run -d -p 9000:9000 --name portainer --restart always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer
```
* Now you only need to do a:
```sh
docker inspect portainer
```
* Now you have the IP, you got the port, you only need to connect to it using a web browser and you're done ! You can now simply manage your images, your countainers and much more in juste one place with a nice UI !