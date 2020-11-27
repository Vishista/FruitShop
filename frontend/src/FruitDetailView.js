import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';




class FruitDetailView extends Component {

constructor(props){
   super(props)
   
}


 render() {
  const {selfruit} = this.props
  const {price} = this.props
  //const {quantity} = this.state
    return (
     <div> 
         <div class = 'row'>
           
           <div class = 'col' style = {{marginTop:'17px'}}>            
             <a href = "#">
              <img src= {"/images/" + selfruit + ".jpg"} style = {{paddingTop: '8px', width:'200px', height:'250px'}} alt= "logo"/>
             </a>
            </div>

                        
            <div class = 'col' style = {{marginTop:'10px',padding:'10px'}}>
             <h3> {selfruit} </h3>
             <h5> Price  {price} Euro (1 qty) </h5>
            </div>
                        
           </div> 
            
           
     </div>
    );
  }
}

export default FruitDetailView ; 

