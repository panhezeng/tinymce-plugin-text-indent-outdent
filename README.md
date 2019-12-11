# tinymce-plugin-text-indent-outdent

[![NPM](https://nodei.co/npm/@panhezeng/tinymce-plugin-text-indent-outdent.png?compact=true)](https://nodei.co/npm/@panhezeng/tinymce-plugin-text-indent-outdent/)

> tinymce plugin

## Example

[点击预览](https://panhezeng.github.io/tinymce-plugin-text-indent-outdent/)

## Explain

官方的 indent 不是 text-indent，于是自己写了一个。

基于官方 indent 相关代码开发

pluginTextIndentOutdent 如果不传，默认值是 2px

## Use

```javascript
tinymce.init({
  selector: "textarea.tinymce",
  plugins: "tinymce-plugin-text-indent-outdent",
  toolbar: "text-indent | text-outdent",
  pluginTextIndentOutdent: "30px"
});
```

## Development

- [semantic-release-cli setup](https://semantic-release.gitbook.io/semantic-release/usage/getting-started)
