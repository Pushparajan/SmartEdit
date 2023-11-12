const jsont = require('json-transforms');
import _ from 'lodash'


export const getPageTitleTransformed = (inputJson,modules) => {
    const rules = [
        jsont.pathRule(
            '.page', d => {
                return {
                    "_version": 21,
                    "locale": "en-us",
                    "_in_progress": false,
                    "created_at": "2023-11-10T16:33:15.561Z",
                    "created_by": "blt78fe312f4dcc2750",
                    "modular_blocks": modules,
                    "seo": {
                        "meta_title": "",
                        "meta_description": "",
                        "keywords": "",
                        "enable_search_indexing": true
                    },
                    "tags": [],
                    "title": `${(d?.context?.page?.title || "Home Page")} From Hybris ${_.now()}`,
                    "updated_at": "2023-11-10T17:12:32.016Z",
                    "updated_by": "blt78fe312f4dcc2750",
                    "url": "/home-page-from-hybris"
                }
            }
        ),
        jsont.identity
    ];
    return jsont.transform(inputJson, rules);
}

export const getSectionHeadingTransform = (eachSection) => {
    const rules = [
        jsont.pathRule(
            '.', d => {
                return {
                    "section_heading": {
                        "heading": `<span>${d?.context?.name || "Section1 Slot for Homepage"}</span>`,
                        "_metadata": {
                            "slotId": d?.context?.slotId
                        },
                        "content": "",
                        "alignment": 1
                    }
                }
            }
        ),
        jsont.identity
    ];
    return jsont.transform(eachSection, rules);
}

export const getFullWidthTransform = (fullWidthComponent) => {
    const rules = [
        jsont.pathRule(
            '.', d => {
                return {
                    "full_width_banner": {
                        "variation": "block-floating",
                        "banner_desktop_image_url": {
                            "href": d?.context?.media?.desktop?.url || "https://images.contentstack.io/v3/assets/blt00fb8bca61a5c45c/bltde0a770474ceaa68/654e5ab49ca24ae9dd329bbb/0-5000x3333.jpg",
                            "title": d?.context?.media?.desktop?.altText || "0-5000x3333.jpg"
                        },
                        "_metadata": {
                        },
                        "banner_tablet_image_url": {
                            "href": d?.context?.media?.tablet?.url || "https://images.contentstack.io/v3/assets/blt00fb8bca61a5c45c/bltde0a770474ceaa68/654e5ab49ca24ae9dd329bbb/0-5000x3333.jpg",
                            "title": d?.context?.media?.tablet?.altText || "0-5000x3333.jpg"
                        },
                        "banner_smartphone_image_url": {
                            "href": d?.context?.media?.mobile?.url || "https://images.contentstack.io/v3/assets/blt00fb8bca61a5c45c/bltde0a770474ceaa68/654e5ab49ca24ae9dd329bbb/0-5000x3333.jpg",
                            "title": d?.context?.media?.mobile?.altText || "0-5000x3333.jpg"
                        },
                        "image_height": 360,
                        "padding_left": {},
                        "padding_top": {},
                        "transparency": {},
                        "floating_box_height": {},
                        "heading": "Electronics Homepage Splash Banner Component",
                        "inner_text": "",
                        "text_color": null,
                        "position": null,
                        "block_background_color": null,
                        "text_alignment": null,
                        "button": [
                            {
                                "title": "Button",
                                "href": "www.google.com"
                            }
                        ],
                        "button_variants": null
                    }
                }
            }
        ),
        jsont.identity
    ];
    return jsont.transform(fullWidthComponent, rules);
}

export const getProductIdsTransform = (productIds) => {
    const productIdsData = productIds?.split(' ');
    const productIdsJSON = {products : productIdsData}
    const rules = [
        jsont.pathRule(
            '.products{.}', d => {
                return {
                    data : d.runner()
                }
            }
        ),
        jsont.pathRule(
            '.', d => {
                return {
                    "product_id": d?.context,
                    "_metadata": {
                    }
                }
            }
        ),
        jsont.identity
    ];
    return jsont.transform(productIdsJSON, rules);
}

export const getProductCarasolTransform = (productCaroselComponent) => {
    const productIds = getProductIdsTransform(productCaroselComponent?.productCodes);
    const rules = [
        jsont.pathRule(
            '.', d => {
                return {
                    "product_carousel": {
                        "heading": `<span>${d?.context?.name || "Product Carousel"}</span>`,
                        "_metadata": {
                        },
                        "description": "",
                        "product_picker_sample": productIds?.data,
                        "product_picker": {
                            "data": [],
                            "type": "sapcommercecloud_product"
                        },
                        "cta": {
                            "title": "",
                            "href": ""
                        }
                    }
                }
            }
        ),
        jsont.identity
    ];
    return jsont.transform(productCaroselComponent, rules);
}


export const isFullWidthBanner = (uid) => {
    if ((uid || "").toLowerCase().includes("banner")) {
        return true;
    }
    return false;
}

export const isProductCarosel = (uid) => {
    if ((uid || "").toLowerCase().includes("productcarousel")) {
        return true;
    }
    return false;
}