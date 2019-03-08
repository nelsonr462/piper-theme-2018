const blockSchema = require('./includes/block-schema.json');
const chalk = require('chalk');

console.log(`\n${blockSchema.blocks.length} total blocks.\n`);

let seen = {};
let blocks = blockSchema.blocks;

for(let i = 0; i < blocks.length; i++) {
    if(seen[blocks[i].type] == null) {
        seen[blocks[i].type] = {
            "count" : 1,
            "index": [i]
        };
    } else {
        seen[blocks[i].type].count++;
        seen[blocks[i].type].index.push(i);
    }
}

let hasDuplicates = false;
for(let block in seen) {
    if(seen[block].count > 1) {
        hasDuplicates = true;
        console.log(`\nDuplicate/Conflict with ${chalk.bgRed(block)}`)
        console.log(`Located at positions: ${seen[block].index.toString()}`);
        if(JSON.stringify(blocks[seen[block].index[0]]) == JSON.stringify(blocks[seen[block].index[1]])) {
            console.log(chalk.green("Blocks contain same attribute values. Safe to delete duplicate."));
        } else {
            console.log(chalk.red("Blocks contain different attribute values. Requires manual correction."));
        }
    }
}

if(!hasDuplicates) console.log(chalk.green("No duplicates/conflicts found.\n"));