# TinyMCE Plugin

## 示例

[点击预览](https://panhezeng.github.io/tinymce-plugin-text-indent-outdent/)

官方的 indent 不是 text-indent，于是自己写了一个。

基于官方 indent 相关代码开发

pluginTextIndentOutdent 如果不传，默认值是 2px

使用

```javascript
tinymce.init({
  selector: "textarea.tinymce",
  plugins: "tinymce-plugin-text-indent-outdent",
  toolbar: "text-indent | text-outdent",
  pluginTextIndentOutdent: "30px"
});
```

## 编译

```bash

# 发版
npm set registry https://registry.npmjs.org/ && npm set @panhezeng:registry https://registry.npmjs.org/ && npm publish --access public && npm set registry https://registry.npm.taobao.org/ && npm set @panhezeng:registry https://registry.npm.taobao.org/

# 发版patch
npm set registry https://registry.npmjs.org/ && npm set @panhezeng:registry https://registry.npmjs.org/ && npm version patch && npm publish --access public && npm set registry https://registry.npm.taobao.org/ && npm set @panhezeng:registry https://registry.npm.taobao.org/

```
