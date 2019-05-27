const c = require('chance');
const express =  require('express');

let chance = new c();
let app = express();

app.get('/', (req, res) => {
    res.send(generateStudents());
});

app.listen(3000, () => {
    console.log('Accepting HTTP requests on port 3000.');
});


function generateStudents(){
    var numberOfStudents = chance.integer({
        min: 0,
        max: 10
    });
    console.log(numberOfStudents);
    let students = [];
    for(var i = 0; i < numberOfStudents; i++){
        let gender = chance.gender();
        let birthYear = chance.year({
            min: 1986,
            max: 1996
        });
        students.push({
            firstName: chance.first({
                gender: gender
            }),
            lastName: chance.last(),
            gender: gender,
            birthday: chance.birthday({
                year: birthYear
            })
        });
    }
    console.log(students);
    return students;
}