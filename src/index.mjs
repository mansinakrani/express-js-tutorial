import express from "express";
import routes from "./routes/index.mjs";
// import productsRouter from "./routes/products.mjs"

const app = express();

// register middleware
app.use(express.json());
app.use(routes);
// app.use(productsRouter);


//middleware - must be register before route
// const loggingMiddleware = (request, response, next) => {
// 	console.log(`${request.method} - ${request.url}`);
// 	next();
// }

const PORT = process.env.PORT || 3000;

app.get('/', 
(request, response, next) => {
	console.log('BASE URL');
	next(); //call next middleware function in sequence
}, 
(request, response) => {
  // response.send("Hello, World!");
  response.status(201).send({ msg: "Hello!" })
});

// app.use(loggingMiddleware);
// app.use(loggingMiddleware, (request, response, next) => {
// 	console.log('Finished Logging...');
// 	next(); 
// });

app.listen(PORT, () =>  {
  console.log(`Runnning on port ${PORT}`);
});