import { randomBytes } from 'crypto';
import nodemailer from 'nodemailer';
import jwt from "jsonwebtoken";

export class Verify {

   static async generateToken(email: String) {
       return jwt.sign({email}, process.env.JWT_KEY!, {
           expiresIn: '20m'
       });
   }

   static async sendVerificationEmail(email: String, code: String){
       const transport = nodemailer.createTransport({
           host: 'smtp.gmail.com',
           port: 587,
           secure: false,
           auth: {
               user: "sitechtimesinfo@gmail.com",
               pass: "$FullStack"
           }
       });

       let mailOptions = {
           from: "sitechtimesinfo@gmail.com",
           to: email.toString(),
           subject: "TechTimes Email confirmation",
           html: `This is a test confirmation email: http://localhost:8000/auth/verify/${code}`
       }

       transport.sendMail(mailOptions, () => { });
   }

}