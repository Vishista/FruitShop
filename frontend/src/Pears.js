import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import pears from './static/img/pears.jpg'

class Pears extends Component {
 render() {
    return (
     <div> 
         <div class = 'row'>
           <div class = 'col'>            
             <a href = "#">
              <img src= {pears} style = {{width:'200px', height:'250px'}} alt= "logo"/>
             </a>
            </div>

                        
            <div class = 'col' style = {{padding:'10px'}}>
             <h3> Pears </h3>
             <h5> Price  1 Euro (1 qty) </h5>
            </div>
             
             <div class = 'col' style = {{padding:'10px'}}>
              select quantity <input type="number" id="quantity" name="quantity" min="1" max="5"/>
             </div>
           </div> 
            
           
     </div>
    );
  }
}

export default Pears;
