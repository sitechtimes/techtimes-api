import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import jwt from "jsonwebtoken";

export class Verify {

   static async generateToken(email: String) {
        return jwt.sign({email}, "something", {
            expiresIn: '20m'
        });
   }

   static async sendVerificationEmail(email: String, code: String){
    //    const transport = nodemailer.createTransport(smtpTransport({
    //        host: 'smtp.gmail.com',
    //        service: 'gmail.com',
    //        port: 587,
    //        secure: false,
    //        auth: {
    //            user: process.env.EMAIL_USER,
    //            pass: process.env.EMAIL_PASSWORD
    //        }
    //    }));

    //    let mailOptions = {
    //        from: process.env.EMAIL_USER,
    //        to: email.toString(),
    //        subject: "TechTimes Email confirmation",
    //        html: `Hello there, click the following link to verify your email: <a href="${process.env.URL}/auth/verify/${code}">Verify email</a>`
    //    }

    //    return transport.sendMail(mailOptions);
    return
   }

}