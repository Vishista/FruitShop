import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import Purchase from './Purchase' ;
import Apple from './Apple' ;
import FruitDetailView from './FruitDetailView'


class FruitDetails extends Component {


constructor(props) {
  super(props)
  this.state = {showDetail:true,setVisibility:true, quantity:1}
  //const [value, setVisibility] = useState('');
  this.fruitDetail = React.createRef();
  //this.hideElement = this.hideElement(this)
  
    }

 hideElement = (value) => {
   //this.fruitDetail.current.style.display = 'none'
   //test.current.style.display = 'none'
   
  this.setState({
      setVisibility: value
      });
        
  
 }


setFruitQuantity = (value) => {
      
  this.setState({
      quantity: value
      });
       
 }

 componentDidMount(){
      
    }

 render() {
 	const {selfruit} = this.props
  const {price} = this.props
 	const {setVisibility} = this.state
  const {quantity} = this.state
    return (
        <div class = 'container'>
          <div class = 'row'>
            {setVisibility ? 
             <div class = 'col-8' ref = {this.fruitDetail}>

		         	         	
		          <FruitDetailView selfruit = {selfruit} price = {price} setFruitQuantity = {this.setFruitQuantity}/>
			       
		       </div>:''}
		       <div class = 'col-4'>
	              <Purchase cookies = {this.props.cookies} selfruit = {selfruit} price = {price} hideElement = 
                {this.hideElement} />
		       </div>
		      </div>
         </div>

         );
  }


 	}
    
    
  


export default FruitDetails;

