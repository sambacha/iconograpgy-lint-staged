const fs = require('fs');
const glob = require('glob');
const {isString, formatURL} = require('./tool');

const collectPictures = (path, isDir) => {
    if(isDir){
        return glob.sync(formatURL(`${path}/**.*(jpg|png|webp)`));
    }else{
        if(/\.(jpg|png|webp|)$/){
            return [path];
        }
    }
}
const processingDir = (path, outputDir, isDir) => {
    if(isDir){
        shell.exec(`cp -R ${formatURL(path + '/*')} ${outputDir}`);
    }else{
        if(/\.(jpg|png|webp|)$/){
            return;
        }
        shell.exec(`cp ${path} ${outputDir}`);
    }
}
/**
 * Accept directory path, multiple paths (file or folder mixed)
 */
const separate = (targets,outputDir, positive) => {
    if(!targets){
        return;
    }
    let dirArray = targets;

    if(isString(targets)){
        dirArray = [targets];
    }
    let images = [];
    targets.forEach(item => {
        const state = fs.lstatSync(item);
        const isDir = state.isDirectory();
        // Processing pictures
        const img = collectPictures(item, isDir);
        if(img){
            images = [].concat([], img);
        }
        // Process folder
        if(outputDir && positive){
            processingDir(item, outputDir, isDir)
        }
    });
    return images;
}
module.exports = separate;