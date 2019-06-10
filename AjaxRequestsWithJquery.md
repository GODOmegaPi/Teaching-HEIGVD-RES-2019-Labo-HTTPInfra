# Ajax requests with JQuery

## Procedure
As major modifications have been made to the Dockefiles, first build them :

- build apache_php image :
```sh
docker build -t res/apache_php ./docker-images/apache-php-image
```

- build express_animals image : 
```sh
docker build -t res/express_animals ./docker-images/express-image
```

- build apache_rp image :
```sh
docker build -t res/apache_rp ./docker-images/apache_rp
```

- Be sure to kill all containers if you run them before :
```sh
docker kill $(docker ps -qa)
docker rm apache_static
docker rm express_dynamic
docker rm apache_rp
```

- Now run the containers
```sh
docker run -d --name express_dynamic res/express_animals
docker run -d --name apache_static res/apache_php
docker run -d -p 8080:80 --name apache_rp res/apache_rp
```

- Beware that we want express_dynamic to have the 172.17.0.2 ip address and apache_static 172.17.0.3.
To check that you can run :
```sh
docker inspect express_dynamic | grep -i ipaddress
docker inspect apache_static | grep -i ipaddress
```

- If it's not the case try to kill the containers another time and be sure to run them in the same order as above. If it's not fixed that way, try to change ip addresses in "/docker-images/apache-reverse-proxy/conf/sites-available" and restart the procedure.

## Changelog
We used Ajax to fetch animals from our api with the javascript code below :
```js
$(function () {
  console.log("Loading animals...");

  function loadAnimals() {
    $.getJSON("/api/animals/", function(animals) {
      console.log(animals);
      let message = "Nobody is here";

      if(animals.length > 0) {
        message = animals[0].gender + " " + animals[0].animal;
      }

      $(".animal").text(message);
    });
  };

  loadAnimals();
  setInterval(loadAnimals, 2000);
});
```

You can see that we refresh the animal list every 2000ms.

To include it in the index we've added in index.html :
```html
<!-- Custom script to load animals -->
<script src="js/animals.js"></script>
```

There are other minors changes, as adding an 
```html
<h2 class="animal"></h2>
```

in index.html and a CSS tweak. All of those changes have been added in the src folder of the apache_php image. 
