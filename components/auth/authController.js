const passport = require('./passport');

class authCustomer {
    viewLogin(req, res, next) {
        try {
            res.render('login');
        }
        catch (error) {
            console.log(error);
            return res.status(400).send("Error in render login page!");
        }
    };
    async login(req, res, next) {
        try {
            await passport.authenticate('local', { failureRedirect: '/auth' , successRedirect: '/'});
        }
        catch (error) {
            console.log(error);
            return res.status(400).send("<h1>Error while login!</h1>");
        }
    };
    logout(req, res, next) {
        try {
            if(req.user){
                req.logout(function (err) {
                    if (err) { return next(err); }
                    res.redirect('/auth');
                });
            }
            else{
                res.render('login', {notice: 'Bạn chưa login!'});
            }
        }
        catch (error) {
            console.log(error);
            return res.status(400).send("<h1>Logout Error!</h1>");
        }
    };
}

module.exports = new authCustomer();