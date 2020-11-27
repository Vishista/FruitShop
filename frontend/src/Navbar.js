import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Login from './Login'
import Register from './Register'


class NavBar extends Component{

    constructor(props) {
      super(props)
      this.state = { register:false, login:false, showLogin:true, showLogout: false,user:''};
      

    }

    changeLoginState(){
      this.setState({
             login: true,
             
     })
      
    }

    redirect = () => {
      window.location.href = "http://localhost:3000/"
    }

    register(){
      this.setState({
             register: true,
     })
    }
    

    displayLogin = (value, name) => {
   
    //delete the set cookie
    const {cookies} = this.props

    //cookies.remove('name')
    cookies.set('name', name)

    this.setState({
      showLogin: value,
      login: value,
      user: cookies.get('name')
      });
        
    }

    perLogout(){
      this.setState({
        showLogin: true,
        login : false
      })
      const {cookies} = this.props
      cookies.remove('name')
      cookies.remove('coupon')
      window.location.href = "http://localhost:3000/"

    }

    componentWillMount(){
      const {cookies} = this.props
      if (cookies.get('name') != null){
        this.setState({
        showLogin: false,
        user : cookies.get('name')
        })
      }
    }
    
    render(){
       let homeUrl = "http://localhost:3000/"
       const {login} = this.state
       const {register} = this.state
     return (
     <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" href="#">The Fruit Store</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <a class="nav-link" href= {homeUrl}>Home <span class="sr-only">(current)</span></a>
              </li>
            {this.state.showLogin ?
             
              <li class="nav-item">
                <a class="nav-link" href="#" onClick = {(event)=>{
                  this.changeLoginState();}}>Login</a>
              </li>:''}

            {this.state.showLogin ?
              <li class="nav-item">
                <a class="nav-link" href="#"  onClick = {(event)=>{
                  this.register();}} >Register</a>
              </li>:
              <li class="nav-item">
                <a class="nav-link" href= "#" onClick = {(event)=>{
                  this.perLogout();}}>Logout</a>
              </li>}
              <li class="nav-item">
                <a class="nav-link" href="#">Order</a>
              </li>

              <li class="nav-item">
                <a class="nav-link" href="#">Cart</a>
              </li>

              {this.state.showLogin == false ?<li class="nav-item" 
              style={{color:'white',paddingLeft:'450px'}}>logged in as {this.state.user}
                
              </li>:''}

                           
            </ul>
          </div>
        </nav>

         { login? <div class = 'card' style = {{color:'brown',background:'lightgrey',
         fontWeight:'bold',fontFamily:'TimesNewRoman'}}><Login redirect = {this.redirect} cookies = {this.props.cookies} displayLogin = {this.displayLogin}/></div>
          
             :''}

         { register? <div class = 'card' style = {{color:'brown',background:'lightgrey', fontWeight:'bold', fontFamily:'TimesNewRoman'}}><Register cookies = {this.props.cookies}/></div>
          
             :''}


      </div>
    
    );
  }
}

export default NavBar;