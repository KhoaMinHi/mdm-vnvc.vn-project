const passport = require('./passport');

class authCustomer {
    viewLogin(req, res, next) {
        try {
            if(req.isAuthenticated()){
                res.render('login', { notice: 'Bạn đã login!' });
            }
            else{
                let notice=null;
                if(req.session.messages !== undefined){
                    notice=req.session.messages[req.session.messages.length-1];
                }
                res.render('login', {notice});
            }
        }
        catch (error) {
            console.log(error);
            return res.status(400).send("Error in render login page!");
        }
    };
    async myCallback(req, res) {
        if (req.isAuthenticated()) {
            res.redirect('/');
        } 
        else{
            res.render('login', { notice: 'Sai tài khoản!' })
        }
    };
    async login(req, res, myCallback) {
        try {
            //you can type as follow or create new function call passport.authenticate, 
            //then call the result of callback
            // let temp = await passport.authenticate('local',
            //     { failureRedirect: '/auth', successRedirect: '/' }
            // )(req, res);
            // temp =  await myCallback(req, res);
            // let a =0;
            //don't register on redis db
            const call_back = await passport.authenticate('local', 
                { failureRedirect: '/auth' , successRedirect: '/'},
                (err, user, {message}) => { //get result from done function of passport
                    if(err){
                        console.log("Error login: ",err);
                        res.render('login', {notice: message});
                    }
                    else{
                        if(user){
                            console.log('passport auth success!!');
                            res.redirect('/');
                        }
                        else{
                            console.log('passport auth fail!!', message);
                            res.render('login', {notice: message});
                        }
                    }
                }
            );

            await call_back(req, res);
        }
        catch (error) {
            console.log(error);
            return res.status(400).render('login', { notice: "Error while login!" });
        }
    };
    logout(req, res, next) {
        try {
            if (req.user) {
                req.logout(function (err) {
                    if (err) { return next(err); }
                    req.session = null;
                    //res.setHeader('Content-Type', 'text/html');
                    res.render('login', { notice: 'Bạn đã logout!' });
                });
            }
            else {
                //res.setHeader('Content-Type', 'text/html');
                res.render('login', { notice: 'Bạn chưa login!' });
            }
        }
        catch (error) {
            console.log(error);
            return res.status(400).send("<h1>Logout Error!</h1>");
        }
    };
}

module.exports = new authCustomer();