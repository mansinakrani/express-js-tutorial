import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

const mockUsers = [
  { id:1, username: 'anson', displayname: 'Anson' },
  { id:2, username: 'jack', displayname: 'Jack' },
  { id:3, username: 'adam', displayname: 'Adam' }
];

app.get('/', (request, response) => {
  // response.send("Hello, World!");
  response.status(201).send({ msg: "Hello!" })
});

app.get('/api/users', (request, response) => {
  response.send(mockUsers);
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
})
;
