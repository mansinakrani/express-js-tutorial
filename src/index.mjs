import express from "express";
import { query, validationResult , body, matchedData} from "express-validator";

const app = express();

// register middleware
app.use(express.json());

//middleware - must be register before route
const loggingMiddleware = (request, response, next) => {
	console.log(`${request.method} - ${request.url}`);
	next();
}

// app.use(loggingMiddleware);

const resolveIndexByUserId = (request, response, next) => {
	const { params: { id } } = request;
	const parsedId = parseInt(id);
	if (isNaN(parsedId)) return response.sendStatus(400);

	const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);

	if (findUserIndex === -1) return response.sendStatus(404);
	request.findUserIndex = findUserIndex;
	next();
}

const PORT = process.env.PORT || 3000;

const mockUsers = [
  { id:1, username: 'anson', displayName: 'Anson' },
  { id:2, username: 'jack', displayName: 'Jack' },
  { id:3, username: 'adam', displayName: 'Adam' },
  { id:4, username: "tina", displayName: "Tina" },
	{ id:5, username: "jason", displayName: "Jason" },
	{ id:6, username: "henry", displayName: "Henry" },
	{ id:7, username: "marilyn", displayName: "Marilyn" },
];

app.get('/', 
(request, response, next) => {
	console.log('BASE URL');
	next(); //call next middleware function in sequence
}, 
(request, response) => {
  // response.send("Hello, World!");
  response.status(201).send({ msg: "Hello!" })
});

app.get('/api/users', query('filter').isString().notEmpty().withMessage('Must not be empty').isLength({ min: 3, max: 10 }).withMessage('Must be at least 3-10 characters'), (request, response) => {
	// console.log(request['express-validator#contexts']);
	// response.send(mockUsers);
	const result = validationResult(request);
	console.log(result);
	const { query: { filter, value }, } = request;

	// when filter & value are undefined
	if (filter && value) return response.send(
		mockUsers.filter((user) => user[filter].includes(value))
	);
	return response.send(mockUsers);
});

// app.use(loggingMiddleware);
app.use(loggingMiddleware, (request, response, next) => {
	console.log('Finished Logging...');
	next(); 
});


app.post("/api/users",
 [
	body('username').notEmpty().withMessage('Username cannot be empty').isLength({ min: 5, max: 32 }).withMessage("Username must be at least 5 characters with a max of 32 characters").isString().withMessage("Username must be a string"),
	body("displayName").notEmpty(),
	],
	(request, response) => {
		const result = validationResult(request);
		console.log(result);
		// result.isEmpty() // return true if there are no errors, false otherwise
		if (!result.isEmpty())
			return response.status(400).send({ errors: result.array() });
		const data = matchedData(request);
		const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...data };
		mockUsers.push(newUser);
		return response.status(201).send(newUser);
 })

app.get("/api/users/:id", resolveIndexByUserId, (request, response) => {
	console.log(request.params);
	const { findUserIndex } = request;
	const findUser = mockUsers[findUserIndex];
	if (!findUser) return response.sendStatus(404);
	return response.send(findUser);
});

app.get("/api/products", (request, response) => {
	response.send([{ id: 123, name: "Rice", price: 12.99 }]);
});

app.listen(PORT, () =>  {
  console.log(`Runnning on port ${PORT}`);
});

//PUT :- Update entire resource
app.put("/api/users/:id", resolveIndexByUserId, (request, response) => {
	const { body, findUserIndex } = request;
	mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
	return response.sendStatus(200);
})

//PATCH :- Update partial entity
app.patch('/api/users/:id', resolveIndexByUserId, (request, response) => {
	const { body, findUserIndex } = request;
	mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
	return response.sendStatus(200);
})

//DELETE
app.delete("/api/users/:id", resolveIndexByUserId, (request,response) => {
	const { findUserIndex } = request;
	mockUsers.splice(findUserIndex, 1);
	return response.sendStatus(200);
})
