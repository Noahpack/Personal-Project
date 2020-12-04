import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {updateUserData} from '../../redux/reducer'
import './Nav.css'

class Nav extends Component {
 
    getMe  = async () => {
        try{
            const me = await axios.get('/api/auth/me')
            this.props.updateUserData(me.data[0].username)     
        }catch(err){
            alert(err)
        }
    }
    componentDidMount() {
        this.getMe()
        console.log(this.props.username)
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
            <div className='navBar'>
                <div className='topNavBar'>
                    <div className='profile'>
                        <h4> Username: {this.props.username}</h4>
                    </div>
                    
                    <button><Link className='navButton' to='/feed'>Home</Link></button>
                    <button><Link className='navButton' to='/new'>New Post</Link></button>
                  
                <button><Link className='navButton' to='/'>Logout</Link></button>
                </div>
            </div>
        )
    }

}
function mapStateToProps(state){
    return{
        username: state.username
    }
}
export default connect(mapStateToProps, {updateUserData})(Nav)