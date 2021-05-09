# ShopifyApplication
Alex Jiang's Shopify Application

Frontend is deployed on netlify. Directly access the application from the client side at: https://alex-jiang-image-repository.netlify.app/
Instructions for the Application:
If a request hasn't been sent to the server in a set amount of time then your first request will take a few seconds to be processed as I am using the free tier for heroku which means that the server goes to sleep after a while of inactivity and takes a little time to start up again after being pinged. Nonetheless:
1. First register account. Your username and password both must be at least 5 characters long. You will then be directed to the login page or you can directly go to the login page from the homepage. Note, you can not take a username that has already been taken and your password is salt and hashed.
2. Login with your credentials.
3. Under "Send an Image to the Repository" you can send an image to your repository by adding a file name, file description, the file itself, and clicking "Send Image". The file itself and file name are mandatory but the description is optional. Duplicate file names (both the name of the file and file path itself) are not allowed so if someone else already took the name, you will have to submit with a different name. Respective error messages will pop up through alerts if this happens.
4. You can search and display images under "Search for Image(s) in the repository". You can search for anyone's images including from other users' repository. You can search for just a single image by entering the file name in the "Search and Display" text field and selecting "Search By File Name" from the dropdown or you can search for 1 or more images by the file description by entering the file description in the "Search and Display" text box and selecting "Search By File Description" from the dropdown. Make sure to click "Send Search Request" to send your search request.
5. You can delete images from your repository under "Delete an Image From Your Repository". Enter your file name in the text box then click "Delete Image". Note, you can only delete images in your repository so while you can search for other users' images, you can not delete theirs. 
6. To logout of your account click the "Logout" button.


Server is deployed on heroku. Can send api requests to: https://shopify-app-backend.herokuapp.com/api

Unit tests Continuous Integration environment is in Travis CI: https://travis-ci.com/github/azj210/ShopifyApplication
You can trigger builds on there. 

API Acceptance tests were just run locally. To run those follow these steps:
1. Clone the repository via: git clone git@github.com:azj210/ShopifyApplication.git
2. Add a .env file with these contents:
REACT_APP_PORT=3306
REACT_APP_HOST=us-cdbr-east-03.cleardb.com
REACT_APP_USER=b0431775088fd2
REACT_APP_PASSWORD=da0d61f5
REACT_APP_DATABASE=heroku_6f9427d0f751292
REACT_APP_CONNECTION_LIMIT=10
PORT=4000
SKIP_PREFLIGHT_CHECK=true
3. Install necessary packages in the root directory via: npm install
4. run the API acceptance tests from the root directory via: jest server.test.js

Layout of the filesystem is as follows:
The server file is located in the root directory and the API Acceptance tests are located in server.test.js.
The APIs are located in backend/api
The React Components are located in client/src/components
I wrote unit tests for 2 of the components(Account.test.js and Login.test.js). One of which is the login component and the other of which is the account component which is the component that renders the actual image repository page for your account.
