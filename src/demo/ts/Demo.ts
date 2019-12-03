import Plugin from '../../main/ts/Plugin';

declare let tinymce: any;

Plugin();

tinymce.init({
  selector: 'textarea.tinymce',
  plugins: 'code text-indent-outdent',
  toolbar: 'text-indent | text-outdent | indent | code',
  pluginTextIndentOutdent: '30px'
});
