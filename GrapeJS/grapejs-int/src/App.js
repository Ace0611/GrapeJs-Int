import React, { useState, useEffect } from "react";
import "./App.css";
import "grapesjs/dist/css/grapes.min.css";
import grapesjs from "grapesjs";
import grapesjsPreset from "grapesjs-preset-webpage";
import { assets } from "./assets";
// import grapesCkEditor from "grapesjs-plugin-ckeditor";

function App() {
  let [id, setId] = useState("");
  const editor = grapesjs.init({
    container: "#gjs",
    fromElement: true,
    height: "500px",
    width: "auto",
    storageManager: {
      type: "remote",
      stepsBeforeSave: 10,
      autosave: true,
      urlStore: "http://store/endpoint",
      urlLoad: "../public/en/index.html",
      params: {}, // Custom parameters to pass with the remote storage request, eg. CSRF token
      headers: {} // Custom headers for the remote storage request
    },
    panels: { defaults: [] },
    plugins: [grapesjsPreset],
    // pluginsOpts: {
    //   "gjs-plugin-ckeditor": {
    //     /* ...options */
    //   }
    // },
    assetManager: assets,
    allowScripts: 1
  });
  window.editor = editor;
  const am = editor.AssetManager;
  const blockManager = editor.BlockManager;
  const commands = editor.Commands;
  var modal = editor.Modal;

  editor.load(res => console.log("data load"));

  //To change the id of dropped component
  editor.on("block:drag:stop", function(droppedComponent) {
    console.log(droppedComponent);
    // modal.open()
    // modal.setTitle('Input blocks id')
    // modal.setContent(`<input type="text" value='${id}'/>`)
    droppedComponent.addAttributes({
      id: "customId"
      // onclick: `jsFunc('#${randomId}')`
    });
  });

  editor.StyleManager.addSector(
    "mySector",
    {
      name: "Element Attributes",
      open: true,
      properties: [{ name: "id" }, { name: "name" }, { name: "readOnly" }]
      // buildProps: ['id', 'readOnly'],
    },
    { at: 0 }
  );

  // editor.addComponents('<script>alert("Hi There!")</script>');

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
      // console.log(editor.getJs());
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

  blockManager.add("my-custom-block", {
    label: "Simple block",
    content: `
    <style>
      .my-block {
          width:50%;
          display:flex;
          justify-content:center;
          align-items:center;
          height:400px;
          background-image: url('http://placehold.it/350x250/78c5d6/fff/image1.jpg');
          background-size: norepeat;
      }
    </style>
    <div class="my-block">This is my custom block</div>`,
    resizable: true
  });

  blockManager.get("my-custom-block").set({
    label: "Updated simple block",
    attributes: {
      title: "My Title"
    },
    resizable: true
  });

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
