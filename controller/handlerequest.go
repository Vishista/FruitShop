package controller

import ("fmt"
      "net/http"
      //"databases"
      "strings"
      "encoding/json"
      "model"
      "cart"
      "payment"
      "session"
      
)



var fruits []model.Fruit 
var incomingdata model.Cart
var refreshedCart []model.Cart
var curSession session.Session

type DeleteItem struct{
 ItemNr int `json:"ItemNr"`

}

type OrangeCoupon struct{
 UsedCoupon bool `json:"UsedCoupon"`

}


type LoginResult struct{
  Login string `json:"Login"`
}


type RegisterResult struct{
  Register string `json:"Register"`
}



type PayInfo struct{
   Card string `json:"Card"`
   CardNr string `json:"CardNr"`
}


type PayConfirm struct{
  Success bool `json:"Success"`}


func home(w http.ResponseWriter, r *http.Request){

  fmt.Fprintf(w, "go web app")

}



func search(w http.ResponseWriter, r *http.Request) {
 // w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
 // w.Header().Set("content-type", "application/json")
 // fmt.Println(r.Cookie("name"))
  w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
  w.Header().Set("Allow", "GET, POST, HEAD, OPTIONS")
  w.Header().Set("Content-Type", "application/json")
  w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
  fruits = []model.Fruit{
        model.Fruit{Name: "apple", Price: 1},
        model.Fruit{Name: "banana", Price: 1},
        model.Fruit{Name: "orange", Price: 1},
        model.Fruit{Name: "pears", Price: 1},
        
      }
  
  json.NewEncoder(w).Encode(fruits)
  
}




func usedCouponCheck(w http.ResponseWriter, r *http.Request){
  
  var orCoupon OrangeCoupon

  orCoupon.UsedCoupon = false

  userCookie, err := r.Cookie("User")

  if (err == nil){

    //fmt.Println(userCookie.Value)

    for _, item := range session.SessionStore{

       if (userCookie.Value == item.Id){
           orCoupon.UsedCoupon = item.OrDisFlag
           break
        }
        
     }

  } else {
    fmt.Println(err) 
  }

  w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
  w.Header().Set("Allow", "GET, POST, HEAD, OPTIONS")
  w.Header().Set("Content-Type", "application/json")
  w.Header().Set("Access-Control-Allow-Credentials", "true");
  w.Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")


  json.NewEncoder(w).Encode(orCoupon)
  
}



// this functions listens for the orange discount flag
func handleDiscount(w http.ResponseWriter, r *http.Request){
  
  //fmt.Println(r.Cookie("name"))
  var indata = cart.Discount{}
  json.NewDecoder(r.Body).Decode(&indata)

  userCookie, err := r.Cookie("User")

  if (err == nil){
    //fmt.Println(userCookie.Value)
  
    curSession = session.LookUpSesStore(userCookie.Value)
    curSession.OrDisFlag = true

    if len(curSession.Id) > 0 {
      
      refreshedCart = cart.SetOranDiscount(curSession.Cart)
      curSession.Cart = refreshedCart

      for index, item := range session.SessionStore{

         if (curSession.Id == item.Id){
           session.SessionStore[index] = curSession
         }
       }

    } /*else {
      curSession.Id = userCookie.Value
     // session.Cart = []model.Cart{}
      curSession.Cart = cart.SetOranDiscount(curSession.Cart)
      session.SessionStore = append(session.SessionStore, curSession)
    }*/

    

  } else {
    fmt.Println(err) 
  }
  
  //fmt.Println(indata)
  w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
  w.Header().Set("Allow", "GET, POST, HEAD, OPTIONS")
  w.Header().Set("Content-Type", "application/json")
  w.Header().Set("Access-Control-Allow-Credentials", "true");
  w.Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")


  json.NewEncoder(w).Encode(curSession.Cart)
  

}


func register(w http.ResponseWriter, r *http.Request){
   
  //username := databases.ReadFromDB()
  //fmt.Fprintf(w, username.FirstName + " " + username.LastName)
  var regSuccess = "success"
  var indata = model.UserInfo{}
  json.NewDecoder(r.Body).Decode(&indata)

  fmt.Println(indata)
  
  for _, item := range model.User {
    //check to see if username already exists
    if(strings.ToLower(indata.UserName) == strings.ToLower(item.UserName)) {
      
      regSuccess = "failed"
      break 
    } 

  }

  if regSuccess == "success"{
    model.User = append(model.User,indata)
  }


  fmt.Println(model.User)
  
  regResult := RegisterResult{Register:regSuccess}
  w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
  w.Header().Set("Allow", "GET, POST, HEAD, OPTIONS")
  w.Header().Set("Content-Type", "application/json")
  w.Header().Set("Access-Control-Allow-Credentials", "true");
  w.Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")


  json.NewEncoder(w).Encode(regResult)

}



