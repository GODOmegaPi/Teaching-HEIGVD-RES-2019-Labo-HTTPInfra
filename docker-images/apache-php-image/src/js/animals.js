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

