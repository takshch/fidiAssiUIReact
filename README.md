Setup:

1. Make a folder with AnyName and go to that folder by CD command.
2. git clone https://github.com/takshch/fidisysAssiAPI.git
3. cd fidisysAssiAPI
4. npm install To run in local, change CONNECTION_URL, DATABASE_NAME , COLLECTION with your mongodb url. (app.js)

Use "node app.js" to run and url will be localhost:5000
-------------------------------------------------------------------------
API ENDPOINTS:

1. "/items" -- to fetch all items
2. "/add" -- to add new item
3. "/update" -- to edit price of item with id
4. "/delete" -- to delete item
