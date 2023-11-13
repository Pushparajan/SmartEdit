// pages/api/transform.ts

import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { getFullWidthTransform, getPageTitleTransformed, getProductCarasolTransform, getSectionHeadingTransform, isFullWidthBanner, isProductCarosel } from '@/utils/helper';
import _ from 'lodash'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        query: { fileSlug },
    } = req;
    try {
        const isReadFromUrl = process.env.READ_FROM_URL === 'true';
        const sourceData = isReadFromUrl ? await getJSONDataFromUrl(fileSlug as string) : await getJSONDataFromSource(fileSlug as string);
        const outputData = handleTransformData(sourceData)
        res.status(200).json(outputData);
    } catch (error: { message: string } | any) {
        console.log(error, "ERROR")
        res.status(500).json({ error: error.message });
    }
};

const getJSONDataFromUrl = (fileSlug: string): Record<string, any> => {
    return new Promise((resolve, reject) => {
        fetch(`${process.env.FILE_URL_PREFIX}${fileSlug}.json`).then((response) => {
            if (!response.ok) {
                reject({ message: `Can't find or read file with name ${fileSlug}.json from url` });
            }
            resolve(response.json())
        })
    })

}

const getJSONDataFromSource = (fileSlug: string): Record<string, any> => {
    return new Promise((resolve, reject) => {
        try {
            const sourceFilePath = path.join(process.cwd(), 'src', 'source', `${fileSlug}.json`);
            const sourceData = JSON.parse(fs.readFileSync(sourceFilePath, 'utf-8'));
            resolve(sourceData);
        } catch (e) {
            reject({ message: `Can't find or read file with name ${fileSlug}.json from source` });

        }
    })

}

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
        modules = [...modules, ...eachOutputFromInput]
    })
    const outputData = getPageTitleTransformed(sourceData, modules);
    return outputData;

}