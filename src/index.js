// starting point for our application - here we initialize the express server

const express = require('express')
// requiring the mongoose file makes sure that mongoose runs and that mongoose connects to the database
require('./db/mongoose')
// load in our models
const User = require('./models/user')
const Task = require('./models/task')
// load in our routers
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
// register our routers with the application
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})