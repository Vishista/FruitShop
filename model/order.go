package model


type Order struct {

	OrderId    string `bson:"OrderId" json:"OrderId"`
	User       string `bson:"User" json:"User"`
	Total      float64    `bson:"Total" json:"Total"`
	PayType    string    `bson:"PayType" json:"PayType"`
	Valid      bool    `bson:"Valid" json:"Valid"`
	
}