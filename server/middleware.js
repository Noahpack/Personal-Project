module.exports = {
    checkUser: async (req, res, next) => {
        if(req.session.userid){
            next()
        }else {
            res.status(403).send('No user logged in')
        }
    }
}