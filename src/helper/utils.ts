import { outputDataFormat, outputPageStructureAndMapping } from "@/constraints"
import _ from "lodash";

const getDataSourceThroughKey = (inputKey: string, outputKey: string, inputDataSetParam: Record<string, any>) => {
    let inputData = null;
    let outputData = null;
    const inputDataSet = inputDataSetParam?.contentSlots?.contentSlot;
    if (_.has(outputDataFormat, outputKey)) {
        outputData = _.get(outputDataFormat, outputKey)
    }
    inputDataSet?.map((eachInputData: Record<string, any>) => {
        const inputComponent = eachInputData?.components?.component;
        inputComponent?.map((eachComponent: Record<string, any>) => {
            if (eachComponent?.uid === inputKey || eachComponent?.defaultCmsComponent?.uid === inputKey) {
                inputData = eachComponent;
            }
        })
    })
    return { inputData, outputData };
}

export const fillWidthBannerTransformer = (inputDataSource: Record<string, any>, outputDataSource: Record<string, any>) => {
    let { uid, typeCode, modifiedTime, name, container, media, urlLink } = inputDataSource;
    let fullbannerwidthOuput = { ...outputDataSource, };

    (fullbannerwidthOuput as any) = {
        ...fullbannerwidthOuput,
        heading: name,
        _metadata: {
            ...fullbannerwidthOuput?._metadata,
            uid,
            typeCode,
            modifiedTime,
            container,
            urlLink
        }
    }

    if (_.has(media, "tablet")) {
        _.set(fullbannerwidthOuput, 'banner_tablet_image.filename', _.get(media, "tablet.code"))
        _.set(fullbannerwidthOuput, 'banner_tablet_image.content_type', _.get(media, "tablet.mime"))
        _.set(fullbannerwidthOuput, 'banner_tablet_image.title', _.get(media, "tablet.altText"))
        _.set(fullbannerwidthOuput, 'banner_tablet_image.url', _.get(media, "tablet.url"))
    }
    if (_.has(media, "desktop")) {
        _.set(fullbannerwidthOuput, 'banner_desktop_image.filename', _.get(media, "desktop.code"))
        _.set(fullbannerwidthOuput, 'banner_desktop_image.content_type', _.get(media, "desktop.mime"))
        _.set(fullbannerwidthOuput, 'banner_desktop_image.title', _.get(media, "desktop.altText"))
        _.set(fullbannerwidthOuput, 'banner_desktop_image.url', _.get(media, "desktop.url"))
    }
    if (_.has(media, "mobile")) {
        _.set(fullbannerwidthOuput, 'banner_smartphone_image.filename', _.get(media, "mobile.code"))
        _.set(fullbannerwidthOuput, 'banner_smartphone_image.content_type', _.get(media, "mobile.mime"))
        _.set(fullbannerwidthOuput, 'banner_smartphone_image.title', _.get(media, "mobile.altText"))
        _.set(fullbannerwidthOuput, 'banner_smartphone_image.url', _.get(media, "mobile.url"))
    }
    if (_.has(media, "widescreen")) {
        _.set(fullbannerwidthOuput, 'widescreen_image.filename', _.get(media, "widescreen.code"))
        _.set(fullbannerwidthOuput, 'widescreen_image.content_type', _.get(media, "widescreen.mime"))
        _.set(fullbannerwidthOuput, 'widescreen_image.title', _.get(media, "widescreen.altText"))
        _.set(fullbannerwidthOuput, 'widescreen_image.url', _.get(media, "widescreen.url"))
    }
    return fullbannerwidthOuput;
}

export const transformSectionHeader = (inputDataSource: Record<string, any>, outputDataSource: Record<string, any>) => {
    let { uid, typeCode, modifiedTime, name, container, sourceId, defaultCmsComponent, currentCMSComponents } = inputDataSource;
    let sectionHeaderhOuput = { ...outputDataSource, };

    (sectionHeaderhOuput as any) = {
        ...sectionHeaderhOuput,
        heading: _.has(defaultCmsComponent, "name") ? `<h1>${_.get(defaultCmsComponent, "name")}</h1>` : sectionHeaderhOuput?.heading,
        _metadata: {
            ...(sectionHeaderhOuput?._metadata || {}),
            uid,
            typeCode,
            modifiedTime,
            container,
            sourceId,
            defaultCmsComponent,
            currentCMSComponents,
            name
        }
    }
    return sectionHeaderhOuput;
}


