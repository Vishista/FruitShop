import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Payment from './Payment.js'
import Coupon from './Coupon.js'
import axios from 'axios' ;



class Cart extends Component {
	 constructor(props) {
      super(props)
      this.state = { cartTotal:0, nonDisTotal:0, savings:0, quantity:1, makePayment:false, payment:[], itemNr:0, itemDeleted:false, delItemNr:-1, newCart:[],qtyOptions:[]};
      this.setQuantity = this.setQuantity.bind(this)
      this.changeQuantity = this.changeQuantity.bind(this)
      this.itemDelete = this.itemDelete.bind(this)
      this.setOraDisc = this.setOraDisc.bind(this)

    }
 
 

 itemDelete(event){
    
    this.setState({
      delItemNr:event.target.value,
      itemDeleted: true
    })
    console.log(event.target.value)
    
    var nr = event.target.value -1
    let curComp = this 
     
    const url = '/delete';
    
    let deleteItem = {
     "ItemNr" : nr  
    
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

        axios.post(url, deleteItem, type)
       .then((response) => {
        console.log(response.data);
        curComp.setState({ newCart:response.data });
      }, (error) => {
        console.log(error);
      });
  
 }



 changeQuantity(event){
    
    console.log(event.target.value)
    console.log(event.target.name)
    
    

    let curComp = this   
    const url = '/changeQty';
    
    let qtyData = {
     "Name" :  event.target.name,
     "Quantity" : Number(event.target.value),  
                  
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

        axios.post(url, qtyData, type)
       .then((response) => {
        console.log(response.data);
        curComp.setState({ newCart:response.data });
      }, (error) => {
        console.log(error);
      });
          

    /*  fetch(url, type)
          .then(function(response){
             return response.json()
          }).then(function(responseData){
            curComp.setState({
             newCart:responseData
            })
            console.log(responseData)
          }).catch(function(error){
            console.log("error",error)
          }) */
    
 // curComp.getCart()

 }


 pay(){
      

      let curComp = this 
     
      curComp.setState({
        makePayment:true
      })
   
  
 }

 setQuantity(event){
   event.preventDefault();
   this.setState({quantity: event.target.value})
   
}


setOraDisc = (value) => {
   
  this.setState({
      newCart: value
  });
        
  
 }

componentDidMount(){
  
}

 
 render() {
    var i
    var ind = 0
    var val = []
    for (i = 0; i< 21 ; i++){
      val[i] = i
    }
     
    let homeUrl = "http://localhost:3000/"
    const cart = this.state.newCart.length > 0 || this.state.itemDeleted ? this.state.newCart : this.props.cart
    
 	  var {cartTotal} = this.state
    var {nonDisTotal} = this.state
    var {savings} = this.state
    var {payment} = this.state
    var {itemNr} = this.state
    var {makePayment} = this.state
    var {cookies} = this.props

    return (
    <div>
     {!makePayment ?
      <div>{cookies.get('name') != null ?
       <div>{cart.length > 0 ?
        <div style = {{padding:'40px'}} >
                     
             <Coupon cookies = {this.props.cookies} setOraDisc = {this.setOraDisc} />
                          
             <div>
              <a href = {homeUrl}><button class = 'btn btn-success btn-sm' style={{width:'150px',margin:'3px',marginLeft:'700px'}}>
               Browse Fruits</button>
              </a>
             </div>

             
           {!payment.Success ?
             <div>
                <button class = 'btn btn-primary btn-sm' style={{width:'150px', margin:'3px' 
                ,marginLeft:'700px'}}
                onClick = {(event)=>{this.pay();}}>pay</button>
             </div>: '' }
              
              

              <div class = 'card' style= {{fontFamily: 'calibri', borderRadius:'10px', 
              borderWidth:'15px', borderColor:'darkgreen', background: '#8fd1b2', 
              width:'850px', margin:'8px'}}>

                <table class="table table-sm">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col"></th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Unit Price €</th>
                      <th scope="col">Qty</th>
                      <th scope="col">Discount %</th>
                      <th scope="col">Final price €</th>
                      <th scope="col">Change Qty</th>
                  </tr>
                </thead>

                <tbody>
                  { cart.length>0 ? cart.map((cartItems:index)=>{
                    cartTotal = cartTotal+ cartItems.DiscountedPrice;
                    nonDisTotal = nonDisTotal + (cartItems.Price*cartItems.Quantity)
                    itemNr = itemNr+1
                   return (
                  <tr>
                    <th scope="row">{itemNr}</th>
                    <td><a><img class="card-img-top" style = {{width:'80px', height: '80px'}} src = {"/images/" + cartItems.Product 
                    + ".jpg"}/></a></td>

                    <td>{cartItems.Product}</td>
                    <td>{cartItems.Price.toFixed(2)}</td>
                    <td>{cartItems.Quantity}</td>
                    <td>{cartItems.Discount.toFixed(2)}</td>
                    <td>{cartItems.DiscountedPrice.toFixed(2)}</td>
                    <div>
                        
                        <td><select name= {cartItems.Product} value={cartItems.Quantity} id="quantity" onChange = {this.changeQuantity}>
                                { val.map((items:index)=>{ 
                                        
                                  return (<option>{items}</option>)})}
                                                         
                             </select>

                        </td>
                    </div>


                    <td><button id = {itemNr} value = {itemNr} style = {{borderRadius: '8px', borderStyle: 'hidden'
                    , background: '#006400', color:'white'}} onClick = {(event)=>
                      {this.itemDelete(event)}}>Remove</button></td>
                    
                  </tr> 
                  )}) : ''}
                  
                  <tr>
                    
                    <td colspan = "2"></td>
                    
                    <td><b>total</b></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{cartTotal.toFixed(2)}</td>
                    <td>€</td>

                  </tr>

                  <tr>
                    
                    <td colspan = "2"></td>
                    
                    <td><b>savings</b></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{(nonDisTotal.toFixed(2) - cartTotal.toFixed(2)).toFixed(2)}</td>
                    <td>€</td>
                  </tr>
                  
                 </tbody>
                </table>
               
               </div>
              
                      
           </div>: <div></div>}
           {!this.state.newCart.length > 0 && this.state.itemDeleted ?
           <div>
             <div style = {{padding:'40px'}}>
                <a href = {homeUrl}><button class = 'btn btn-success btn-sm' style=
                {{width:'150px',margin:'3px',marginLeft:'700px'}}>
                Browse Fruits</button>
                </a>
              </div>
              cart is empty
            </div>

             :'' }
     </div>:<div>please login </div> } </div>:''}
     {makePayment ? <Payment />: ''}
    </div>
    );
  }
}

export default Cart;
