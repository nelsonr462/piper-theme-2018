const replace = require('replace-in-file');
const jsonFormat = require('json-format');
const dedent = require('dedent-js');
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

    let sectionTemplate = getSectionTemplate(list);

    return sectionTemplate + formattedSchema;

}

function getSectionTemplate(list) {
    const indent = "  ";
    let sectionStart = dedent`
    <div data-section-id="{{ section.id }}">
      {% for block in section.blocks %}
      <div {{ block.shopify_attributes }}>
        {% case block.type %}\n\n\n`;

    let sectionEnd = dedent`
        {% endcase%}
      </div>
      {% endfor %}
    </div>\n\n\n`;

    let sectionIncludes = "";

    for(let i in list) {
        sectionIncludes = sectionIncludes + `${indent.repeat(3)}{% when '${list[i]}'%}\n`;
        sectionIncludes = sectionIncludes + `${indent.repeat(3)}{% include '${list[i]}'%}\n\n`;
    }

    return sectionStart + sectionIncludes + sectionEnd;

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
            from: /[\s\S]*/m,
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