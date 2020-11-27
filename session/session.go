package session

import (
      "model"
      "strings"
      
)


type Session struct {

	Id    string `bson:"Id" json:"Id"`
	Cart  []model.Cart `bson:"Cart" json:"Cart"`
	OrDisFlag    bool `bson:"OrDisFlag" json:"OrDisFlag"`
	PeBaFlag    bool `bson:"PeBaFlag" json:"PeBaFlag"`
	
}


var SessionStore []Session


func GetIndexFromId(id string) int{

    for index, item := range SessionStore{
      
      if (id == item.Id){

      	return index
      }
    }
    return 0
}


func HasPearBananaSet(id string) bool{

    for _, item := range SessionStore{
      
      if (id == item.Id){
         
         for _, value := range item.Cart{

         	 if (strings.ToLower(value.Product) == "pearsbananaset"){

         	 	return true
             }

      	 }
       } 
    } 

    return false
}


func LookUpSesStore(user string) Session{

	// we look if a session is already stored for this user

    for _, item := range SessionStore{
      
      if item.Id == user{
        //a session is already stored, just retreive it
       
        return  item
      }

    } 
     
    return Session{}

}


func GetCartById(id string) []model.Cart {


    for _, item := range SessionStore{
      
      if item.Id == id{
         
        return item.Cart

      }

    }

    return []model.Cart{}

}