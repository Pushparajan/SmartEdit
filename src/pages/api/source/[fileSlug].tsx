// pages/api/transform.ts

import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default (req: NextApiRequest, res: NextApiResponse) => {
    const {
        query: { fileSlug },
      } = req;
    const sourceFilePath = path.join(process.cwd(), 'src', 'source', `${fileSlug}.json`);
    try {
        const sourceData = JSON.parse(fs.readFileSync(sourceFilePath, 'utf-8'));
        res.status(200).json(sourceData);
    } catch (error) {
        console.log(error, "ERROR")
        res.status(500).json({ error: `Can't find file with name ${fileSlug}.json` });
    }
};

