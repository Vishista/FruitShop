import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Session from './Session'
import axios from 'axios' ;
import queryString from 'query-string'

    

class Login extends Component {

  
   constructor(props) {

      super(props)
      this.setUserName = this.setUserName.bind(this)
      this.setPassword = this.setPassword.bind(this)
      this.formSubmit = this.formSubmit.bind(this)
      this.state = {user:'', username:'', password:'', loginResult:[], showLogin:true, myName:'viks'}
      
    }
  
formSubmit(event){

    event.preventDefault();
    
    this.setState({
      showLogin:false,
      user:this.state.username
    })
    
    let curComp = this   
    const url = '/login';
    
    let loginData = {
     "UserName" : this.state.username, 
     "Password" : this.state.password     
             
    }

    
   let type = {
       
        withCredentials: true,
        method:'POST',
        
        headers:{
               
               'content-type': 'application/json',
               'Accept' : '*/*',
               'Accept-Encoding' : 'gzip,deflate,br',
               'Connection' : 'keep-alive'
              
            },
                  
    }
       

  
      axios.post(url, loginData, type)
      .then((response) => {
        console.log(response);
        curComp.setState({ loginResult:response.data });
      }, (error) => {
        console.log(error);
      });

      this.setState({
        username: null,
        password: null
      })
}


setUserName(event){
   this.setState({username: event.target.value})
}

setPassword(event){
   this.setState({password: event.target.value})
}

componentWillMount(){
  
  const {username} = this.state.username

  console.log(this.state.loginResult.Login)

  if (this.state.loginResult.Login == "success"){
    this.props.displayLogin(false, username)
  }

}


render() {

  const {loginResult} = this.state
  const {showLogin} = this.state
  const {user} = this.state
  console.log(loginResult.Login)
  return (
   <div> 
        
          
          <form onSubmit = {this.formSubmit}>

            <label>
                username <input type = 'text' name = 'username' value = {this.state.username}
                 style={{margin:'3px', height:'25px', width:'100px',}} onChange = {this.setUserName}/>
            </label>
            
            <label>
                password <input type = 'password' name = 'password' value = {this.state.password}
                 style={{margin:'3px', height:'25px', width:'100px',}} onChange = {this.setPassword}/>
                <input type = 'submit' value = 'login'/>
            </label>

          </form>
            
          {loginResult.Login == "success" ? <Session redirect = {this.props.redirect} 
          loginResult = {loginResult} user = {user} 
            cookies = {this.props.cookies} displayLogin = {this.props.displayLogin}/>:''}
     
           {loginResult.Login == "failed" ? 
           <div>invalid credentials. please login again</div>:''}
     </div>
    );
  }
}

export default Login;
