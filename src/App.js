import routes from './routes'
import Nav from './components/Nav/Nav'
import {withRouter} from 'react-router'
import React, {Component} from 'react'

class App extends Component {
  render() {
    return (
      <div className="App">
        {this.props.location.pathname !== '/' ? <Nav/> : <div></div>}
        {routes}
      </div>
    )
  }
}

export default withRouter(App);
