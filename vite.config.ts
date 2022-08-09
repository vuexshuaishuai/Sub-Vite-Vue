import { defineConfig } from 'vite'
import { resolve } from "path";
import vue from '@vitejs/plugin-vue'
import resolveExternalsPlugin from "vite-plugin-resolve-externals";

export default defineConfig({
  plugins: [
    vue(),
    resolveExternalsPlugin({
      AMap: "AMap"
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  /* 打包 */
  build: {
    outDir: "dist",
    //是否生成source map 源码文件
    sourcemap: false,
    terserOptions: {
      //生产环境移除 console
      compress: {
        drop_console: false,
        drop_debugger: true
      }
    }
  },
  //服务配置
  server: {
    open: true,
    //切换到生产环境需要将host注释
    // host: "test.daka.com",
    port: 5175,
    proxy: {
      "/exchange-pc": {
        //测试环境地址
        // target: "http://172.17.47.100/",
        //生产环境地址
        target: "https://daka.95155.com",
        ws: true,
        changeOrigin: true
      }
    }
  }
})
