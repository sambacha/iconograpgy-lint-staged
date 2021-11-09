#!/usr/bin/env node
const argv = require('argv');
const processor = require('../src/processor');
const separate = require('../src/separate');

argv.option({
    name: 'targetDir',
    short: 'T',
    type: 'string',
})
.option({
    name: 'outputDir',
    short: 'O',
    type: 'string',
}).option({
    name: 'positive',
    short: 'P',
    type: 'boolean',
    description: 'Positive processing we can optimize the image'
})
const args = argv.run(process.argv.slice(2))
const { targets, options } = args;
const { targetDir, outputDir, positive } = options;

let pendingProcessor = null;
let images = null;
if (targets && !targetDir && !outputDir) { // Replace itself after optimization
    pendingProcessor = (image) => processor(image, '');
    images = separate(targets,undefined,positive);
}
if (targets && outputDir) { // After optimization, output to a new directory
    pendingProcessor = (image) => processor(image, outputDir);
    images = separate(targets, outputDir, positive);
}
if (targetDir && outputDir) { // Process the pictures in the folder and output to a new directory after optimization
    pendingProcessor = (image) => processor(image, outputDir)
    images = separate(targetDir, outputDir, positive);
}
if (targetDir && !outputDir) { // Process the pictures in the folder and replace itself after optimization
    pendingProcessor = (image) => processor(image, '');
    images = separate(targetDir, undefined, positive);
}

if (!pendingProcessor || !images) {
    console.error('No effective processor found, maybe it is a matter of parameters');
    process.exit(1);
}

Promise.all(images.map(pendingProcessor)).catch(function (e) {
    console.error(e);
    process.exit(1);
});