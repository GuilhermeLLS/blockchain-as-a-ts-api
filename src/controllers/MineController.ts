import { v4 as uuidv4 } from "uuid";
import type { Response, Request } from "express";
import type { Block } from "../services/Blockchain";
import { blockchain } from "../services";

type MinedBlock = Omit<Block, "timestamp"> & {
	message: string;
};

export default class MineController {
	mineBlock(_req: Request, res: Response): Response<MinedBlock> {
		const lastBlock = blockchain.lastBlock();
		const lastProof = lastBlock.proof;
		const proof = blockchain.proofOfWork(lastProof);

		blockchain.newTransaction("0", uuidv4(), 1);
		const previousHash = blockchain.hash(lastBlock);
		const block = blockchain.newBlock(previousHash, proof);
		return res.status(201).json({
			message: "New block forged",
			index: block.index,
			transactions: block.transactions,
			proof: block.proof,
			previousHash: block.previousHash,
		});
	}
}
