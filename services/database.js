const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')

module.exports = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        })

        console.log('MongoDB successfully connected')
    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}
