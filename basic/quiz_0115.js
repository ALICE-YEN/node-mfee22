let obj1 = {
    name: "Paul",
    car: {
        brand: "AAA",
        color: "Red",
    }
};

let obj2 = obj1;

obj1.car.color="blue";

console.log(obj2.car.color);

// 在obj1開的記憶體，再開記憶體裝car。
// 沒聽懂 11:10