const replace = require('replace-in-file');
const jsonFormat = require('json-format');
const blockSchema = require('./includes/block-schema.json');

// article
const article = [
    "article-main"
]

// blog
const blog = [
    "blog-article-list",
    "blog-hero"
]

// cart-section
const cart = [
    "cart-list"
]

const collection = [
    "card-cta",
    "collection-section",
    "subheader"
]

// about-us, collection, edu-main, homepage, legal, piper-main, pipercode, product, storefront, webinars
const page = [
    "awards-bar",
    "banner-contact-us",
    "banner-decoration",
    "banner-detail",
    "banner-email-signup",
    "banner-image-xl",
    "banner-link",
    "banner-testimonial",
    "bundle-breakdown",
    "card-cta",
    "collection-section",
    "edu-badge-bar",
    "expandable-section",
    "feature-large",
    "features-small",
    "full-size-image",
    "homepage-hero-main",
    "mission-statement",
    "page-content-container",
    "page-hero-about",
    "page-hero-legal",
    "page-hero-main",
    "page-hero-pipercode",
    "paragraph-section",
    "piper-hero-main",
    "product-gallery",
    "product-hero-main",
    "product-info",
    "related-products",
    "social-feed",
    "storefront-hero-main",
    "subheader",
    "video-section",
]

// edu-quote
const quote = [
    "banner-contact-us",
    "edu-badge-bar",
    "page-hero-main",
    "quote-tool"
]

// Creates formatted Schema section for section files.
function createSchema(list) {
    let blocks = blockSchema.blocks;
    let formattedSchema = "";
    let config = {
        type: 'space',
        size: 2
    }
    let schema = {
        "blocks": []
    };
    
    for(let i in list) {
        let block = blocks.find(block => {
            return block.type === list[i];
        });

        schema.blocks.push(block);
    }

    formattedSchema = jsonFormat(schema, config);
    formattedSchema = "{% schema %}\n" + formattedSchema + "\n{% endschema %}";

    return formattedSchema;

}

// Updates schema for each category of template 
// (article, block, cart, collection, page, quote)
function updateFiles() {

}