import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUserData} from '../../redux/reducer'
import './Nav.css'

class Nav extends Component {
 
    getMe  = async () => {
        try{
            const me = await axios.get('/auth/me')
            console.log(me.data)
            this.props.getUserData(me.data)     
        }catch(err){
            alert(err)
        }
    }
    componentDidMount() {
        this.getMe()
        
    }

    logout = async () => {
        try{
            await axios.post('/api/auth/logout')
        }
        catch(err){
            alert(err)
        }
    }
    render(){
        return (
            <header className='navBar'>
                <div className='topNavBar'>
                    <div className='profile'>
                        <h4> Welcome, {this.props.user.username}</h4>
                    </div>
                    <div className='btn'>
                    <button><Link className='navBtn' to='/feed'>Home</Link></button>
                    <button><Link className='navBtn' to='/new'>New Post</Link></button>
                    <button><Link className='navBtn' to='/myPosts' >My Posts</Link>  </button>
                <button><Link className='navBtn' to='/'>Logout</Link></button>
                </div>
                </div>
                <br className='br'></br>
            </header>
            
        )
    }

}
function mapStateToProps(state){
    return state
}
export default connect(mapStateToProps, {getUserData})(Nav)