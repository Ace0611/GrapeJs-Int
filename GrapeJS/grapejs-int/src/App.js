import React from "react";
import "./App.css";
import "grapesjs/dist/css/grapes.min.css";
import grapesjs from "grapesjs";
import grapesjsPreset from "grapesjs-preset-webpage";
import { assets } from "./assets";
import grapesCkEditor from "grapesjs-plugin-ckeditor";

function App() {
  const editor = grapesjs.init({
    container: "#gjs",
    fromElement: true,
    height: "500px",
    width: "auto",
    storageManager: false,
    panels: { defaults: [] },
    plugins: [grapesjsPreset, grapesCkEditor],
    assetManager: assets,
    allowScripts: 1
  });
  window.editor = editor;
  const am = editor.AssetManager;
  const blockManager = editor.BlockManager;
  const commands = editor.Commands;

  editor.addComponents('<script>alert("lodof")</script>');

  var pfx = editor.getConfig().stylePrefix;
  var modal = editor.Modal;
  var cmdm = editor.Commands;
  var codeViewer = editor.CodeManager.getViewer("CodeMirror").clone();
  var pnm = editor.Panels;
  var container = document.createElement("div");
  var btnEdit = document.createElement("button");

  codeViewer.set({
    codeName: "htmlmixed",
    readOnly: 0,
    theme: "hopscotch",
    autoBeautify: true,
    autoCloseTags: true,
    autoCloseBrackets: true,
    lineWrapping: true,
    styleActiveLine: true,
    smartIndent: true,
    indentWithTabs: true
  });

  btnEdit.innerHTML = "Save";
  btnEdit.className = pfx + "btn-prim " + pfx + "btn-import";
  btnEdit.onclick = function() {
    var code = codeViewer.editor.getValue();
    editor.DomComponents.getWrapper().set("content", "");
    editor.setComponents(code.trim());
    modal.close();
  };

  cmdm.add("html-edit", {
    run: function(editor, sender) {
      sender && sender.set("active", 0);
      var viewer = codeViewer.editor;

      modal.setTitle("Edit code");
      if (!viewer) {
        var txtarea = document.createElement("textarea");
        container.appendChild(txtarea);
        container.appendChild(btnEdit);
        codeViewer.init(txtarea);
        viewer = codeViewer.editor;
      }
      console.log(editor.getJs());
      var InnerHtml = editor.getHtml();
      var Css = editor.getCss();
      modal.setContent("");
      modal.setContent(container);
      codeViewer.setContent(InnerHtml + "<style>" + Css + "</style>");
      modal.open();
      viewer.refresh();
    }
  });

  pnm.addButton("options", [
    {
      id: "edit",
      className: "fa fa-edit",
      command: "html-edit",
      attributes: {
        title: "Edit"
      }
    }
  ]);

  commands.add("my-command-id", {
    run(editor) {
      alert("This Command is now active");
    },
    stop(editor) {
      alert("This command is disabled");
    }
  });

  // editor.runCommand("my-command-id");

  blockManager.add("my-custom-block", {
    label: "Simple block",
    content: '<div class="my-block">This is my custom block</div>'
  });

  blockManager.get("my-custom-block").set({
    label: "Updated simple block",
    attributes: {
      title: "My Title"
    }
  });

  // blockManager.add("my-map-block", {
  //   label: "Simple map block",
  //   content: {
  //     type: "map",
  //     style: {
  //       height: "350px"
  //     },
  //     removable: false
  //   }
  // });

  //To add new asset for customization
  am.add([
    {
      category: "c1",
      src: "https://via.placeholder.com/150"
    }
  ]);
  //Event listeners while upload
  // The upload is started
  editor.on("asset:upload:start", () => {
    console.log("Upload Start");
  });

  // The upload is ended (completed or not)
  editor.on("asset:upload:end", () => {
    console.log("Upload End");
  });

  // Error handling
  editor.on("asset:upload:error", err => {
    console.log("Upload Error");
  });

  // Do something on response
  editor.on("asset:upload:response", response => {
    console.log("huha");
  });

  return (
    <>
      <div id="editor"></div>
    </>
  );
}

export default App;
