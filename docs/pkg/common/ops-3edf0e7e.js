import {f as assert, D as DTYPE_VALUE_SIZE_MAP, w as sizeFromShape, u as decodeWeights, e as env, I as IORouterRegistry, x as getModelArtifactsInfoForJSON, y as concatenateArrayBuffers, z as op, A as convertToTensor, C as makeTypesMatch, E as ENGINE, F as BatchMatMul, O as OneHot, G as Transpose, H as assertNonNull, J as inferShape, K as makeTensor, T as Tensor, j as cast, L as getKernel, M as FromPixels, N as Add, P as FloorDiv, R as RealDiv, Q as ComplexAbs, S as Abs, U as Acos, V as Acosh, n as arraysEqual, W as AddN, X as All, Y as Any, Z as ArgMax, _ as ArgMin, $ as Asin, a0 as Asinh, a1 as Atan, a2 as Atan2, a3 as Atanh, a4 as eitherStridesOrDilationsAreOne, i as reshape, a5 as isInt, a6 as AvgPool, a7 as AvgPool3D, a8 as convertToTensorArray, c as clone, a9 as Concat, aa as Sigmoid, ab as Slice, ac as Tanh, ad as BatchToSpaceND, ae as FusedBatchNorm, af as Bincount, ag as Tile, ah as Ceil, ai as ClipByValue, aj as Conv2D, ak as Conv2DBackpropInput, al as Conv3D, am as Cos, an as Cosh, ao as Cumsum, ap as DenseBincount, aq as DepthToSpace, ar as DepthwiseConv2dNative, as as Dilation2D, at as assertAndGetBroadcastShape, au as Equal, av as Select, aw as ZerosLike, ax as Einsum, ay as Erf, az as Exp, aA as ExpandDims, aB as Expm1, aC as buffer, aD as Fill, aE as Floor, aF as GatherV2, aG as Greater, aH as GreaterEqual, aI as Imag, aJ as IsNan, aK as Less, aL as LessEqual, aM as LinSpace, aN as LRN, aO as Log, aP as Log1p, aQ as isFunction, aR as assertShapesMatch, aS as Variable, aT as Neg, aU as Softplus, aV as Max, aW as Sub, s as sum, m as mul, aX as parseAxisParam, aY as expandShapeToKeepDim, aZ as LogicalAnd, a_ as LogicalNot, a$ as LogicalOr, b0 as MaxPool, b1 as MaxPool3D, b2 as MaxPoolWithArgmax, b3 as Maximum, b4 as Mean, d as complex, b5 as makeZerosTypedArray, b6 as makeOnesTypedArray, b7 as Min, b8 as Minimum, b9 as MirrorPad, ba as Mod, bb as Multinomial, bc as NotEqual, bd as OnesLike, be as PadV2, bf as SpaceToBatchND, bg as Pow, bh as Prod, bi as require$$0, bj as Range, bk as Real, bl as Reciprocal, bm as Reverse, bn as Round, bo as Rsqrt, bp as isTypedArray, bq as Selu, br as TensorBuffer, bs as Sign, bt as Sin, bu as Sinh, bv as Softmax, bw as FFT, bx as IFFT, by as SplitV, bz as Sqrt, bA as SquaredDifference, bB as squeezeShape, bC as Pack, bD as StridedSlice, bE as Tan, bF as TopK, bG as Unique, bH as Unpack, bI as validateInput$1, bJ as ScatterNd, bK as SparseToDense, bL as GatherNd, bM as Conv2DBackpropFilter, bN as shouldFuse, bO as applyActivation, bP as computeConv2DInfo, bQ as FusedConv2D, bR as getFusedDyActivation, bS as tupleValuesAreOne, bT as getFusedBiasGradient, bU as DepthwiseConv2dNativeBackpropFilter, bV as DepthwiseConv2dNativeBackpropInput, bW as FusedDepthwiseConv2D, bX as _FusedMatMul, bY as CropAndResize, bZ as FlipLeftRight, b_ as RotateWithOffset, b$ as NonMaxSuppressionV3, c0 as NonMaxSuppressionV5, c1 as NonMaxSuppressionV4, c2 as ResizeBilinear, c3 as ResizeNearestNeighbor, c4 as Transform, c5 as dispose, a as relu} from "./fused_util-15f1054e.js";
import {c as createCommonjsModule, a as commonjsGlobal} from "./_commonjsHelpers-798ad6a7.js";
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
function monitorPromisesProgress(promises, onProgress, startFraction, endFraction) {
  checkPromises(promises);
  startFraction = startFraction == null ? 0 : startFraction;
  endFraction = endFraction == null ? 1 : endFraction;
  checkFraction(startFraction, endFraction);
  let resolvedPromise = 0;
  const registerMonitor = (promise) => {
    promise.then((value) => {
      const fraction = startFraction + ++resolvedPromise / promises.length * (endFraction - startFraction);
      onProgress(fraction);
      return value;
    });
    return promise;
  };
  function checkPromises(promises2) {
    assert(promises2 != null && Array.isArray(promises2) && promises2.length > 0, () => "promises must be a none empty array");
  }
  function checkFraction(startFraction2, endFraction2) {
    assert(startFraction2 >= 0 && startFraction2 <= 1, () => `Progress fraction must be in range [0, 1], but got startFraction ${startFraction2}`);
    assert(endFraction2 >= 0 && endFraction2 <= 1, () => `Progress fraction must be in range [0, 1], but got endFraction ${endFraction2}`);
    assert(endFraction2 >= startFraction2, () => `startFraction must be no more than endFraction, but got startFraction ${startFraction2} and endFraction ${endFraction2}`);
  }
  return Promise.all(promises.map(registerMonitor));
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
async function loadWeightsAsArrayBuffer(fetchURLs, loadOptions) {
  if (loadOptions == null) {
    loadOptions = {};
  }
  const fetchFunc = loadOptions.fetchFunc == null ? env().platform.fetch : loadOptions.fetchFunc;
  const requests = fetchURLs.map((fetchURL) => fetchFunc(fetchURL, loadOptions.requestInit, {isBinary: true}));
  const fetchStartFraction = 0;
  const fetchEndFraction = 0.5;
  const responses = loadOptions.onProgress == null ? await Promise.all(requests) : await monitorPromisesProgress(requests, loadOptions.onProgress, fetchStartFraction, fetchEndFraction);
  const bufferPromises = responses.map((response) => response.arrayBuffer());
  const bufferStartFraction = 0.5;
  const bufferEndFraction = 1;
  const buffers = loadOptions.onProgress == null ? await Promise.all(bufferPromises) : await monitorPromisesProgress(bufferPromises, loadOptions.onProgress, bufferStartFraction, bufferEndFraction);
  return buffers;
}
async function loadWeights(manifest, filePathPrefix = "", weightNames, requestInit) {
  const fetchWeights = (fetchUrls) => loadWeightsAsArrayBuffer(fetchUrls, {requestInit});
  const loadWeights2 = weightsLoaderFactory(fetchWeights);
  return loadWeights2(manifest, filePathPrefix, weightNames);
}
function weightsLoaderFactory(fetchWeightsFunction) {
  return async (manifest, filePathPrefix = "", weightNames) => {
    const groupIndicesToFetchMap = manifest.map(() => false);
    const groupWeightsToFetch = {};
    const weightsFound = weightNames != null ? weightNames.map(() => false) : [];
    const allManifestWeightNames = [];
    manifest.forEach((manifestGroupConfig, groupIndex) => {
      let groupOffset = 0;
      manifestGroupConfig.weights.forEach((weightsEntry) => {
        const rawDtype = "quantization" in weightsEntry ? weightsEntry.quantization.dtype : weightsEntry.dtype;
        const weightsBytes = DTYPE_VALUE_SIZE_MAP[rawDtype] * sizeFromShape(weightsEntry.shape);
        const enqueueWeightsForFetchingFn = () => {
          groupIndicesToFetchMap[groupIndex] = true;
          if (groupWeightsToFetch[groupIndex] == null) {
            groupWeightsToFetch[groupIndex] = [];
          }
          groupWeightsToFetch[groupIndex].push({
            manifestEntry: weightsEntry,
            groupOffset,
            sizeBytes: weightsBytes
          });
        };
        if (weightNames != null) {
          weightNames.forEach((weightName, weightIndex) => {
            if (weightName === weightsEntry.name) {
              enqueueWeightsForFetchingFn();
              weightsFound[weightIndex] = true;
            }
          });
        } else {
          enqueueWeightsForFetchingFn();
        }
        allManifestWeightNames.push(weightsEntry.name);
        groupOffset += weightsBytes;
      });
    });
    if (!weightsFound.every((found) => found)) {
      const weightsNotFound = weightNames.filter((_, i) => !weightsFound[i]);
      throw new Error(`Could not find weights in manifest with names: ${weightsNotFound.join(", ")}. 
Manifest JSON has weights with names: ${allManifestWeightNames.join(", ")}.`);
    }
    const groupIndicesToFetch = groupIndicesToFetchMap.reduce((accumulator, shouldFetch, i) => {
      if (shouldFetch) {
        accumulator.push(i);
      }
      return accumulator;
    }, []);
    const fetchUrls = [];
    groupIndicesToFetch.forEach((i) => {
      manifest[i].paths.forEach((filepath) => {
        const fetchUrl = filePathPrefix + (!filePathPrefix.endsWith("/") ? "/" : "") + filepath;
        fetchUrls.push(fetchUrl);
      });
    });
    const buffers = await fetchWeightsFunction(fetchUrls);
    const weightsTensorMap = {};
    let bufferIndexOffset = 0;
    groupIndicesToFetch.forEach((i) => {
      const numBuffers = manifest[i].paths.length;
      let groupBytes = 0;
      for (let i2 = 0; i2 < numBuffers; i2++) {
        groupBytes += buffers[bufferIndexOffset + i2].byteLength;
      }
      const groupBuffer = new ArrayBuffer(groupBytes);
      const groupByteBuffer = new Uint8Array(groupBuffer);
      let groupBufferOffset = 0;
      for (let i2 = 0; i2 < numBuffers; i2++) {
        const buffer2 = new Uint8Array(buffers[bufferIndexOffset + i2]);
        groupByteBuffer.set(buffer2, groupBufferOffset);
        groupBufferOffset += buffer2.byteLength;
      }
      const weightsEntries = groupWeightsToFetch[i];
      weightsEntries.forEach((weightsEntry) => {
        const byteBuffer = groupBuffer.slice(weightsEntry.groupOffset, weightsEntry.groupOffset + weightsEntry.sizeBytes);
        const nameToTensorMap = decodeWeights(byteBuffer, [weightsEntry.manifestEntry]);
        for (const name in nameToTensorMap) {
          weightsTensorMap[name] = nameToTensorMap[name];
        }
      });
      bufferIndexOffset += numBuffers;
    });
    return weightsTensorMap;
  };
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
const OCTET_STREAM_MIME_TYPE = "application/octet-stream";
const JSON_TYPE = "application/json";
class HTTPRequest {
  constructor(path, loadOptions) {
    this.DEFAULT_METHOD = "POST";
    if (loadOptions == null) {
      loadOptions = {};
    }
    this.weightPathPrefix = loadOptions.weightPathPrefix;
    this.onProgress = loadOptions.onProgress;
    this.weightUrlConverter = loadOptions.weightUrlConverter;
    if (loadOptions.fetchFunc != null) {
      assert(typeof loadOptions.fetchFunc === "function", () => "Must pass a function that matches the signature of `fetch` (see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)");
      this.fetch = loadOptions.fetchFunc;
    } else {
      this.fetch = env().platform.fetch;
    }
    assert(path != null && path.length > 0, () => "URL path for http must not be null, undefined or empty.");
    if (Array.isArray(path)) {
      assert(path.length === 2, () => `URL paths for http must have a length of 2, (actual length is ${path.length}).`);
    }
    this.path = path;
    if (loadOptions.requestInit != null && loadOptions.requestInit.body != null) {
      throw new Error("requestInit is expected to have no pre-existing body, but has one.");
    }
    this.requestInit = loadOptions.requestInit || {};
  }
  async save(modelArtifacts) {
    if (modelArtifacts.modelTopology instanceof ArrayBuffer) {
      throw new Error("BrowserHTTPRequest.save() does not support saving model topology in binary formats yet.");
    }
    const init = Object.assign({method: this.DEFAULT_METHOD}, this.requestInit);
    init.body = new FormData();
    const weightsManifest = [{
      paths: ["./model.weights.bin"],
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
    init.body.append("model.json", new Blob([JSON.stringify(modelTopologyAndWeightManifest)], {type: JSON_TYPE}), "model.json");
    if (modelArtifacts.weightData != null) {
      init.body.append("model.weights.bin", new Blob([modelArtifacts.weightData], {type: OCTET_STREAM_MIME_TYPE}), "model.weights.bin");
    }
    const response = await this.fetch(this.path, init);
    if (response.ok) {
      return {
        modelArtifactsInfo: getModelArtifactsInfoForJSON(modelArtifacts),
        responses: [response]
      };
    } else {
      throw new Error(`BrowserHTTPRequest.save() failed due to HTTP response status ${response.status}.`);
    }
  }
  async load() {
    const modelConfigRequest = await this.fetch(this.path, this.requestInit);
    if (!modelConfigRequest.ok) {
      throw new Error(`Request to ${this.path} failed with status code ${modelConfigRequest.status}. Please verify this URL points to the model JSON of the model to load.`);
    }
    let modelConfig;
    try {
      modelConfig = await modelConfigRequest.json();
    } catch (e) {
      let message = `Failed to parse model JSON of response from ${this.path}.`;
      if (this.path.endsWith(".pb")) {
        message += " Your path contains a .pb file extension. Support for .pb models have been removed in TensorFlow.js 1.0 in favor of .json models. You can re-convert your Python TensorFlow model using the TensorFlow.js 1.0 conversion scripts or you can convert your.pb models with the 'pb2json'NPM script in the tensorflow/tfjs-converter repository.";
      } else {
        message += " Please make sure the server is serving valid JSON for this request.";
      }
      throw new Error(message);
    }
    const modelTopology = modelConfig.modelTopology;
    const weightsManifest = modelConfig.weightsManifest;
    const generatedBy = modelConfig.generatedBy;
    const convertedBy = modelConfig.convertedBy;
    const format = modelConfig.format;
    const signature = modelConfig.signature;
    const userDefinedMetadata = modelConfig.userDefinedMetadata;
    if (modelTopology == null && weightsManifest == null) {
      throw new Error(`The JSON from HTTP path ${this.path} contains neither model topology or manifest for weights.`);
    }
    let weightSpecs;
    let weightData;
    if (weightsManifest != null) {
      const results = await this.loadWeights(weightsManifest);
      [weightSpecs, weightData] = results;
    }
    const artifacts = {
      modelTopology,
      weightSpecs,
      weightData,
      generatedBy,
      convertedBy,
      format
    };
    if (signature != null) {
      artifacts.signature = signature;
    }
    if (userDefinedMetadata != null) {
      artifacts.userDefinedMetadata = userDefinedMetadata;
    }
    const initializer = modelConfig.modelInitializer;
    if (initializer) {
      artifacts.modelInitializer = initializer;
    }
    return artifacts;
  }
  async loadWeights(weightsManifest) {
    const weightPath = Array.isArray(this.path) ? this.path[1] : this.path;
    const [prefix, suffix] = parseUrl(weightPath);
    const pathPrefix = this.weightPathPrefix || prefix;
    const weightSpecs = [];
    for (const entry of weightsManifest) {
      weightSpecs.push(...entry.weights);
    }
    const fetchURLs = [];
    const urlPromises = [];
    for (const weightsGroup of weightsManifest) {
      for (const path of weightsGroup.paths) {
        if (this.weightUrlConverter != null) {
          urlPromises.push(this.weightUrlConverter(path));
        } else {
          fetchURLs.push(pathPrefix + path + suffix);
        }
      }
    }
    if (this.weightUrlConverter) {
      fetchURLs.push(...await Promise.all(urlPromises));
    }
    const buffers = await loadWeightsAsArrayBuffer(fetchURLs, {
      requestInit: this.requestInit,
      fetchFunc: this.fetch,
      onProgress: this.onProgress
    });
    return [weightSpecs, concatenateArrayBuffers(buffers)];
  }
}
HTTPRequest.URL_SCHEME_REGEX = /^https?:\/\//;
function parseUrl(url) {
  const lastSlash = url.lastIndexOf("/");
  const lastSearchParam = url.lastIndexOf("?");
  const prefix = url.substring(0, lastSlash);
  const suffix = lastSearchParam > lastSlash ? url.substring(lastSearchParam) : "";
  return [prefix + "/", suffix];
}
function isHTTPScheme(url) {
  return url.match(HTTPRequest.URL_SCHEME_REGEX) != null;
}
const httpRouter = (url, loadOptions) => {
  if (typeof fetch === "undefined" && (loadOptions == null || loadOptions.fetchFunc == null)) {
    return null;
  } else {
    let isHTTP = true;
    if (Array.isArray(url)) {
      isHTTP = url.every((urlItem) => isHTTPScheme(urlItem));
    } else {
      isHTTP = isHTTPScheme(url);
    }
    if (isHTTP) {
      return http(url, loadOptions);
    }
  }
  return null;
};
IORouterRegistry.registerSaveRouter(httpRouter);
IORouterRegistry.registerLoadRouter(httpRouter);
function http(path, loadOptions) {
  return new HTTPRequest(path, loadOptions);
}
function browserHTTPRequest(path, loadOptions) {
  return http(path, loadOptions);
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
function matMul_(a, b, transposeA = false, transposeB = false) {
  let $a = convertToTensor(a, "a", "matMul");
  let $b = convertToTensor(b, "b", "matMul");
  [$a, $b] = makeTypesMatch($a, $b);
  const inputs = {a: $a, b: $b};
  const attrs = {transposeA, transposeB};
  return ENGINE.runKernel(BatchMatMul, inputs, attrs);
}
const matMul = op({matMul_});
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
function oneHot_(indices, depth, onValue = 1, offValue = 0) {
  if (depth < 2) {
    throw new Error(`Error in oneHot: depth must be >=2, but it is ${depth}`);
  }
  const $indices = convertToTensor(indices, "indices", "oneHot", "int32");
  const inputs = {indices: $indices};
  const attrs = {depth, onValue, offValue};
  return ENGINE.runKernel(OneHot, inputs, attrs);
}
const oneHot = op({oneHot_});
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
function transpose_(x, perm) {
  const $x = convertToTensor(x, "x", "transpose");
  if (perm == null) {
    perm = $x.shape.map((s, i) => i).reverse();
  }
  assert($x.rank === perm.length, () => `Error in transpose: rank of input ${$x.rank} must match length of perm ${perm}.`);
  perm.forEach((axis) => {
    assert(axis >= 0 && axis < $x.rank, () => `All entries in 'perm' must be between 0 and ${$x.rank - 1} but got ${perm}`);
  });
  if ($x.rank <= 1) {
    return $x.clone();
  }
  const inputs = {x: $x};
  const attrs = {perm};
  return ENGINE.runKernel(Transpose, inputs, attrs);
}
const transpose = op({transpose_});
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
function tensor3d(values, shape, dtype) {
  assertNonNull(values);
  if (shape != null && shape.length !== 3) {
    throw new Error("tensor3d() requires shape to have three numbers");
  }
  const inferredShape = inferShape(values, dtype);
  if (inferredShape.length !== 3 && inferredShape.length !== 1) {
    throw new Error("tensor3d() requires values to be number[][][] or flat/TypedArray");
  }
  if (inferredShape.length === 1 && shape == null) {
    throw new Error("tensor3d() requires shape to be provided when `values` are a flat array");
  }
  return makeTensor(values, shape, inferredShape, dtype);
}
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
let fromPixels2DContext;
function fromPixels_(pixels, numChannels = 3) {
  if (numChannels > 4) {
    throw new Error("Cannot construct Tensor with more than 4 channels from pixels.");
  }
  if (pixels == null) {
    throw new Error("pixels passed to tf.browser.fromPixels() can not be null");
  }
  let isPixelData2 = false;
  let isImageData = false;
  let isVideo = false;
  let isImage = false;
  let isCanvasLike = false;
  let isImageBitmap = false;
  if (pixels.data instanceof Uint8Array) {
    isPixelData2 = true;
  } else if (typeof ImageData !== "undefined" && pixels instanceof ImageData) {
    isImageData = true;
  } else if (typeof HTMLVideoElement !== "undefined" && pixels instanceof HTMLVideoElement) {
    isVideo = true;
  } else if (typeof HTMLImageElement !== "undefined" && pixels instanceof HTMLImageElement) {
    isImage = true;
  } else if (pixels.getContext != null) {
    isCanvasLike = true;
  } else if (typeof ImageBitmap !== "undefined" && pixels instanceof ImageBitmap) {
    isImageBitmap = true;
  } else {
    throw new Error(`pixels passed to tf.browser.fromPixels() must be either an HTMLVideoElement, HTMLImageElement, HTMLCanvasElement, ImageData in browser, or OffscreenCanvas, ImageData in webworker or {data: Uint32Array, width: number, height: number}, but was ${pixels.constructor.name}`);
  }
  if (isVideo) {
    const HAVE_CURRENT_DATA_READY_STATE = 2;
    if (isVideo && pixels.readyState < HAVE_CURRENT_DATA_READY_STATE) {
      throw new Error("The video element has not loaded data yet. Please wait for `loadeddata` event on the <video> element.");
    }
  }
  const kernel = getKernel(FromPixels, ENGINE.backendName);
  if (kernel != null) {
    const inputs = {pixels};
    const attrs = {numChannels};
    return ENGINE.runKernel(FromPixels, inputs, attrs);
  }
  const [width, height] = isVideo ? [
    pixels.videoWidth,
    pixels.videoHeight
  ] : [pixels.width, pixels.height];
  let vals;
  if (isCanvasLike) {
    vals = pixels.getContext("2d").getImageData(0, 0, width, height).data;
  } else if (isImageData || isPixelData2) {
    vals = pixels.data;
  } else if (isImage || isVideo || isImageBitmap) {
    if (fromPixels2DContext == null) {
      fromPixels2DContext = document.createElement("canvas").getContext("2d");
    }
    fromPixels2DContext.canvas.width = width;
    fromPixels2DContext.canvas.height = height;
    fromPixels2DContext.drawImage(pixels, 0, 0, width, height);
    vals = fromPixels2DContext.getImageData(0, 0, width, height).data;
  }
  let values;
  if (numChannels === 4) {
    values = new Int32Array(vals);
  } else {
    const numPixels = width * height;
    values = new Int32Array(numPixels * numChannels);
    for (let i = 0; i < numPixels; i++) {
      for (let channel = 0; channel < numChannels; ++channel) {
        values[i * numChannels + channel] = vals[i * 4 + channel];
      }
    }
  }
  const outShape = [height, width, numChannels];
  return tensor3d(values, outShape, "int32");
}
function isPixelData(pixels) {
  return pixels != null && pixels.data instanceof Uint8Array;
}
function isImageBitmapFullySupported() {
  return typeof window !== "undefined" && typeof ImageBitmap !== "undefined" && window.hasOwnProperty("createImageBitmap");
}
function isNonEmptyPixels(pixels) {
  return pixels != null && pixels.width !== 0 && pixels.height !== 0;
}
function canWrapPixelsToImageBitmap(pixels) {
  return isImageBitmapFullySupported() && !(pixels instanceof ImageBitmap) && isNonEmptyPixels(pixels) && !isPixelData(pixels);
}
async function fromPixelsAsync(pixels, numChannels = 3) {
  let inputs = null;
  if (env().getBool("WRAP_TO_IMAGEBITMAP") && canWrapPixelsToImageBitmap(pixels)) {
    let imageBitmap;
    try {
      imageBitmap = await createImageBitmap(pixels, {premultiplyAlpha: "none"});
    } catch (e) {
      imageBitmap = null;
    }
    if (imageBitmap != null && imageBitmap.width === pixels.width && imageBitmap.height === pixels.height) {
      inputs = imageBitmap;
    } else {
      inputs = pixels;
    }
  } else {
    inputs = pixels;
  }
  return fromPixels_(inputs, numChannels);
}
async function toPixels(img, canvas) {
  let $img = convertToTensor(img, "img", "toPixels");
  if (!(img instanceof Tensor)) {
    const originalImgTensor = $img;
    $img = cast(originalImgTensor, "int32");
    originalImgTensor.dispose();
  }
  if ($img.rank !== 2 && $img.rank !== 3) {
    throw new Error(`toPixels only supports rank 2 or 3 tensors, got rank ${$img.rank}.`);
  }
  const [height, width] = $img.shape.slice(0, 2);
  const depth = $img.rank === 2 ? 1 : $img.shape[2];
  if (depth > 4 || depth === 2) {
    throw new Error(`toPixels only supports depth of size 1, 3 or 4 but got ${depth}`);
  }
  if ($img.dtype !== "float32" && $img.dtype !== "int32") {
    throw new Error(`Unsupported type for toPixels: ${$img.dtype}. Please use float32 or int32 tensors.`);
  }
  const data = await $img.data();
  const multiplier = $img.dtype === "float32" ? 255 : 1;
  const bytes = new Uint8ClampedArray(width * height * 4);
  for (let i = 0; i < height * width; ++i) {
    const rgba = [0, 0, 0, 255];
    for (let d = 0; d < depth; d++) {
      const value = data[i * depth + d];
      if ($img.dtype === "float32") {
        if (value < 0 || value > 1) {
          throw new Error(`Tensor values for a float32 Tensor must be in the range [0 - 1] but encountered ${value}.`);
        }
      } else if ($img.dtype === "int32") {
        if (value < 0 || value > 255) {
          throw new Error(`Tensor values for a int32 Tensor must be in the range [0 - 255] but encountered ${value}.`);
        }
      }
      if (depth === 1) {
        rgba[0] = value * multiplier;
        rgba[1] = value * multiplier;
        rgba[2] = value * multiplier;
      } else {
        rgba[d] = value * multiplier;
      }
    }
    const j = i * 4;
    bytes[j + 0] = Math.round(rgba[0]);
    bytes[j + 1] = Math.round(rgba[1]);
    bytes[j + 2] = Math.round(rgba[2]);
    bytes[j + 3] = Math.round(rgba[3]);
  }
  if (canvas != null) {
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    const imageData = new ImageData(bytes, width, height);
    ctx.putImageData(imageData, 0, 0);
  }
  if ($img !== img) {
    $img.dispose();
  }
  return bytes;
}
const fromPixels = op({fromPixels_});
var browser = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  fromPixelsAsync,
  toPixels,
  fromPixels
});
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
function add_(a, b) {
  let $a = convertToTensor(a, "a", "add");
  let $b = convertToTensor(b, "b", "add");
  [$a, $b] = makeTypesMatch($a, $b);
  const inputs = {a: $a, b: $b};
  return ENGINE.runKernel(Add, inputs);
}
const add = op({add_});
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
function floorDiv_(a, b) {
  let $a = convertToTensor(a, "a", "floorDiv");
  let $b = convertToTensor(b, "b", "floorDiv");
  [$a, $b] = makeTypesMatch($a, $b);
  const inputs = {a: $a, b: $b};
  return ENGINE.runKernel(FloorDiv, inputs);
}
const floorDiv = op({floorDiv_});
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
function div_(a, b) {
  let $a = convertToTensor(a, "a", "div");
  let $b = convertToTensor(b, "b", "div");
  [$a, $b] = makeTypesMatch($a, $b);
  if ($a.dtype === "int32" && $b.dtype === "int32") {
    return floorDiv($a, $b);
  }
  const inputs = {a: $a, b: $b};
  const attrs = {};
  return ENGINE.runKernel(RealDiv, inputs, attrs);
}
const div = op({div_});
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
function abs_(x) {
  const $x = convertToTensor(x, "x", "abs");
  if ($x.dtype === "complex64") {
    const inputs = {x: $x};
    return ENGINE.runKernel(ComplexAbs, inputs);
  } else {
    const inputs = {x: $x};
    return ENGINE.runKernel(Abs, inputs);
  }
}
const abs = op({abs_});
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
function acos_(x) {
  const $x = convertToTensor(x, "x", "acos");
  const inputs = {x: $x};
  return ENGINE.runKernel(Acos, inputs);
}
const acos = op({acos_});
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
function acosh_(x) {
  const $x = convertToTensor(x, "x", "acosh");
  const inputs = {x: $x};
  return ENGINE.runKernel(Acosh, inputs);
}
const acosh = op({acosh_});
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
function addN_(tensors) {
  assert(Array.isArray(tensors), () => "The argument passed to tf.addN() must be a list of tensors");
  assert(tensors.length >= 1, () => `Must pass at least one tensor to tf.addN(), but got ${tensors.length}`);
  const $tensors = tensors.map((t, i) => convertToTensor(t, `tensors${i}`, "addN"));
  const firstTensor = $tensors[0];
  $tensors.forEach((t) => {
    if (t.dtype !== firstTensor.dtype) {
      throw new Error("All tensors passed to tf.addN() must have the same dtype");
    }
  });
  $tensors.forEach((t) => {
    if (!arraysEqual(t.shape, firstTensor.shape)) {
      throw new Error("All tensors passed to tf.addN() must have the same shape");
    }
  });
  const inputs = $tensors;
  return ENGINE.runKernel(AddN, inputs);
}
const addN = op({addN_});
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
function all_(x, axis = null, keepDims = false) {
  const $x = convertToTensor(x, "x", "all", "bool");
  const inputs = {x: $x};
  const attrs = {axis, keepDims};
  return ENGINE.runKernel(All, inputs, attrs);
}
const all = op({all_});
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
function any_(x, axis = null, keepDims = false) {
  const $x = convertToTensor(x, "x", "any", "bool");
  const inputs = {x: $x};
  const attrs = {axis, keepDims};
  return ENGINE.runKernel(Any, inputs, attrs);
}
const any = op({any_});
/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
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
function argMax_(x, axis = 0) {
  const $x = convertToTensor(x, "x", "argMax");
  const inputs = {x: $x};
  const attrs = {axis};
  return ENGINE.runKernel(ArgMax, inputs, attrs);
}
const argMax = op({argMax_});
/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
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
function argMin_(x, axis = 0) {
  const $x = convertToTensor(x, "x", "argMin");
  const inputs = {x: $x};
  const attrs = {axis};
  return ENGINE.runKernel(ArgMin, inputs, attrs);
}
const argMin = op({argMin_});
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
function asin_(x) {
  const $x = convertToTensor(x, "x", "asin");
  const inputs = {x: $x};
  return ENGINE.runKernel(Asin, inputs);
}
const asin = op({asin_});
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
function asinh_(x) {
  const $x = convertToTensor(x, "x", "asinh");
  const inputs = {x: $x};
  return ENGINE.runKernel(Asinh, inputs);
}
const asinh = op({asinh_});
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
function atan_(x) {
  const $x = convertToTensor(x, "x", "atan");
  const inputs = {x: $x};
  return ENGINE.runKernel(Atan, inputs);
}
const atan = op({atan_});
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
function atan2_(a, b) {
  let $a = convertToTensor(a, "a", "atan2");
  let $b = convertToTensor(b, "b", "atan2");
  [$a, $b] = makeTypesMatch($a, $b);
  const inputs = {a: $a, b: $b};
  return ENGINE.runKernel(Atan2, inputs);
}
const atan2 = op({atan2_});
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
function atanh_(x) {
  const $x = convertToTensor(x, "x", "atanh");
  const inputs = {x: $x};
  return ENGINE.runKernel(Atanh, inputs);
}
const atanh = op({atanh_});
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
function avgPool_(x, filterSize, strides, pad2, dimRoundingMode) {
  const $x = convertToTensor(x, "x", "avgPool", "float32");
  const dilations = 1;
  assert(eitherStridesOrDilationsAreOne(strides, dilations), () => `Error in avgPool: Either strides or dilations must be 1. Got strides ${strides} and dilations '${dilations}'`);
  let x4D = $x;
  let reshapedTo4D = false;
  if ($x.rank === 3) {
    reshapedTo4D = true;
    x4D = reshape($x, [1, $x.shape[0], $x.shape[1], $x.shape[2]]);
  }
  assert(x4D.rank === 4, () => `Error in avgPool: x must be rank 4 but got rank ${x4D.rank}.`);
  if (dimRoundingMode != null) {
    assert(isInt(pad2), () => `Error in avgPool: pad must be an integer when using, dimRoundingMode ${dimRoundingMode} but got pad ${pad2}.`);
  }
  const inputs = {x: x4D};
  const attrs = {filterSize, strides, pad: pad2, dimRoundingMode};
  let res = ENGINE.runKernel(AvgPool, inputs, attrs);
  res = cast(res, $x.dtype);
  if (reshapedTo4D) {
    return reshape(res, [res.shape[1], res.shape[2], res.shape[3]]);
  }
  return res;
}
const avgPool = op({avgPool_});
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
function avgPool3d_(x, filterSize, strides, pad2, dimRoundingMode, dataFormat = "NDHWC") {
  const $x = convertToTensor(x, "x", "avgPool3d", "float32");
  let x5D = $x;
  let reshapedTo5D = false;
  if ($x.rank === 4) {
    reshapedTo5D = true;
    x5D = reshape($x, [1, $x.shape[0], $x.shape[1], $x.shape[2], $x.shape[3]]);
  }
  assert(x5D.rank === 5, () => `Error in avgPool3d: x must be rank 5 but got rank ${x5D.rank}.`);
  assert(dataFormat === "NDHWC", () => `Error in avgPool3d: Only NDHWC is currently supported, but got dataFormat of ${dataFormat}`);
  if (dimRoundingMode != null) {
    assert(isInt(pad2), () => `Error in avgPool3d: pad must be an integer when using, dimRoundingMode ${dimRoundingMode} but got pad ${pad2}.`);
  }
  const inputs = {x: x5D};
  const attrs = {filterSize, strides, pad: pad2, dimRoundingMode, dataFormat};
  let res = ENGINE.runKernel(AvgPool3D, inputs, attrs);
  res = cast(res, x5D.dtype);
  if (reshapedTo5D) {
    return reshape(res, [res.shape[1], res.shape[2], res.shape[3], res.shape[4]]);
  }
  return res;
}
const avgPool3d = op({avgPool3d_});
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
function concat_(tensors, axis = 0) {
  assert(tensors.length >= 1, () => "Pass at least one tensor to concat");
  const $tensors = convertToTensorArray(tensors, "tensors", "concat", "string_or_numeric");
  if ($tensors[0].dtype === "complex64") {
    $tensors.forEach((tensor) => {
      if (tensor.dtype !== "complex64") {
        throw new Error(`Cannot concatenate complex64 tensors with a tensor
          with dtype ${tensor.dtype}. `);
      }
    });
  }
  if ($tensors.length === 1) {
    return clone($tensors[0]);
  }
  const inputs = $tensors;
  const attr = {axis};
  return ENGINE.runKernel(Concat, inputs, attr);
}
const concat = op({concat_});
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
function sigmoid_(x) {
  const $x = convertToTensor(x, "x", "sigmoid");
  const inputs = {x: $x};
  return ENGINE.runKernel(Sigmoid, inputs);
}
const sigmoid = op({sigmoid_});
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
function slice_(x, begin, size) {
  const $x = convertToTensor(x, "x", "slice", "string_or_numeric");
  if ($x.rank === 0) {
    throw new Error("Slicing scalar is not possible");
  }
  const inputs = {x: $x};
  const attrs = {begin, size};
  return ENGINE.runKernel(Slice, inputs, attrs);
}
const slice = op({slice_});
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
function tanh_(x) {
  const $x = convertToTensor(x, "x", "tanh");
  const inputs = {x: $x};
  return ENGINE.runKernel(Tanh, inputs);
}
const tanh = op({tanh_});
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
function batchToSpaceND_(x, blockShape, crops) {
  const $x = convertToTensor(x, "x", "batchToSpaceND");
  const prod2 = blockShape.reduce((a, b) => a * b);
  assert($x.rank >= 1 + blockShape.length, () => `input rank is ${$x.rank} but should be > than blockShape.length ${blockShape.length}`);
  assert(crops.length === blockShape.length, () => `crops.length is ${crops.length} but should be equal to blockShape.length  ${blockShape.length}`);
  assert($x.shape[0] % prod2 === 0, () => `input tensor batch is ${$x.shape[0]} but is not divisible by the product of the elements of blockShape ${blockShape.join(" * ")} === ${prod2}`);
  const inputs = {x: $x};
  const attrs = {blockShape, crops};
  return ENGINE.runKernel(BatchToSpaceND, inputs, attrs);
}
const batchToSpaceND = op({batchToSpaceND_});
function xAs4D(x) {
  let x4D;
  if (x.rank === 0 || x.rank === 1) {
    x4D = reshape(x, [1, 1, 1, x.size]);
  } else if (x.rank === 2) {
    x4D = reshape(x, [1, 1, x.shape[0], x.shape[1]]);
  } else if (x.rank === 3) {
    x4D = reshape(x, [1, x.shape[0], x.shape[1], x.shape[2]]);
  } else {
    x4D = x;
  }
  return x4D;
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
function batchNorm_(x, mean2, variance, offset, scale, varianceEpsilon) {
  if (varianceEpsilon == null) {
    varianceEpsilon = 1e-3;
  }
  const $x = convertToTensor(x, "x", "batchNorm");
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
  assert($mean.rank === $variance.rank, () => "Batch normalization gradient requires mean and variance to have equal ranks.");
  assert($offset == null || $mean.rank === $offset.rank, () => "Batch normalization gradient requires mean and offset to have equal ranks.");
  assert($scale == null || $mean.rank === $scale.rank, () => "Batch normalization gradient requires mean and scale to have equal ranks.");
  const x4D = xAs4D($x);
  const inputs = {
    x: x4D,
    scale: $scale,
    offset: $offset,
    mean: $mean,
    variance: $variance
  };
  const attrs = {varianceEpsilon};
  const res = ENGINE.runKernel(FusedBatchNorm, inputs, attrs);
  return reshape(res, $x.shape);
}
const batchNorm = op({batchNorm_});
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
function bincount_(x, weights, size) {
  const $x = convertToTensor(x, "x", "bincount");
  const $weights = convertToTensor(weights, "weights", "bincount");
  assert($x.dtype === "int32", () => `Error in bincount: input dtype must be int32, but got ${$x.dtype}`);
  assert(size >= 0, () => `size must be non-negative, but got ${size}.`);
  assert($weights.size === $x.size || $weights.size === 0, () => `Error in bincount: weights must have the same size as input or0-length, but got input shape: ${$x.shape}, weights shape: ${$weights.shape}.`);
  const inputs = {x: $x, weights: $weights};
  const attrs = {size};
  return ENGINE.runKernel(Bincount, inputs, attrs);
}
const bincount = op({bincount_});
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
function broadcastTo_(x, shape) {
  let input = convertToTensor(x, "broadcastTo", "x");
  const xShape = input.shape;
  if (shape.some((d) => !(d > 0) || d % 1 !== 0)) {
    throw new Error(`broadcastTo(): Invalid broadcast shape [${shape}].`);
  }
  if (shape.length < input.rank) {
    throw new Error(`broadcastTo(): shape.length=${shape.length} < input.rank=${input.rank}.`);
  }
  if (shape.length > input.rank) {
    const newShape = input.shape.slice();
    while (newShape.length < shape.length) {
      newShape.unshift(1);
    }
    input = reshape(input, newShape);
  }
  const inputShape = input.shape;
  const reps = Array.from(shape);
  for (let i = shape.length - 1; i >= 0; i--) {
    if (inputShape[i] === shape[i]) {
      reps[i] = 1;
    } else if (input.shape[i] !== 1) {
      throw new Error(`broadcastTo(): [${xShape}] cannot be broadcast to [${shape}].`);
    }
  }
  const axes = reps.map((n, i) => n > 1 ? i : -1).filter((i) => i >= 0);
  if (axes.length === 0) {
    return clone(input);
  }
  const inputs = {x: input};
  const attrs = {reps};
  return ENGINE.runKernel(Tile, inputs, attrs);
}
const broadcastTo = op({broadcastTo_});
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
function ceil_(x) {
  const $x = convertToTensor(x, "x", "ceil");
  const inputs = {x: $x};
  return ENGINE.runKernel(Ceil, inputs);
}
const ceil = op({ceil_});
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
function clipByValue_(x, clipValueMin, clipValueMax) {
  const $x = convertToTensor(x, "x", "clipByValue");
  assert(clipValueMin <= clipValueMax, () => `Error in clip: min (${clipValueMin}) must be less than or equal to max (${clipValueMax}).`);
  const inputs = {x: $x};
  const attrs = {clipValueMin, clipValueMax};
  return ENGINE.runKernel(ClipByValue, inputs, attrs);
}
const clipByValue = op({clipByValue_});
function concat2d_(tensors, axis) {
  return concat(tensors, axis);
}
const concat2d = op({concat2d_});
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
function conv2d_(x, filter, strides, pad2, dataFormat = "NHWC", dilations = [1, 1], dimRoundingMode) {
  const $x = convertToTensor(x, "x", "conv2d");
  const $filter = convertToTensor(filter, "filter", "conv2d");
  let x4D = $x;
  let reshapedTo4D = false;
  if ($x.rank === 3) {
    reshapedTo4D = true;
    x4D = reshape($x, [1, $x.shape[0], $x.shape[1], $x.shape[2]]);
  }
  assert(x4D.rank === 4, () => `Error in conv2d: input must be rank 4, but got rank ${x4D.rank}.`);
  assert($filter.rank === 4, () => `Error in conv2d: filter must be rank 4, but got rank ${$filter.rank}.`);
  if (dimRoundingMode != null) {
    assert(isInt(pad2), () => `Error in conv2d: pad must be an integer when using, dimRoundingMode ${dimRoundingMode} but got pad ${pad2}.`);
  }
  const inDepth = dataFormat === "NHWC" ? x4D.shape[3] : x4D.shape[1];
  assert(inDepth === $filter.shape[2], () => `Error in conv2d: depth of input (${inDepth}) must match input depth for filter ${$filter.shape[2]}.`);
  assert(eitherStridesOrDilationsAreOne(strides, dilations), () => `Error in conv2D: Either strides or dilations must be 1. Got strides ${strides} and dilations '${dilations}'`);
  const inputs = {x: x4D, filter: $filter};
  const attrs = {strides, pad: pad2, dataFormat, dilations, dimRoundingMode};
  const res = ENGINE.runKernel(Conv2D, inputs, attrs);
  if (reshapedTo4D) {
    return reshape(res, [res.shape[1], res.shape[2], res.shape[3]]);
  }
  return res;
}
const conv2d = op({conv2d_});
function conv1d_(x, filter, stride, pad2, dataFormat = "NWC", dilation = 1, dimRoundingMode) {
  const $x = convertToTensor(x, "x", "conv1d");
  const $filter = convertToTensor(filter, "filter", "conv1d");
  let x3D = $x;
  let reshapedTo3D = false;
  if ($x.rank === 2) {
    reshapedTo3D = true;
    x3D = reshape($x, [1, $x.shape[0], $x.shape[1]]);
  }
  assert(x3D.rank === 3, () => `Error in conv1d: input must be rank 3, but got rank ${x3D.rank}.`);
  assert($filter.rank === 3, () => `Error in conv1d: filter must be rank 3, but got rank ${$filter.rank}.`);
  if (dimRoundingMode != null) {
    assert(isInt(pad2), () => `Error in conv1d: pad must be an integer when using, dimRoundingMode ${dimRoundingMode} but got pad ${pad2}.`);
  }
  assert(x3D.shape[2] === $filter.shape[1], () => `Error in conv1d: depth of input (${x3D.shape[2]}) must match input depth for filter ${$filter.shape[1]}.`);
  assert(eitherStridesOrDilationsAreOne(stride, dilation), () => `Error in conv1D: Either stride or dilation must be 1. Got stride ${stride} and dilation '${dilation}'`);
  assert(dataFormat === "NWC", () => `Error in conv1d: got dataFormat of ${dataFormat} but only NWC is currently supported.`);
  const filter4D = reshape($filter, [1, $filter.shape[0], $filter.shape[1], $filter.shape[2]]);
  const input4D = reshape(x3D, [x3D.shape[0], 1, x3D.shape[1], x3D.shape[2]]);
  const strides = [1, stride];
  const dilations = [1, dilation];
  const conv2dDataFormat = "NHWC";
  const res = conv2d(input4D, filter4D, strides, pad2, conv2dDataFormat, dilations, dimRoundingMode);
  if (reshapedTo3D) {
    return reshape(res, [res.shape[2], res.shape[3]]);
  }
  return reshape(res, [res.shape[0], res.shape[2], res.shape[3]]);
}
const conv1d = op({conv1d_});
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
function conv2DBackpropInput_(xShape, dy, filter, strides, pad2, dataFormat = "NHWC", dimRoundingMode) {
  assert(xShape.length === dy.rank, () => `Length of inShape (${xShape.length}) and rank of dy (${dy.rank}) must match`);
  let xShape4D = xShape;
  let dy4D = dy;
  let reshapedTo4D = false;
  if (dy.rank === 3) {
    reshapedTo4D = true;
    dy4D = reshape(dy, [1, dy.shape[0], dy.shape[1], dy.shape[2]]);
    xShape4D = [1, xShape[0], xShape[1], xShape[2]];
  }
  assert(xShape4D.length === 4, () => `Error in conv2dDerInput: inShape must be length 4, but got length ${xShape4D.length}.`);
  assert(dy4D.rank === 4, () => `Error in conv2dDerInput: dy must be rank 4, but got rank ${dy4D.rank}`);
  assert(filter.rank === 4, () => `Error in conv2dDerInput: filter must be rank 4, but got rank ${filter.rank}`);
  const inDepth = dataFormat === "NHWC" ? xShape4D[3] : xShape4D[1];
  const outDepth = dataFormat === "NHWC" ? dy4D.shape[3] : dy4D.shape[1];
  assert(inDepth === filter.shape[2], () => `Error in conv2dDerInput: depth of input (${inDepth}) must match input depth for filter ${filter.shape[2]}.`);
  assert(outDepth === filter.shape[3], () => `Error in conv2dDerInput: depth of output (${outDepth}) must match output depth for filter ${filter.shape[3]}.`);
  if (dimRoundingMode != null) {
    assert(isInt(pad2), () => `Error in conv2dDerInput: pad must be an integer when using, dimRoundingMode ${dimRoundingMode} but got pad ${pad2}.`);
  }
  const inputs = {dy: dy4D, filter};
  const attrs = {strides, pad: pad2, dataFormat, dimRoundingMode, inputShape: xShape4D};
  const res = ENGINE.runKernel(Conv2DBackpropInput, inputs, attrs);
  if (reshapedTo4D) {
    return reshape(res, [res.shape[1], res.shape[2], res.shape[3]]);
  }
  return res;
}
const conv2DBackpropInput = op({conv2DBackpropInput_});
function conv2dTranspose_(x, filter, outputShape, strides, pad2, dimRoundingMode) {
  const $x = convertToTensor(x, "x", "conv2dTranspose");
  const $filter = convertToTensor(filter, "filter", "conv2dTranspose");
  return conv2DBackpropInput(outputShape, $x, $filter, strides, pad2, "NHWC", dimRoundingMode);
}
const conv2dTranspose = op({conv2dTranspose_});
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
function conv3d_(x, filter, strides, pad2, dataFormat = "NDHWC", dilations = [1, 1, 1]) {
  const $x = convertToTensor(x, "x", "conv3d");
  const $filter = convertToTensor(filter, "filter", "conv3d");
  let x5D = $x;
  let reshapedTo5D = false;
  if ($x.rank === 4) {
    reshapedTo5D = true;
    x5D = reshape($x, [1, $x.shape[0], $x.shape[1], $x.shape[2], $x.shape[3]]);
  }
  assert(x5D.rank === 5, () => `Error in conv3d: input must be rank 5, but got rank ${x5D.rank}.`);
  assert($filter.rank === 5, () => `Error in conv3d: filter must be rank 5, but got rank ${$filter.rank}.`);
  assert(x5D.shape[4] === $filter.shape[3], () => `Error in conv3d: depth of input (${x5D.shape[4]}) must match input depth for filter ${$filter.shape[3]}.`);
  assert(eitherStridesOrDilationsAreOne(strides, dilations), () => `Error in conv3D: Either strides or dilations must be 1. Got strides ${strides} and dilations '${dilations}'`);
  assert(dataFormat === "NDHWC", () => `Error in conv3d: got dataFormat of ${dataFormat} but only NDHWC is currently supported.`);
  const inputs = {x: x5D, filter: $filter};
  const attrs = {strides, pad: pad2, dataFormat, dilations};
  const res = ENGINE.runKernel(Conv3D, inputs, attrs);
  if (reshapedTo5D) {
    return reshape(res, [res.shape[1], res.shape[2], res.shape[3], res.shape[4]]);
  }
  return res;
}
const conv3d = op({conv3d_});
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
function cos_(x) {
  const $x = convertToTensor(x, "x", "cos");
  const inputs = {x: $x};
  return ENGINE.runKernel(Cos, inputs);
}
const cos = op({cos_});
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
function cosh_(x) {
  const $x = convertToTensor(x, "x", "cosh");
  const inputs = {x: $x};
  return ENGINE.runKernel(Cosh, inputs);
}
const cosh = op({cosh_});
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
function cumsum_(x, axis = 0, exclusive = false, reverse2 = false) {
  const $x = convertToTensor(x, "x", "cumsum");
  const inputs = {x: $x};
  const attrs = {axis, exclusive, reverse: reverse2};
  return ENGINE.runKernel(Cumsum, inputs, attrs);
}
const cumsum = op({cumsum_});
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
function denseBincount_(x, weights, size, binaryOutput = false) {
  const $x = convertToTensor(x, "x", "denseBincount");
  const $weights = convertToTensor(weights, "weights", "denseBincount");
  assert($x.dtype === "int32", () => `Error in denseBincount: input dtype must be int32, but got ${$x.dtype}`);
  assert($x.rank <= 2, () => `Error in denseBincount: input must be at most rank 2, but got rank ${$x.rank}.`);
  assert(size >= 0, () => `size must be non-negative, but got ${size}.`);
  assert($weights.size === $x.size || $weights.size === 0, () => `Error in denseBincount: weights must have the same shape as x or 0-length, but got x shape: ${$x.shape}, weights shape: ${$weights.shape}.`);
  const inputs = {x: $x, weights: $weights};
  const attrs = {size, binaryOutput};
  return ENGINE.runKernel(DenseBincount, inputs, attrs);
}
const denseBincount = op({denseBincount_});
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
function depthToSpace_(x, blockSize, dataFormat = "NHWC") {
  const $x = convertToTensor(x, "x", "depthToSpace");
  const inputHeight = dataFormat === "NHWC" ? $x.shape[1] : $x.shape[2];
  const inputWidth = dataFormat === "NHWC" ? $x.shape[2] : $x.shape[3];
  const inputDepth = dataFormat === "NHWC" ? $x.shape[3] : $x.shape[1];
  assert(inputHeight * blockSize >= 0, () => `Negative dimension size caused by overflow when multiplying
    ${inputHeight} and ${blockSize}  for depthToSpace with input shape
    ${$x.shape}`);
  assert(inputWidth * blockSize >= 0, () => `Negative dimension size caused by overflow when multiplying
    ${inputWidth} and ${blockSize} for depthToSpace with input shape
        ${$x.shape}`);
  assert(inputDepth % (blockSize * blockSize) === 0, () => `Dimension size must be evenly divisible by ${blockSize * blockSize} but is ${inputDepth} for depthToSpace with input shape ${$x.shape}`);
  const inputs = {x: $x};
  const attrs = {blockSize, dataFormat};
  return ENGINE.runKernel(DepthToSpace, inputs, attrs);
}
const depthToSpace = op({depthToSpace_});
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
function depthwiseConv2d_(x, filter, strides, pad2, dataFormat = "NHWC", dilations = [1, 1], dimRoundingMode) {
  const $x = convertToTensor(x, "x", "depthwiseConv2d");
  const $filter = convertToTensor(filter, "filter", "depthwiseConv2d");
  let x4D = $x;
  let reshapedTo4D = false;
  if ($x.rank === 3) {
    reshapedTo4D = true;
    x4D = reshape($x, [1, $x.shape[0], $x.shape[1], $x.shape[2]]);
  }
  assert(x4D.rank === 4, () => `Error in depthwiseConv2d: input must be rank 4, but got rank ${x4D.rank}.`);
  assert($filter.rank === 4, () => `Error in depthwiseConv2d: filter must be rank 4, but got rank ${$filter.rank}.`);
  assert(x4D.shape[3] === $filter.shape[2], () => `Error in depthwiseConv2d: number of input channels (${x4D.shape[3]}) must match the inChannels dimension in filter ${$filter.shape[2]}.`);
  if (dimRoundingMode != null) {
    assert(isInt(pad2), () => `Error in depthwiseConv2d: pad must be an integer when using, dimRoundingMode ${dimRoundingMode} but got pad ${pad2}.`);
  }
  const inputs = {x: x4D, filter: $filter};
  const attrs = {strides, pad: pad2, dataFormat, dilations, dimRoundingMode};
  const res = ENGINE.runKernel(DepthwiseConv2dNative, inputs, attrs);
  if (reshapedTo4D) {
    return reshape(res, [res.shape[1], res.shape[2], res.shape[3]]);
  }
  return res;
}
const depthwiseConv2d = op({depthwiseConv2d_});
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
function dilation2d_(x, filter, strides, pad2, dilations = [1, 1], dataFormat = "NHWC") {
  const $x = convertToTensor(x, "x", "dilation2d");
  const $filter = convertToTensor(filter, "filter", "dilation2d");
  assert($x.rank === 3 || $x.rank === 4, () => `Error in dilation2d: input must be rank 3 or 4, but got rank ${$x.rank}.`);
  assert($filter.rank === 3, () => `Error in dilation2d: filter must be rank 3, but got rank ${$filter.rank}.`);
  assert(dataFormat === "NHWC", () => `Error in dilation2d: Only NHWC is currently supported, but got dataFormat of ${dataFormat}`);
  let x4D = $x;
  let reshapedTo4D = false;
  if ($x.rank === 3) {
    x4D = reshape($x, [1, $x.shape[0], $x.shape[1], $x.shape[2]]);
    reshapedTo4D = true;
  }
  const inputs = {x: x4D, filter: $filter};
  const attrs = {strides, pad: pad2, dilations};
  const res = ENGINE.runKernel(Dilation2D, inputs, attrs);
  if (reshapedTo4D) {
    return reshape(res, [res.shape[1], res.shape[2], res.shape[3]]);
  }
  return res;
}
const dilation2d = op({dilation2d_});
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
function equal_(a, b) {
  let $a = convertToTensor(a, "a", "equal");
  let $b = convertToTensor(b, "b", "equal");
  [$a, $b] = makeTypesMatch($a, $b);
  assertAndGetBroadcastShape($a.shape, $b.shape);
  const inputs = {a: $a, b: $b};
  return ENGINE.runKernel(Equal, inputs);
}
const equal = op({equal_});
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
function where_(condition, a, b) {
  const $a = convertToTensor(a, "a", "where");
  const $b = convertToTensor(b, "b", "where");
  const $condition = convertToTensor(condition, "condition", "where", "bool");
  const broadcastShape = assertAndGetBroadcastShape(assertAndGetBroadcastShape($condition.shape, $a.shape), $b.shape);
  const $broadcastedCondition = broadcastTo($condition, broadcastShape);
  const $broadcastedA = broadcastTo($a, broadcastShape);
  const $broadcastedB = broadcastTo($b, broadcastShape);
  const inputs = {
    condition: $broadcastedCondition,
    t: $broadcastedA,
    e: $broadcastedB
  };
  return ENGINE.runKernel(Select, inputs);
}
const where = op({where_});
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
function zerosLike_(x) {
  const $x = convertToTensor(x, "x", "zerosLike");
  const inputs = {x: $x};
  return ENGINE.runKernel(ZerosLike, inputs);
}
const zerosLike = op({zerosLike_});
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
function divNoNan_(a, b) {
  let $a = convertToTensor(a, "a", "div");
  let $b = convertToTensor(b, "b", "div");
  [$a, $b] = makeTypesMatch($a, $b);
  const divResult = div($a, $b);
  const zeros2 = zerosLike(divResult);
  const bEqualsZero = equal($b, zeros2);
  return where(bEqualsZero, zeros2, divResult);
}
const divNoNan = op({divNoNan_});
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
function einsum_(equation, ...tensors) {
  const $tensors = tensors.map((t, i) => convertToTensor(t, `tensors${i}`, "einsum"));
  const attrs = {equation};
  return ENGINE.runKernel(Einsum, $tensors, attrs);
}
const einsum = op({einsum_});
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
function erf_(x) {
  let $x = convertToTensor(x, "x", "erf");
  assert($x.dtype === "int32" || $x.dtype === "float32", () => "Input dtype must be `int32` or `float32`.");
  if ($x.dtype === "int32") {
    $x = cast($x, "float32");
  }
  const inputs = {x: $x};
  return ENGINE.runKernel(Erf, inputs);
}
const erf = op({erf_});
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
function exp_(x) {
  const $x = convertToTensor(x, "x", "exp");
  const inputs = {x: $x};
  return ENGINE.runKernel(Exp, inputs);
}
const exp = op({exp_});
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
function expandDims_(x, axis = 0) {
  const $x = convertToTensor(x, "x", "expandDims", "string_or_numeric");
  assert(axis <= $x.rank, () => "Axis must be <= rank of the tensor");
  const inputs = {input: $x};
  const attrs = {dim: axis};
  return ENGINE.runKernel(ExpandDims, inputs, attrs);
}
const expandDims = op({expandDims_});
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
function expm1_(x) {
  const $x = convertToTensor(x, "x", "expm1");
  const inputs = {x: $x};
  return ENGINE.runKernel(Expm1, inputs);
}
const expm1 = op({expm1_});
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
function tile_(x, reps) {
  const $x = convertToTensor(x, "x", "tile", "string_or_numeric");
  assert($x.rank === reps.length, () => `Error in transpose: rank of input ${$x.rank} must match length of reps ${reps}.`);
  const inputs = {x: $x};
  const attrs = {reps};
  return ENGINE.runKernel(Tile, inputs, attrs);
}
const tile = op({tile_});
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
function eye_(numRows, numColumns, batchShape, dtype = "float32") {
  if (numColumns == null) {
    numColumns = numRows;
  }
  const buff = buffer([numRows, numColumns], dtype);
  const n = numRows <= numColumns ? numRows : numColumns;
  for (let i = 0; i < n; ++i) {
    buff.set(1, i, i);
  }
  const out = reshape(buff.toTensor(), [numRows, numColumns]);
  if (batchShape == null) {
    return out;
  } else {
    if (batchShape.length === 1) {
      return tile(expandDims(out, 0), [batchShape[0], 1, 1]);
    } else if (batchShape.length === 2) {
      return tile(expandDims(expandDims(out, 0), 0), [batchShape[0], batchShape[1], 1, 1]);
    } else if (batchShape.length === 3) {
      return tile(expandDims(expandDims(expandDims(out, 0), 0), 0), [
        batchShape[0],
        batchShape[1],
        batchShape[2],
        1,
        1
      ]);
    } else {
      throw new Error(`eye() currently supports only 1D and 2D batchShapes, but received ${batchShape.length}D.`);
    }
  }
}
const eye = op({eye_});
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
function fill(shape, value, dtype) {
  const attrs = {shape, value, dtype};
  return ENGINE.runKernel(Fill, {}, attrs);
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
function floor_(x) {
  const $x = convertToTensor(x, "x", "floor");
  const inputs = {x: $x};
  return ENGINE.runKernel(Floor, inputs);
}
const floor = op({floor_});
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
function gather_(x, indices, axis = 0, batchDims = 0) {
  const $x = convertToTensor(x, "x", "gather");
  const $indices = convertToTensor(indices, "indices", "gather", "int32");
  const inputs = {x: $x, indices: $indices};
  const attrs = {axis, batchDims};
  return ENGINE.runKernel(GatherV2, inputs, attrs);
}
const gather = op({gather_});
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
function greater_(a, b) {
  let $a = convertToTensor(a, "a", "greater");
  let $b = convertToTensor(b, "b", "greater");
  [$a, $b] = makeTypesMatch($a, $b);
  assertAndGetBroadcastShape($a.shape, $b.shape);
  const inputs = {a: $a, b: $b};
  return ENGINE.runKernel(Greater, inputs);
}
const greater = op({greater_});
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
function greaterEqual_(a, b) {
  let $a = convertToTensor(a, "a", "greaterEqual");
  let $b = convertToTensor(b, "b", "greaterEqual");
  [$a, $b] = makeTypesMatch($a, $b);
  assertAndGetBroadcastShape($a.shape, $b.shape);
  const inputs = {a: $a, b: $b};
  return ENGINE.runKernel(GreaterEqual, inputs);
}
const greaterEqual = op({greaterEqual_});
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
function imag_(input) {
  const $input = convertToTensor(input, "input", "imag");
  const inputs = {input: $input};
  return ENGINE.runKernel(Imag, inputs);
}
const imag = op({imag_});
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
function isNaN_(x) {
  const $x = convertToTensor(x, "x", "isNaN");
  const inputs = {x: $x};
  return ENGINE.runKernel(IsNan, inputs);
}
const isNaN$1 = op({isNaN_});
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
function less_(a, b) {
  let $a = convertToTensor(a, "a", "less");
  let $b = convertToTensor(b, "b", "less");
  [$a, $b] = makeTypesMatch($a, $b);
  assertAndGetBroadcastShape($a.shape, $b.shape);
  const inputs = {a: $a, b: $b};
  return ENGINE.runKernel(Less, inputs);
}
const less = op({less_});
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
function lessEqual_(a, b) {
  let $a = convertToTensor(a, "a", "lessEqual");
  let $b = convertToTensor(b, "b", "lessEqual");
  [$a, $b] = makeTypesMatch($a, $b);
  assertAndGetBroadcastShape($a.shape, $b.shape);
  const inputs = {a: $a, b: $b};
  return ENGINE.runKernel(LessEqual, inputs);
}
const lessEqual = op({lessEqual_});
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
function linspace(start, stop, num) {
  if (num <= 0) {
    throw new Error("The number of values should be positive.");
  }
  const attrs = {start, stop, num};
  return ENGINE.runKernel(LinSpace, {}, attrs);
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
function localResponseNormalization_(x, depthRadius = 5, bias = 1, alpha = 1, beta = 0.5) {
  const $x = convertToTensor(x, "x", "localResponseNormalization");
  assert($x.rank === 4 || $x.rank === 3, () => `Error in localResponseNormalization: x must be rank 3 or 4 but got
               rank ${$x.rank}.`);
  assert(isInt(depthRadius), () => `Error in localResponseNormalization: depthRadius must be an integer but got depthRadius ${depthRadius}.`);
  let x4D = $x;
  let reshapedTo4D = false;
  if ($x.rank === 3) {
    reshapedTo4D = true;
    x4D = reshape($x, [1, $x.shape[0], $x.shape[1], $x.shape[2]]);
  }
  const inputs = {x: x4D};
  const attrs = {depthRadius, bias, alpha, beta};
  const res = ENGINE.runKernel(LRN, inputs, attrs);
  if (reshapedTo4D) {
    return reshape(res, [res.shape[1], res.shape[2], res.shape[3]]);
  } else {
    return res;
  }
}
const localResponseNormalization = op({localResponseNormalization_});
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
function log_(x) {
  const $x = convertToTensor(x, "x", "log");
  const inputs = {x: $x};
  return ENGINE.runKernel(Log, inputs);
}
const log = op({log_});
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
function log1p_(x) {
  const $x = convertToTensor(x, "x", "log1p");
  const inputs = {x: $x};
  return ENGINE.runKernel(Log1p, inputs);
}
const log1p = op({log1p_});
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
function grad(f) {
  assert(isFunction(f), () => "The f passed in grad(f) must be a function");
  return (x, dy) => {
    const $x = convertToTensor(x, "x", "tf.grad", "string_or_numeric");
    const $dy = dy != null ? convertToTensor(dy, "dy", "tf.grad") : null;
    return ENGINE.tidy(() => {
      const {value, grads: grads2} = ENGINE.gradients(() => f($x), [$x], $dy);
      if ($dy != null) {
        assertShapesMatch(value.shape, $dy.shape, "The shape of dy passed in grad(f)(x, dy) must match the shape returned by f(x)");
      }
      checkGrads(grads2);
      return grads2[0];
    });
  };
}
function grads(f) {
  assert(isFunction(f), () => "The f passed in grads(f) must be a function");
  return (args, dy) => {
    assert(Array.isArray(args), () => "The args passed in grads(f)(args) must be an array of `Tensor`s or `TensorLike`s");
    const $args = convertToTensorArray(args, "args", "tf.grads", "string_or_numeric");
    const $dy = dy != null ? convertToTensor(dy, "dy", "tf.grads") : null;
    return ENGINE.tidy(() => {
      const {value, grads: grads2} = ENGINE.gradients(() => f(...$args), $args, $dy);
      if ($dy != null) {
        assertShapesMatch(value.shape, $dy.shape, "The shape of dy passed in grads(f)([x1,...], dy) must match the shape returned by f([x1,...])");
      }
      checkGrads(grads2);
      return grads2;
    });
  };
}
function valueAndGrad(f) {
  assert(isFunction(f), () => "The f passed in valueAndGrad(f) must be a function");
  return (x, dy) => {
    assert(x instanceof Tensor, () => "The x passed in valueAndGrad(f)(x) must be a tensor");
    assert(dy == null || dy instanceof Tensor, () => "The dy passed in valueAndGrad(f)(x, dy) must be a tensor");
    const {grads: grads2, value} = ENGINE.gradients(() => f(x), [x], dy);
    checkGrads(grads2);
    return {grad: grads2[0], value};
  };
}
function valueAndGrads(f) {
  assert(isFunction(f), () => "The f passed in valueAndGrads(f) must be a function");
  return (args, dy) => {
    assert(Array.isArray(args) && args.every((arg) => arg instanceof Tensor), () => "The args passed in valueAndGrads(f)(args) must be array of tensors");
    assert(dy == null || dy instanceof Tensor, () => "The dy passed in valueAndGrads(f)(args, dy) must be a tensor");
    const res = ENGINE.gradients(() => f(...args), args, dy);
    if (dy != null) {
      assertShapesMatch(res.value.shape, dy.shape, "The shape of dy passed in valueAndGrads(f)([x1,...], dy) must match the shape returned by f([x1,...])");
    }
    checkGrads(res.grads);
    return res;
  };
}
function variableGrads(f, varList) {
  assert(isFunction(f), () => "The f passed in variableGrads(f) must be a function");
  assert(varList == null || Array.isArray(varList) && varList.every((v) => v instanceof Variable), () => "The varList passed in variableGrads(f, varList) must be an array of variables");
  const specifiedVarList = varList != null;
  if (!specifiedVarList) {
    varList = [];
    for (const varName in ENGINE.registeredVariables) {
      varList.push(ENGINE.registeredVariables[varName]);
    }
  }
  const specifiedNonTrainable = specifiedVarList ? varList.filter((variable) => !variable.trainable) : null;
  const originalVarCount = varList.length;
  varList = varList.filter((variable) => variable.trainable);
  assert(varList.length > 0, () => `variableGrads() expects at least one of the input variables to be trainable, but none of the ${originalVarCount} variables is trainable.`);
  const allowNoGradients = true;
  const {value, grads: grads2} = ENGINE.gradients(f, varList, null, allowNoGradients);
  assert(grads2.some((g) => g != null), () => "Cannot find a connection between any variable and the result of the loss function y=f(x). Please make sure the operations that use variables are inside the function f passed to minimize().");
  assert(value.rank === 0, () => `The f passed in variableGrads(f) must return a scalar, but it returned a rank-${value.rank} tensor`);
  const namedGrads = {};
  varList.forEach((v, i) => {
    if (grads2[i] != null) {
      namedGrads[v.name] = grads2[i];
    }
  });
  if (specifiedNonTrainable != null) {
    specifiedNonTrainable.forEach((v) => namedGrads[v.name] = null);
  }
  return {value, grads: namedGrads};
}
function customGrad(f) {
  return ENGINE.customGrad(f);
}
function checkGrads(grads2) {
  const numNullGradients = grads2.filter((g) => g == null).length;
  if (numNullGradients > 0) {
    throw new Error(`Cannot compute gradient of y=f(x) with respect to x. Make sure that
    the f you passed encloses all operations that lead from x to y.`);
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
function neg_(x) {
  const $x = convertToTensor(x, "x", "neg");
  const inputs = {x: $x};
  return ENGINE.runKernel(Neg, inputs);
}
const neg = op({neg_});
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
function softplus_(x) {
  const $x = convertToTensor(x, "x", "softplus");
  const inputs = {x: $x};
  return ENGINE.runKernel(Softplus, inputs);
}
const softplus = op({softplus_});
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
function max_(x, axis = null, keepDims = false) {
  const $x = convertToTensor(x, "x", "max");
  const inputs = {x: $x};
  const attrs = {reductionIndices: axis, keepDims};
  return ENGINE.runKernel(Max, inputs, attrs);
}
const max = op({max_});
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
function sub_(a, b) {
  let $a = convertToTensor(a, "a", "sub");
  let $b = convertToTensor(b, "b", "sub");
  [$a, $b] = makeTypesMatch($a, $b);
  const inputs = {a: $a, b: $b};
  return ENGINE.runKernel(Sub, inputs);
}
const sub = op({sub_});
/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
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
function logSoftmax_(logits, axis = -1) {
  const $logits = convertToTensor(logits, "logits", "logSoftmax");
  if (axis === -1) {
    axis = $logits.rank - 1;
  }
  if (axis !== $logits.rank - 1) {
    throw Error(`Log Softmax along a non-last dimension is not yet supported. Logits was rank ${$logits.rank} and axis was ${axis}`);
  }
  const customOp = customGrad((logits2, save) => {
    const keepDims = true;
    const xMax = max(logits2, axis, true);
    const shifted = sub(logits2, xMax);
    const value = sub(cast(shifted, "float32"), log(sum(exp(shifted), axis, keepDims)));
    save([value]);
    const gradFunc = (dy, saved) => {
      const [value2] = saved;
      const keepDims2 = true;
      const softmax2 = exp(value2);
      return sub(dy, mul(sum(dy, axis, keepDims2), softmax2));
    };
    return {value, gradFunc};
  });
  return customOp($logits);
}
const logSoftmax = op({logSoftmax_});
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
function logSumExp_(x, axis = null, keepDims = false) {
  const $x = convertToTensor(x, "x", "logSumExp");
  const axes = parseAxisParam(axis, $x.shape);
  const xMax = max($x, axes, true);
  const a = sub($x, xMax);
  const b = exp(a);
  const c = sum(b, axes);
  const d = log(c);
  const res = add(reshape(xMax, d.shape), d);
  if (keepDims) {
    const newShape = expandShapeToKeepDim(res.shape, axes);
    return reshape(res, newShape);
  }
  return res;
}
const logSumExp = op({logSumExp_});
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
function logicalAnd_(a, b) {
  const $a = convertToTensor(a, "a", "logicalAnd", "bool");
  const $b = convertToTensor(b, "b", "logicalAnd", "bool");
  assertAndGetBroadcastShape($a.shape, $b.shape);
  const inputs = {a: $a, b: $b};
  return ENGINE.runKernel(LogicalAnd, inputs);
}
const logicalAnd = op({logicalAnd_});
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
function logicalNot_(x) {
  const $x = convertToTensor(x, "x", "logicalNot", "bool");
  const inputs = {x: $x};
  return ENGINE.runKernel(LogicalNot, inputs);
}
const logicalNot = op({logicalNot_});
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
function logicalOr_(a, b) {
  const $a = convertToTensor(a, "a", "logicalOr", "bool");
  const $b = convertToTensor(b, "b", "logicalOr", "bool");
  assertAndGetBroadcastShape($a.shape, $b.shape);
  const inputs = {a: $a, b: $b};
  return ENGINE.runKernel(LogicalOr, inputs);
}
const logicalOr = op({logicalOr_});
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
function maxPool_(x, filterSize, strides, pad2, dimRoundingMode) {
  const $x = convertToTensor(x, "x", "maxPool");
  const dilations = 1;
  let x4D = $x;
  let reshapedTo4D = false;
  if ($x.rank === 3) {
    reshapedTo4D = true;
    x4D = reshape($x, [1, $x.shape[0], $x.shape[1], $x.shape[2]]);
  }
  assert(x4D.rank === 4, () => `Error in maxPool: input must be rank 4 but got rank ${x4D.rank}.`);
  assert(eitherStridesOrDilationsAreOne(strides, dilations), () => `Error in maxPool: Either strides or dilations must be 1. Got strides ${strides} and dilations '${dilations}'`);
  if (dimRoundingMode != null) {
    assert(isInt(pad2), () => `Error in maxPool: pad must be an integer when using, dimRoundingMode ${dimRoundingMode} but got pad ${pad2}.`);
  }
  const inputs = {x: x4D};
  const attrs = {filterSize, strides, pad: pad2, dimRoundingMode};
  const res = ENGINE.runKernel(MaxPool, inputs, attrs);
  if (reshapedTo4D) {
    return reshape(res, [res.shape[1], res.shape[2], res.shape[3]]);
  }
  return res;
}
const maxPool = op({maxPool_});
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
function maxPool3d_(x, filterSize = [1, 1, 1], strides, pad2, dimRoundingMode, dataFormat = "NDHWC") {
  const $x = convertToTensor(x, "x", "maxPool3d");
  let x5D = $x;
  let reshapedTo5D = false;
  if ($x.rank === 4) {
    reshapedTo5D = true;
    x5D = reshape($x, [1, $x.shape[0], $x.shape[1], $x.shape[2], $x.shape[3]]);
  }
  assert(x5D.rank === 5, () => `Error in maxPool3d: x must be rank 5 but got rank ${x5D.rank}.`);
  assert(dataFormat === "NDHWC", () => `Error in maxPool3d: Only NDHWC is currently supported, but got dataFormat of ${dataFormat}`);
  if (dimRoundingMode != null) {
    assert(isInt(pad2), () => `Error in maxPool3d: pad must be an integer when using, dimRoundingMode ${dimRoundingMode} but got pad ${pad2}.`);
  }
  const inputs = {x: x5D};
  const attrs = {filterSize, strides, pad: pad2, dimRoundingMode, dataFormat};
  const res = ENGINE.runKernel(MaxPool3D, inputs, attrs);
  if (reshapedTo5D) {
    return reshape(res, [res.shape[1], res.shape[2], res.shape[3], res.shape[4]]);
  }
  return res;
}
const maxPool3d = op({maxPool3d_});
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
function maxPoolWithArgmax_(x, filterSize, strides, pad2, includeBatchInIndex = false) {
  const $x = convertToTensor(x, "x", "maxPoolWithArgmax");
  const inputs = {x: $x};
  const attrs = {filterSize, strides, pad: pad2, includeBatchInIndex};
  const result = ENGINE.runKernel(MaxPoolWithArgmax, inputs, attrs);
  return {result: result[0], indexes: result[1]};
}
const maxPoolWithArgmax = op({maxPoolWithArgmax_});
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
function maximum_(a, b) {
  let $a = convertToTensor(a, "a", "maximum");
  let $b = convertToTensor(b, "b", "maximum");
  [$a, $b] = makeTypesMatch($a, $b);
  if ($a.dtype === "bool") {
    $a = cast($a, "int32");
    $b = cast($b, "int32");
  }
  assertAndGetBroadcastShape($a.shape, $b.shape);
  const inputs = {a: $a, b: $b};
  return ENGINE.runKernel(Maximum, inputs);
}
const maximum = op({maximum_});
/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
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
function mean_(x, axis = null, keepDims = false) {
  const $x = convertToTensor(x, "x", "mean");
  const inputs = {x: $x};
  const attrs = {axis, keepDims};
  return ENGINE.runKernel(Mean, inputs, attrs);
}
const mean = op({mean_});
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
function zeros(shape, dtype = "float32") {
  if (dtype === "complex64") {
    const real2 = zeros(shape, "float32");
    const imag2 = zeros(shape, "float32");
    return complex(real2, imag2);
  }
  const values = makeZerosTypedArray(sizeFromShape(shape), dtype);
  return ENGINE.makeTensor(values, shape, dtype);
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
function ones(shape, dtype = "float32") {
  if (dtype === "complex64") {
    const real2 = ones(shape, "float32");
    const imag2 = zeros(shape, "float32");
    return complex(real2, imag2);
  }
  const values = makeOnesTypedArray(sizeFromShape(shape), dtype);
  return ENGINE.makeTensor(values, shape, dtype);
}
/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
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
function min_(x, axis = null, keepDims = false) {
  const $x = convertToTensor(x, "x", "min");
  const inputs = {x: $x};
  const attrs = {axis, keepDims};
  return ENGINE.runKernel(Min, inputs, attrs);
}
const min = op({min_});
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
function minimum_(a, b) {
  let $a = convertToTensor(a, "a", "minimum");
  let $b = convertToTensor(b, "b", "minimum");
  [$a, $b] = makeTypesMatch($a, $b);
  if ($a.dtype === "bool") {
    $a = cast($a, "int32");
    $b = cast($b, "int32");
  }
  assertAndGetBroadcastShape($a.shape, $b.shape);
  const inputs = {a: $a, b: $b};
  return ENGINE.runKernel(Minimum, inputs);
}
const minimum = op({minimum_});
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
function mirrorPad_(x, paddings, mode) {
  assert(mode === "reflect" || mode === "symmetric", () => `Invalid mode. Mode must be either reflect or symmetric. Got ${mode}.`);
  const $x = convertToTensor(x, "x", "mirrorPad");
  if ($x.rank === 0) {
    throw new Error("mirrorPad(scalar) is not defined. Pass non-scalar to mirrorPad");
  }
  assert(paddings.length === $x.rank, () => `Padding doesn't match input. Must be ${$x.rank}. Got ${paddings.length}.`);
  const shapeOffset = mode === "reflect" ? 1 : 0;
  for (let i = 0; i < $x.rank; i++) {
    assert(paddings[i].length === 2, () => `Invalid number of paddings. Must be length of 2 each.`);
    assert(paddings[i][0] >= 0 && paddings[i][0] <= $x.shape[i] - shapeOffset && paddings[i][1] >= 0 && paddings[i][1] <= $x.shape[i] - shapeOffset, () => `Padding in dimension ${i} cannot be greater than or equal to ${$x.shape[i] - shapeOffset} or less than 0 for input of shape ${$x.shape}`);
  }
  const attrs = {paddings, mode};
  const inputs = {x: $x};
  return ENGINE.runKernel(MirrorPad, inputs, attrs);
}
const mirrorPad = op({mirrorPad_});
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
function mod_(a, b) {
  let $a = convertToTensor(a, "a", "mod");
  let $b = convertToTensor(b, "b", "mod");
  [$a, $b] = makeTypesMatch($a, $b);
  const inputs = {a: $a, b: $b};
  return ENGINE.runKernel(Mod, inputs);
}
const mod = op({mod_});
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
function square_(x) {
  const $x = convertToTensor(x, "x", "square");
  const attrs = {};
  return ENGINE.runKernel("Square", {x: $x}, attrs);
}
const square = op({square_});
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
function multinomial_(logits, numSamples, seed, normalized = false) {
  const $logits = convertToTensor(logits, "logits", "multinomial");
  const numOutcomes = $logits.size;
  const origRank = $logits.rank;
  if (numOutcomes < 2) {
    throw new Error(`Error in multinomial: you need at least 2 outcomes, but got ${numOutcomes}.`);
  }
  if (origRank > 2) {
    throw new Error(`Rank of probabilities must be 1 or 2, but is ${origRank}`);
  }
  seed = seed || Math.random();
  const logits2D = origRank === 1 ? reshape($logits, [1, -1]) : $logits;
  const inputs = {logits: logits2D};
  const attrs = {numSamples, seed, normalized};
  const res = ENGINE.runKernel(Multinomial, inputs, attrs);
  return origRank === 1 ? reshape(res, [res.size]) : res;
}
const multinomial = op({multinomial_});
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
function notEqual_(a, b) {
  let $a = convertToTensor(a, "a", "notEqual");
  let $b = convertToTensor(b, "b", "notEqual");
  [$a, $b] = makeTypesMatch($a, $b);
  assertAndGetBroadcastShape($a.shape, $b.shape);
  const inputs = {a: $a, b: $b};
  return ENGINE.runKernel(NotEqual, inputs);
}
const notEqual = op({notEqual_});
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
function onesLike_(x) {
  const $x = convertToTensor(x, "x", "onesLike");
  const inputs = {x: $x};
  return ENGINE.runKernel(OnesLike, inputs);
}
const onesLike = op({onesLike_});
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
function pad_(x, paddings, constantValue = 0) {
  const $x = convertToTensor(x, "x", "pad");
  if ($x.rank === 0) {
    throw new Error("pad(scalar) is not defined. Pass non-scalar to pad");
  }
  const attrs = {paddings, constantValue};
  const inputs = {x: $x};
  return ENGINE.runKernel(PadV2, inputs, attrs);
}
const pad = op({pad_});
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
function spaceToBatchND_(x, blockShape, paddings) {
  const $x = convertToTensor(x, "x", "spaceToBatchND");
  assert($x.rank >= 1 + blockShape.length, () => `input rank ${$x.rank} should be > than [blockShape] ${blockShape.length}`);
  assert(paddings.length === blockShape.length, () => `paddings.shape[0] ${paddings.length} must be equal to [blockShape] ${blockShape.length}`);
  assert($x.shape.reduce((a, b, i) => {
    if (i > 0 && i <= blockShape.length) {
      return a && (b + paddings[i - 1][0] + paddings[i - 1][1]) % blockShape[i - 1] === 0;
    }
    return a;
  }, true), () => `input spatial dimensions ${$x.shape.slice(1)} with paddings ${paddings.toString()} must be divisible by blockShapes ${blockShape.toString()}`);
  const inputs = {x: $x};
  const attrs = {blockShape, paddings};
  return ENGINE.runKernel(SpaceToBatchND, inputs, attrs);
}
const spaceToBatchND = op({spaceToBatchND_});
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
function pow_(base, exp2) {
  let $base = convertToTensor(base, "base", "pow");
  let $exp = convertToTensor(exp2, "exp", "pow");
  [$base, $exp] = makeTypesMatch($base, $exp);
  const inputs = {a: $base, b: $exp};
  return ENGINE.runKernel(Pow, inputs);
}
const pow = op({pow_});
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
function prod_(x, axis = null, keepDims = false) {
  let $x = convertToTensor(x, "x", "prod");
  if ($x.dtype === "bool") {
    $x = cast($x, "int32");
  }
  const inputs = {x: $x};
  const attrs = {axis, keepDims};
  return ENGINE.runKernel(Prod, inputs, attrs);
}
const prod = op({prod_});
var alea = createCommonjsModule(function(module) {
  (function(global, module2, define) {
    function Alea(seed) {
      var me = this, mash = Mash();
      me.next = function() {
        var t = 2091639 * me.s0 + me.c * 23283064365386963e-26;
        me.s0 = me.s1;
        me.s1 = me.s2;
        return me.s2 = t - (me.c = t | 0);
      };
      me.c = 1;
      me.s0 = mash(" ");
      me.s1 = mash(" ");
      me.s2 = mash(" ");
      me.s0 -= mash(seed);
      if (me.s0 < 0) {
        me.s0 += 1;
      }
      me.s1 -= mash(seed);
      if (me.s1 < 0) {
        me.s1 += 1;
      }
      me.s2 -= mash(seed);
      if (me.s2 < 0) {
        me.s2 += 1;
      }
      mash = null;
    }
    function copy(f, t) {
      t.c = f.c;
      t.s0 = f.s0;
      t.s1 = f.s1;
      t.s2 = f.s2;
      return t;
    }
    function impl(seed, opts) {
      var xg = new Alea(seed), state = opts && opts.state, prng = xg.next;
      prng.int32 = function() {
        return xg.next() * 4294967296 | 0;
      };
      prng.double = function() {
        return prng() + (prng() * 2097152 | 0) * 11102230246251565e-32;
      };
      prng.quick = prng;
      if (state) {
        if (typeof state == "object")
          copy(state, xg);
        prng.state = function() {
          return copy(xg, {});
        };
      }
      return prng;
    }
    function Mash() {
      var n = 4022871197;
      var mash = function(data) {
        data = data.toString();
        for (var i = 0; i < data.length; i++) {
          n += data.charCodeAt(i);
          var h = 0.02519603282416938 * n;
          n = h >>> 0;
          h -= n;
          h *= n;
          n = h >>> 0;
          h -= n;
          n += h * 4294967296;
        }
        return (n >>> 0) * 23283064365386963e-26;
      };
      return mash;
    }
    if (module2 && module2.exports) {
      module2.exports = impl;
    } else if (define && define.amd) {
      define(function() {
        return impl;
      });
    } else {
      this.alea = impl;
    }
  })(commonjsGlobal, module, false);
});
var xor128 = createCommonjsModule(function(module) {
  (function(global, module2, define) {
    function XorGen(seed) {
      var me = this, strseed = "";
      me.x = 0;
      me.y = 0;
      me.z = 0;
      me.w = 0;
      me.next = function() {
        var t = me.x ^ me.x << 11;
        me.x = me.y;
        me.y = me.z;
        me.z = me.w;
        return me.w ^= me.w >>> 19 ^ t ^ t >>> 8;
      };
      if (seed === (seed | 0)) {
        me.x = seed;
      } else {
        strseed += seed;
      }
      for (var k = 0; k < strseed.length + 64; k++) {
        me.x ^= strseed.charCodeAt(k) | 0;
        me.next();
      }
    }
    function copy(f, t) {
      t.x = f.x;
      t.y = f.y;
      t.z = f.z;
      t.w = f.w;
      return t;
    }
    function impl(seed, opts) {
      var xg = new XorGen(seed), state = opts && opts.state, prng = function() {
        return (xg.next() >>> 0) / 4294967296;
      };
      prng.double = function() {
        do {
          var top = xg.next() >>> 11, bot = (xg.next() >>> 0) / 4294967296, result = (top + bot) / (1 << 21);
        } while (result === 0);
        return result;
      };
      prng.int32 = xg.next;
      prng.quick = prng;
      if (state) {
        if (typeof state == "object")
          copy(state, xg);
        prng.state = function() {
          return copy(xg, {});
        };
      }
      return prng;
    }
    if (module2 && module2.exports) {
      module2.exports = impl;
    } else if (define && define.amd) {
      define(function() {
        return impl;
      });
    } else {
      this.xor128 = impl;
    }
  })(commonjsGlobal, module, false);
});
var xorwow = createCommonjsModule(function(module) {
  (function(global, module2, define) {
    function XorGen(seed) {
      var me = this, strseed = "";
      me.next = function() {
        var t = me.x ^ me.x >>> 2;
        me.x = me.y;
        me.y = me.z;
        me.z = me.w;
        me.w = me.v;
        return (me.d = me.d + 362437 | 0) + (me.v = me.v ^ me.v << 4 ^ (t ^ t << 1)) | 0;
      };
      me.x = 0;
      me.y = 0;
      me.z = 0;
      me.w = 0;
      me.v = 0;
      if (seed === (seed | 0)) {
        me.x = seed;
      } else {
        strseed += seed;
      }
      for (var k = 0; k < strseed.length + 64; k++) {
        me.x ^= strseed.charCodeAt(k) | 0;
        if (k == strseed.length) {
          me.d = me.x << 10 ^ me.x >>> 4;
        }
        me.next();
      }
    }
    function copy(f, t) {
      t.x = f.x;
      t.y = f.y;
      t.z = f.z;
      t.w = f.w;
      t.v = f.v;
      t.d = f.d;
      return t;
    }
    function impl(seed, opts) {
      var xg = new XorGen(seed), state = opts && opts.state, prng = function() {
        return (xg.next() >>> 0) / 4294967296;
      };
      prng.double = function() {
        do {
          var top = xg.next() >>> 11, bot = (xg.next() >>> 0) / 4294967296, result = (top + bot) / (1 << 21);
        } while (result === 0);
        return result;
      };
      prng.int32 = xg.next;
      prng.quick = prng;
      if (state) {
        if (typeof state == "object")
          copy(state, xg);
        prng.state = function() {
          return copy(xg, {});
        };
      }
      return prng;
    }
    if (module2 && module2.exports) {
      module2.exports = impl;
    } else if (define && define.amd) {
      define(function() {
        return impl;
      });
    } else {
      this.xorwow = impl;
    }
  })(commonjsGlobal, module, false);
});
var xorshift7 = createCommonjsModule(function(module) {
  (function(global, module2, define) {
    function XorGen(seed) {
      var me = this;
      me.next = function() {
        var X = me.x, i = me.i, t, v;
        t = X[i];
        t ^= t >>> 7;
        v = t ^ t << 24;
        t = X[i + 1 & 7];
        v ^= t ^ t >>> 10;
        t = X[i + 3 & 7];
        v ^= t ^ t >>> 3;
        t = X[i + 4 & 7];
        v ^= t ^ t << 7;
        t = X[i + 7 & 7];
        t = t ^ t << 13;
        v ^= t ^ t << 9;
        X[i] = v;
        me.i = i + 1 & 7;
        return v;
      };
      function init(me2, seed2) {
        var j, X = [];
        if (seed2 === (seed2 | 0)) {
          X[0] = seed2;
        } else {
          seed2 = "" + seed2;
          for (j = 0; j < seed2.length; ++j) {
            X[j & 7] = X[j & 7] << 15 ^ seed2.charCodeAt(j) + X[j + 1 & 7] << 13;
          }
        }
        while (X.length < 8)
          X.push(0);
        for (j = 0; j < 8 && X[j] === 0; ++j)
          ;
        if (j == 8)
          X[7] = -1;
        me2.x = X;
        me2.i = 0;
        for (j = 256; j > 0; --j) {
          me2.next();
        }
      }
      init(me, seed);
    }
    function copy(f, t) {
      t.x = f.x.slice();
      t.i = f.i;
      return t;
    }
    function impl(seed, opts) {
      if (seed == null)
        seed = +new Date();
      var xg = new XorGen(seed), state = opts && opts.state, prng = function() {
        return (xg.next() >>> 0) / 4294967296;
      };
      prng.double = function() {
        do {
          var top = xg.next() >>> 11, bot = (xg.next() >>> 0) / 4294967296, result = (top + bot) / (1 << 21);
        } while (result === 0);
        return result;
      };
      prng.int32 = xg.next;
      prng.quick = prng;
      if (state) {
        if (state.x)
          copy(state, xg);
        prng.state = function() {
          return copy(xg, {});
        };
      }
      return prng;
    }
    if (module2 && module2.exports) {
      module2.exports = impl;
    } else if (define && define.amd) {
      define(function() {
        return impl;
      });
    } else {
      this.xorshift7 = impl;
    }
  })(commonjsGlobal, module, false);
});
var xor4096 = createCommonjsModule(function(module) {
  (function(global, module2, define) {
    function XorGen(seed) {
      var me = this;
      me.next = function() {
        var w = me.w, X = me.X, i = me.i, t, v;
        me.w = w = w + 1640531527 | 0;
        v = X[i + 34 & 127];
        t = X[i = i + 1 & 127];
        v ^= v << 13;
        t ^= t << 17;
        v ^= v >>> 15;
        t ^= t >>> 12;
        v = X[i] = v ^ t;
        me.i = i;
        return v + (w ^ w >>> 16) | 0;
      };
      function init(me2, seed2) {
        var t, v, i, j, w, X = [], limit = 128;
        if (seed2 === (seed2 | 0)) {
          v = seed2;
          seed2 = null;
        } else {
          seed2 = seed2 + "\0";
          v = 0;
          limit = Math.max(limit, seed2.length);
        }
        for (i = 0, j = -32; j < limit; ++j) {
          if (seed2)
            v ^= seed2.charCodeAt((j + 32) % seed2.length);
          if (j === 0)
            w = v;
          v ^= v << 10;
          v ^= v >>> 15;
          v ^= v << 4;
          v ^= v >>> 13;
          if (j >= 0) {
            w = w + 1640531527 | 0;
            t = X[j & 127] ^= v + w;
            i = t == 0 ? i + 1 : 0;
          }
        }
        if (i >= 128) {
          X[(seed2 && seed2.length || 0) & 127] = -1;
        }
        i = 127;
        for (j = 4 * 128; j > 0; --j) {
          v = X[i + 34 & 127];
          t = X[i = i + 1 & 127];
          v ^= v << 13;
          t ^= t << 17;
          v ^= v >>> 15;
          t ^= t >>> 12;
          X[i] = v ^ t;
        }
        me2.w = w;
        me2.X = X;
        me2.i = i;
      }
      init(me, seed);
    }
    function copy(f, t) {
      t.i = f.i;
      t.w = f.w;
      t.X = f.X.slice();
      return t;
    }
    function impl(seed, opts) {
      if (seed == null)
        seed = +new Date();
      var xg = new XorGen(seed), state = opts && opts.state, prng = function() {
        return (xg.next() >>> 0) / 4294967296;
      };
      prng.double = function() {
        do {
          var top = xg.next() >>> 11, bot = (xg.next() >>> 0) / 4294967296, result = (top + bot) / (1 << 21);
        } while (result === 0);
        return result;
      };
      prng.int32 = xg.next;
      prng.quick = prng;
      if (state) {
        if (state.X)
          copy(state, xg);
        prng.state = function() {
          return copy(xg, {});
        };
      }
      return prng;
    }
    if (module2 && module2.exports) {
      module2.exports = impl;
    } else if (define && define.amd) {
      define(function() {
        return impl;
      });
    } else {
      this.xor4096 = impl;
    }
  })(commonjsGlobal, module, false);
});
var tychei = createCommonjsModule(function(module) {
  (function(global, module2, define) {
    function XorGen(seed) {
      var me = this, strseed = "";
      me.next = function() {
        var b = me.b, c = me.c, d = me.d, a = me.a;
        b = b << 25 ^ b >>> 7 ^ c;
        c = c - d | 0;
        d = d << 24 ^ d >>> 8 ^ a;
        a = a - b | 0;
        me.b = b = b << 20 ^ b >>> 12 ^ c;
        me.c = c = c - d | 0;
        me.d = d << 16 ^ c >>> 16 ^ a;
        return me.a = a - b | 0;
      };
      me.a = 0;
      me.b = 0;
      me.c = 2654435769 | 0;
      me.d = 1367130551;
      if (seed === Math.floor(seed)) {
        me.a = seed / 4294967296 | 0;
        me.b = seed | 0;
      } else {
        strseed += seed;
      }
      for (var k = 0; k < strseed.length + 20; k++) {
        me.b ^= strseed.charCodeAt(k) | 0;
        me.next();
      }
    }
    function copy(f, t) {
      t.a = f.a;
      t.b = f.b;
      t.c = f.c;
      t.d = f.d;
      return t;
    }
    function impl(seed, opts) {
      var xg = new XorGen(seed), state = opts && opts.state, prng = function() {
        return (xg.next() >>> 0) / 4294967296;
      };
      prng.double = function() {
        do {
          var top = xg.next() >>> 11, bot = (xg.next() >>> 0) / 4294967296, result = (top + bot) / (1 << 21);
        } while (result === 0);
        return result;
      };
      prng.int32 = xg.next;
      prng.quick = prng;
      if (state) {
        if (typeof state == "object")
          copy(state, xg);
        prng.state = function() {
          return copy(xg, {});
        };
      }
      return prng;
    }
    if (module2 && module2.exports) {
      module2.exports = impl;
    } else if (define && define.amd) {
      define(function() {
        return impl;
      });
    } else {
      this.tychei = impl;
    }
  })(commonjsGlobal, module, false);
});
var seedrandom = createCommonjsModule(function(module) {
  (function(pool, math) {
    var global = this, width = 256, chunks = 6, digits = 52, rngname = "random", startdenom = math.pow(width, chunks), significance = math.pow(2, digits), overflow = significance * 2, mask = width - 1, nodecrypto;
    function seedrandom2(seed, options, callback) {
      var key = [];
      options = options == true ? {entropy: true} : options || {};
      var shortseed = mixkey(flatten(options.entropy ? [seed, tostring(pool)] : seed == null ? autoseed() : seed, 3), key);
      var arc4 = new ARC4(key);
      var prng = function() {
        var n = arc4.g(chunks), d = startdenom, x = 0;
        while (n < significance) {
          n = (n + x) * width;
          d *= width;
          x = arc4.g(1);
        }
        while (n >= overflow) {
          n /= 2;
          d /= 2;
          x >>>= 1;
        }
        return (n + x) / d;
      };
      prng.int32 = function() {
        return arc4.g(4) | 0;
      };
      prng.quick = function() {
        return arc4.g(4) / 4294967296;
      };
      prng.double = prng;
      mixkey(tostring(arc4.S), pool);
      return (options.pass || callback || function(prng2, seed2, is_math_call, state) {
        if (state) {
          if (state.S) {
            copy(state, arc4);
          }
          prng2.state = function() {
            return copy(arc4, {});
          };
        }
        if (is_math_call) {
          math[rngname] = prng2;
          return seed2;
        } else
          return prng2;
      })(prng, shortseed, "global" in options ? options.global : this == math, options.state);
    }
    math["seed" + rngname] = seedrandom2;
    function ARC4(key) {
      var t, keylen = key.length, me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];
      if (!keylen) {
        key = [keylen++];
      }
      while (i < width) {
        s[i] = i++;
      }
      for (i = 0; i < width; i++) {
        s[i] = s[j = mask & j + key[i % keylen] + (t = s[i])];
        s[j] = t;
      }
      (me.g = function(count) {
        var t2, r = 0, i2 = me.i, j2 = me.j, s2 = me.S;
        while (count--) {
          t2 = s2[i2 = mask & i2 + 1];
          r = r * width + s2[mask & (s2[i2] = s2[j2 = mask & j2 + t2]) + (s2[j2] = t2)];
        }
        me.i = i2;
        me.j = j2;
        return r;
      })(width);
    }
    function copy(f, t) {
      t.i = f.i;
      t.j = f.j;
      t.S = f.S.slice();
      return t;
    }
    function flatten(obj, depth) {
      var result = [], typ = typeof obj, prop;
      if (depth && typ == "object") {
        for (prop in obj) {
          try {
            result.push(flatten(obj[prop], depth - 1));
          } catch (e) {
          }
        }
      }
      return result.length ? result : typ == "string" ? obj : obj + "\0";
    }
    function mixkey(seed, key) {
      var stringseed = seed + "", smear, j = 0;
      while (j < stringseed.length) {
        key[mask & j] = mask & (smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++);
      }
      return tostring(key);
    }
    function autoseed() {
      try {
        var out;
        if (nodecrypto && (out = nodecrypto.randomBytes)) {
          out = out(width);
        } else {
          out = new Uint8Array(width);
          (global.crypto || global.msCrypto).getRandomValues(out);
        }
        return tostring(out);
      } catch (e) {
        var browser2 = global.navigator, plugins = browser2 && browser2.plugins;
        return [+new Date(), global, plugins, global.screen, tostring(pool)];
      }
    }
    function tostring(a) {
      return String.fromCharCode.apply(0, a);
    }
    mixkey(math.random(), pool);
    if (module.exports) {
      module.exports = seedrandom2;
      try {
        nodecrypto = require$$0;
      } catch (ex) {
      }
    }
  })([], Math);
});
seedrandom.alea = alea;
seedrandom.xor128 = xor128;
seedrandom.xorwow = xorwow;
seedrandom.xorshift7 = xorshift7;
seedrandom.xor4096 = xor4096;
seedrandom.tychei = tychei;
var seedrandom$1 = seedrandom;
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
class MPRandGauss {
  constructor(mean2, stdDeviation, dtype, truncated, seed) {
    this.mean = mean2;
    this.stdDev = stdDeviation;
    this.dtype = dtype;
    this.nextVal = NaN;
    this.truncated = truncated;
    if (this.truncated) {
      this.upper = this.mean + this.stdDev * 2;
      this.lower = this.mean - this.stdDev * 2;
    }
    const seedValue = seed ? seed : Math.random();
    this.random = seedrandom$1.alea(seedValue.toString());
  }
  nextValue() {
    if (!isNaN(this.nextVal)) {
      const value = this.nextVal;
      this.nextVal = NaN;
      return value;
    }
    let resultX, resultY;
    let isValid = false;
    while (!isValid) {
      let v1, v2, s;
      do {
        v1 = 2 * this.random() - 1;
        v2 = 2 * this.random() - 1;
        s = v1 * v1 + v2 * v2;
      } while (s >= 1 || s === 0);
      const mul2 = Math.sqrt(-2 * Math.log(s) / s);
      resultX = this.mean + this.stdDev * v1 * mul2;
      resultY = this.mean + this.stdDev * v2 * mul2;
      if (!this.truncated || this.isValidTruncated(resultX)) {
        isValid = true;
      }
    }
    if (!this.truncated || this.isValidTruncated(resultY)) {
      this.nextVal = this.convertValue(resultY);
    }
    return this.convertValue(resultX);
  }
  convertValue(value) {
    if (this.dtype == null || this.dtype === "float32") {
      return value;
    }
    return Math.round(value);
  }
  isValidTruncated(value) {
    return value <= this.upper && value >= this.lower;
  }
}
class RandGamma {
  constructor(alpha, beta, dtype, seed) {
    this.alpha = alpha;
    this.beta = 1 / beta;
    this.dtype = dtype;
    const seedValue = seed ? seed : Math.random();
    this.randu = seedrandom$1.alea(seedValue.toString());
    this.randn = new MPRandGauss(0, 1, dtype, false, this.randu());
    if (alpha < 1) {
      this.d = alpha + 2 / 3;
    } else {
      this.d = alpha - 1 / 3;
    }
    this.c = 1 / Math.sqrt(9 * this.d);
  }
  nextValue() {
    let x2, v0, v1, x, u, v;
    while (true) {
      do {
        x = this.randn.nextValue();
        v = 1 + this.c * x;
      } while (v <= 0);
      v *= v * v;
      x2 = x * x;
      v0 = 1 - 0.331 * x2 * x2;
      v1 = 0.5 * x2 + this.d * (1 - v + Math.log(v));
      u = this.randu();
      if (u < v0 || Math.log(u) < v1) {
        break;
      }
    }
    v = 1 / this.beta * this.d * v;
    if (this.alpha < 1) {
      v *= Math.pow(this.randu(), 1 / this.alpha);
    }
    return this.convertValue(v);
  }
  convertValue(value) {
    if (this.dtype === "float32") {
      return value;
    }
    return Math.round(value);
  }
}
class UniformRandom {
  constructor(min2 = 0, max2 = 1, dtype, seed) {
    this.canReturnFloat = () => this.dtype == null || this.dtype === "float32";
    this.min = min2;
    this.range = max2 - min2;
    this.dtype = dtype;
    if (seed == null) {
      seed = Math.random();
    }
    if (typeof seed === "number") {
      seed = seed.toString();
    }
    if (!this.canReturnFloat() && this.range <= 1) {
      throw new Error(`The difference between ${min2} - ${max2} <= 1 and dtype is not float`);
    }
    this.random = seedrandom$1.alea(seed);
  }
  convertValue(value) {
    if (this.canReturnFloat()) {
      return value;
    }
    return Math.round(value);
  }
  nextValue() {
    return this.convertValue(this.min + this.range * this.random());
  }
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
function randomUniform_(shape, minval = 0, maxval = 1, dtype = "float32", seed) {
  const res = buffer(shape, dtype);
  const random = new UniformRandom(minval, maxval, null, seed);
  for (let i = 0; i < res.values.length; i++) {
    res.values[i] = random.nextValue();
  }
  return res.toTensor();
}
const randomUniform = op({randomUniform_});
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
function range(start, stop, step = 1, dtype = "float32") {
  if (step === 0) {
    throw new Error("Cannot have a step of zero");
  }
  const attrs = {start, stop, step, dtype};
  return ENGINE.runKernel(Range, {}, attrs);
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
function real_(input) {
  const $input = convertToTensor(input, "input", "real");
  const inputs = {input: $input};
  return ENGINE.runKernel(Real, inputs);
}
const real = op({real_});
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
function reciprocal_(x) {
  const $x = convertToTensor(x, "x", "reciprocal");
  const inputs = {x: $x};
  return ENGINE.runKernel(Reciprocal, inputs);
}
const reciprocal = op({reciprocal_});
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
function reverse_(x, axis) {
  const $x = convertToTensor(x, "x", "reverse");
  const inputs = {x: $x};
  const attrs = {dims: axis};
  return ENGINE.runKernel(Reverse, inputs, attrs);
}
const reverse = op({reverse_});
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
function round_(x) {
  const $x = convertToTensor(x, "x", "round");
  const inputs = {x: $x};
  return ENGINE.runKernel(Round, inputs);
}
const round = op({round_});
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
function rsqrt_(x) {
  const $x = convertToTensor(x, "x", "rsqrt");
  const inputs = {x: $x};
  return ENGINE.runKernel(Rsqrt, inputs);
}
const rsqrt = op({rsqrt_});
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
function scalar(value, dtype) {
  if ((isTypedArray(value) && dtype !== "string" || Array.isArray(value)) && dtype !== "complex64") {
    throw new Error("Error creating a new Scalar: value must be a primitive (number|boolean|string)");
  }
  if (dtype === "string" && isTypedArray(value) && !(value instanceof Uint8Array)) {
    throw new Error("When making a scalar from encoded string, the value must be `Uint8Array`.");
  }
  const shape = [];
  const inferredShape = [];
  return makeTensor(value, shape, inferredShape, dtype);
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
function selu_(x) {
  const $x = convertToTensor(x, "x", "selu");
  const inputs = {x: $x};
  return ENGINE.runKernel(Selu, inputs);
}
const selu = op({selu_});
/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
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
async function setdiff1dAsync_(x, y) {
  const $x = convertToTensor(x, "x", "setdiff1d");
  const $y = convertToTensor(y, "y", "setdiff1d");
  assert($x.dtype === $y.dtype, () => `x and y should have the same dtype, but got x (${$x.dtype}) and y (${$y.dtype}).`);
  assert($x.rank === 1, () => `x should be 1D tensor, but got x (${$x.shape}).`);
  assert($y.rank === 1, () => `y should be 1D tensor, but got y (${$y.shape}).`);
  const xVals = await $x.data();
  const yVals = await $y.data();
  const ySet = new Set(yVals);
  let outputSize = 0;
  for (let i = 0; i < xVals.length; i++) {
    if (!ySet.has(xVals[i])) {
      outputSize++;
    }
  }
  const buffer2 = new TensorBuffer([outputSize], $x.dtype);
  const indices = new TensorBuffer([outputSize], "int32");
  for (let i = 0, p = 0; i < xVals.length; i++) {
    if (!ySet.has(xVals[i])) {
      buffer2.values[p] = xVals[i];
      indices.values[p] = i;
      p++;
    }
  }
  return [buffer2.toTensor(), indices.toTensor()];
}
const setdiff1dAsync = setdiff1dAsync_;
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
function sign_(x) {
  const $x = convertToTensor(x, "x", "sign");
  const inputs = {x: $x};
  return ENGINE.runKernel(Sign, inputs);
}
const sign = op({sign_});
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
function sin_(x) {
  const $x = convertToTensor(x, "x", "sin");
  const inputs = {x: $x};
  return ENGINE.runKernel(Sin, inputs);
}
const sin = op({sin_});
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
function sinh_(x) {
  const $x = convertToTensor(x, "x", "sinh");
  const inputs = {x: $x};
  return ENGINE.runKernel(Sinh, inputs);
}
const sinh = op({sinh_});
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
function softmax_(logits, dim = -1) {
  const $logits = convertToTensor(logits, "logits", "softmax", "float32");
  if (dim === -1) {
    dim = $logits.rank - 1;
  }
  if (dim !== $logits.rank - 1) {
    throw Error(`Softmax along a non-last dimension is not yet supported. Logits was rank ${$logits.rank} and dim was ${dim}`);
  }
  const inputs = {logits: $logits};
  const attrs = {dim};
  return ENGINE.runKernel(Softmax, inputs, attrs);
}
const softmax = op({softmax_});
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
function fft_(input) {
  assert(input.dtype === "complex64", () => `The dtype for tf.spectral.fft() must be complex64 but got ${input.dtype}.`);
  const inputs = {input};
  return ENGINE.runKernel(FFT, inputs);
}
const fft = op({fft_});
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
function ifft_(input) {
  assert(input.dtype === "complex64", () => `The dtype for tf.spectral.ifft() must be complex64 but got ${input.dtype}.`);
  const inputs = {input};
  return ENGINE.runKernel(IFFT, inputs);
}
const ifft = op({ifft_});
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
function irfft_(input) {
  const innerDimensionSize = input.shape[input.shape.length - 1];
  const batch = input.size / innerDimensionSize;
  let ret;
  if (innerDimensionSize <= 2) {
    const complexInput = reshape(input, [batch, innerDimensionSize]);
    ret = ifft(complexInput);
  } else {
    const outputShape = [batch, 2 * (innerDimensionSize - 1)];
    const realInput = reshape(real(input), [batch, innerDimensionSize]);
    const imagInput = reshape(imag(input), [batch, innerDimensionSize]);
    const realConjugate = reverse(slice(realInput, [0, 1], [batch, innerDimensionSize - 2]), 1);
    const imagConjugate = mul(reverse(slice(imagInput, [0, 1], [batch, innerDimensionSize - 2]), 1), scalar(-1));
    const r = concat([realInput, realConjugate], 1);
    const i = concat([imagInput, imagConjugate], 1);
    const complexInput = reshape(complex(r, i), [outputShape[0], outputShape[1]]);
    ret = ifft(complexInput);
  }
  ret = real(ret);
  if (input.rank === 3 && input.shape[0] !== 0) {
    const temp = ret;
    const batch2 = input.shape[0];
    ret = reshape(ret, [batch2, ret.shape[0] / batch2, ret.shape[1]]);
    temp.dispose();
  }
  return ret;
}
const irfft = op({irfft_});
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
function split_(x, numOrSizeSplits, axis = 0) {
  const $x = convertToTensor(x, "x", "split");
  const inputs = {x: $x};
  const attr = {numOrSizeSplits, axis};
  return ENGINE.runKernel(SplitV, inputs, attr);
}
const split = op({split_});
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
function rfft_(input, fftLength) {
  assert(input.dtype === "float32", () => `The dtype for rfft() must be real value but got ${input.dtype}`);
  let innerDimensionSize = input.shape[input.shape.length - 1];
  const batch = input.size / innerDimensionSize;
  let adjustedInput;
  if (fftLength != null && fftLength < innerDimensionSize) {
    const begin = input.shape.map((v) => 0);
    const size = input.shape.map((v) => v);
    size[input.shape.length - 1] = fftLength;
    adjustedInput = slice(input, begin, size);
    innerDimensionSize = fftLength;
  } else if (fftLength != null && fftLength > innerDimensionSize) {
    const zerosShape = input.shape.map((v) => v);
    zerosShape[input.shape.length - 1] = fftLength - innerDimensionSize;
    adjustedInput = concat([input, zeros(zerosShape)], input.shape.length - 1);
    innerDimensionSize = fftLength;
  } else {
    adjustedInput = input;
  }
  const zerosInput = zerosLike(adjustedInput);
  const complexInput = reshape(complex(adjustedInput, zerosInput), [batch, innerDimensionSize]);
  const ret = fft(complexInput);
  const half = Math.floor(innerDimensionSize / 2) + 1;
  const realValues = real(ret);
  const imagValues = imag(ret);
  const realComplexConjugate = split(realValues, [half, innerDimensionSize - half], realValues.shape.length - 1);
  const imagComplexConjugate = split(imagValues, [half, innerDimensionSize - half], imagValues.shape.length - 1);
  const outputShape = adjustedInput.shape.slice();
  outputShape[adjustedInput.shape.length - 1] = half;
  return reshape(complex(realComplexConjugate[0], imagComplexConjugate[0]), outputShape);
}
const rfft = op({rfft_});
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
function sqrt_(x) {
  const $x = convertToTensor(x, "x", "sqrt");
  const inputs = {x: $x};
  return ENGINE.runKernel(Sqrt, inputs);
}
const sqrt = op({sqrt_});
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
function squaredDifference_(a, b) {
  let $a = convertToTensor(a, "a", "squaredDifference");
  let $b = convertToTensor(b, "b", "squaredDifference");
  [$a, $b] = makeTypesMatch($a, $b);
  assertAndGetBroadcastShape($a.shape, $b.shape);
  const inputs = {a: $a, b: $b};
  const attrs = {};
  return ENGINE.runKernel(SquaredDifference, inputs, attrs);
}
const squaredDifference = op({squaredDifference_});
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
function squeeze_(x, axis) {
  const $x = convertToTensor(x, "x", "squeeze");
  return reshape($x, squeezeShape($x.shape, axis).newShape);
}
const squeeze = op({squeeze_});
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
function stack_(tensors, axis = 0) {
  const $tensors = convertToTensorArray(tensors, "tensors", "stack", "string_or_numeric");
  assert($tensors.length >= 1, () => "Pass at least one tensor to tf.stack");
  if ($tensors.length > 0) {
    assert(axis <= $tensors[0].rank, () => "Axis must be <= rank of the tensor");
  }
  const inputs = $tensors;
  const attrs = {axis};
  return ENGINE.runKernel(Pack, inputs, attrs);
}
const stack = op({stack_});
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
function stridedSlice_(x, begin, end, strides, beginMask = 0, endMask = 0, ellipsisMask = 0, newAxisMask = 0, shrinkAxisMask = 0) {
  const $x = convertToTensor(x, "x", "stridedSlice");
  const inputs = {x: $x};
  const attrs = {
    begin,
    end,
    strides,
    beginMask,
    endMask,
    ellipsisMask,
    newAxisMask,
    shrinkAxisMask
  };
  return ENGINE.runKernel(StridedSlice, inputs, attrs);
}
const stridedSlice = op({stridedSlice_});
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
function tan_(x) {
  const $x = convertToTensor(x, "x", "tan");
  const inputs = {x: $x};
  return ENGINE.runKernel(Tan, inputs);
}
const tan = op({tan_});
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
function tensor1d(values, dtype) {
  assertNonNull(values);
  const inferredShape = inferShape(values, dtype);
  if (inferredShape.length !== 1) {
    throw new Error("tensor1d() requires values to be a flat/TypedArray");
  }
  const shape = null;
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
function tensor2d(values, shape, dtype) {
  assertNonNull(values);
  if (shape != null && shape.length !== 2) {
    throw new Error("tensor2d() requires shape to have two numbers");
  }
  const inferredShape = inferShape(values, dtype);
  if (inferredShape.length !== 2 && inferredShape.length !== 1) {
    throw new Error("tensor2d() requires values to be number[][] or flat/TypedArray");
  }
  if (inferredShape.length === 1 && shape == null) {
    throw new Error("tensor2d() requires shape to be provided when `values` are a flat/TypedArray");
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
function topk_(x, k = 1, sorted = true) {
  const $x = convertToTensor(x, "x", "topk");
  if ($x.rank === 0) {
    throw new Error("topk() expects the input to be of rank 1 or higher");
  }
  const lastDim = $x.shape[$x.shape.length - 1];
  if (k > lastDim) {
    throw new Error(`'k' passed to topk() must be <= the last dimension (${lastDim}) but got ${k}`);
  }
  const inputs = {x: $x};
  const attrs = {k, sorted};
  const [values, indices] = ENGINE.runKernel(TopK, inputs, attrs);
  return {values, indices};
}
const topk = op({topk_});
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
function truncatedNormal_(shape, mean2 = 0, stdDev = 1, dtype, seed) {
  if (dtype != null && dtype === "bool") {
    throw new Error(`Unsupported data type $ { dtype }`);
  }
  const randGauss = new MPRandGauss(mean2, stdDev, dtype, true, seed);
  const res = buffer(shape, dtype);
  for (let i = 0; i < res.values.length; i++) {
    res.values[i] = randGauss.nextValue();
  }
  return res.toTensor();
}
const truncatedNormal = op({truncatedNormal_});
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
function unique_(x, axis = 0) {
  const $x = convertToTensor(x, "x", "unique", "string_or_numeric");
  assert($x.rank > 0, () => "The input tensor must be at least 1D");
  const inputs = {x: $x};
  const attrs = {axis};
  const [values, indices] = ENGINE.runKernel(Unique, inputs, attrs);
  return {values, indices};
}
const unique = op({unique_});
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
function unstack_(x, axis = 0) {
  const $x = convertToTensor(x, "x", "unstack", "string_or_numeric");
  assert(axis >= -$x.shape.length && axis < $x.shape.length, () => `Axis = ${axis} is not in [-${$x.shape.length}, ${$x.shape.length})`);
  const inputs = {value: $x};
  const attrs = {axis};
  return ENGINE.runKernel(Unpack, inputs, attrs);
}
const unstack = op({unstack_});
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
function whereImpl(condShape, condVals) {
  const indices = [];
  for (let i = 0; i < condVals.length; i++) {
    if (condVals[i]) {
      indices.push(i);
    }
  }
  const inBuffer = buffer(condShape, "int32");
  const out = buffer([indices.length, condShape.length], "int32");
  for (let i = 0; i < indices.length; i++) {
    const loc = inBuffer.indexToLoc(indices[i]);
    const offset = i * condShape.length;
    out.values.set(loc, offset);
  }
  return out.toTensor();
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
async function whereAsync_(condition) {
  const $condition = convertToTensor(condition, "condition", "whereAsync", "bool");
  const vals = await $condition.data();
  const res = whereImpl($condition.shape, vals);
  if (condition !== $condition) {
    $condition.dispose();
  }
  return res;
}
const whereAsync = whereAsync_;
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
function norm_(x, ord = "euclidean", axis = null, keepDims = false) {
  x = convertToTensor(x, "x", "norm");
  const norm2 = normImpl(x, ord, axis);
  let keepDimsShape = norm2.shape;
  if (keepDims) {
    const axes = parseAxisParam(axis, x.shape);
    keepDimsShape = expandShapeToKeepDim(norm2.shape, axes);
  }
  return reshape(norm2, keepDimsShape);
}
function normImpl(x, p, axis = null) {
  if (x.rank === 0) {
    return abs(x);
  }
  if (x.rank !== 1 && axis === null) {
    return normImpl(reshape(x, [-1]), p, axis);
  }
  if (x.rank === 1 || typeof axis === "number" || Array.isArray(axis) && axis.length === 1) {
    if (p === 1) {
      return sum(abs(x), axis);
    }
    if (p === Infinity) {
      return max(abs(x), axis);
    }
    if (p === -Infinity) {
      return min(abs(x), axis);
    }
    if (p === "euclidean" || p === 2) {
      return sqrt(sum(pow(abs(x), scalar(2, "int32")), axis));
    }
    throw new Error(`Error in norm: invalid ord value: ${p}`);
  }
  if (Array.isArray(axis) && axis.length === 2) {
    if (p === 1) {
      return max(sum(abs(x), axis[0]), axis[1] - 1);
    }
    if (p === Infinity) {
      return max(sum(abs(x), axis[1]), axis[0]);
    }
    if (p === -Infinity) {
      return min(sum(abs(x), axis[1]), axis[0]);
    }
    if (p === "fro" || p === "euclidean") {
      return sqrt(sum(square(x), axis));
    }
    throw new Error(`Error in norm: invalid ord value: ${p}`);
  }
  throw new Error(`Error in norm: invalid axis: ${axis}`);
}
const norm = op({norm_});
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
function scatterND_(indices, updates, shape) {
  const $indices = convertToTensor(indices, "indices", "scatterND", "int32");
  const $updates = convertToTensor(updates, "updates", "scatterND");
  validateInput$1($updates, $indices, shape);
  const inputs = {indices: $indices, updates: $updates};
  const attrs = {shape};
  return ENGINE.runKernel(ScatterNd, inputs, attrs);
}
const scatterND = op({scatterND_});
function validateInput(sparseIndices, sparseValues, outputShape, defaultValues) {
  if (sparseIndices.dtype !== "int32") {
    throw new Error(`tf.sparseToDense() expects the indices to be int32 type, but the dtype was ${sparseIndices.dtype}.`);
  }
  if (sparseIndices.rank > 2) {
    throw new Error(`sparseIndices should be a scalar, vector, or matrix, but got shape ${sparseIndices.shape}.`);
  }
  const numElems = sparseIndices.rank > 0 ? sparseIndices.shape[0] : 1;
  const numDims = sparseIndices.rank > 1 ? sparseIndices.shape[1] : 1;
  if (outputShape.length !== numDims) {
    throw new Error(`outputShape has incorrect number of elements:, ${outputShape.length}, should be: ${numDims}.`);
  }
  const numValues = sparseValues.size;
  if (!(sparseValues.rank === 0 || sparseValues.rank === 1 && numValues === numElems)) {
    throw new Error(`sparseValues has incorrect shape ${sparseValues.shape}, should be [] or [${numElems}]`);
  }
  if (sparseValues.dtype !== defaultValues.dtype) {
    throw new Error("sparseValues.dtype must match defaultValues.dtype");
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
function sparseToDense_(sparseIndices, sparseValues, outputShape, defaultValue = 0) {
  const $sparseIndices = convertToTensor(sparseIndices, "sparseIndices", "sparseToDense", "int32");
  const $sparseValues = convertToTensor(sparseValues, "sparseValues", "sparseToDense");
  const $defaultValue = convertToTensor(defaultValue, "defaultValue", "sparseToDense", $sparseValues.dtype);
  validateInput($sparseIndices, $sparseValues, outputShape, $defaultValue);
  const inputs = {
    sparseIndices: $sparseIndices,
    sparseValues: $sparseValues,
    defaultValue: $defaultValue
  };
  const attrs = {outputShape};
  return ENGINE.runKernel(SparseToDense, inputs, attrs);
}
const sparseToDense = op({sparseToDense_});
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
function gatherND_(x, indices) {
  const $indices = convertToTensor(indices, "indices", "gatherND", "int32");
  const $x = convertToTensor(x, "x", "gatherND");
  const inputs = {params: $x, indices: $indices};
  return ENGINE.runKernel(GatherNd, inputs);
}
const gatherND = op({gatherND_});
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
function enclosingPowerOfTwo(value) {
  return Math.floor(Math.pow(2, Math.ceil(Math.log(value) / Math.log(2))));
}
function cosineWindow(windowLength, a, b) {
  const even = 1 - windowLength % 2;
  const newValues = new Float32Array(windowLength);
  for (let i = 0; i < windowLength; ++i) {
    const cosArg = 2 * Math.PI * i / (windowLength + even - 1);
    newValues[i] = a - b * Math.cos(cosArg);
  }
  return tensor1d(newValues, "float32");
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
function conv2DBackpropFilter_(x, dy, filterShape, strides, pad2, dataFormat = "NHWC", dimRoundingMode) {
  let x4D = x;
  if (x.rank === 3) {
    x4D = reshape(x, [1, x.shape[0], x.shape[1], x.shape[2]]);
  }
  let dy4D = dy;
  if (dy4D.rank === 3) {
    dy4D = reshape(dy, [1, dy.shape[0], dy.shape[1], dy.shape[2]]);
  }
  assert(x4D.rank === 4, () => `Error in conv2dDerFilter: input must be rank 4, but got shape ${x4D.shape}.`);
  assert(dy4D.rank === 4, () => `Error in conv2dDerFilter: dy must be rank 4, but got shape ${dy4D.shape}.`);
  assert(filterShape.length === 4, () => `Error in conv2dDerFilter: filterShape must be length 4, but got ${filterShape}.`);
  const inDepth = dataFormat === "NHWC" ? x4D.shape[3] : x4D.shape[1];
  const outDepth = dataFormat === "NHWC" ? dy4D.shape[3] : dy4D.shape[1];
  assert(inDepth === filterShape[2], () => `Error in conv2dDerFilter: depth of input ${inDepth}) must match input depth in filter (${filterShape[2]}.`);
  assert(outDepth === filterShape[3], () => `Error in conv2dDerFilter: depth of dy (${outDepth}) must match output depth for filter (${filterShape[3]}).`);
  if (dimRoundingMode != null) {
    assert(isInt(pad2), () => `Error in conv2dDerFilter: pad must be an integer when using, dimRoundingMode ${dimRoundingMode} but got pad ${pad2}.`);
  }
  const inputs = {x: x4D, dy: dy4D};
  const attrs = {strides, pad: pad2, dataFormat, dimRoundingMode, filterShape};
  return ENGINE.runKernel(Conv2DBackpropFilter, inputs, attrs);
}
const conv2DBackpropFilter = op({conv2DBackpropFilter_});
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
function fusedConv2d_({x, filter, strides, pad: pad2, dataFormat = "NHWC", dilations = [1, 1], dimRoundingMode, bias, activation = "linear", preluActivationWeights, leakyreluAlpha}) {
  activation = activation || "linear";
  if (shouldFuse(ENGINE.state.gradientDepth, activation) === false) {
    let result = conv2d(x, filter, strides, pad2, dataFormat, dilations, dimRoundingMode);
    if (bias != null) {
      result = add(result, bias);
    }
    return applyActivation(result, activation, preluActivationWeights, leakyreluAlpha);
  }
  const $x = convertToTensor(x, "x", "conv2d");
  const $filter = convertToTensor(filter, "filter", "conv2d");
  let x4D = $x;
  let reshapedTo4D = false;
  if ($x.rank === 3) {
    reshapedTo4D = true;
    x4D = reshape($x, [1, $x.shape[0], $x.shape[1], $x.shape[2]]);
  }
  assert(x4D.rank === 4, () => `Error in fused conv2d: input must be rank 4, but got rank ${x4D.rank}.`);
  assert($filter.rank === 4, () => `Error in fused conv2d: filter must be rank 4, but got rank ${$filter.rank}.`);
  if (dimRoundingMode != null) {
    assert(isInt(pad2), () => `Error in fused conv2d: pad must be an integer when using, dimRoundingMode ${dimRoundingMode} but got pad ${pad2}.`);
  }
  assert(x4D.shape[3] === $filter.shape[2], () => `Error in conv2d: depth of input (${x4D.shape[3]}) must match input depth for filter ${$filter.shape[2]}.`);
  assert(eitherStridesOrDilationsAreOne(strides, dilations), () => `Error in conv2D: Either strides or dilations must be 1. Got strides ${strides} and dilations '${dilations}'`);
  assert(dataFormat === "NHWC", () => `Error in conv2d: got dataFormat of ${dataFormat} but only NHWC is currently supported.`);
  const convInfo = computeConv2DInfo(x4D.shape, $filter.shape, strides, dilations, pad2, dimRoundingMode);
  let $bias;
  if (bias != null) {
    $bias = convertToTensor(bias, "bias", "fused conv2d");
    [$bias] = makeTypesMatch($bias, $x);
    assertAndGetBroadcastShape(convInfo.outShape, $bias.shape);
  }
  let $preluActivationWeights;
  if (preluActivationWeights != null) {
    $preluActivationWeights = convertToTensor(preluActivationWeights, "prelu weights", "fused conv2d");
  }
  const grad2 = (dy, saved) => {
    const [$filter2, x4D2, y, $bias2] = saved;
    const dyActivation = getFusedDyActivation(dy, y, activation);
    assert(tupleValuesAreOne(dilations), () => `Error in gradient of fused conv2D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '${dilations}'`);
    const xDer = conv2DBackpropInput(x4D2.shape, dyActivation, $filter2, strides, pad2);
    const filterDer = conv2DBackpropFilter(x4D2, dyActivation, $filter2.shape, strides, pad2);
    const der = [xDer, filterDer];
    if ($bias2 != null) {
      const biasDer = getFusedBiasGradient($bias2, dyActivation);
      der.push(biasDer);
    }
    return der;
  };
  const inputs = {
    x: x4D,
    filter: $filter,
    bias: $bias,
    preluActivationWeights: $preluActivationWeights
  };
  const attrs = {
    strides,
    pad: pad2,
    dataFormat,
    dilations,
    dimRoundingMode,
    activation,
    leakyreluAlpha
  };
  if (bias == null) {
    const customOp = customGrad((x4D2, filter2, save) => {
      let res = ENGINE.runKernel(FusedConv2D, inputs, attrs);
      save([filter2, x4D2, res]);
      if (reshapedTo4D) {
        res = reshape(res, [res.shape[1], res.shape[2], res.shape[3]]);
      }
      return {value: res, gradFunc: grad2};
    });
    return customOp(x4D, $filter);
  } else {
    const customOpWithBias = customGrad((x4D2, filter2, bias2, save) => {
      let res = ENGINE.runKernel(FusedConv2D, inputs, attrs);
      save([filter2, x4D2, res, bias2]);
      if (reshapedTo4D) {
        res = reshape(res, [res.shape[1], res.shape[2], res.shape[3]]);
      }
      return {value: res, gradFunc: grad2};
    });
    return customOpWithBias(x4D, $filter, $bias);
  }
}
const conv2d$1 = op({fusedConv2d_});
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
function depthwiseConv2dNativeBackpropFilter_(x, dy, filterShape, strides, pad2, dilations = [1, 1], dimRoundingMode) {
  let x4D = x;
  if (x.rank === 3) {
    x4D = reshape(x, [1, x.shape[0], x.shape[1], x.shape[2]]);
  }
  let dy4D = dy;
  if (dy4D.rank === 3) {
    dy4D = reshape(dy, [1, dy.shape[0], dy.shape[1], dy.shape[2]]);
  }
  const inputs = {x: x4D, dy: dy4D};
  const attrs = {strides, pad: pad2, dimRoundingMode, dilations, filterShape};
  return ENGINE.runKernel(DepthwiseConv2dNativeBackpropFilter, inputs, attrs);
}
const depthwiseConv2dNativeBackpropFilter = op({depthwiseConv2dNativeBackpropFilter_});
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
function depthwiseConv2dNativeBackpropInput_(xShape, dy, filter, strides, pad2, dilations = [1, 1], dimRoundingMode) {
  let dy4D = dy;
  let reshapedTo4D = false;
  if (dy.rank === 3) {
    reshapedTo4D = true;
    dy4D = reshape(dy, [1, dy.shape[0], dy.shape[1], dy.shape[2]]);
  }
  const inputs = {dy: dy4D, filter};
  const attrs = {strides, pad: pad2, dimRoundingMode, dilations, inputShape: xShape};
  const res = ENGINE.runKernel(DepthwiseConv2dNativeBackpropInput, inputs, attrs);
  if (reshapedTo4D) {
    return reshape(res, [res.shape[1], res.shape[2], res.shape[3]]);
  }
  return res;
}
const depthwiseConv2dNativeBackpropInput = op({depthwiseConv2dNativeBackpropInput_});
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
function fusedDepthwiseConv2d_({x, filter, strides, pad: pad2, dataFormat = "NHWC", dilations = [1, 1], dimRoundingMode, bias, activation = "linear", preluActivationWeights, leakyreluAlpha}) {
  if (shouldFuse(ENGINE.state.gradientDepth, activation) === false) {
    let result = depthwiseConv2d(x, filter, strides, pad2, dataFormat, dilations, dimRoundingMode);
    if (bias != null) {
      result = add(result, bias);
    }
    return applyActivation(result, activation, preluActivationWeights, leakyreluAlpha);
  }
  const $x = convertToTensor(x, "x", "depthwiseConv2d");
  const $filter = convertToTensor(filter, "filter", "depthwiseConv2d");
  let x4D = $x;
  let reshapedTo4D = false;
  if ($x.rank === 3) {
    reshapedTo4D = true;
    x4D = reshape($x, [1, $x.shape[0], $x.shape[1], $x.shape[2]]);
  }
  assert(x4D.rank === 4, () => `Error in fused depthwiseConv2d: input must be rank 4, but got rank ${x4D.rank}.`);
  assert($filter.rank === 4, () => `Error in fused depthwiseConv2d: filter must be rank 4, but got rank ${$filter.rank}.`);
  assert(x4D.shape[3] === $filter.shape[2], () => `Error in fused depthwiseConv2d: number of input channels (${x4D.shape[3]}) must match the inChannels dimension in filter ${$filter.shape[2]}.`);
  if (dilations == null) {
    dilations = [1, 1];
  }
  assert(eitherStridesOrDilationsAreOne(strides, dilations), () => `Error in fused depthwiseConv2d: Either strides or dilations must be 1. Got strides ${strides} and dilations '${dilations}'`);
  if (dimRoundingMode != null) {
    assert(isInt(pad2), () => `Error in fused depthwiseConv2d: pad must be an integer when using dimRoundingMode ${dimRoundingMode} but got pad ${pad2}.`);
  }
  const convInfo = computeConv2DInfo(x4D.shape, $filter.shape, strides, dilations, pad2, dimRoundingMode, true);
  let $bias;
  if (bias != null) {
    $bias = convertToTensor(bias, "bias", "fused conv2d");
    [$bias] = makeTypesMatch($bias, $x);
    assertAndGetBroadcastShape(convInfo.outShape, $bias.shape);
  }
  let $preluActivationWeights;
  if (preluActivationWeights != null) {
    $preluActivationWeights = convertToTensor(preluActivationWeights, "prelu weights", "fused depthwiseConv2d");
  }
  const grad2 = (dy, saved) => {
    assert(tupleValuesAreOne(dilations), () => `Error in gradient of fused depthwiseConv2d: dilation rates greater than 1 are not yet supported. Got dilations '${dilations}'`);
    const [$filter2, x4D2, y, bias2] = saved;
    const dyActivation = getFusedDyActivation(dy, y, activation);
    const xDer = depthwiseConv2dNativeBackpropInput(x4D2.shape, dyActivation, $filter2, strides, pad2, dilations, dimRoundingMode);
    const filterDer = depthwiseConv2dNativeBackpropFilter(x4D2, dyActivation, $filter2.shape, strides, pad2, dilations, dimRoundingMode);
    if (bias2 != null) {
      const biasDer = getFusedBiasGradient($bias, dyActivation);
      return [xDer, filterDer, biasDer];
    }
    return [xDer, filterDer];
  };
  const inputs = {
    x: x4D,
    filter: $filter,
    bias: $bias,
    preluActivationWeights: $preluActivationWeights
  };
  const attrs = {
    strides,
    pad: pad2,
    dataFormat,
    dilations,
    dimRoundingMode,
    activation,
    leakyreluAlpha
  };
  if (bias == null) {
    const customOp = customGrad((x4D2, filter2, save) => {
      let res = ENGINE.runKernel(FusedDepthwiseConv2D, inputs, attrs);
      save([filter2, x4D2, res]);
      if (reshapedTo4D) {
        res = reshape(res, [res.shape[1], res.shape[2], res.shape[3]]);
      }
      return {value: res, gradFunc: grad2};
    });
    return customOp(x4D, $filter);
  } else {
    const customOpWithBias = customGrad((x4D2, filter2, bias2, save) => {
      let res = ENGINE.runKernel(FusedDepthwiseConv2D, inputs, attrs);
      save([filter2, x4D2, res, bias2]);
      if (reshapedTo4D) {
        res = reshape(res, [res.shape[1], res.shape[2], res.shape[3]]);
      }
      return {value: res, gradFunc: grad2};
    });
    return customOpWithBias(x4D, $filter, $bias);
  }
}
const depthwiseConv2d$1 = op({fusedDepthwiseConv2d_});
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
function fusedMatMul_({a, b, transposeA = false, transposeB = false, bias, activation = "linear", preluActivationWeights, leakyreluAlpha}) {
  if (shouldFuse(ENGINE.state.gradientDepth, activation) === false) {
    let result = matMul(a, b, transposeA, transposeB);
    if (bias != null) {
      result = add(result, bias);
    }
    return applyActivation(result, activation, preluActivationWeights, leakyreluAlpha);
  }
  let $a = convertToTensor(a, "a", "fused matMul");
  let $b = convertToTensor(b, "b", "fused matMul");
  [$a, $b] = makeTypesMatch($a, $b);
  const innerShapeA = transposeA ? $a.shape[$a.rank - 2] : $a.shape[$a.rank - 1];
  const innerShapeB = transposeB ? $b.shape[$b.rank - 1] : $b.shape[$b.rank - 2];
  const outerShapeA = transposeA ? $a.shape[$a.rank - 1] : $a.shape[$a.rank - 2];
  const outerShapeB = transposeB ? $b.shape[$b.rank - 2] : $b.shape[$b.rank - 1];
  const outerDimsA = $a.shape.slice(0, -2);
  const outerDimsB = $b.shape.slice(0, -2);
  const batchDimA = sizeFromShape(outerDimsA);
  const batchDimB = sizeFromShape(outerDimsB);
  assert($a.rank >= 2 && $b.rank >= 2 && $a.rank === $b.rank, () => `Error in fused matMul: inputs must have the same rank of at least 2, got ranks ${$a.rank} and ${$b.rank}.`);
  assert(arraysEqual(outerDimsA, outerDimsB), () => `Error in fused matMul: outer dimensions (${outerDimsA}) and (${outerDimsB}) of Tensors with shapes ${$a.shape} and ${$b.shape} must match.`);
  assert(innerShapeA === innerShapeB, () => `Error in fused matMul: inner shapes (${innerShapeA}) and (${innerShapeB}) of Tensors with shapes ${$a.shape} and ${$b.shape} and transposeA=${transposeA} and transposeB=${transposeB} must match.`);
  const outShape = $a.shape.slice(0, -2).concat([outerShapeA, outerShapeB]);
  const a3D = transposeA ? reshape($a, [batchDimA, innerShapeA, outerShapeA]) : reshape($a, [batchDimA, outerShapeA, innerShapeA]);
  const b3D = transposeB ? reshape($b, [batchDimB, outerShapeB, innerShapeB]) : reshape($b, [batchDimB, innerShapeB, outerShapeB]);
  let $bias;
  if (bias != null) {
    $bias = convertToTensor(bias, "bias", "fused matMul");
    [$bias] = makeTypesMatch($bias, $a);
    assertAndGetBroadcastShape(outShape, $bias.shape);
  }
  let $preluActivationWeights;
  if (preluActivationWeights != null) {
    $preluActivationWeights = convertToTensor(preluActivationWeights, "prelu weights", "fused matMul");
  }
  const grad2 = (dy, saved) => {
    const [a3D2, b3D2, y, $bias2] = saved;
    const dyActivation = getFusedDyActivation(reshape(dy, y.shape), y, activation);
    let aDer;
    let bDer;
    if (!transposeA && !transposeB) {
      aDer = matMul(dyActivation, b3D2, false, true);
      bDer = matMul(a3D2, dyActivation, true, false);
    } else if (!transposeA && transposeB) {
      aDer = matMul(dyActivation, b3D2, false, false);
      bDer = matMul(dyActivation, a3D2, true, false);
    } else if (transposeA && !transposeB) {
      aDer = matMul(b3D2, dyActivation, false, true);
      bDer = matMul(a3D2, dyActivation, false, false);
    } else {
      aDer = matMul(b3D2, dyActivation, true, true);
      bDer = matMul(dyActivation, a3D2, true, true);
    }
    if (bias != null) {
      const biasDer = getFusedBiasGradient($bias2, dyActivation);
      return [aDer, bDer, biasDer];
    } else {
      return [aDer, bDer];
    }
  };
  const inputs = {
    a: a3D,
    b: b3D,
    bias: $bias,
    preluActivationWeights: $preluActivationWeights
  };
  const attrs = {transposeA, transposeB, activation, leakyreluAlpha};
  if (bias == null) {
    const customOp = customGrad((a3D2, b3D2, save) => {
      const res = ENGINE.runKernel(_FusedMatMul, inputs, attrs);
      save([a3D2, b3D2, res]);
      return {value: reshape(res, outShape), gradFunc: grad2};
    });
    return customOp(a3D, b3D);
  } else {
    const customOpWithBias = customGrad((a3D2, b3D2, $bias2, save) => {
      const res = ENGINE.runKernel(_FusedMatMul, inputs, attrs);
      save([a3D2, b3D2, res, $bias2]);
      return {value: reshape(res, outShape), gradFunc: grad2};
    });
    return customOpWithBias(a3D, b3D, $bias);
  }
}
const matMul$1 = op({fusedMatMul_});
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
function hammingWindow_(windowLength) {
  return cosineWindow(windowLength, 0.54, 0.46);
}
const hammingWindow = op({hammingWindow_});
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
function hannWindow_(windowLength) {
  return cosineWindow(windowLength, 0.5, 0.5);
}
const hannWindow = op({hannWindow_});
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
function frame_(signal2, frameLength, frameStep, padEnd = false, padValue = 0) {
  let start = 0;
  const output = [];
  while (start + frameLength <= signal2.size) {
    output.push(slice(signal2, start, frameLength));
    start += frameStep;
  }
  if (padEnd) {
    while (start < signal2.size) {
      const padLen = start + frameLength - signal2.size;
      const pad2 = concat([
        slice(signal2, start, frameLength - padLen),
        fill([padLen], padValue)
      ]);
      output.push(pad2);
      start += frameStep;
    }
  }
  if (output.length === 0) {
    return tensor2d([], [0, frameLength]);
  }
  return reshape(concat(output), [output.length, frameLength]);
}
const frame = op({frame_});
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
function stft_(signal2, frameLength, frameStep, fftLength, windowFn = hannWindow) {
  if (fftLength == null) {
    fftLength = enclosingPowerOfTwo(frameLength);
  }
  const framedSignal = frame(signal2, frameLength, frameStep);
  const windowedSignal = mul(framedSignal, windowFn(frameLength));
  return rfft(windowedSignal, fftLength);
}
const stft = op({stft_});
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
function cropAndResize_(image2, boxes, boxInd, cropSize, method = "bilinear", extrapolationValue = 0) {
  const $image = convertToTensor(image2, "image", "cropAndResize");
  const $boxes = convertToTensor(boxes, "boxes", "cropAndResize", "float32");
  const $boxInd = convertToTensor(boxInd, "boxInd", "cropAndResize", "int32");
  const numBoxes = $boxes.shape[0];
  assert($image.rank === 4, () => `Error in cropAndResize: image must be rank 4,but got rank ${$image.rank}.`);
  assert($boxes.rank === 2 && $boxes.shape[1] === 4, () => `Error in cropAndResize: boxes must be have size [${numBoxes},4] but had shape ${$boxes.shape}.`);
  assert($boxInd.rank === 1 && $boxInd.shape[0] === numBoxes, () => `Error in cropAndResize: boxInd must be have size [${numBoxes}] but had shape ${$boxes.shape}.`);
  assert(cropSize.length === 2, () => `Error in cropAndResize: cropSize must be of length 2, but got length ${cropSize.length}.`);
  assert(cropSize[0] >= 1 && cropSize[1] >= 1, () => `cropSize must be atleast [1,1], but was ${cropSize}`);
  assert(method === "bilinear" || method === "nearest", () => `method must be bilinear or nearest, but was ${method}`);
  const inputs = {image: $image, boxes: $boxes, boxInd: $boxInd};
  const attrs = {method, extrapolationValue, cropSize};
  const res = ENGINE.runKernel(CropAndResize, inputs, attrs);
  return res;
}
const cropAndResize = op({cropAndResize_});
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
function flipLeftRight_(image2) {
  const $image = convertToTensor(image2, "image", "flipLeftRight", "float32");
  assert($image.rank === 4, () => `Error in flipLeftRight: image must be rank 4,but got rank ${$image.rank}.`);
  const inputs = {image: $image};
  const res = ENGINE.runKernel(FlipLeftRight, inputs, {});
  return res;
}
const flipLeftRight = op({flipLeftRight_});
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
function rotateWithOffset_(image2, radians, fillValue = 0, center = 0.5) {
  const $image = convertToTensor(image2, "image", "rotateWithOffset", "float32");
  assert($image.rank === 4, () => `Error in rotateWithOffset: image must be rank 4,but got rank ${$image.rank}.`);
  const inputs = {image: $image};
  const attrs = {radians, fillValue, center};
  const res = ENGINE.runKernel(RotateWithOffset, inputs, attrs);
  return res;
}
const rotateWithOffset = op({rotateWithOffset_});
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
function nonMaxSuppSanityCheck(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, softNmsSigma) {
  if (iouThreshold == null) {
    iouThreshold = 0.5;
  }
  if (scoreThreshold == null) {
    scoreThreshold = Number.NEGATIVE_INFINITY;
  }
  if (softNmsSigma == null) {
    softNmsSigma = 0;
  }
  const numBoxes = boxes.shape[0];
  maxOutputSize = Math.min(maxOutputSize, numBoxes);
  assert(0 <= iouThreshold && iouThreshold <= 1, () => `iouThreshold must be in [0, 1], but was '${iouThreshold}'`);
  assert(boxes.rank === 2, () => `boxes must be a 2D tensor, but was of rank '${boxes.rank}'`);
  assert(boxes.shape[1] === 4, () => `boxes must have 4 columns, but 2nd dimension was ${boxes.shape[1]}`);
  assert(scores.rank === 1, () => "scores must be a 1D tensor");
  assert(scores.shape[0] === numBoxes, () => `scores has incompatible shape with boxes. Expected ${numBoxes}, but was ${scores.shape[0]}`);
  assert(0 <= softNmsSigma && softNmsSigma <= 1, () => `softNmsSigma must be in [0, 1], but was '${softNmsSigma}'`);
  return {maxOutputSize, iouThreshold, scoreThreshold, softNmsSigma};
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
function nonMaxSuppression_(boxes, scores, maxOutputSize, iouThreshold = 0.5, scoreThreshold = Number.NEGATIVE_INFINITY) {
  const $boxes = convertToTensor(boxes, "boxes", "nonMaxSuppression");
  const $scores = convertToTensor(scores, "scores", "nonMaxSuppression");
  const inputs = nonMaxSuppSanityCheck($boxes, $scores, maxOutputSize, iouThreshold, scoreThreshold);
  maxOutputSize = inputs.maxOutputSize;
  iouThreshold = inputs.iouThreshold;
  scoreThreshold = inputs.scoreThreshold;
  const attrs = {maxOutputSize, iouThreshold, scoreThreshold};
  return ENGINE.runKernel(NonMaxSuppressionV3, {boxes: $boxes, scores: $scores}, attrs);
}
const nonMaxSuppression = op({nonMaxSuppression_});
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
function binaryInsert(arr, element, comparator) {
  const index = binarySearch(arr, element, comparator);
  const insertionPoint = index < 0 ? -(index + 1) : index;
  arr.splice(insertionPoint, 0, element);
}
function binarySearch(arr, target, comparator) {
  return binarySearch_(arr, target, comparator || defaultComparator);
}
function defaultComparator(a, b) {
  return a > b ? 1 : a < b ? -1 : 0;
}
function binarySearch_(arr, target, comparator) {
  let left = 0;
  let right = arr.length;
  let middle = 0;
  let found = false;
  while (left < right) {
    middle = left + (right - left >>> 1);
    const compareResult = comparator(target, arr[middle]);
    if (compareResult > 0) {
      left = middle + 1;
    } else {
      right = middle;
      found = !compareResult;
    }
  }
  return found ? left : -left - 1;
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
function nonMaxSuppressionV3Impl(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold) {
  return nonMaxSuppressionImpl_(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, 0);
}
function nonMaxSuppressionV4Impl(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, padToMaxOutputSize) {
  return nonMaxSuppressionImpl_(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, 0, false, padToMaxOutputSize, true);
}
function nonMaxSuppressionV5Impl(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, softNmsSigma) {
  return nonMaxSuppressionImpl_(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, softNmsSigma, true);
}
function nonMaxSuppressionImpl_(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, softNmsSigma, returnScoresTensor = false, padToMaxOutputSize = false, returnValidOutputs = false) {
  const candidates = [];
  for (let i = 0; i < scores.length; i++) {
    if (scores[i] > scoreThreshold) {
      candidates.push({score: scores[i], boxIndex: i, suppressBeginIndex: 0});
    }
  }
  candidates.sort(ascendingComparator);
  const scale = softNmsSigma > 0 ? -0.5 / softNmsSigma : 0;
  const selectedIndices = [];
  const selectedScores = [];
  while (selectedIndices.length < maxOutputSize && candidates.length > 0) {
    const candidate = candidates.pop();
    const {score: originalScore, boxIndex, suppressBeginIndex} = candidate;
    if (originalScore < scoreThreshold) {
      break;
    }
    let ignoreCandidate = false;
    for (let j = selectedIndices.length - 1; j >= suppressBeginIndex; --j) {
      const iou = intersectionOverUnion(boxes, boxIndex, selectedIndices[j]);
      if (iou >= iouThreshold) {
        ignoreCandidate = true;
        break;
      }
      candidate.score = candidate.score * suppressWeight(iouThreshold, scale, iou);
      if (candidate.score <= scoreThreshold) {
        break;
      }
    }
    candidate.suppressBeginIndex = selectedIndices.length;
    if (!ignoreCandidate) {
      if (candidate.score === originalScore) {
        selectedIndices.push(boxIndex);
        selectedScores.push(candidate.score);
      } else if (candidate.score > scoreThreshold) {
        binaryInsert(candidates, candidate, ascendingComparator);
      }
    }
  }
  const validOutputs = selectedIndices.length;
  const elemsToPad = maxOutputSize - validOutputs;
  if (padToMaxOutputSize && elemsToPad > 0) {
    selectedIndices.push(...new Array(elemsToPad).fill(0));
    selectedScores.push(...new Array(elemsToPad).fill(0));
  }
  const result = {selectedIndices};
  if (returnScoresTensor) {
    result["selectedScores"] = selectedScores;
  }
  if (returnValidOutputs) {
    result["validOutputs"] = validOutputs;
  }
  return result;
}
function intersectionOverUnion(boxes, i, j) {
  const iCoord = boxes.subarray(i * 4, i * 4 + 4);
  const jCoord = boxes.subarray(j * 4, j * 4 + 4);
  const yminI = Math.min(iCoord[0], iCoord[2]);
  const xminI = Math.min(iCoord[1], iCoord[3]);
  const ymaxI = Math.max(iCoord[0], iCoord[2]);
  const xmaxI = Math.max(iCoord[1], iCoord[3]);
  const yminJ = Math.min(jCoord[0], jCoord[2]);
  const xminJ = Math.min(jCoord[1], jCoord[3]);
  const ymaxJ = Math.max(jCoord[0], jCoord[2]);
  const xmaxJ = Math.max(jCoord[1], jCoord[3]);
  const areaI = (ymaxI - yminI) * (xmaxI - xminI);
  const areaJ = (ymaxJ - yminJ) * (xmaxJ - xminJ);
  if (areaI <= 0 || areaJ <= 0) {
    return 0;
  }
  const intersectionYmin = Math.max(yminI, yminJ);
  const intersectionXmin = Math.max(xminI, xminJ);
  const intersectionYmax = Math.min(ymaxI, ymaxJ);
  const intersectionXmax = Math.min(xmaxI, xmaxJ);
  const intersectionArea = Math.max(intersectionYmax - intersectionYmin, 0) * Math.max(intersectionXmax - intersectionXmin, 0);
  return intersectionArea / (areaI + areaJ - intersectionArea);
}
function suppressWeight(iouThreshold, scale, iou) {
  const weight = Math.exp(scale * iou * iou);
  return iou <= iouThreshold ? weight : 0;
}
function ascendingComparator(c1, c2) {
  return c1.score - c2.score || c1.score === c2.score && c2.boxIndex - c1.boxIndex;
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
async function nonMaxSuppressionAsync_(boxes, scores, maxOutputSize, iouThreshold = 0.5, scoreThreshold = Number.NEGATIVE_INFINITY) {
  const $boxes = convertToTensor(boxes, "boxes", "nonMaxSuppressionAsync");
  const $scores = convertToTensor(scores, "scores", "nonMaxSuppressionAsync");
  const inputs = nonMaxSuppSanityCheck($boxes, $scores, maxOutputSize, iouThreshold, scoreThreshold);
  maxOutputSize = inputs.maxOutputSize;
  iouThreshold = inputs.iouThreshold;
  scoreThreshold = inputs.scoreThreshold;
  const boxesAndScores = await Promise.all([$boxes.data(), $scores.data()]);
  const boxesVals = boxesAndScores[0];
  const scoresVals = boxesAndScores[1];
  const {selectedIndices} = nonMaxSuppressionV3Impl(boxesVals, scoresVals, maxOutputSize, iouThreshold, scoreThreshold);
  if ($boxes !== boxes) {
    $boxes.dispose();
  }
  if ($scores !== scores) {
    $scores.dispose();
  }
  return tensor1d(selectedIndices, "int32");
}
const nonMaxSuppressionAsync = nonMaxSuppressionAsync_;
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
function nonMaxSuppressionWithScore_(boxes, scores, maxOutputSize, iouThreshold = 0.5, scoreThreshold = Number.NEGATIVE_INFINITY, softNmsSigma = 0) {
  const $boxes = convertToTensor(boxes, "boxes", "nonMaxSuppression");
  const $scores = convertToTensor(scores, "scores", "nonMaxSuppression");
  const params = nonMaxSuppSanityCheck($boxes, $scores, maxOutputSize, iouThreshold, scoreThreshold, softNmsSigma);
  maxOutputSize = params.maxOutputSize;
  iouThreshold = params.iouThreshold;
  scoreThreshold = params.scoreThreshold;
  softNmsSigma = params.softNmsSigma;
  const inputs = {boxes: $boxes, scores: $scores};
  const attrs = {maxOutputSize, iouThreshold, scoreThreshold, softNmsSigma};
  const result = ENGINE.runKernel(NonMaxSuppressionV5, inputs, attrs);
  return {selectedIndices: result[0], selectedScores: result[1]};
}
const nonMaxSuppressionWithScore = op({nonMaxSuppressionWithScore_});
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
async function nonMaxSuppressionWithScoreAsync_(boxes, scores, maxOutputSize, iouThreshold = 0.5, scoreThreshold = Number.NEGATIVE_INFINITY, softNmsSigma = 0) {
  const $boxes = convertToTensor(boxes, "boxes", "nonMaxSuppressionAsync");
  const $scores = convertToTensor(scores, "scores", "nonMaxSuppressionAsync");
  const params = nonMaxSuppSanityCheck($boxes, $scores, maxOutputSize, iouThreshold, scoreThreshold, softNmsSigma);
  maxOutputSize = params.maxOutputSize;
  iouThreshold = params.iouThreshold;
  scoreThreshold = params.scoreThreshold;
  softNmsSigma = params.softNmsSigma;
  const boxesAndScores = await Promise.all([$boxes.data(), $scores.data()]);
  const boxesVals = boxesAndScores[0];
  const scoresVals = boxesAndScores[1];
  const {selectedIndices, selectedScores} = nonMaxSuppressionV5Impl(boxesVals, scoresVals, maxOutputSize, iouThreshold, scoreThreshold, softNmsSigma);
  if ($boxes !== boxes) {
    $boxes.dispose();
  }
  if ($scores !== scores) {
    $scores.dispose();
  }
  return {
    selectedIndices: tensor1d(selectedIndices, "int32"),
    selectedScores: tensor1d(selectedScores)
  };
}
const nonMaxSuppressionWithScoreAsync = nonMaxSuppressionWithScoreAsync_;
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
function nonMaxSuppressionPadded_(boxes, scores, maxOutputSize, iouThreshold = 0.5, scoreThreshold = Number.NEGATIVE_INFINITY, padToMaxOutputSize = false) {
  const $boxes = convertToTensor(boxes, "boxes", "nonMaxSuppression");
  const $scores = convertToTensor(scores, "scores", "nonMaxSuppression");
  const params = nonMaxSuppSanityCheck($boxes, $scores, maxOutputSize, iouThreshold, scoreThreshold, null);
  const $maxOutputSize = params.maxOutputSize;
  const $iouThreshold = params.iouThreshold;
  const $scoreThreshold = params.scoreThreshold;
  const inputs = {boxes: $boxes, scores: $scores};
  const attrs = {
    maxOutputSize: $maxOutputSize,
    iouThreshold: $iouThreshold,
    scoreThreshold: $scoreThreshold,
    padToMaxOutputSize
  };
  const result = ENGINE.runKernel(NonMaxSuppressionV4, inputs, attrs);
  return {selectedIndices: result[0], validOutputs: result[1]};
}
const nonMaxSuppressionPadded = op({nonMaxSuppressionPadded_});
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
async function nonMaxSuppressionPaddedAsync_(boxes, scores, maxOutputSize, iouThreshold = 0.5, scoreThreshold = Number.NEGATIVE_INFINITY, padToMaxOutputSize = false) {
  const $boxes = convertToTensor(boxes, "boxes", "nonMaxSuppressionAsync");
  const $scores = convertToTensor(scores, "scores", "nonMaxSuppressionAsync");
  const params = nonMaxSuppSanityCheck($boxes, $scores, maxOutputSize, iouThreshold, scoreThreshold, null);
  const $maxOutputSize = params.maxOutputSize;
  const $iouThreshold = params.iouThreshold;
  const $scoreThreshold = params.scoreThreshold;
  const [boxesVals, scoresVals] = await Promise.all([$boxes.data(), $scores.data()]);
  const {selectedIndices, validOutputs} = nonMaxSuppressionV4Impl(boxesVals, scoresVals, $maxOutputSize, $iouThreshold, $scoreThreshold, padToMaxOutputSize);
  if ($boxes !== boxes) {
    $boxes.dispose();
  }
  if ($scores !== scores) {
    $scores.dispose();
  }
  return {
    selectedIndices: tensor1d(selectedIndices, "int32"),
    validOutputs: scalar(validOutputs, "int32")
  };
}
const nonMaxSuppressionPaddedAsync = nonMaxSuppressionPaddedAsync_;
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
function resizeBilinear_(images, size, alignCorners = false, halfPixelCenters = false) {
  const $images = convertToTensor(images, "images", "resizeBilinear");
  assert($images.rank === 3 || $images.rank === 4, () => `Error in resizeBilinear: x must be rank 3 or 4, but got rank ${$images.rank}.`);
  assert(size.length === 2, () => `Error in resizeBilinear: new shape must 2D, but got shape ${size}.`);
  assert(halfPixelCenters === false || alignCorners === false, () => `Error in resizeBilinear: If halfPixelCenters is true, alignCorners must be false.`);
  let batchImages = $images;
  let reshapedTo4D = false;
  if ($images.rank === 3) {
    reshapedTo4D = true;
    batchImages = reshape($images, [1, $images.shape[0], $images.shape[1], $images.shape[2]]);
  }
  const inputs = {images: batchImages};
  const attrs = {alignCorners, halfPixelCenters, size};
  const res = ENGINE.runKernel(ResizeBilinear, inputs, attrs);
  if (reshapedTo4D) {
    return reshape(res, [res.shape[1], res.shape[2], res.shape[3]]);
  }
  return res;
}
const resizeBilinear = op({resizeBilinear_});
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
function resizeNearestNeighbor_(images, size, alignCorners = false, halfPixelCenters = false) {
  const $images = convertToTensor(images, "images", "resizeNearestNeighbor");
  assert($images.rank === 3 || $images.rank === 4, () => `Error in resizeNearestNeighbor: x must be rank 3 or 4, but got rank ${$images.rank}.`);
  assert(size.length === 2, () => `Error in resizeNearestNeighbor: new shape must 2D, but got shape ${size}.`);
  assert($images.dtype === "float32" || $images.dtype === "int32", () => "`images` must have `int32` or `float32` as dtype");
  assert(halfPixelCenters === false || alignCorners === false, () => `Error in resizeNearestNeighbor: If halfPixelCenters is true, alignCorners must be false.`);
  let batchImages = $images;
  let reshapedTo4D = false;
  if ($images.rank === 3) {
    reshapedTo4D = true;
    batchImages = reshape($images, [1, $images.shape[0], $images.shape[1], $images.shape[2]]);
  }
  const inputs = {images: batchImages};
  const attrs = {alignCorners, halfPixelCenters, size};
  const res = ENGINE.runKernel(ResizeNearestNeighbor, inputs, attrs);
  if (reshapedTo4D) {
    return reshape(res, [res.shape[1], res.shape[2], res.shape[3]]);
  }
  return res;
}
const resizeNearestNeighbor = op({resizeNearestNeighbor_});
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
function transform_(image2, transforms, interpolation = "nearest", fillMode = "constant", fillValue = 0, outputShape) {
  const $image = convertToTensor(image2, "image", "transform", "float32");
  const $transforms = convertToTensor(transforms, "transforms", "transform", "float32");
  assert($image.rank === 4, () => `Error in transform: image must be rank 4,but got rank ${$image.rank}.`);
  assert($transforms.rank === 2 && ($transforms.shape[0] === $image.shape[0] || $transforms.shape[0] === 1) && $transforms.shape[1] === 8, () => `Error in transform: Input transform should be batch x 8 or 1 x 8`);
  assert(outputShape == null || outputShape.length === 2, () => `Error in transform: outputShape must be [height, width] or null, but got ${outputShape}.`);
  const inputs = {image: $image, transforms: $transforms};
  const attrs = {interpolation, fillMode, fillValue, outputShape};
  return ENGINE.runKernel(Transform, inputs, attrs);
}
const transform = op({transform_});
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
function bandPart_(a, numLower, numUpper) {
  assert(numLower % 1 === 0, () => `bandPart(): numLower must be an integer, got ${numLower}.`);
  assert(numUpper % 1 === 0, () => `bandPart(): numUpper must be an integer, got ${numUpper}.`);
  const $a = convertToTensor(a, "a", "bandPart");
  assert($a.rank >= 2, () => `bandPart(): Rank must be at least 2, got ${$a.rank}.`);
  const shape = $a.shape;
  const [M, N] = $a.shape.slice(-2);
  if (!(numLower <= M)) {
    throw new Error(`bandPart(): numLower (${numLower}) must not be greater than the number of rows (${M}).`);
  }
  if (!(numUpper <= N)) {
    throw new Error(`bandPart(): numUpper (${numUpper}) must not be greater than the number of columns (${N}).`);
  }
  if (numLower < 0) {
    numLower = M;
  }
  if (numUpper < 0) {
    numUpper = N;
  }
  const i = reshape(range(0, M, 1, "int32"), [-1, 1]);
  const j = range(0, N, 1, "int32");
  const ij = sub(i, j);
  const inBand = logicalAnd(lessEqual(ij, scalar(+numLower, "int32")), greaterEqual(ij, scalar(-numUpper, "int32")));
  const zero = zeros([M, N], $a.dtype);
  return reshape(stack(unstack(reshape($a, [-1, M, N])).map((mat) => where(inBand, mat, zero))), shape);
}
const bandPart = op({bandPart_});
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
function gramSchmidt_(xs) {
  let inputIsTensor2D;
  if (Array.isArray(xs)) {
    inputIsTensor2D = false;
    assert(xs != null && xs.length > 0, () => "Gram-Schmidt process: input must not be null, undefined, or empty");
    const dim = xs[0].shape[0];
    for (let i = 1; i < xs.length; ++i) {
      assert(xs[i].shape[0] === dim, () => `Gram-Schmidt: Non-unique lengths found in the input vectors: (${xs[i].shape[0]} vs. ${dim})`);
    }
  } else {
    inputIsTensor2D = true;
    xs = split(xs, xs.shape[0], 0).map((x) => squeeze(x, [0]));
  }
  assert(xs.length <= xs[0].shape[0], () => `Gram-Schmidt: Number of vectors (${xs.length}) exceeds number of dimensions (${xs[0].shape[0]}).`);
  const ys = [];
  const xs1d = xs;
  for (let i = 0; i < xs.length; ++i) {
    ys.push(ENGINE.tidy(() => {
      let x = xs1d[i];
      if (i > 0) {
        for (let j = 0; j < i; ++j) {
          const proj = mul(sum(mul(ys[j], x)), ys[j]);
          x = sub(x, proj);
        }
      }
      return div(x, norm(x, "euclidean"));
    }));
  }
  if (inputIsTensor2D) {
    return stack(ys, 0);
  } else {
    return ys;
  }
}
const gramSchmidt = op({gramSchmidt_});
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
function qr_(x, fullMatrices = false) {
  assert(x.rank >= 2, () => `qr() requires input tensor to have a rank >= 2, but got rank ${x.rank}`);
  if (x.rank === 2) {
    return qr2d(x, fullMatrices);
  } else {
    const outerDimsProd = x.shape.slice(0, x.shape.length - 2).reduce((value, prev) => value * prev);
    const x2ds = unstack(reshape(x, [
      outerDimsProd,
      x.shape[x.shape.length - 2],
      x.shape[x.shape.length - 1]
    ]), 0);
    const q2ds = [];
    const r2ds = [];
    x2ds.forEach((x2d) => {
      const [q2d, r2d] = qr2d(x2d, fullMatrices);
      q2ds.push(q2d);
      r2ds.push(r2d);
    });
    const q = reshape(stack(q2ds, 0), x.shape);
    const r = reshape(stack(r2ds, 0), x.shape);
    return [q, r];
  }
}
function qr2d(x, fullMatrices = false) {
  return ENGINE.tidy(() => {
    assert(x.shape.length === 2, () => `qr2d() requires a 2D Tensor, but got a ${x.shape.length}D Tensor.`);
    const m = x.shape[0];
    const n = x.shape[1];
    let q = eye(m);
    let r = clone(x);
    const one2D = tensor2d([[1]], [1, 1]);
    let w = clone(one2D);
    const iters = m >= n ? n : m;
    for (let j = 0; j < iters; ++j) {
      const rTemp = r;
      const wTemp = w;
      const qTemp = q;
      [w, r, q] = ENGINE.tidy(() => {
        const rjEnd1 = slice(r, [j, j], [m - j, 1]);
        const normX = norm(rjEnd1);
        const rjj = slice(r, [j, j], [1, 1]);
        const s = where(greater(rjj, 0), tensor2d([[-1]]), tensor2d([[1]]));
        const u1 = sub(rjj, mul(s, normX));
        const wPre = div(rjEnd1, u1);
        if (wPre.shape[0] === 1) {
          w = clone(one2D);
        } else {
          w = concat([
            one2D,
            slice(wPre, [1, 0], [wPre.shape[0] - 1, wPre.shape[1]])
          ], 0);
        }
        const tau = neg(div(matMul(s, u1), normX));
        const rjEndAll = slice(r, [j, 0], [m - j, n]);
        const tauTimesW = mul(tau, w);
        const wT = transpose(w);
        if (j === 0) {
          r = sub(rjEndAll, matMul(tauTimesW, matMul(wT, rjEndAll)));
        } else {
          const rTimesTau = sub(rjEndAll, matMul(tauTimesW, matMul(wT, rjEndAll)));
          r = concat([slice(r, [0, 0], [j, n]), rTimesTau], 0);
        }
        const tawTimesWT = transpose(tauTimesW);
        const qAllJEnd = slice(q, [0, j], [m, q.shape[1] - j]);
        if (j === 0) {
          q = sub(qAllJEnd, matMul(matMul(qAllJEnd, w), tawTimesWT));
        } else {
          const qTimesTau = sub(qAllJEnd, matMul(matMul(qAllJEnd, w), tawTimesWT));
          q = concat([slice(q, [0, 0], [m, j]), qTimesTau], 1);
        }
        return [w, r, q];
      });
      dispose([rTemp, wTemp, qTemp]);
    }
    if (!fullMatrices && m > n) {
      q = slice(q, [0, 0], [m, n]);
      r = slice(r, [0, 0], [n, n]);
    }
    return [q, r];
  });
}
const qr = op({qr_});
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
var Reduction;
(function(Reduction2) {
  Reduction2[Reduction2["NONE"] = 0] = "NONE";
  Reduction2[Reduction2["MEAN"] = 1] = "MEAN";
  Reduction2[Reduction2["SUM"] = 2] = "SUM";
  Reduction2[Reduction2["SUM_BY_NONZERO_WEIGHTS"] = 3] = "SUM_BY_NONZERO_WEIGHTS";
})(Reduction || (Reduction = {}));
function computeWeightedLoss_(losses2, weights, reduction = Reduction.SUM_BY_NONZERO_WEIGHTS) {
  const $losses = convertToTensor(losses2, "losses", "computeWeightedLoss");
  let $weights = null;
  if (weights != null) {
    $weights = convertToTensor(weights, "weights", "computeWeightedLoss");
  }
  const weightedLoss = $weights == null ? $losses : mul($losses, $weights);
  if (reduction === Reduction.NONE) {
    return weightedLoss;
  }
  if (reduction === Reduction.SUM) {
    return sum(weightedLoss);
  }
  if (reduction === Reduction.MEAN) {
    if ($weights == null) {
      return mean(weightedLoss);
    } else {
      const broadcastFactor = $losses.size / $weights.size;
      const result = div(sum(weightedLoss), sum($weights));
      return broadcastFactor > 1 ? div(result, scalar(broadcastFactor)) : result;
    }
  }
  if (reduction === Reduction.SUM_BY_NONZERO_WEIGHTS) {
    if ($weights == null) {
      return div(sum(weightedLoss), scalar($losses.size));
    } else {
      const broadcastedWeights = mul($weights, ones($losses.shape));
      const numNonZeros = cast(sum(notEqual(broadcastedWeights, scalar(0))), "float32");
      return div(sum(weightedLoss), numNonZeros);
    }
  }
  throw Error(`Unknown reduction: ${reduction}`);
}
const computeWeightedLoss = op({computeWeightedLoss_});
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
function absoluteDifference_(labels, predictions, weights, reduction = Reduction.SUM_BY_NONZERO_WEIGHTS) {
  const $labels = convertToTensor(labels, "labels", "absoluteDifference");
  const $predictions = convertToTensor(predictions, "predictions", "absoluteDifference");
  let $weights = null;
  if (weights != null) {
    $weights = convertToTensor(weights, "weights", "absoluteDifference");
  }
  assertShapesMatch($labels.shape, $predictions.shape, "Error in absoluteDifference: ");
  const losses2 = abs(sub($labels, $predictions));
  return computeWeightedLoss(losses2, $weights, reduction);
}
const absoluteDifference = op({absoluteDifference_});
function cosineDistance_(labels, predictions, axis, weights, reduction = Reduction.SUM_BY_NONZERO_WEIGHTS) {
  const $labels = convertToTensor(labels, "labels", "cosineDistance");
  const $predictions = convertToTensor(predictions, "predictions", "cosineDistance");
  let $weights = null;
  if (weights != null) {
    $weights = convertToTensor(weights, "weights", "cosineDistance");
  }
  assertShapesMatch($labels.shape, $predictions.shape, "Error in cosineDistance: ");
  const one = scalar(1);
  const losses2 = sub(one, sum(mul($labels, $predictions), axis, true));
  return computeWeightedLoss(losses2, $weights, reduction);
}
const cosineDistance = op({cosineDistance_});
function hingeLoss_(labels, predictions, weights, reduction = Reduction.SUM_BY_NONZERO_WEIGHTS) {
  let $labels = convertToTensor(labels, "labels", "hingeLoss");
  const $predictions = convertToTensor(predictions, "predictions", "hingeLoss");
  let $weights = null;
  if (weights != null) {
    $weights = convertToTensor(weights, "weights", "hingeLoss");
  }
  assertShapesMatch($labels.shape, $predictions.shape, "Error in hingeLoss: ");
  const one = scalar(1);
  $labels = sub(mul(scalar(2), $labels), one);
  const losses2 = relu(sub(one, mul($labels, $predictions)));
  return computeWeightedLoss(losses2, $weights, reduction);
}
const hingeLoss = op({hingeLoss_});
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
function huberLoss_(labels, predictions, weights, delta = 1, reduction = Reduction.SUM_BY_NONZERO_WEIGHTS) {
  const $labels = convertToTensor(labels, "labels", "huberLoss");
  const $predictions = convertToTensor(predictions, "predictions", "huberLoss");
  let $weights = null;
  if (weights != null) {
    $weights = convertToTensor(weights, "weights", "huberLoss");
  }
  assertShapesMatch($labels.shape, $predictions.shape, "Error in huberLoss: ");
  const deltaScalar = scalar(delta);
  const error = abs(sub($predictions, $labels));
  const quadratic = minimum(error, deltaScalar);
  const linear = sub(error, quadratic);
  const losses2 = add(mul(scalar(0.5), square(quadratic)), mul(deltaScalar, linear));
  return computeWeightedLoss(losses2, $weights, reduction);
}
const huberLoss = op({huberLoss_});
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
function logLoss_(labels, predictions, weights, epsilon = 1e-7, reduction = Reduction.SUM_BY_NONZERO_WEIGHTS) {
  const $labels = convertToTensor(labels, "labels", "logLoss");
  const $predictions = convertToTensor(predictions, "predictions", "logLoss");
  let $weights = null;
  if (weights != null) {
    $weights = convertToTensor(weights, "weights", "logLoss");
  }
  assertShapesMatch($labels.shape, $predictions.shape, "Error in logLoss: ");
  const one = scalar(1);
  const epsilonScalar = scalar(epsilon);
  const l1 = neg(mul($labels, log(add($predictions, epsilonScalar))));
  const l2 = mul(sub(one, $labels), log(add(sub(one, $predictions), epsilonScalar)));
  const losses2 = sub(l1, l2);
  return computeWeightedLoss(losses2, $weights, reduction);
}
const logLoss = op({logLoss_});
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
function meanSquaredError_(labels, predictions, weights, reduction = Reduction.SUM_BY_NONZERO_WEIGHTS) {
  const $labels = convertToTensor(labels, "labels", "meanSquaredError");
  const $predictions = convertToTensor(predictions, "predictions", "meanSquaredError");
  let $weights = null;
  if (weights != null) {
    $weights = convertToTensor(weights, "weights", "meanSquaredError");
  }
  assertShapesMatch($labels.shape, $predictions.shape, "Error in meanSquaredError: ");
  const losses2 = squaredDifference($labels, $predictions);
  return computeWeightedLoss(losses2, $weights, reduction);
}
const meanSquaredError = op({meanSquaredError_});
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
function sigmoidCrossEntropyWithLogits_(labels, logits) {
  const $labels = convertToTensor(labels, "labels", "sigmoidCrossEntropyWithLogits");
  const $logits = convertToTensor(logits, "logits", "sigmoidCrossEntropyWithLogits");
  assertShapesMatch($labels.shape, $logits.shape, "Error in sigmoidCrossEntropyWithLogits: ");
  const maxOutput = relu($logits);
  const outputXTarget = mul($logits, $labels);
  const sigmoidOutput = log1p(exp(neg(abs($logits))));
  return add(sub(maxOutput, outputXTarget), sigmoidOutput);
}
function sigmoidCrossEntropy_(multiClassLabels, logits, weights, labelSmoothing = 0, reduction = Reduction.SUM_BY_NONZERO_WEIGHTS) {
  let $multiClassLabels = convertToTensor(multiClassLabels, "multiClassLabels", "sigmoidCrossEntropy");
  const $logits = convertToTensor(logits, "logits", "sigmoidCrossEntropy");
  let $weights = null;
  if (weights != null) {
    $weights = convertToTensor(weights, "weights", "sigmoidCrossEntropy");
  }
  assertShapesMatch($multiClassLabels.shape, $logits.shape, "Error in sigmoidCrossEntropy: ");
  if (labelSmoothing > 0) {
    const labelSmoothingScalar = scalar(labelSmoothing);
    const one = scalar(1);
    const half = scalar(0.5);
    $multiClassLabels = add(mul($multiClassLabels, sub(one, labelSmoothingScalar)), mul(half, labelSmoothingScalar));
  }
  const losses2 = sigmoidCrossEntropyWithLogits_($multiClassLabels, $logits);
  return computeWeightedLoss(losses2, $weights, reduction);
}
const sigmoidCrossEntropy = op({sigmoidCrossEntropy_});
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
function softmaxCrossEntropyWithLogits_(labels, logits, dim = -1) {
  if (dim === -1) {
    dim = logits.rank - 1;
  }
  if (dim !== logits.rank - 1) {
    throw Error(`Softmax cross entropy along a non-last dimension is not yet supported. Labels / logits was rank ${logits.rank} and dim was ${dim}`);
  }
  const customOp = customGrad((labels2, logits2, save) => {
    const keepDims = true;
    const lse = logSumExp(logits2, [dim], keepDims);
    const logResult = sub(cast(logits2, "float32"), lse);
    save([labels2, logResult]);
    const costVector = neg(mul(logResult, labels2));
    const value = sum(costVector, [dim]);
    const gradFunc = (dy, saved) => {
      const [labels3, logResult2] = saved;
      const dyShape = expandShapeToKeepDim(dy.shape, [dim]);
      return [
        mul(reshape(dy, dyShape), sub(cast(labels3, "float32"), exp(logResult2))),
        mul(reshape(dy, dyShape), sub(exp(logResult2), cast(labels3, "float32")))
      ];
    };
    return {value, gradFunc};
  });
  return customOp(labels, logits);
}
function softmaxCrossEntropy_(onehotLabels, logits, weights, labelSmoothing = 0, reduction = Reduction.SUM_BY_NONZERO_WEIGHTS) {
  let $onehotLabels = convertToTensor(onehotLabels, "onehotLabels", "softmaxCrossEntropy");
  const $logits = convertToTensor(logits, "logits", "softmaxCrossEntropy");
  let $weights = null;
  if (weights != null) {
    $weights = convertToTensor(weights, "weights", "softmaxCrossEntropy");
  }
  assertShapesMatch($onehotLabels.shape, $logits.shape, "Error in softmaxCrossEntropy: ");
  if (labelSmoothing > 0) {
    const labelSmoothingScalar = scalar(labelSmoothing);
    const one = scalar(1);
    const numClasses = scalar($onehotLabels.shape[1]);
    $onehotLabels = add(mul($onehotLabels, sub(one, labelSmoothingScalar)), div(labelSmoothingScalar, numClasses));
  }
  const losses2 = softmaxCrossEntropyWithLogits_($onehotLabels, $logits);
  return computeWeightedLoss(losses2, $weights, reduction);
}
const softmaxCrossEntropy = op({softmaxCrossEntropy_});
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
const spectral = {
  fft,
  ifft,
  rfft,
  irfft
};
const signal = {
  hammingWindow,
  hannWindow,
  frame,
  stft
};
const image = {
  flipLeftRight,
  resizeNearestNeighbor,
  resizeBilinear,
  rotateWithOffset,
  cropAndResize,
  nonMaxSuppression,
  nonMaxSuppressionAsync,
  nonMaxSuppressionWithScore,
  nonMaxSuppressionWithScoreAsync,
  nonMaxSuppressionPadded,
  nonMaxSuppressionPaddedAsync,
  transform
};
const linalg = {
  bandPart,
  gramSchmidt,
  qr
};
const losses = {
  absoluteDifference,
  computeWeightedLoss,
  cosineDistance,
  hingeLoss,
  huberLoss,
  logLoss,
  meanSquaredError,
  sigmoidCrossEntropy,
  softmaxCrossEntropy
};
export {maxPool3d as $, real as A, reciprocal as B, neg as C, imag as D, log1p as E, log as F, floor as G, expm1 as H, exp as I, erf as J, cosh as K, cos as L, ceil as M, atanh as N, atan2 as O, atan as P, asinh as Q, asin as R, acosh as S, acos as T, abs as U, scalar as V, stack as W, concat as X, unstack as Y, slice as Z, dilation2d as _, minimum as a, reverse as a$, avgPool3d as a0, maxPoolWithArgmax as a1, maxPool as a2, avgPool as a3, conv3d as a4, depthwiseConv2d as a5, conv2dTranspose as a6, depthwiseConv2d$1 as a7, conv2d$1 as a8, conv2d as a9, notEqual as aA, equal as aB, matMul$1 as aC, transpose as aD, einsum as aE, matMul as aF, sparseToDense as aG, logSoftmax as aH, softmax as aI, localResponseNormalization as aJ, batchNorm as aK, denseBincount as aL, bincount as aM, cumsum as aN, argMin as aO, argMax as aP, any as aQ, all as aR, min as aS, mean as aT, max as aU, gatherND as aV, scatterND as aW, split as aX, tile as aY, squeeze as aZ, stridedSlice as a_, conv1d as aa, zerosLike as ab, zeros as ac, truncatedNormal as ad, range as ae, randomUniform as af, onesLike as ag, ones as ah, oneHot as ai, multinomial as aj, linspace as ak, fill as al, setdiff1dAsync as am, whereAsync as an, image as ao, unique as ap, topk as aq, tensor1d as ar, where as as, logicalOr as at, logicalNot as au, logicalAnd as av, lessEqual as aw, less as ax, greaterEqual as ay, greater as az, sub as b, gather as b0, irfft as b1, rfft as b2, ifft as b3, fft as b4, broadcastTo as b5, depthToSpace as b6, batchToSpaceND as b7, spaceToBatchND as b8, pad as b9, spectral as bA, signal as bB, eye as bC, logSumExp as bD, tensor3d as bE, norm as bF, enclosingPowerOfTwo as bG, cosineWindow as bH, mirrorPad as ba, expandDims as bb, browserHTTPRequest as bc, tensor2d as bd, concat2d as be, fromPixels as bf, http as bg, isHTTPScheme as bh, loadWeights as bi, weightsLoaderFactory as bj, customGrad as bk, RandGamma as bl, MPRandGauss as bm, variableGrads as bn, nonMaxSuppressionV3Impl as bo, nonMaxSuppressionV4Impl as bp, nonMaxSuppressionV5Impl as bq, whereImpl as br, browser as bs, Reduction as bt, grad as bu, grads as bv, valueAndGrad as bw, valueAndGrads as bx, linalg as by, losses as bz, div as c, divNoNan as d, mod as e, floorDiv as f, addN as g, add as h, isNaN$1 as i, prod as j, clipByValue as k, tanh as l, maximum as m, square as n, sqrt as o, pow as p, softplus as q, rsqrt as r, squaredDifference as s, tan as t, sinh as u, sign as v, sin as w, sigmoid as x, selu as y, round as z};
