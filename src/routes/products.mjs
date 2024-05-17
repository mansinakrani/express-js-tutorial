import { Router } from "express";

const router = Router();

router.get("/api/products", (request, response) => {
	response.send([{ id: 123, name: "Rice", price: 12 }]);
});

export default router;