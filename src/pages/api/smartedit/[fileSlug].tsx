// pages/api/transform.ts

import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { getFullWidthTransform, getPageTitleTransformed, getProductCarasolTransform, getSectionHeadingTransform, isFullWidthBanner, isProductCarosel } from '@/utils/helper';
import _ from 'lodash'

export default (req: NextApiRequest, res: NextApiResponse) => {
    const {
        query: { fileSlug },
    } = req;
    const sourceFilePath = path.join(process.cwd(), 'src', 'source', `${fileSlug}.json`);
    try {
        const sourceData = JSON.parse(fs.readFileSync(sourceFilePath, 'utf-8'));
        const outputData = handleTransformData(sourceData)
        res.status(200).json(outputData);
    } catch (error) {
        console.log(error, "ERROR")
        res.status(500).json({ error: `Can't find file with name ${fileSlug}.json` });
    }
};

const handleTransformData = (sourceData: Record<string, any>) => {
    let modules: any = []
    sourceData?.page?.contentSlots?.contentSlot.map((eachContent: Record<string, any>, index: number) => {
        const eachOutputFromInput = [];
        const sectionData = getSectionHeadingTransform(eachContent);
        eachOutputFromInput.push(sectionData)
        let componentsInsideSection = eachContent?.components?.component;
        if (!_.isArray(componentsInsideSection)) {
            componentsInsideSection = [componentsInsideSection];
        }
        componentsInsideSection.map((eachComponent: Record<string, any>) => {
            if (isFullWidthBanner(eachComponent?.uid)) {
                const fullWidthData = getFullWidthTransform(eachComponent);
                eachOutputFromInput.push(fullWidthData)
            }
            if (isProductCarosel(eachComponent?.uid)) {
                const productCaroselData = getProductCarasolTransform(eachComponent)
                eachOutputFromInput.push(productCaroselData)
            }
        })
        // if (eachOutputFromInput?.length > 1) {
            modules  = [...modules , ...eachOutputFromInput]
        // }
    })
    const outputData = getPageTitleTransformed(sourceData, modules);
    return outputData;

}