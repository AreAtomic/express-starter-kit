# Express Starter Kit

Starter kit for express with MongoDB. Initial config with:
* models
* services
  * database
  * response
  * validation
  * data
* api
  * middlewares
  * controllers
  * routes

> Tips : For faster development you can use [express-snippet](https://marketplace.visualstudio.com/items?itemName=Areatomic.express-snippet-areatomic)

### Command

`npm install` to install dependencies
`npm start` to start server with nodemon

### Config

You can edit the file `config/local.js` for local environement :
```Node
let localConfig = {
    port: 5000,
    mongoURI:
        'mongodb://localhost:27017/starter',
    jwtSecret: 'yourstrongsecrettokenmustbechanged',
}
```

### Help

###### Processus of development
1) Create a model `model/${name}.model.js` then export it in `model/index.js`
2) Create data services `services/data/${name}.js` then export it in `services/data/index.js`
3) Create validations `services/validation/${name}.js` then export it in `services/validation/index.js`
4) Create middlewares `api/middlewares/${name}.js` then exports it in `api/middlewares/index.js`
5) Create controllers `api/controllers/${name}.js` and use {nameServices} in the controller then export it in `api/controllers/index.js`
6) Create routes `api/routes/${name}.js` and use {nameControllers}, {nameMiddlewares} and authMiddlewares if needed, then export it in `routes/index.js`
7) Use routes in `api/index.js` with `router.use('/${name}', ${nameRoutes})`