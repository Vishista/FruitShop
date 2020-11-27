By default Firefox and edge removes the session cookies on closing. However chrome does not

There are three cookies created and used after every successful login.

One cookie created on the server side for multi user session handling. it has expiry time of 7200 (around 2 hrs)

Two session cookies created on the client side just for client side handling. The expiry for these cookies are not set, so these 2 cookies are session cookies and are deleted by firefox and edge upon closing the browser.

Therefore its best when chrome is used for running this application

 
Info about the code

Start the backend golang server by running startmain.go . The golang server runs on port 8009

The react frontend files are present inside the folder frontend. React server runs on port 3000

At the front end, as soon as App.js is loaded it makes a get request to the backend and the list of 4 fruits are fetched and displayed

Cart creation, adding fruits to cart, deleting, adjusting the quantity , discount calculation, order creation etc are handled at the backend


As soon as the backend server starts, 4 fruits and 3 users are loaded in the memory. 

The users are -

1. username - vishista   password - 123
2. username - vikky       password - 123
3. username - vibhas     password - 123

New users can be added through register. I was given the option of using in memory 
data stores, therefore I have used golang structs for them, however a handle
is present for reading from and writing to mongodb

There are some files in the front end like apple.js, banana.js, pears.js
that are not used anymore, however I have not deleted them as it will require
recompiling and retesting and will take more time 

The react frontend communicates with the controller package of the golang backend.
handlerequest.go contains the implementations for handling the incoming request from
the client


