import express from "express";

const app = express();

// register middleware
app.use(express.json())

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

app.get('/', (request, response) => {
  // response.send("Hello, World!");
  response.status(201).send({ msg: "Hello!" })
});

app.get('/api/users', (request, response) => {
  console.log(request.query);
  // response.send(mockUsers);
  const { query: { filter, value}, } = request;

	// when filter & value are undefined
	if (filter && value) return response.send(
		mockUsers.filter((user) => user[filter].includes(value))
		);
		return response.send(mockUsers);
});

app.post("/api/users", (request, response) => {
	console.log(request.body);
	const { body } = request;
	const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
	mockUsers.push(newUser);
	return response.status(201).send(newUser);
	// return response.send(200);
})

app.get("/api/users/:id", (request, response) => {
	console.log(request.params);
	const parsedId = parseInt(request.params.id);
	if (isNaN(parsedId)) 
  return response.status(400).send({ msg: "Bad Request. Invalid ID." });

	const findUser = mockUsers.find((user) => user.id === parsedId);
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
app.put("/api/users/:id", (request, response) => {
	const { body, params: { id } } = request;
	const parsedId = parseInt(id);
	if (isNaN(parsedId)) return response.sendStatus(400);

	const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);

	if (findUserIndex === -1) return response.sendStatus(404);

	mockUsers[findUserIndex] = { id: parsedId, ...body };
	return response.sendStatus(200);
})

//PATCH :- Update partial entity
//DELETE
