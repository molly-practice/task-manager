require('../src/db/mongoose')
const Task = require('../src/models/task')

// a task ID: 60ac5d58b3b467392c2c975

// Task.findByIdAndDelete('60ac5d58b3b467392c2c975e').then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false })
// }).then((sum) => {
//     console.log('Number of incomplete tasks: ' + sum)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount('60ac5d4cb3b467392c2c975d').then((count) => {
    console.log('There are ', count, ' tasks left in the collection.')
}).catch((e) => {
    console.log(e)
})