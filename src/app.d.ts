declare global {
	namespace App {
		interface Locals {
			admin: {
				id: number;
				email: string;
				name: string;
				role: string;
				sessionId: string;
			} | null;
			client: {
				id: number;
				email: string;
				name: string;
				sessionId: string;
			} | null;
		}
	}
}

export {};
