# ShopifyApplication
Alex Jiang's Shopify Application

To start the application:
1. Clone the repository via: git clone git@github.com:azj210/ShopifyApplication.git
2. cd into the root directory via: cd shopifyapplication
3. Add a .env file (called .env) with these contents:

  REACT_APP_PORT=3306

  REACT_APP_HOST=us-cdbr-east-03.cleardb.com

  REACT_APP_USER=b0431775088fd2

  REACT_APP_PASSWORD=da0d61f5

  REACT_APP_DATABASE=heroku_6f9427d0f751292

  REACT_APP_CONNECTION_LIMIT=10

  PORT=4000

  SKIP_PREFLIGHT_CHECK=true

3. Install necessary packages in the root directory via: npm install
4. Open another tab
5. Install necessary packages for the frontend via:
   - cd into client: cd client
   - install necessary packages in client directory: npm install
   - start frontend via: npm start
   - access the app on http://localhost:3000/
6. Start up the server in the previous tab (which should be on the root directory) via: npm start

Instructions for the Application:
1. First register account. Your username and password both must be at least 5 characters long. You will then be directed to the login page or you can directly go to the login page from the homepage. Note, you can not take a username that has already been taken and your password will be salt and hashed.
2. Login with your credentials.
3. Under "Send an Image to the Repository" you can send an image to your repository by adding a file name, file description, the file itself, and clicking "Send Image". The file itself and file name are mandatory but the description is optional. Duplicate file names (both the name of the file and file path itself) are not allowed so if someone else already took the name, you will have to submit with a different name. Respective error messages will pop up through alerts if this happens.
4. You can search and display images under "Search for Image(s) in the repository". You can search for anyone's images including from other users' repository. You can search for just a single image by entering the file name in the "Search and Display" text field and selecting "Search By File Name" from the dropdown or you can search for 1 or more images with the same description by entering the file description in the "Search and Display" text box and selecting "Search By File Description" from the dropdown. Make sure to click "Send Search Request" to send your search request.
5. You can delete images from your repository under "Delete an Image From Your Repository". Enter your file name in the text box then click "Delete Image". Note, you can only delete images in your own repository so while you can search for other users' images, you can not delete theirs. 
6. To logout of your account click the "Logout" button.

**Example work flow**: I login then add an image. I give the image a name of "myTestImage" and description of "t". I then click send image. Afterwards I make sure "Search By File Name" is in the dropdown and enter "myTestImage" in the search and display field, then click send search request. That image should now appear. I then change "Search By File Name" to "Search By File Description". I enter "t" in the search and display field and click send search request. Since the new file has the description "t" and I previously used another account to add 3 other images with description "t", 4 images (1 happy dog, 1 angry dog, 1 snippet of the MacOS Mojave background, and the new image) should appear. I can then try deleting the happy dog image who's name is "tester", but I would not be able to do so because another account added that image. What I can do is then type "myTestImage" into the delete field and delete it by clicking delete image. Now if I search for files with description "t", only the previous 3 images should show up.

**Unit tests** Continuous Integration environment is in Travis CI: https://travis-ci.com/github/azj210/ShopifyApplication
You can trigger builds on there. 

**API Acceptance tests** were just run locally. To run those follow these steps:
1. If the server is running first stop it by going to the tab it is running at and clicking ctrl + c
2. Run the API acceptance tests from the root directory via: jest server.test.js

**Layout of the filesystem** is as follows:
The server file is located in the root directory and the API Acceptance tests are located in server.test.js.
The APIs are located in backend/api
The React Components are located in client/src/components
I wrote unit tests for 2 of the components(Account.test.js and Login.test.js). One of which is the login component and the other of which is the account component which is the component that renders the actual image repository page for your account.
