import React, { Component } from "react";
import { render } from "react-dom";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "./App.css";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function uploadImageCallBack(file) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3333/files");
    const data = new FormData();
    data.append("image", file);
    xhr.send(data);
    xhr.addEventListener("load", () => {
      const response = JSON.parse(xhr.responseText);
      console.log(response);
      resolve(response);
    });
    xhr.addEventListener("error", () => {
      const error = JSON.parse(xhr.responseText);
      console.log(error);
      reject(error);
    });
  });
}

class EditorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  onEditorStateChange = (editorState) => {
    // console.log(editorState)
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div className="editor">
        <Editor
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
          placeholder="Type Something..."
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: {
              uploadCallback: uploadImageCallBack,
              alt: { present: true, mandatory: true },
            },
          }}
        />
      </div>
    );
  }
}

const App = () => (
  <div>
    <h2> Rich Editor Text With Wysiwyg and Draft.js </h2>
    <EditorContainer />
  </div>
);

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
