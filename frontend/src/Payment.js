import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios' ;


class Payment extends Component {

  constructor(props) {
        super(props)
        this.state = {creCaNr:false,debCaNr:false,cardNr:'',payment:[], valPayment:false, 
        payReply:'', waiting:0, startTime:0}

        this.formSubmit = this.formSubmit.bind(this)
        //this.disPayRes = this.dispPayRes.bind(this)
        //this.dispTimer = this.dispTimer.bind(this)
  }
  

  credit(event){
    
    this.setState({
      creCaNr: true,
      debCaNr:false,
    
    })
  }

  

  debit(event){
    
    this.setState({
      debCaNr: true,
      creCaNr:false,
      
    })
  }

  setCardNr(event){

    this.setState({
      cardNr: event.target.value
    })
    console.log(this.state.cardNr)
  }


  formSubmit(event){

    event.preventDefault();

    if(this.state.cardNr == '') {
      alert("enter a valid card nr")
    } else {
     

     let curComp = this 

     curComp.setState({
        valPayment:true
     })
        
   
      const url = '/pay';
      
      let paydata = {
       "Card" : this.state.creCaNr?"Credit Card":"Debit Card",   
       "CardNr": this.state.cardNr,
       // "Total" : this.state.cartTotal
      }
      
      console.log(this.state.creCaNr)
      console.log(this.state.cardNr)
               

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
         
      
       axios.post(url, paydata, type)
       .then((response) => {
        console.log(response.data);
        curComp.setState({ payment:response.data });
      }, (error) => {
        console.log(error);
      });
    }

     //this.dispPayRes()
  }

    
  
  render() {
    
    const {creCaNr} = this.state
    const {debCaNr} = this.state
    const {payment} = this.state
    const {valPayment} = this.state
    const {payReply} = this.state
    // const {waiting} = this.state
    return (
    	   
            <div>
              {this.state.payReply}
               {!valPayment ?
                 <div style = {{fontFamily:'calibri', fontWeight:'bolder', fontSize:'16px',color:'brown'}}>
                   PAYMENT TYPE
                 
                  <form onSubmit = {this.formSubmit}>
                    <div class = 'container' style = {{width: '500px',marginLeft: '200px', 
                     }}>
                     
                    <div class = 'row' style = {{color: 'white',background: '#5f9ea0', borderRadius:'30px'}}> 
                      <div class = 'col-2'>
                        <a>
                          <img style = {{width: '70px',height: '50px'}}
                           src = "/images/credit.jpg"/>
                        </a>
                       </div>

                      <div class = 'col-3'> 
                         CREDIT CARD <input type="radio" id="creditCard" name = "radio"
                         value="creditCard" onChange = {(event)=>{
                         this.credit(event);}}/>
                      </div>

                         {creCaNr ?
                          <div class = 'col-7' style = 
                           {{marginTop: '6px', height:'5px'}}> 
                            card nr <input type="text" name="creditCard" value = 
                            {this.state.cardNr} onChange = {(event)=>{
                            this.setCardNr(event);}}/>
                          </div> : ''}

                     </div>


                     <div class = 'row'>
                       <hr />
                     </div>


                                        
                     <div class = 'row' style = {{color: 'white', background: '#5f9ea0', borderRadius:'30px'}}> 
                       <div class = 'col-2'>
                        <a>
                          <img style = {{width: '70px',height: '50px'}}
                           src = "/images/debit.jpg" />
                        </a>
                       </div>

                      <div class = 'col-3'> 
                         DEBIT CARD &nbsp; <input type="radio" id="debitCard" name = "radio"
                         value="debitCard" onChange = {(event)=>{
                         this.debit(event);}}/>
                      </div>
                      {debCaNr ?
                        <div class = 'col-7' style = 
                           {{marginTop: '6px', height:'5px'}}>

                           card nr <input type="text" name="debitCard" value = 
                           {this.state.cardNr} onChange = {(event)=>{
                           this.setCardNr(event);}}/>

                        </div>:''}
                     </div>


                     <div class = 'row'>
                       <hr />
                     </div>

                    
                   </div>

                   <div style = {{ marginLeft: '400px'}}>
                     <input type = 'submit' style = {{ width: '100px',color: 'white', background: 'indianred',
                       borderRadius:'30px', borderStyle:'hidden'}} value = 'pay'/>
                  </div>
                </form>
               </div>: ''}
                
                {payment.Valid ? <div><div style = {{marginTop:'40px',fontFamily: 'calibri',
                  fontSize:'25px',fontWeight:'bold',width:'300px',color:'darkgreen', marginLeft:'300px'}}>
                 PAYMENT WAS SUCCESSFULL</div> 
                 
                 <div class = 'card' style = {{background:'indianred', color:'white', fontWeight:'bold', fontFamily:'calibri'
                  , marginLeft:'360px', marginTop:'70px', width:'150px'}}>
                   <div style = {{paddingLeft:'5px'}}>
                     <div> ORDER DETAILS </div>
                     <div>ID - {payment.OrderId}</div>
                     <div>USER - {payment.User}</div>
                     <div>PAYTYPE - {payment.PayType}</div>
                     <div>TOTAL - {payment.Total} euros</div>
                   </div>
                  </div>
                </div>
                 :''}

         		 </div>
    );
  }
}

export default Payment;
