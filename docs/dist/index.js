import * as blazeface from "../_snowpack/pkg/@tensorflow-models/blazeface.js";
import * as tf from "../_snowpack/pkg/@tensorflow/tfjs-core.js";
import * as tfjsWasm from "../_snowpack/pkg/@tensorflow/tfjs-backend-wasm.js";
import Konva from "../_snowpack/pkg/konva.js";
tfjsWasm.setWasmPaths(`https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${tfjsWasm.version_wasm}/dist/`);
let model, ctx, videoWidth, videoHeight;
const video = document.getElementById("video");
const canvas = document.getElementById("output");
const stage = new Konva.Stage({
  container: "container",
  width: 500,
  height: 400
});
const leftEar = new Konva.Text({
  x: stage.width() / 2,
  y: stage.height() / 2,
  text: "👂",
  fontSize: 30,
  fontFamily: "Calibri",
  fill: "blue",
  scaleX: -1
});
const rightEar = new Konva.Text({
  x: stage.width() / 2,
  y: stage.height() / 2,
  text: "👂",
  fontSize: 30,
  fontFamily: "Calibri",
  fill: "red"
});
const leftEye = new Konva.Text({
  x: stage.width() / 2,
  y: stage.height() / 2,
  text: "👁",
  fontSize: 30,
  fontFamily: "Calibri",
  fill: "blue"
});
const rightEye = new Konva.Text({
  x: stage.width() / 2,
  y: stage.height() / 2,
  text: "👁",
  fontSize: 30,
  fontFamily: "Calibri",
  fill: "red"
});
const nose = new Konva.Text({
  x: stage.width() / 2,
  y: stage.height() / 2,
  text: "👃",
  fontSize: 30,
  fontFamily: "Calibri",
  fill: "yellow"
});
const mouth = new Konva.Text({
  x: stage.width() / 2,
  y: stage.height() / 2,
  text: "👄",
  fontSize: 30,
  fontFamily: "Calibri",
  fill: "green"
});
const layer = new Konva.Layer();
async function setupCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {facingMode: "user"}
  });
  video.srcObject = stream;
  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });
}
const colors = ["blue", "red", "yellow", "green", "white", "black"];
const objects = [leftEye, rightEye, nose, mouth, rightEar, leftEar];
const renderPrediction = async () => {
  const returnTensors = false;
  const flipHorizontal = true;
  const annotateBoxes = true;
  const predictions = await model.estimateFaces(video, returnTensors, flipHorizontal, annotateBoxes);
  if (predictions.length > 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < predictions.length; i++) {
      if (returnTensors) {
        predictions[i].topLeft = predictions[i].topLeft.arraySync();
        predictions[i].bottomRight = predictions[i].bottomRight.arraySync();
        if (annotateBoxes) {
          predictions[i].landmarks = predictions[i].landmarks.arraySync();
        }
      }
      const start = predictions[i].topLeft;
      const end = predictions[i].bottomRight;
      const size = [end[0] - start[0], end[1] - start[1]];
      ctx.fillStyle = "rgba(255, 0, 0, 0.1)";
      ctx.fillRect(start[0], start[1], size[0], size[1]);
      if (annotateBoxes) {
        const landmarks = predictions[i].landmarks;
        for (let j = 0; j < landmarks.length; j++) {
          ctx.fillStyle = colors[j];
          const x = landmarks[j][0];
          const y = landmarks[j][1];
          ctx.fillRect(x, y, 10, 10);
          objects[j].setPosition({
            x,
            y
          });
        }
      }
      layer.draw();
    }
  }
  requestAnimationFrame(renderPrediction);
};
const setupPage = async () => {
  await tf.setBackend("wasm");
  await setupCamera();
  video.play();
  videoWidth = video.videoWidth;
  videoHeight = video.videoHeight;
  video.width = videoWidth;
  video.height = videoHeight;
  layer.add(...objects);
  stage.add(layer);
  stage.setAttr("width", videoWidth);
  stage.setAttr("height", videoHeight);
  layer.draw();
  objects.forEach((item) => {
    item.to({
      x: stage.width() / 2,
      y: stage.height() / 2
    });
  });
  canvas.width = videoWidth;
  canvas.height = videoHeight;
  ctx = canvas.getContext("2d");
  ctx.fillStyle = "rgba(255, 0, 0, 0.1)";
  model = await blazeface.load();
  renderPrediction();
};
setupPage();
