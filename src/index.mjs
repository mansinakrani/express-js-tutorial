import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

const mockUsers = [
  { id:1, username: 'anson', displayname: 'Anson' },
  { id:2, username: 'jack', displayname: 'Jack' },
  { id:3, username: 'adam', displayname: 'Adam' },
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
