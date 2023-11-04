// pages/api/transform.ts

import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import _ from 'lodash'
import { outputDataFormat, outputPageStructureAndMapping, outputDataMainFormat } from '@/constraints';
import { handleTransformation } from '@/helper/utils';

export default (req: NextApiRequest, res: NextApiResponse) => {
    const sourceFilePath = path.join(process.cwd(), 'src', 'source', 'input.json');
    try {
        const sourceData = JSON.parse(fs.readFileSync(sourceFilePath, 'utf-8'));
        const transformedData = mapAndTransformData(sourceData);
        res.status(200).json(transformedData);
    } catch (error) {
        console.log(error, "ERROR")
        res.status(500).json({ error: 'Failed to read and transform data.' });
    }
};

function mapAndTransformData(sourceData: any[]) {
    const modularBlocks: any = []
    outputPageStructureAndMapping.map((eachOutput) => {
        const inputKey = eachOutput?.value;
        const outputKey = eachOutput?.key;
        const eachOuputRecord = eachOutput?.key;
        if (_.has(outputDataFormat, eachOuputRecord)) {
            const transformedData = handleTransformation(inputKey, outputKey, sourceData)
            if(transformedData) {
                let outputObject: any = {}
                outputObject[outputKey] = transformedData;
                modularBlocks.push(outputObject)
            }
        }
    })

    return { ...outputDataMainFormat, modular_blocks: modularBlocks };
}
