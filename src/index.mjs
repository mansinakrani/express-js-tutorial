import express from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import { mockUsers } from "./utils/constants.mjs";

const app = express();

// register middleware
app.use(express.json());
// app.use(cookieParser());
app.use(cookieParser("helloworld"));
app.use(session({ secret: 'qwerty09876', saveUninitialized: false, resave: false, cookie: { maxAge: 60000 * 60 } })); //call right before registering any endpoints , saveUninitialized: false => when we don't want to save unmodified session data to session storage
app.use(routes);


//middleware - must be register before route
// const loggingMiddleware = (request, response, next) => {
// 	console.log(`${request.method} - ${request.url}`);
// 	next();
// }

const PORT = process.env.PORT || 3000;

app.get('/', (request, response) => {
  console.log(request.session);
  console.log(request.session.id);
  request.session.visited = true;
	response.cookie("hello","world", { maxAge: 30000, signed: true }); //60000 ms = 1 min, 1hr = 60000 * 60,2hr = 60000 * 60 * 2
  // If we are using signed: true then we must provide secret , otherwise we will get Error: cookieParser("secret") required for signed cookies
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

app.post('/api/auth', (request, response) => {
  const { body: { username, password } } = request;
  const findUser = mockUsers.find((user) => user.username === username);
  if (!findUser || findUser.password !== password) return response.status(401).send({ msg: 'BAD CREDENTIALS' });

  request.session.user = findUser;
  return response.status(200).send(findUser);
});

app.get('/api/auth/status', (request, response) => {
  request.sessionStore.get(request.sessionID, (err, session) => {
    console.log(session);
  });
  return request.session.user ? response.status(200).send(request.session.user) : response.status(401).send({ msg: "Not Authenticated" })
});

app.post("/api/cart", (request, response) => {
  if (!request.session.user) return response.sendStatus(401);
  const { body: item } = request;
  const { cart } = request.session;
  if (cart) {
    cart.push(item);
  } else {
    request.session.cart = [item];
  }
  return response.status(201).send(item);
})

app.get("/api/cart", (request, response) => {
  if (!request.session.user) return response.sendStatus(401);
  return response.send(request.session.cart ?? [])
})