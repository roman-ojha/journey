import { Router } from "express";

const router = Router();

router.get("/register", (req, res) => {
  res.json({ name: "Roman Ojha" });
});

export default router;
