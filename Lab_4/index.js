// function calcStrLen(str){
//     return str.split(' ').map(el => el + ' ' + el.length);
// }

// console.log(calcStrLen("Hello world"));//[“hello 5”, “worldd 6”];

// //=============================================================================

// function lettersToNumbers(str){
//     str = str.toLowerCase();
//     let letterColection = new Set(str);
//     return str.split('').map(elem=>{
//          return Array.from(letterColection).findIndex(el => el === elem);
//     }).join('.');
// }

// console.log(lettersToNumbers("Hello"));
// console.log(lettersToNumbers("HELlo"));
// console.log(lettersToNumbers("hellO"));
// console.log(lettersToNumbers('Hippopotomonstrosesquippedaliophobia'));
// //"0.1.2.2.3.2.3.4.3.5.3.6.7.4.8.3.7.9.7.10.11.1.2.2.9.12.13.14.1.3.2.0.3.15.1.13");

// //=============================================================================

// function stringParse(str) {
//     if (typeof str === 'string')
//        return addBracket();
//     else
//        return "Please enter a valid string";

//     function addBracket() {
//         return splitIntoSubstrings().map(el => {
//             if(el.length > 2){
//                 el.splice(2, 0, '[');
//                 el.splice(el.length, 0, ']');
//             }
//             return el.join('');
//         }).join('');

//         function splitIntoSubstrings() {
//             let substring = [];
//             let substrings = [];

//             for (let i = 0; i < str.length; i++) {
//                 if (str[i] == str[i + 1])
//                     substring.push(str[i]);
//                 else {
//                     substring.push(str[i]);
//                     substrings.push(substring);
//                     substring = [];
//                 }
//             }
//             return substrings;
//         }
//     }
// }
// console.log(stringParse("aaaabbcdefffffffg"))// "aa[aa]bbcdeff[fffff]g"

// //=============================================================================

// console.log(1 - '0' + 2);//3
// console.log(1 - '-0' + 2);//3
// console.log(1 - '-0-' + 'NaN');//NaNNaN -- NaN + 'NaN'
// console.log('b' + [NaN + 'ba', 'CC'] - {});//NaN
// console.log([] + (() => { }));//()=>{}
// console.log((() => ({})));//()=>({})
// console.log([] + (() => ({}))())//[object Object];
// console.log([] + (() => new Object(123))());//123
// console.log({} + (() => new Object(123))());//[object Object]123
// console.log((() => new Object(123))() + {});//123[object Object]
// console.log(({}).valueOf() + 1);//[object Object]1
// console.log({} + 2);//[object Object]2
// console.log(typeof ({}).valueOf() + 2);//object2
// console.log(+ {});//NaN
// console.log(+ {} + []);//NaN
// console.log(+[]);//0
// console.log(+[] + {});//0[object Object]
// console.log(+[10, 1] + {});//NaN[object Object]
// console.log({} + [10]);//[object Object]10

// //====================================================================

// console.log(0 == null);//f
// console.log(null == undefined);//t
// console.log(1 == {});//f
// console.log({} == 1);///f
// console.log(({}) == 1);//f
// console.log(({ }) == 12);//t