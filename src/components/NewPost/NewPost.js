import React, {Component} from 'react'
import axios from 'axios'


class NewPost extends Component{
    constructor(){
        super()

        this.state = {
            title: "",
            poster: "https://static.thenounproject.com/png/340719-200.png",
            content:"",
            rating: ""
        }
    }
    componentDidMount(){
        if(this.state.poster === ""){
            this.setState({
                poster: "https://static.thenounproject.com/png/340719-200.png"
            })
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    addPost = () => {
        try{
            axios.post('/newPost', this.state)
            this.props.history.push('/feed')
        }
        catch(err){
            alert(err)
        }
    }

    render(){
        return (
        <div className='NewPost'>
            <div className='newPost'>
                <h1>New Review</h1>
                <div className='newPostContent'>
                    <h5>Title:</h5>
                    <input name='title' onChange={this.handleChange}></input>
                    <img alt = 'post' src={this.state.poster}/>
                    <h5>Image URL: </h5>
                    <input name ='poster' onChange={this.handleChange}></input>
                    <h5>Rating: </h5>
                    <input name = 'rating' onChange={this.handleChange}></input>
                    <h5>Content: </h5>
                    <input name= "content" onChange={this.handleChange}></input>
                </div>
                <button onClick={this.addPost}>Post</button>
            </div>
        </div>
        )
    }
}

function mapStateToProps(state){
    return{
        id:state.id,
    }
}
export default NewPost