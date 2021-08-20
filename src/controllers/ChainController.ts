import type { Response, Request } from "express";
import { Block } from "../services/Blockchain";
import { blockchain } from "../services";

export default class ChainController {
	getChain(_req: Request, res: Response): Response<{ chain: Array<Block>; length: number }> {
		const chain = blockchain.Chain;
		return res.status(200).json({ chain, length: chain.length });
	}
}
