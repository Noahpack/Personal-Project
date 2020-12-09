import axios from 'axios'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import './UserPosts.css'

class UserPosts extends Component{
    constructor(){
        super()

        this.state={
            // title: "",
            // poster: "",
            // rating: "",
            // content: "",
            // username: "",
            userId: null,
            posts: []
        }
    }

    componentDidMount(){
        this.getYourPosts()
    }

    // getPost = async () => {
    //    try{ 
    //     const post = await axios.get(`/post/${this.props.match.params.id}`)
    //     this.setState({
    //         title: post.data[0].title,
    //         poster: post.data[0].poster,
    //         rating: post.data[0].rating,
    //         content: post.data[0].content,
    //         username: post.data[0].username,
    //         userId: post.data[0].id

    //     })
    //  }
    //     catch(err){
    //         alert(err)
    //     }
    // }
    getYourPosts = async () => {
        try {
            const post = await axios.get(`/posts/${this.props.match.params.user_id}`)
            this.setState({

                posts: post.data
            })
        }catch(err){
            alert(err)
        }
    }

    deletePost = async (id) => {
        try{
            const response = axios.delete(`/post/delete/${id}`)
            if (response === "You can only delete posts you created."){
                alert(response)
            }
            this.props.history.push('/feed')
        }
        catch(err){
            alert(err)
        }
    }

    render(){
        const mappedPosts = this.state.posts.map((post) => {
            return <div key={post.id}>
                    
                {console.log(post)}
                 <h5>Posted By: {post.username}</h5>
                 <h1>{post.title}</h1>
                 
                 <div className='rightSide'>
                     
                     <img alt='img' style={{width:"200px"}} src={post.poster}/>
                     <h5>{post.rating}</h5>
                     <h5>{post.content}</h5>
                     <hr className='hr'></hr>
                     <button onClick={()=>this.deletePost(post.id)}>Delete</button>
                 </div>
             
         </div> 
        })
        console.log("User post line 86",this.state.posts)//
        return (
            <div className="Post">
                <div className="content">
                    <div className="postTitle">
                        <h1>{this.state.title}</h1>
                        <div className = "postTitle">
                            <h5>Posted By: {this.state.username}</h5>
                            
                        </div>

                    </div>
                    <div className="postContent">
                        <img alt="Poster" style={{width:"150px"}} src={this.state.poster}/>
                        
                    </div>
                   {mappedPosts}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return state
}
export default connect(mapStateToProps)(UserPosts)