const express = require('express')
require('dotenv').config()
const sequelize = require('./bd')
const models = require('./models/models')
const cors = require('cors')
const fileupload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileupload({}))
app.use('/api', router)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const start = async () => {
    try {
         await sequelize.authenticate()
         await sequelize.sync()
        app.listen(PORT, () => console.log(`server running on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()

