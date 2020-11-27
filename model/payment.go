package model


type Payment struct{
   Card string `json:"Card"`
   CardNr string `json:"CardNr"`
   Total float64 `json:"Total"`

}