


// JS非類別型語言，後人很想給他類別，就用function仿類別型
function createPerson(name, age){
    var obj = {};
    obj.name = name;
    obj.age = age;

}

let p1 = createPerson("小張", 28);
let p2 = createPerson()

function Person(name, age){
    this.name = name;
    this.age = age;
    this.greeting = function(){
        console.log(`Hi, 我是 ${this.name}`);
    };
}

let p1 = new Person("小王", 28);
let p1 = new Person("小張", 25);

// 沒抄完！