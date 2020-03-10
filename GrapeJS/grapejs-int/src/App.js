import React from "react";
import "./App.css";
import "grapesjs/dist/css/grapes.min.css";
import grapesjs from "grapesjs";
import grapesjsPreset from "grapesjs-preset-webpage";
import { assets } from "./assets";

function App() {
  const editor = grapesjs.init({
    container: "#gjs",
    fromElement: true,
    height: "500px",
    width: "auto",
    storageManager: false,
    panels: { defaults: [] },
    plugins: [grapesjsPreset],
    assetManager: assets
  });
  window.editor = editor;
  const am = editor.AssetManager;
  const blockManager = editor.BlockManager;
  const commands = editor.Commands;

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
}

export default App;
