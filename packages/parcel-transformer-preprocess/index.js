// import { Transformer } from '@parcel/plugin';
const plugin = require('@parcel/plugin');
module.exports = new plugin.Transformer({
  async transform({ asset, config, logger, resolve, options }) {
    console.log('hiiiiiiiiiiiiiiiiii');
    console.log(asset);
    asset.setCode(
      'console.log("plugari toimii!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")'
    );
    return [asset];
  },
});
