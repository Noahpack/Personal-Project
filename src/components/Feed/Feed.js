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
    this.setState({
        searchInput: ""
    })
    this.getPosts()
}

handleReset = () => {
    this.getPosts()
}

toggleMyPosts = () => {
    this.setState({
        myPosts: !this.state.myPosts
    })
}
    
componentDidUpdate(prevState){
    if(prevState.myPosts !== this.state.myPosts){
        this.getPosts()
    }  
}

componentDidMount(){
    this.getPosts()
}

getPosts = async () => {
    try{
        const posts = await axios.get(`/feed/posts/${this.props.id}?search=${this.state.searchInput}&userposts=${this.state.myPosts}`)
        this.setState({
            posts: posts.data
        })
    }
    catch(err){
        alert(err)
    }
}
    
    render(){
        const mappedPosts = this.state.posts.map((post, index) => {
            return (
                <div key={index}>
                    <Link className='posts' to={`/post/${post.id}`}>
                        <h1>{post.title}</h1>
                        <div className='rightSide'>
                            <h5>{post.username}</h5>
                            <img alt='profile' src={post.picture}/>
                        </div>
                    </Link>
                </div>
            )
        })
        return (
            <div className='dash'>
                <div className='search'>
                    <div className='searchBar'>
                        <input onChange={this.handleSearchInput} type='text' placeholder='Search Title: ' value={this.state.searchInput}/>
                        <button onClick={this.handleSearch}>Search</button>
                        <button onClick={this.handleReset}>Reset</button>
                    </div>
                </div>
                <div className='postContainer'>
                    {mappedPosts}
                </div>
            </div>
        )
    }
}

export default Feed