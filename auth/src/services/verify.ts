import { randomBytes } from 'crypto';
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import jwt from "jsonwebtoken";

export class Verify {

   static async generateToken(email: String) {
       return jwt.sign({email}, process.env.JWT_KEY!, {
           expiresIn: '20m'
       });
   }

   static async sendVerificationEmail(email: String, code: String){
       const transport = nodemailer.createTransport(smtpTransport({
           host: 'smtp.gmail.com',
           port: 587,
           secure: false,
           auth: {
               user: process.env.EMAIL_USER,
               pass: process.env.EMAIL_PASSWORD
           }
       }));

       let mailOptions = {
           from: process.env.EMAIL_USER,
           to: email.toString(),
           subject: "TechTimes Email confirmation",
           html: `This is a test confirmation email: http://localhost:8000/auth/verify/${code}`
       }

       return transport.sendMail(mailOptions);
   }

}