func pay(w http.ResponseWriter, r *http.Request){
   
    //receive the payment info from client
    var valid bool
    var CurOrder = model.Order{}

    var indata = PayInfo{}
    json.NewDecoder(r.Body).Decode(&indata)
    fmt.Println(indata)

    userCookie, err := r.Cookie("User")

    if (err == nil){
        fmt.Println("payment validation")
      
        //curSession := session.LookUpSesStore(userCookie.Value)
        curCart := session.GetCartById(userCookie.Value)
           
        fmt.Println(curCart)

        var payDetails = model.Payment{} 
        payDetails.Card = indata.Card
        payDetails.CardNr = indata.CardNr
        payDetails.Total = cart.GetTotal(curCart)

        fmt.Println(payDetails.Total)


        //validate the payment through the mock gateway route.
        valid = payment.HandlePayment(payDetails) //returns true or false

        //if valid is true i.e payment is valid, order is created
        if (valid) {
           
           CurOrder.User = userCookie.Value
           CurOrder.Total = payDetails.Total
           CurOrder.PayType = payDetails.Card
           CurOrder.Valid = valid
           //mock orderid is created by joining some info from payment
           CurOrder.OrderId = CurOrder.User+ CurOrder.PayType+ fmt.Sprintf("%f", CurOrder.Total)
        }


        //fmt.Println(valid)
    } else {
        fmt.Println(err)
    }
    
    //payResult := PayConfirm{Success:valid}
    w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
    w.Header().Set("Allow", "GET, POST, HEAD, OPTIONS")
    w.Header().Set("Content-Type", "application/json")
    w.Header().Set("Access-Control-Allow-Credentials", "true");
    w.Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")


    // send the payment result (bool) back to client
    json.NewEncoder(w).Encode(CurOrder)

}



func delete(w http.ResponseWriter, r *http.Request){
  
  //fmt.Println(r.Cookie("name"))
  var indata = DeleteItem{}
  json.NewDecoder(r.Body).Decode(&indata)
  fmt.Println(indata)

  userCookie, err := r.Cookie("User")

  // using cookies for separate sessions
  if (err == nil){
    //fmt.Println(userCookie.Value)

    
       
    curSession = session.LookUpSesStore(userCookie.Value)

    if len(curSession.Id) > 0 {
      
      //fmt.Println(curSession.Cart)

      refreshedCart = cart.DeleteItem(indata.ItemNr, curSession.Cart, curSession.Id )
      curSession.Cart = refreshedCart
      
      for index, item := range session.SessionStore{

         if (curSession.Id == item.Id){
           session.SessionStore[index] = curSession
         }
       }

    } /*else {
      curSession.Id = userCookie.Value
     // session.Cart = []model.Cart{}
      curSession.Cart = cart.DeleteItem(indata.ItemNr, curSession.Cart)
      session.SessionStore = append(session.SessionStore, curSession)
    }*/

    //session.SessionStore = append(session.SessionStore, curSession)   
          
   // fmt.Println(session.SessionStore)
   // fmt.Println(curSession.Cart)

  } else {
    fmt.Println(err) 
  }

   //refreshedCart = cart.DeleteItem(indata.ItemNr)

    w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
    w.Header().Set("Allow", "GET, POST, HEAD, OPTIONS")
    w.Header().Set("Content-Type", "application/json")
    w.Header().Set("Access-Control-Allow-Credentials", "true");
    w.Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")


    json.NewEncoder(w).Encode(curSession.Cart)
}





