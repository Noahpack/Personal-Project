import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Auth from './components/Auth/Auth'
import Feed from './components/Feed/Feed'
import UserPosts from './components/userPosts/UserPosts'
import NewPost from './components/NewPost/NewPost'

export default (
    <Switch>
        <Route exact path="/" component={Auth}/>
        <Route path ="/feed" component={Feed}/>
        <Route path ="/myPosts/:postid" component={UserPosts}/>
        <Route path ="/new" component={NewPost}/>
    </Switch>
)