# btp_ecommerce

UI of the Chem Ecommerce Website

Here is the Login page 

![btp_pt1](https://github.com/sahilkgpian/btp_ecommerce/assets/137074146/89db7889-d3b3-407e-8f71-90d49b5443c5)

Below is the homepage of the website.All the products,their description are displayed.

![btp_pt2](https://github.com/sahilkgpian/btp_ecommerce/assets/137074146/306bbd48-5063-4086-af31-27fc05f3526d)

 Here,Mongoose is connected to MongoDB database specified by the MONGODB_URI. Upon successful connection, it starts the application listening on port 3000

![btp3](https://github.com/sahilkgpian/btp_ecommerce/assets/137074146/4d91e459-72a5-4919-83ce-b5c8b1d8de9e)

This code sets up a session middleware using Express.js and MongoDB for session storage.It first imports the express-session package, which provides session middleware for Express.js.Then we import the connect-mongodb-session package and initializes it with the express-session middleware. This allows the session data to be stored in a MongoDB database.Then we create a new instance of the MongoDB session store, specifying the MongoDB connection URI 

![btp4](https://github.com/sahilkgpian/btp_ecommerce/assets/137074146/9296c399-b3d8-4b3f-a974-2f3001c91103)

Then we configure the session middleware for Express.js We define a middleware function that checks if a user is authenticated based on the session data. If the req.session.user property exists (indicating that a user is logged in), it retrieves the user's data from the database using User.findById() and assigns it to req.user.

![btp5](https://github.com/sahilkgpian/btp_ecommerce/assets/137074146/e999f123-7010-4e90-9da0-43b80ae559fd)

It extracts the email and password from the request body submitted by the user.It searches for a user in the database with the provided email using User.findOne({ email: email }).If no user is found, it redirects the user back to the login page.)If a user with the provided email is found, it uses bcrypt.compare() to compare the provided password with the hashed password stored in the database.If the passwords match, it sets the isLoggedIn flag and stores the user object in the session (req.session.isLoggedIn = true; req.session.user = user;).
It saves the session using req.session.save() to ensure that the session data is stored in the session store.
Finally, it redirects the user to the homepage

![btp7](https://github.com/sahilkgpian/btp_ecommerce/assets/137074146/96d7e94e-1df9-4ea9-8331-298a58895cc0)

This code sets up Multer to handle file uploads, ensures that only images with specific MIME types are accepted, and serves uploaded images statically to clients.

![btp8](https://github.com/sahilkgpian/btp_ecommerce/assets/137074146/23528c0d-6f7e-45a9-bdc5-612c02e7fee0)

This code snippet defines a Mongoose schema for products and exports it as a model named 'Product'. Here's what it does:Schema Definition:It defines a schema for products using mongoose.Schema.The schema includes fields such as title, price, description, imageUrl, and userId.Model Export:The schema is exported as a Mongoose model named 'Product' using mongoose.model('Product', productSchema).

![btp10](https://github.com/sahilkgpian/btp_ecommerce/assets/137074146/d602116b-176c-4bb2-977d-c9029c9f6b51)

This function handles the creation of new products.It extracts product information such as title, price, description, and image from the request body.It creates a new product instance using the Product model with the extracted information.It saves the newly created product to the database.If successful, it redirects the user to the admin products page; otherwise, it logs any errors.

![btp11](https://github.com/sahilkgpian/btp_ecommerce/assets/137074146/49bd5e66-e2e1-48b7-9a4d-935504ebc86a)

It retrieves the product ID, updated title, price, description, and image from the request body.It finds the product by ID and updates and saves in database.

![btp12](https://github.com/sahilkgpian/btp_ecommerce/assets/137074146/5c15cdde-991d-4500-981e-cc15ca74fc00)

This code defines a Mongoose schema for users and extends it with methods to manipulate the user's shopping cart.

![btp13](https://github.com/sahilkgpian/btp_ecommerce/assets/137074146/9b5d8be1-4ba9-44c8-9bbf-86d5f37aeefe)

This method adds a product to the user's cart.It checks if the product already exists in the cart based on its productId.If the product exists, it increases its quantity by one; otherwise, it adds the product to the cart with a quantity of one.It then updates the user's cart and saves the changes to the database.


![btp14](https://github.com/sahilkgpian/btp_ecommerce/assets/137074146/d1a9d540-201a-4bc3-b9d7-5bbaf4a006ab)

This method removes a product from the user's cart based on its productId.It filters out the item with the specified productId from the cart items array.It updates the user's cart and saves the changes to the database.

![btp15](https://github.com/sahilkgpian/btp_ecommerce/assets/137074146/36d71cd6-5449-46ff-98a5-c8bf0acea92f)

![btp16](https://github.com/sahilkgpian/btp_ecommerce/assets/137074146/2b3f61e6-f668-4ddb-a2e5-9b7b34fb6aed)
![btp17](https://github.com/sahilkgpian/btp_ecommerce/assets/137074146/b80a1b06-da58-4106-9c64-3339e537402b)
![btp18](https://github.com/sahilkgpian/btp_ecommerce/assets/137074146/261ea601-61e8-427b-90de-56aaf18b1d42)
