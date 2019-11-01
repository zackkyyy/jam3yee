const mongoose = require('mongoose')

class Mongoose {
    constructor() {
          this.uri ='mongodb://localhost:27017/jam3yee'
       // this.uri = 'mongodb+srv://admin:adminPassword@cluster0-pwowb.mongodb.net/test?retryWrites=true&w=majority'
    }
    connect() {
        mongoose.connect(this.uri)
        let db = mongoose.connection
        db.on('connected', function () {
            console.log('Database connected')
        })
        db.on('error', console.error.bind(console, 'MongoDB connection error:'))
        process.on("SIGINT", function () {
            db.close(function () {
                console.log("Mongoose connection disconnected through app termination.")
                process.exit(0);
            })
        })
    }
}

module.exports = Mongoose;