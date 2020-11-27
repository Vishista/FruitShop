import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Cart from './cart.js'
import FruitDetailView from './FruitDetailView'
import axios from 'axios' ;
import queryString from 'query-string'


class Purchase extends Component {

constructor(props) {
      super(props)
      this.state = { cart:[],quantity:1};
      this.purchaseOptions = React.createRef();
      this.setQuantity = this.setQuantity.bind(this)
    }

setQuantity(event){

  event.preventDefault();

  this.setState({quantity: event.target.value})
   
}

addtocart(event){
      this.purchaseOptions.current.style.display = 'none'
      this.props.hideElement(false)

      const {selfruit} = this.props
     
      const {price} = this.props
      
      let curComp = this   
      const url = 'http://localhost:8009/handlecart';
      
      
      let cartdata = {
       "Name" : selfruit, 
       "Quantity" : Number(this.state.quantity),  
       "Price" : price,     
               
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
         

      /*  fetch(url, type)
            .then(function(response){
               return response.json()
            }).then(function(responseData){
              curComp.setState({
               cart:responseData
              })
              console.log(responseData)
            }).catch(function(error){
              console.log("error",error)
            })*/
       axios.post(url, cartdata, type)
       .then((response) => {
        console.log(response.data);
        curComp.setState({ cart:response.data });
      }, (error) => {
        console.log(error);
      });
     
       
  }

 render() {
    const {cart} = this.state
       
    return (
         
      <div>

          <div class = 'row' ref = {this.purchaseOptions}>
            
            <div class = 'col' style = {{marginTop:'10px', padding:'10px'}}>
              select quantity <input type="number" id="quantity" name="quantity"
               value = {this.state.quantity} min="1" max="20" onChange = {this.setQuantity}/>
             </div>


           
            <div class = 'col' style = {{marginTop:'17px'}}>
             
              <div>       
                <button class = 'btn btn-success btn-sm' onClick = {(event)=>{
                  this.addtocart(event);}} style={{margin:'3px', width:'100px',}}>add to cart</button>
              </div>


              <div>
                <button class = 'btn btn-primary btn-sm' style={{margin:'3px', width:'100px',}}>purchase</button>
              </div>

            </div>

          </div> 

          <Cart cart = {cart} cookies = {this.props.cookies}/>
          
        </div>
    );
  }
}

export default Purchase;
