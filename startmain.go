package main


import (
	"net/http"
	"databases"
	"controller"
	"model"
)

func main(){
	//start the connection to DB
	//database.ConnectToDB()
	databases.ConnectToDB()
    
    //Create mapping for handling incoming http request
	controller.HandleUriRequest()

    // create intitial set of users for Login validation and session
	model.CreateUser()

    //start the server on specific port
	http.ListenAndServe(":8009",nil)
	
}

