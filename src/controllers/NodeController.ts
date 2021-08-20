import type { Response, Request } from "express";
import type { Block } from "../services/Blockchain";
import { blockchain } from "../services";

export default class NodeController {
	registerNodes(
		req: Request,
		res: Response
	): Response<{ message: string; totalNodes: Set<string> }> {
		const { nodes } = req.body as { nodes: Set<string> };

		nodes.forEach((node) => blockchain.registerNode(node));
		return res
			.status(201)
			.json({ message: "New nodes have been added", totalNodes: blockchain.Nodes });
	}

	async resolveNodes(
		_req: Request,
		res: Response
	): Promise<Response<{ message: string; chain: Array<Block> }>> {
		const replaced = await blockchain.resolveConflicts();
		if (replaced) {
			return res
				.status(200)
				.json({ message: "Our chain was replaced", chain: blockchain.Chain });
		}
		return res
			.status(200)
			.json({ message: "Our chain is authoritative", chain: blockchain.Chain });
	}
}
