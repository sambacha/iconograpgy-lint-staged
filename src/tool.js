const isString = (v) => {
    return typeof v === 'string';
}
const isArray = (v) => {
    return Object.prototype.toString.call(v) === '[object Array]';
}
/**
 * Remove excess
 * @param url 
 */
const formatURL = (url) => {
    return url.replace(/\/\//g, '/');
}
module.exports = {
    isString,
    isArray,
    formatURL
}