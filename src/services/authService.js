const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class AuthService {
    async register(res, userData){
        try{
            if(!userData.password){
                return {
                    success: false,
                    status: 401,
                    message: "Password is required",
                }
            }

            if(userData.password < 8){
                return {
                    success: false,
                    status: 401,
                    message: "Password must be at least 8 characters long",
                }
            }

            userData.password = await bcrypt.hash(userData.password, 10);
            const newUser = new User(userData);
            if(!await newUser.save()){
                return {
                    success: false,
                    status: 500,
                    message: "Internal server error",
                }
            }

            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
            res.setHeader('Authorization', `Bearer ${token}`);
            return {
                success: true,
                status: 200,
                message: "Successfully registered",
                token: token
            }
        }
        catch(error){
            throw error;
        }
    }
}

module.exports = AuthService;