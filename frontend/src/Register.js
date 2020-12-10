import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Session from './Session'
import axios from 'axios' ;

    

class Register extends Component {

  
   constructor(props) {

      super(props)
      this.setUserName = this.setUserName.bind(this)
      this.setPassword1 = this.setPassword1.bind(this)
      this.setPassword2 = this.setPassword2.bind(this)
      this.formSubmit = this.formSubmit.bind(this)
      this.redirect = this.redirect.bind(this)
      this.state = {username:'', password1:'', password2:'', password:'', regResult:[]}
      
    }
  
formSubmit(event){

    event.preventDefault();
       
    let curComp = this  
    if (this.state.password1 == this.state.password2) {
       
      if(this.state.username != '' && this.state.password1 != '' && this.state.password2 != ''){

        this.setState({
          password:this.state.password1
        })
        const url = '/register';
        
        let registerData = {
         "UserName" : this.state.username, 
         "Password" : this.state.password1     
                 
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
       
  
      axios.post(url, registerData, type)
      .then((response) => {
        console.log(response);
        curComp.setState({ regResult:response.data });
      }, (error) => {
        console.log(error);
      });

    } else {
      alert("fields cannot be empty");
    }
      
    

  } else {
    alert("the two passwords must match");

  } 
    
  //window.location.href = "http://localhost:3000/"
    
}


 setUserName(event){
     this.setState({username: event.target.value})
  }

 setPassword1(event){
     this.setState({password1: event.target.value})
  }

 setPassword2(event){
     this.setState({password2: event.target.value})
  }

 redirect(){
    window.location.href = "http://localhost:3000/"
 }


 render() {
    
    const {regResult} = this.state
    return (
     <div> 
        {!(regResult.Register == "success") ?
         
          <form onSubmit = {this.formSubmit}>

            <label>
                username <input type = 'text' name = 'username' value = {this.state.username}
                 style={{margin:'3px', height:'25px', width:'100px',}} onChange = {this.setUserName}/>
            </label>
            
            <label>
                password <input type = 'password' name = 'password1' value = {this.state.password1}
                 style={{margin:'3px', height:'25px', width:'100px',}} onChange = {this.setPassword1}/>
                
            </label>

             <label>
                re-enter password <input type = 'password' name = 'password2' value = {this.state.password2}
                 style={{margin:'3px', height:'25px', width:'100px',}} onChange = {this.setPassword2}/>
                <input type = 'submit' value = 'register'/>
            </label>

          </form>: ''}
            
          {regResult.Register == "success" ?<div>{this.redirect()}</div>:''}

          {regResult.Register == "failed" ?<div> username already taken, try different 
          username</div>:''}
     </div>
    );
  }
}

export default Register;
