const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        Common: path.resolve(__dirname, 'src/components/common'),
        Components: path.resolve(__dirname, 'src/components'),
        Icons: path.resolve(__dirname, 'src/components/Icons'),
        Graphics: path.resolve(__dirname, 'src/components/graphics'),
      },
    },
  },
};
