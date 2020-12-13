const bcrypt = require('bcrypt')

module.exports = {

    register: async (req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body

        const foundUser = await db.check_user(username)
        if(foundUser[0]){
            return res.status(400).send('Username already in use')
        }

        const salt = bcrypt.genSaltSync(10);
        const hashed = bcrypt.hashSync(password, salt)
        const [newUser] = await db.register_user([username, hashed])
        req.session.user = {
            userid: newUser.id
        }
        res.status(200).send({
            id:newUser.id,
            username: newUser.username
        })
    },

    login: async (req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body

        const foundUser = await db.check_user(username)
        const user = foundUser[0]

        if(!user){
            return res.status(401).send("Incorrect Login")
        }
        const authenticated = bcrypt.compareSync(password, user.password)
        if (authenticated){
            req.session.user = {
                userId: user.id
            }
            return res.status(200).send({
                id: user.id,
                username: user.username
            })
        }
        else {
            res.status(401).send("Incorrect login info")
        }
    },
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },
    getMe: async (req, res) => {
        const {userId} = req.session.user
        
        const db = req.app.get('db')

        const [me] = await db.get_me([userId])
        return res.status(200).send({
            id: me.id,
            username: me.username
        })
    },
    
}