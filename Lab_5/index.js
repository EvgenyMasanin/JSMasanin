// codewars task 1

// function multiplyAll(arr) {
//     return function (multiplier) {
//         return arr.map(el => el * multiplier)
//     }
// }

// console.log(multiplyAll([1, 2, 3])(2));

//===============================================================

// codewars task 2

// function arrayDiff(arr1, arr2) {
//     let result = [];
//     arr1.forEach((el) => {
//         if(!arr2.includes(el)){
//             result.push(el);
//         }
//     })
//     return result;
// }

// console.log(arrayDiff([1, 2], [1]));
// console.log(arrayDiff([1, 2, 2, 2, 3], [2]));

//======================================================================

// pipe pattern

// function multiPipe() {
//     return Array.from(arguments).reduce((prefn, fn) => {
//             return pipe(prefn, fn)
//     });

//     function pipe(fn1, fn2) {
//         return function(x) {
//             return fn2(fn1(x));
//         }
//     }
// }

// const multiplyTwo = (n) => n * 2;
// const minusFour = (n) => n - 4;
// const multiplyTan = (n) => n * 10;

// const res = multiPipe(
//     multiplyTwo,
//     minusFour,
//     multiplyTan
// )(10);

// console.log(res);

//=================================================================

// memo pattern

// function memo(fn) {
//     const cache = new Map();

//     return function(...rest) {
//         if (cache.has(rest.toString())) {
//             return cache.get(rest.toString());
//         }

//         const result = fn(...rest);

//         cache.set(rest.toString(), result);

//         return result;
//     }
// }

// const sum = (a, b, c, d) => {
//     for (let index = 0; index < 2000000000; index++) {
//     }
//     return a + b + c + d;
// }
// const memedSum = memo(sum);

// console.log(memedSum(1, 2, 2, 4));
// console.log(memedSum(1, 2, 2, 4)); // second time there is no calculation, we get answer from cache

//====================================================================

// apply polif

// function apply(fn, context, parms) {
//     let uniqe = Date.now().toString();
//     context[uniqe] = fn;
//     let result = context[uniqe](...parms);
//     delete context[uniqe];
//     return result;
// }

// let human = {
//     name: 'Bob',
// }

// function sayHi(surname, age) {
//     console.log(`Hi, my name is ${this.name} ${surname}, I am ${age}`);
// }

// sayHi.apply(human, ['Parker', '20'])

// apply(sayHi, human, ['Parker', '20'])

// console.log(human);