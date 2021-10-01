const mongoose = require('mongoose');



const main = async()=>{

    let conn =  await mongoose.connect('mongodb://localhost:27017/techtimes')
    console.log(conn.connection)
}

main()