func login(w http.ResponseWriter, r *http.Request){

  //fmt.Println(r.Cookie("name"))
  
  var loginSuccess string
  var indata = model.UserInfo{}
  json.NewDecoder(r.Body).Decode(&indata)

  //fmt.Println(indata)
  
  for _, item := range model.User {
    if(indata.UserName == item.UserName) && (indata.Password == item.Password){
      //user is registered
      loginSuccess = "success"

      // every time a user has logged in we create a cookie

      userCookie := http.Cookie{
        Name: "User",
        Value: indata.UserName,
        MaxAge: 7200,
      }
      http.SetCookie(w, &userCookie)

      break 
    } else {
      loginSuccess = "failed"
    }

  }
  
  loginResult := LoginResult{Login:loginSuccess}
  w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
  w.Header().Set("Allow", "GET, POST, HEAD, OPTIONS")
  w.Header().Set("Content-Type", "application/json")
  w.Header().Set("Access-Control-Allow-Credentials", "true");
  w.Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")


  json.NewEncoder(w).Encode(loginResult)
  
}




func handlecart(w http.ResponseWriter, r *http.Request){
  
  fmt.Println("entered handle cart")

  var indata = cart.FruitSelected{}
  json.NewDecoder(r.Body).Decode(&indata)
  
  //fmt.Println(indata)

  // retreive the cookie info from the client request
  userCookie, err := r.Cookie("User")

  if (err == nil){
    //fmt.Println(userCookie.Value)

    
       
    curSession = session.LookUpSesStore(userCookie.Value)

    // enabling the pear banana set creation ability on all session, to start with
    
    
    if len(curSession.Id) > 0 {
      
      fmt.Println("session exists")
      fmt.Println(curSession.Cart)
      refreshedCart = cart.CreateCartItem(indata, curSession.Cart, curSession.Id )
      curSession.Cart = refreshedCart
       for index, item := range session.SessionStore{

         if (curSession.Id == item.Id){
           session.SessionStore[index] = curSession
         }
       }

    } else {
      fmt.Println("session does not exists. creating new")
      curSession.Id = userCookie.Value
     // session.Cart = []model.Cart{}
      refreshedCart = cart.CreateCartItem(indata, curSession.Cart, curSession.Id )
      curSession.Cart = refreshedCart
      //curSession.PeBaFlag = true
      session.SessionStore = append(session.SessionStore, curSession)
      
    }


  } else {
    fmt.Println(err) 
  }

  fmt.Println("exiting handle cart")
  fmt.Println(curSession.Cart)
  fmt.Println(session.SessionStore)


  w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
  w.Header().Set("Allow", "GET, POST, HEAD, OPTIONS")
  w.Header().Set("Content-Type", "application/json")
  w.Header().Set("Access-Control-Allow-Credentials", "true");
  w.Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")


  json.NewEncoder(w).Encode(curSession.Cart)
  

  
}



func getCart(w http.ResponseWriter, r *http.Request){
   
  w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
  w.Header().Set("Allow", "GET, POST, HEAD, OPTIONS")
  w.Header().Set("Content-Type", "application/json")
  w.Header().Set("Access-Control-Allow-Credentials", "true");
  w.Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")


  json.NewEncoder(w).Encode(refreshedCart)
  
}





func changeQty(w http.ResponseWriter, r *http.Request){
  
  
  var indata = cart.FruitSelected{}
  json.NewDecoder(r.Body).Decode(&indata)

 
 // using cookies for separate sessions
  userCookie, err := r.Cookie("User")

  if (err == nil){
    //fmt.Println(userCookie.Value)
   
       
    curSession = session.LookUpSesStore(userCookie.Value)

    if len(curSession.Id) > 0 {
      //fmt.Println("found")
      
     
      curSession.Cart = cart.ChangeQuantity(indata.Name, indata.Quantity, curSession.Cart, curSession.Id )
      
      
       for index, item := range session.SessionStore{

         if (curSession.Id == item.Id){
           session.SessionStore[index] = curSession
         }
       }

    } /*else {
      curSession.Id = userCookie.Value
     // session.Cart = []model.Cart{}
      curSession.Cart = cart.ChangeQuantity(indata.Name, indata.Quantity, curSession.Cart, curSession.Id) 
      session.SessionStore = append(session.SessionStore, curSession)
    }*/

    //session.SessionStore = append(session.SessionStore, curSession)   
          
    //fmt.Println(session.SessionStore)
    //fmt.Println(curSession.Cart)

  } else {
    fmt.Println(err) 
  }
  
  fmt.Println(curSession.Cart)

  w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
  w.Header().Set("Allow", "GET, POST, HEAD, OPTIONS")
  w.Header().Set("Content-Type", "application/json")
  w.Header().Set("Access-Control-Allow-Credentials", "true");
  w.Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")


  json.NewEncoder(w).Encode(curSession.Cart)
  
}
