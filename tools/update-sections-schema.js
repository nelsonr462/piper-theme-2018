const replace = require('replace-in-file');
const jsonFormat = require('json-format');
const blockSchema = require('./includes/block-schema.json');
const schemaTypeList = require('./includes/schema-type-list.json')

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
async function updateFiles() {
    let categories = schemaTypeList.categories;


    for(let type in categories) {
        let newSchema = createSchema(categories[type].template);
        let files = categories[type].files.map(filename => {
            return "../src/sections/" + filename;
        })

        let options = {
            files:  files,
            from: /{% schema %}([\s\S]*){% endschema %}/m,
            to: newSchema
        }

        try {
            const changes = await replace(options);
            console.log(`Modified files for category [ ${categories[type].name} ]: ${changes.join(', ')}`);
        }

        catch (error) {
            console.error(`Error occurred: ${error}`);
        }

    }
}

updateFiles();