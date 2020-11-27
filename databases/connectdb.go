package databases

import (
  "context"
  "log"
  "time"
  "fmt"
  "model"
  "go.mongodb.org/mongo-driver/bson"
  "go.mongodb.org/mongo-driver/mongo"
  "go.mongodb.org/mongo-driver/mongo/options"
    
)
var client *mongo.Client
var clienterr error
type datafromdb struct{
  UserName string
  PassWord string
}

func ConnectToDB() {
    client, clienterr = mongo.NewClient(options.Client().ApplyURI("mongodb://localhost:27017/"))
    if clienterr != nil {
        log.Fatal(clienterr)
    }
    ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
    err := client.Connect(ctx)
    if err != nil {
            log.Fatal(err)
    }
    //defer client.Disconnect(ctx)
   // InsertToDB(client)
    //ReadFromDB(client)
    
  }

  func InsertToDB(client *mongo.Client) {
     collection := client.Database("new").Collection("test")
     record, err := collection.InsertOne(context.Background(), bson.M{"name": "vibhas"})
     if err != nil {
       log.Fatal(err)
     }
     fmt.Println(record)        

  }

  func GetClient() *mongo.Client{
    return client
    
  }

  
  func StoreUser(UserName string, Password string){
    client := GetClient()
    collection := client.Database("User").Collection("UserDetails")
    data := model.UserInfo{UserName: UserName, Password:Password}
    record, err := collection.InsertOne(context.Background(),data)
    if err != nil {
       log.Fatal(err)
     }
     fmt.Println(record) 

  }

  func ReadFromDB() *model.UserInfo {
     //var result []model.UserInfo
     //var datastruct datafromdb
     var name *model.UserInfo
     client := GetClient()
     collection := client.Database("User").Collection("UserDetails")
     cursor, err := collection.Find(context.Background(), bson.D{})
    // err := collection.Find(bson.M{}).All(&result)
     if err != nil {
       log.Fatal(err)
     }

     
     for cursor.Next(context.Background()) {
  
       //var result bson.M
       var result model.UserInfo
       err := cursor.Decode(&result)
       if err != nil { 
         log.Fatal(err) }
        
       
      // bsonBytes, _ := bson.Marshal(result)
      // bson.Unmarshal(bsonBytes, &datastruct)

       //name := result[1]
       name = &result
       fmt.Println(name) 
       //fmt.Println(datafromdb{FirstName:"vikky", LastName:"viks"}) 
         

     
       
     }
        //fmt.Println(fin("FirstName"))
        return name
      
     
  }
