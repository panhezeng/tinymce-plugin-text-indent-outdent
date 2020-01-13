import React from "react";
import ReactDOM from "react-dom";
import tinymce from "tinymce";
import "../../src/index";
import "../../static/langs/zh_CN";
// import "../../dist/textindentoutdent/plugin.min";
// import "../../dist/textindentoutdent/langs/zh_CN";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    tinymce.init({
      selector: "textarea.tinymce",
      plugins: "code textindentoutdent",
      toolbar: "textindent | textoutdent | indent | outdent | code",
      language: "zh_CN",
      language_url:
        "https://cdn.jsdelivr.net/npm/@panhezeng/vue-tinymce@latest/dist/langs/zh_CN.js",
      plugin_textindentoutdent: { value: 30, unit: "px" }
    });
  }

  render() {
    return (
      <textarea className="tinymce" defaultValue="<p>test1</p><p>test2</p>" />
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
