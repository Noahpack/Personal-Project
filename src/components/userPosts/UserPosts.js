import axios from 'axios'
import React, {Component} from 'react'
import {connect} from 'react-redux'

class UserPost extends Component{
    constructor(){
        super()

        this.state={
            title: "",
            poster: "",
            rating: "",
            content: "",
            username: "",
            userId: null 
        }
    }

    componentDidMount(){
        this.getPost()
    }

    getPost = async () => {
       try{ 
        const post = await axios.get(`/post/${this.props.match.params.id}`)
        this.setState({
            title: post.data[0].title,
            poster: post.data[0].poster,
            rating: post.data[0].rating,
            content: post.data[0].content,
            username: post.data[0].username,
            userId: post.data[0].id

        })
     }
        catch(err){
            alert(err)
        }
    }

    deletePost = async () => {
        try{
            const response = axios.delete(`/post/delete/${this.props.match.params.postid}`)
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
                        <img alt="Post" src={this.state.poster}/>
                        <p>{this.state.content}</p>
                    </div>
                    <button onClick={this.deletePost}>Delete</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        id: state.id
    }
}
export default connect(mapStateToProps)(UserPost)