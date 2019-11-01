let User = require('../models/User')
let Jam3yee = require('../models/Jam3yee')


const logOut = async (req, res) => {
    req.session.loggedin = false
    req.session.destroy()
    res.redirect('/')

}

const getJam3yee = async(req, res)=>{
    let jam3yeeID = req.params.id
    console.log(jam3yeeID)

    Jam3yee.findById(jam3yeeID, function(err, founded){
        if (err || !founded) {
        console.log(err || !founded)
            }
        else{
            console.log(founded)
            res.send(founded)
        }
    }) 
}

const getUsersJam3yee = async(req, res)=>{
    let userID = req.body.userID
    Jam3yee.find({ownerID : userID}, function(err, list){
        if (err || !list) {
        console.log('not found')
            }
        else{
            console.log(list)
            res.send(list)
        }
    }) 
}


const signUp = async (req, res) => {
    
}
const logIn = async (req, res) => {
    console.log('logging in ')
    User.findOne({ username: req.body.username }, function (err, user) {
        if (err || !user) {
            console.log('here1')
            res.status(300).send('user doesnot Exist')
        } else {
            if (!user.validPassword(req.body.password)) {
                console.log('here')
                res.status(300).send('wrong passowrd')
            } else {
                console.log(user)
                req.session.user = user
                req.session.username = req.body.username
                req.session.loggedin = true
                res.status(200).send({
                    'username' : user.username,
                    'email' : user.email,
                    '_id': user._id
                })
            }
        }
    })
}

const createJam3yee = async (req,res)=>{
console.log(req.body)
let jam3yee = new Jam3yee()
jam3yee.ownerID= req.body.ownerID
jam3yee.ownerName = req.body.ownerName
jam3yee.startDate = req.body.startDate
jam3yee.endDate= new Date(req.body.startDate)  // TODO : fix this so it add months as the amount of the members 
jam3yee.participants = req.body.participants
jam3yee.monthlyPayment = req.body.amount



jam3yee.save((err) => {
    if (err) {
       console.log('err')
    } else {
        console.log('saved to database')
        req.session.flash = {
            category: 'positive',
            message: 'Sign up completed.. You can now sign in'
        }
        res.status(200).send('200')
    }
})
}

module.exports = {
    logOut,
    logIn,
    signUp,
    createJam3yee,
    getJam3yee,
    getUsersJam3yee
}
