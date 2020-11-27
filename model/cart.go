package model


type Cart struct {

	Product    string `bson:"Product" json:"Product"`
	Quantity   int `bson:"Quantity" json:"Quantity"`
	Price      float64    `bson:"Price" json:"Price"`
	Discount   float64    `bson:"Discount" json:"Discount"`
	DiscountedPrice float64 `bson:"DiscountedPrice" json:"DiscountedPrice"`
}
