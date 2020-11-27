package controller

import ("net/http")


func HandleUriRequest(){
    http.HandleFunc("/", home)
	http.HandleFunc("/search", search)
	http.HandleFunc("/login", login)
	http.HandleFunc("/register", register)
	http.HandleFunc("/pay", pay)
	http.HandleFunc("/handlecart", handlecart)
	http.HandleFunc("/getcart", getCart)
    http.HandleFunc("/changeQty", changeQty)
	// to remove item from cart
	http.HandleFunc("/delete", delete)

	// to handle orange discount
	http.HandleFunc("/handlediscount", handleDiscount)

	//to check if the coupon was used
	http.HandleFunc("/usedcouponcheck", usedCouponCheck)
}




