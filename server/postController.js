

module.exports = {
    addPost: async (req, res) => {
        const db = req.app.get('db')
        const {userid} = req.session.userid;
        const {title, rating, poster, content} = req.body
        id = userid

        const newPost = await db.add_post([title, rating, poster, content, id])
        return res.status(200).send(newPost)
    },
    getPosts: async (req, res) => {
        const db = req.app.get('db')
        const {userid} = req.session.userid

        const {userposts, search} = req.query
        const id = userid

        if(userposts === 'true' && search){
            const posts = await db.search_userposts([search])
            console.log(posts)
            return res.status(200).send(posts)
        }
        if(userposts === 'false' && !search){
            const posts = await db.nousers_nosearch(id)
            return res.status(200).send(posts)
        }
        if(userposts === 'false' && !search){
            const posts = await db.noUsers_withSearch([search, id])
            return res.status(200).send(posts)
        }
        if(userposts === 'true' && !search){
            const posts = await db.get_all_posts()
            return res.status(200).send(posts)
        }
    },

    getPost: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        const post = await db.get_post([id])
        return res.status(200).send(post)
    }
}