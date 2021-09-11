const pp = require('preprocess');
const fs = require('fs');

const flatten = (obj, prefix = '') => {
  return Object.keys(obj).reduce((acc, prop) => {
    const pre = prefix.length ? prefix + '_' : prefix;
    if (typeof obj[prop] === 'object') {
      Object.assign(acc, flatten(obj[prop], pre + prop.toUpperCase()));
    } else {
      acc[pre + prop.toUpperCase()] = obj[prop];
    }

    return acc;
  }, {});
};

const main = () => {
  const code = fs.readFileSync('node_modules/kontra/kontra.mjs').toString();

  const context = {
    gameObject: {
      acceleration: true,
      anchor: true,
      camera: true,
      group: true,
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
      animation: true,
    },
  };
  const result = pp.preprocess(code, flatten(context), { type: 'js' });

  fs.writeFileSync('node_modules/kontra/kontra.mjs', result);
};

main();
