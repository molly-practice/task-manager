const mongoose = require('mongoose')

// similar to MongoClient.connect()
// provide a url and an options object. instead of storing the db as a const, we give it a name after the port number right in the url
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true // when mongoose works with mongodb, indexes are created, allowing us to quickly access the data
})

// const task = new Task({
//     description: 'some description',
//     completed: false
// })

// task.save().then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log('Error!', error)
// })