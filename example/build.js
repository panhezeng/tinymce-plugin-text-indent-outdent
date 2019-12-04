const shell = require("shelljs");
const minify = require("html-minifier").minify;

const path = require("path");

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

function build(path) {
  const dir = resolve(path);
  shell.rm("-rf", dir);
  shell.mkdir("-p", dir);
  shell.cp(
    resolve("dist/tinymce-plugin-text-indent-outdent/plugin.min.js"),
    dir
  );
  shell
    .ShellString(
      minify(shell.cat(resolve("example/template.html")).stdout, {
        collapseWhitespace: true,
        removeComments: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeTagWhitespace: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true
      })
    )
    .to(resolve("docs/index.html"));
}

build("docs");
