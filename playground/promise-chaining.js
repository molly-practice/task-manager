require('../src/db/mongoose')
const User = require('../src/models/user')

// 60aac2faa439343554ae7e24

// note about mongoose model queries-
// .updateOne() and .updateMany() will not give you the doc(s) back
// but .findByIdAndUpdate() and .findOneAndUpdate() will

// HERE IS THE PROMISE CHAINING EXAMPLE
// User.findByIdAndUpdate('60aae49eb0fa2d3bc8525473', {age: 1}).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 1 })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

// Here is the async-await example
const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('60aae49eb0fa2d3bc8525473', 2).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})