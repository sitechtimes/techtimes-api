const jwt = require("jsonwebtoken");


let test = async function generateToken(email) {
        jwt.sign({email}, "hello", {
           expiresIn: '20m'
       });
   }

console.log(test("sussy@gmail.com"))