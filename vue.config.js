const path = require("path");
module.exports = {
    publicPath: '.',
    assetsDir:'',
    filenameHashing:false,
    chainWebpack: config => {
        config
        .plugin('html')
        .tap(args => {
          args[0].title = 'PacketLab Viz'
          return args
        })
        
      }
}