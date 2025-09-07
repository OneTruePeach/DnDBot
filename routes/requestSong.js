import express from "express"
const router = express.Router();

router.post("/", function(req, res) {
    console.log(`${req} received.`);
});

export default router;