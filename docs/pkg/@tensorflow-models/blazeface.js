import {t as toNestedArray, c as clone, e as env, B as Buffer, m as mul, p as prelu, l as leakyRelu, r as relu6, a as relu, b as elu, d as complex, f as assert, k as keep, g as tensor, h as tidy, i as reshape, j as cast, s as sum, n as arraysEqual, o as isPromise, q as getLoadHandlers, u as decodeWeights, v as getSaveHandlers, T as Tensor} from "../common/fused_util-15f1054e.js";
import {s as squaredDifference, p as pow, m as maximum, a as minimum, b as sub, f as floorDiv, d as divNoNan, c as div, e as mod, g as addN, h as add, i as isNaN, j as prod, r as rsqrt, k as clipByValue, t as tan, l as tanh, n as square, o as sqrt, q as softplus, u as sinh, v as sign, w as sin, x as sigmoid, y as selu, z as round, A as real, B as reciprocal, C as neg, D as imag, E as log1p, F as log, G as floor, H as expm1, I as exp, J as erf, K as cosh, L as cos, M as ceil, N as atanh, O as atan2, P as atan, Q as asinh, R as asin, S as acosh, T as acos, U as abs, V as scalar, W as stack, X as concat, Y as unstack, Z as slice, _ as dilation2d, $ as maxPool3d, a0 as avgPool3d, a1 as maxPoolWithArgmax, a2 as maxPool, a3 as avgPool, a4 as conv3d, a5 as depthwiseConv2d, a6 as conv2dTranspose, a7 as depthwiseConv2d$1, a8 as conv2d, a9 as conv2d$1, aa as conv1d, ab as zerosLike, ac as zeros, ad as truncatedNormal, ae as range, af as randomUniform, ag as onesLike, ah as ones, ai as oneHot, aj as multinomial, ak as linspace, al as fill, am as setdiff1dAsync, an as whereAsync, ao as image$1, ap as unique, aq as topk, ar as tensor1d, as as where, at as logicalOr, au as logicalNot, av as logicalAnd, aw as lessEqual, ax as less, ay as greaterEqual, az as greater, aA as notEqual, aB as equal, aC as matMul, aD as transpose, aE as einsum, aF as matMul$1, aG as sparseToDense, aH as logSoftmax, aI as softmax, aJ as localResponseNormalization, aK as batchNorm, aL as denseBincount, aM as bincount, aN as cumsum, aO as argMin, aP as argMax, aQ as any, aR as all, aS as min, aT as mean, aU as max, aV as gatherND, aW as scatterND, aX as split$1, aY as tile, aZ as squeeze, a_ as stridedSlice, a$ as reverse, b0 as gather, b1 as irfft, b2 as rfft, b3 as ifft, b4 as fft, b5 as broadcastTo, b6 as depthToSpace, b7 as batchToSpaceND, b8 as spaceToBatchND, b9 as pad, ba as mirrorPad, bb as expandDims, bc as browserHTTPRequest, bd as tensor2d, be as concat2d, bf as fromPixels} from "../common/ops-3edf0e7e.js";
import "../common/_commonjsHelpers-798ad6a7.js";
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
 *
 * =============================================================================
 */
