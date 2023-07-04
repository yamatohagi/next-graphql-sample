import { NextApiRequest, NextApiResponse } from 'next';

type NextApiRequestHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<any>;

const allowCors = (fn: NextApiRequestHandler): NextApiRequestHandler =>
  async function corsHandler(req: NextApiRequest, res: NextApiResponse): Promise<any> {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', 'https://climbbond.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return Promise.resolve();
    }
    return fn(req, res);
  };

export default allowCors;
