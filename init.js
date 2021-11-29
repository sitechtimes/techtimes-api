const env = require("dotenv").config().parsed
const directories = ["articles","auth","cms","users"]
const path = require("path")
const fs = require("fs")

const newcommand = `cross-env JWT_KEY='${env.JWT_KEY}' MONGO_URI='${env.MONGO_URI}' EMAIL_USER='${env.EMAIL_USER}' EMAIL_PASSWORD='${env.EMAIL_PASSWORD}' URL='${env.URL}' npx jest --verbose false --no-cache`

directories.forEach((directory)=>{
    const package = JSON.parse(fs.readFileSync(path.resolve(`./${directory}/package.json`)).toString())
    package.scripts.test = newcommand

    fs.writeFileSync(path.resolve(`./${directory}/package.json`), JSON.stringify(package))
})