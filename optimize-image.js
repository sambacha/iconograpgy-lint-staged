//import { writeFileSync } from 'fs';
//import { ImagePool } from '@squoosh/lib';
const fs = require('fs')
const squoosh = require('@squoosh/lib');
const {ImagePool} = squoosh;

/*
function handlePath(resourcePath) {
    const index = resourcePath.lastIndexOf('/')
    return {folder: resourcePath.slice(0, index), name: resourcePath.slice(index + 1)}
  }
*/

const imagePool = new ImagePool();
const [img] = process.argv.slice(2);

const image = imagePool.ingestImage(img);
await image.encode({
  mozjpeg: {}
});
const { binary } = await image.encodedWith.mozjpeg;
await writeFileSync(img, binary);
await imagePool.close();