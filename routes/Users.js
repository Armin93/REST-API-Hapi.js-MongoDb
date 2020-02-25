const User = require('../model/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
process.env.SECRET_KEY = 'secret';
exports.plugin = {
    register: (server, options, next) => {
        server.route({
            method: "POST",
            path: "/register",
            handler: (req, h) => {
                const userData = {
                    first_name: req.payload.first_name,
                    last_name: req.payload.last_name,
                    email: req.payload.email,
                    password: req.payload.password
                }
                return User.findOne({
                    email: req.payload.email
                }).then(user => {
                    if (!user) {
                        bcrypt.hash(req.payload.password, 10, (err, hash) => {
                            userData.password = hash;
                            return User.create(userData)
                                .then(user => {
                                    return { status: user.email = 'Registred!' }
                                })
                                .catch(err => {
                                    return 'error' + err
                                })
                        })
                        return { status: userData.email = 'Registred!' }
                    }
                    else {
                        return { error: "User already exist" }
                    }
                })
                    .catch(err => {
                        return 'error:' + err
                    })
            }
        })

        server.route({
            method: 'POST',
            path: '/login',
            handler: (req, h) => {
                return User.findOne({
                    email:req.payload.email
                }).then(user => {
                    if (user) {                        
                        if (bcrypt.compareSync(req.payload.password, user.password)) {
                            const payload = {
                                id: user._id,
                                first_name: user.first_name,
                                last_name: user.last_name,
                                email: user.email
                            }
                            let token = jwt.sign(payload, process.env.SECRET_KEY, {
                                expiresIn: 1440
                            })
                            return token;
                        } else {
                            return { error: "User does not exist" }
                        }
                    } else {
                        return { error: "User does not exist" }
                    }
                }).catch(err => {
                    return { error: err }
                })
            }
        })
        // server.route({
        //     method: "GET",
        //     path: "/profile",
        //     handler: (req, h) => {
        //         var decoded = jwt.verify(
        //             req.headers.authorization,
        //             process.env.SECRET_KEY
        //         )
        //         return User.findOne({
        //             _id: mongoose.Types.ObjectId(decoded.id)
        //         })
        //             .then(user => {
        //                 if (user) {
        //                     return user;
        //                 }
        //                 else {
        //                     return "User does not exist"
        //                 }
        //             })
        //             .catch(err => {
        //                 return 'error:' + err
        //             })
        //     }
        // })
    },
    name: 'users'
}