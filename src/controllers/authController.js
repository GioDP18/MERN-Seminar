const AuthService = require('../services/authService');

const authService = new AuthService();

module.exports = {
    register: async (req, res, next) => {
        try{
            await authService.register(res, req.body)
            .then((response) => {
                if(response.success){
                    console.log(response);
                    res.status(response.status).json(response);
                }
                else{
                    console.log(response.message);
                    res.status(response.status).json(response);
                }
            })
        }
        catch(error){
            next(error);
        }
    }
};