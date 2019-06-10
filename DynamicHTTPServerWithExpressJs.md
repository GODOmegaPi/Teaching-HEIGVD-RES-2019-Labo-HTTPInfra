# Dynamic HTTP server with express.js

## Procedure

* To create the image we will use, use the following command in docker-images/express-image
```sh
docker build -t res/express_students .
```
* To run a docker container
```sh
docker run -it res/express_students /bin/bash
```
* You can connect to a running docker container by using
```sh
docker exec -it <container_name> /bin/bash
```

## Dependencies
We use the Node.js framework express

We use Chance to get random animal names
