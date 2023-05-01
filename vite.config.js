import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0'	// ← 新增内容 ←
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, 'src'), // 路径别名
    },
    extensions: ['.js', '.json', '.ts'] // 使用路径别名时想要省略的后缀名，可以自己 增减
  },
  rollupOptions: {
    output: {
      assetFileNames: assetInfo => {
        let info = assetInfo.name.split('.')
        let extType = info[info.length - 1]
        if (
            /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)
        ) {
          extType = 'media'
        } else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetInfo.name)) {
          extType = 'img'
        } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
          extType = 'fonts'
        }
        return `static/${extType}/[name]-[hash][extname]`
      },
      chunkFileNames: 'static/js/[name]-[hash].js',
      entryFileNames: 'static/js/[name]-[hash].js'
    }
  }
})
