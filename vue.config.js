const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  // Base URL for your application
  publicPath: process.env.NODE_ENV === 'production' ? '/your-production-path/' : '/',
  
  // Output directory for the built files
  outputDir: 'dist',

  // Configure the development server
  devServer: {
    port: 8080, // Port to run the development server
    open: true, // Automatically open the browser when the server starts
    // Uncomment and set your SIP server URL if needed
    // proxy: {
    //   '/sip': {
    //     target: 'wss://sip.xtrevo.com:8443/asterisk-wss', // Example proxy for SIP server
    //     changeOrigin: true,
    //   },
    // },
  },

  // Configure linting
  lintOnSave: true, // Enable linting for code quality

  // Additional configurations can be added as needed
});
