import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import FruitDetails from './Fruitdetails';

import axios from 'axios';
import apple from './static/img/apple.jpg';
import banana from './static/img/banana.jpg';
import orange from './static/img/orange.jpg';
import pears from './static/img/pears.jpg';



class FruitList extends Component {
  
  constructor(props) {
      super(props)
      this.state = { listoffruits: 'show', fruitselected:'none', fruitnr: 1, price:0};
      this.listfruits = React.createRef();
      
      this.hidefruitlist = this.hidefruitlist.bind(this)

    }
      
  hidefruitlist(event){
    event.preventDefault()
    this.listfruits.current.style.display = 'none'
    
    this.setState({
             listoffruits : 'hide',
     })
  }
    
   render(){

   	const {fruits} = this.props
   	const {listoffruits} = this.state
  	const {fruitselected} = this.state
    const {price} = this.state
    let {fruitnr} = this.state
  	
   return (
   <div>
	  
	 <div class = 'container'  ref = {this.listfruits} style = {{padding:'40px'}}>
	   
              	
      <div class = 'row' style = {{width:'950px',background:'#006400', borderColor:'#ff6600', 
      borderRadius:'20px', borderWidth:'3px'}}>

      { fruits.length>0 ? fruits.map((fruitItems:index)=>{
           
           return (
          <div class = 'col-3' style = {{paddingTop:'20px', paddingBottom:'20px'}}>
			  
    			  <div class="card"  style = {{ color:'darkgreen', fontFamily:'calibri', fontSize:'15px' 
             , background: '#c2e0ff', borderRadius:'20px', borderWidth:'3px', width:'200px', height:'250px', padding:'10px', 
            margin:'5px'}}>
    			  {fruitItems.Name}  

    			  <a href = "#" onClick = {(event)=>{
    			  	this.hidefruitlist(event);
    			  	this.state.fruitselected = fruitItems.Name
              this.state.price = fruitItems.Price
    			    }} style = {{color:'darkgreen', fontFamily: 'calibri',fontWeight:'bold'}}>
              Price {fruitItems.Price} Euro
                    
              <img class="card-img-top" src = {"/images/" + fruitItems.Name + ".jpg"}/>
              </a>
              
    			   </div> 
              
          </div>
          
           )
           }) : <div> no fruits available</div>}

        	  
		  </div>  
		</div>
		
        {listoffruits ==='hide' ? <FruitDetails cookies = {this.props.cookies} selfruit = {fruitselected} price = {price}/>  : ''} 

	  </div>
            
           
  );
 }
}
export default FruitList;




