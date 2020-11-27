package model


type UserInfo struct {

	UserName  string `bson:"UserName" json:"UserName"`
	Password   string `bson:"Password" json:"Password"`
}


var User []UserInfo

func CreateUser(){
	User = []UserInfo{
            UserInfo{UserName: "vikky", Password: "123"},
            UserInfo{UserName: "vibhas", Password: "123"},
            UserInfo{UserName: "vishista", Password: "123"},
        
      }
}