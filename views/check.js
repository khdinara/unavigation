const Cookies = require("cookies");

let cookies = new Cookies();
let email = document.getElementById('email');
let password = document.getElementById('psw-repeat');
let emailCheck = cookies.get('email');
let passwordCheck = cookies.get('password');
console.log('1 ' + email);
console.log('2 ' + password);
console.log('3 ' + emailCheck);
console.log('4 ' + passwordCheck);