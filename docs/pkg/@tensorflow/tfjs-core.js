import {I as IORouterRegistry, y as concatenateArrayBuffers, cR as basename, e as env, x as getModelArtifactsInfoForJSON, u as decodeWeights, cS as encodeWeights, q as getLoadHandlers, v as getSaveHandlers, cT as registerLoadRouter, cU as registerSaveRouter, cV as copyModel, cW as listModels, cX as moveModel, cY as removeModel, z as op, A as convertToTensor, f as assert, j as cast, E as ENGINE, J as inferShape, n as arraysEqual, bp as isTypedArray, cZ as flatten, c_ as isString, cH as encodeString, m as mul, i as reshape, c$ as Conv3DBackpropInputV2, d0 as Diag, d1 as IsFinite, d2 as IsInf, at as assertAndGetBroadcastShape, T as Tensor, w as sizeFromShape, aX as parseAxisParam, aY as expandShapeToKeepDim, a8 as convertToTensorArray, a4 as eitherStridesOrDilationsAreOne, cc as computePool2DInfo, aC as buffer, H as assertNonNull, K as makeTensor, a5 as isInt, d3 as UnsortedSegmentSum, aR as assertShapesMatch, d4 as assertTypesMatch, d5 as getTypedArrayFromDType, g as tensor, c5 as dispose, h as tidy, k as keep} from "../common/fused_util-15f1054e.js";
export {S as Abs, U as Acos, V as Acosh, N as Add, W as AddN, X as All, Y as Any, Z as ArgMax, _ as ArgMin, $ as Asin, a0 as Asinh, a1 as Atan, a2 as Atan2, a3 as Atanh, a6 as AvgPool, a7 as AvgPool3D, dE as AvgPool3DGrad, dD as AvgPoolGrad, F as BatchMatMul, ad as BatchToSpaceND, af as Bincount, dF as BroadcastTo, cf as Cast, ah as Ceil, ai as ClipByValue, dG as Complex, Q as ComplexAbs, a9 as Concat, aj as Conv2D, bM as Conv2DBackpropFilter, ak as Conv2DBackpropInput, al as Conv3D, dH as Conv3DBackpropFilterV2, c$ as Conv3DBackpropInputV2, am as Cos, an as Cosh, bY as CropAndResize, ao as Cumsum, cx as DataStorage, ap as DenseBincount, aq as DepthToSpace, ar as DepthwiseConv2dNative, bU as DepthwiseConv2dNativeBackpropFilter, bV as DepthwiseConv2dNativeBackpropInput, d0 as Diag, as as Dilation2D, dJ as Dilation2DBackpropFilter, dI as Dilation2DBackpropInput, dd as ENV, ax as Einsum, dK as Elu, dL as EluGrad, dc as Environment, au as Equal, ay as Erf, az as Exp, aA as ExpandDims, aB as Expm1, bw as FFT, aD as Fill, bZ as FlipLeftRight, aE as Floor, P as FloorDiv, M as FromPixels, ae as FusedBatchNorm, bQ as FusedConv2D, bW as FusedDepthwiseConv2D, bL as GatherNd, aF as GatherV2, aG as Greater, aH as GreaterEqual, bx as IFFT, c7 as Identity, aI as Imag, d1 as IsFinite, d2 as IsInf, aJ as IsNan, cw as KernelBackend, aN as LRN, dN as LRNGrad, ck as LeakyRelu, aK as Less, aL as LessEqual, aM as LinSpace, aO as Log, aP as Log1p, dM as LogSoftmax, aZ as LogicalAnd, a_ as LogicalNot, a$ as LogicalOr, aV as Max, b0 as MaxPool, b1 as MaxPool3D, dP as MaxPool3DGrad, dO as MaxPoolGrad, b2 as MaxPoolWithArgmax, b3 as Maximum, b4 as Mean, b7 as Min, b8 as Minimum, b9 as MirrorPad, ba as Mod, bb as Multinomial, cl as Multiply, aT as Neg, b$ as NonMaxSuppressionV3, c1 as NonMaxSuppressionV4, c0 as NonMaxSuppressionV5, bc as NotEqual, dg as OP_SCOPE_SUFFIX, O as OneHot, bd as OnesLike, bC as Pack, be as PadV2, dQ as Pool, bg as Pow, cm as Prelu, bh as Prod, bj as Range, da as Rank, bk as Real, R as RealDiv, bl as Reciprocal, cn as Relu, co as Relu6, cd as Reshape, c2 as ResizeBilinear, dS as ResizeBilinearGrad, c3 as ResizeNearestNeighbor, dR as ResizeNearestNeighborGrad, bm as Reverse, b_ as RotateWithOffset, bn as Round, bo as Rsqrt, bJ as ScatterNd, av as Select, bq as Selu, aa as Sigmoid, bs as Sign, bt as Sin, bu as Sinh, ab as Slice, bv as Softmax, aU as Softplus, bf as SpaceToBatchND, bK as SparseToDense, by as SplitV, bz as Sqrt, cq as Square, bA as SquaredDifference, cr as Step, bD as StridedSlice, aW as Sub, cs as Sum, bE as Tan, ac as Tanh, T as Tensor, br as TensorBuffer, ag as Tile, bF as TopK, c4 as Transform, G as Transpose, bG as Unique, bH as Unpack, d3 as UnsortedSegmentSum, aS as Variable, aw as ZerosLike, bX as _FusedMatMul, dv as backend, aC as buffer, j as cast, c as clone, d as complex, dC as copyRegisteredKernels, cB as deprecationWarn, d9 as device_util, dj as disableDeprecationWarnings, c5 as dispose, dk as disposeVariables, b as elu, di as enableDebugMode, dh as enableProdMode, cy as engine, e as env, dt as findBackend, du as findBackendFactory, dr as getBackend, dx as getGradient, L as getKernel, dy as getKernelsForBackend, k as keep, l as leakyRelu, dl as memory, m as mul, z as op, p as prelu, de as print, dm as profile, dq as ready, cD as registerBackend, dz as registerGradient, ct as registerKernel, a as relu, r as relu6, ds as removeBackend, i as reshape, d8 as scatter_util, dp as setBackend, dw as setPlatform, df as step, s as sum, db as sumOutType, g as tensor, d7 as tensor_util, h as tidy, dn as time, dB as unregisterGradient, dA as unregisterKernel, cI as upcastType, d6 as util} from "../common/fused_util-15f1054e.js";
import {bc as browserHTTPRequest, bg as http, bh as isHTTPScheme, bi as loadWeights, bj as weightsLoaderFactory, ai as oneHot, aD as transpose, aF as matMul, X as concat, h as add, Z as slice, x as sigmoid, l as tanh, aK as batchNorm, bk as customGrad, C as neg, q as softplus, av as logicalAnd, at as logicalOr, au as logicalNot, ah as ones, aT as mean, n as square, b as sub, b9 as pad, b8 as spaceToBatchND, a3 as avgPool, a2 as maxPool, b7 as batchToSpaceND, bl as RandGamma, bm as MPRandGauss, a$ as reverse, a5 as depthwiseConv2d, a9 as conv2d, an as whereAsync, aZ as squeeze, b0 as gather, V as scalar, c as div, p as pow, G as floor, af as randomUniform, a8 as conv2d$1, a7 as depthwiseConv2d$1, aC as matMul$1, bn as variableGrads, ab as zerosLike, o as sqrt, al as fill, U as abs, m as maximum, bo as nonMaxSuppressionV3Impl, bp as nonMaxSuppressionV4Impl, bq as nonMaxSuppressionV5Impl, br as whereImpl} from "../common/ops-3edf0e7e.js";
export {bt as Reduction, U as abs, T as acos, S as acosh, h as add, g as addN, aR as all, aQ as any, aP as argMax, aO as argMin, R as asin, Q as asinh, P as atan, O as atan2, N as atanh, a3 as avgPool, a0 as avgPool3d, aK as batchNorm, b7 as batchToSpaceND, aM as bincount, b5 as broadcastTo, bs as browser, M as ceil, k as clipByValue, X as concat, be as concat2d, aa as conv1d, a9 as conv2d, a6 as conv2dTranspose, a4 as conv3d, L as cos, K as cosh, bH as cosineWindow, aN as cumsum, bk as customGrad, aL as denseBincount, b6 as depthToSpace, a5 as depthwiseConv2d, _ as dilation2d, c as div, d as divNoNan, aE as einsum, bG as enclosingPowerOfTwo, aB as equal, J as erf, I as exp, bb as expandDims, H as expm1, bC as eye, b4 as fft, al as fill, G as floor, f as floorDiv, b0 as gather, aV as gatherND, bu as grad, bv as grads, az as greater, ay as greaterEqual, b3 as ifft, D as imag, ao as image, b1 as irfft, i as isNaN, ax as less, aw as lessEqual, by as linalg, ak as linspace, aJ as localResponseNormalization, F as log, E as log1p, aH as logSoftmax, bD as logSumExp, av as logicalAnd, au as logicalNot, at as logicalOr, bz as losses, aF as matMul, aU as max, a2 as maxPool, $ as maxPool3d, a1 as maxPoolWithArgmax, m as maximum, aT as mean, aS as min, a as minimum, ba as mirrorPad, e as mod, aj as multinomial, C as neg, bF as norm, aA as notEqual, ai as oneHot, ah as ones, ag as onesLike, b9 as pad, p as pow, j as prod, af as randomUniform, ae as range, A as real, B as reciprocal, a$ as reverse, b2 as rfft, z as round, r as rsqrt, V as scalar, aW as scatterND, y as selu, am as setdiff1dAsync, x as sigmoid, v as sign, bB as signal, w as sin, u as sinh, Z as slice, aI as softmax, q as softplus, b8 as spaceToBatchND, aG as sparseToDense, bA as spectral, aX as split, o as sqrt, n as square, s as squaredDifference, aZ as squeeze, W as stack, a_ as stridedSlice, b as sub, t as tan, l as tanh, ar as tensor1d, bd as tensor2d, bE as tensor3d, aY as tile, aq as topk, aD as transpose, ad as truncatedNormal, ap as unique, Y as unstack, bw as valueAndGrad, bx as valueAndGrads, bn as variableGrads, as as where, an as whereAsync, ac as zeros, ab as zerosLike} from "../common/ops-3edf0e7e.js";
export {n as backend_util, o as gather_util, s as slice_util} from "../common/backend_util-6cfede22.js";
import "../common/_commonjsHelpers-798ad6a7.js";
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const DEFAULT_FILE_NAME_PREFIX = "model";
const DEFAULT_JSON_EXTENSION_NAME = ".json";
const DEFAULT_WEIGHT_DATA_EXTENSION_NAME = ".weights.bin";
function defer(f2) {
  return new Promise((resolve) => setTimeout(resolve)).then(f2);
}
class BrowserDownloads {
  constructor(fileNamePrefix) {
    if (!env().getBool("IS_BROWSER")) {
      throw new Error("browserDownloads() cannot proceed because the current environment is not a browser.");
    }
    if (fileNamePrefix.startsWith(BrowserDownloads.URL_SCHEME)) {
      fileNamePrefix = fileNamePrefix.slice(BrowserDownloads.URL_SCHEME.length);
    }
    if (fileNamePrefix == null || fileNamePrefix.length === 0) {
      fileNamePrefix = DEFAULT_FILE_NAME_PREFIX;
    }
    this.modelTopologyFileName = fileNamePrefix + DEFAULT_JSON_EXTENSION_NAME;
    this.weightDataFileName = fileNamePrefix + DEFAULT_WEIGHT_DATA_EXTENSION_NAME;
  }
  async save(modelArtifacts) {
    if (typeof document === "undefined") {
      throw new Error("Browser downloads are not supported in this environment since `document` is not present");
    }
    const weightsURL = window.URL.createObjectURL(new Blob([modelArtifacts.weightData], {type: "application/octet-stream"}));
    if (modelArtifacts.modelTopology instanceof ArrayBuffer) {
      throw new Error("BrowserDownloads.save() does not support saving model topology in binary formats yet.");
    } else {
      const weightsManifest = [{
        paths: ["./" + this.weightDataFileName],
        weights: modelArtifacts.weightSpecs
      }];
      const modelTopologyAndWeightManifest = {
        modelTopology: modelArtifacts.modelTopology,
        format: modelArtifacts.format,
        generatedBy: modelArtifacts.generatedBy,
        convertedBy: modelArtifacts.convertedBy,
        weightsManifest
      };
      if (modelArtifacts.signature != null) {
        modelTopologyAndWeightManifest.signature = modelArtifacts.signature;
      }
      if (modelArtifacts.userDefinedMetadata != null) {
        modelTopologyAndWeightManifest.userDefinedMetadata = modelArtifacts.userDefinedMetadata;
      }
      if (modelArtifacts.modelInitializer != null) {
        modelTopologyAndWeightManifest.modelInitializer = modelArtifacts.modelInitializer;
      }
      const modelTopologyAndWeightManifestURL = window.URL.createObjectURL(new Blob([JSON.stringify(modelTopologyAndWeightManifest)], {type: "application/json"}));
      const jsonAnchor = this.jsonAnchor == null ? document.createElement("a") : this.jsonAnchor;
      jsonAnchor.download = this.modelTopologyFileName;
      jsonAnchor.href = modelTopologyAndWeightManifestURL;
      await defer(() => jsonAnchor.dispatchEvent(new MouseEvent("click")));
      if (modelArtifacts.weightData != null) {
        const weightDataAnchor = this.weightDataAnchor == null ? document.createElement("a") : this.weightDataAnchor;
        weightDataAnchor.download = this.weightDataFileName;
        weightDataAnchor.href = weightsURL;
        await defer(() => weightDataAnchor.dispatchEvent(new MouseEvent("click")));
      }
      return {modelArtifactsInfo: getModelArtifactsInfoForJSON(modelArtifacts)};
    }
  }
}
BrowserDownloads.URL_SCHEME = "downloads://";
class BrowserFiles {
  constructor(files) {
    if (files == null || files.length < 1) {
      throw new Error(`When calling browserFiles, at least 1 file is required, but received ${files}`);
    }
    this.files = files;
  }
  async load() {
    const jsonFile = this.files[0];
    const weightFiles = this.files.slice(1);
    return new Promise((resolve, reject) => {
      const jsonReader = new FileReader();
      jsonReader.onload = (event) => {
        const modelJSON = JSON.parse(event.target.result);
        const modelTopology = modelJSON.modelTopology;
        if (modelTopology == null) {
          reject(new Error(`modelTopology field is missing from file ${jsonFile.name}`));
          return;
        }
        if (weightFiles.length === 0) {
          resolve({modelTopology});
        }
        const weightsManifest = modelJSON.weightsManifest;
        if (weightsManifest == null) {
          reject(new Error(`weightManifest field is missing from file ${jsonFile.name}`));
          return;
        }
        let pathToFile;
        try {
          pathToFile = this.checkManifestAndWeightFiles(weightsManifest, weightFiles);
        } catch (err) {
          reject(err);
          return;
        }
        const weightSpecs = [];
        const paths = [];
        const perFileBuffers = [];
        weightsManifest.forEach((weightsGroup) => {
          weightsGroup.paths.forEach((path) => {
            paths.push(path);
            perFileBuffers.push(null);
          });
          weightSpecs.push(...weightsGroup.weights);
        });
        weightsManifest.forEach((weightsGroup) => {
          weightsGroup.paths.forEach((path) => {
            const weightFileReader = new FileReader();
            weightFileReader.onload = (event2) => {
              const weightData = event2.target.result;
              const index = paths.indexOf(path);
              perFileBuffers[index] = weightData;
              if (perFileBuffers.indexOf(null) === -1) {
                const result = {
                  modelTopology,
                  weightSpecs,
                  weightData: concatenateArrayBuffers(perFileBuffers),
                  format: modelJSON.format,
                  generatedBy: modelJSON.generatedBy,
                  convertedBy: modelJSON.convertedBy
                };
                if (modelJSON.signature != null) {
                  result.signature = modelJSON.signature;
                }
                if (modelJSON.userDefinedMetadata != null) {
                  result.userDefinedMetadata = modelJSON.userDefinedMetadata;
                }
                if (modelJSON.modelInitializer != null) {
                  result.modelInitializer = modelJSON.modelInitializer;
                }
                resolve(result);
              }
            };
            weightFileReader.onerror = (error) => reject(`Failed to weights data from file of path '${path}'.`);
            weightFileReader.readAsArrayBuffer(pathToFile[path]);
          });
        });
      };
      jsonReader.onerror = (error) => reject(`Failed to read model topology and weights manifest JSON from file '${jsonFile.name}'. BrowserFiles supports loading Keras-style tf.Model artifacts only.`);
      jsonReader.readAsText(jsonFile);
    });
  }
  checkManifestAndWeightFiles(manifest, files) {
    const basenames = [];
    const fileNames = files.map((file) => basename(file.name));
    const pathToFile = {};
    for (const group of manifest) {
      group.paths.forEach((path) => {
        const pathBasename = basename(path);
        if (basenames.indexOf(pathBasename) !== -1) {
          throw new Error(`Duplicate file basename found in weights manifest: '${pathBasename}'`);
        }
        basenames.push(pathBasename);
        if (fileNames.indexOf(pathBasename) === -1) {
          throw new Error(`Weight file with basename '${pathBasename}' is not provided.`);
        } else {
          pathToFile[path] = files[fileNames.indexOf(pathBasename)];
        }
      });
    }
    if (basenames.length !== files.length) {
      throw new Error(`Mismatch in the number of files in weights manifest (${basenames.length}) and the number of weight files provided (${files.length}).`);
    }
    return pathToFile;
  }
}
const browserDownloadsRouter = (url) => {
  if (!env().getBool("IS_BROWSER")) {
    return null;
  } else {
    if (!Array.isArray(url) && url.startsWith(BrowserDownloads.URL_SCHEME)) {
      return browserDownloads(url.slice(BrowserDownloads.URL_SCHEME.length));
    } else {
      return null;
    }
  }
};
IORouterRegistry.registerSaveRouter(browserDownloadsRouter);
function browserDownloads(fileNamePrefix = "model") {
  return new BrowserDownloads(fileNamePrefix);
}
function browserFiles(files) {
  return new BrowserFiles(files);
}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class PassthroughLoader {
  constructor(modelArtifacts) {
    this.modelArtifacts = modelArtifacts;
  }
  async load() {
    return this.modelArtifacts;
  }
}
class PassthroughSaver {
  constructor(saveHandler) {
    this.saveHandler = saveHandler;
  }
  async save(modelArtifacts) {
    return this.saveHandler(modelArtifacts);
  }
}
function fromMemory(modelArtifacts, weightSpecs, weightData, trainingConfig) {
  if (arguments.length === 1) {
    const isModelArtifacts = modelArtifacts.modelTopology != null || modelArtifacts.weightSpecs != null;
    if (isModelArtifacts) {
      return new PassthroughLoader(modelArtifacts);
    } else {
      console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release.");
      return new PassthroughLoader({modelTopology: modelArtifacts});
    }
  } else {
    console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release.");
    return new PassthroughLoader({
      modelTopology: modelArtifacts,
      weightSpecs,
      weightData,
      trainingConfig
    });
  }
}
function withSaveHandler(saveHandler) {
  return new PassthroughSaver(saveHandler);
}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var io = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  browserFiles,
  browserHTTPRequest,
  concatenateArrayBuffers,
  decodeWeights,
  encodeWeights,
  fromMemory,
  getLoadHandlers,
  getModelArtifactsInfoForJSON,
  getSaveHandlers,
  http,
  isHTTPScheme,
  loadWeights,
  registerLoadRouter,
  registerSaveRouter,
  weightsLoaderFactory,
  withSaveHandler,
  copyModel,
  listModels,
  moveModel,
  removeModel
});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function confusionMatrix_(labels, predictions, numClasses) {
  const $labels = convertToTensor(labels, "labels", "confusionMatrix");
  const $predictions = convertToTensor(predictions, "predictions", "confusionMatrix");
  assert(numClasses == null || numClasses > 0 && Number.isInteger(numClasses), () => `If provided, numClasses must be a positive integer, but got ${numClasses}`);
  assert($labels.rank === 1, () => `Expected the rank of labels to be 1, but got ${$labels.rank}`);
  assert($predictions.rank === 1, () => `Expected the rank of predictions to be 1, but got ${$predictions.rank}`);
  assert($labels.shape[0] === $predictions.shape[0], () => `Mismatch in the number of examples: ${$labels.shape[0]} vs. ${$predictions.shape[0]}. Labels and predictions should have the same number of elements.`);
  assert(numClasses > 0 && Number.isInteger(numClasses), () => `numClasses is required to be a positive integer, but got ${numClasses}`);
  const oneHotLabels = oneHot(cast($labels, "int32"), numClasses);
  const oneHotPredictions = oneHot(cast($predictions, "int32"), numClasses);
  const oneHotLabelsT = transpose(oneHotLabels);
  const product = matMul(oneHotLabelsT, oneHotPredictions);
  return cast(product, "int32");
}
const confusionMatrix = op({confusionMatrix_});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var math = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  confusionMatrix
});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class Serializable {
  getClassName() {
    return this.constructor.className;
  }
  static fromConfig(cls, config) {
    return new cls(config);
  }
}
class SerializationMap {
  constructor() {
    this.classNameMap = {};
  }
  static getMap() {
    if (SerializationMap.instance == null) {
      SerializationMap.instance = new SerializationMap();
    }
    return SerializationMap.instance;
  }
  static register(cls) {
    SerializationMap.getMap().classNameMap[cls.className] = [cls, cls.fromConfig];
  }
}
function registerClass(cls) {
  assert(cls.className != null, () => `Class being registered does not have the static className property defined.`);
  assert(typeof cls.className === "string", () => `className is required to be a string, but got type ` + typeof cls.className);
  assert(cls.className.length > 0, () => `Class being registered has an empty-string as its className, which is disallowed.`);
  SerializationMap.register(cls);
}
var serialization = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Serializable,
  SerializationMap,
  registerClass
});
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const TEST_EPSILON_FLOAT32 = 1e-3;
const TEST_EPSILON_FLOAT16 = 0.1;
function expectArraysClose(actual, expected, epsilon) {
  if (epsilon == null) {
    epsilon = testEpsilon();
  }
  return expectArraysPredicate(actual, expected, (a10, b11) => areClose(a10, b11, epsilon));
}
function testEpsilon() {
  return ENGINE.backend.floatPrecision() === 32 ? TEST_EPSILON_FLOAT32 : TEST_EPSILON_FLOAT16;
}
function expectArraysPredicate(actual, expected, predicate) {
  let checkClassType = true;
  if (isTypedArray(actual) || isTypedArray(expected)) {
    checkClassType = false;
  }
  if (isTypedArray(actual) && isTypedArray(expected)) {
    checkClassType = true;
  }
  if (checkClassType) {
    const aType = actual.constructor.name;
    const bType = expected.constructor.name;
    if (aType !== bType) {
      throw new Error(`Arrays are of different type. Actual: ${aType}. Expected: ${bType}`);
    }
  }
  if (Array.isArray(actual) && Array.isArray(expected)) {
    const actualShape = inferShape(actual);
    const expectedShape = inferShape(expected);
    if (!arraysEqual(actualShape, expectedShape)) {
      throw new Error(`Arrays have different shapes. Actual: [${actualShape}]. Expected: [${expectedShape}]`);
    }
  }
  const actualFlat = isTypedArray(actual) ? actual : flatten(actual);
  const expectedFlat = isTypedArray(expected) ? expected : flatten(expected);
  if (actualFlat.length !== expectedFlat.length) {
    throw new Error(`Arrays have different lengths actual: ${actualFlat.length} vs expected: ${expectedFlat.length}.
Actual:   ${actualFlat}.
Expected: ${expectedFlat}.`);
  }
  for (let i3 = 0; i3 < expectedFlat.length; ++i3) {
    const a10 = actualFlat[i3];
    const e3 = expectedFlat[i3];
    if (!predicate(a10, e3)) {
      throw new Error(`Arrays differ: actual[${i3}] = ${a10}, expected[${i3}] = ${e3}.
Actual:   ${actualFlat}.
Expected: ${expectedFlat}.`);
    }
  }
}
function expectPromiseToFail(fn, done) {
  fn().then(() => done.fail(), () => done());
}
function expectArraysEqual(actual, expected) {
  const exp = typeof expected === "string" || typeof expected === "number" || typeof expected === "boolean" ? [expected] : expected;
  if (isString(actual) || isString(actual[0]) || isString(expected) || isString(expected[0])) {
    return expectArraysPredicate(actual, exp, (a10, b11) => a10 == b11);
  }
  return expectArraysPredicate(actual, expected, (a10, b11) => areClose(a10, b11, 0));
}
function expectNumbersClose(a10, e3, epsilon) {
  if (epsilon == null) {
    epsilon = testEpsilon();
  }
  if (!areClose(a10, e3, epsilon)) {
    throw new Error(`Numbers differ: actual === ${a10}, expected === ${e3}`);
  }
}
function areClose(a10, e3, epsilon) {
  if (!isFinite(a10) && !isFinite(e3)) {
    return true;
  }
  if (isNaN(a10) || isNaN(e3) || Math.abs(a10 - e3) > epsilon) {
    return false;
  }
  return true;
}
function expectValuesInRange(actual, low, high) {
  for (let i3 = 0; i3 < actual.length; i3++) {
    if (actual[i3] < low || actual[i3] > high) {
      throw new Error(`Value out of range:${actual[i3]} low: ${low}, high: ${high}`);
    }
  }
}
function expectArrayBuffersEqual(actual, expected) {
  expect(new Float32Array(actual)).toEqual(new Float32Array(expected));
}
function encodeStrings(a10) {
  for (let i3 = 0; i3 < a10.length; i3++) {
    const val = a10[i3];
    if (Array.isArray(val)) {
      encodeStrings(val);
    } else {
      a10[i3] = encodeString(val);
    }
  }
  return a10;
}
var test_util = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  TEST_EPSILON_FLOAT16,
  expectArraysClose,
  testEpsilon,
  expectPromiseToFail,
  expectArraysEqual,
  expectNumbersClose,
  expectValuesInRange,
  expectArrayBuffersEqual,
  encodeStrings
});
/** @license See the LICENSE file. */
const version = "3.4.0";
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function basicLSTMCell_(forgetBias, lstmKernel, lstmBias, data, c8, h3) {
  const $forgetBias = convertToTensor(forgetBias, "forgetBias", "basicLSTMCell");
  const $lstmKernel = convertToTensor(lstmKernel, "lstmKernel", "basicLSTMCell");
  const $lstmBias = convertToTensor(lstmBias, "lstmBias", "basicLSTMCell");
  const $data = convertToTensor(data, "data", "basicLSTMCell");
  const $c = convertToTensor(c8, "c", "basicLSTMCell");
  const $h = convertToTensor(h3, "h", "basicLSTMCell");
  const combined = concat([$data, $h], 1);
  const weighted = matMul(combined, $lstmKernel);
  const res = add(weighted, $lstmBias);
  const batchSize = res.shape[0];
  const sliceCols = res.shape[1] / 4;
  const sliceSize = [batchSize, sliceCols];
  const i3 = slice(res, [0, 0], sliceSize);
  const j3 = slice(res, [0, sliceCols], sliceSize);
  const f2 = slice(res, [0, sliceCols * 2], sliceSize);
  const o3 = slice(res, [0, sliceCols * 3], sliceSize);
  const newC = add(mul(sigmoid(i3), tanh(j3)), mul($c, sigmoid(add($forgetBias, f2))));
  const newH = mul(tanh(newC), sigmoid(o3));
  return [newC, newH];
}
const basicLSTMCell = op({basicLSTMCell_});
function batchNorm2d_(x2, mean2, variance, offset, scale, varianceEpsilon) {
  const $x = convertToTensor(x2, "x", "batchNorm");
  const $mean = convertToTensor(mean2, "mean", "batchNorm");
  const $variance = convertToTensor(variance, "variance", "batchNorm");
  let $scale;
  if (scale != null) {
    $scale = convertToTensor(scale, "scale", "batchNorm");
  }
  let $offset;
  if (offset != null) {
    $offset = convertToTensor(offset, "offset", "batchNorm");
  }
  assert($x.rank === 2, () => `Error in batchNorm2D: x must be rank 2 but got rank ${$x.rank}.`);
  assert($mean.rank === 2 || $mean.rank === 1, () => `Error in batchNorm2D: mean must be rank 2 or rank 1 but got rank ${$mean.rank}.`);
  assert($variance.rank === 2 || $variance.rank === 1, () => `Error in batchNorm2D: variance must be rank 2 or rank 1 but got rank ${$variance.rank}.`);
  if ($scale != null) {
    assert($scale.rank === 2 || $scale.rank === 1, () => `Error in batchNorm2D: scale must be rank 2 or rank 1 but got rank ${$scale.rank}.`);
  }
  if ($offset != null) {
    assert($offset.rank === 2 || $offset.rank === 1, () => `Error in batchNorm2D: offset must be rank 2 or rank 1 but got rank ${$offset.rank}.`);
  }
  return batchNorm($x, $mean, $variance, $offset, $scale, varianceEpsilon);
}
const batchNorm2d = op({batchNorm2d_});
function batchNorm3d_(x2, mean2, variance, offset, scale, varianceEpsilon) {
  const $x = convertToTensor(x2, "x", "batchNorm");
  const $mean = convertToTensor(mean2, "mean", "batchNorm");
  const $variance = convertToTensor(variance, "variance", "batchNorm");
  let $scale;
  if (scale != null) {
    $scale = convertToTensor(scale, "scale", "batchNorm");
  }
  let $offset;
  if (offset != null) {
    $offset = convertToTensor(offset, "offset", "batchNorm");
  }
  assert($x.rank === 3, () => `Error in batchNorm3D: x must be rank 3 but got rank ${$x.rank}.`);
  assert($mean.rank === 3 || $mean.rank === 1, () => `Error in batchNorm3D: mean must be rank 3 or rank 1 but got rank ${$mean.rank}.`);
  assert($variance.rank === 3 || $variance.rank === 1, () => `Error in batchNorm3D: variance must be rank 3 or rank 1 but got rank ${$variance.rank}.`);
  if ($scale != null) {
    assert($scale.rank === 3 || $scale.rank === 1, () => `Error in batchNorm3D: scale must be rank 3 or rank 1 but got rank ${$scale.rank}.`);
  }
  if ($offset != null) {
    assert($offset.rank === 3 || $offset.rank === 1, () => `Error in batchNorm3D: offset must be rank 3 or rank 1 but got rank ${$offset.rank}.`);
  }
  return batchNorm($x, $mean, $variance, $offset, $scale, varianceEpsilon);
}
const batchNorm3d = op({batchNorm3d_});
function batchNorm4d_(x2, mean2, variance, offset, scale, varianceEpsilon) {
  const $x = convertToTensor(x2, "x", "batchNorm");
  const $mean = convertToTensor(mean2, "mean", "batchNorm");
  const $variance = convertToTensor(variance, "variance", "batchNorm");
  let $scale;
  if (scale != null) {
    $scale = convertToTensor(scale, "scale", "batchNorm");
  }
  let $offset;
  if (offset != null) {
    $offset = convertToTensor(offset, "offset", "batchNorm");
  }
  assert($x.rank === 4, () => `Error in batchNorm4D: x must be rank 4 but got rank ${$x.rank}.`);
  assert($mean.rank === 4 || $mean.rank === 1, () => `Error in batchNorm4D: mean must be rank 4 or rank 1 but got rank ${$mean.rank}.`);
  assert($variance.rank === 4 || $variance.rank === 1, () => `Error in batchNorm4D: variance must be rank 4 or rank 1 but got rank ${$variance.rank}.`);
  if ($scale != null) {
    assert($scale.rank === 4 || $scale.rank === 1, () => `Error in batchNorm4D: scale must be rank 4 or rank 1 but got rank ${$scale.rank}.`);
  }
  if ($offset != null) {
    assert($offset.rank === 4 || $offset.rank === 1, () => `Error in batchNorm4D: offset must be rank 4 or rank 1 but got rank ${$offset.rank}.`);
  }
  return batchNorm($x, $mean, $variance, $offset, $scale, varianceEpsilon);
}
const batchNorm4d = op({batchNorm4d_});
function concat1d_(tensors) {
  return concat(tensors, 0);
}
const concat1d = op({concat1d_});
function concat3d_(tensors, axis) {
  return concat(tensors, axis);
}
const concat3d = op({concat3d_});
function concat4d_(tensors, axis) {
  return concat(tensors, axis);
}
const concat4d = op({concat4d_});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function conv3DBackpropInput_(xShape, dy2, filter, strides, pad2) {
  assert(xShape.length === dy2.rank, () => `Length of inShape (${xShape.length}) and rank of dy (${dy2.rank}) must match`);
  let xShape5D = xShape;
  let dy5D = dy2;
  let reshapedTo5D = false;
  if (dy2.rank === 4) {
    reshapedTo5D = true;
    dy5D = reshape(dy2, [1, dy2.shape[0], dy2.shape[1], dy2.shape[2], dy2.shape[3]]);
    xShape5D = [1, xShape[0], xShape[1], xShape[2], xShape[3]];
  }
  const inDepth = xShape5D[4];
  const outDepth = dy5D.shape[4];
  assert(xShape5D.length === 5, () => `Error in conv3dDerInput: inShape must be length 5, but got length ${xShape5D.length}.`);
  assert(dy5D.rank === 5, () => `Error in conv3dDerInput: dy must be rank 5, but got rank ${dy5D.rank}`);
  assert(filter.rank === 5, () => `Error in conv3dDerInput: filter must be rank 5, but got rank ${filter.rank}`);
  assert(inDepth === filter.shape[3], () => `Error in conv3dDerInput: depth of input (${inDepth}) must match input depth for filter ${filter.shape[3]}.`);
  assert(outDepth === filter.shape[4], () => `Error in conv3dDerInput: depth of output (${outDepth}) must match output depth for filter ${filter.shape[4]}.`);
  const inputs = {dy: dy5D, filter};
  const attrs = {pad: pad2, strides, inputShape: xShape5D};
  const res = ENGINE.runKernel(Conv3DBackpropInputV2, inputs, attrs);
  if (reshapedTo5D) {
    return reshape(res, [res.shape[1], res.shape[2], res.shape[3], res.shape[4]]);
  }
  return res;
}
const conv3DBackpropInput = op({conv3DBackpropInput_});
function conv3dTranspose_(x2, filter, outputShape, strides, pad2) {
  const $x = convertToTensor(x2, "x", "conv3dTranspose");
  const $filter = convertToTensor(filter, "filter", "conv3dTranspose");
  return conv3DBackpropInput(outputShape, $x, $filter, strides, pad2);
}
const conv3dTranspose = op({conv3dTranspose_});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function diag_(x2) {
  const $x = convertToTensor(x2, "x", "diag");
  const inputs = {x: $x};
  return ENGINE.runKernel(Diag, inputs);
}
const diag = op({diag_});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function dot_(t1, t2) {
  const $t1 = convertToTensor(t1, "t1", "dot");
  const $t2 = convertToTensor(t2, "t2", "dot");
  assert(($t1.rank === 1 || $t1.rank === 2) && ($t2.rank === 1 || $t2.rank === 2), () => `Error in dot: inputs must all be rank 1 or 2, but got ranks ${$t1.rank} and ${$t2.rank}.`);
  const t1Inner = $t1.rank === 1 ? $t1.size : $t1.shape[1];
  const t2Inner = $t2.rank === 1 ? $t2.size : $t2.shape[0];
  assert(t1Inner === t2Inner, () => `Error in dot: inner dimensions of inputs must match, but got ${t1Inner} and ${t2Inner}.`);
  if ($t1.rank === 1 && $t2.rank === 1) {
    const t12D = reshape($t1, [1, -1]);
    const t22D = reshape($t2, [-1, 1]);
    const t1t2 = matMul(t12D, t22D);
    return reshape(t1t2, []);
  } else if ($t1.rank === 1 && $t2.rank === 2) {
    const t12D = reshape($t1, [1, -1]);
    const t22D = reshape($t2, [$t2.shape[0], $t2.shape[1]]);
    const t1t2 = matMul(t12D, t22D);
    return reshape(t1t2, [t1t2.size]);
  } else if ($t1.rank === 2 && $t2.rank === 1) {
    const t22D = reshape($t2, [-1, 1]);
    const t1t2 = matMul($t1, t22D);
    return reshape(t1t2, [t1t2.size]);
  } else {
    const t22D = reshape($t2, [$t2.shape[0], $t2.shape[1]]);
    const t1t2 = matMul($t1, t22D);
    return t1t2;
  }
}
const dot = op({dot_});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function isFinite_(x2) {
  const $x = convertToTensor(x2, "x", "isFinite");
  const inputs = {x: $x};
  return ENGINE.runKernel(IsFinite, inputs);
}
const isFinite$1 = op({isFinite_});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function isInf_(x2) {
  const $x = convertToTensor(x2, "x", "isInf");
  const inputs = {x: $x};
  return ENGINE.runKernel(IsInf, inputs);
}
const isInf = op({isInf_});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function logSigmoid_(x2) {
  const $x = convertToTensor(x2, "x", "logSigmoid");
  const customOp = customGrad((x3) => {
    const value = neg(softplus(neg(x3)));
    const gradFunc = (dy2) => {
      const derX = mul(dy2, sigmoid(neg(x3)));
      return derX;
    };
    return {value, gradFunc};
  });
  return customOp($x);
}
const logSigmoid = op({logSigmoid_});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function logicalXor_(a10, b11) {
  const $a = convertToTensor(a10, "a", "logicalXor", "bool");
  const $b = convertToTensor(b11, "b", "logicalXor", "bool");
  assertAndGetBroadcastShape($a.shape, $b.shape);
  return logicalAnd(logicalOr(a10, b11), logicalNot(logicalAnd(a10, b11)));
}
const logicalXor = op({logicalXor_});
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function meshgrid(x2, y2, {indexing = "xy"} = {}) {
  if (indexing !== "xy" && indexing !== "ij") {
    throw new TypeError(`${indexing} is not a valid third argument to meshgrid`);
  }
  if (x2 === void 0) {
    return [];
  }
  let $x = convertToTensor(x2, "x", "meshgrid", x2 instanceof Tensor ? x2.dtype : "float32");
  if (y2 === void 0) {
    return [$x];
  }
  let $y = convertToTensor(y2, "y", "meshgrid", y2 instanceof Tensor ? y2.dtype : "float32");
  const w2 = sizeFromShape($x.shape);
  const h3 = sizeFromShape($y.shape);
  if (indexing === "xy") {
    $x = reshape($x, [1, -1]);
    $y = reshape($y, [-1, 1]);
    return [
      matMul(ones([h3, 1], $x.dtype), $x),
      matMul($y, ones([1, w2], $y.dtype))
    ];
  }
  $x = reshape($x, [-1, 1]);
  $y = reshape($y, [1, -1]);
  return [
    matMul($x, ones([1, h3], $x.dtype)),
    matMul(ones([w2, 1], $y.dtype), $y)
  ];
}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function moments_(x2, axis = null, keepDims = false) {
  x2 = convertToTensor(x2, "x", "moments");
  const axes = parseAxisParam(axis, x2.shape);
  const xMean = mean(x2, axes, keepDims);
  let keepDimsShape = xMean.shape;
  if (!keepDims) {
    keepDimsShape = expandShapeToKeepDim(xMean.shape, axes);
  }
  const devSquared = square(sub(cast(x2, "float32"), reshape(xMean, keepDimsShape)));
  const variance = mean(devSquared, axes, keepDims);
  return {mean: xMean, variance};
}
const moments = op({moments_});
function multiRNNCell_(lstmCells, data, c8, h3) {
  const $data = convertToTensor(data, "data", "multiRNNCell");
  const $c = convertToTensorArray(c8, "c", "multiRNNCell");
  const $h = convertToTensorArray(h3, "h", "multiRNNCell");
  let input = $data;
  const newStates = [];
  for (let i3 = 0; i3 < lstmCells.length; i3++) {
    const output = lstmCells[i3](input, $c[i3], $h[i3]);
    newStates.push(output[0]);
    newStates.push(output[1]);
    input = output[1];
  }
  const newC = [];
  const newH = [];
  for (let i3 = 0; i3 < newStates.length; i3 += 2) {
    newC.push(newStates[i3]);
    newH.push(newStates[i3 + 1]);
  }
  return [newC, newH];
}
const multiRNNCell = op({multiRNNCell_});
function outerProduct_(v1, v2) {
  const $v1 = convertToTensor(v1, "v1", "outerProduct");
  const $v2 = convertToTensor(v2, "v2", "outerProduct");
  assert($v1.rank === 1 && $v2.rank === 1, () => `Error in outerProduct: inputs must be rank 1, but got ranks ${$v1.rank} and ${$v2.rank}.`);
  const v12D = reshape($v1, [-1, 1]);
  const v22D = reshape($v2, [1, -1]);
  return matMul(v12D, v22D);
}
const outerProduct = op({outerProduct_});
function pad1d_(x2, paddings, constantValue = 0) {
  assert(paddings.length === 2, () => "Invalid number of paddings. Must be length of 2.");
  return pad(x2, [paddings], constantValue);
}
const pad1d = op({pad1d_});
function pad2d_(x2, paddings, constantValue = 0) {
  assert(paddings.length === 2 && paddings[0].length === 2 && paddings[1].length === 2, () => "Invalid number of paddings. Must be length of 2 each.");
  return pad(x2, paddings, constantValue);
}
const pad2d = op({pad2d_});
function pad3d_(x2, paddings, constantValue = 0) {
  assert(paddings.length === 3 && paddings[0].length === 2 && paddings[1].length === 2 && paddings[2].length === 2, () => "Invalid number of paddings. Must be length of 2 each.");
  return pad(x2, paddings, constantValue);
}
const pad3d = op({pad3d_});
function pad4d_(x2, paddings, constantValue = 0) {
  assert(paddings.length === 4 && paddings[0].length === 2 && paddings[1].length === 2 && paddings[2].length === 2 && paddings[3].length === 2, () => "Invalid number of paddings. Must be length of 2 each.");
  return pad(x2, paddings, constantValue);
}
const pad4d = op({pad4d_});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function pool_(input, windowShape, poolingType, pad2, dilations, strides) {
  if (dilations == null) {
    dilations = [1, 1];
  }
  if (strides == null) {
    strides = 1;
  }
  if (pad2 === 0) {
    pad2 = "valid";
  }
  const $x = convertToTensor(input, "x", "maxPool");
  let x4D = $x;
  let reshapedTo4D = false;
  if ($x.rank === 3) {
    reshapedTo4D = true;
    x4D = reshape($x, [1, $x.shape[0], $x.shape[1], $x.shape[2]]);
  }
  assert(eitherStridesOrDilationsAreOne(strides, dilations), () => `Error in pool: Either strides or dilations must be 1. Got strides ${strides} and dilations '${dilations}'`);
  const convInfo = computePool2DInfo(x4D.shape, windowShape, strides, dilations, pad2);
  const dilation = [convInfo.dilationHeight, convInfo.dilationWidth];
  let basePadding;
  if (pad2 === "same") {
    basePadding = withSpaceToBatchBasePaddings([convInfo.filterHeight, convInfo.filterWidth], dilation);
  } else {
    basePadding = [[0, 0], [0, 0]];
  }
  const isDilationOne = dilation[0] === 1 && dilation[1] === 1;
  const [adjustedPadding, adjustedCrops] = requiredSpaceToBatchPaddings([convInfo.inHeight, convInfo.inWidth], dilation, basePadding);
  const convertedPad = isDilationOne ? pad2 : "valid";
  const convertedX = isDilationOne ? x4D : spaceToBatchND(x4D, dilation, adjustedPadding);
  const forwardOp = poolingType === "avg" ? () => avgPool(convertedX, windowShape, strides, convertedPad) : () => maxPool(convertedX, windowShape, strides, convertedPad);
  const y2 = forwardOp();
  const res = isDilationOne ? y2 : batchToSpaceND(y2, dilation, adjustedCrops);
  if (reshapedTo4D) {
    return reshape(res, [res.shape[1], res.shape[2], res.shape[3]]);
  }
  return res;
}
function requiredSpaceToBatchPaddings(inputShape, blockShape, basePadding) {
  const padStart = basePadding.map((b11) => b11[0]);
  const origPadEnd = basePadding.map((b11) => b11[1]);
  const fullInputShape = inputShape.concat(padStart, origPadEnd);
  const padEndExtra = blockShape.map((b11, i3) => (b11 - fullInputShape[i3] % b11) % b11);
  const padEnd = origPadEnd.map((s4, i3) => s4 + padEndExtra[i3]);
  const paddings = blockShape.map((_3, i3) => [padStart[i3], padEnd[i3]]);
  const crops = blockShape.map((_3, i3) => [0, padEndExtra[i3]]);
  return [paddings, crops];
}
function withSpaceToBatchBasePaddings(filterShape, dilation) {
  const dilatedFilterShape = filterShape.map((s4, i3) => {
    return s4 + (s4 - 1) * (dilation[i3] - 1);
  });
  const padExtraShape = dilatedFilterShape.map((s4) => s4 - 1);
  const padExtraStart = padExtraShape.map((s4) => Math.floor(s4 / 2));
  const padExtraEnd = padExtraShape.map((s4, i3) => s4 - padExtraStart[i3]);
  return padExtraShape.map((_3, i3) => {
    return [padExtraStart[i3], padExtraEnd[i3]];
  });
}
const pool = op({pool_});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function rand_(shape, randFunction, dtype) {
  const size = sizeFromShape(shape);
  let values = null;
  if (dtype == null || dtype === "float32") {
    values = new Float32Array(size);
  } else if (dtype === "int32") {
    values = new Int32Array(size);
  } else if (dtype === "bool") {
    values = new Uint8Array(size);
  } else {
    throw new Error(`Unknown data type ${dtype}`);
  }
  for (let i3 = 0; i3 < size; i3++) {
    values[i3] = randFunction();
  }
  return ENGINE.makeTensor(values, shape, dtype);
}
const rand = op({rand_});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function randomGamma_(shape, alpha, beta = 1, dtype = "float32", seed) {
  if (beta == null) {
    beta = 1;
  }
  if (dtype == null) {
    dtype = "float32";
  }
  if (dtype !== "float32" && dtype !== "int32") {
    throw new Error(`Unsupported data type ${dtype}`);
  }
  const rgamma = new RandGamma(alpha, beta, dtype, seed);
  const res = buffer(shape, dtype);
  for (let i3 = 0; i3 < res.values.length; i3++) {
    res.values[i3] = rgamma.nextValue();
  }
  return res.toTensor();
}
const randomGamma = op({randomGamma_});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function randomNormal_(shape, mean2 = 0, stdDev = 1, dtype, seed) {
  if (dtype != null && dtype === "bool") {
    throw new Error(`Unsupported data type ${dtype}`);
  }
  const randGauss = new MPRandGauss(mean2, stdDev, dtype, false, seed);
  const res = buffer(shape, dtype);
  for (let i3 = 0; i3 < res.values.length; i3++) {
    res.values[i3] = randGauss.nextValue();
  }
  return res.toTensor();
}
const randomNormal = op({randomNormal_});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function reverse1d_(x2) {
  const $x = convertToTensor(x2, "x", "reverse");
  assert($x.rank === 1, () => `Error in reverse1D: x must be rank 1 but got rank ${$x.rank}.`);
  return reverse($x, 0);
}
const reverse1d = op({reverse1d_});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function reverse2d_(x2, axis) {
  const $x = convertToTensor(x2, "x", "reverse");
  assert($x.rank === 2, () => `Error in reverse2D: x must be rank 2 but got rank ${$x.rank}.`);
  return reverse($x, axis);
}
const reverse2d = op({reverse2d_});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function reverse3d_(x2, axis) {
  const $x = convertToTensor(x2, "x", "reverse");
  assert($x.rank === 3, () => `Error in reverse3D: x must be rank 3 but got rank ${$x.rank}.`);
  return reverse($x, axis);
}
const reverse3d = op({reverse3d_});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function reverse4d_(x2, axis) {
  const $x = convertToTensor(x2, "x", "reverse");
  assert($x.rank === 4, () => `Error in reverse4D: x must be rank 4 but got rank ${$x.rank}.`);
  return reverse($x, axis);
}
const reverse4d = op({reverse4d_});
function separableConv2d_(x2, depthwiseFilter, pointwiseFilter, strides, pad2, dilation = [1, 1], dataFormat = "NHWC") {
  const $x = convertToTensor(x2, "x", "separableConv2d");
  const $depthwiseFilter = convertToTensor(depthwiseFilter, "depthwiseFilter", "separableConv2d");
  const $pointwiseFilter = convertToTensor(pointwiseFilter, "pointwiseFilter", "separableConv2d");
  let x4D = $x;
  let reshapedTo4D = false;
  if ($x.rank === 3) {
    reshapedTo4D = true;
    x4D = reshape($x, [1, $x.shape[0], $x.shape[1], $x.shape[2]]);
  }
  if (dataFormat === "NCHW") {
    throw new Error("separableConv2d currently does not support dataFormat NCHW; only NHWC is supported");
  }
  assert(x4D.rank === 4, () => `Error in separableConv2d: input must be rank 4, but got rank ${x4D.rank}.`);
  assert($depthwiseFilter.rank === 4, () => `Error in separableConv2d: depthwise filter must be rank 4, but got rank ${$depthwiseFilter.rank}.`);
  assert($pointwiseFilter.rank === 4, () => `Error in separableConv2d: pointwise filter must be rank 4, but got rank ${$depthwiseFilter.rank}.`);
  assert($pointwiseFilter.shape[0] === 1, () => `Error in separableConv2d: the first dimension of pointwise filter  must be 1, but got ${$pointwiseFilter.shape[0]}.`);
  assert($pointwiseFilter.shape[1] === 1, () => `Error in separableConv2d: the second dimension of pointwise filter must be 1, but got ${$pointwiseFilter.shape[1]}.`);
  const inChannels = $depthwiseFilter.shape[2];
  const channelMultiplier = $depthwiseFilter.shape[3];
  assert($pointwiseFilter.shape[2] === inChannels * channelMultiplier, () => `Error in separableConv2d: the third dimension of pointwise filter must be ${inChannels * channelMultiplier}, but got ${$pointwiseFilter.shape[2]}.`);
  const depthwise = depthwiseConv2d(x4D, $depthwiseFilter, strides, pad2, dataFormat, dilation);
  const pointwiseStride = 1;
  const res = conv2d(depthwise, $pointwiseFilter, pointwiseStride, "valid", dataFormat);
  if (reshapedTo4D) {
    return reshape(res, [res.shape[1], res.shape[2], res.shape[3]]);
  }
  return res;
}
const separableConv2d = op({separableConv2d_});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function slice1d_(x2, begin, size) {
  const $x = convertToTensor(x2, "x", "slice1d");
  assert($x.rank === 1, () => `slice1d expects a rank-1 tensor, but got a rank-${$x.rank} tensor`);
  return slice($x, [begin], [size]);
}
const slice1d = op({slice1d_});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function slice2d_(x2, begin, size) {
  const $x = convertToTensor(x2, "x", "slice2d");
  assert($x.rank === 2, () => `slice2d expects a rank-2 tensor, but got a rank-${$x.rank} tensor`);
  return slice($x, begin, size);
}
const slice2d = op({slice2d_});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function slice3d_(x2, begin, size) {
  const $x = convertToTensor(x2, "x", "slice3d");
  assert($x.rank === 3, () => `slice3d expects a rank-3 tensor, but got a rank-${$x.rank} tensor`);
  return slice($x, begin, size);
}
const slice3d = op({slice3d_});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function slice4d_(x2, begin, size) {
  const $x = convertToTensor(x2, "x", "slice4d");
  assert($x.rank === 4, () => `slice4d expects a rank-4 tensor, but got a rank-${$x.rank} tensor`);
  return slice($x, begin, size);
}
const slice4d = op({slice4d_});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function tensor4d(values, shape, dtype) {
  assertNonNull(values);
  if (shape != null && shape.length !== 4) {
    throw new Error("tensor4d() requires shape to have four numbers");
  }
  const inferredShape = inferShape(values, dtype);
  if (inferredShape.length !== 4 && inferredShape.length !== 1) {
    throw new Error("tensor4d() requires values to be number[][][][] or flat/TypedArray");
  }
  if (inferredShape.length === 1 && shape == null) {
    throw new Error("tensor4d() requires shape to be provided when `values` are a flat array");
  }
  return makeTensor(values, shape, inferredShape, dtype);
}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function tensor5d(values, shape, dtype) {
  assertNonNull(values);
  if (shape != null && shape.length !== 5) {
    throw new Error("tensor5d() requires shape to have five numbers");
  }
  const inferredShape = inferShape(values, dtype);
  if (inferredShape.length !== 5 && inferredShape.length !== 1) {
    throw new Error("tensor5d() requires values to be number[][][][][] or flat/TypedArray");
  }
  if (inferredShape.length === 1 && shape == null) {
    throw new Error("tensor5d() requires shape to be provided when `values` are a flat array");
  }
  return makeTensor(values, shape, inferredShape, dtype);
}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function tensor6d(values, shape, dtype) {
  assertNonNull(values);
  if (shape != null && shape.length !== 6) {
    throw new Error("tensor6d() requires shape to have six numbers");
  }
  const inferredShape = inferShape(values, dtype);
  if (inferredShape.length !== 6 && inferredShape.length !== 1) {
    throw new Error("tensor6d() requires values to be number[][][][][][] or flat/TypedArray");
  }
  if (inferredShape.length === 1 && shape == null) {
    throw new Error("tensor6d() requires shape to be provided when `values` are a flat array");
  }
  shape = shape || inferredShape;
  return makeTensor(values, shape, inferredShape, dtype);
}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function unsortedSegmentSum_(x2, segmentIds, numSegments) {
  const $x = convertToTensor(x2, "x", "unsortedSegmentSum");
  const $segmentIds = convertToTensor(segmentIds, "segmentIds", "unsortedSegmentSum", "int32");
  assert(isInt(numSegments), () => "numSegments must be of dtype int");
  const inputs = {x: $x, segmentIds: $segmentIds};
  const attrs = {numSegments};
  return ENGINE.runKernel(UnsortedSegmentSum, inputs, attrs);
}
const unsortedSegmentSum = op({unsortedSegmentSum_});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function variable(initialValue, trainable = true, name, dtype) {
  return ENGINE.makeVariable(initialValue, trainable, name, dtype);
}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
async function booleanMaskAsync_(tensor2, mask, axis) {
  const $tensor = convertToTensor(tensor2, "tensor", "boolMask");
  const $mask = convertToTensor(mask, "mask", "boolMask", "bool");
  const axisFrom = axis == null ? 0 : axis;
  const maskDim = $mask.rank;
  const tensorShape = $tensor.shape;
  assert(maskDim > 0, () => "mask cannot be scalar");
  assertShapesMatch(tensorShape.slice(axisFrom, axisFrom + maskDim), $mask.shape, `mask's shape must match the first K dimensions of tensor's shape,`);
  let leadingSize = 1;
  for (let i3 = axisFrom; i3 < axisFrom + maskDim; i3++) {
    leadingSize *= tensorShape[i3];
  }
  const targetTensorShape = tensorShape.slice(0, axisFrom).concat([leadingSize], tensorShape.slice(axisFrom + maskDim));
  const reshapedTensor = reshape($tensor, targetTensorShape);
  const reshapedMask = reshape($mask, [-1]);
  const positivePositions = await whereAsync(reshapedMask);
  const indices = squeeze(positivePositions, [1]);
  const res = gather(reshapedTensor, indices, axisFrom);
  if (tensor2 !== $tensor) {
    $tensor.dispose();
  }
  if (mask !== $mask) {
    $mask.dispose();
  }
  indices.dispose();
  reshapedTensor.dispose();
  reshapedMask.dispose();
  positivePositions.dispose();
  return res;
}
const booleanMaskAsync = booleanMaskAsync_;
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function movingAverage_(v2, x2, decay, step, zeroDebias = true) {
  const $v = convertToTensor(v2, "v", "movingAverage");
  const $x = convertToTensor(x2, "x", "movingAverage");
  const $decay = convertToTensor(decay, "decay", "movingAverage");
  assertTypesMatch($v, $x);
  assert(arraysEqual($v.shape, $x.shape), () => "Shape mismatch in v and x");
  const one = scalar(1);
  const oneMinusDecay = sub(one, $decay);
  let update = mul(sub($x, $v), oneMinusDecay);
  if (zeroDebias) {
    assert(step != null, () => "When using zeroDebias: true, step is required.");
    const $step = convertToTensor(step, "step", "movingAverage");
    update = div(update, sub(one, pow($decay, $step)));
  }
  return add($v, update);
}
const movingAverage = op({movingAverage_});
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function getNoiseShape(x2, noiseShape) {
  if (noiseShape == null) {
    return x2.shape.slice();
  }
  if (arraysEqual(x2.shape, noiseShape)) {
    return noiseShape;
  }
  if (x2.shape.length === noiseShape.length) {
    const newDimension = [];
    for (let i3 = 0; i3 < x2.shape.length; i3++) {
      if (noiseShape[i3] == null && x2.shape[i3] != null) {
        newDimension.push(x2.shape[i3]);
      } else {
        newDimension.push(noiseShape[i3]);
      }
    }
    return newDimension;
  }
  return noiseShape;
}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function dropout_(x2, rate, noiseShape, seed) {
  const $x = convertToTensor(x2, "x", "dropout");
  assert($x.dtype === "float32", () => `x has to be a floating point tensor since it's going to be scaled, but got a ${$x.dtype} tensor instead.`);
  assert(rate >= 0 && rate < 1, () => `rate must be a float in the range [0, 1), but got ${rate}.`);
  if (rate === 0) {
    return x2 instanceof Tensor ? $x.clone() : $x;
  }
  const $noiseShape = getNoiseShape($x, noiseShape);
  const keepProb = 1 - rate;
  const multiplier = div(floor(add(randomUniform($noiseShape, 0, 1, "float32", seed), keepProb)), keepProb);
  return mul($x, multiplier);
}
const dropout = op({dropout_});
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
async function inTopKAsync_(predictions, targets, k3 = 1) {
  const $predictions = convertToTensor(predictions, "predictions", "inTopK");
  const $targets = convertToTensor(targets, "targets", "inTopK");
  assert($predictions.rank > 1, () => `inTopK() expects the predictions to be of rank 2 or higher, but got ${$predictions.rank}`);
  assert($predictions.rank - 1 === $targets.rank, () => `predictions rank should be 1 larger than targets rank, but got predictions rank ${$predictions.rank} and targets rank ${$targets.rank}`);
  assertShapesMatch($predictions.shape.slice(0, $predictions.shape.length - 1), $targets.shape, `predictions's shape should be align with the targets' shape, except the last dimension.`);
  const lastDim = $predictions.shape[$predictions.shape.length - 1];
  assert(k3 > 0 && k3 <= lastDim, () => `'k' passed to inTopK() must be > 0 && <= the predictions last dimension (${lastDim}), but got ${k3}`);
  const predictionsVals = await $predictions.data();
  const targetsVals = await $targets.data();
  const [batch, size] = [predictionsVals.length / lastDim, lastDim];
  const precision = getTypedArrayFromDType("bool", batch);
  for (let b11 = 0; b11 < batch; b11++) {
    const offset = b11 * size;
    const vals = predictionsVals.subarray(offset, offset + size);
    const valAndInd = [];
    for (let i3 = 0; i3 < vals.length; i3++) {
      valAndInd.push({value: vals[i3], index: i3});
    }
    valAndInd.sort((a10, b13) => b13.value - a10.value);
    precision[b11] = 0;
    for (let i3 = 0; i3 < k3; i3++) {
      if (valAndInd[i3].index === targetsVals[b11]) {
        precision[b11] = 1;
        break;
      }
    }
  }
  if (predictions !== $predictions) {
    $predictions.dispose();
  }
  if (targets !== $targets) {
    $targets.dispose();
  }
  return tensor(precision, $targets.shape, "bool");
}
const inTopKAsync = inTopKAsync_;
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var fused_ops = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  conv2d: conv2d$1,
  depthwiseConv2d: depthwiseConv2d$1,
  matMul: matMul$1
});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class Optimizer extends Serializable {
  minimize(f2, returnCost = false, varList) {
    const {value, grads} = this.computeGradients(f2, varList);
    if (varList != null) {
      const gradArray = varList.map((v2) => ({name: v2.name, tensor: grads[v2.name]}));
      this.applyGradients(gradArray);
    } else {
      this.applyGradients(grads);
    }
    dispose(grads);
    if (returnCost) {
      return value;
    } else {
      value.dispose();
      return null;
    }
  }
  get iterations() {
    if (this.iterations_ == null) {
      this.iterations_ = 0;
    }
    return this.iterations_;
  }
  incrementIterations() {
    this.iterations_ = this.iterations + 1;
  }
  computeGradients(f2, varList) {
    return variableGrads(f2, varList);
  }
  dispose() {
    if (this.iterations_ != null) {
      dispose(this.iterations_);
    }
  }
  async saveIterations() {
    if (this.iterations_ == null) {
      this.iterations_ = 0;
    }
    return {
      name: "iter",
      tensor: scalar(this.iterations_, "int32")
    };
  }
  async getWeights() {
    throw new Error("getWeights() is not implemented for this optimizer yet.");
  }
  async setWeights(weightValues) {
    throw new Error(`setWeights() is not implemented for this optimizer class ${this.getClassName()}`);
  }
  async extractIterations(weightValues) {
    this.iterations_ = (await weightValues[0].tensor.data())[0];
    return weightValues.slice(1);
  }
}
Object.defineProperty(Optimizer, Symbol.hasInstance, {
  value: (instance) => {
    return instance.minimize != null && instance.computeGradients != null && instance.applyGradients != null;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class AdadeltaOptimizer extends Optimizer {
  constructor(learningRate, rho, epsilon = null) {
    super();
    this.learningRate = learningRate;
    this.rho = rho;
    this.epsilon = epsilon;
    this.accumulatedGrads = [];
    this.accumulatedUpdates = [];
    if (epsilon == null) {
      this.epsilon = ENGINE.backend.epsilon();
    }
  }
  applyGradients(variableGradients) {
    const variableNames = Array.isArray(variableGradients) ? variableGradients.map((item) => item.name) : Object.keys(variableGradients);
    variableNames.forEach((name, i3) => {
      const value = ENGINE.registeredVariables[name];
      const trainable = false;
      if (this.accumulatedGrads[i3] == null) {
        this.accumulatedGrads[i3] = {
          originalName: `${name}/accum_grad`,
          variable: tidy(() => zerosLike(value).variable(trainable))
        };
      }
      if (this.accumulatedUpdates[i3] == null) {
        this.accumulatedUpdates[i3] = {
          originalName: `${name}/accum_var`,
          variable: tidy(() => zerosLike(value).variable(trainable))
        };
      }
      const gradient = Array.isArray(variableGradients) ? variableGradients[i3].tensor : variableGradients[name];
      if (gradient == null) {
        return;
      }
      const accumulatedGrad = this.accumulatedGrads[i3].variable;
      const accumulatedUpdate = this.accumulatedUpdates[i3].variable;
      tidy(() => {
        const newAccumulatedGrad = add(mul(accumulatedGrad, this.rho), mul(square(gradient), 1 - this.rho));
        const updates = mul(div(sqrt(add(accumulatedUpdate, this.epsilon)), sqrt(add(accumulatedGrad, this.epsilon))), gradient);
        const newAccumulatedUpdate = add(mul(accumulatedUpdate, this.rho), mul(square(updates), 1 - this.rho));
        accumulatedGrad.assign(newAccumulatedGrad);
        accumulatedUpdate.assign(newAccumulatedUpdate);
        const newValue = add(mul(updates, -this.learningRate), value);
        value.assign(newValue);
      });
    });
    this.incrementIterations();
  }
  dispose() {
    if (this.accumulatedUpdates != null) {
      dispose(this.accumulatedGrads.map((v2) => v2.variable));
      dispose(this.accumulatedUpdates.map((v2) => v2.variable));
    }
  }
  async getWeights() {
    const variables = [...this.accumulatedGrads, ...this.accumulatedUpdates];
    return [await this.saveIterations()].concat(variables.map((v2) => ({name: v2.originalName, tensor: v2.variable})));
  }
  async setWeights(weightValues) {
    weightValues = await this.extractIterations(weightValues);
    const variableCount = weightValues.length / 2;
    const trainable = false;
    this.accumulatedGrads = weightValues.slice(0, variableCount).map((v2) => ({
      originalName: v2.name,
      variable: v2.tensor.variable(trainable)
    }));
    this.accumulatedUpdates = weightValues.slice(variableCount, variableCount * 2).map((v2) => ({
      originalName: v2.name,
      variable: v2.tensor.variable(trainable)
    }));
  }
  getConfig() {
    return {
      learningRate: this.learningRate,
      rho: this.rho,
      epsilon: this.epsilon
    };
  }
  static fromConfig(cls, config) {
    return new cls(config["learningRate"], config["rho"], config["epsilon"]);
  }
}
AdadeltaOptimizer.className = "Adadelta";
registerClass(AdadeltaOptimizer);
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class AdagradOptimizer extends Optimizer {
  constructor(learningRate, initialAccumulatorValue = 0.1) {
    super();
    this.learningRate = learningRate;
    this.initialAccumulatorValue = initialAccumulatorValue;
    this.accumulatedGrads = [];
  }
  applyGradients(variableGradients) {
    const variableNames = Array.isArray(variableGradients) ? variableGradients.map((item) => item.name) : Object.keys(variableGradients);
    variableNames.forEach((name, i3) => {
      const value = ENGINE.registeredVariables[name];
      if (this.accumulatedGrads[i3] == null) {
        const trainable = false;
        this.accumulatedGrads[i3] = {
          originalName: `${name}/accumulator`,
          variable: tidy(() => fill(value.shape, this.initialAccumulatorValue).variable(trainable))
        };
      }
      const gradient = Array.isArray(variableGradients) ? variableGradients[i3].tensor : variableGradients[name];
      if (gradient == null) {
        return;
      }
      const accumulatedGrad = this.accumulatedGrads[i3].variable;
      tidy(() => {
        const newAccumulatedGrad = add(accumulatedGrad, square(gradient));
        accumulatedGrad.assign(newAccumulatedGrad);
        const newValue = add(mul(div(gradient, sqrt(add(newAccumulatedGrad, ENGINE.backend.epsilon()))), -this.learningRate), value);
        value.assign(newValue);
      });
    });
    this.incrementIterations();
  }
  dispose() {
    if (this.accumulatedGrads != null) {
      dispose(this.accumulatedGrads.map((v2) => v2.variable));
    }
  }
  async getWeights() {
    return [await this.saveIterations()].concat(this.accumulatedGrads.map((v2) => ({name: v2.originalName, tensor: v2.variable})));
  }
  async setWeights(weightValues) {
    weightValues = await this.extractIterations(weightValues);
    const trainable = false;
    this.accumulatedGrads = weightValues.map((v2) => ({originalName: v2.name, variable: v2.tensor.variable(trainable)}));
  }
  getConfig() {
    return {
      learningRate: this.learningRate,
      initialAccumulatorValue: this.initialAccumulatorValue
    };
  }
  static fromConfig(cls, config) {
    return new cls(config["learningRate"], config["initialAccumulatorValue"]);
  }
}
AdagradOptimizer.className = "Adagrad";
registerClass(AdagradOptimizer);
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class AdamOptimizer extends Optimizer {
  constructor(learningRate, beta1, beta2, epsilon = null) {
    super();
    this.learningRate = learningRate;
    this.beta1 = beta1;
    this.beta2 = beta2;
    this.epsilon = epsilon;
    this.accumulatedFirstMoment = [];
    this.accumulatedSecondMoment = [];
    tidy(() => {
      this.accBeta1 = scalar(beta1).variable();
      this.accBeta2 = scalar(beta2).variable();
    });
    if (epsilon == null) {
      this.epsilon = ENGINE.backend.epsilon();
    }
  }
  applyGradients(variableGradients) {
    const varNames = Array.isArray(variableGradients) ? variableGradients.map((v2) => v2.name) : Object.keys(variableGradients);
    tidy(() => {
      const oneMinusAccBeta1 = sub(1, this.accBeta1);
      const oneMinusAccBeta2 = sub(1, this.accBeta2);
      varNames.forEach((name, i3) => {
        const value = ENGINE.registeredVariables[name];
        const trainable = false;
        if (this.accumulatedFirstMoment[i3] == null) {
          this.accumulatedFirstMoment[i3] = {
            originalName: `${name}/m`,
            variable: tidy(() => zerosLike(value).variable(trainable))
          };
        }
        if (this.accumulatedSecondMoment[i3] == null) {
          this.accumulatedSecondMoment[i3] = {
            originalName: `${name}/v`,
            variable: tidy(() => zerosLike(value).variable(trainable))
          };
        }
        const gradient = Array.isArray(variableGradients) ? variableGradients[i3].tensor : variableGradients[name];
        if (gradient == null) {
          return;
        }
        const firstMoment = this.accumulatedFirstMoment[i3].variable;
        const secondMoment = this.accumulatedSecondMoment[i3].variable;
        const newFirstMoment = add(mul(firstMoment, this.beta1), mul(gradient, 1 - this.beta1));
        const newSecondMoment = add(mul(secondMoment, this.beta2), mul(square(gradient), 1 - this.beta2));
        const biasCorrectedFirstMoment = div(newFirstMoment, oneMinusAccBeta1);
        const biasCorrectedSecondMoment = div(newSecondMoment, oneMinusAccBeta2);
        firstMoment.assign(newFirstMoment);
        secondMoment.assign(newSecondMoment);
        const newValue = add(mul(div(biasCorrectedFirstMoment, add(sqrt(biasCorrectedSecondMoment), this.epsilon)), -this.learningRate), value);
        value.assign(newValue);
      });
      this.accBeta1.assign(mul(this.accBeta1, this.beta1));
      this.accBeta2.assign(mul(this.accBeta2, this.beta2));
    });
    this.incrementIterations();
  }
  dispose() {
    this.accBeta1.dispose();
    this.accBeta2.dispose();
    if (this.accumulatedFirstMoment != null) {
      dispose(this.accumulatedFirstMoment.map((v2) => v2.variable));
    }
    if (this.accumulatedSecondMoment != null) {
      dispose(this.accumulatedSecondMoment.map((v2) => v2.variable));
    }
  }
  async getWeights() {
    const variables = [...this.accumulatedFirstMoment, ...this.accumulatedSecondMoment];
    return [await this.saveIterations()].concat(variables.map((v2) => ({name: v2.originalName, tensor: v2.variable})));
  }
  async setWeights(weightValues) {
    weightValues = await this.extractIterations(weightValues);
    tidy(() => {
      this.accBeta1.assign(pow(this.beta1, this.iterations_ + 1));
      this.accBeta2.assign(pow(this.beta2, this.iterations_ + 1));
    });
    const variableCount = weightValues.length / 2;
    const trainable = false;
    this.accumulatedFirstMoment = weightValues.slice(0, variableCount).map((v2) => ({
      originalName: v2.name,
      variable: v2.tensor.variable(trainable)
    }));
    this.accumulatedSecondMoment = weightValues.slice(variableCount, variableCount * 2).map((v2) => ({
      originalName: v2.name,
      variable: v2.tensor.variable(trainable)
    }));
  }
  getConfig() {
    return {
      learningRate: this.learningRate,
      beta1: this.beta1,
      beta2: this.beta2,
      epsilon: this.epsilon
    };
  }
  static fromConfig(cls, config) {
    return new cls(config["learningRate"], config["beta1"], config["beta2"], config["epsilon"]);
  }
}
AdamOptimizer.className = "Adam";
registerClass(AdamOptimizer);
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class AdamaxOptimizer extends Optimizer {
  constructor(learningRate, beta1, beta2, epsilon = null, decay = 0) {
    super();
    this.learningRate = learningRate;
    this.beta1 = beta1;
    this.beta2 = beta2;
    this.epsilon = epsilon;
    this.decay = decay;
    this.accumulatedFirstMoment = [];
    this.accumulatedWeightedInfNorm = [];
    tidy(() => {
      this.iteration = scalar(0).variable();
      this.accBeta1 = scalar(beta1).variable();
    });
    if (epsilon == null) {
      this.epsilon = ENGINE.backend.epsilon();
    }
  }
  applyGradients(variableGradients) {
    const variableNames = Array.isArray(variableGradients) ? variableGradients.map((item) => item.name) : Object.keys(variableGradients);
    tidy(() => {
      const oneMinusAccBeta1 = sub(1, this.accBeta1);
      const lr = div(-this.learningRate, add(mul(this.iteration, this.decay), 1));
      variableNames.forEach((name, i3) => {
        const value = ENGINE.registeredVariables[name];
        const trainable = false;
        if (this.accumulatedFirstMoment[i3] == null) {
          this.accumulatedFirstMoment[i3] = {
            originalName: `${name}/m`,
            variable: zerosLike(value).variable(trainable)
          };
        }
        if (this.accumulatedWeightedInfNorm[i3] == null) {
          this.accumulatedWeightedInfNorm[i3] = {
            originalName: `${name}/v`,
            variable: zerosLike(value).variable(trainable)
          };
        }
        const gradient = Array.isArray(variableGradients) ? variableGradients[i3].tensor : variableGradients[name];
        if (gradient == null) {
          return;
        }
        const firstMoment = this.accumulatedFirstMoment[i3].variable;
        const weightedInfNorm = this.accumulatedWeightedInfNorm[i3].variable;
        const newFirstMoment = add(mul(firstMoment, this.beta1), mul(gradient, 1 - this.beta1));
        const ut0 = mul(weightedInfNorm, this.beta2);
        const ut1 = abs(gradient);
        const newWeightedInfNorm = maximum(ut0, ut1);
        firstMoment.assign(newFirstMoment);
        weightedInfNorm.assign(newWeightedInfNorm);
        const newValue = add(mul(div(lr, oneMinusAccBeta1), div(newFirstMoment, add(newWeightedInfNorm, this.epsilon))), value);
        value.assign(newValue);
      });
      this.iteration.assign(add(this.iteration, 1));
      this.accBeta1.assign(mul(this.accBeta1, this.beta1));
    });
    this.incrementIterations();
  }
  dispose() {
    this.accBeta1.dispose();
    this.iteration.dispose();
    if (this.accumulatedFirstMoment != null) {
      dispose(this.accumulatedFirstMoment.map((v2) => v2.variable));
    }
    if (this.accumulatedWeightedInfNorm != null) {
      dispose(this.accumulatedWeightedInfNorm.map((v2) => v2.variable));
    }
  }
  async getWeights() {
    throw new Error("getWeights() is not implemented for Adamax yet.");
  }
  async setWeights(weightValues) {
    throw new Error("setWeights() is not implemented for Adamax yet.");
  }
  getConfig() {
    return {
      learningRate: this.learningRate,
      beta1: this.beta1,
      beta2: this.beta2,
      epsilon: this.epsilon,
      decay: this.decay
    };
  }
  static fromConfig(cls, config) {
    return new cls(config["learningRate"], config["beta1"], config["beta2"], config["epsilon"], config["decay"]);
  }
}
AdamaxOptimizer.className = "Adamax";
registerClass(AdamaxOptimizer);
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class SGDOptimizer extends Optimizer {
  constructor(learningRate) {
    super();
    this.learningRate = learningRate;
    this.setLearningRate(learningRate);
  }
  applyGradients(variableGradients) {
    const varNames = Array.isArray(variableGradients) ? variableGradients.map((v2) => v2.name) : Object.keys(variableGradients);
    varNames.forEach((name, i3) => {
      const gradient = Array.isArray(variableGradients) ? variableGradients[i3].tensor : variableGradients[name];
      if (gradient == null) {
        return;
      }
      const value = ENGINE.registeredVariables[name];
      tidy(() => {
        const newValue = add(mul(this.c, gradient), value);
        value.assign(newValue);
      });
    });
    this.incrementIterations();
  }
  setLearningRate(learningRate) {
    this.learningRate = learningRate;
    if (this.c != null) {
      this.c.dispose();
    }
    this.c = keep(scalar(-learningRate));
  }
  dispose() {
    this.c.dispose();
  }
  async getWeights() {
    return [await this.saveIterations()];
  }
  async setWeights(weightValues) {
    weightValues = await this.extractIterations(weightValues);
    if (weightValues.length !== 0) {
      throw new Error("SGD optimizer does not have settable weights.");
    }
  }
  getConfig() {
    return {learningRate: this.learningRate};
  }
  static fromConfig(cls, config) {
    return new cls(config["learningRate"]);
  }
}
SGDOptimizer.className = "SGD";
registerClass(SGDOptimizer);
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class MomentumOptimizer extends SGDOptimizer {
  constructor(learningRate, momentum, useNesterov = false) {
    super(learningRate);
    this.learningRate = learningRate;
    this.momentum = momentum;
    this.useNesterov = useNesterov;
    this.accumulations = [];
    this.m = scalar(this.momentum);
  }
  applyGradients(variableGradients) {
    const variableNames = Array.isArray(variableGradients) ? variableGradients.map((item) => item.name) : Object.keys(variableGradients);
    variableNames.forEach((name, i3) => {
      const value = ENGINE.registeredVariables[name];
      if (this.accumulations[i3] == null) {
        const trainable = false;
        this.accumulations[i3] = {
          originalName: `${name}/momentum`,
          variable: tidy(() => zerosLike(value).variable(trainable))
        };
      }
      const accumulation = this.accumulations[i3].variable;
      const gradient = Array.isArray(variableGradients) ? variableGradients[i3].tensor : variableGradients[name];
      if (gradient == null) {
        return;
      }
      tidy(() => {
        let newValue;
        const newAccumulation = add(mul(this.m, accumulation), gradient);
        if (this.useNesterov) {
          newValue = add(mul(this.c, add(gradient, mul(newAccumulation, this.m))), value);
        } else {
          newValue = add(mul(this.c, newAccumulation), value);
        }
        accumulation.assign(newAccumulation);
        value.assign(newValue);
      });
    });
    this.incrementIterations();
  }
  dispose() {
    this.m.dispose();
    if (this.accumulations != null) {
      dispose(this.accumulations.map((v2) => v2.variable));
    }
  }
  setMomentum(momentum) {
    this.momentum = momentum;
  }
  async getWeights() {
    return [await this.saveIterations()].concat(this.accumulations.map((v2) => ({name: v2.originalName, tensor: v2.variable})));
  }
  async setWeights(weightValues) {
    weightValues = await this.extractIterations(weightValues);
    const trainable = false;
    this.accumulations = weightValues.map((v2) => ({originalName: v2.name, variable: v2.tensor.variable(trainable)}));
  }
  getConfig() {
    return {
      learningRate: this.learningRate,
      momentum: this.momentum,
      useNesterov: this.useNesterov
    };
  }
  static fromConfig(cls, config) {
    return new cls(config["learningRate"], config["momentum"], config["useNesterov"]);
  }
}
MomentumOptimizer.className = "Momentum";
registerClass(MomentumOptimizer);
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class RMSPropOptimizer extends Optimizer {
  constructor(learningRate, decay = 0.9, momentum = 0, epsilon = null, centered = false) {
    super();
    this.learningRate = learningRate;
    this.decay = decay;
    this.momentum = momentum;
    this.epsilon = epsilon;
    this.accumulatedMeanSquares = [];
    this.accumulatedMoments = [];
    this.accumulatedMeanGrads = [];
    this.centered = centered;
    if (epsilon == null) {
      this.epsilon = ENGINE.backend.epsilon();
    }
    if (learningRate == null) {
      throw new Error(`learningRate for RMSPropOptimizer must be defined.`);
    }
  }
  applyGradients(variableGradients) {
    const variableNames = Array.isArray(variableGradients) ? variableGradients.map((item) => item.name) : Object.keys(variableGradients);
    variableNames.forEach((name, i3) => {
      const value = ENGINE.registeredVariables[name];
      const trainable = false;
      if (this.accumulatedMeanSquares[i3] == null) {
        this.accumulatedMeanSquares[i3] = {
          originalName: `${name}/rms`,
          variable: tidy(() => zerosLike(value).variable(trainable))
        };
      }
      if (this.accumulatedMoments[i3] == null) {
        this.accumulatedMoments[i3] = {
          originalName: `${name}/momentum`,
          variable: tidy(() => zerosLike(value).variable(trainable))
        };
      }
      if (this.accumulatedMeanGrads[i3] == null && this.centered) {
        this.accumulatedMeanGrads[i3] = {
          originalName: `${name}/mg`,
          variable: tidy(() => zerosLike(value).variable(trainable))
        };
      }
      const gradient = Array.isArray(variableGradients) ? variableGradients[i3].tensor : variableGradients[name];
      if (gradient == null) {
        return;
      }
      const accumulatedMeanSquare = this.accumulatedMeanSquares[i3].variable;
      const accumulatedMoments = this.accumulatedMoments[i3].variable;
      tidy(() => {
        const newAccumulatedMeanSquare = add(mul(accumulatedMeanSquare, this.decay), mul(square(gradient), 1 - this.decay));
        if (this.centered) {
          const accumulatedMeanGrad = this.accumulatedMeanGrads[i3].variable;
          const newAccumulatedMeanGrad = add(mul(accumulatedMeanGrad, this.decay), mul(gradient, 1 - this.decay));
          const gradContribution = div(mul(gradient, this.learningRate), sqrt(sub(newAccumulatedMeanSquare, add(square(newAccumulatedMeanGrad), this.epsilon))));
          const newAccumulatedMoments = add(mul(accumulatedMoments, this.momentum), gradContribution);
          accumulatedMeanSquare.assign(newAccumulatedMeanSquare);
          accumulatedMeanGrad.assign(newAccumulatedMeanGrad);
          accumulatedMoments.assign(newAccumulatedMoments);
          const newValue = sub(value, newAccumulatedMoments);
          value.assign(newValue);
        } else {
          const newAccumulatedMeanSquare2 = add(mul(accumulatedMeanSquare, this.decay), mul(square(gradient), 1 - this.decay));
          const newAccumulatedMoments = add(mul(accumulatedMoments, this.momentum), div(mul(gradient, this.learningRate), sqrt(add(newAccumulatedMeanSquare2, this.epsilon))));
          accumulatedMeanSquare.assign(newAccumulatedMeanSquare2);
          accumulatedMoments.assign(newAccumulatedMoments);
          const newValue = sub(value, newAccumulatedMoments);
          value.assign(newValue);
        }
      });
    });
    this.incrementIterations();
  }
  dispose() {
    if (this.accumulatedMeanSquares != null) {
      dispose(this.accumulatedMeanSquares.map((v2) => v2.variable));
    }
    if (this.accumulatedMeanGrads != null && this.centered) {
      dispose(this.accumulatedMeanGrads.map((v2) => v2.variable));
    }
    if (this.accumulatedMoments != null) {
      dispose(this.accumulatedMoments.map((v2) => v2.variable));
    }
  }
  async getWeights() {
    const variables = [...this.accumulatedMeanSquares, ...this.accumulatedMoments];
    if (this.centered) {
      variables.push(...this.accumulatedMeanGrads);
    }
    return [await this.saveIterations()].concat(variables.map((v2) => ({name: v2.originalName, tensor: v2.variable})));
  }
  async setWeights(weightValues) {
    weightValues = await this.extractIterations(weightValues);
    const variableCount = this.centered ? weightValues.length / 3 : weightValues.length / 2;
    const trainable = false;
    this.accumulatedMeanSquares = weightValues.slice(0, variableCount).map((v2) => ({
      originalName: v2.name,
      variable: v2.tensor.variable(trainable)
    }));
    this.accumulatedMoments = weightValues.slice(variableCount, variableCount * 2).map((v2) => ({
      originalName: v2.name,
      variable: v2.tensor.variable(trainable)
    }));
    if (this.centered) {
      this.accumulatedMeanGrads = weightValues.slice(variableCount * 2, variableCount * 3).map((v2) => ({
        originalName: v2.name,
        variable: v2.tensor.variable(trainable)
      }));
    }
  }
  getConfig() {
    return {
      learningRate: this.learningRate,
      decay: this.decay,
      momentum: this.momentum,
      epsilon: this.epsilon,
      centered: this.centered
    };
  }
  static fromConfig(cls, config) {
    return new cls(config["learningRate"], config["decay"], config["momentum"], config["epsilon"], config["centered"]);
  }
}
RMSPropOptimizer.className = "RMSProp";
registerClass(RMSPropOptimizer);
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class OptimizerConstructors {
  static sgd(learningRate) {
    return new SGDOptimizer(learningRate);
  }
  static momentum(learningRate, momentum, useNesterov = false) {
    return new MomentumOptimizer(learningRate, momentum, useNesterov);
  }
  static rmsprop(learningRate, decay = 0.9, momentum = 0, epsilon = null, centered = false) {
    return new RMSPropOptimizer(learningRate, decay, momentum, epsilon, centered);
  }
  static adam(learningRate = 1e-3, beta1 = 0.9, beta2 = 0.999, epsilon = null) {
    return new AdamOptimizer(learningRate, beta1, beta2, epsilon);
  }
  static adadelta(learningRate = 1e-3, rho = 0.95, epsilon = null) {
    return new AdadeltaOptimizer(learningRate, rho, epsilon);
  }
  static adamax(learningRate = 2e-3, beta1 = 0.9, beta2 = 0.999, epsilon = null, decay = 0) {
    return new AdamaxOptimizer(learningRate, beta1, beta2, epsilon, decay);
  }
  static adagrad(learningRate, initialAccumulatorValue = 0.1) {
    return new AdagradOptimizer(learningRate, initialAccumulatorValue);
  }
}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const train = {
  sgd: OptimizerConstructors.sgd,
  momentum: OptimizerConstructors.momentum,
  adadelta: OptimizerConstructors.adadelta,
  adagrad: OptimizerConstructors.adagrad,
  rmsprop: OptimizerConstructors.rmsprop,
  adamax: OptimizerConstructors.adamax,
  adam: OptimizerConstructors.adam
};
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const delayCallback = (() => {
  if (typeof requestAnimationFrame !== "undefined") {
    return requestAnimationFrame;
  } else if (typeof setImmediate !== "undefined") {
    return setImmediate;
  }
  return (f2) => f2();
})();
function nextFrame() {
  return new Promise((resolve) => delayCallback(() => resolve()));
}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var kernel_impls = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  nonMaxSuppressionV3Impl,
  nonMaxSuppressionV4Impl,
  nonMaxSuppressionV5Impl,
  whereImpl
});
export {AdadeltaOptimizer, AdagradOptimizer, AdamOptimizer, AdamaxOptimizer, MomentumOptimizer, Optimizer, RMSPropOptimizer, SGDOptimizer, basicLSTMCell, batchNorm2d, batchNorm3d, batchNorm4d, booleanMaskAsync, concat1d, concat3d, concat4d, conv3dTranspose, diag, dot, dropout, fused_ops as fused, inTopKAsync, io, isFinite$1 as isFinite, isInf, kernel_impls, logSigmoid, logicalXor, math, meshgrid, moments, movingAverage, multiRNNCell, nextFrame, outerProduct, pad1d, pad2d, pad3d, pad4d, pool, rand, randomGamma, randomNormal, reverse1d, reverse2d, reverse3d, reverse4d, separableConv2d, serialization, slice1d, slice2d, slice3d, slice4d, tensor4d, tensor5d, tensor6d, test_util, train, unsortedSegmentSum, variable, version as version_core};
