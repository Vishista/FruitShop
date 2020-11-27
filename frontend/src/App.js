import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FruitList from './Fruitslist' ;
import NavBar from './Navbar' ;
import Test from './test' ;
import axios from 'axios' ;
import Coupon from './Coupon'
import 'bootstrap/dist/css/bootstrap.css';
import {withCookies} from 'react-cookie'




class App extends Component {

  
  constructor(props) {
      super(props)
      this.state = { restData:[] };
      //this.loadFromBackend = this.loadFromBackend.bind(this)

    }
  loadFromBackend(){
  let curComp = this
  const url = 'http://localhost:8009/search';
  let type = {
        method:'GET',
        headers:{
          'content-type': 'application/json'
        }
      }

      fetch(url, type)
      .then(function(response){
         return response.json()
      }).then(function(responseData){
      
        curComp.setState({
          restData:responseData
        })
      }).catch(function(error){
        console.log("error",error)
      })
    
    
   /*   axios.get(url).then((repos) => {
      const allData = repos.data;
      curComp.setState({ restData:allData });
    });*/

    }

    componentDidMount() {
    document.body.style.backgroundColor = "#c2e0ff";
    this.setState({
          restData:[]
        })
    this.loadFromBackend()
      
  }
 

 render() {
    const {restData} = this.state
  
    return (
     <div style = {{}}> 
           
           <NavBar cookies = {this.props.cookies}/>
           
           <FruitList cookies = {this.props.cookies} fruits = {restData} />
           
           
     </div>
    );
  }
}

export default withCookies(App);;
