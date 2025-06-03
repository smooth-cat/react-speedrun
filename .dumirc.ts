import { defineConfig } from 'dumi';
import { writeFileSync } from 'fs';
import path from 'path';
const publicPath = '/react-speedrun/';
export default defineConfig({
  chainWebpack(memo) {

    // 获取现有的 markdown 规则
    const mdRule = memo.module.rule('md').test(/\.md$/);
    
    // 在你的 loader 前保留所有现有 loader
    mdRule
      .use('md-replace-loader')
      .loader(path.resolve(__dirname, './md-replace-loader.js'))
      .options({
        replaceMap: {
          base: '/react-speedrun/',
        }
      })
      .before('dumi-loader') // 明确指定在 dumi-loader 之前执行
      .end();
    return memo;
  },
  themeConfig: {
    logo: `${publicPath}米龙.png`,
    name: 'React Speedrun',
    footer: false,
    prefersColor: { default: 'dark', switch: false },
  },
  base: publicPath,
  publicPath: publicPath,
  cssPublicPath: publicPath,
  headScripts: [`window.publicPath = '${publicPath}';`],
});
