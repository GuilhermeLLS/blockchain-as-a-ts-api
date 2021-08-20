import type { Response, Request } from "express";
import type { Transaction } from "../services/Blockchain";
import { blockchain } from "../services";

export default class TransactionController {
	newTransaction(req: Request<Transaction>, res: Response): Response<{ message: string }> {
		const { amount, receiver, sender } = req.body as Transaction;

		const index = blockchain.newTransaction(sender, receiver, amount);
		return res.status(201).json({ message: `Transaction will be added to Block ${index}` });
	}
}
