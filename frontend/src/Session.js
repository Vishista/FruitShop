import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';




class Session extends Component {

  
	constructor(props) {
      super(props)
      this.state = {username:'anonymous'}

    }
  
 
 componentDidMount(){
    const {cookies} = this.props
    const {loginResult} = this.props
    const {user} = this.props
    
    this.props.displayLogin(false,user)
    console.log(loginResult.Login)
   /* if (loginResult.Login == "success"){
      console.log("login success") */

      //set cookie for the user
    cookies.set('name', user, { path: '/', maxAge: 7200})
    this.props.redirect()
    //this.setState({username:cookies.get('name')})
        
 }

 render() {
     const {cookies} = this.props
    return (
     <div> 
                 
           
     </div>
    );
  }
}

export default Session;
