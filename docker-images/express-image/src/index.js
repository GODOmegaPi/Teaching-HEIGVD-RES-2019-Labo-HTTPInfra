const c = require('chance');
const express =  require('express');

let chance = new c();
let app = express();

app.get('/', (req, res) => {
    res.send(generateAnimals());
});

app.listen(3000, () => {
    console.log('Accepting HTTP requests on port 3000.');
});


function generateAnimals(){
    var numberOfAnimals = chance.integer({
        min: 1,
        max: 20
    });
    console.log(numberOfAnimals);
    let animals = [];
    for(var i = 0; i < numberOfAnimals; i++){
        animals.push({
            animal: chance.animal(),
            gender: chance.gender()
        });
    }
    console.log(animals);
    return animals;
}