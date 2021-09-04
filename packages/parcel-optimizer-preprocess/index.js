// import { Transformer } from '@parcel/plugin';
const plugin = require('@parcel/plugin');
const pp = require('preprocess');
/**
 * Flatten a nested object into a flat { "KEY_NESTEDKEY": value } structure
 * @param {object} obj - The object to flatten
 * @param {string} [prefix=''] - Parent key to add as a prefix
 */
function flatten(obj, prefix = '') {
  return Object.keys(obj).reduce((acc, prop) => {
    const pre = prefix.length ? prefix + '_' : prefix;
    if (typeof obj[prop] === 'object') {
      Object.assign(acc, flatten(obj[prop], pre + prop.toUpperCase()));
    } else {
      acc[pre + prop.toUpperCase()] = obj[prop];
    }

    return acc;
  }, {});
}

module.exports = new plugin.Optimizer({
  async optimize({ bundle, contents }) {
    const context = {
      gameObject: {
        acceleration: true,
        anchor: true,
        camera: true,
        opacity: true,
        rotation: true,
        ttl: true,
        velocity: true,
      },
      vector: {
        length: true,
        normalize: true,
      },
      sprite: {
        image: true,
      },
    };
    // contents = pp.preprocess(contents, flatten(context), {
    //   type: 'js',
    // });
    return { contents: contents, map: contents };
  },
});
