const path = require('path');
const { startDevServer } = require('@cypress/vite-dev-server');

module.exports = (on, config) => {
  const viteConfig = {
    configFile: path.resolve(__dirname, '..', '..', 'vite.config.js'),
  }
  
  viteConfig.esbuild = viteConfig.esbuild || {}
  viteConfig.esbuild.jsxFactory = 'h'
  viteConfig.esbuild.jsxFragment = 'Fragment'
  viteConfig.logLevel = 'error'
  viteConfig.resolve = {
    alias: {
      'vue': 'vue/dist/vue.esm-bundler.js'
    }
  }

  on('dev-server:start', (options) => {
    return startDevServer({ options, viteConfig });
  });

  return config;
};
