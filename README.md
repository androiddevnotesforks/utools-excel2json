# utools 易翻

## 插件简介

一个翻译插件，通过接入常见翻译平台的服务，来支持多种语言互翻。

本插件主打免费、高效、美观、无广告，做到即用即走、不中断、无干扰。功能相较各翻译平台略显不足，且需要您花一点点时间来配置第三方功能才会好用，如果您比较介意，建议您使用utools「聚合翻译」插件或者各翻译平台的网页版本。


## 插件特性

1. 多种语言互翻
2. 自定义翻译方式
3. 自定义输入框文字大小
4. 支持一键复制、快捷键复制（Ctrl+Shift+C / Command+Shift+C）
5. 命名翻译模式（大小驼峰、中下划线、大小分词、对象属性、文件路径、常量）
6. 自动深色模式（将utools软件或操作系统改为深色均可触发）


## 服务申请说明

[易翻插件的相关服务申请说明 (wolai.com)](https://www.wolai.com/jtSV7oah6M7rErz2RMFzo)

## 翻译方式及支持语言
||||||||
|-|-|-|-|-|-|-|
||百度翻译|腾讯翻译|谷歌翻译|阿里翻译|有道翻译|彩云小译|
|中文-简体|✅|✅|✅|✅|✅|✅|
|英语|✅|✅|✅|✅|✅|✅|
|日语|✅|✅|✅|✅|✅|✅|
|俄语|✅|✅|✅|✅|✅|✅|
|韩语|✅|✅|✅|✅|✅||
|德语|✅|✅|✅|✅|✅||
|法语|✅|✅|✅|✅|✅||
|中文-繁体|✅|✅|✅|✅|✅||
|文言文|✅||||||

## 插件截图
![](doc/image_rU-rkEiVIi.png) 

![](doc/image_-afiQ5AAtJ.png) 

![](doc/image_lYvUiy-r5T.png) 

![](doc/image_tAmnG_v9yK.png) 

![](doc/image_o7cqFpllbF.png) 


## 贡献者
感谢所有已经为易翻插件做出贡献的人！
![](doc/贡献者.png) 


## 开发说明

### 安装依赖

```bash
yarn
```

### 开发环境运行

修改插件配置文件中的 preload 路径，并配置开发环境入口为本地服务

/public/plugin.json

```json
{
  "preload": "./preload/src/index.js",
  "development": {
    "main": "http://127.0.0.1:6789"
  }
}
```

启动开发服务器

```bash
yarn run dev
```

### 打包发布

打包 preload

```bash
yarn run p:build
```

vite 打包

```bash
yarn run build
```

修改打包后插件配置文件中的主入口文件和 preload 路径

/dist/plugin.json

```json
{
  "main": "./index.html",
  "preload": "./preload/dist/index.js"
}
```
