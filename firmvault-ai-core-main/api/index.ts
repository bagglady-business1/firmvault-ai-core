import { createServer } from '../dist/server/index.js';

export default async function handler(req: any, res: any) {
  const server = await createServer();
  return server(req, res);
}