var DataType;
(function(DataType2) {
  DataType2[DataType2["DT_INVALID"] = 0] = "DT_INVALID";
  DataType2[DataType2["DT_FLOAT"] = 1] = "DT_FLOAT";
  DataType2[DataType2["DT_DOUBLE"] = 2] = "DT_DOUBLE";
  DataType2[DataType2["DT_INT32"] = 3] = "DT_INT32";
  DataType2[DataType2["DT_UINT8"] = 4] = "DT_UINT8";
  DataType2[DataType2["DT_INT16"] = 5] = "DT_INT16";
  DataType2[DataType2["DT_INT8"] = 6] = "DT_INT8";
  DataType2[DataType2["DT_STRING"] = 7] = "DT_STRING";
  DataType2[DataType2["DT_COMPLEX64"] = 8] = "DT_COMPLEX64";
  DataType2[DataType2["DT_INT64"] = 9] = "DT_INT64";
  DataType2[DataType2["DT_BOOL"] = 10] = "DT_BOOL";
  DataType2[DataType2["DT_QINT8"] = 11] = "DT_QINT8";
  DataType2[DataType2["DT_QUINT8"] = 12] = "DT_QUINT8";
  DataType2[DataType2["DT_QINT32"] = 13] = "DT_QINT32";
  DataType2[DataType2["DT_BFLOAT16"] = 14] = "DT_BFLOAT16";
  DataType2[DataType2["DT_FLOAT_REF"] = 101] = "DT_FLOAT_REF";
  DataType2[DataType2["DT_DOUBLE_REF"] = 102] = "DT_DOUBLE_REF";
  DataType2[DataType2["DT_INT32_REF"] = 103] = "DT_INT32_REF";
  DataType2[DataType2["DT_UINT8_REF"] = 104] = "DT_UINT8_REF";
  DataType2[DataType2["DT_INT16_REF"] = 105] = "DT_INT16_REF";
  DataType2[DataType2["DT_INT8_REF"] = 106] = "DT_INT8_REF";
  DataType2[DataType2["DT_STRING_REF"] = 107] = "DT_STRING_REF";
  DataType2[DataType2["DT_COMPLEX64_REF"] = 108] = "DT_COMPLEX64_REF";
  DataType2[DataType2["DT_INT64_REF"] = 109] = "DT_INT64_REF";
  DataType2[DataType2["DT_BOOL_REF"] = 110] = "DT_BOOL_REF";
  DataType2[DataType2["DT_QINT8_REF"] = 111] = "DT_QINT8_REF";
  DataType2[DataType2["DT_QUINT8_REF"] = 112] = "DT_QUINT8_REF";
  DataType2[DataType2["DT_QINT32_REF"] = 113] = "DT_QINT32_REF";
  DataType2[DataType2["DT_BFLOAT16_REF"] = 114] = "DT_BFLOAT16_REF";
})(DataType || (DataType = {}));
var SaverDef;
(function(SaverDef2) {
  (function(CheckpointFormatVersion) {
    CheckpointFormatVersion[CheckpointFormatVersion["LEGACY"] = 0] = "LEGACY";
    CheckpointFormatVersion[CheckpointFormatVersion["V1"] = 1] = "V1";
    CheckpointFormatVersion[CheckpointFormatVersion["V2"] = 2] = "V2";
  })(SaverDef2.CheckpointFormatVersion || (SaverDef2.CheckpointFormatVersion = {}));
})(SaverDef || (SaverDef = {}));
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
const CUSTOM_OPS = {};
function getRegisteredOp(name) {
  return CUSTOM_OPS[name];
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
function getParamValue(paramName, node, tensorMap, context, resourceManager) {
  const inputParam = node.inputParams[paramName];
  if (inputParam && inputParam.inputIndexStart !== void 0) {
    const start = inputParam.inputIndexStart;
    const end = inputParam.inputIndexEnd === 0 ? void 0 : inputParam.inputIndexEnd === void 0 ? start + 1 : inputParam.inputIndexEnd;
    if (inputParam.type === "tensor") {
      return getTensor(node.inputNames[inputParam.inputIndexStart], tensorMap, context, resourceManager);
    }
    if (inputParam.type === "tensors") {
      const inputs = node.inputNames.slice(start, end);
      return inputs.map((name) => getTensor(name, tensorMap, context, resourceManager));
    }
    const tensor2 = getTensor(node.inputNames.slice(start)[0], tensorMap, context, resourceManager);
    const data = tensor2.dataSync();
    return inputParam.type === "number" ? data[0] : toNestedArray(tensor2.shape, data);
  }
  const attrParam = node.attrParams[paramName];
  return attrParam && attrParam.value;
}
function getTensor(name, tensorsMap, context, resourceManager) {
  const [nodeName, index] = parseNodeName(name);
  if (resourceManager != null) {
    const tensor2 = resourceManager.getHashTableHandleByName(nodeName);
    if (tensor2 != null) {
      return tensor2;
    }
  }
  const contextId = context.currentContextIds.find((contextId2) => {
    return !!tensorsMap[getNodeNameWithContextId(nodeName, contextId2)];
  });
  return contextId !== void 0 ? tensorsMap[getNodeNameWithContextId(nodeName, contextId)][index] : void 0;
}
function getTensorsForCurrentContenxt(name, tensorsMap, context) {
  return tensorsMap[getNodeNameWithContextId(name, context.currentContextId)];
}
function getNodeNameAndIndex(inputName, context) {
  const [nodeName, index] = parseNodeName(inputName);
  return [
    getNodeNameWithContextId(nodeName, context && context.currentContextId),
    index
  ];
}
function getNodeNameWithContextId(name, contextId) {
  return !!contextId ? `${name}-${contextId}` : name;
}
function parseNodeName(name) {
  const parts = name.split(":");
  if (parts.length === 1) {
    return [name, 0];
  }
  const nodeName = parts[0];
  return [nodeName, Number(parts[parts.length - 1])];
}
function getPadding(node, tensorMap, context) {
  let pad2 = getParamValue("pad", node, tensorMap, context);
  if (pad2 === "explicit") {
    pad2 = getParamValue("explicitPaddings", node, tensorMap, context);
    const explicitPadding = [[0, 0], [0, 0], [0, 0], [0, 0]];
    for (let i = 0; i < 4; i++) {
      explicitPadding[i][0] = pad2[i * 2];
      explicitPadding[i][1] = pad2[i * 2 + 1];
    }
    return explicitPadding;
  }
  return pad2;
}
function cloneTensor(tensor2) {
  return tensor2.kept ? tensor2 : clone(tensor2);
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
const json = [
  {
    tfOpName: "Add",
    category: "arithmetic",
    inputs: [
      {start: 0, name: "a", type: "tensor"},
      {start: 1, name: "b", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "AddV2",
    category: "arithmetic",
    inputs: [
      {start: 0, name: "a", type: "tensor"},
      {start: 1, name: "b", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "AddN",
    category: "arithmetic",
    inputs: [{start: 0, end: 0, name: "tensors", type: "tensors"}]
  },
  {
    tfOpName: "BiasAdd",
    category: "arithmetic",
    inputs: [
      {start: 0, name: "a", type: "tensor"},
      {start: 1, name: "b", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true},
      {
        tfName: "data_format",
        name: "dataFormat",
        type: "string",
        notSupported: true
      }
    ]
  },
  {
    tfOpName: "Sub",
    category: "arithmetic",
    inputs: [
      {start: 0, name: "a", type: "tensor"},
      {start: 1, name: "b", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "RealDiv",
    category: "arithmetic",
    inputs: [
      {start: 0, name: "a", type: "tensor"},
      {start: 1, name: "b", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Div",
    category: "arithmetic",
    inputs: [
      {start: 0, name: "a", type: "tensor"},
      {start: 1, name: "b", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "DivNoNan",
    category: "arithmetic",
    inputs: [
      {start: 0, name: "a", type: "tensor"},
      {start: 1, name: "b", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "FloorDiv",
    category: "arithmetic",
    inputs: [
      {start: 0, name: "a", type: "tensor"},
      {start: 1, name: "b", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Mul",
    category: "arithmetic",
    inputs: [
      {start: 0, name: "a", type: "tensor"},
      {start: 1, name: "b", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Maximum",
    category: "arithmetic",
    inputs: [
      {start: 0, name: "a", type: "tensor"},
      {start: 1, name: "b", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Minimum",
    category: "arithmetic",
    inputs: [
      {start: 0, name: "a", type: "tensor"},
      {start: 1, name: "b", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Pow",
    category: "arithmetic",
    inputs: [
      {start: 0, name: "a", type: "tensor"},
      {start: 1, name: "b", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "SquaredDifference",
    category: "arithmetic",
    inputs: [
      {start: 0, name: "a", type: "tensor"},
      {start: 1, name: "b", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Mod",
    category: "arithmetic",
    inputs: [
      {start: 0, name: "a", type: "tensor"},
      {start: 1, name: "b", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "FloorMod",
    category: "arithmetic",
    inputs: [
      {start: 0, name: "a", type: "tensor"},
      {start: 1, name: "b", type: "tensor"}
    ],
    attrs: [{
      tfName: "T",
      name: "dtype",
      type: "dtype",
      notSupported: true
    }]
  }
];
var arithmetic = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  json
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
const json$1 = [
  {
    tfOpName: "Abs",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Acos",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Asin",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Atan",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Atan2",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "y", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Ceil",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "ClipByValue",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "clipValueMin", type: "number"},
      {start: 2, name: "clipValueMax", type: "number"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Complex",
    category: "basic_math",
    inputs: [
      {start: 0, name: "real", type: "tensor"},
      {start: 1, name: "imag", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "ComplexAbs",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Cos",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Cosh",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Elu",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Exp",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Floor",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Log",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Imag",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true},
      {
        tfName: "Tout",
        name: "outputType",
        type: "dtype",
        notSupported: true
      }
    ]
  },
  {
    tfOpName: "Neg",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Real",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true},
      {
        tfName: "Tout",
        name: "outputType",
        type: "dtype",
        notSupported: true
      }
    ]
  },
  {
    tfOpName: "Prelu",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "alpha", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Relu",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Relu6",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Selu",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Sigmoid",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Sin",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Sinh",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Sqrt",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Rsqrt",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Square",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Tan",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Tanh",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Sign",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Round",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Expm1",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Log1p",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Reciprocal",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Softplus",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Asinh",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Acosh",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Atanh",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Erf",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Prod",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "axes", type: "number[]"}
    ],
    attrs: [
      {
        tfName: "keep_dims",
        name: "keepDims",
        type: "bool",
        notSupported: true
      },
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "LeakyRelu",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {
        tfName: "alpha",
        name: "alpha",
        type: "number",
        defaultValue: 0.2
      },
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "IsNan",
    category: "basic_math",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [{
      tfName: "T",
      name: "dtype",
      type: "dtype",
      notSupported: true
    }]
  }
];
var basicMath = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  json: json$1
});
const json$2 = [
  {
    tfOpName: "EmptyTensorList",
    category: "control",
    inputs: [
      {start: 0, name: "elementShape", type: "shape"},
      {start: 1, name: "maxNumElements", type: "number"}
    ],
    attrs: [{tfName: "element_dtype", name: "elementDType", type: "dtype"}]
  },
  {
    tfOpName: "LoopCond",
    category: "control",
    inputs: [{start: 0, name: "pred", type: "tensor"}]
  },
  {
    tfOpName: "Switch",
    category: "control",
    inputs: [
      {start: 0, name: "data", type: "tensor"},
      {start: 1, name: "pred", type: "tensor"}
    ]
  },
  {
    tfOpName: "Merge",
    category: "control",
    inputs: [{start: 0, end: 0, name: "tensors", type: "tensors"}]
  },
  {
    tfOpName: "Enter",
    category: "control",
    inputs: [
      {start: 0, name: "tensor", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true},
      {tfName: "frame_name", name: "frameName", type: "string"},
      {tfName: "is_constant", name: "isConstant", type: "bool"}
    ]
  },
  {
    tfOpName: "Exit",
    category: "control",
    inputs: [
      {start: 0, name: "tensor", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "NextIteration",
    category: "control",
    inputs: [
      {start: 0, name: "tensor", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "TensorArrayV3",
    category: "control",
    inputs: [
      {start: 0, name: "size", type: "number"}
    ],
    attrs: [
      {tfName: "dtype", name: "dtype", type: "dtype"},
      {tfName: "element_shape", name: "elementShape", type: "shape"},
      {tfName: "dynamic_size", name: "dynamicSize", type: "bool"},
      {tfName: "clear_after_read", name: "clearAfterRead", type: "bool"},
      {
        tfName: "identical_element_shapes",
        name: "identicalElementShapes",
        type: "bool"
      },
      {tfName: "tensor_array_name", name: "name", type: "string"}
    ]
  },
  {
    tfOpName: "TensorArrayWriteV3",
    category: "control",
    inputs: [
      {start: 0, name: "tensorArrayId", type: "tensor"},
      {start: 1, name: "index", type: "number"},
      {start: 2, name: "tensor", type: "tensor"},
      {start: 3, name: "flowIn", type: "number"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "TensorArrayReadV3",
    category: "control",
    inputs: [
      {start: 0, name: "tensorArrayId", type: "tensor"},
      {start: 1, name: "index", type: "number"},
      {start: 2, name: "flowIn", type: "number"}
    ],
    attrs: [{
      tfName: "dtype",
      name: "dtype",
      type: "dtype",
      notSupported: true
    }]
  },
  {
    tfOpName: "TensorArrayGatherV3",
    category: "control",
    inputs: [
      {start: 0, name: "tensorArrayId", type: "tensor"},
      {start: 1, name: "indices", type: "number[]"},
      {start: 2, name: "flowIn", type: "number"}
    ],
    attrs: [
      {tfName: "dtype", name: "dtype", type: "dtype"},
      {tfName: "element_shape", name: "elementShape", type: "shape"}
    ]
  },
  {
    tfOpName: "TensorArrayScatterV3",
    category: "control",
    inputs: [
      {start: 0, name: "tensorArrayId", type: "tensor"},
      {start: 1, name: "indices", type: "number[]"},
      {start: 2, name: "tensor", type: "tensor"},
      {start: 3, name: "flowIn", type: "number"}
    ],
    attrs: [{tfName: "T", name: "dtype", type: "dtype"}]
  },
  {
    tfOpName: "TensorArrayConcatV3",
    category: "control",
    inputs: [
      {start: 0, name: "tensorArrayId", type: "tensor"},
      {start: 1, name: "flowIn", type: "number"}
    ],
    attrs: [
      {tfName: "dtype", name: "dtype", type: "dtype"},
      {
        tfName: "element_shape_except0",
        name: "elementShapeExcept0",
        type: "shape",
        notSupported: true
      }
    ]
  },
  {
    tfOpName: "TensorArraySplitV3",
    category: "control",
    inputs: [
      {start: 0, name: "tensorArrayId", type: "tensor"},
      {start: 1, name: "tensor", type: "tensor"},
      {start: 2, name: "lengths", type: "number[]"},
      {start: 3, name: "flowIn", type: "number"}
    ],
    attrs: [{tfName: "T", name: "dtype", type: "dtype"}]
  },
  {
    tfOpName: "TensorArraySizeV3",
    category: "control",
    inputs: [
      {start: 0, name: "tensorArrayId", type: "tensor"},
      {start: 1, name: "flowIn", type: "number"}
    ]
  },
  {
    tfOpName: "TensorArrayCloseV3",
    category: "control",
    inputs: [{start: 0, name: "tensorArrayId", type: "tensor"}]
  },
  {
    tfOpName: "StatelessIf",
    category: "control",
    inputs: [
      {start: 0, name: "cond", type: "tensor"},
      {start: 1, end: 0, name: "args", type: "tensors"}
    ],
    attrs: [
      {tfName: "then_branch", name: "thenBranch", type: "func"},
      {tfName: "else_branch", name: "elseBranch", type: "func"}
    ]
  },
  {
    tfOpName: "If",
    category: "control",
    inputs: [
      {start: 0, name: "cond", type: "tensor"},
      {start: 1, end: 0, name: "args", type: "tensors"}
    ],
    attrs: [
      {tfName: "then_branch", name: "thenBranch", type: "func"},
      {tfName: "else_branch", name: "elseBranch", type: "func"}
    ]
  },
  {
    tfOpName: "StatelessWhile",
    category: "control",
    inputs: [
      {start: 0, end: 0, name: "args", type: "tensors"}
    ],
    attrs: [
      {tfName: "cond", name: "cond", type: "func"},
      {tfName: "body", name: "body", type: "func"}
    ]
  },
  {
    tfOpName: "While",
    category: "control",
    inputs: [
      {start: 0, end: 0, name: "args", type: "tensors"}
    ],
    attrs: [
      {tfName: "cond", name: "cond", type: "func"},
      {tfName: "body", name: "body", type: "func"}
    ]
  },
  {
    tfOpName: "TensorListScatter",
    category: "control",
    inputs: [
      {start: 0, name: "tensor", type: "tensor"},
      {start: 1, name: "indices", type: "number[]"},
      {start: 2, name: "elementShape", type: "shape"}
    ],
    attrs: [{tfName: "element_dtype", name: "elementDType", type: "dtype"}]
  },
  {
    tfOpName: "TensorListScatterV2",
    category: "control",
    inputs: [
      {start: 0, name: "tensor", type: "tensor"},
      {start: 1, name: "indices", type: "number[]"},
      {start: 2, name: "elementShape", type: "shape"},
      {start: 3, name: "numElements", type: "number"}
    ],
    attrs: [{tfName: "element_dtype", name: "elementDType", type: "dtype"}]
  },
  {
    tfOpName: "TensorListGather",
    category: "control",
    inputs: [
      {start: 0, name: "tensorListId", type: "tensor"},
      {start: 1, name: "indices", type: "number[]"},
      {start: 2, name: "elementShape", type: "shape"}
    ],
    attrs: [{tfName: "element_dtype", name: "elementDType", type: "dtype"}]
  },
  {
    tfOpName: "TensorListGetItem",
    category: "control",
    inputs: [
      {start: 0, name: "tensorListId", type: "tensor"},
      {start: 1, name: "index", type: "number"},
      {start: 2, name: "elementShape", type: "shape"}
    ],
    attrs: [{tfName: "element_dtype", name: "elementDType", type: "dtype"}]
  },
  {
    tfOpName: "TensorListSetItem",
    category: "control",
    inputs: [
      {start: 0, name: "tensorListId", type: "tensor"},
      {start: 1, name: "index", type: "number"},
      {start: 2, name: "tensor", type: "tensor"}
    ],
    attrs: [{tfName: "element_dtype", name: "elementDType", type: "dtype"}]
  },
  {
    tfOpName: "TensorListReserve",
    category: "control",
    inputs: [
      {start: 0, name: "elementShape", type: "shape"},
      {start: 1, name: "numElements", type: "number"}
    ],
    attrs: [{tfName: "element_dtype", name: "elementDType", type: "dtype"}]
  },
  {
    tfOpName: "TensorListFromTensor",
    category: "control",
    inputs: [
      {start: 0, name: "tensor", type: "tensor"},
      {start: 1, name: "elementShape", type: "shape"}
    ],
    attrs: [{tfName: "element_dtype", name: "elementDType", type: "dtype"}]
  },
  {
    tfOpName: "TensorListStack",
    category: "control",
    inputs: [
      {start: 0, name: "tensorListId", type: "tensor"},
      {start: 1, name: "elementShape", type: "shape"}
    ],
    attrs: [
      {tfName: "element_dtype", name: "elementDType", type: "dtype"},
      {tfName: "num_elements", name: "numElements", type: "dtype"}
    ]
  },
  {
    tfOpName: "TensorListSplit",
    category: "control",
    inputs: [
      {start: 0, name: "tensor", type: "tensor"},
      {start: 1, name: "elementShape", type: "shape"},
      {start: 2, name: "lengths", type: "number[]"}
    ],
    attrs: [{tfName: "element_dtype", name: "elementDType", type: "dtype"}]
  },
  {
    tfOpName: "TensorListConcat",
    category: "control",
    inputs: [
      {start: 0, name: "tensorListId", type: "tensor"}
    ],
    attrs: [
      {tfName: "element_shape", name: "elementShape", type: "shape"},
      {tfName: "element_dtype", name: "elementDType", type: "dtype"}
    ]
  },
  {
    tfOpName: "TensorListPopBack",
    category: "control",
    inputs: [
      {start: 0, name: "tensorListId", type: "tensor"},
      {start: 1, name: "elementShape", type: "shape"}
    ],
    attrs: [{tfName: "element_dtype", name: "elementDType", type: "dtype"}]
  },
  {
    tfOpName: "TensorListPushBack",
    category: "control",
    inputs: [
      {start: 0, name: "tensorListId", type: "tensor"},
      {start: 1, name: "tensor", type: "tensor"}
    ],
    attrs: [
      {tfName: "element_dtype", name: "elementDType", type: "dtype"}
    ]
  }
];
var control = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  json: json$2
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
const json$3 = [
  {
    tfOpName: "AvgPool",
    category: "convolution",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "strides", name: "strides", type: "number[]"},
      {tfName: "padding", name: "pad", type: "string"},
      {
        tfName: "data_format",
        name: "dataFormat",
        type: "string",
        notSupported: true
      },
      {tfName: "ksize", name: "kernelSize", type: "number[]"},
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "MaxPool",
    category: "convolution",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "strides", name: "strides", type: "number[]"},
      {tfName: "padding", name: "pad", type: "string"},
      {
        tfName: "data_format",
        name: "dataFormat",
        type: "string",
        notSupported: true
      },
      {tfName: "ksize", name: "kernelSize", type: "number[]"},
      {
        tfName: "explicit_paddings",
        name: "explicitPaddings",
        type: "number[]",
        defaultValue: [],
        notSupported: true
      },
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "MaxPoolWithArgmax",
    category: "convolution",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "strides", name: "strides", type: "number[]"},
      {tfName: "padding", name: "pad", type: "string"},
      {tfName: "ksize", name: "kernelSize", type: "number[]"},
      {
        tfName: "include_batch_in_index",
        name: "includeBatchInIndex",
        type: "bool"
      },
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "AvgPool3D",
    category: "convolution",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "strides", name: "strides", type: "number[]"},
      {tfName: "padding", name: "pad", type: "string"},
      {
        tfName: "data_format",
        name: "dataFormat",
        type: "string",
        notSupported: true
      },
      {tfName: "ksize", name: "kernelSize", type: "number[]"},
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "MaxPool3D",
    category: "convolution",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "strides", name: "strides", type: "number[]"},
      {tfName: "padding", name: "pad", type: "string"},
      {
        tfName: "data_format",
        name: "dataFormat",
        type: "string",
        notSupported: true
      },
      {tfName: "ksize", name: "kernelSize", type: "number[]"},
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Conv1D",
    category: "convolution",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "filter", type: "tensor"}
    ],
    attrs: [
      {tfName: "stride", name: "stride", type: "number"},
      {tfName: "padding", name: "pad", type: "string"},
      {
        tfName: "data_format",
        name: "dataFormat",
        type: "string",
        defaultValue: "NWC"
      },
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true},
      {
        tfName: "dilation",
        name: "dilation",
        type: "number",
        defaultValue: 1
      }
    ]
  },
  {
    tfOpName: "Conv2D",
    category: "convolution",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "filter", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true},
      {tfName: "strides", name: "strides", type: "number[]"},
      {tfName: "padding", name: "pad", type: "string"},
      {tfName: "useCudnnOnGpu", name: "useCudnnOnGpu", type: "bool"},
      {
        tfName: "data_format",
        name: "dataFormat",
        type: "string",
        defaultValue: "NHWC"
      },
      {
        tfName: "explicit_paddings",
        name: "explicitPaddings",
        type: "number[]",
        defaultValue: []
      },
      {tfName: "dilations", name: "dilations", type: "number[]"}
    ]
  },
  {
    tfOpName: "_FusedConv2D",
    category: "convolution",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "filter", type: "tensor"},
      {start: 2, end: 0, name: "args", type: "tensors"}
    ],
    attrs: [
      {tfName: "num_args", name: "numArgs", type: "number"},
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true},
      {tfName: "strides", name: "strides", type: "number[]"},
      {tfName: "padding", name: "pad", type: "string"},
      {
        tfName: "explicit_paddings",
        name: "explicitPaddings",
        type: "number[]",
        defaultValue: []
      },
      {
        tfName: "use_cudnn_on_gpu",
        name: "useCudnnOnGpu",
        type: "bool",
        defaultValue: true
      },
      {
        tfName: "data_format",
        name: "dataFormat",
        type: "string",
        defaultValue: "NHWC"
      },
      {
        tfName: "dilations",
        name: "dilations",
        type: "number[]",
        defaultValue: [1, 1, 1, 1]
      },
      {
        tfName: "fused_ops",
        name: "fusedOps",
        type: "string[]",
        defaultValue: []
      },
      {
        tfName: "epsilon",
        name: "epsilon",
        type: "number",
        defaultValue: 1e-4
      },
      {
        tfName: "leakyrelu_alpha",
        name: "leakyreluAlpha",
        type: "number"
      }
    ]
  },
  {
    tfOpName: "Conv2DBackpropInput",
    category: "convolution",
    inputs: [
      {start: 2, name: "x", type: "tensor"},
      {start: 1, name: "filter", type: "tensor"},
      {start: 0, name: "outputShape", type: "number[]"}
    ],
    attrs: [
      {tfName: "strides", name: "strides", type: "number[]"},
      {tfName: "padding", name: "pad", type: "string"},
      {
        tfName: "data_format",
        name: "dataFormat",
        type: "string",
        notSupported: true
      },
      {
        tfName: "explicit_paddings",
        name: "explicitPaddings",
        type: "number[]",
        defaultValue: []
      },
      {
        tfName: "dilations",
        name: "dilations",
        type: "number[]",
        notSupported: true
      }
    ]
  },
  {
    tfOpName: "DepthwiseConv2d",
    category: "convolution",
    inputs: [
      {start: 0, name: "input", type: "tensor"},
      {start: 1, name: "filter", type: "tensor"}
    ],
    attrs: [
      {tfName: "strides", name: "strides", type: "number[]"},
      {tfName: "padding", name: "pad", type: "string"},
      {
        tfName: "data_format",
        name: "dataFormat",
        type: "string",
        defaultValue: "NHWC"
      },
      {
        tfName: "explicit_paddings",
        name: "explicitPaddings",
        type: "number[]",
        defaultValue: []
      },
      {tfName: "dilations", name: "dilations", type: "number[]"}
    ]
  },
  {
    tfOpName: "DepthwiseConv2dNative",
    category: "convolution",
    inputs: [
      {start: 0, name: "input", type: "tensor"},
      {start: 1, name: "filter", type: "tensor"}
    ],
    attrs: [
      {tfName: "strides", name: "strides", type: "number[]"},
      {tfName: "padding", name: "pad", type: "string"},
      {
        tfName: "data_format",
        name: "dataFormat",
        type: "string",
        defaultValue: "NHWC"
      },
      {
        tfName: "explicit_paddings",
        name: "explicitPaddings",
        type: "number[]",
        defaultValue: []
      },
      {tfName: "dilations", name: "dilations", type: "number[]"}
    ]
  },
  {
    tfOpName: "FusedDepthwiseConv2dNative",
    category: "convolution",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "filter", type: "tensor"},
      {start: 2, end: 0, name: "args", type: "tensors"}
    ],
    attrs: [
      {tfName: "num_args", name: "numArgs", type: "number"},
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true},
      {tfName: "strides", name: "strides", type: "number[]"},
      {tfName: "padding", name: "pad", type: "string"},
      {
        tfName: "data_format",
        name: "dataFormat",
        type: "string",
        defaultValue: "NHWC"
      },
      {
        tfName: "dilations",
        name: "dilations",
        type: "number[]",
        defaultValue: [1, 1, 1, 1]
      },
      {
        tfName: "fused_ops",
        name: "fusedOps",
        type: "string[]",
        defaultValue: []
      },
      {
        tfName: "explicit_paddings",
        name: "explicitPaddings",
        type: "number[]",
        defaultValue: []
      }
    ]
  },
  {
    tfOpName: "Conv3D",
    category: "convolution",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "filter", type: "tensor"}
    ],
    attrs: [
      {tfName: "strides", name: "strides", type: "number[]"},
      {tfName: "padding", name: "pad", type: "string"},
      {
        tfName: "data_format",
        name: "dataFormat",
        type: "string",
        defaultValue: "NHWC"
      },
      {tfName: "dilations", name: "dilations", type: "number[]"}
    ]
  },
  {
    tfOpName: "Dilation2D",
    category: "convolution",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "filter", type: "tensor"}
    ],
    attrs: [
      {tfName: "strides", name: "strides", type: "number[]"},
      {tfName: "rates", name: "dilations", type: "number[]"},
      {tfName: "padding", name: "pad", type: "string"}
    ]
  }
];
var convolution = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  json: json$3
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
const json$4 = [
  {
    tfOpName: "Fill",
    category: "creation",
    inputs: [
      {start: 0, name: "shape", type: "number[]"},
      {start: 1, name: "value", type: "number"}
    ],
    attrs: [{tfName: "T", name: "dtype", type: "dtype"}]
  },
  {
    tfOpName: "LinSpace",
    category: "creation",
    inputs: [
      {start: 0, name: "start", type: "number"},
      {start: 1, name: "stop", type: "number"},
      {start: 2, name: "num", type: "number"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "OneHot",
    category: "creation",
    inputs: [
      {start: 0, name: "indices", type: "tensor"},
      {start: 1, name: "depth", type: "number"},
      {start: 2, name: "onValue", type: "number", defaultValue: 1},
      {start: 3, name: "offValue", type: "number", defaultValue: 0}
    ],
    attrs: [
      {
        tfName: "axis",
        name: "axis",
        type: "number",
        notSupported: true
      },
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Ones",
    category: "creation",
    inputs: [
      {start: 0, name: "shape", type: "number[]"}
    ],
    attrs: [{tfName: "T", name: "dtype", type: "dtype"}]
  },
  {
    tfOpName: "OnesLike",
    category: "creation",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [{tfName: "dtype", name: "dtype", type: "dtype"}]
  },
  {
    tfOpName: "RandomUniform",
    category: "creation",
    inputs: [
      {start: 0, name: "shape", type: "number[]"}
    ],
    attrs: [
      {
        tfName: "minval",
        name: "minval",
        type: "number",
        defaultValue: 0
      },
      {
        tfName: "maxval",
        name: "maxval",
        type: "number",
        defaultValue: 1
      },
      {tfName: "dtype", name: "dtype", type: "dtype"},
      {tfName: "seed", name: "seed", type: "number", defaultValue: 0},
      {
        tfName: "seed2",
        name: "seed2",
        type: "number",
        defaultValue: 0,
        notSupported: true
      },
      {tfName: "T", name: "T", type: "number", notSupported: true}
    ]
  },
  {
    tfOpName: "Range",
    category: "creation",
    inputs: [
      {start: 0, name: "start", type: "number"},
      {start: 1, name: "stop", type: "number"},
      {start: 2, name: "step", type: "number", defaultValue: 0}
    ],
    attrs: [{tfName: "Tidx", name: "dtype", type: "dtype"}]
  },
  {
    tfOpName: "TruncatedNormal",
    category: "creation",
    inputs: [
      {start: 0, name: "shape", type: "number[]"}
    ],
    attrs: [
      {
        tfName: "means",
        name: "mean",
        type: "number",
        defaultValue: 0
      },
      {
        tfName: "stddev",
        name: "stdDev",
        type: "number",
        defaultValue: 1
      },
      {tfName: "seed", name: "seed", type: "number"},
      {
        tfName: "seed2",
        name: "seed2",
        type: "number",
        defaultValue: 0,
        notSupported: true
      },
      {tfName: "dtype", name: "dtype", type: "dtype"},
      {tfName: "T", name: "T", type: "number", notSupported: true}
    ]
  },
  {
    tfOpName: "Zeros",
    category: "creation",
    inputs: [
      {start: 0, name: "shape", type: "number[]"}
    ],
    attrs: [{tfName: "T", name: "dtype", type: "dtype"}]
  },
  {
    tfOpName: "ZerosLike",
    category: "creation",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [{tfName: "T", name: "dtype", type: "dtype"}]
  },
  {
    tfOpName: "Multinomial",
    category: "creation",
    inputs: [
      {start: 0, name: "logits", type: "tensor"},
      {start: 1, name: "numSamples", type: "number"}
    ],
    attrs: [
      {tfName: "seed", name: "seed", type: "number"},
      {tfName: "seed2", name: "seed2", type: "number"},
      {tfName: "T", name: "dtype", type: "dtype"},
      {tfName: "output_dtype", name: "output_dtype", type: "dtype"}
    ]
  }
];
var creation = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  json: json$4
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
const json$5 = [
  {
    tfOpName: "NonMaxSuppressionV2",
    category: "dynamic",
    inputs: [
      {start: 0, name: "boxes", type: "tensor"},
      {start: 1, name: "scores", type: "tensor"},
      {start: 2, name: "maxOutputSize", type: "number"},
      {start: 3, name: "iouThreshold", type: "number"}
    ]
  },
  {
    tfOpName: "NonMaxSuppressionV3",
    category: "dynamic",
    inputs: [
      {start: 0, name: "boxes", type: "tensor"},
      {start: 1, name: "scores", type: "tensor"},
      {start: 2, name: "maxOutputSize", type: "number"},
      {start: 3, name: "iouThreshold", type: "number"},
      {start: 4, name: "scoreThreshold", type: "number"}
    ]
  },
  {
    tfOpName: "NonMaxSuppressionV4",
    category: "dynamic",
    inputs: [
      {start: 0, name: "boxes", type: "tensor"},
      {start: 1, name: "scores", type: "tensor"},
      {start: 2, name: "maxOutputSize", type: "number"},
      {start: 3, name: "iouThreshold", type: "number"},
      {start: 4, name: "scoreThreshold", type: "number"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true},
      {
        tfName: "T_threshold",
        name: "threshold",
        type: "dtype",
        notSupported: true
      },
      {
        tfName: "pad_to_max_output_size",
        name: "padToMaxOutputSize",
        type: "bool"
      }
    ]
  },
  {
    tfOpName: "NonMaxSuppressionV5",
    category: "dynamic",
    inputs: [
      {start: 0, name: "boxes", type: "tensor"},
      {start: 1, name: "scores", type: "tensor"},
      {start: 2, name: "maxOutputSize", type: "number"},
      {start: 3, name: "iouThreshold", type: "number"},
      {start: 4, name: "scoreThreshold", type: "number"},
      {start: 5, name: "softNmsSigma", type: "number"}
    ]
  },
  {
    tfOpName: "Where",
    category: "dynamic",
    inputs: [
      {start: 0, name: "condition", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "ListDiff",
    category: "dynamic",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "y", type: "tensor"}
    ],
    attrs: [{
      tfName: "T",
      name: "dtype",
      type: "dtype",
      notSupported: true
    }]
  }
];
var dynamic = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  json: json$5
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
const json$6 = [
  {
    tfOpName: "TopKV2",
    category: "evaluation",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "k", type: "number"}
    ],
    attrs: [{tfName: "sorted", name: "sorted", type: "bool"}]
  },
  {
    tfOpName: "Unique",
    category: "evaluation",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ]
  },
  {
    tfOpName: "UniqueV2",
    category: "evaluation",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "axis", type: "number"}
    ]
  }
];
var evaluation = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  json: json$6
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
const json$7 = [
  {
    tfOpName: "PlaceholderWithDefault",
    category: "graph",
    inputs: [
      {start: 0, name: "default", type: "tensor"}
    ],
    attrs: [
      {tfName: "shape", name: "shape", type: "shape"},
      {tfName: "dtype", name: "dtype", type: "dtype"}
    ]
  },
  {
    tfOpName: "Placeholder",
    category: "graph",
    attrs: [
      {tfName: "shape", name: "shape", type: "shape"},
      {tfName: "dtype", name: "dtype", type: "dtype"}
    ]
  },
  {tfOpName: "Const", category: "graph"},
  {
    tfOpName: "Identity",
    category: "graph",
    inputs: [{start: 0, name: "x", type: "tensor"}]
  },
  {
    tfOpName: "IdentityN",
    category: "graph",
    inputs: [{start: 0, end: 0, name: "x", type: "tensors"}]
  },
  {
    tfOpName: "Snapshot",
    category: "graph",
    inputs: [{start: 0, name: "x", type: "tensor"}]
  },
  {
    tfOpName: "Rank",
    category: "graph",
    inputs: [{start: 0, name: "x", type: "tensor"}]
  },
  {
    tfOpName: "Size",
    category: "graph",
    inputs: [{start: 0, name: "x", type: "tensor"}]
  },
  {
    tfOpName: "Shape",
    category: "graph",
    inputs: [{start: 0, name: "x", type: "tensor"}]
  },
  {
    tfOpName: "ShapeN",
    category: "graph",
    inputs: [{start: 0, end: 0, name: "x", type: "tensors"}]
  },
  {
    tfOpName: "Print",
    category: "graph",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "data", type: "tensors"}
    ],
    attrs: [
      {tfName: "message", name: "message", type: "string"},
      {
        tfName: "first_n",
        name: "firstN",
        type: "number",
        notSupported: true
      },
      {
        tfName: "summarize",
        name: "summarize",
        type: "number",
        defaultValue: 3
      }
    ]
  },
  {tfOpName: "NoOp", category: "graph", inputs: []},
  {
    tfOpName: "StopGradient",
    category: "graph",
    inputs: [{start: 0, name: "x", type: "tensor"}]
  },
  {
    tfOpName: "FakeQuantWithMinMaxVars",
    category: "graph",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "min", name: "min", type: "number"},
      {tfName: "max", name: "max", type: "number"}
    ]
  }
];
var graph = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  json: json$7
});
const json$8 = [
  {
    tfOpName: "HashTable",
    category: "hash_table",
    inputs: [],
    attrs: [
      {tfName: "shared_name", name: "sharedName", type: "string"},
      {
        tfName: "use_node_name_sharing",
        name: "useNodeNameSharing",
        type: "bool"
      },
      {tfName: "key_dtype", name: "keyDType", type: "dtype"},
      {tfName: "value_dtype", name: "valueDType", type: "dtype"}
    ]
  },
  {
    tfOpName: "HashTableV2",
    category: "hash_table",
    inputs: [],
    attrs: [
      {tfName: "shared_name", name: "sharedName", type: "string"},
      {
        tfName: "use_node_name_sharing",
        name: "useNodeNameSharing",
        type: "bool"
      },
      {tfName: "key_dtype", name: "keyDType", type: "dtype"},
      {tfName: "value_dtype", name: "valueDType", type: "dtype"}
    ]
  },
  {
    tfOpName: "LookupTableImport",
    category: "hash_table",
    inputs: [
      {start: 0, name: "tableHandle", type: "tensor"},
      {start: 1, name: "keys", type: "tensor"},
      {start: 2, name: "values", type: "tensor"}
    ],
    attrs: [
      {tfName: "Tin", name: "tIn", type: "dtype", notSupported: true},
      {
        tfName: "Tout",
        name: "tOut",
        type: "dtype",
        notSupported: true
      }
    ]
  },
  {
    tfOpName: "LookupTableImportV2",
    category: "hash_table",
    inputs: [
      {start: 0, name: "tableHandle", type: "tensor"},
      {start: 1, name: "keys", type: "tensor"},
      {start: 2, name: "values", type: "tensor"}
    ],
    attrs: [
      {tfName: "Tin", name: "tIn", type: "dtype", notSupported: true},
      {
        tfName: "Tout",
        name: "tOut",
        type: "dtype",
        notSupported: true
      }
    ]
  },
  {
    tfOpName: "LookupTableFind",
    category: "hash_table",
    inputs: [
      {start: 0, name: "tableHandle", type: "tensor"},
      {start: 1, name: "keys", type: "tensor"},
      {start: 2, name: "defaultValue", type: "tensor"}
    ],
    attrs: [
      {tfName: "Tin", name: "tIn", type: "dtype", notSupported: true},
      {
        tfName: "Tout",
        name: "tOut",
        type: "dtype",
        notSupported: true
      }
    ]
  },
  {
    tfOpName: "LookupTableFindV2",
    category: "hash_table",
    inputs: [
      {start: 0, name: "tableHandle", type: "tensor"},
      {start: 1, name: "keys", type: "tensor"},
      {start: 2, name: "defaultValue", type: "tensor"}
    ],
    attrs: [
      {tfName: "Tin", name: "tIn", type: "dtype", notSupported: true},
      {
        tfName: "Tout",
        name: "tOut",
        type: "dtype",
        notSupported: true
      }
    ]
  },
  {
    tfOpName: "LookupTableSize",
    category: "hash_table",
    inputs: [
      {start: 0, name: "tableHandle", type: "tensor"}
    ]
  },
  {
    tfOpName: "LookupTableSizeV2",
    category: "hash_table",
    inputs: [
      {start: 0, name: "tableHandle", type: "tensor"}
    ]
  }
];
var hashTable = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  json: json$8
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
const json$9 = [
  {
    tfOpName: "ResizeBilinear",
    category: "image",
    inputs: [
      {start: 0, name: "images", type: "tensor"},
      {start: 1, name: "size", type: "number[]"}
    ],
    attrs: [
      {tfName: "align_corners", name: "alignCorners", type: "bool"},
      {
        tfName: "half_pixel_centers",
        name: "halfPixelCenters",
        type: "bool"
      },
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "ResizeNearestNeighbor",
    category: "image",
    inputs: [
      {start: 0, name: "images", type: "tensor"},
      {start: 1, name: "size", type: "number[]"}
    ],
    attrs: [
      {tfName: "align_corners", name: "alignCorners", type: "bool"},
      {
        tfName: "half_pixel_centers",
        name: "halfPixelCenters",
        type: "bool"
      },
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "CropAndResize",
    category: "image",
    inputs: [
      {start: 0, name: "image", type: "tensor"},
      {start: 1, name: "boxes", type: "tensor"},
      {start: 2, name: "boxInd", type: "tensor"},
      {start: 3, name: "cropSize", type: "number[]"}
    ],
    attrs: [
      {tfName: "method", name: "method", type: "string"},
      {
        tfName: "extrapolation_value",
        name: "extrapolationValue",
        type: "number"
      }
    ]
  }
];
var image = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  json: json$9
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
const json$a = [
  {
    tfOpName: "Equal",
    category: "logical",
    inputs: [
      {start: 0, name: "a", type: "tensor"},
      {start: 1, name: "b", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "NotEqual",
    category: "logical",
    inputs: [
      {start: 0, name: "a", type: "tensor"},
      {start: 1, name: "b", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Greater",
    category: "logical",
    inputs: [
      {start: 0, name: "a", type: "tensor"},
      {start: 1, name: "b", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "GreaterEqual",
    category: "logical",
    inputs: [
      {start: 0, name: "a", type: "tensor"},
      {start: 1, name: "b", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Less",
    category: "logical",
    inputs: [
      {start: 0, name: "a", type: "tensor"},
      {start: 1, name: "b", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "LessEqual",
    category: "logical",
    inputs: [
      {start: 0, name: "a", type: "tensor"},
      {start: 1, name: "b", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "LogicalAnd",
    category: "logical",
    inputs: [
      {start: 0, name: "a", type: "tensor"},
      {start: 1, name: "b", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "LogicalNot",
    category: "logical",
    inputs: [
      {start: 0, name: "a", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "LogicalOr",
    category: "logical",
    inputs: [
      {start: 0, name: "a", type: "tensor"},
      {start: 1, name: "b", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Select",
    category: "logical",
    inputs: [
      {start: 0, name: "condition", type: "tensor"},
      {start: 1, name: "a", type: "tensor"},
      {start: 2, name: "b", type: "tensor"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "SelectV2",
    category: "logical",
    inputs: [
      {start: 0, name: "condition", type: "tensor"},
      {start: 1, name: "a", type: "tensor"},
      {start: 2, name: "b", type: "tensor"}
    ],
    attrs: [{
      tfName: "T",
      name: "dtype",
      type: "dtype",
      notSupported: true
    }]
  }
];
var logical = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  json: json$a
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
const json$b = [
  {
    tfOpName: "_FusedMatMul",
    category: "matrices",
    inputs: [
      {start: 0, name: "a", type: "tensor"},
      {start: 1, name: "b", type: "tensor"},
      {start: 2, end: 0, name: "args", type: "tensors"}
    ],
    attrs: [
      {tfName: "num_args", name: "numArgs", type: "number"},
      {
        tfName: "fused_ops",
        name: "fusedOps",
        type: "string[]",
        defaultValue: []
      },
      {
        tfName: "epsilon",
        name: "epsilon",
        type: "number",
        defaultValue: 1e-4
      },
      {
        tfName: "transpose_a",
        name: "transposeA",
        type: "bool",
        defaultValue: false
      },
      {
        tfName: "transpose_b",
        name: "transposeB",
        type: "bool",
        defaultValue: false
      },
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "MatMul",
    category: "matrices",
    inputs: [
      {start: 0, name: "a", type: "tensor"},
      {start: 1, name: "b", type: "tensor"}
    ],
    attrs: [
      {
        tfName: "transpose_a",
        name: "transposeA",
        type: "bool",
        defaultValue: false
      },
      {
        tfName: "transpose_b",
        name: "transposeB",
        type: "bool",
        defaultValue: false
      },
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "BatchMatMul",
    category: "matrices",
    inputs: [
      {start: 0, name: "a", type: "tensor"},
      {start: 1, name: "b", type: "tensor"}
    ],
    attrs: [
      {
        tfName: "adj_x",
        name: "transposeA",
        type: "bool",
        defaultValue: false
      },
      {
        tfName: "adj_y",
        name: "transposeB",
        type: "bool",
        defaultValue: false
      },
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "BatchMatMulV2",
    category: "matrices",
    inputs: [
      {start: 0, name: "a", type: "tensor"},
      {start: 1, name: "b", type: "tensor"}
    ],
    attrs: [
      {
        tfName: "adj_x",
        name: "transposeA",
        type: "bool",
        defaultValue: false
      },
      {
        tfName: "adj_y",
        name: "transposeB",
        type: "bool",
        defaultValue: false
      },
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Transpose",
    category: "matrices",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "perm", type: "number[]"}
    ],
    attrs: [
      {tfName: "T", name: "dtype", type: "dtype", notSupported: true}
    ]
  },
  {
    tfOpName: "Einsum",
    category: "matrices",
    inputs: [{start: 0, end: 0, name: "tensors", type: "tensors"}],
    attrs: [
      {tfName: "equation", name: "equation", type: "string"},
      {tfName: "N", name: "n", type: "number", defaultValue: 2},
      {tfName: "T", name: "dtype", type: "dtype"}
    ]
  }
];
var matrices = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  json: json$b
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
const json$c = [
  {
    tfOpName: "FusedBatchNorm",
    category: "normalization",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "scale", type: "tensor"},
      {start: 2, name: "offset", type: "tensor"},
      {start: 3, name: "mean", type: "tensor"},
      {start: 4, name: "variance", type: "tensor"}
    ],
    attrs: [
      {
        tfName: "epsilon",
        name: "epsilon",
        type: "number",
        defaultValue: 1e-3
      },
      {
        tfName: "data_format",
        name: "dataFormat",
        type: "string",
        notSupported: true
      }
    ]
  },
  {
    tfOpName: "FusedBatchNormV2",
    category: "normalization",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "scale", type: "tensor"},
      {start: 2, name: "offset", type: "tensor"},
      {start: 3, name: "mean", type: "tensor"},
      {start: 4, name: "variance", type: "tensor"}
    ],
    attrs: [
      {
        tfName: "epsilon",
        name: "epsilon",
        type: "number",
        defaultValue: 1e-3
      },
      {
        tfName: "data_format",
        name: "dataFormat",
        type: "string",
        notSupported: true
      }
    ]
  },
  {
    tfOpName: "FusedBatchNormV3",
    category: "normalization",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "scale", type: "tensor"},
      {start: 2, name: "offset", type: "tensor"},
      {start: 3, name: "mean", type: "tensor"},
      {start: 4, name: "variance", type: "tensor"}
    ],
    attrs: [
      {
        tfName: "epsilon",
        name: "epsilon",
        type: "number",
        defaultValue: 1e-3
      },
      {
        tfName: "data_format",
        name: "dataFormat",
        type: "string",
        notSupported: true
      }
    ]
  },
  {
    tfOpName: "LRN",
    category: "normalization",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {
        tfName: "depth_radius",
        name: "radius",
        type: "number",
        defaultValue: 5
      },
      {tfName: "bias", name: "bias", type: "number", defaultValue: 1},
      {
        tfName: "alpha",
        name: "alpha",
        type: "number",
        defaultValue: 1
      },
      {
        tfName: "beta",
        name: "beta",
        type: "number",
        defaultValue: 0.5
      }
    ]
  },
  {
    tfOpName: "Softmax",
    category: "normalization",
    inputs: [{start: 0, name: "x", type: "tensor"}]
  },
  {
    tfOpName: "LogSoftmax",
    category: "normalization",
    inputs: [{start: 0, name: "x", type: "tensor"}]
  },
  {
    tfOpName: "SparseToDense",
    category: "normalization",
    inputs: [
      {start: 0, name: "sparseIndices", type: "tensor"},
      {start: 1, name: "outputShape", type: "number[]"},
      {start: 2, name: "sparseValues", type: "tensor"},
      {start: 3, name: "defaultValue", type: "tensor"}
    ],
    attrs: [{
      tfName: "validate_indices",
      name: "validateIndices",
      type: "bool",
      defaultValue: true,
      notSupported: true
    }]
  }
];
var normalization = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  json: json$c
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
const json$d = [
  {
    tfOpName: "Bincount",
    category: "reduction",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "size", type: "number"},
      {start: 2, name: "weights", type: "tensor"}
    ]
  },
  {
    tfOpName: "DenseBincount",
    category: "reduction",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "size", type: "number"},
      {start: 2, name: "weights", type: "tensor"}
    ],
    attrs: [{tfName: "binary_output", name: "binaryOutput", type: "bool"}]
  },
  {
    tfOpName: "Max",
    category: "reduction",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "axis", type: "number[]"}
    ],
    attrs: [{tfName: "keep_dims", name: "keepDims", type: "bool"}]
  },
  {
    tfOpName: "Mean",
    category: "reduction",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "axis", type: "number[]"}
    ],
    attrs: [{tfName: "keep_dims", name: "keepDims", type: "bool"}]
  },
  {
    tfOpName: "Min",
    category: "reduction",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "axis", type: "number[]"}
    ],
    attrs: [{tfName: "keep_dims", name: "keepDims", type: "bool"}]
  },
  {
    tfOpName: "Sum",
    category: "reduction",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "axis", type: "number[]"}
    ],
    attrs: [{tfName: "keep_dims", name: "keepDims", type: "bool"}]
  },
  {
    tfOpName: "All",
    category: "reduction",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "axis", type: "number[]"}
    ],
    attrs: [{tfName: "keep_dims", name: "keepDims", type: "bool"}]
  },
  {
    tfOpName: "Any",
    category: "reduction",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "axis", type: "number[]"}
    ],
    attrs: [{tfName: "keep_dims", name: "keepDims", type: "bool"}]
  },
  {
    tfOpName: "ArgMax",
    category: "reduction",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "axis", type: "number"}
    ]
  },
  {
    tfOpName: "ArgMin",
    category: "reduction",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "axis", type: "number"}
    ]
  },
  {
    tfOpName: "Prod",
    category: "reduction",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "axis", type: "number[]"}
    ],
    attrs: [{tfName: "keep_dims", name: "keepDims", type: "bool"}]
  },
  {
    tfOpName: "Cumsum",
    category: "reduction",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "axis", type: "number"}
    ],
    attrs: [
      {tfName: "exclusive", name: "exclusive", type: "bool"},
      {tfName: "reverse", name: "reverse", type: "bool"}
    ]
  }
];
var reduction = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  json: json$d
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
const json$e = [
  {
    tfOpName: "ConcatV2",
    category: "slice_join",
    inputs: [
      {start: 0, end: -1, name: "tensors", type: "tensors"},
      {start: -1, name: "axis", type: "number"}
    ],
    attrs: [{tfName: "N", name: "n", type: "number", defaultValue: 2}]
  },
  {
    tfOpName: "Concat",
    category: "slice_join",
    inputs: [
      {start: 1, end: 0, name: "tensors", type: "tensors"},
      {start: 0, name: "axis", type: "number"}
    ],
    attrs: [{tfName: "N", name: "n", type: "number", defaultValue: 2}]
  },
  {
    tfOpName: "GatherV2",
    category: "slice_join",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "indices", type: "tensor"},
      {start: 2, name: "axis", type: "number", defaultValue: 0}
    ],
    attrs: [{
      tfName: "batch_dims",
      name: "batchDims",
      type: "number",
      defaultValue: 0
    }]
  },
  {
    tfOpName: "Gather",
    category: "slice_join",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "indices", type: "tensor"}
    ],
    attrs: [{
      tfName: "validate_indices",
      name: "validateIndices",
      type: "bool",
      notSupported: true
    }]
  },
  {
    tfOpName: "Reverse",
    category: "slice_join",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "dims", type: "bool[]"}
    ]
  },
  {
    tfOpName: "ReverseV2",
    category: "slice_join",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "axis", type: "number[]"}
    ]
  },
  {
    tfOpName: "Slice",
    category: "slice_join",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "begin", type: "number[]"},
      {start: 2, name: "size", type: "number[]"}
    ]
  },
  {
    tfOpName: "StridedSlice",
    category: "slice_join",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "begin", type: "number[]"},
      {start: 2, name: "end", type: "number[]"},
      {start: 3, name: "strides", type: "number[]"}
    ],
    attrs: [
      {
        tfName: "begin_mask",
        name: "beginMask",
        type: "number",
        defaultValue: 0
      },
      {
        tfName: "end_mask",
        name: "endMask",
        type: "number",
        defaultValue: 0
      },
      {
        tfName: "new_axis_mask",
        name: "newAxisMask",
        type: "number",
        defaultValue: 0
      },
      {
        tfName: "ellipsis_mask",
        name: "ellipsisMask",
        type: "number",
        defaultValue: 0
      },
      {
        tfName: "shrink_axis_mask",
        name: "shrinkAxisMask",
        type: "number",
        defaultValue: 0
      }
    ]
  },
  {
    tfOpName: "Pack",
    category: "slice_join",
    inputs: [
      {start: 0, end: 0, name: "tensors", type: "tensors"}
    ],
    attrs: [
      {tfName: "axis", name: "axis", type: "number", defaultValue: 0}
    ]
  },
  {
    tfOpName: "Unpack",
    category: "slice_join",
    inputs: [
      {start: 0, name: "tensor", type: "tensor"}
    ],
    attrs: [
      {tfName: "axis", name: "axis", type: "number", defaultValue: 0},
      {
        tfName: "num",
        name: "num",
        type: "number",
        defaultValue: 0,
        notSupported: true
      }
    ]
  },
  {
    tfOpName: "Tile",
    category: "slice_join",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "reps", type: "number[]"}
    ]
  },
  {
    tfOpName: "Split",
    category: "slice_join",
    inputs: [
      {start: 0, name: "axis", type: "number", defaultValue: 0},
      {start: 1, name: "x", type: "tensor"}
    ],
    attrs: [{
      tfName: "num_split",
      name: "numOrSizeSplits",
      type: "number",
      defaultValue: 1
    }]
  },
  {
    tfOpName: "SplitV",
    category: "slice_join",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "numOrSizeSplits", type: "number[]"},
      {start: 2, name: "axis", type: "number", defaultValue: 0}
    ]
  },
  {
    tfOpName: "ScatterNd",
    category: "slice_join",
    inputs: [
      {start: 0, name: "indices", type: "tensor"},
      {start: 1, name: "values", type: "tensor"},
      {start: 2, name: "shape", type: "number[]"}
    ]
  },
  {
    tfOpName: "GatherNd",
    category: "slice_join",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "indices", type: "tensor"}
    ]
  },
  {
    tfOpName: "SparseToDense",
    category: "slice_join",
    inputs: [
      {start: 0, name: "sparseIndices", type: "tensor"},
      {start: 1, name: "outputShape", type: "number[]"},
      {start: 2, name: "sparseValues", type: "tensor"},
      {start: 3, name: "defaultValue", type: "tensor"}
    ],
    attrs: [{
      tfName: "validate_indices",
      name: "validateIndices",
      type: "bool",
      defaultValue: false,
      notSupported: true
    }]
  }
];
var sliceJoin = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  json: json$e
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
const json$f = [
  {
    tfOpName: "FFT",
    category: "spectral",
    inputs: [{start: 0, name: "x", type: "tensor"}]
  },
  {
    tfOpName: "IFFT",
    category: "spectral",
    inputs: [{start: 0, name: "x", type: "tensor"}]
  },
  {
    tfOpName: "RFFT",
    category: "spectral",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {
        start: 1,
        name: "fft_length",
        type: "number",
        notSupported: true
      }
    ]
  },
  {
    tfOpName: "IRFFT",
    category: "spectral",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {
        start: 1,
        name: "fft_length",
        type: "number",
        notSupported: true
      }
    ]
  }
];
var spectral = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  json: json$f
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
const json$g = [
  {
    tfOpName: "Cast",
    category: "transformation",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {
        tfName: "SrcT",
        name: "sdtype",
        type: "dtype",
        notSupported: true
      },
      {tfName: "DstT", name: "dtype", type: "dtype"}
    ]
  },
  {
    tfOpName: "ExpandDims",
    category: "transformation",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "axis", type: "number"}
    ]
  },
  {
    tfOpName: "MirrorPad",
    category: "transformation",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "padding", type: "number[]"}
    ],
    attrs: [{tfName: "mode", name: "mode", type: "string"}]
  },
  {
    tfOpName: "Pad",
    category: "transformation",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "padding", type: "number[]"}
    ],
    attrs: [{
      tfName: "constant_value",
      name: "constantValue",
      type: "number",
      defaultValue: 0
    }]
  },
  {
    tfOpName: "PadV2",
    category: "transformation",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "padding", type: "number[]"},
      {
        start: 2,
        name: "constantValue",
        type: "number",
        defaultValue: 0
      }
    ]
  },
  {
    tfOpName: "Reshape",
    category: "transformation",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "shape", type: "number[]"}
    ]
  },
  {
    tfOpName: "Squeeze",
    category: "transformation",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [{
      tfName: "axis",
      tfDeprecatedName: "squeeze_dims",
      name: "axis",
      type: "number[]"
    }]
  },
  {
    tfOpName: "SpaceToBatchND",
    category: "transformation",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "blockShape", type: "number[]"},
      {start: 2, name: "paddings", type: "number[]"}
    ]
  },
  {
    tfOpName: "BatchToSpaceND",
    category: "transformation",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "blockShape", type: "number[]"},
      {start: 2, name: "crops", type: "number[]"}
    ]
  },
  {
    tfOpName: "DepthToSpace",
    category: "transformation",
    inputs: [
      {start: 0, name: "x", type: "tensor"}
    ],
    attrs: [
      {tfName: "block_size", name: "blockSize", type: "number"},
      {tfName: "data_format", name: "dataFormat", type: "string"}
    ]
  },
  {
    tfOpName: "BroadcastTo",
    category: "transformation",
    inputs: [
      {start: 0, name: "x", type: "tensor"},
      {start: 1, name: "shape", type: "number[]"}
    ],
    attrs: []
  }
];
var transformation = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  json: json$g
});
class OperationMapper {
  static get Instance() {
    return this._instance || (this._instance = new this());
  }
  constructor() {
    const ops = [
      arithmetic,
      basicMath,
      control,
      convolution,
      creation,
      dynamic,
      evaluation,
      logical,
      image,
      graph,
      matrices,
      normalization,
      reduction,
      sliceJoin,
      spectral,
      transformation,
      hashTable
    ];
    const mappersJson = [].concat(...ops.map((op) => op.json));
    this.opMappers = mappersJson.reduce((map, mapper) => {
      map[mapper.tfOpName] = mapper;
      return map;
    }, {});
  }
  transformGraph(graph2, signature = {}) {
    const tfNodes = graph2.node;
    const placeholders = [];
    const weights = [];
    const initNodes = [];
    const nodes = tfNodes.reduce((map, node) => {
      map[node.name] = this.mapNode(node);
      if (node.op.startsWith("Placeholder")) {
        placeholders.push(map[node.name]);
      } else if (node.op === "Const") {
        weights.push(map[node.name]);
      } else if (node.input == null || node.input.length === 0) {
        initNodes.push(map[node.name]);
      }
      return map;
    }, {});
    let inputs = [];
    const outputs = [];
    let inputNodeNameToKey = {};
    let outputNodeNameToKey = {};
    if (signature != null) {
      inputNodeNameToKey = this.mapSignatureEntries(signature.inputs);
      outputNodeNameToKey = this.mapSignatureEntries(signature.outputs);
    }
    const allNodes = Object.keys(nodes);
    allNodes.forEach((key) => {
      const node = nodes[key];
      node.inputNames.forEach((name) => {
        const [nodeName] = getNodeNameAndIndex(name);
        node.inputs.push(nodes[nodeName]);
        nodes[nodeName].children.push(node);
      });
    });
    if (Object.keys(outputNodeNameToKey).length === 0) {
      allNodes.forEach((key) => {
        const node = nodes[key];
        if (node.children.length === 0) {
          outputs.push(node);
        }
      });
    } else {
      Object.keys(outputNodeNameToKey).forEach((name) => {
        const [nodeName] = getNodeNameAndIndex(name);
        const node = nodes[nodeName];
        if (node != null) {
          node.signatureKey = outputNodeNameToKey[name];
          outputs.push(node);
        }
      });
    }
    if (Object.keys(inputNodeNameToKey).length > 0) {
      Object.keys(inputNodeNameToKey).forEach((name) => {
        const [nodeName] = getNodeNameAndIndex(name);
        const node = nodes[nodeName];
        if (node) {
          node.signatureKey = inputNodeNameToKey[name];
          inputs.push(node);
        }
      });
    } else {
      inputs = placeholders;
    }
    let functions = {};
    if (graph2.library != null && graph2.library.function != null) {
      functions = graph2.library.function.reduce((functions2, func) => {
        functions2[func.signature.name] = this.mapFunction(func);
        return functions2;
      }, {});
    }
    const result = {nodes, inputs, outputs, weights, placeholders, signature, functions};
    if (initNodes.length > 0) {
      result.initNodes = initNodes;
    }
    return result;
  }
  mapSignatureEntries(entries) {
    return Object.keys(entries || {}).reduce((prev, curr) => {
      prev[entries[curr].name] = curr;
      return prev;
    }, {});
  }
  mapNode(node) {
    const mapper = getRegisteredOp(node.op) || this.opMappers[node.op] || {};
    if (node.attr == null) {
      node.attr = {};
    }
    const newNode = {
      name: node.name,
      op: node.op,
      category: mapper.category,
      inputNames: (node.input || []).map((input) => input.startsWith("^") ? input.substr(1) : input),
      inputs: [],
      children: [],
      inputParams: {},
      attrParams: {},
      rawAttrs: node.attr
    };
    if (mapper.inputs != null) {
      newNode.inputParams = mapper.inputs.reduce((map, param) => {
        map[param.name] = {
          type: param.type,
          inputIndexStart: param.start,
          inputIndexEnd: param.end
        };
        return map;
      }, {});
    }
    if (mapper.attrs != null) {
      newNode.attrParams = mapper.attrs.reduce((map, param) => {
        const type = param.type;
        let value = void 0;
        switch (param.type) {
          case "string":
            value = getStringParam(node.attr, param.tfName, param.defaultValue);
            if (value === void 0 && !!param.tfDeprecatedName) {
              value = getStringParam(node.attr, param.tfDeprecatedName, param.defaultValue);
            }
            break;
          case "string[]":
            value = getStringArrayParam(node.attr, param.tfName, param.defaultValue);
            if (value === void 0 && !!param.tfDeprecatedName) {
              value = getStringArrayParam(node.attr, param.tfDeprecatedName, param.defaultValue);
            }
            break;
          case "number":
            value = getNumberParam(node.attr, param.tfName, param.defaultValue || 0);
            if (value === void 0 && !!param.tfDeprecatedName) {
              value = getNumberParam(node.attr, param.tfDeprecatedName, param.defaultValue);
            }
            break;
          case "number[]":
            value = getNumericArrayParam(node.attr, param.tfName, param.defaultValue);
            if (value === void 0 && !!param.tfDeprecatedName) {
              value = getNumericArrayParam(node.attr, param.tfDeprecatedName, param.defaultValue);
            }
            break;
          case "bool":
            value = getBoolParam(node.attr, param.tfName, param.defaultValue);
            if (value === void 0 && !!param.tfDeprecatedName) {
              value = getBoolParam(node.attr, param.tfDeprecatedName, param.defaultValue);
            }
            break;
          case "bool[]":
            value = getBoolArrayParam(node.attr, param.tfName, param.defaultValue);
            if (value === void 0 && !!param.tfDeprecatedName) {
              value = getBoolArrayParam(node.attr, param.tfDeprecatedName, param.defaultValue);
            }
            break;
          case "shape":
            value = getTensorShapeParam(node.attr, param.tfName, param.defaultValue);
            if (value === void 0 && !!param.tfDeprecatedName) {
              value = getTensorShapeParam(node.attr, param.tfDeprecatedName, param.defaultValue);
            }
            break;
          case "shape[]":
            value = getTensorShapeArrayParam(node.attr, param.tfName, param.defaultValue);
            if (value === void 0 && !!param.tfDeprecatedName) {
              value = getTensorShapeArrayParam(node.attr, param.tfDeprecatedName, param.defaultValue);
            }
            break;
          case "dtype":
            value = getDtypeParam(node.attr, param.tfName, param.defaultValue);
            if (value === void 0 && !!param.tfDeprecatedName) {
              value = getDtypeParam(node.attr, param.tfDeprecatedName, param.defaultValue);
            }
            break;
          case "dtype[]":
            value = getDtypeArrayParam(node.attr, param.tfName, param.defaultValue);
            if (value === void 0 && !!param.tfDeprecatedName) {
              value = getDtypeArrayParam(node.attr, param.tfDeprecatedName, param.defaultValue);
            }
            break;
          case "func":
            value = getFuncParam(node.attr, param.tfName, param.defaultValue);
            if (value === void 0 && !!param.tfDeprecatedName) {
              value = getFuncParam(node.attr, param.tfDeprecatedName, param.defaultValue);
            }
            break;
          case "tensor":
          case "tensors":
            break;
          default:
            throw new Error(`Unsupported param type: ${param.type} for op: ${node.op}`);
        }
        map[param.name] = {value, type};
        return map;
      }, {});
    }
    return newNode;
  }
  mapFunction(functionDef) {
    const tfNodes = functionDef.nodeDef;
    const placeholders = [];
    const weights = [];
    let nodes = {};
    if (tfNodes != null) {
      nodes = tfNodes.reduce((map, node) => {
        map[node.name] = this.mapNode(node);
        if (node.op === "Const") {
          weights.push(map[node.name]);
        }
        return map;
      }, {});
    }
    const inputs = [];
    const outputs = [];
    functionDef.signature.inputArg.forEach((arg) => {
      const [nodeName] = getNodeNameAndIndex(arg.name);
      const node = {
        name: nodeName,
        op: "Placeholder",
        inputs: [],
        inputNames: [],
        category: "graph",
        inputParams: {},
        attrParams: {dtype: {value: parseDtypeParam(arg.type), type: "dtype"}},
        children: []
      };
      node.signatureKey = arg.name;
      inputs.push(node);
      nodes[nodeName] = node;
    });
    const allNodes = Object.keys(nodes);
    allNodes.forEach((key) => {
      const node = nodes[key];
      node.inputNames.forEach((name) => {
        const [nodeName] = getNodeNameAndIndex(name);
        node.inputs.push(nodes[nodeName]);
        nodes[nodeName].children.push(node);
      });
    });
    const returnNodeMap = functionDef.ret;
    functionDef.signature.outputArg.forEach((output) => {
      const [nodeName, index] = getNodeNameAndIndex(returnNodeMap[output.name]);
      const node = nodes[nodeName];
      if (node != null) {
        node.defaultOutput = index;
        outputs.push(node);
      }
    });
    const signature = this.mapArgsToSignature(functionDef);
    return {nodes, inputs, outputs, weights, placeholders, signature};
  }
  mapArgsToSignature(functionDef) {
    return {
      methodName: functionDef.signature.name,
      inputs: functionDef.signature.inputArg.reduce((map, arg) => {
        map[arg.name] = this.mapArgToTensorInfo(arg);
        return map;
      }, {}),
      outputs: functionDef.signature.outputArg.reduce((map, arg) => {
        map[arg.name] = this.mapArgToTensorInfo(arg, functionDef.ret);
        return map;
      }, {})
    };
  }
  mapArgToTensorInfo(arg, nameMap) {
    let name = arg.name;
    if (nameMap != null) {
      name = nameMap[name];
    }
    return {name, dtype: arg.type};
  }
}
function decodeBase64(text) {
  const global = env().global;
  if (typeof global.atob !== "undefined") {
    return global.atob(text);
  } else if (typeof Buffer !== "undefined") {
    return new Buffer(text, "base64").toString();
  } else {
    throw new Error("Unable to decode base64 in this environment. Missing built-in atob() or Buffer()");
  }
}
function parseStringParam(s, keepCase) {
  const value = Array.isArray(s) ? String.fromCharCode.apply(null, s) : decodeBase64(s);
  return keepCase ? value : value.toLowerCase();
}
function getStringParam(attrs, name, def, keepCase = false) {
  const param = attrs[name];
  if (param != null) {
    return parseStringParam(param.s, keepCase);
  }
  return def;
}
function getBoolParam(attrs, name, def) {
  const param = attrs[name];
  return param ? param.b : def;
}
function getNumberParam(attrs, name, def) {
  const param = attrs[name] || {};
  const value = param["i"] != null ? param["i"] : param["f"] != null ? param["f"] : def;
  return typeof value === "number" ? value : parseInt(value, 10);
}
function parseDtypeParam(value) {
  if (typeof value === "string") {
    value = DataType[value];
  }
  switch (value) {
    case DataType.DT_FLOAT:
      return "float32";
    case DataType.DT_INT32:
    case DataType.DT_INT64:
    case DataType.DT_INT8:
    case DataType.DT_UINT8:
      return "int32";
    case DataType.DT_BOOL:
      return "bool";
    case DataType.DT_DOUBLE:
      return "float32";
    case DataType.DT_STRING:
      return "string";
    default:
      return null;
  }
}
function getFuncParam(attrs, name, def) {
  const param = attrs[name];
  if (param && param.func) {
    return param.func.name;
  }
  return def;
}
function getDtypeParam(attrs, name, def) {
  const param = attrs[name];
  if (param && param.type) {
    return parseDtypeParam(param.type);
  }
  return def;
}
function getDtypeArrayParam(attrs, name, def) {
  const param = attrs[name];
  if (param && param.list && param.list.type) {
    return param.list.type.map((v) => parseDtypeParam(v));
  }
  return def;
}
function parseTensorShapeParam(shape) {
  if (shape.unknownRank) {
    return void 0;
  }
  if (shape.dim != null) {
    return shape.dim.map((dim) => typeof dim.size === "number" ? dim.size : parseInt(dim.size, 10));
  }
  return [];
}
function getTensorShapeParam(attrs, name, def) {
  const param = attrs[name];
  if (param && param.shape) {
    return parseTensorShapeParam(param.shape);
  }
  return def;
}
function getNumericArrayParam(attrs, name, def) {
  const param = attrs[name];
  if (param) {
    return ((param.list.f && param.list.f.length ? param.list.f : param.list.i) || []).map((v) => typeof v === "number" ? v : parseInt(v, 10));
  }
  return def;
}
function getStringArrayParam(attrs, name, def, keepCase = false) {
  const param = attrs[name];
  if (param && param.list && param.list.s) {
    return param.list.s.map((v) => {
      return parseStringParam(v, keepCase);
    });
  }
  return def;
}
function getTensorShapeArrayParam(attrs, name, def) {
  const param = attrs[name];
  if (param && param.list && param.list.shape) {
    return param.list.shape.map((v) => {
      return parseTensorShapeParam(v);
    });
  }
  return def;
}
function getBoolArrayParam(attrs, name, def) {
  const param = attrs[name];
  if (param && param.list && param.list.b) {
    return param.list.b;
  }
  return def;
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
class NodeValueImpl {
  constructor(node, tensorMap, context) {
    this.node = node;
    this.tensorMap = tensorMap;
    this.context = context;
    this.inputs = [];
    this.attrs = {};
    this.inputs = node.inputNames.map((name) => this.getInput(name));
    if (node.rawAttrs != null) {
      this.attrs = Object.keys(node.rawAttrs).reduce((attrs, key) => {
        attrs[key] = this.getAttr(key);
        return attrs;
      }, {});
    }
  }
  getInput(name) {
    return getTensor(name, this.tensorMap, this.context);
  }
  getAttr(name, defaultValue) {
    const value = this.node.rawAttrs[name];
    if (value.tensor != null) {
      return getTensor(name, this.tensorMap, this.context);
    }
    if (value.i != null || value.f != null) {
      return getNumberParam(this.node.rawAttrs, name, defaultValue);
    }
    if (value.s != null) {
      return getStringParam(this.node.rawAttrs, name, defaultValue);
    }
    if (value.b != null) {
      return getBoolParam(this.node.rawAttrs, name, defaultValue);
    }
    if (value.shape != null) {
      return getTensorShapeParam(this.node.rawAttrs, name, defaultValue);
    }
    if (value.type != null) {
      return getDtypeParam(this.node.rawAttrs, name, defaultValue);
    }
    if (value.list != null) {
      if (value.list.i != null || value.list.f != null) {
        return getNumericArrayParam(this.node.rawAttrs, name, defaultValue);
      }
      if (value.list.s != null) {
        return getStringArrayParam(this.node.rawAttrs, name, defaultValue);
      }
      if (value.list.shape != null) {
        return getTensorShapeArrayParam(this.node.rawAttrs, name, defaultValue);
      }
      if (value.list.b != null) {
        return getBoolArrayParam(this.node.rawAttrs, name, defaultValue);
      }
      if (value.list.type != null) {
        return getDtypeArrayParam(this.node.rawAttrs, name, defaultValue);
      }
    }
    return defaultValue;
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
const executeOp = (node, tensorMap, context) => {
  switch (node.op) {
    case "BiasAdd":
    case "AddV2":
    case "Add": {
      return [add(getParamValue("a", node, tensorMap, context), getParamValue("b", node, tensorMap, context))];
    }
    case "AddN": {
      return [addN(getParamValue("tensors", node, tensorMap, context))];
    }
    case "FloorMod":
    case "Mod":
      return [mod(getParamValue("a", node, tensorMap, context), getParamValue("b", node, tensorMap, context))];
    case "Mul":
      return [mul(getParamValue("a", node, tensorMap, context), getParamValue("b", node, tensorMap, context))];
    case "RealDiv":
    case "Div": {
      return [div(getParamValue("a", node, tensorMap, context), getParamValue("b", node, tensorMap, context))];
    }
    case "DivNoNan": {
      return [divNoNan(getParamValue("a", node, tensorMap, context), getParamValue("b", node, tensorMap, context))];
    }
    case "FloorDiv": {
      return [floorDiv(getParamValue("a", node, tensorMap, context), getParamValue("b", node, tensorMap, context))];
    }
    case "Sub": {
      return [sub(getParamValue("a", node, tensorMap, context), getParamValue("b", node, tensorMap, context))];
    }
    case "Minimum": {
      return [minimum(getParamValue("a", node, tensorMap, context), getParamValue("b", node, tensorMap, context))];
    }
    case "Maximum": {
      return [maximum(getParamValue("a", node, tensorMap, context), getParamValue("b", node, tensorMap, context))];
    }
    case "Pow": {
      return [pow(getParamValue("a", node, tensorMap, context), getParamValue("b", node, tensorMap, context))];
    }
    case "SquaredDifference": {
      return [squaredDifference(getParamValue("a", node, tensorMap, context), getParamValue("b", node, tensorMap, context))];
    }
    default:
      throw TypeError(`Node type ${node.op} is not implemented`);
  }
};
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
const executeOp$1 = (node, tensorMap, context) => {
  switch (node.op) {
    case "Abs":
    case "ComplexAbs":
      return [abs(getParamValue("x", node, tensorMap, context))];
    case "Acos":
      return [acos(getParamValue("x", node, tensorMap, context))];
    case "Acosh":
      return [acosh(getParamValue("x", node, tensorMap, context))];
    case "Asin":
      return [asin(getParamValue("x", node, tensorMap, context))];
    case "Asinh":
      return [asinh(getParamValue("x", node, tensorMap, context))];
    case "Atan":
      return [atan(getParamValue("x", node, tensorMap, context))];
    case "Atan2":
      return [atan2(getParamValue("x", node, tensorMap, context), getParamValue("y", node, tensorMap, context))];
    case "Atanh":
      return [atanh(getParamValue("x", node, tensorMap, context))];
    case "Ceil":
      return [ceil(getParamValue("x", node, tensorMap, context))];
    case "Complex":
      return [complex(getParamValue("real", node, tensorMap, context), getParamValue("imag", node, tensorMap, context))];
    case "Cos":
      return [cos(getParamValue("x", node, tensorMap, context))];
    case "Cosh":
      return [cosh(getParamValue("x", node, tensorMap, context))];
    case "Elu":
      return [elu(getParamValue("x", node, tensorMap, context))];
    case "Erf":
      return [erf(getParamValue("x", node, tensorMap, context))];
    case "Exp":
      return [exp(getParamValue("x", node, tensorMap, context))];
    case "Expm1": {
      return [expm1(getParamValue("x", node, tensorMap, context))];
    }
    case "Floor":
      return [floor(getParamValue("x", node, tensorMap, context))];
    case "Log":
      return [log(getParamValue("x", node, tensorMap, context))];
    case "Log1p": {
      return [log1p(getParamValue("x", node, tensorMap, context))];
    }
    case "Imag":
      return [imag(getParamValue("x", node, tensorMap, context))];
    case "Neg":
      return [neg(getParamValue("x", node, tensorMap, context))];
    case "Reciprocal": {
      return [reciprocal(getParamValue("x", node, tensorMap, context))];
    }
    case "Real":
      return [real(getParamValue("x", node, tensorMap, context))];
    case "Relu":
      return [relu(getParamValue("x", node, tensorMap, context))];
    case "Round": {
      return [round(getParamValue("x", node, tensorMap, context))];
    }
    case "Selu":
      return [selu(getParamValue("x", node, tensorMap, context))];
    case "Sigmoid":
      return [sigmoid(getParamValue("x", node, tensorMap, context))];
    case "Sin":
      return [sin(getParamValue("x", node, tensorMap, context))];
    case "Sign": {
      return [sign(getParamValue("x", node, tensorMap, context))];
    }
    case "Sinh": {
      return [sinh(getParamValue("x", node, tensorMap, context))];
    }
    case "Softplus": {
      return [softplus(getParamValue("x", node, tensorMap, context))];
    }
    case "Sqrt": {
      return [sqrt(getParamValue("x", node, tensorMap, context))];
    }
    case "Square": {
      return [square(getParamValue("x", node, tensorMap, context))];
    }
    case "Tanh": {
      return [tanh(getParamValue("x", node, tensorMap, context))];
    }
    case "Tan":
      return [tan(getParamValue("x", node, tensorMap, context))];
    case "ClipByValue":
      return [clipByValue(getParamValue("x", node, tensorMap, context), getParamValue("clipValueMin", node, tensorMap, context), getParamValue("clipValueMax", node, tensorMap, context))];
    case "Relu6":
      return [relu6(getParamValue("x", node, tensorMap, context))];
    case "Rsqrt":
      return [rsqrt(getTensor(node.inputNames[0], tensorMap, context))];
    case "Prod":
      return [prod(getParamValue("x", node, tensorMap, context), getParamValue("axes", node, tensorMap, context))];
    case "LeakyRelu":
      return [leakyRelu(getParamValue("x", node, tensorMap, context), getParamValue("alpha", node, tensorMap, context))];
    case "Prelu":
      return [prelu(getParamValue("x", node, tensorMap, context), getParamValue("alpha", node, tensorMap, context))];
    case "IsNan":
      return [isNaN(getTensor(node.inputNames[0], tensorMap, context))];
    default:
      throw TypeError(`Node type ${node.op} is not implemented`);
  }
};
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
function assertShapesMatchAllowUndefinedSize(shapeA, shapeB, errorMessagePrefix = "") {
  if (typeof shapeA === "number" || typeof shapeB === "number") {
    return;
  }
  assert(shapeA.length === shapeB.length, () => errorMessagePrefix + ` Shapes ${shapeA} and ${shapeB} must match`);
  for (let i = 0; i < shapeA.length; i++) {
    const dim0 = shapeA[i];
    const dim1 = shapeB[i];
    assert(dim0 < 0 || dim1 < 0 || dim0 === dim1, () => errorMessagePrefix + ` Shapes ${shapeA} and ${shapeB} must match`);
  }
}
function fullDefinedShape(elementShape) {
  if (typeof elementShape === "number" || elementShape.some((dim) => dim < 0)) {
    return false;
  }
  return true;
}
function inferElementShape(listElementShape, tensors, elementShape) {
  let partialShape = mergeElementShape(listElementShape, elementShape);
  const notfullDefinedShape = !fullDefinedShape(partialShape);
  if (notfullDefinedShape && tensors.length === 0) {
    throw new Error(`Tried to calculate elements of an empty list with non-fully-defined elementShape: ${partialShape}`);
  }
  if (notfullDefinedShape) {
    tensors.forEach((tensor2) => {
      partialShape = mergeElementShape(tensor2.shape, partialShape);
    });
  }
  if (!fullDefinedShape(partialShape)) {
    throw new Error(`Non-fully-defined elementShape: ${partialShape}`);
  }
  return partialShape;
}
function mergeElementShape(elementShapeA, elementShapeB) {
  if (typeof elementShapeA === "number") {
    return elementShapeB;
  }
  if (typeof elementShapeB === "number") {
    return elementShapeA;
  }
  if (elementShapeA.length !== elementShapeB.length) {
    throw new Error(`Incompatible ranks during merge: ${elementShapeA} vs. ${elementShapeB}`);
  }
  const result = [];
  for (let i = 0; i < elementShapeA.length; ++i) {
    const dim0 = elementShapeA[i];
    const dim1 = elementShapeB[i];
    if (dim0 >= 0 && dim1 >= 0 && dim0 !== dim1) {
      throw new Error(`Incompatible shape during merge: ${elementShapeA} vs. ${elementShapeB}`);
    }
    result[i] = dim0 >= 0 ? dim0 : dim1;
  }
  return result;
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
class TensorArray {
  constructor(name, dtype, maxSize, elementShape, identicalElementShapes, dynamicSize, clearAfterRead) {
    this.name = name;
    this.dtype = dtype;
    this.maxSize = maxSize;
    this.elementShape = elementShape;
    this.identicalElementShapes = identicalElementShapes;
    this.dynamicSize = dynamicSize;
    this.clearAfterRead = clearAfterRead;
    this.tensors = [];
    this.closed_ = false;
    this.idTensor = scalar(0);
    keep(this.idTensor);
  }
  get id() {
    return this.idTensor.id;
  }
  get closed() {
    return this.closed_;
  }
  clearAndClose(keepIds) {
    this.tensors.forEach((tensor2) => {
      if (keepIds == null || !keepIds.has(tensor2.tensor.id)) {
        tensor2.tensor.dispose();
      }
    });
    this.tensors = [];
    this.closed_ = true;
    this.idTensor.dispose();
  }
  size() {
    return this.tensors.length;
  }
  read(index) {
    if (this.closed_) {
      throw new Error(`TensorArray ${this.name} has already been closed.`);
    }
    if (index < 0 || index >= this.size()) {
      throw new Error(`Tried to read from index ${index}, but array size is: ${this.size()}`);
    }
    const tensorWithState = this.tensors[index];
    if (tensorWithState.cleared) {
      throw new Error(`TensorArray ${this.name}: Could not read index ${index} twice because it was cleared after a previous read (perhaps try setting clear_after_read = false?).`);
    }
    if (this.clearAfterRead) {
      tensorWithState.cleared = true;
    }
    tensorWithState.read = true;
    return tensorWithState.tensor;
  }
  readMany(indices) {
    return indices.map((index) => this.read(index));
  }
  write(index, tensor2) {
    if (this.closed_) {
      throw new Error(`TensorArray ${this.name} has already been closed.`);
    }
    if (index < 0 || !this.dynamicSize && index >= this.maxSize) {
      throw new Error(`Tried to write to index ${index}, but array is not resizeable and size is: ${this.maxSize}`);
    }
    const t = this.tensors[index] || {};
    if (tensor2.dtype !== this.dtype) {
      throw new Error(`TensorArray ${this.name}: Could not write to TensorArray index ${index},
          because the value dtype is ${tensor2.dtype}, but TensorArray dtype is ${this.dtype}.`);
    }
    if (this.size() === 0 && (this.elementShape == null || this.elementShape.length === 0)) {
      this.elementShape = tensor2.shape;
    }
    assertShapesMatchAllowUndefinedSize(this.elementShape, tensor2.shape, `TensorArray ${this.name}: Could not write to TensorArray index ${index}.`);
    if (t.read) {
      throw new Error(`TensorArray ${this.name}: Could not write to TensorArray index ${index}, because it has already been read.`);
    }
    if (t.written) {
      throw new Error(`TensorArray ${this.name}: Could not write to TensorArray index ${index}, because it has already been written.`);
    }
    t.tensor = tensor2;
    keep(tensor2);
    t.written = true;
    this.tensors[index] = t;
  }
  writeMany(indices, tensors) {
    if (indices.length !== tensors.length) {
      throw new Error(`TensorArray ${this.name}: could not write multiple tensors,because the index size: ${indices.length} is not the same as tensors size: ${tensors.length}.`);
    }
    indices.forEach((i, index) => this.write(i, tensors[index]));
  }
  gather(indices, dtype) {
    if (!!dtype && dtype !== this.dtype) {
      throw new Error(`TensorArray dtype is ${this.dtype} but gather requested dtype ${dtype}`);
    }
    if (!indices) {
      indices = [];
      for (let i = 0; i < this.size(); i++) {
        indices.push(i);
      }
    } else {
      indices = indices.slice(0, this.size());
    }
    if (indices.length === 0) {
      return tensor([], [0].concat(this.elementShape));
    }
    const tensors = this.readMany(indices);
    assertShapesMatchAllowUndefinedSize(this.elementShape, tensors[0].shape, "TensorArray shape mismatch: ");
    return stack(tensors, 0);
  }
  concat(dtype) {
    if (!!dtype && dtype !== this.dtype) {
      throw new Error(`TensorArray dtype is ${this.dtype} but concat requested dtype ${dtype}`);
    }
    if (this.size() === 0) {
      return tensor([], [0].concat(this.elementShape));
    }
    const indices = [];
    for (let i = 0; i < this.size(); i++) {
      indices.push(i);
    }
    const tensors = this.readMany(indices);
    assertShapesMatchAllowUndefinedSize(this.elementShape, tensors[0].shape, `TensorArray shape mismatch: tensor array shape (${this.elementShape}) vs first tensor shape (${tensors[0].shape})`);
    return concat(tensors, 0);
  }
  scatter(indices, tensor2) {
    if (tensor2.dtype !== this.dtype) {
      throw new Error(`TensorArray dtype is ${this.dtype} but tensor has dtype ${tensor2.dtype}`);
    }
    if (indices.length !== tensor2.shape[0]) {
      throw new Error(`Expected len(indices) == tensor.shape[0], but saw: ${indices.length} vs. ${tensor2.shape[0]}`);
    }
    const maxIndex = Math.max(...indices);
    if (!this.dynamicSize && maxIndex >= this.maxSize) {
      throw new Error(`Max index must be < array size (${maxIndex}  vs. ${this.maxSize})`);
    }
    this.writeMany(indices, unstack(tensor2, 0));
  }
  split(length, tensor2) {
    if (tensor2.dtype !== this.dtype) {
      throw new Error(`TensorArray dtype is ${this.dtype} but tensor has dtype ${tensor2.dtype}`);
    }
    let totalLength = 0;
    const cumulativeLengths = length.map((len) => {
      totalLength += len;
      return totalLength;
    });
    if (totalLength !== tensor2.shape[0]) {
      throw new Error(`Expected sum of lengths to be equal to
          tensor.shape[0], but sum of lengths is
        ${totalLength}, and tensor's shape is: ${tensor2.shape}`);
    }
    if (!this.dynamicSize && length.length !== this.maxSize) {
      throw new Error(`TensorArray's size is not equal to the size of lengths (${this.maxSize} vs. ${length.length}), and the TensorArray is not marked as dynamically resizeable`);
    }
    const elementPerRow = totalLength === 0 ? 0 : tensor2.size / totalLength;
    const tensors = [];
    tidy(() => {
      tensor2 = reshape(tensor2, [1, totalLength, elementPerRow]);
      for (let i = 0; i < length.length; ++i) {
        const previousLength = i === 0 ? 0 : cumulativeLengths[i - 1];
        const indices2 = [0, previousLength, 0];
        const sizes = [1, length[i], elementPerRow];
        tensors[i] = reshape(slice(tensor2, indices2, sizes), this.elementShape);
      }
      return tensors;
    });
    const indices = [];
    for (let i = 0; i < length.length; i++) {
      indices[i] = i;
    }
    this.writeMany(indices, tensors);
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
class TensorList {
  constructor(tensors, elementShape, elementDtype, maxNumElements = -1) {
    this.tensors = tensors;
    this.elementShape = elementShape;
    this.elementDtype = elementDtype;
    if (tensors != null) {
      tensors.forEach((tensor2) => {
        if (elementDtype !== tensor2.dtype) {
          throw new Error(`Invalid data types; op elements ${elementDtype}, but list elements ${tensor2.dtype}`);
        }
        assertShapesMatchAllowUndefinedSize(elementShape, tensor2.shape, "TensorList shape mismatch: ");
        keep(tensor2);
      });
    }
    this.idTensor = scalar(0);
    this.maxNumElements = maxNumElements;
    keep(this.idTensor);
  }
  get id() {
    return this.idTensor.id;
  }
  copy() {
    return new TensorList([...this.tensors], this.elementShape, this.elementDtype);
  }
  clearAndClose(keepIds) {
    this.tensors.forEach((tensor2) => {
      if (keepIds == null || !keepIds.has(tensor2.id)) {
        tensor2.dispose();
      }
    });
    this.tensors.length = 0;
    this.idTensor.dispose();
  }
  size() {
    return this.tensors.length;
  }
  stack(elementShape, elementDtype, numElements = -1) {
    if (elementDtype !== this.elementDtype) {
      throw new Error(`Invalid data types; op elements ${elementDtype}, but list elements ${this.elementDtype}`);
    }
    if (numElements !== -1 && this.tensors.length !== numElements) {
      throw new Error(`Operation expected a list with ${numElements} elements but got a list with ${this.tensors.length} elements.`);
    }
    assertShapesMatchAllowUndefinedSize(elementShape, this.elementShape, "TensorList shape mismatch: ");
    const outputElementShape = inferElementShape(this.elementShape, this.tensors, elementShape);
    return tidy(() => {
      const reshapedTensors = this.tensors.map((tensor2) => reshape(tensor2, outputElementShape));
      return stack(reshapedTensors, 0);
    });
  }
  popBack(elementShape, elementDtype) {
    if (elementDtype !== this.elementDtype) {
      throw new Error(`Invalid data types; op elements ${elementDtype}, but list elements ${this.elementDtype}`);
    }
    if (this.size() === 0) {
      throw new Error("Trying to pop from an empty list.");
    }
    const outputElementShape = inferElementShape(this.elementShape, this.tensors, elementShape);
    const tensor2 = this.tensors.pop();
    assertShapesMatchAllowUndefinedSize(tensor2.shape, elementShape, "TensorList shape mismatch: ");
    return reshape(tensor2, outputElementShape);
  }
  pushBack(tensor2) {
    if (tensor2.dtype !== this.elementDtype) {
      throw new Error(`Invalid data types; op elements ${tensor2.dtype}, but list elements ${this.elementDtype}`);
    }
    assertShapesMatchAllowUndefinedSize(tensor2.shape, this.elementShape, "TensorList shape mismatch: ");
    if (this.maxNumElements === this.size()) {
      throw new Error(`Trying to push element into a full list.`);
    }
    keep(tensor2);
    this.tensors.push(tensor2);
  }
  resize(size) {
    if (size < 0) {
      throw new Error(`TensorListResize expects size to be non-negative. Got: ${size}`);
    }
    if (this.maxNumElements !== -1 && size > this.maxNumElements) {
      throw new Error(`TensorListResize input size ${size} is greater maxNumElement ${this.maxNumElements}.`);
    }
    this.tensors.length = size;
  }
  getItem(elementIndex, elementShape, elementDtype) {
    if (elementDtype !== this.elementDtype) {
      throw new Error(`Invalid data types; op elements ${elementDtype}, but list elements ${this.elementDtype}`);
    }
    if (elementIndex < 0 || elementIndex > this.tensors.length) {
      throw new Error(`Trying to access element ${elementIndex} in a list with ${this.tensors.length} elements.`);
    }
    if (this.tensors[elementIndex] == null) {
      throw new Error(`element at index ${elementIndex} is null.`);
    }
    assertShapesMatchAllowUndefinedSize(this.tensors[elementIndex].shape, elementShape, "TensorList shape mismatch: ");
    const outputElementShape = inferElementShape(this.elementShape, this.tensors, elementShape);
    return reshape(this.tensors[elementIndex], outputElementShape);
  }
  setItem(elementIndex, tensor2) {
    if (tensor2.dtype !== this.elementDtype) {
      throw new Error(`Invalid data types; op elements ${tensor2.dtype}, but list elements ${this.elementDtype}`);
    }
    if (elementIndex < 0 || this.maxNumElements !== -1 && elementIndex >= this.maxNumElements) {
      throw new Error(`Trying to set element ${elementIndex} in a list with max ${this.maxNumElements} elements.`);
    }
    assertShapesMatchAllowUndefinedSize(this.elementShape, tensor2.shape, "TensorList shape mismatch: ");
    keep(tensor2);
    this.tensors[elementIndex] = tensor2;
  }
  gather(indices, elementDtype, elementShape) {
    if (elementDtype !== this.elementDtype) {
      throw new Error(`Invalid data types; op elements ${elementDtype}, but list elements ${this.elementDtype}`);
    }
    assertShapesMatchAllowUndefinedSize(this.elementShape, elementShape, "TensorList shape mismatch: ");
    indices = indices.slice(0, this.size());
    const outputElementShape = inferElementShape(this.elementShape, this.tensors, elementShape);
    if (indices.length === 0) {
      return tensor([], [0].concat(outputElementShape));
    }
    return tidy(() => {
      const tensors = indices.map((i) => reshape(this.tensors[i], outputElementShape));
      return stack(tensors, 0);
    });
  }
  concat(elementDtype, elementShape) {
    if (!!elementDtype && elementDtype !== this.elementDtype) {
      throw new Error(`TensorList dtype is ${this.elementDtype} but concat requested dtype ${elementDtype}`);
    }
    assertShapesMatchAllowUndefinedSize(this.elementShape, elementShape, "TensorList shape mismatch: ");
    const outputElementShape = inferElementShape(this.elementShape, this.tensors, elementShape);
    if (this.size() === 0) {
      return tensor([], [0].concat(outputElementShape));
    }
    return tidy(() => {
      const tensors = this.tensors.map((t) => reshape(t, outputElementShape));
      return concat(tensors, 0);
    });
  }
}
function fromTensor(tensor2, elementShape, elementDtype) {
  const dtype = tensor2.dtype;
  if (tensor2.shape.length < 1) {
    throw new Error(`Tensor must be at least a vector, but saw shape: ${tensor2.shape}`);
  }
  if (tensor2.dtype !== elementDtype) {
    throw new Error(`Invalid data types; op elements ${tensor2.dtype}, but list elements ${elementDtype}`);
  }
  const tensorElementShape = tensor2.shape.slice(1);
  assertShapesMatchAllowUndefinedSize(tensorElementShape, elementShape, "TensorList shape mismatch: ");
  const tensorList = unstack(tensor2);
  return new TensorList(tensorList, elementShape, dtype);
}
function reserve(elementShape, elementDtype, numElements) {
  return new TensorList([], elementShape, elementDtype, numElements);
}
function scatter(tensor2, indices, elementShape, numElements) {
  if (indices.length !== tensor2.shape[0]) {
    throw new Error(`Expected len(indices) == tensor.shape[0], but saw: ${indices.length} vs. ${tensor2.shape[0]}`);
  }
  const maxIndex = Math.max(...indices);
  if (numElements != null && numElements !== -1 && maxIndex >= numElements) {
    throw new Error(`Max index must be < array size (${maxIndex}  vs. ${numElements})`);
  }
  const list = new TensorList([], elementShape, tensor2.dtype, numElements);
  const tensors = unstack(tensor2, 0);
  indices.forEach((value, index) => {
    list.setItem(value, tensors[index]);
  });
  return list;
}
function split(tensor2, length, elementShape) {
  let totalLength = 0;
  const cumulativeLengths = length.map((len) => {
    totalLength += len;
    return totalLength;
  });
  if (totalLength !== tensor2.shape[0]) {
    throw new Error(`Expected sum of lengths to be equal to
          tensor.shape[0], but sum of lengths is
        ${totalLength}, and tensor's shape is: ${tensor2.shape}`);
  }
  const shapeWithoutFirstDim = tensor2.shape.slice(1);
  const outputElementShape = mergeElementShape(shapeWithoutFirstDim, elementShape);
  const elementPerRow = totalLength === 0 ? 0 : tensor2.size / totalLength;
  const tensors = tidy(() => {
    const tensors2 = [];
    tensor2 = reshape(tensor2, [1, totalLength, elementPerRow]);
    for (let i = 0; i < length.length; ++i) {
      const previousLength = i === 0 ? 0 : cumulativeLengths[i - 1];
      const indices = [0, previousLength, 0];
      const sizes = [1, length[i], elementPerRow];
      tensors2[i] = reshape(slice(tensor2, indices, sizes), outputElementShape);
    }
    tensor2.dispose();
    return tensors2;
  });
  const list = new TensorList([], elementShape, tensor2.dtype, length.length);
  for (let i = 0; i < tensors.length; i++) {
    list.setItem(i, tensors[i]);
  }
  return list;
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
const executeOp$2 = async (node, tensorMap, context) => {
  switch (node.op) {
    case "If":
    case "StatelessIf": {
      const thenFunc = getParamValue("thenBranch", node, tensorMap, context);
      const elseFunc = getParamValue("elseBranch", node, tensorMap, context);
      const cond = getParamValue("cond", node, tensorMap, context);
      const args = getParamValue("args", node, tensorMap, context);
      const condValue = await cond.data();
      if (condValue[0]) {
        return context.functionMap[thenFunc].executeFunctionAsync(args, context.tensorArrayMap, context.tensorListMap);
      } else {
        return context.functionMap[elseFunc].executeFunctionAsync(args, context.tensorArrayMap, context.tensorListMap);
      }
    }
    case "While":
    case "StatelessWhile": {
      const bodyFunc = getParamValue("body", node, tensorMap, context);
      const condFunc = getParamValue("cond", node, tensorMap, context);
      const args = getParamValue("args", node, tensorMap, context);
      const condResult = await context.functionMap[condFunc].executeFunctionAsync(args, context.tensorArrayMap, context.tensorListMap);
      const argIds = args.map((tensor2) => tensor2.id);
      let condValue = await condResult[0].data();
      condResult.forEach((tensor2) => {
        if (!tensor2.kept && argIds.indexOf(tensor2.id) === -1) {
          tensor2.dispose();
        }
      });
      let result = args;
      while (condValue[0]) {
        const origResult = result;
        result = await context.functionMap[bodyFunc].executeFunctionAsync(result, context.tensorArrayMap, context.tensorListMap);
        const resultIds = result.map((tensor2) => tensor2.id);
        origResult.forEach((tensor2) => {
          if (!tensor2.kept && argIds.indexOf(tensor2.id) === -1 && resultIds.indexOf(tensor2.id) === -1) {
            tensor2.dispose();
          }
        });
        const condResult2 = await context.functionMap[condFunc].executeFunctionAsync(result, context.tensorArrayMap, context.tensorListMap);
        condValue = await condResult2[0].data();
        condResult2.forEach((tensor2) => {
          if (!tensor2.kept && argIds.indexOf(tensor2.id) === -1 && resultIds.indexOf(tensor2.id) === -1) {
            tensor2.dispose();
          }
        });
      }
      return result;
    }
    case "LoopCond": {
      const pred = getParamValue("pred", node, tensorMap, context);
      return [cloneTensor(pred)];
    }
    case "Switch": {
      const pred = getParamValue("pred", node, tensorMap, context);
      let data = getParamValue("data", node, tensorMap, context);
      if (!data.kept) {
        data = cloneTensor(data);
      }
      return (await pred.data())[0] ? [void 0, data] : [data, void 0];
    }
    case "Merge": {
      const inputName = node.inputNames.find((name) => getTensor(name, tensorMap, context) !== void 0);
      if (inputName) {
        const data = getTensor(inputName, tensorMap, context);
        return [cloneTensor(data)];
      }
      return void 0;
    }
    case "Enter": {
      const frameId = getParamValue("frameName", node, tensorMap, context);
      const data = getParamValue("tensor", node, tensorMap, context);
      context.enterFrame(frameId);
      return [cloneTensor(data)];
    }
    case "Exit": {
      const data = getParamValue("tensor", node, tensorMap, context);
      context.exitFrame();
      return [cloneTensor(data)];
    }
    case "NextIteration": {
      const data = getParamValue("tensor", node, tensorMap, context);
      context.nextIteration();
      return [cloneTensor(data)];
    }
    case "TensorArrayV3": {
      const size = getParamValue("size", node, tensorMap, context);
      const dtype = getParamValue("dtype", node, tensorMap, context);
      const elementShape = getParamValue("elementShape", node, tensorMap, context);
      const dynamicSize = getParamValue("dynamicSize", node, tensorMap, context);
      const clearAfterRead = getParamValue("clearAfterRead", node, tensorMap, context);
      const identicalElementShapes = getParamValue("identicalElementShapes", node, tensorMap, context);
      const name = getParamValue("name", node, tensorMap, context);
      const tensorArray = new TensorArray(name, dtype, size, elementShape, identicalElementShapes, dynamicSize, clearAfterRead);
      context.addTensorArray(tensorArray);
      return [tensorArray.idTensor, scalar(1)];
    }
    case "TensorArrayWriteV3": {
      const id = getParamValue("tensorArrayId", node, tensorMap, context);
      const index = getParamValue("index", node, tensorMap, context);
      const writeTensor = getParamValue("tensor", node, tensorMap, context);
      const writeTensorArray = context.getTensorArray(id.id);
      writeTensorArray.write(index, writeTensor);
      return [writeTensorArray.idTensor];
    }
    case "TensorArrayReadV3": {
      const readId = getParamValue("tensorArrayId", node, tensorMap, context);
      const readIndex = getParamValue("index", node, tensorMap, context);
      const readTensorArray = context.getTensorArray(readId.id);
      return [readTensorArray.read(readIndex)];
    }
    case "TensorArrayGatherV3": {
      const gatherId = getParamValue("tensorArrayId", node, tensorMap, context);
      const gatherIndices = getParamValue("indices", node, tensorMap, context);
      const gatherDtype = getParamValue("dtype", node, tensorMap, context);
      const gatherTensorArray = context.getTensorArray(gatherId.id);
      return [gatherTensorArray.gather(gatherIndices, gatherDtype)];
    }
    case "TensorArrayScatterV3": {
      const scatterId = getParamValue("tensorArrayId", node, tensorMap, context);
      const scatterIndices = getParamValue("indices", node, tensorMap, context);
      const scatterTensor = getParamValue("tensor", node, tensorMap, context);
      const scatterTensorArray = context.getTensorArray(scatterId.id);
      scatterTensorArray.scatter(scatterIndices, scatterTensor);
      return [scatterTensorArray.idTensor];
    }
    case "TensorArrayConcatV3": {
      const concatId = getParamValue("tensorArrayId", node, tensorMap, context);
      const concatTensorArray = context.getTensorArray(concatId.id);
      const concatDtype = getParamValue("dtype", node, tensorMap, context);
      return [concatTensorArray.concat(concatDtype)];
    }
    case "TensorArraySplitV3": {
      const splitId = getParamValue("tensorArrayId", node, tensorMap, context);
      const splitTensor = getParamValue("tensor", node, tensorMap, context);
      const lengths = getParamValue("lengths", node, tensorMap, context);
      const splitTensorArray = context.getTensorArray(splitId.id);
      splitTensorArray.split(lengths, splitTensor);
      return [splitTensorArray.idTensor];
    }
    case "TensorArraySizeV3": {
      const sizeId = getParamValue("tensorArrayId", node, tensorMap, context);
      const sizeTensorArray = context.getTensorArray(sizeId.id);
      return [scalar(sizeTensorArray.size(), "int32")];
    }
    case "TensorArrayCloseV3": {
      const closeId = getParamValue("tensorArrayId", node, tensorMap, context);
      const closeTensorArray = context.getTensorArray(closeId.id);
      closeTensorArray.clearAndClose();
      return [closeTensorArray.idTensor];
    }
    case "TensorListSetItem": {
      const idTensor = getParamValue("tensorListId", node, tensorMap, context);
      const index = getParamValue("index", node, tensorMap, context);
      const writeTensor = getParamValue("tensor", node, tensorMap, context);
      const tensorList = context.getTensorList(idTensor.id);
      tensorList.setItem(index, writeTensor);
      return [tensorList.idTensor];
    }
    case "TensorListGetItem": {
      const idTensor = getParamValue("tensorListId", node, tensorMap, context);
      const readIndex = getParamValue("index", node, tensorMap, context);
      const elementShape = getParamValue("elementShape", node, tensorMap, context);
      const elementDType = getParamValue("elementDType", node, tensorMap, context);
      const tensorList = context.getTensorList(idTensor.id);
      return [tensorList.getItem(readIndex, elementShape, elementDType)];
    }
    case "TensorListScatterV2":
    case "TensorListScatter": {
      const scatterIndices = getParamValue("indices", node, tensorMap, context);
      const scatterTensor = getParamValue("tensor", node, tensorMap, context);
      const elementShape = getParamValue("elementShape", node, tensorMap, context);
      const numElements = getParamValue("numElements", node, tensorMap, context);
      const tensorList = scatter(scatterTensor, scatterIndices, elementShape, numElements);
      context.addTensorList(tensorList);
      return [tensorList.idTensor];
    }
    case "TensorListReserve":
    case "EmptyTensorList": {
      const elementShape = getParamValue("elementShape", node, tensorMap, context);
      const elementDtype = getParamValue("elementDType", node, tensorMap, context);
      let numElementsParam;
      if (node.op === "TensorListReserve") {
        numElementsParam = "numElements";
      } else {
        numElementsParam = "maxNumElements";
      }
      const numElements = getParamValue(numElementsParam, node, tensorMap, context);
      const tensorList = reserve(elementShape, elementDtype, numElements);
      context.addTensorList(tensorList);
      return [tensorList.idTensor];
    }
    case "TensorListGather": {
      const gatherId = getParamValue("tensorListId", node, tensorMap, context);
      const gatherIndices = getParamValue("indices", node, tensorMap, context);
      const elementShape = getParamValue("elementShape", node, tensorMap, context);
      const elementDtype = getParamValue("elementDType", node, tensorMap, context);
      const tensorList = context.getTensorList(gatherId.id);
      return [tensorList.gather(gatherIndices, elementDtype, elementShape)];
    }
    case "TensorListStack": {
      const idTensor = getParamValue("tensorListId", node, tensorMap, context);
      const elementShape = getParamValue("elementShape", node, tensorMap, context);
      const elementDtype = getParamValue("elementDType", node, tensorMap, context);
      const numElements = getParamValue("numElements", node, tensorMap, context);
      const tensorList = context.getTensorList(idTensor.id);
      return [tensorList.stack(elementShape, elementDtype, numElements)];
    }
    case "TensorListFromTensor": {
      const tensor2 = getParamValue("tensor", node, tensorMap, context);
      const elementShape = getParamValue("elementShape", node, tensorMap, context);
      const elementDtype = getParamValue("elementDType", node, tensorMap, context);
      const tensorList = fromTensor(tensor2, elementShape, elementDtype);
      context.addTensorList(tensorList);
      return [tensorList.idTensor];
    }
    case "TensorListConcat": {
      const concatId = getParamValue("tensorListId", node, tensorMap, context);
      const tensorList = context.getTensorList(concatId.id);
      const concatDtype = getParamValue("dtype", node, tensorMap, context);
      const elementShape = getParamValue("elementShape", node, tensorMap, context);
      return [tensorList.concat(concatDtype, elementShape)];
    }
    case "TensorListPushBack": {
      const idTensor = getParamValue("tensorListId", node, tensorMap, context);
      const writeTensor = getParamValue("tensor", node, tensorMap, context);
      const tensorList = context.getTensorList(idTensor.id);
      tensorList.pushBack(writeTensor);
      return [tensorList.idTensor];
    }
    case "TensorListPopBack": {
      const idTensor = getParamValue("tensorListId", node, tensorMap, context);
      const elementShape = getParamValue("elementShape", node, tensorMap, context);
      const elementDType = getParamValue("elementDType", node, tensorMap, context);
      const tensorList = context.getTensorList(idTensor.id);
      return [tensorList.popBack(elementShape, elementDType)];
    }
    case "TensorListSplit": {
      const splitTensor = getParamValue("tensor", node, tensorMap, context);
      const elementShape = getParamValue("elementShape", node, tensorMap, context);
      const lengths = getParamValue("lengths", node, tensorMap, context);
      const tensorList = split(splitTensor, lengths, elementShape);
      context.addTensorList(tensorList);
      return [tensorList.idTensor];
    }
    default:
      throw TypeError(`Node type ${node.op} is not implemented`);
  }
};
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
function fusedConvAndDepthWiseParams(node, tensorMap, context) {
  const [extraOp, activationFunc] = getParamValue("fusedOps", node, tensorMap, context);
  const isBiasAdd = extraOp === "biasadd";
  const isPrelu = activationFunc === "prelu";
  const isBatchNorm = extraOp === "fusedbatchnorm";
  const numArgs = getParamValue("numArgs", node, tensorMap, context);
  if (isBiasAdd) {
    if (isPrelu && numArgs !== 2) {
      throw new Error("FusedConv2d and DepthwiseConv2d with BiasAdd and Prelu must have two extra arguments: bias and alpha.");
    }
    if (!isPrelu && numArgs !== 1) {
      throw new Error("FusedConv2d and DepthwiseConv2d with BiasAdd must have one extra argument: bias.");
    }
  }
  if (isBatchNorm) {
    throw new Error("FusedConv2d and DepthwiseConv2d with FusedBatchNorm is not supported");
  }
  const stride = getParamValue("strides", node, tensorMap, context);
  const pad2 = getPadding(node, tensorMap, context);
  const dataFormat = getParamValue("dataFormat", node, tensorMap, context).toUpperCase();
  const dilations = getParamValue("dilations", node, tensorMap, context);
  const [biasArg, preluArg] = getParamValue("args", node, tensorMap, context);
  const leakyreluAlpha = getParamValue("leakyreluAlpha", node, tensorMap, context);
  return {
    stride,
    pad: pad2,
    dataFormat,
    dilations,
    biasArg,
    preluArg,
    activationFunc,
    leakyreluAlpha
  };
}
const executeOp$3 = (node, tensorMap, context) => {
  switch (node.op) {
    case "Conv1D": {
      const stride = getParamValue("stride", node, tensorMap, context);
      const pad2 = getParamValue("pad", node, tensorMap, context);
      const dataFormat = getParamValue("dataFormat", node, tensorMap, context).toUpperCase();
      const dilation = getParamValue("dilation", node, tensorMap, context);
      return [conv1d(getParamValue("x", node, tensorMap, context), getParamValue("filter", node, tensorMap, context), stride, pad2, dataFormat, dilation)];
    }
    case "Conv2D": {
      const stride = getParamValue("strides", node, tensorMap, context);
      const pad2 = getPadding(node, tensorMap, context);
      const dataFormat = getParamValue("dataFormat", node, tensorMap, context).toUpperCase();
      const dilations = getParamValue("dilations", node, tensorMap, context);
      return [conv2d$1(getParamValue("x", node, tensorMap, context), getParamValue("filter", node, tensorMap, context), [stride[1], stride[2]], pad2, dataFormat, [dilations[1], dilations[2]])];
    }
    case "_FusedConv2D": {
      const {stride, pad: pad2, dataFormat, dilations, biasArg, preluArg, activationFunc, leakyreluAlpha} = fusedConvAndDepthWiseParams(node, tensorMap, context);
      return [conv2d({
        x: getParamValue("x", node, tensorMap, context),
        filter: getParamValue("filter", node, tensorMap, context),
        strides: [stride[1], stride[2]],
        pad: pad2,
        dataFormat,
        dilations: [dilations[1], dilations[2]],
        bias: biasArg,
        activation: activationFunc,
        preluActivationWeights: preluArg,
        leakyreluAlpha
      })];
    }
    case "FusedDepthwiseConv2dNative": {
      const {stride, pad: pad2, dataFormat, dilations, biasArg, preluArg, activationFunc, leakyreluAlpha} = fusedConvAndDepthWiseParams(node, tensorMap, context);
      return [depthwiseConv2d$1({
        x: getParamValue("x", node, tensorMap, context),
        filter: getParamValue("filter", node, tensorMap, context),
        strides: [stride[1], stride[2]],
        pad: pad2,
        dataFormat,
        dilations: [dilations[1], dilations[2]],
        bias: biasArg,
        activation: activationFunc,
        preluActivationWeights: preluArg,
        leakyreluAlpha
      })];
    }
    case "Conv2DBackpropInput":
    case "Conv2dTranspose": {
      const shape = getParamValue("outputShape", node, tensorMap, context);
      const stride = getParamValue("strides", node, tensorMap, context);
      const pad2 = getPadding(node, tensorMap, context);
      return [conv2dTranspose(getParamValue("x", node, tensorMap, context), getParamValue("filter", node, tensorMap, context), shape, [stride[1], stride[2]], pad2)];
    }
    case "DepthwiseConv2dNative":
    case "DepthwiseConv2d": {
      const stride = getParamValue("strides", node, tensorMap, context);
      const pad2 = getPadding(node, tensorMap, context);
      const dilations = getParamValue("dilations", node, tensorMap, context);
      const dataFormat = getParamValue("dataFormat", node, tensorMap, context).toUpperCase();
      return [depthwiseConv2d(getParamValue("input", node, tensorMap, context), getParamValue("filter", node, tensorMap, context), [stride[1], stride[2]], pad2, dataFormat, [dilations[1], dilations[2]])];
    }
    case "Conv3D": {
      const stride = getParamValue("strides", node, tensorMap, context);
      const pad2 = getParamValue("pad", node, tensorMap, context);
      const dataFormat = getParamValue("dataFormat", node, tensorMap, context).toUpperCase();
      const dilations = getParamValue("dilations", node, tensorMap, context);
      return [conv3d(getParamValue("x", node, tensorMap, context), getParamValue("filter", node, tensorMap, context), [stride[1], stride[2], stride[3]], pad2, dataFormat, [dilations[1], dilations[2], dilations[3]])];
    }
    case "AvgPool": {
      const stride = getParamValue("strides", node, tensorMap, context);
      const pad2 = getParamValue("pad", node, tensorMap, context);
      const kernelSize = getParamValue("kernelSize", node, tensorMap, context);
      return [avgPool(getParamValue("x", node, tensorMap, context), [kernelSize[1], kernelSize[2]], [stride[1], stride[2]], pad2)];
    }
    case "MaxPool": {
      const stride = getParamValue("strides", node, tensorMap, context);
      const pad2 = getParamValue("pad", node, tensorMap, context);
      const kernelSize = getParamValue("kernelSize", node, tensorMap, context);
      return [maxPool(getParamValue("x", node, tensorMap, context), [kernelSize[1], kernelSize[2]], [stride[1], stride[2]], pad2)];
    }
    case "MaxPoolWithArgmax": {
      const stride = getParamValue("strides", node, tensorMap, context);
      const pad2 = getParamValue("pad", node, tensorMap, context);
      const kernelSize = getParamValue("kernelSize", node, tensorMap, context);
      const includeBatchInIndex = getParamValue("includeBatchInIndex", node, tensorMap, context);
      const {result, indexes} = maxPoolWithArgmax(getParamValue("x", node, tensorMap, context), [kernelSize[1], kernelSize[2]], [stride[1], stride[2]], pad2, includeBatchInIndex);
      return [result, indexes];
    }
    case "AvgPool3D": {
      const stride = getParamValue("strides", node, tensorMap, context);
      const pad2 = getParamValue("pad", node, tensorMap, context);
      const kernelSize = getParamValue("kernelSize", node, tensorMap, context);
      return [avgPool3d(getParamValue("x", node, tensorMap, context), [kernelSize[1], kernelSize[2], kernelSize[3]], [stride[1], stride[2], stride[3]], pad2)];
    }
    case "MaxPool3D": {
      const stride = getParamValue("strides", node, tensorMap, context);
      const pad2 = getParamValue("pad", node, tensorMap, context);
      const kernelSize = getParamValue("kernelSize", node, tensorMap, context);
      return [maxPool3d(getParamValue("x", node, tensorMap, context), [kernelSize[1], kernelSize[2], kernelSize[3]], [stride[1], stride[2], stride[3]], pad2)];
    }
    case "Dilation2D": {
      const strides = getParamValue("strides", node, tensorMap, context);
      const pad2 = getParamValue("pad", node, tensorMap, context);
      const dilations = getParamValue("dilations", node, tensorMap, context);
      const strideHeight = strides[1];
      const strideWidth = strides[2];
      const dilationHeight = dilations[1];
      const dilationWidth = dilations[2];
      return [dilation2d(getParamValue("x", node, tensorMap, context), getParamValue("filter", node, tensorMap, context), [strideHeight, strideWidth], pad2, [dilationHeight, dilationWidth], "NHWC")];
    }
    default:
      throw TypeError(`Node type ${node.op} is not implemented`);
  }
};
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
const executeOp$4 = (node, tensorMap, context) => {
  switch (node.op) {
    case "Fill": {
      const shape = getParamValue("shape", node, tensorMap, context);
      const dtype = getParamValue("dtype", node, tensorMap, context);
      const value = getParamValue("value", node, tensorMap, context);
      return [fill(shape, value, dtype)];
    }
    case "LinSpace": {
      const start = getParamValue("start", node, tensorMap, context);
      const stop = getParamValue("stop", node, tensorMap, context);
      const num = getParamValue("num", node, tensorMap, context);
      return [linspace(start, stop, num)];
    }
    case "Multinomial": {
      const logits = getParamValue("logits", node, tensorMap, context);
      const numSamples = getParamValue("numSamples", node, tensorMap, context);
      const seed = getParamValue("seed", node, tensorMap, context);
      return [multinomial(logits, numSamples, seed)];
    }
    case "OneHot": {
      const indices = getParamValue("indices", node, tensorMap, context);
      const depth = getParamValue("depth", node, tensorMap, context);
      const onValue = getParamValue("onValue", node, tensorMap, context);
      const offValue = getParamValue("offValue", node, tensorMap, context);
      return [oneHot(indices, depth, onValue, offValue)];
    }
    case "Ones": {
      return [ones(getParamValue("shape", node, tensorMap, context), getParamValue("dtype", node, tensorMap, context))];
    }
    case "OnesLike": {
      return [onesLike(getParamValue("x", node, tensorMap, context))];
    }
    case "RandomUniform": {
      return [randomUniform(getParamValue("shape", node, tensorMap, context), getParamValue("minval", node, tensorMap, context), getParamValue("maxval", node, tensorMap, context), getParamValue("dtype", node, tensorMap, context))];
    }
    case "Range": {
      const start = getParamValue("start", node, tensorMap, context);
      const stop = getParamValue("stop", node, tensorMap, context);
      const step = getParamValue("step", node, tensorMap, context);
      return [range(start, stop, step, getParamValue("dtype", node, tensorMap, context))];
    }
    case "TruncatedNormal": {
      const shape = getParamValue("shape", node, tensorMap, context);
      const mean2 = getParamValue("mean", node, tensorMap, context);
      const stdDev = getParamValue("stdDev", node, tensorMap, context);
      const seed = getParamValue("seed", node, tensorMap, context);
      return [truncatedNormal(shape, mean2, stdDev, getParamValue("dtype", node, tensorMap, context), seed)];
    }
    case "Zeros": {
      return [zeros(getParamValue("shape", node, tensorMap, context), getParamValue("dtype", node, tensorMap, context))];
    }
    case "ZerosLike": {
      return [zerosLike(getParamValue("x", node, tensorMap, context))];
    }
    default:
      throw TypeError(`Node type ${node.op} is not implemented`);
  }
};
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
function nmsParams(node, tensorMap, context) {
  const boxes = getParamValue("boxes", node, tensorMap, context);
  const scores = getParamValue("scores", node, tensorMap, context);
  const maxOutputSize = getParamValue("maxOutputSize", node, tensorMap, context);
  const iouThreshold = getParamValue("iouThreshold", node, tensorMap, context);
  const scoreThreshold = getParamValue("scoreThreshold", node, tensorMap, context);
  const softNmsSigma = getParamValue("softNmsSigma", node, tensorMap, context);
  return {
    boxes,
    scores,
    maxOutputSize,
    iouThreshold,
    scoreThreshold,
    softNmsSigma
  };
}
const executeOp$5 = async (node, tensorMap, context) => {
  switch (node.op) {
    case "NonMaxSuppressionV5": {
      const {boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, softNmsSigma} = nmsParams(node, tensorMap, context);
      const result = await image$1.nonMaxSuppressionWithScoreAsync(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, softNmsSigma);
      return [result.selectedIndices, result.selectedScores];
    }
    case "NonMaxSuppressionV4": {
      const {boxes, scores, maxOutputSize, iouThreshold, scoreThreshold} = nmsParams(node, tensorMap, context);
      const padToMaxOutputSize = getParamValue("padToMaxOutputSize", node, tensorMap, context);
      const result = await image$1.nonMaxSuppressionPaddedAsync(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, padToMaxOutputSize);
      return [result.selectedIndices, result.validOutputs];
    }
    case "NonMaxSuppressionV3":
    case "NonMaxSuppressionV2": {
      const {boxes, scores, maxOutputSize, iouThreshold, scoreThreshold} = nmsParams(node, tensorMap, context);
      return [await image$1.nonMaxSuppressionAsync(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold)];
    }
    case "Where": {
      const condition = cast(getParamValue("condition", node, tensorMap, context), "bool");
      const result = [await whereAsync(condition)];
      condition.dispose();
      return result;
    }
    case "ListDiff": {
      return setdiff1dAsync(getParamValue("x", node, tensorMap, context), getParamValue("y", node, tensorMap, context));
    }
    default:
      throw TypeError(`Node type ${node.op} is not implemented`);
  }
};
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
const executeOp$6 = (node, tensorMap, context) => {
  switch (node.op) {
    case "TopKV2": {
      const x = getParamValue("x", node, tensorMap, context);
      const k = getParamValue("k", node, tensorMap, context);
      const sorted = getParamValue("sorted", node, tensorMap, context);
      const result = topk(x, k, sorted);
      return [result.values, result.indices];
    }
    case "Unique": {
      const x = getParamValue("x", node, tensorMap, context);
      const result = unique(x);
      return [result.values, result.indices];
    }
    case "UniqueV2": {
      const x = getParamValue("x", node, tensorMap, context);
      const axis = getParamValue("axis", node, tensorMap, context);
      const result = unique(x, axis);
      return [result.values, result.indices];
    }
    default:
      throw TypeError(`Node type ${node.op} is not implemented`);
  }
};
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
const executeOp$7 = (node, tensorMap, context) => {
  switch (node.op) {
    case "Const": {
      return tensorMap[node.name];
    }
    case "PlaceholderWithDefault":
      const def = getParamValue("default", node, tensorMap, context);
      return [getTensor(node.name, tensorMap, context) || def];
    case "Placeholder":
      return [getTensor(node.name, tensorMap, context)];
    case "Identity":
    case "StopGradient":
    case "FakeQuantWithMinMaxVars": {
      const data2 = getParamValue("x", node, tensorMap, context);
      return [cloneTensor(data2)];
    }
    case "IdentityN":
      return getParamValue("x", node, tensorMap, context).map((t) => cloneTensor(t));
    case "Snapshot":
      const snapshot = getParamValue("x", node, tensorMap, context);
      return [cloneTensor(snapshot)];
    case "Shape":
      return [tensor1d(getParamValue("x", node, tensorMap, context).shape, "int32")];
    case "ShapeN":
      return getParamValue("x", node, tensorMap, context).map((t) => tensor1d(t.shape));
    case "Size":
      return [scalar(getParamValue("x", node, tensorMap, context).size, "int32")];
    case "Rank":
      return [scalar(getParamValue("x", node, tensorMap, context).rank, "int32")];
    case "NoOp":
      return [scalar(1)];
    case "Print":
      const input = getParamValue("x", node, tensorMap, context);
      const data = getParamValue("data", node, tensorMap, context);
      const message = getParamValue("message", node, tensorMap, context);
      const summarize = getParamValue("summarize", node, tensorMap, context);
      console.warn("The graph has a tf.print() operation,usually used for debugging, which slows down performance.");
      console.log(message);
      for (let i = 0; i < data.length; i++) {
        console.log(Array.prototype.slice.call(data[i].dataSync()).slice(0, summarize));
      }
      return [input];
    default:
      throw TypeError(`Node type ${node.op} is not implemented`);
  }
};
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
class HashTable {
  constructor(keyDType, valueDType) {
    this.keyDType = keyDType;
    this.valueDType = valueDType;
    this.handle = scalar(0);
    this.tensorMap = new Map();
    keep(this.handle);
  }
  get id() {
    return this.handle.id;
  }
  clearAndClose() {
    this.tensorMap.forEach((value) => value.dispose());
    this.tensorMap.clear();
    this.handle.dispose();
  }
  size() {
    return this.tensorMap.size;
  }
  tensorSize() {
    return scalar(this.size(), "int32");
  }
  async import(keys, values) {
    this.checkKeyAndValueTensor(keys, values);
    const $keys = await keys.data();
    this.tensorMap.forEach((value) => value.dispose());
    this.tensorMap.clear();
    return tidy(() => {
      const $values = unstack(values);
      const keysLength = $keys.length;
      const valuesLength = $values.length;
      assert(keysLength === valuesLength, () => `The number of elements doesn't match, keys has ${keysLength} elements, the values has ${valuesLength} elements.`);
      for (let i = 0; i < keysLength; i++) {
        const key = $keys[i];
        const value = $values[i];
        keep(value);
        this.tensorMap.set(key, value);
      }
      return this.handle;
    });
  }
  async find(keys, defaultValue) {
    this.checkKeyAndValueTensor(keys, defaultValue);
    const $keys = await keys.data();
    return tidy(() => {
      const result = [];
      for (let i = 0; i < $keys.length; i++) {
        const key = $keys[i];
        const value = this.findWithDefault(key, defaultValue);
        result.push(value);
      }
      return stack(result);
    });
  }
  findWithDefault(key, defaultValue) {
    const result = this.tensorMap.get(key);
    return result != null ? result : defaultValue;
  }
  checkKeyAndValueTensor(key, value) {
    if (key.dtype !== this.keyDType) {
      throw new Error(`Expect key dtype ${this.keyDType}, but got ${key.dtype}`);
    }
    if (value.dtype !== this.valueDType) {
      throw new Error(`Expect value dtype ${this.valueDType}, but got ${value.dtype}`);
    }
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
const executeOp$8 = async (node, tensorMap, context, resourceManager) => {
  switch (node.op) {
    case "HashTable":
    case "HashTableV2": {
      const keyDType = getParamValue("keyDType", node, tensorMap, context);
      const valueDType = getParamValue("valueDType", node, tensorMap, context);
      const hashTable2 = new HashTable(keyDType, valueDType);
      resourceManager.addHashTable(node.name, hashTable2);
      return [hashTable2.handle];
    }
    case "LookupTableImport":
    case "LookupTableImportV2": {
      const handle = getParamValue("tableHandle", node, tensorMap, context, resourceManager);
      const keys = getParamValue("keys", node, tensorMap, context);
      const values = getParamValue("values", node, tensorMap, context);
      const hashTable2 = resourceManager.getHashTableById(handle.id);
      return [await hashTable2.import(keys, values)];
    }
    case "LookupTableFind":
    case "LookupTableFindV2": {
      const handle = getParamValue("tableHandle", node, tensorMap, context, resourceManager);
      const keys = getParamValue("keys", node, tensorMap, context);
      const defaultValue = getParamValue("defaultValue", node, tensorMap, context);
      const hashTable2 = resourceManager.getHashTableById(handle.id);
      return [await hashTable2.find(keys, defaultValue)];
    }
    case "LookupTableSize":
    case "LookupTableSizeV2": {
      const handle = getParamValue("tableHandle", node, tensorMap, context, resourceManager);
      const hashTable2 = resourceManager.getHashTableById(handle.id);
      return [hashTable2.tensorSize()];
    }
    default:
      throw TypeError(`Node type ${node.op} is not implemented`);
  }
};
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
const executeOp$9 = (node, tensorMap, context) => {
  switch (node.op) {
    case "ResizeBilinear": {
      const images = getParamValue("images", node, tensorMap, context);
      const size = getParamValue("size", node, tensorMap, context);
      const alignCorners = getParamValue("alignCorners", node, tensorMap, context);
      const halfPixelCenters = getParamValue("halfPixelCenters", node, tensorMap, context);
      return [image$1.resizeBilinear(images, [size[0], size[1]], alignCorners, halfPixelCenters)];
    }
    case "ResizeNearestNeighbor": {
      const images = getParamValue("images", node, tensorMap, context);
      const size = getParamValue("size", node, tensorMap, context);
      const alignCorners = getParamValue("alignCorners", node, tensorMap, context);
      const halfPixelCenters = getParamValue("halfPixelCenters", node, tensorMap, context);
      return [image$1.resizeNearestNeighbor(images, [size[0], size[1]], alignCorners, halfPixelCenters)];
    }
    case "CropAndResize": {
      const image2 = getParamValue("image", node, tensorMap, context);
      const boxes = getParamValue("boxes", node, tensorMap, context);
      const boxInd = getParamValue("boxInd", node, tensorMap, context);
      const cropSize = getParamValue("cropSize", node, tensorMap, context);
      const method = getParamValue("method", node, tensorMap, context);
      const extrapolationValue = getParamValue("extrapolationValue", node, tensorMap, context);
      return [image$1.cropAndResize(image2, boxes, boxInd, cropSize, method, extrapolationValue)];
    }
    default:
      throw TypeError(`Node type ${node.op} is not implemented`);
  }
};
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
const executeOp$a = (node, tensorMap, context) => {
  switch (node.op) {
    case "Equal": {
      return [equal(getParamValue("a", node, tensorMap, context), getParamValue("b", node, tensorMap, context))];
    }
    case "NotEqual": {
      return [notEqual(getParamValue("a", node, tensorMap, context), getParamValue("b", node, tensorMap, context))];
    }
    case "Greater": {
      return [greater(getParamValue("a", node, tensorMap, context), getParamValue("b", node, tensorMap, context))];
    }
    case "GreaterEqual": {
      return [greaterEqual(getParamValue("a", node, tensorMap, context), getParamValue("b", node, tensorMap, context))];
    }
    case "Less": {
      return [less(getParamValue("a", node, tensorMap, context), getParamValue("b", node, tensorMap, context))];
    }
    case "LessEqual": {
      return [lessEqual(getParamValue("a", node, tensorMap, context), getParamValue("b", node, tensorMap, context))];
    }
    case "LogicalAnd": {
      return [logicalAnd(getParamValue("a", node, tensorMap, context), getParamValue("b", node, tensorMap, context))];
    }
    case "LogicalNot": {
      return [logicalNot(getParamValue("a", node, tensorMap, context))];
    }
    case "LogicalOr": {
      return [logicalOr(getParamValue("a", node, tensorMap, context), getParamValue("b", node, tensorMap, context))];
    }
    case "Select":
    case "SelectV2": {
      return [where(getParamValue("condition", node, tensorMap, context), getParamValue("a", node, tensorMap, context), getParamValue("b", node, tensorMap, context))];
    }
    default:
      throw TypeError(`Node type ${node.op} is not implemented`);
  }
};
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
const executeOp$b = (node, tensorMap, context) => {
  switch (node.op) {
    case "BatchMatMul":
    case "BatchMatMulV2":
    case "MatMul":
      return [matMul$1(getParamValue("a", node, tensorMap, context), getParamValue("b", node, tensorMap, context), getParamValue("transposeA", node, tensorMap, context), getParamValue("transposeB", node, tensorMap, context))];
    case "Einsum":
      return [einsum(getParamValue("equation", node, tensorMap, context), ...getParamValue("tensors", node, tensorMap, context))];
    case "Transpose":
      return [transpose(getParamValue("x", node, tensorMap, context), getParamValue("perm", node, tensorMap, context))];
    case "_FusedMatMul":
      const [extraOp, activationFunc] = getParamValue("fusedOps", node, tensorMap, context);
      const isBiasAdd = extraOp === "biasadd";
      const isPrelu = activationFunc === "prelu";
      const numArgs = getParamValue("numArgs", node, tensorMap, context);
      const leakyreluAlpha = getParamValue("leakyreluAlpha", node, tensorMap, context);
      if (isBiasAdd) {
        if (isPrelu && numArgs !== 2) {
          throw new Error("Fused MatMul with BiasAdd and Prelu must have two extra arguments: bias and alpha.");
        }
        if (!isPrelu && numArgs !== 1) {
          throw new Error("Fused MatMul with BiasAdd must have one extra argument: bias.");
        }
      }
      const [biasArg, preluArg] = getParamValue("args", node, tensorMap, context);
      return [matMul({
        a: getParamValue("a", node, tensorMap, context),
        b: getParamValue("b", node, tensorMap, context),
        transposeA: getParamValue("transposeA", node, tensorMap, context),
        transposeB: getParamValue("transposeB", node, tensorMap, context),
        bias: biasArg,
        activation: activationFunc,
        preluActivationWeights: preluArg,
        leakyreluAlpha
      })];
    default:
      throw TypeError(`Node type ${node.op} is not implemented`);
  }
};
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
const executeOp$c = (node, tensorMap, context) => {
  switch (node.op) {
    case "FusedBatchNorm":
    case "FusedBatchNormV2": {
      return [batchNorm(getParamValue("x", node, tensorMap, context), getParamValue("mean", node, tensorMap, context), getParamValue("variance", node, tensorMap, context), getParamValue("offset", node, tensorMap, context), getParamValue("scale", node, tensorMap, context), getParamValue("epsilon", node, tensorMap, context))];
    }
    case "FusedBatchNormV3": {
      return [batchNorm(getParamValue("x", node, tensorMap, context), getParamValue("mean", node, tensorMap, context), getParamValue("variance", node, tensorMap, context), getParamValue("offset", node, tensorMap, context), getParamValue("scale", node, tensorMap, context), getParamValue("epsilon", node, tensorMap, context))];
    }
    case "LRN": {
      return [localResponseNormalization(getParamValue("x", node, tensorMap, context), getParamValue("radius", node, tensorMap, context), getParamValue("bias", node, tensorMap, context), getParamValue("alpha", node, tensorMap, context), getParamValue("beta", node, tensorMap, context))];
    }
    case "Softmax": {
      return [softmax(getParamValue("x", node, tensorMap, context))];
    }
    case "LogSoftmax": {
      return [logSoftmax(getParamValue("x", node, tensorMap, context))];
    }
    case "SparseToDense": {
      return [sparseToDense(getParamValue("sparseIndices", node, tensorMap, context), getParamValue("outputShape", node, tensorMap, context), getParamValue("sparseValues", node, tensorMap, context), getParamValue("defaultValue", node, tensorMap, context))];
    }
    default:
      throw TypeError(`Node type ${node.op} is not implemented`);
  }
};
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
const executeOp$d = (node, tensorMap, context) => {
  switch (node.op) {
    case "Max": {
      const axis = getParamValue("axis", node, tensorMap, context);
      const keepDims = getParamValue("keepDims", node, tensorMap, context);
      return [max(getParamValue("x", node, tensorMap, context), axis, keepDims)];
    }
    case "Mean": {
      const axis = getParamValue("axis", node, tensorMap, context);
      const keepDims = getParamValue("keepDims", node, tensorMap, context);
      return [mean(getParamValue("x", node, tensorMap, context), axis, keepDims)];
    }
    case "Min": {
      const axis = getParamValue("axis", node, tensorMap, context);
      const keepDims = getParamValue("keepDims", node, tensorMap, context);
      return [min(getParamValue("x", node, tensorMap, context), axis, keepDims)];
    }
    case "Sum": {
      const axis = getParamValue("axis", node, tensorMap, context);
      const keepDims = getParamValue("keepDims", node, tensorMap, context);
      return [sum(getParamValue("x", node, tensorMap, context), axis, keepDims)];
    }
    case "All": {
      const axis = getParamValue("axis", node, tensorMap, context);
      const keepDims = getParamValue("keepDims", node, tensorMap, context);
      return [all(getParamValue("x", node, tensorMap, context), axis, keepDims)];
    }
    case "Any": {
      const axis = getParamValue("axis", node, tensorMap, context);
      const keepDims = getParamValue("keepDims", node, tensorMap, context);
      return [any(getParamValue("x", node, tensorMap, context), axis, keepDims)];
    }
    case "ArgMax": {
      const axis = getParamValue("axis", node, tensorMap, context);
      return [argMax(getParamValue("x", node, tensorMap, context), axis)];
    }
    case "ArgMin": {
      const axis = getParamValue("axis", node, tensorMap, context);
      return [argMin(getParamValue("x", node, tensorMap, context), axis)];
    }
    case "Prod": {
      const axis = getParamValue("axis", node, tensorMap, context);
      const keepDims = getParamValue("keepDims", node, tensorMap, context);
      return [prod(getParamValue("x", node, tensorMap, context), axis, keepDims)];
    }
    case "Cumsum": {
      const axis = getParamValue("axis", node, tensorMap, context);
      const exclusive = getParamValue("exclusive", node, tensorMap, context);
      const reverse2 = getParamValue("reverse", node, tensorMap, context);
      return [cumsum(getParamValue("x", node, tensorMap, context), axis, exclusive, reverse2)];
    }
    case "Bincount":
      const x = getParamValue("x", node, tensorMap, context);
      const weights = getParamValue("weights", node, tensorMap, context);
      const size = getParamValue("size", node, tensorMap, context);
      return [bincount(x, weights, size)];
    case "DenseBincount": {
      const x2 = getParamValue("x", node, tensorMap, context);
      const weights2 = getParamValue("weights", node, tensorMap, context);
      const size2 = getParamValue("size", node, tensorMap, context);
      const binaryOutput = getParamValue("binaryOutput", node, tensorMap, context);
      return [denseBincount(x2, weights2, size2, binaryOutput)];
    }
    default:
      throw TypeError(`Node type ${node.op} is not implemented`);
  }
};
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
const executeOp$e = (node, tensorMap, context) => {
  switch (node.op) {
    case "ConcatV2":
    case "Concat": {
      const n = getParamValue("n", node, tensorMap, context);
      const axis = getParamValue("axis", node, tensorMap, context);
      let inputs = getParamValue("tensors", node, tensorMap, context);
      inputs = inputs.slice(0, n);
      return [concat(inputs, axis)];
    }
    case "Gather": {
      const input = getParamValue("x", node, tensorMap, context);
      const indices = getParamValue("indices", node, tensorMap, context);
      return [gather(input, cast(indices, "int32"), 0)];
    }
    case "GatherV2": {
      const axis = getParamValue("axis", node, tensorMap, context);
      const batchDims = getParamValue("batchDims", node, tensorMap, context);
      const input = getParamValue("x", node, tensorMap, context);
      const indices = getParamValue("indices", node, tensorMap, context);
      return [gather(input, cast(indices, "int32"), axis, batchDims)];
    }
    case "Reverse": {
      const dims = getParamValue("dims", node, tensorMap, context);
      const axis = [];
      for (let i = 0; i < dims.length; i++) {
        if (dims[i]) {
          axis.push(i);
        }
      }
      const input = getParamValue("x", node, tensorMap, context);
      return [reverse(input, axis)];
    }
    case "ReverseV2": {
      const axis = getParamValue("axis", node, tensorMap, context);
      const input = getParamValue("x", node, tensorMap, context);
      return [reverse(input, axis)];
    }
    case "Slice": {
      const begin = getParamValue("begin", node, tensorMap, context);
      const size = getParamValue("size", node, tensorMap, context);
      return [slice(getParamValue("x", node, tensorMap, context), begin, size)];
    }
    case "StridedSlice": {
      const begin = getParamValue("begin", node, tensorMap, context);
      const end = getParamValue("end", node, tensorMap, context);
      const strides = getParamValue("strides", node, tensorMap, context);
      const beginMask = getParamValue("beginMask", node, tensorMap, context);
      const endMask = getParamValue("endMask", node, tensorMap, context);
      const ellipsisMask = getParamValue("ellipsisMask", node, tensorMap, context);
      const newAxisMask = getParamValue("newAxisMask", node, tensorMap, context);
      const shrinkAxisMask = getParamValue("shrinkAxisMask", node, tensorMap, context);
      const tensor2 = getParamValue("x", node, tensorMap, context);
      return [stridedSlice(tensor2, begin, end, strides, beginMask, endMask, ellipsisMask, newAxisMask, shrinkAxisMask)];
    }
    case "Pack": {
      return tidy(() => {
        const axis = getParamValue("axis", node, tensorMap, context);
        const tensors = getParamValue("tensors", node, tensorMap, context);
        const shape = tensors[0].shape;
        const squeezedShape = squeeze(tensors[0]).shape;
        const mapped = tensors.map((tensor2) => {
          const sameShape = arraysEqual(tensor2.shape, shape);
          if (!sameShape && !arraysEqual(squeeze(tensor2).shape, squeezedShape)) {
            throw new Error("the input tensors shape does not match");
          }
          return sameShape ? tensor2 : reshape(tensor2, shape);
        });
        return [stack(mapped, axis)];
      });
    }
    case "Unpack": {
      const axis = getParamValue("axis", node, tensorMap, context);
      const tensor2 = getParamValue("tensor", node, tensorMap, context);
      return unstack(tensor2, axis);
    }
    case "Tile": {
      const reps = getParamValue("reps", node, tensorMap, context);
      return [tile(getParamValue("x", node, tensorMap, context), reps)];
    }
    case "Split":
    case "SplitV": {
      const axis = getParamValue("axis", node, tensorMap, context);
      const numOrSizeSplits = getParamValue("numOrSizeSplits", node, tensorMap, context);
      const tensor2 = getParamValue("x", node, tensorMap, context);
      return split$1(tensor2, numOrSizeSplits, axis);
    }
    case "ScatterNd": {
      const indices = getParamValue("indices", node, tensorMap, context);
      const values = getParamValue("values", node, tensorMap, context);
      const shape = getParamValue("shape", node, tensorMap, context);
      return [scatterND(indices, values, shape)];
    }
    case "GatherNd": {
      const x = getParamValue("x", node, tensorMap, context);
      const indices = getParamValue("indices", node, tensorMap, context);
      return [gatherND(x, indices)];
    }
    case "SparseToDense": {
      const indices = getParamValue("sparseIndices", node, tensorMap, context);
      const shape = getParamValue("outputShape", node, tensorMap, context);
      const sparseValues = getParamValue("sparseValues", node, tensorMap, context);
      const defaultValue = getParamValue("defaultValue", node, tensorMap, context);
      return [sparseToDense(indices, sparseValues, shape, sparseValues.dtype === defaultValue.dtype ? defaultValue : cast(defaultValue, sparseValues.dtype))];
    }
    default:
      throw TypeError(`Node type ${node.op} is not implemented`);
  }
};
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
const executeOp$f = (node, tensorMap, context) => {
  switch (node.op) {
    case "FFT": {
      return [fft(getParamValue("x", node, tensorMap, context))];
    }
    case "IFFT": {
      return [ifft(getParamValue("x", node, tensorMap, context))];
    }
    case "RFFT": {
      return [rfft(getParamValue("x", node, tensorMap, context))];
    }
    case "IRFFT": {
      return [irfft(getParamValue("x", node, tensorMap, context))];
    }
    default:
      throw TypeError(`Node type ${node.op} is not implemented`);
  }
};
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
const executeOp$g = (node, tensorMap, context) => {
  switch (node.op) {
    case "Cast": {
      return [cast(getParamValue("x", node, tensorMap, context), getParamValue("dtype", node, tensorMap, context))];
    }
    case "ExpandDims": {
      const axis = getParamValue("axis", node, tensorMap, context);
      return [expandDims(getParamValue("x", node, tensorMap, context), axis)];
    }
    case "Squeeze": {
      const axis = getParamValue("axis", node, tensorMap, context);
      return [squeeze(getParamValue("x", node, tensorMap, context), axis)];
    }
    case "Reshape": {
      return [reshape(getParamValue("x", node, tensorMap, context), getParamValue("shape", node, tensorMap, context))];
    }
    case "MirrorPad": {
      return [mirrorPad(getParamValue("x", node, tensorMap, context), getParamValue("padding", node, tensorMap, context), getParamValue("mode", node, tensorMap, context))];
    }
    case "PadV2":
    case "Pad": {
      return [pad(getParamValue("x", node, tensorMap, context), getParamValue("padding", node, tensorMap, context), getParamValue("constantValue", node, tensorMap, context))];
    }
    case "SpaceToBatchND": {
      const blockShape = getParamValue("blockShape", node, tensorMap, context);
      const paddings = getParamValue("paddings", node, tensorMap, context);
      return [spaceToBatchND(getParamValue("x", node, tensorMap, context), blockShape, paddings)];
    }
    case "BatchToSpaceND": {
      const blockShape = getParamValue("blockShape", node, tensorMap, context);
      const crops = getParamValue("crops", node, tensorMap, context);
      return [batchToSpaceND(getParamValue("x", node, tensorMap, context), blockShape, crops)];
    }
    case "DepthToSpace": {
      const blockSize = getParamValue("blockSize", node, tensorMap, context);
      const dataFormat = getParamValue("dataFormat", node, tensorMap, context).toUpperCase();
      return [depthToSpace(getParamValue("x", node, tensorMap, context), blockSize, dataFormat)];
    }
    case "BroadcastTo": {
      return [broadcastTo(getParamValue("x", node, tensorMap, context), getParamValue("shape", node, tensorMap, context))];
    }
    default:
      throw TypeError(`Node type ${node.op} is not implemented`);
  }
};
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
function executeOp$h(node, tensorMap, context, resourceManager) {
  const value = ((node2, tensorMap2, context2) => {
    switch (node2.category) {
      case "arithmetic":
        return tidy(() => executeOp(node2, tensorMap2, context2));
      case "basic_math":
        return tidy(() => executeOp$1(node2, tensorMap2, context2));
      case "control":
        return executeOp$2(node2, tensorMap2, context2);
      case "convolution":
        return tidy(() => executeOp$3(node2, tensorMap2, context2));
      case "creation":
        return tidy(() => executeOp$4(node2, tensorMap2, context2));
      case "dynamic":
        return executeOp$5(node2, tensorMap2, context2);
      case "evaluation":
        return tidy(() => executeOp$6(node2, tensorMap2, context2));
      case "image":
        return tidy(() => executeOp$9(node2, tensorMap2, context2));
      case "graph":
        return tidy(() => executeOp$7(node2, tensorMap2, context2));
      case "logical":
        return tidy(() => executeOp$a(node2, tensorMap2, context2));
      case "matrices":
        return tidy(() => executeOp$b(node2, tensorMap2, context2));
      case "normalization":
        return tidy(() => executeOp$c(node2, tensorMap2, context2));
      case "reduction":
        return tidy(() => executeOp$d(node2, tensorMap2, context2));
      case "slice_join":
        return tidy(() => executeOp$e(node2, tensorMap2, context2));
      case "spectral":
        return tidy(() => executeOp$f(node2, tensorMap2, context2));
      case "transformation":
        return tidy(() => executeOp$g(node2, tensorMap2, context2));
      case "hash_table":
        return executeOp$8(node2, tensorMap2, context2, resourceManager);
      case "custom":
        const opMapper = getRegisteredOp(node2.op);
        if (opMapper && opMapper.customExecutor) {
          return opMapper.customExecutor(new NodeValueImpl(node2, tensorMap2, context2));
        } else {
          throw TypeError(`Custom op ${node2.op} is not registered.`);
        }
      default:
        throw TypeError(`Unknown op '${node2.op}'. File an issue at https://github.com/tensorflow/tfjs/issues so we can add it, or register a custom execution with tf.registerOp()`);
    }
  })(node, tensorMap, context);
  if (isPromise(value)) {
    return value.then((data) => [].concat(data));
  }
  return [].concat(value);
}
class ExecutionContext {
  constructor(weightMap = {}, tensorArrayMap = {}, tensorListMap = {}, functionMap = {}) {
    this.weightMap = weightMap;
    this.tensorArrayMap = tensorArrayMap;
    this.tensorListMap = tensorListMap;
    this.functionMap = functionMap;
    this.rootContext = {id: 0, frameName: "", iterationId: 0};
    this.contexts = [this.rootContext];
    this.lastId = 0;
    this.generateCurrentContextIds();
  }
  newFrame(id, frameName) {
    return {id, frameName, iterationId: 0};
  }
  set currentContext(contexts) {
    if (this.contexts !== contexts) {
      this.contexts = contexts;
      this.generateCurrentContextIds();
    }
  }
  get currentContext() {
    return this.contexts;
  }
  get currentContextId() {
    return this._currentContextIds[0];
  }
  get currentContextIds() {
    return this._currentContextIds;
  }
  generateCurrentContextIds() {
    const names = [];
    for (let i = 0; i < this.contexts.length - 1; i++) {
      const contexts = this.contexts.slice(0, this.contexts.length - i);
      names.push(this.contextIdforContexts(contexts));
    }
    names.push("");
    this._currentContextIds = names;
  }
  contextIdforContexts(contexts) {
    return contexts ? contexts.map((context) => context.id === 0 && context.iterationId === 0 ? "" : `${context.frameName}-${context.iterationId}`).join("/") : "";
  }
  enterFrame(frameId) {
    if (this.contexts) {
      this.lastId++;
      this.contexts = this.contexts.slice();
      this.contexts.push(this.newFrame(this.lastId, frameId));
      this._currentContextIds.unshift(this.contextIdforContexts(this.contexts));
    }
  }
  exitFrame() {
    if (this.contexts && this.contexts.length > 1) {
      this.contexts = this.contexts.slice();
      this.contexts.splice(-1);
      this.currentContextIds.shift();
    } else {
      throw new Error("Cannot exit frame, the context is empty");
    }
  }
  nextIteration() {
    if (this.contexts && this.contexts.length > 0) {
      this.contexts = this.contexts.slice();
      this.lastId++;
      const context = Object.assign({}, this.contexts[this.contexts.length - 1]);
      context.iterationId += 1;
      context.id = this.lastId;
      this.contexts.splice(-1, 1, context);
      this._currentContextIds.splice(0, 1, this.contextIdforContexts(this.contexts));
    } else {
      throw new Error("Cannot increase frame iteration, the context is empty");
    }
  }
  getWeight(name) {
    return this.weightMap[name];
  }
  addTensorArray(tensorArray) {
    this.tensorArrayMap[tensorArray.id] = tensorArray;
  }
  getTensorArray(id) {
    return this.tensorArrayMap[id];
  }
  addTensorList(tensorList) {
    this.tensorListMap[tensorList.id] = tensorList;
  }
  getTensorList(id) {
    return this.tensorListMap[id];
  }
  dispose(keepIds) {
    for (const key in this.tensorArrayMap) {
      this.tensorArrayMap[key].clearAndClose(keepIds);
    }
    for (const key in this.tensorListMap) {
      this.tensorListMap[key].clearAndClose(keepIds);
    }
  }
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
function getExecutionSubgraph(inputs, outputs, weightMap, initNodes) {
  const usedNodes = new Set();
  const missingInputs = [];
  let dynamicNode = null;
  let syncInputs = null;
  const seen = new Set();
  const inputNodeNames = Object.keys(inputs).map((name) => parseNodeName(name)[0]);
  let initNodeNames = [];
  if (initNodes != null) {
    initNodeNames = initNodes.map((node) => parseNodeName(node.name)[0]);
  }
  const frontier = [...outputs];
  while (frontier.length > 0) {
    const node = frontier.pop();
    if (isControlFlow(node) || isDynamicShape(node) || isHashTable(node)) {
      if (dynamicNode == null) {
        dynamicNode = node;
        syncInputs = dynamicNode.children.map((child) => child.name).filter((name) => usedNodes.has(name));
      }
    }
    usedNodes.add(node.name);
    if (weightMap[node.name] != null) {
      continue;
    }
    if (inputNodeNames.indexOf(node.name) !== -1) {
      continue;
    }
    if (initNodeNames.indexOf(node.name) !== -1) {
      continue;
    }
    if (node.inputs.length === 0) {
      missingInputs.push(node.name);
      continue;
    }
    node.inputs.forEach((input) => {
      if (seen.has(input.name)) {
        return;
      }
      seen.add(input.name);
      frontier.push(input);
    });
  }
  return {inputs, outputs, usedNodes, missingInputs, dynamicNode, syncInputs};
}
function getNodesInTopologicalOrder(graph2, weightMap, executionInfo) {
  const {usedNodes, inputs} = executionInfo;
  const frontier = [];
  const inputNodes = Object.keys(inputs).map((name) => parseNodeName(name)[0]).map((name) => graph2.nodes[name]);
  const initNodes = graph2.initNodes;
  inputNodes.forEach((input) => {
    if (usedNodes.has(input.name)) {
      frontier.push(input);
    }
  });
  graph2.weights.forEach((weight) => {
    if (usedNodes.has(weight.name)) {
      frontier.push(weight);
    }
  });
  if (initNodes != null) {
    initNodes.forEach((node) => {
      if (usedNodes.has(node.name)) {
        frontier.push(node);
      }
    });
  }
  const seen = new Set();
  const orderedNodes = [];
  while (frontier.length > 0) {
    const node = frontier.pop();
    seen.add(node.name);
    if (!weightMap[node.name]) {
      orderedNodes.push(node);
    }
    node.children.forEach((child) => {
      if (!seen.has(child.name) && usedNodes.has(child.name) && child.inputs.every((input) => seen.has(input.name))) {
        frontier.push(child);
      }
    });
  }
  return orderedNodes;
}
const CONTROL_FLOW_OPS = [
  "Switch",
  "Merge",
  "Enter",
  "Exit",
  "NextIteration",
  "StatelessIf",
  "StatelessWhile",
  "if",
  "While"
];
const DYNAMIC_SHAPE_OPS = [
  "NonMaxSuppressionV2",
  "NonMaxSuppressionV3",
  "NonMaxSuppressionV5",
  "Where"
];
const HASH_TABLE_OPS = [
  "HashTable",
  "HashTableV2",
  "LookupTableImport",
  "LookupTableImportV2",
  "LookupTableFind",
  "LookupTableFindV2",
  "LookupTableSize",
  "LookupTableSizeV2"
];
function isControlFlow(node) {
  return CONTROL_FLOW_OPS.indexOf(node.op) >= 0;
}
function isDynamicShape(node) {
  return DYNAMIC_SHAPE_OPS.indexOf(node.op) >= 0;
}
function isHashTable(node) {
  return HASH_TABLE_OPS.indexOf(node.op) >= 0;
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
class GraphExecutor {
  constructor(graph2, parent) {
    this.graph = graph2;
    this.parent = parent;
    this.compiledMap = new Map();
    this._weightMap = {};
    this.SEPERATOR = ",";
    this._functions = {};
    this._functionExecutorMap = {};
    this._outputs = graph2.outputs;
    this._inputs = graph2.inputs;
    this._initNodes = graph2.initNodes;
    this._signature = graph2.signature;
    this._functions = graph2.functions;
    if (graph2.functions != null) {
      Object.keys(graph2.functions).forEach((name) => {
        this._functionExecutorMap[name] = new GraphExecutor(graph2.functions[name], this);
      });
    }
  }
  get weightIds() {
    return this.parent ? this.parent.weightIds : this._weightIds;
  }
  get functionExecutorMap() {
    return this.parent ? this.parent.functionExecutorMap : this._functionExecutorMap;
  }
  get weightMap() {
    return this.parent ? this.parent.weightMap : this._weightMap;
  }
  set weightMap(weightMap) {
    const weightIds = Object.keys(weightMap).map((key) => weightMap[key].map((tensor2) => tensor2.id));
    this._weightIds = [].concat(...weightIds);
    this._weightMap = weightMap;
  }
  set resourceManager(resourceManager) {
    this._resourceManager = resourceManager;
  }
  get inputs() {
    return this._inputs.map((node) => {
      return {
        name: node.name,
        shape: node.attrParams["shape"] ? node.attrParams["shape"].value : void 0,
        dtype: node.attrParams["dtype"] ? node.attrParams["dtype"].value : void 0
      };
    });
  }
  get outputs() {
    return this._outputs.map((node) => {
      return {
        name: node.name,
        shape: node.attrParams["shape"] ? node.attrParams["shape"].value : void 0,
        dtype: node.attrParams["dtype"] ? node.attrParams["dtype"].value : void 0
      };
    });
  }
  get inputNodes() {
    return this._inputs.map((node) => node.signatureKey || node.name);
  }
  get outputNodes() {
    return this._outputs.map((node) => {
      const name = node.signatureKey || node.name;
      return node.defaultOutput ? `${name}:${node.defaultOutput}` : name;
    });
  }
  get functions() {
    return Object.keys(this._functions).reduce((map, key) => {
      map[key] = this._functions[key].signature;
      return map;
    }, {});
  }
  getCompilationKey(inputs, outputs) {
    const sortedInputs = inputs.map((node) => node.name).sort();
    const sortedOutputs = outputs.map((node) => node.name).sort();
    return sortedInputs.join(this.SEPERATOR) + "--" + sortedOutputs.join(this.SEPERATOR);
  }
  compile(inputs, outputs) {
    const executionInfo = getExecutionSubgraph(inputs, outputs, this.weightMap, this._initNodes);
    const {missingInputs, dynamicNode, syncInputs} = executionInfo;
    if (dynamicNode != null) {
      throw new Error(`This execution contains the node '${dynamicNode.name}', which has the dynamic op '${dynamicNode.op}'. Please use model.executeAsync() instead. Alternatively, to avoid the dynamic ops, specify the inputs [${syncInputs}]`);
    }
    if (missingInputs.length > 0) {
      const outNames = outputs.map((n) => n.name);
      const inNames = Object.keys(inputs);
      throw new Error(`Cannot compute the outputs [${outNames}] from the provided inputs [${inNames}]. Missing the following inputs: [${missingInputs}]`);
    }
    return getNodesInTopologicalOrder(this.graph, this.weightMap, executionInfo);
  }
  execute(inputs, outputs) {
    inputs = this.mapInputs(inputs);
    const names = Object.keys(inputs).sort();
    this.checkInputs(inputs);
    this.checkInputShapeAndType(inputs);
    outputs = this.mapOutputs(outputs);
    this.checkOutputs(outputs);
    const inputNodes = names.map((name) => this.graph.nodes[parseNodeName(name)[0]]);
    const outputNodeNames = outputs.map((name) => parseNodeName(name)[0]);
    let outputNodes = outputNodeNames.map((name) => this.graph.nodes[name]);
    if (outputNodes.length === 0) {
      outputNodes = this._outputs;
    }
    const compilationKey = this.getCompilationKey(inputNodes, outputNodes);
    let orderedNodes = this.compiledMap.get(compilationKey);
    if (orderedNodes == null) {
      orderedNodes = this.compile(inputs, outputNodes);
      this.compiledMap.set(compilationKey, orderedNodes);
    }
    const tensorArrayMap = {};
    const tensorListMap = {};
    return tidy(() => {
      const context = new ExecutionContext(this.weightMap, tensorArrayMap, tensorListMap, this.functionExecutorMap);
      const tensorsMap = Object.assign({}, this.weightMap);
      Object.keys(inputs).forEach((name) => {
        const [nodeName, index] = parseNodeName(name);
        const tensors = [];
        tensors[index] = inputs[name];
        tensorsMap[nodeName] = tensors;
      });
      const tensorsToKeep = this.getFrozenTensorIds(tensorsMap);
      const intermediateTensorConsumerCount = {};
      for (let i = 0; i < orderedNodes.length; i++) {
        const node = orderedNodes[i];
        if (!tensorsMap[node.name]) {
          const tensors = executeOp$h(node, tensorsMap, context, this._resourceManager);
          if (isPromise(tensors)) {
            throw new Error(`The execution of the op '${node.op}' returned a promise. Please use model.executeAsync() instead.`);
          }
          tensorsMap[node.name] = tensors;
          this.checkTensorForDisposal(node.name, node, tensorsMap, context, tensorsToKeep, outputNodeNames, intermediateTensorConsumerCount);
        }
      }
      if (this.parent == null) {
        context.dispose(tensorsToKeep);
      }
      return outputs.map((name) => getTensor(name, tensorsMap, context));
    });
  }
  getFrozenTensorIds(tensorMap) {
    const ids = [].concat.apply([], Object.keys(tensorMap).map((key) => tensorMap[key]).map((tensors) => tensors.map((tensor2) => tensor2.id)));
    return new Set(ids);
  }
  checkTensorForDisposal(nodeName, node, tensorMap, context, tensorsToKeep, outputNames, intermediateTensorConsumerCount) {
    if (node.category === "control" || outputNames.indexOf(nodeName) !== -1) {
      return;
    }
    tensorMap[nodeName].forEach((tensor2) => {
      if (tensor2 != null) {
        intermediateTensorConsumerCount[tensor2.id] = (intermediateTensorConsumerCount[tensor2.id] || 0) + node.children.length;
      }
    });
    node.inputs.forEach((input) => {
      if (input.category !== "control") {
        const tensors = getTensorsForCurrentContenxt(input.name, tensorMap, context);
        if (tensors != null) {
          tensors.forEach((tensor2) => {
            if (tensor2 && !tensor2.kept && !tensorsToKeep.has(tensor2.id)) {
              const count = intermediateTensorConsumerCount[tensor2.id];
              if (count === 1) {
                tensor2.dispose();
                delete intermediateTensorConsumerCount[tensor2.id];
              } else if (count != null) {
                intermediateTensorConsumerCount[tensor2.id]--;
              }
            }
          });
        }
      }
    });
  }
  async executeAsync(inputs, outputs) {
    return this._executeAsync(inputs, outputs);
  }
  async _executeAsync(inputs, outputs, isFunctionExecution = false, tensorArrayMap = {}, tensorListMap = {}) {
    if (!isFunctionExecution) {
      inputs = this.mapInputs(inputs);
      this.checkInputs(inputs);
      this.checkInputShapeAndType(inputs);
      outputs = this.mapOutputs(outputs);
      this.checkOutputs(outputs);
    }
    const context = new ExecutionContext(this.weightMap, tensorArrayMap, tensorListMap, this.functionExecutorMap);
    const tensorMap = await this.executeWithControlFlow(inputs, context, outputs, isFunctionExecution);
    const results = outputs.map((name) => getTensor(name, tensorMap, context));
    const outputIds = results.map((t) => t.id);
    const inputIds = Object.keys(inputs).map((name) => inputs[name].id);
    const keepIds = new Set([...outputIds, ...inputIds, ...this.weightIds]);
    Object.keys(tensorMap).forEach((key) => {
      const tensorArray = tensorMap[key];
      tensorArray.forEach((tensor2) => {
        if (tensor2 && !tensor2.kept && !tensor2.isDisposed && !keepIds.has(tensor2.id)) {
          tensor2.dispose();
        }
      });
    });
    if (this.parent == null) {
      context.dispose(keepIds);
    }
    return results;
  }
  async executeFunctionAsync(inputs, tensorArrayMap, tensorListMap) {
    const mappedInputs = inputs.reduce((map, tensor2, index) => {
      map[this.inputs[index].name] = tensor2;
      return map;
    }, {});
    return this._executeAsync(mappedInputs, this.outputNodes, true, tensorArrayMap, tensorListMap);
  }
  async executeWithControlFlow(inputs, context, outputNames, isFunctionExecution) {
    const names = Object.keys(inputs);
    const inputNodes = names.map((name) => this.graph.nodes[parseNodeName(name)[0]]);
    const outputNodeNames = outputNames.map((name) => parseNodeName(name)[0]);
    let outputNodes = outputNodeNames.map((name) => this.graph.nodes[name]);
    if (outputNodes.length === 0) {
      outputNodes = this._outputs;
    }
    const {usedNodes, missingInputs, dynamicNode, syncInputs} = getExecutionSubgraph(inputs, outputNodes, this.weightMap, this._initNodes);
    const stack2 = [
      ...inputNodes,
      ...this.graph.weights,
      ...this._initNodes || []
    ].map((node) => {
      return {node, contexts: context.currentContext};
    });
    const tensorsMap = Object.assign({}, this.weightMap);
    Object.keys(inputs).forEach((name) => {
      const [nodeName, index] = parseNodeName(name);
      const tensors = [];
      tensors[index] = inputs[name];
      tensorsMap[nodeName] = tensors;
    });
    const intermediateTensorConsumerCount = {};
    const tensorsToKeep = this.getFrozenTensorIds(tensorsMap);
    const added = {};
    while (stack2.length > 0) {
      const promises = this.processStack(inputNodes, stack2, context, tensorsMap, added, tensorsToKeep, outputNodeNames, intermediateTensorConsumerCount, usedNodes);
      await Promise.all(promises);
    }
    if (dynamicNode == null && !isFunctionExecution) {
      console.warn(`This model execution did not contain any nodes with control flow or dynamic output shapes. You can use model.execute() instead.`);
    }
    const missingOutputs = outputNodes.filter((node) => !isControlFlow(node) && !getTensor(node.name, tensorsMap, context)).map((node) => node.name);
    if (missingOutputs.length > 0) {
      let alternativeMsg = "";
      if (dynamicNode != null) {
        alternativeMsg = `Alternatively, to avoid the dynamic ops, use model.execute() and specify the inputs [${syncInputs}]`;
      }
      throw new Error(`Cannot compute the outputs [${missingOutputs}] from the provided inputs [${names}]. Consider providing the following inputs: [${missingInputs}]. ${alternativeMsg}`);
    }
    return tensorsMap;
  }
  processStack(inputNodes, stack2, context, tensorMap, added, tensorsToKeep, outputNames, intermediateTensorConsumerCount, usedNodes) {
    const promises = [];
    while (stack2.length > 0) {
      const item = stack2.pop();
      context.currentContext = item.contexts;
      let nodeName = "";
      if (item.node.op === "Enter" && getParamValue("isConstant", item.node, tensorMap, context)) {
        [nodeName] = getNodeNameAndIndex(item.node.name, context);
      }
      if (tensorMap[item.node.name] == null) {
        const tensors = executeOp$h(item.node, tensorMap, context, this._resourceManager);
        if (!nodeName) {
          [nodeName] = getNodeNameAndIndex(item.node.name, context);
        }
        const currentContext = context.currentContext;
        if (isPromise(tensors)) {
          promises.push(tensors.then((t) => {
            tensorMap[nodeName] = t;
            context.currentContext = currentContext;
            this.checkTensorForDisposal(nodeName, item.node, tensorMap, context, tensorsToKeep, outputNames, intermediateTensorConsumerCount);
            this.processChildNodes(item.node, stack2, context, tensorMap, added, usedNodes);
            return t;
          }));
        } else {
          tensorMap[nodeName] = tensors;
          this.checkTensorForDisposal(nodeName, item.node, tensorMap, context, tensorsToKeep, outputNames, intermediateTensorConsumerCount);
          this.processChildNodes(item.node, stack2, context, tensorMap, added, usedNodes);
        }
      } else {
        this.processChildNodes(item.node, stack2, context, tensorMap, added, usedNodes);
      }
    }
    return promises;
  }
  processChildNodes(node, stack2, context, tensorMap, added, usedNodes) {
    node.children.forEach((childNode) => {
      const [nodeName] = getNodeNameAndIndex(childNode.name, context);
      if (added[nodeName] || !usedNodes.has(childNode.name)) {
        return;
      }
      if (childNode.op === "Merge") {
        if (childNode.inputNames.some((name) => {
          return !!getTensor(name, tensorMap, context);
        })) {
          added[nodeName] = true;
          stack2.push({contexts: context.currentContext, node: childNode});
        }
      } else if (childNode.inputNames.every((name) => {
        return !!getTensor(name, tensorMap, context);
      })) {
        added[nodeName] = true;
        stack2.push({contexts: context.currentContext, node: childNode});
      }
    });
  }
  dispose() {
    Object.keys(this.weightMap).forEach((key) => this.weightMap[key].forEach((tensor2) => tensor2.dispose()));
  }
  checkInputShapeAndType(inputs) {
    Object.keys(inputs).forEach((name) => {
      const input = inputs[name];
      const [nodeName] = parseNodeName(name);
      const node = this.graph.nodes[nodeName];
      if (node.attrParams["shape"] && node.attrParams["shape"].value) {
        const shape = node.attrParams["shape"].value;
        const match = shape.length === input.shape.length && input.shape.every((dim, index) => shape[index] === -1 || shape[index] === dim);
        assert(match, () => `The shape of dict['${node.name}'] provided in model.execute(dict) must be [${shape}], but was [${input.shape}]`);
      }
      if (node.attrParams["dtype"] && node.attrParams["dtype"].value) {
        assert(input.dtype === node.attrParams["dtype"].value, () => `The dtype of dict['${node.name}'] provided in model.execute(dict) must be ${node.attrParams["dtype"].value}, but was ${input.dtype}`);
      }
    });
  }
  mapInputs(inputs) {
    const result = {};
    for (const inputName in inputs) {
      if (this._signature != null && this._signature.inputs != null && this._signature.inputs[inputName] != null) {
        const tensor2 = this._signature.inputs[inputName];
        result[tensor2.name] = inputs[inputName];
      } else {
        result[inputName] = inputs[inputName];
      }
    }
    return result;
  }
  checkInputs(inputs) {
    const notInGraph = Object.keys(inputs).filter((name) => {
      const [nodeName] = parseNodeName(name);
      return this.graph.nodes[nodeName] == null;
    });
    if (notInGraph.length > 0) {
      throw new Error(`The dict provided in model.execute(dict) has keys: [${notInGraph}] that are not part of graph`);
    }
  }
  mapOutputs(outputs) {
    return outputs.map((name) => {
      if (this._signature != null && this._signature.outputs != null && this._signature.outputs[name] != null) {
        const tensor2 = this._signature.outputs[name];
        return tensor2.name;
      }
      return name;
    }, {});
  }
  checkOutputs(outputs) {
    outputs.forEach((name) => {
      const [normalizedName] = parseNodeName(name);
      if (!this.graph.nodes[normalizedName]) {
        throw new Error(`The output '${name}' is not found in the graph`);
      }
    });
  }
}
class ResourceManager {
  constructor(hashTableNameToHandle = {}, hashTableMap = {}) {
    this.hashTableNameToHandle = hashTableNameToHandle;
    this.hashTableMap = hashTableMap;
  }
  addHashTable(name, hashTable2) {
    this.hashTableNameToHandle[name] = hashTable2.handle;
    this.hashTableMap[hashTable2.id] = hashTable2;
  }
  getHashTableHandleByName(name) {
    return this.hashTableNameToHandle[name];
  }
  getHashTableById(id) {
    return this.hashTableMap[id];
  }
  dispose() {
    for (const key in this.hashTableMap) {
      this.hashTableMap[key].clearAndClose();
      delete this.hashTableMap[key];
    }
    for (const name in this.hashTableNameToHandle) {
      this.hashTableNameToHandle[name].dispose();
      delete this.hashTableNameToHandle[name];
    }
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
const TFHUB_SEARCH_PARAM = "?tfjs-format=file";
const DEFAULT_MODEL_NAME = "model.json";
class GraphModel {
  constructor(modelUrl, loadOptions = {}) {
    this.modelUrl = modelUrl;
    this.loadOptions = loadOptions;
    this.version = "n/a";
    if (loadOptions == null) {
      this.loadOptions = {};
    }
    this.resourceManager = new ResourceManager();
  }
  get modelVersion() {
    return this.version;
  }
  get inputNodes() {
    return this.executor.inputNodes;
  }
  get outputNodes() {
    return this.executor.outputNodes;
  }
  get inputs() {
    return this.executor.inputs;
  }
  get outputs() {
    return this.executor.outputs;
  }
  get weights() {
    return this.executor.weightMap;
  }
  get metadata() {
    return this.artifacts.userDefinedMetadata;
  }
  get modelSignature() {
    return this.signature;
  }
  findIOHandler() {
    const path = this.modelUrl;
    if (path.load != null) {
      this.handler = path;
    } else if (this.loadOptions.requestInit != null) {
      this.handler = browserHTTPRequest(path, this.loadOptions);
    } else {
      const handlers = getLoadHandlers(path, this.loadOptions);
      if (handlers.length === 0) {
        handlers.push(browserHTTPRequest(path, this.loadOptions));
      } else if (handlers.length > 1) {
        throw new Error(`Found more than one (${handlers.length}) load handlers for URL '${[path]}'`);
      }
      this.handler = handlers[0];
    }
  }
  async load() {
    this.findIOHandler();
    if (this.handler.load == null) {
      throw new Error("Cannot proceed with model loading because the IOHandler provided does not have the `load` method implemented.");
    }
    const artifacts = await this.handler.load();
    return this.loadSync(artifacts);
  }
  loadSync(artifacts) {
    this.artifacts = artifacts;
    const graph2 = this.artifacts.modelTopology;
    let signature;
    if (this.artifacts.userDefinedMetadata != null && this.artifacts.userDefinedMetadata.signature != null) {
      signature = this.artifacts.userDefinedMetadata.signature;
    } else {
      signature = this.artifacts.signature;
    }
    this.signature = signature;
    this.version = `${graph2.versions.producer}.${graph2.versions.minConsumer}`;
    const weightMap = decodeWeights(this.artifacts.weightData, this.artifacts.weightSpecs);
    this.executor = new GraphExecutor(OperationMapper.Instance.transformGraph(graph2, this.signature));
    this.executor.weightMap = this.convertTensorMapToTensorsMap(weightMap);
    this.executor.resourceManager = this.resourceManager;
    if (artifacts.modelInitializer != null && artifacts.modelInitializer.node != null) {
      const initializer = OperationMapper.Instance.transformGraph(artifacts.modelInitializer);
      this.initializer = new GraphExecutor(initializer);
      this.initializer.weightMap = this.executor.weightMap;
      this.initializer.resourceManager = this.resourceManager;
      this.initializer.executeAsync({}, []);
    }
    return true;
  }
  async save(handlerOrURL, config) {
    if (typeof handlerOrURL === "string") {
      const handlers = getSaveHandlers(handlerOrURL);
      if (handlers.length === 0) {
        throw new Error(`Cannot find any save handlers for URL '${handlerOrURL}'`);
      } else if (handlers.length > 1) {
        throw new Error(`Found more than one (${handlers.length}) save handlers for URL '${handlerOrURL}'`);
      }
      handlerOrURL = handlers[0];
    }
    if (handlerOrURL.save == null) {
      throw new Error("GraphModel.save() cannot proceed because the IOHandler provided does not have the `save` attribute defined.");
    }
    return handlerOrURL.save(this.artifacts);
  }
  predict(inputs, config) {
    return this.execute(inputs, this.outputNodes);
  }
  normalizeInputs(inputs) {
    if (!(inputs instanceof Tensor) && !Array.isArray(inputs)) {
      return inputs;
    }
    inputs = Array.isArray(inputs) ? inputs : [inputs];
    if (inputs.length !== this.inputNodes.length) {
      throw new Error(`Input tensor count mismatch,the graph model has ${this.inputNodes.length} placeholders, while there are ${inputs.length} input tensors.`);
    }
    return this.inputNodes.reduce((map, inputName, i) => {
      map[inputName] = inputs[i];
      return map;
    }, {});
  }
  normalizeOutputs(outputs) {
    outputs = outputs || this.outputNodes;
    return !Array.isArray(outputs) ? [outputs] : outputs;
  }
  execute(inputs, outputs) {
    inputs = this.normalizeInputs(inputs);
    outputs = this.normalizeOutputs(outputs);
    const result = this.executor.execute(inputs, outputs);
    return result.length > 1 ? result : result[0];
  }
  async executeAsync(inputs, outputs) {
    inputs = this.normalizeInputs(inputs);
    outputs = this.normalizeOutputs(outputs);
    const result = await this.executor.executeAsync(inputs, outputs);
    return result.length > 1 ? result : result[0];
  }
  convertTensorMapToTensorsMap(map) {
    return Object.keys(map).reduce((newMap, key) => {
      newMap[key] = [map[key]];
      return newMap;
    }, {});
  }
  dispose() {
    this.executor.dispose();
    if (this.initializer) {
      this.initializer.dispose();
    }
    this.resourceManager.dispose();
  }
}
async function loadGraphModel(modelUrl, options = {}) {
  if (modelUrl == null) {
    throw new Error("modelUrl in loadGraphModel() cannot be null. Please provide a url or an IOHandler that loads the model");
  }
  if (options == null) {
    options = {};
  }
  if (options.fromTFHub) {
    if (modelUrl.load == null) {
      if (!modelUrl.endsWith("/")) {
        modelUrl = modelUrl + "/";
      }
      modelUrl = `${modelUrl}${DEFAULT_MODEL_NAME}${TFHUB_SEARCH_PARAM}`;
    }
  }
  const model = new GraphModel(modelUrl, options);
  await model.load();
  return model;
}
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
function __awaiter(e, t, n, r) {
  return new (n || (n = Promise))(function(o, i) {
    function a(e2) {
      try {
        c(r.next(e2));
      } catch (e3) {
        i(e3);
      }
    }
    function s(e2) {
      try {
        c(r.throw(e2));
      } catch (e3) {
        i(e3);
      }
    }
    function c(e2) {
      var t2;
      e2.done ? o(e2.value) : (t2 = e2.value, t2 instanceof n ? t2 : new n(function(e3) {
        e3(t2);
      })).then(a, s);
    }
    c((r = r.apply(e, t || [])).next());
  });
}
function __generator(e, t) {
  var n, r, o, i, a = {label: 0, sent: function() {
    if (1 & o[0])
      throw o[1];
    return o[1];
  }, trys: [], ops: []};
  return i = {next: s(0), throw: s(1), return: s(2)}, typeof Symbol == "function" && (i[Symbol.iterator] = function() {
    return this;
  }), i;
  function s(i2) {
    return function(s2) {
      return function(i3) {
        if (n)
          throw new TypeError("Generator is already executing.");
        for (; a; )
          try {
            if (n = 1, r && (o = 2 & i3[0] ? r.return : i3[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i3[1])).done)
              return o;
            switch (r = 0, o && (i3 = [2 & i3[0], o.value]), i3[0]) {
              case 0:
              case 1:
                o = i3;
                break;
              case 4:
                return a.label++, {value: i3[1], done: false};
              case 5:
                a.label++, r = i3[1], i3 = [0];
                continue;
              case 7:
                i3 = a.ops.pop(), a.trys.pop();
                continue;
              default:
                if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (i3[0] === 6 || i3[0] === 2)) {
                  a = 0;
                  continue;
                }
                if (i3[0] === 3 && (!o || i3[1] > o[0] && i3[1] < o[3])) {
                  a.label = i3[1];
                  break;
                }
                if (i3[0] === 6 && a.label < o[1]) {
                  a.label = o[1], o = i3;
                  break;
                }
                if (o && a.label < o[2]) {
                  a.label = o[2], a.ops.push(i3);
                  break;
                }
                o[2] && a.ops.pop(), a.trys.pop();
                continue;
            }
            i3 = t.call(e, a);
          } catch (e2) {
            i3 = [6, e2], r = 0;
          } finally {
            n = o = 0;
          }
        if (5 & i3[0])
          throw i3[1];
        return {value: i3[0] ? i3[1] : void 0, done: true};
      }([i2, s2]);
    };
  }
}
var disposeBox = function(e) {
  e.startEndTensor.dispose(), e.startPoint.dispose(), e.endPoint.dispose();
}, createBox = function(e) {
  return {startEndTensor: e, startPoint: slice(e, [0, 0], [-1, 2]), endPoint: slice(e, [0, 2], [-1, 2])};
}, scaleBox = function(e, t) {
  var n = mul(e.startPoint, t), r = mul(e.endPoint, t), o = concat2d([n, r], 1);
  return createBox(o);
}, ANCHORS_CONFIG = {strides: [8, 16], anchors: [2, 6]}, NUM_LANDMARKS = 6;
function generateAnchors(e, t, n) {
  for (var r = [], o = 0; o < n.strides.length; o++)
    for (var i = n.strides[o], a = Math.floor((t + i - 1) / i), s = Math.floor((e + i - 1) / i), c = n.anchors[o], l = 0; l < a; l++)
      for (var u = i * (l + 0.5), d = 0; d < s; d++)
        for (var h = i * (d + 0.5), f = 0; f < c; f++)
          r.push([h, u]);
  return r;
}
function decodeBounds(e, t, n) {
  var r = slice(e, [0, 1], [-1, 2]), o = add(r, t), i = slice(e, [0, 3], [-1, 2]), a = div(i, n), s = div(o, n), c = div(a, 2), l = sub(s, c), u = add(s, c), d = mul(l, n), h = mul(u, n);
  return concat2d([d, h], 1);
}
function getInputTensorDimensions(e) {
  return e instanceof Tensor ? [e.shape[0], e.shape[1]] : [e.height, e.width];
}
function flipFaceHorizontal(e, t) {
  var n, r, o;
  if (e.topLeft instanceof Tensor && e.bottomRight instanceof Tensor) {
    var i = tidy(function() {
      return [concat([slice(sub(t - 1, e.topLeft), 0, 1), slice(e.topLeft, 1, 1)]), concat([sub(t - 1, slice(e.bottomRight, 0, 1)), slice(e.bottomRight, 1, 1)])];
    });
    n = i[0], r = i[1], e.landmarks != null && (o = tidy(function() {
      var n2 = sub(tensor1d([t - 1, 0]), e.landmarks), r2 = tensor1d([1, -1]);
      return mul(n2, r2);
    }));
  } else {
    var a = e.topLeft, s = a[0], c = a[1], l = e.bottomRight, u = l[0], d = l[1];
    n = [t - 1 - s, c], r = [t - 1 - u, d], e.landmarks != null && (o = e.landmarks.map(function(e2) {
      return [t - 1 - e2[0], e2[1]];
    }));
  }
  var h = {topLeft: n, bottomRight: r};
  return o != null && (h.landmarks = o), e.probability != null && (h.probability = e.probability instanceof Tensor ? e.probability.clone() : e.probability), h;
}
function scaleBoxFromPrediction(e, t) {
  return tidy(function() {
    var n;
    return n = e.hasOwnProperty("box") ? e.box : e, squeeze(scaleBox(n, t).startEndTensor);
  });
}
var BlazeFaceModel = function() {
  function e(e2, t, n, r, o, i) {
    this.blazeFaceModel = e2, this.width = t, this.height = n, this.maxFaces = r, this.anchorsData = generateAnchors(t, n, ANCHORS_CONFIG), this.anchors = tensor2d(this.anchorsData), this.inputSizeData = [t, n], this.inputSize = tensor1d([t, n]), this.iouThreshold = o, this.scoreThreshold = i;
  }
  return e.prototype.getBoundingBoxes = function(e2, t, n) {
    return n === void 0 && (n = true), __awaiter(this, void 0, void 0, function() {
      var r, o, i, a, s, c, l, u, d, h, f, p, b, m, v = this;
      return __generator(this, function(y) {
        switch (y.label) {
          case 0:
            return r = tidy(function() {
              var t2 = image$1.resizeBilinear(e2, [v.width, v.height]), n2 = mul(sub(div(t2, 255), 0.5), 2), r2 = v.blazeFaceModel.predict(n2), o2 = squeeze(r2), i2 = decodeBounds(o2, v.anchors, v.inputSize), a2 = slice(o2, [0, 0], [-1, 1]);
              return [o2, i2, squeeze(sigmoid(a2))];
            }), o = r[0], i = r[1], a = r[2], s = console.warn, console.warn = function() {
            }, c = image$1.nonMaxSuppression(i, a, this.maxFaces, this.iouThreshold, this.scoreThreshold), console.warn = s, [4, c.array()];
          case 1:
            return l = y.sent(), c.dispose(), u = l.map(function(e3) {
              return slice(i, [e3, 0], [1, -1]);
            }), t ? [3, 3] : [4, Promise.all(u.map(function(e3) {
              return __awaiter(v, void 0, void 0, function() {
                var t2;
                return __generator(this, function(n2) {
                  switch (n2.label) {
                    case 0:
                      return [4, e3.array()];
                    case 1:
                      return t2 = n2.sent(), e3.dispose(), [2, t2];
                  }
                });
              });
            }))];
          case 2:
            u = y.sent(), y.label = 3;
          case 3:
            for (d = e2.shape[1], h = e2.shape[2], f = t ? div([h, d], this.inputSize) : [h / this.inputSizeData[0], d / this.inputSizeData[1]], p = [], b = function(e3) {
              var r2 = u[e3], i2 = tidy(function() {
                var i3 = createBox(r2 instanceof Tensor ? r2 : tensor2d(r2));
                if (!n)
                  return i3;
                var s2, c2 = l[e3];
                return s2 = t ? slice(v.anchors, [c2, 0], [1, 2]) : v.anchorsData[c2], {box: i3, landmarks: reshape(squeeze(slice(o, [c2, NUM_LANDMARKS - 1], [1, -1])), [NUM_LANDMARKS, -1]), probability: slice(a, [c2], [1]), anchor: s2};
              });
              p.push(i2);
            }, m = 0; m < u.length; m++)
              b(m);
            return i.dispose(), a.dispose(), o.dispose(), [2, {boxes: p, scaleFactor: f}];
        }
      });
    });
  }, e.prototype.estimateFaces = function(e2, t, n, r) {
    return t === void 0 && (t = false), n === void 0 && (n = false), r === void 0 && (r = true), __awaiter(this, void 0, void 0, function() {
      var o, i, a, s, c, l, u = this;
      return __generator(this, function(d) {
        switch (d.label) {
          case 0:
            return o = getInputTensorDimensions(e2), i = o[1], a = tidy(function() {
              return e2 instanceof Tensor || (e2 = fromPixels(e2)), expandDims(cast(e2, "float32"), 0);
            }), [4, this.getBoundingBoxes(a, t, r)];
          case 1:
            return s = d.sent(), c = s.boxes, l = s.scaleFactor, a.dispose(), t ? [2, c.map(function(e3) {
              var t2 = scaleBoxFromPrediction(e3, l), o2 = {topLeft: slice(t2, [0], [2]), bottomRight: slice(t2, [2], [2])};
              if (r) {
                var a2 = e3, s2 = a2.landmarks, c2 = a2.probability, u2 = a2.anchor, d2 = mul(add(s2, u2), l);
                o2.landmarks = d2, o2.probability = c2;
              }
              return n && (o2 = flipFaceHorizontal(o2, i)), o2;
            })] : [2, Promise.all(c.map(function(e3) {
              return __awaiter(u, void 0, void 0, function() {
                var t2, o2, a2, s2, c2, u2, d2, h, f, p, b, m = this;
                return __generator(this, function(v) {
                  switch (v.label) {
                    case 0:
                      return t2 = scaleBoxFromPrediction(e3, l), r ? [3, 2] : [4, t2.array()];
                    case 1:
                      return c2 = v.sent(), o2 = {topLeft: c2.slice(0, 2), bottomRight: c2.slice(2)}, [3, 4];
                    case 2:
                      return [4, Promise.all([e3.landmarks, t2, e3.probability].map(function(e4) {
                        return __awaiter(m, void 0, void 0, function() {
                          return __generator(this, function(t3) {
                            return [2, e4.array()];
                          });
                        });
                      }))];
                    case 3:
                      a2 = v.sent(), s2 = a2[0], c2 = a2[1], u2 = a2[2], d2 = e3.anchor, f = (h = l)[0], p = h[1], b = s2.map(function(e4) {
                        return [(e4[0] + d2[0]) * f, (e4[1] + d2[1]) * p];
                      }), o2 = {topLeft: c2.slice(0, 2), bottomRight: c2.slice(2), landmarks: b, probability: u2}, disposeBox(e3.box), e3.landmarks.dispose(), e3.probability.dispose(), v.label = 4;
                    case 4:
                      return t2.dispose(), n && (o2 = flipFaceHorizontal(o2, i)), [2, o2];
                  }
                });
              });
            }))];
        }
      });
    });
  }, e;
}(), BLAZEFACE_MODEL_URL = "https://tfhub.dev/tensorflow/tfjs-model/blazeface/1/default/1";
function load(e) {
  var t = e === void 0 ? {} : e, n = t.maxFaces, r = n === void 0 ? 10 : n, o = t.inputWidth, i = o === void 0 ? 128 : o, a = t.inputHeight, s = a === void 0 ? 128 : a, c = t.iouThreshold, l = c === void 0 ? 0.3 : c, u = t.scoreThreshold, d = u === void 0 ? 0.75 : u, h = t.modelUrl;
  return __awaiter(this, void 0, void 0, function() {
    var e2;
    return __generator(this, function(t2) {
      switch (t2.label) {
        case 0:
          return h == null ? [3, 2] : [4, loadGraphModel(h)];
        case 1:
          return e2 = t2.sent(), [3, 4];
        case 2:
          return [4, loadGraphModel(BLAZEFACE_MODEL_URL, {fromTFHub: true})];
        case 3:
          e2 = t2.sent(), t2.label = 4;
        case 4:
          return [2, new BlazeFaceModel(e2, i, s, r, l, d)];
      }
    });
  });
}
export {BlazeFaceModel, load};
