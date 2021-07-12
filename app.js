import Express from 'express'
import Config from 'config'
import Mongoose from 'mongoose'
import router from "./routes/auth.routes.js";

const app = Express()

app.use('/api/auth' , router)

const PORT = Config.get('port') || 5000

async function start() {
    try{
        await Mongoose.connect(Config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}.....`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()

