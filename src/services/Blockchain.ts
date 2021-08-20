import sha256 from "crypto-js/sha256";

export type Block = {
	index: number;
	timestamp: number;
	transactions: Array<Transaction>;
	proof: number;
	previousHash: string;
};

export type Transaction = {
	sender: string;
	receiver: string;
	amount: number;
};

export default class Blockchain {
	private chain: Array<Block>;
	private nodes: Set<string>;
	private currentTransactions: Array<Transaction>;

	constructor() {
		this.chain = new Array<Block>();
		this.nodes = new Set<string>();
		this.currentTransactions = new Array<Transaction>();
		this.newBlock("1", 100);
	}

	get Nodes(): Set<string> {
		return this.nodes;
	}

	get Chain(): Array<Block> {
		return this.chain;
	}

	newBlock(previousHash: string, proof: number): Block {
		const block: Block = {
			index: this.chain.length - 1,
			timestamp: Date.now(),
			transactions: this.currentTransactions,
			proof,
			previousHash,
		};

		this.currentTransactions = [];
		this.chain.push(block);
		return block;
	}

	registerNode(address: string): void {
		this.nodes.add(new URL(address).hostname);
	}

	hash(block: Block): string {
		const blockString = JSON.stringify(block, Object.keys(block).sort());
		return sha256(blockString).toString();
	}

	lastBlock(): Block {
		return this.chain.slice(-1)[0];
	}

	newTransaction(sender: string, receiver: string, amount: number): number {
		this.currentTransactions.push({ sender, receiver, amount });
		return this.lastBlock().index + 1;
	}

	proofOfWork(lastProof: number): number {
		let proof = 0;
		while (!this.isProofValid(lastProof, proof)) proof++;
		return proof;
	}

	isProofValid(lastProof: number, proof: number): boolean {
		const guess = encodeURI(String(lastProof + proof));
		return sha256(guess).toString().slice(-4).endsWith("0000");
	}

	isChainValid(chain: Array<Block>): boolean {
		let lastBlock = chain[0];
		let currentIndex = 1;

		while (currentIndex < chain.length) {
			const block = chain[currentIndex];
			if (block.previousHash !== this.hash(lastBlock)) {
				return false;
			}
			if (!this.isProofValid(lastBlock.proof, block.proof)) {
				return false;
			}
			lastBlock = block;
			currentIndex++;
		}
		return true;
	}

	async resolveConflicts(): Promise<boolean> {
		const neighbors = this.nodes;
		let newChain: Array<Block> = [];

		let maxLen = this.chain.length;

		neighbors.forEach(async (node) => {
			const { status: responseStatus, json: responseJson } = await fetch(
				`http://${node}/chain`
			);
			if (responseStatus === 200) {
				const { length, chain } = await responseJson() as {length: number, chain: Array<Block>};
				if (length > maxLen && this.isChainValid(chain)) {
					maxLen = length;
					newChain = chain;
				}
			}
		});
		if (newChain.length > 0) {
			this.chain = newChain;
			return true;
		}
		return false;
	}
}
