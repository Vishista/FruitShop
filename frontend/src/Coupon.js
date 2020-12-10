import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios' ;

class Coupon extends Component {

  
  constructor(props){
    super(props)
    this.state = {startTime:0,timeElapsed:0,timerId:null,randomCode:''
                   ,coupCode:'',enterCode:false,showAd:true, couponUsed:false}
    this.timer = this.timer.bind(this)
    this.timeRem = React.createRef();
    this.callTimer = this.callTimer.bind(this)
    this.setCode = this.setCode.bind(this)
    this.formSubmit = this.formSubmit.bind(this)
    this.checkUsedCoupon = this.checkUsedCoupon.bind(this)

  }

 callTimer(){
    
    var id =  setInterval(this.timer, 1000)
    this.setState({timerId:id})
   // setTimeout(this.stopTimer(id), 20000)
 }

 
 timer(){
                 
       if (this.state.timeElapsed < 11 && this.state.timeElapsed > -1) 
       this.setState({timeElapsed:new Date().getSeconds() - this.state.startTime})
      
      
 }

 genCoupCode(){
  const {cookies} = this.props
  cookies.set('coupon','used')
  var code = ''
  var options = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
  
  // genarate 8 digit code
  var i
  for (i = 0; i < 8; i++){
    code = code + options.charAt(Math.floor(Math.random() * options.length));
  }
  this.setState({
    randomCode:code,
    enterCode:true,
    showAd:false
  })
  this.state.startTime = new Date().getSeconds()
  this.callTimer()
 }

 setCode(event){

  this.setState({
      coupCode: event.target.value
    })
 }

 formSubmit(event){
  event.preventDefault();

  //var ck = document.cookie
  //window.alert(ck)

  this.setState({timeElapsed:-1})
  if (this.state.randomCode == this.state.coupCode){

    clearInterval(this.state.timerId)
    this.setState({
      enterCode:false,
      timeElapsed:-1,
    })
    let curComp = this   
        const url = '/handlediscount';
        
        let cartdata = {
         "OrDiscount": true    
                 
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

        axios.post(url, cartdata, type)
       .then((response) => {
        console.log(response.data);
        curComp.props.setOraDisc(response.data)
      }, (error) => {
        console.log(error);
      });
           

     /*   fetch(url, type)
            .then(function(response){
               return response.json()
            }).then(function(responseData){
              
             curComp.props.setOraDisc(responseData)
            
              console.log(responseData)
            }).catch(function(error){
              console.log("error",error)
            })*/
    } else {
      
      window.alert("invalid coupon code. Coupon cannot be used now")
      clearInterval(this.state.timerId)
      this.setState({
      enterCode:false,
      timeElapsed:-1,
    })
    }
      
  }

 
 // this function connects to backend and checks if coupon is already used
 checkUsedCoupon(){

  let curComp = this   
        const url = '/usedcouponcheck';
                       
        let type = {
            
         withCredentials: true,
         method:'GET',
         
         headers:{
              
               'content-type': 'application/json',
               'Accept' : '*/*',
               'Accept-Encoding' : 'gzip,deflate,br',
               'Connection' : 'keep-alive'
              
            },
                                  
        }

        axios.get(url, type)
       .then((response) => {
        console.log(response.data);
        curComp.setState({
          couponUsed:response.data.UsedCoupon
        })
      }, (error) => {
        console.log(error);
      });
 }


 componentWillMount(){
   
   this.setState({
      couponUsed:false
   })

   this.checkUsedCoupon()
 }

 render() {
    //setTimeout(stopInterval(this.state.timerId),20000)
  const {randomCode} = this.state
  const {enterCode} = this.state
  const {showAd} = this.state
  const {timeElapsed} = this.state
  const {couponUsed} = this.state
  const {cookies} = this.props

  return (
   <div>  
      
    {cookies.get('coupon') == null && couponUsed == false?  
     <div>
      {showAd ?
       <div class = 'container' onClick = {(event)=>{this.genCoupCode()}} style = {{borderRadius: '10px', 
        marginlLeft: '1px', marginTop: '4px', width:'150px', height: '60px', background:'indianred'}}>
         
         <a  href = '#'>
          <div class = 'row'>
          

           <div class = 'col-9' style = {{color:'white'}}> 

               <h6> Get orange</h6>
               <h6> 30% Off </h6>
             
           </div>



           <div class = 'col-3'> 
                               
              <img style = {{ borderRadius: '20px', margin: '1px', marginTop: '6px',
               width: '40px', height: '40px'}} src = "/images/orange.jpg"/>
          
           </div>

           
          
         </div> 
        </a> 
        <div class = 'row'>
        </div>
        <div class = 'row'>
        </div>

                   

    </div>: ''}</div>:''}
      {enterCode ?
       <div> 
       {timeElapsed < 11 && timeElapsed > -1 ?
        <div>
         <div style = {{fontFamily: 'calibri'}}> expires in {timeElapsed < 11 ?
          (10-timeElapsed):''} s </div>
         code: {randomCode} 
             
         <form onSubmit = {this.formSubmit}>
          <div>
            <input type = 'text' style = {{width:'120px'}} value = {this.state.coupCode} onChange = {this.setCode} />
            <input type = 'submit' style = {{width:'120px',background: 'indianred', color: 'white'}} value = 'enter code' />
          </div>
         </form>
        </div>:''}
        </div>:''}
     </div>

    );
  }
}

export default Coupon;