export const transformHalfWidthBanner = (inputDataSource: Record<string, any>, outputDataSource: Record<string, any>) => {
    let { uid, typeCode, modifiedTime, name, container, sourceId, defaultCmsComponent, currentCMSComponents } = inputDataSource;
    let sectionHeaderhOuput = { ...outputDataSource, };
    const headLine = _.has(defaultCmsComponent, "name") ? `<h1>${_.get(defaultCmsComponent, "name")}</h1>` : name ? `<h1>${name}</h1>` : sectionHeaderhOuput?.headline;
    (sectionHeaderhOuput as any) = {
        ...sectionHeaderhOuput,
        headline: headLine,
        _metadata: {
            ...(sectionHeaderhOuput?._metadata || {}),
            uid,
            typeCode,
            modifiedTime,
            container,
            sourceId,
            defaultCmsComponent,
            currentCMSComponents,
            name
        }
    }
    const media = defaultCmsComponent?.media;
    if (_.has(media, "desktop") && _.has(sectionHeaderhOuput, "desktop_image")) {
        _.set(sectionHeaderhOuput, 'desktop_image.filename', _.get(media, "desktop.code"))
        _.set(sectionHeaderhOuput, 'desktop_image.content_type', _.get(media, "desktop.mime"))
        _.set(sectionHeaderhOuput, 'desktop_image.title', _.get(media, "desktop.altText"))
        _.set(sectionHeaderhOuput, 'desktop_image.url', _.get(media, "desktop.url"))
    }
    if (_.has(media, "tablet") && _.has(sectionHeaderhOuput, "tablet_image")) {
        _.set(sectionHeaderhOuput, 'tablet_image.filename', _.get(media, "tablet.code"))
        _.set(sectionHeaderhOuput, 'tablet_image.content_type', _.get(media, "tablet.mime"))
        _.set(sectionHeaderhOuput, 'tablet_image.title', _.get(media, "tablet.altText"))
        _.set(sectionHeaderhOuput, 'tablet_image.url', _.get(media, "tablet.url"))
    }
    if (_.has(media, "mobile")) {
        _.set(sectionHeaderhOuput, 'mobile_image.filename', _.get(media, "mobile.code"))
        _.set(sectionHeaderhOuput, 'mobile_image.content_type', _.get(media, "mobile.mime"))
        _.set(sectionHeaderhOuput, 'mobile_image.title', _.get(media, "mobile.altText"))
        _.set(sectionHeaderhOuput, 'mobile_image.url', _.get(media, "mobile.url"))
    }
    if (_.has(media, "widescreen")) {
        _.set(sectionHeaderhOuput, 'widescreen_image.filename', _.get(media, "widescreen.code"))
        _.set(sectionHeaderhOuput, 'widescreen_image.content_type', _.get(media, "widescreen.mime"))
        _.set(sectionHeaderhOuput, 'widescreen_image.title', _.get(media, "widescreen.altText"))
        _.set(sectionHeaderhOuput, 'widescreen_image.url', _.get(media, "widescreen.url"))
    }
    return sectionHeaderhOuput;
}

export const transformShortBanner = (inputDataSource: Record<string, any>, outputDataSource: Record<string, any>) => {
    let { uid, typeCode, modifiedTime, name, container, media, urlLink } = inputDataSource;
    let sectionHeaderhOuput = { ...outputDataSource, };
    const bannerTitle = name ? `<h1>${name}</h1>` : sectionHeaderhOuput?.headline;
    (sectionHeaderhOuput as any) = {
        ...sectionHeaderhOuput,
        banner_title: bannerTitle,
        _metadata: {
            ...(sectionHeaderhOuput?._metadata || {}),
            uid,
            typeCode,
            modifiedTime,
            container,
            media,
            urlLink
        }
    }
    if (_.has(media, "desktop")) {
        _.set(sectionHeaderhOuput, 'promo_icon.filename', _.get(media, "desktop.code"))
        _.set(sectionHeaderhOuput, 'promo_icon.content_type', _.get(media, "desktop.mime"))
        _.set(sectionHeaderhOuput, 'promo_icon.title', _.get(media, "desktop.altText"))
        _.set(sectionHeaderhOuput, 'promo_icon.url', _.get(media, "desktop.url"))
    }
    return sectionHeaderhOuput;
}

const transformProductCarosel = (inputDataSource: Record<string, any>, outputDataSource: Record<string, any>) => {
    let { uid, typeCode, modifiedTime, name, container, popup, scroll, productCodes, title } = inputDataSource;
    let caroselhOuput = { ...outputDataSource };
    let productPicketSample: any = [];
    if (!_.isEmpty(productCodes)) {
        let productData = productCodes?.split(' ');
        productData.map((eachProduct: string) => {
            productPicketSample.push({
                "product_id": eachProduct,
                "_metadata": {
                    "uid": eachProduct
                }
            })
        })
    }
    (caroselhOuput as any) = {
        ...caroselhOuput,
        heading: `<h2>${title}</h2>`,
        _metadata: {
            ...(caroselhOuput?._metadata || {}),
            uid,
            typeCode,
            modifiedTime,
            name,
            container,
            popup,
            scroll,
            productCodes,
            title
        },
        product_picker_sample: productPicketSample?.length ? productPicketSample : caroselhOuput?.product_picker_sample,
        product_picker: productPicketSample?.length ? productPicketSample : caroselhOuput?.product_picker_sample
    }
    return caroselhOuput;
}





