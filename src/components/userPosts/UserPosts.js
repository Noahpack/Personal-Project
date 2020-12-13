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
    
    // handleChange = (e) => {
    //     this.setState({
    //         [e.target.name]: e.target.value
    //     })
    // }

    

    componentDidMount(){
        this.getYourPosts()
    }

    
    getYourPosts = async () => {
        try {
            const post = await axios.get(`/posts/${this.props.user.id}`)
            this.setState({

                posts: post.data
            })
        }catch(err){
            alert(err)
        }
    }
    // editPost = async (postId, rating) => {
    //     axios.put(`/post/${postId}`, {rating})
    //     .then(() => {
    //         this.getYourPosts()
    //     })
    //     .catch(err => {
    //         console.log('edit post errrrr', err)
    //     })
         
    // }
    deletePost = (id) => {
        axios.delete(`/post/${id}`)
        .then(() => {
            this.getYourPosts()
        })
        .catch(err => {
            console.log(err)
        })
    }

    

    render(){
        const mappedPosts = this.state.posts.map((post) => {
            return <div key={post.id}>
                    
                
                 <h5>Posted By: {post.username}</h5>
                 <h1>{post.title}</h1>
                 
                 <div className='rightSide'>
                     
                     <img alt='img' style={{width:"150px"}} src={post.poster}/>
                        <h3>{post.rating}</h3>
                     <h5 className='para'>{post.content}</h5>
                    {/* <input className='edit-inp' name='content' onChange={this.handleChange} placeholder='edit rating'/>
                     <button className='edit-btn' onClick={()=> this.editPost(post.id, this.state.rating)}>Edit Rating</button> */}
                     <button onClick={()=>this.deletePost(post.id)}>Delete</button>
                     <hr className='hr'></hr>
                 </div>
                
                 
             
         </div> 
        })
        
        return (
            <div className="Post">
                <div className="content">
                    
                    <div className="postContent">
                        
                        
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