package cart

import (
      "fmt"
	    "model"
	    "strings"
      "math"
      "session"
)



//var cart []model.Cart

var cartItem model.Cart
var discount float64
var discountedPrice float64
//var createPBSet = true
var orangeDiscount bool

type FruitSelected struct{
  Name  string `json:"Name"`
  Price  float64 `json:"Price"`
  Quantity  int `json:"Quantity"`

}


type Discount struct {
  OrDiscount  bool `bson:"OrDiscount" json:"OrDiscount"`
  
}

func SetOranDiscount(cart []model.Cart) []model.Cart{
    
   
    for index, item := range cart {
       

       //calculate orange discount
       if strings.ToLower(item.Product) == "orange"{
         
        // if(orangeDiscount){
          //  discount = float64(30) 
            // applying 30% discount (1-0.3 = 0.7)
           // discountedPrice = item.Price*float64(item.Quantity)*float64(0.7)
            cart[index].Discount = float64(30)
            cart[index].DiscountedPrice = item.Price*float64(item.Quantity)*float64(0.7)
         //  }
       }

    }
    //discount = 0.0
    //discountedPrice = 0.0
    return cart
}




func CreateCartItem(fruit FruitSelected, cart []model.Cart, id string) []model.Cart{
    
    fmt.Println("entered create cart item")
    //cart := [10]model.Cart

    
   // var cartItem model.Cart
   // discount = 0.0
   // discountedPrice = fruit.Price*float64(fruit.Quantity)
    fruitName := strings.ToLower(fruit.Name)
    createNewItem := true
  
     
    for index, item := range cart {

      if fruitName == strings.ToLower(item.Product){
      // fruit name exists. Do not create a new item. just add to existing quantity
          fmt.Println("item exist")          
          cart[index].Quantity= cart[index].Quantity + fruit.Quantity
          cart[index].DiscountedPrice = float64(cart[index].Quantity)*cart[index].Price

          createNewItem = false
          
      } 

    }

    
    // create new item
    if (createNewItem) {
        
        fmt.Println("creating new item")
        cartItem.Product = fruit.Name
        cartItem.Quantity = fruit.Quantity
        cartItem.Price = fruit.Price
        
        cartItem.Discount = 0.0
        cartItem.DiscountedPrice = fruit.Price*float64(fruit.Quantity)

        cart = append(cart, cartItem)
        
  }
   
    
    return calculateDiscount(cart, id)
    //fmt.Println(len(cart))
    //return cart
 }



 func calculateDiscount(cart []model.Cart, id string) []model.Cart{
    fmt.Println("entering discount calculation") 
   
    //discount = 0
    var pearsNewSet bool
    var bananaNewSet bool
    var pearsUnitPrice float64
    var bananaUnitPrice float64
    var bananaIndex int
    var pearsIndex int
    var pearBananaIndex int 
  //var position int

    for index, item := range cart {
       

       //calculate orange discount
       fmt.Println("going to calculate orange discount")
       if strings.ToLower(item.Product) == "orange"{
         
         // find the position of current session in session store         
         for index, item := range session.SessionStore {
       
           if item.Id == id{
                        
             orangeDiscount = session.SessionStore[index].OrDisFlag
             fmt.Println(orangeDiscount)
             fmt.Println("from disc")
             fmt.Println(session.SessionStore)
             fmt.Println("pos")
             fmt.Println(index)
             break

           }
         }
        
         if(orangeDiscount){
            orangeDiscount = false
            //discount = float64(30) 
            // applying 30% discount (1-0.3 = 0.7)
            //discountedPrice = item.Price*float64(item.Quantity)*float64(0.7)
            cart[index].Discount = float64(30)
            cart[index].DiscountedPrice = item.Price*float64(item.Quantity)*float64(0.7)
           } else {
            cart[index].Discount = 0
            cart[index].DiscountedPrice = cart[index].Price*float64(cart[index].Quantity)
           }
       }


       // calcuate apple discount
       if strings.ToLower(item.Product) == "apple" {
          
          if item.Quantity >= 7{

            //discount = float64(30) 
            // applying 30% discount (1-0.3 = 0.7)
            // discountedPrice = item.Price*float64(item.Quantity)*float64(0.7)
            cart[index].Discount = float64(30)
            cart[index].DiscountedPrice = item.Price*float64(item.Quantity)*float64(0.7)
        } else {
            cart[index].Discount = 0
            cart[index].DiscountedPrice = cart[index].Price*float64(cart[index].Quantity)
        }
       }


       //genarate news set and calculate the discount for 4 pears and 2 banana set
       //check for pears item
       if strings.ToLower(item.Product) == "pears"  {
          pearsIndex = index
          if item.Quantity > 3 {
              pearsNewSet = true
              pearsUnitPrice = item.Price
             // peersQuantity = item.Quantity
              
          }
       }


        //check for banana item
        if strings.ToLower(item.Product) == "banana" {
          bananaIndex = index
          if item.Quantity > 1 {
              bananaNewSet = true
              bananaUnitPrice = item.Price
              //bananaQuantity = item.Quantity
              
          } 

        }
      }
                  
         

      if (pearsNewSet) && (bananaNewSet){
        //fmt.Println(bananaUnitPrice,pearsUnitPrice,pearsIndex,bananaIndex)
          // we have a new set. create a new item
           for cart[pearsIndex].Quantity > 3 && cart[bananaIndex].Quantity > 1{
        //    for cart[bananaIndex].Quantity > 1 && cart[pearsIndex].Quantity > 3{
             
             fmt.Println("creating pear banana set")

             //var pos = session.GetIndexFromId(id)
             //createPBSet = SessionStore[pos].PeBaFlag
             var setExists bool
             for _, item := range cart{
                 
               if (strings.ToLower(item.Product) == "pearsbananaset") {
                  setExists = true
               }
             }

             if (setExists != true){
                cartItem.Product = "pearsbananaset"
                cartItem.Quantity = 1
                cartItem.Price = (pearsUnitPrice*float64(4)) + (bananaUnitPrice*float64(2))
                
                cartItem.Discount = 30
                cartItem.DiscountedPrice = cartItem.Price*float64(0.7)
               // pbSetFPrice = cartItem.DiscountedPrice

                fmt.Println("adding peer banana set to cart")
                cart = append(cart, cartItem)
               // pearBananaIndex = len(cart)-1
              
               // session.SessionStore[pos].PeBaFlag = false
                //fmt.Println(pos)
                fmt.Println(session.SessionStore)
               // createPBSet = false
              } else {
                 for index, item := range cart {

       
                    if strings.ToLower(item.Product) == "pearsbananaset" {
                      pearBananaIndex = index
                    }
                 }
                 cart[pearBananaIndex].Quantity = cart[pearBananaIndex].Quantity + 1
                 cart[pearBananaIndex].DiscountedPrice = float64(cart[pearBananaIndex].Quantity)*cart[pearBananaIndex].Price*float64(0.7)
              }

            cart[bananaIndex].Quantity = cart[bananaIndex].Quantity - 2
            cart[bananaIndex].DiscountedPrice = float64(cart[bananaIndex].Quantity)*cart[bananaIndex].Price
            cart[pearsIndex].Quantity = cart[pearsIndex].Quantity - 4
            cart[pearsIndex].DiscountedPrice = float64(cart[pearsIndex].Quantity)*cart[pearsIndex].Price
      
          } 

          pearsNewSet = false
          bananaNewSet = false
          
        } /*else {
          cart[pearBananaIndex].Quantity = 0
          cart[pearBananaIndex].DiscountedPrice = float64(cart[pearBananaIndex].Quantity)*cart[pearBananaIndex].Price*float64(0.7)
              
        }*/
       
            //  createPBSet = false

        return cart
  }


  // get cart total
  func GetTotal(cart []model.Cart) float64{
    
    var total float64
    total = 0
    for _, item := range cart {
      total = total + item.DiscountedPrice
    }
     
     total = (math.Floor(total*100)/100)
     return total
  }


  func DeleteItem(index int, cart []model.Cart, id string) []model.Cart {
         
    
   /* if strings.ToLower(cart[index].Product) == "pearsbananaset"{
      
      // a new pearsbananaset can be created in future
      //only if this flag is true 
     // createPBSet = true
     var pos = session.GetIndexFromId(id)
     //createPBSet = SessionStore[pos].PeBaFlag
           
     session.SessionStore[pos].PeBaFlag = true
    } */

    fmt.Println(cart)
    for key, _ := range cart {
      if key < len(cart) -1 && key >= index {
        cart[key] = cart[key+1]
      }
    }
     
       
    cart = cart[0:len(cart)-1]
    fmt.Println(cart)
    return cart
  }



  func ChangeQuantity(name string, Qty int, cart []model.Cart, id string) []model.Cart{
    
         
    if(strings.ToLower(name) != "pearsbananaset"){

        for index, item := range cart{
                 
            if (strings.ToLower(name) == strings.ToLower(item.Product)) {
              cart[index].Quantity = Qty
              cart[index].DiscountedPrice = cart[index].Price*float64(Qty)
             // return calculateDiscount(cart,id)
            }
          
        }
          
    } else {

        for index, item := range cart{
        
            if (strings.ToLower(name) == strings.ToLower(item.Product)) {
              cart[index].Quantity = Qty
              cart[index].DiscountedPrice = cart[index].Price*float64(Qty)*float64(0.7)
             // return calculateDiscount(cart,id)
            }
          
         }

      }

      
    return calculateDiscount(cart,id)
    //return cart
  }