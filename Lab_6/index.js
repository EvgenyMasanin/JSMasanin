function deepCopy(obj) {
    let copy = {};

    for (const prop in obj) {
        if (obj[prop] instanceof Object) {
            copy[prop] = deepCopy(obj[prop])
        }
        else {
            copy[prop] = obj[prop]
        }
    }

    return copy;
}

let obj1 = {
    name:'Bob',
    age: 19,
    contry: {
        name: 'America',
    }
}
let obj2 = deepCopy(obj1)

obj1.contry = 'Russia'

console.log(obj1);
console.log(obj2);