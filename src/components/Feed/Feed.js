import React, {Component} from 'react'
import axios from 'axios'
import './Feed.css'
import {Link} from 'react-router-dom'

class Feed extends Component {
constructor(){
    super()

    this.state={
        searchInput: "",
        posts: [],
        myPosts: true
    }
}

handleSearchInput = (e) => {
    this.setState({
        searchInput: e.target.value
    })
}   

handleSearch = () => {
    this.getAllPosts()
}

handleReset = () => {
   this.setState({
       searchInput: ""
   })
   this.getAllPosts()
}

toggleMyPosts = () => {
    this.setState({
        myPosts: !this.state.myPosts
    })
}
    
componentDidUpdate(prevProps, prevState){
    if(prevState.myPosts !== this.state.myPosts){
        this.getAllPosts()
    }  
}

componentDidMount(){
    this.getAllPosts()
    this.deletePost()
}

getAllPosts = async () => {
    try {
        const posts = await axios.get(`/feed/posts`)
        this.setState({
            posts: posts.data
        })
    }catch(err){
        console.log(err)
    }
}

deletePost = async (id) => {
    try {
        const posts = await axios.get(`/post/delete/${id}`)
        this.setState({
            posts: posts.data
        })
    }catch(err){
        console.log(err)
    }
}
    
    render(){
        const mappedPosts = this.state.posts.map((post, index) => {
            return (
                <div key={index}>
                   <div className='posts' to={`/post/${post.id}`}>
                   <h5>Posted By: ${this.props.username}</h5>
                    <button onClick={this.deletePost}>Delete Post</button>
                        <h1>{post.title}</h1>
                        <div className='rightSide'>
                            
                            <img alt='img' style={{width:"200px"}} src={post.poster}/>
                            <h5>{post.rating}</h5>
                            <h5>{post.content}</h5>
                            <hr className='hr'></hr>
                        </div>
                        </div> 
                </div>
            )
        })
        return (
            <div className='over'>
            <div className='feed'>
                <div className='search'>
                    <div className='searchBar'>
                        <input onChange={this.handleSearchInput} type='text' placeholder='Search Title: ' value={this.state.searchInput}/>
                        <button onClick={this.handleSearch}>Search</button>
                        <button onClick={this.handleReset}>Reset</button>
                    </div>
                    <div className='checkbox'>
                        <h5>My Post</h5>
                        <input type='checkbox' checked={this.state.myPosts} onChange={this.toggleMyPosts}/>
                    </div>
                </div>
                <div className='postContainer'>
                    {mappedPosts}
                </div>
            </div>
            </div>
        )
    }
}

export default Feed