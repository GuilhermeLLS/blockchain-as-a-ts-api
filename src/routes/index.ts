import { Router } from "express";
import MineController from "../controllers/MineController";
import NodeController from "../controllers/NodeController";
import ChainController from "../controllers/ChainController";
import TransactionController from "../controllers/TransactionController";

const router = Router();
router.get("/", (_req, res) => res.status(200).json({ message: "api is running" }));
router.get("/mine", new MineController().mineBlock);
router.get("/chain", new ChainController().getChain);
router.get("/nodes/resolve", new NodeController().resolveNodes);
router.get("/nodes/register", new NodeController().registerNodes);
router.post("/transactions/new", new TransactionController().newTransaction);

export default router;
