'use strict'

let router = require('express').Router()
let User = require('../models/User')
let userController = require('../controller/userController')



// router.route('/createJam3yee').get(function(req,res){
//   res.render('createJam')
// }).post(userController.createJam3yee)


router.route('/createJam').post(userController.createJam3yee)
// signing up handling



router.route('/signup').post(function(req,res) {
  console.log(req.body)
    let user = new User()
    user.username = req.body.username
    user.email = req.body.email
    user.setPassword(req.body.password)
    user.save((err) => {
        if (err) {
            if (err.message.indexOf('duplicate key error') > -1) {
            console.log('Username or email is already exist')  
            res.status(300)
            }
        } else {
            console.log('success')
            res.status('200').send('200')

        }
    })
})

router.route('/getJam/id/:id').get(userController.getJam3yee)

router.route('/getJam').post(userController.getJam3yee)

router.route('/getMyJam').post(userController.getUsersJam3yee)



// Render index page with login form
router.route('/').get(function (req, res) {
  res.send('welcome')
})

router.route('/login').post(userController.logIn)
// logging in handling


router.route('/logout').get(userController.logOut)


module.exports = router