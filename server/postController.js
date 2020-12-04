

module.exports = {
    addPost: async (req, res) => {
        const db = req.app.get('db')
        const {userid} = req.session.userid;
        const {title, poster, rating, content} = req.body
        const id = userid

        const newPost = await db.add_post([title, poster, rating, content, id])
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
            const posts = await db.get_posts()
            return res.status(200).send(posts)
        }
    },

    getPost: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params

        const post = await db.get_post([id])
        return res.status(200).send(post)
    },

    deletePost: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        const {userid} = req.session.id
        const post = await db.get_post([id])

        if(userid != post[0].id){
            return res.status(401).send('You cannot delete another users post')
        }else {
            await db.delete_post([id])
            return res.status(200).send('Deleted')
        }
    },
    getAllPosts: async (req, res) => {
        const allPosts = await req.app.get('db').get_all_posts()
        return res.status(200).send(allPosts)
    }

}