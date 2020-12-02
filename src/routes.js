import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Auth from './components/Auth/Auth'
import Feed from './components/Feed/Feed'
import UserPosts from './components/userPosts/UserPosts'

export default (
    <Switch>
        <Route exact path="/" component={Auth}/>
        <Route path ="/feed" component={Feed}/>
        <Route path ="myPosts" component={UserPosts}/>
    </Switch>
)