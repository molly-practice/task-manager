const express = require('express')
const User = require('../models/user')
const router = new express.Router()

// remember, making a function async makes it go from returning a value to returning a promise
// express doesn't use the return value from this function anyway, we use req and res to tell express what we want to do
// so in this case we've added the async functionality without changing the code
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }

    // user.save().then(() => {
    //     res.status(201).send(user)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})

// get all users in db
router.get('/users', async (req, res) => {
    // we use the mongoose find method to get multiple documents at once
    // if we leave find empty it'll fetch everything. we can also put json in there to filter- User.find({ name: 'Molly' })
   
   try {
        const users = await User.find({})
        res.send(users)
   } catch (e) {
        res.status(500).send()
   }
   
    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

// get an individual user by ID
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }

    // User.findById(_id).then((user) => {
    //     // note: .then() will be triggered even if there's no user with that id in the db. we only throw an error if the server fails to respond correctly
    //     if (!user) {
    //         return res.status(404).send()
    //     }
    //     res.send(user)

    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})

router.patch('/users/:id', async (req, res) => {
    const _id = req.params.id

    // this stuff below just makes it so you can't update properties that don't exist
    // this is already the default behavior of patch, but this way we can give the user 
    // an error message that tells them the updates are invalid
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => {
        // callback function gets called for every item in the array
        // return true if the update is allowed, false otherwise
        // every: runs through each item, if you get true for every one, every returns true. otherwise it returns false. basically if all true -> true, if any false -> false
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send( {error: 'Invalid Updates'} )
    }

    try {
        // setting new to true returns the new user instead of the one that was found before the update
        // setting runValidators to true makes validators run on the updated data
        const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        // here we could have a server issue OR a validation issue
        res.status(400).send(e)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user) {
            res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router