export const handleTransformation = (inputKey: string | Array<string>, outputKey: string, inputDataSetParam: Record<string, any>) => {
    if (outputKey === 'full_width_banner' && inputKey === 'ElectronicsHompageLightFamTextBannerComponent') {
        const { inputData, outputData } = getDataSourceThroughKey(inputKey, outputKey, inputDataSetParam);
        if ((!_.isNull(inputData) && !_.isNull(outputData))) {
            return fillWidthBannerTransformer(inputData, outputData)
        } else {
            return outputData;
        }
    }
    if (outputKey === 'section_heading' && inputKey === 'Section2ASlotHomepageCxContainer') {
        const { inputData, outputData } = getDataSourceThroughKey(inputKey, outputKey, inputDataSetParam);
        if ((!_.isNull(inputData) && !_.isNull(outputData))) {
            return transformSectionHeader(inputData, outputData)
        } else {
            return outputData;
        }
    }
    if (outputKey === 'section_heading' && inputKey === 'Section2BSlotHomepageCxContainer') {
        const { inputData, outputData } = getDataSourceThroughKey(inputKey, outputKey, inputDataSetParam);
        if ((!_.isNull(inputData) && !_.isNull(outputData))) {
            return transformSectionHeader(inputData, outputData)
        } else {
            return outputData;
        }
    }
    if (outputKey === 'section_heading' && inputKey === 'Section2CSlotHomepageCxContainer') {
        const { inputData, outputData } = getDataSourceThroughKey(inputKey, outputKey, inputDataSetParam);
        if ((!_.isNull(inputData) && !_.isNull(outputData))) {
            return transformSectionHeader(inputData, outputData)
        } else {
            return outputData;
        }
    }
    if (outputKey === 'half_width_banner' && inputKey === 'ElectronicsHompageCamcordersBannerComponent') {
        const { inputData, outputData } = getDataSourceThroughKey(inputKey, outputKey, inputDataSetParam);
        if ((!_.isNull(inputData) && !_.isNull(outputData))) {
            return transformHalfWidthBanner(inputData, outputData)
        } else {
            return outputData;
        }
    }
    if (outputKey === 'half_width_banner' && inputKey === 'ElectronicsHompageCamcordersChildBannerComponent') {
        const { inputData, outputData } = getDataSourceThroughKey(inputKey, outputKey, inputDataSetParam);
        if ((!_.isNull(inputData) && !_.isNull(outputData))) {
            return transformHalfWidthBanner(inputData, outputData)
        } else {
            return outputData;
        }
    }
    if (outputKey === 'short_banner' && inputKey === 'ElectronicsHompageShopBannerComponent') {
        const { inputData, outputData } = getDataSourceThroughKey(inputKey, outputKey, inputDataSetParam);
        if ((!_.isNull(inputData) && !_.isNull(outputData))) {
            return transformShortBanner(inputData, outputData)
        } else {
            return outputData;
        }
    }
    if (outputKey === 'short_banner' && inputKey === 'ElectronicsHompageSmDiscountBannerComponent') {
        const { inputData, outputData } = getDataSourceThroughKey(inputKey, outputKey, inputDataSetParam);
        if ((!_.isNull(inputData) && !_.isNull(outputData))) {
            return transformShortBanner(inputData, outputData)
        } else {
            return outputData;
        }
    }
    if (outputKey === 'product_carousel' && inputKey === 'ElectronicsHomepageProductCarouselComponent') {
        const { inputData, outputData } = getDataSourceThroughKey(inputKey, outputKey, inputDataSetParam);
        if ((!_.isNull(inputData) && !_.isNull(outputData))) {
            return transformProductCarosel(inputData, outputData)
        } else {
            return outputData;
        }
    }
    if (outputKey === 'product_carousel' && inputKey === 'NewElectronicsHomepageProductCarouselComponent') {
        const { inputData, outputData } = getDataSourceThroughKey(inputKey, outputKey, inputDataSetParam);
        if ((!_.isNull(inputData) && !_.isNull(outputData))) {
            return transformProductCarosel(inputData, outputData)
        } else {
            return outputData;
        }
    }
    return undefined;

}