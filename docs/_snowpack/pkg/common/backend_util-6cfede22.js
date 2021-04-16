import { w as sizeFromShape, ch as computeStrides, f as assert, cE as clamp, cF as nearestDivisor, e as env, cG as decodeString, cH as encodeString, cI as upcastType, cJ as axesAreInnerMostDims, cK as combineLocations, cb as computeOutAndReduceShapes, aY as expandShapeToKeepDim, ca as assertAxesAreInnerMostDims, c8 as getAxesPermutation, cj as getUndoAxesPermutation, c9 as getInnerMostAxes, c6 as getBroadcastDims, cL as getReductionAxes, at as assertAndGetBroadcastShape, cM as computeDilation2DInfo, cc as computePool2DInfo, cN as computePool3DInfo, bP as computeConv2DInfo, cO as computeConv3DInfo, cP as computeDefaultPad, bS as tupleValuesAreOne, a4 as eitherStridesOrDilationsAreOne, ci as convertConv2DDataFormat, bR as getFusedDyActivation, bT as getFusedBiasGradient, bO as applyActivation, bN as shouldFuse, cQ as validateUpdateShape, bI as validateInput, cp as calculateShapes } from './fused_util-15f1054e.js';

/**
 * Validate gather nd inputs.
 *
 * @param tensor The tensor contains the source values.
 * @param indices The tensor contains the indices to slice the source.
 *
 * @returns [resultShape, numUpdates, sliceSize, strides]
 */
function prepareAndValidate(tensor, indices) {
    const tensorRank = tensor.shape.length;
    const indicesRank = indices.shape.length;
    if (tensorRank < 1) {
        throw new Error('tf.gatherND() expects the input to be rank 1 or higher,' +
            ` but the rank was ${tensorRank}.`);
    }
    if (indicesRank < 1) {
        throw new Error('tf.gatherND() expects the indices to be rank 1 or higher,' +
            ` but the rank was ${indicesRank}.`);
    }
    if (indices.dtype !== 'int32') {
        throw new Error('tf.gatherND() expects the indices to be int32 type,' +
            ` but the dtype was ${indices.dtype}.`);
    }
    if (indices.shape[indicesRank - 1] > tensorRank) {
        throw new Error('index innermost dimension length must be <= tensor rank; saw: ' +
            `${indices.shape[indicesRank - 1]} vs. ${tensorRank}`);
    }
    if (sizeFromShape(tensor.shape) === 0) {
        throw new Error('Requested more than 0 entries, but input is empty.' +
            ` Input shape: ${tensor.shape}.`);
    }
    const indicesShape = indices.shape;
    const sliceRank = indicesShape[indicesShape.length - 1];
    // The result shape is
    //   indices.shape[:-1] + params.shape[indices.shape[-1]:]
    let nResult = 1;
    for (let i = 0; i < indicesShape.length - 1; ++i) {
        nResult *= indicesShape[i];
    }
    const inputShape = tensor.shape;
    const resultShape = indicesShape.slice();
    resultShape.pop();
    let sliceSize = 1;
    for (let i = sliceRank; i < tensorRank; ++i) {
        sliceSize *= inputShape[i];
        resultShape.push(inputShape[i]);
    }
    const strides = [...computeStrides(tensor.shape).map(stride => stride / sliceSize),
        1].slice(0, sliceRank);
    return [resultShape, nResult, sliceSize, strides];
}

var gather_nd_util = /*#__PURE__*/Object.freeze({
    __proto__: null,
    prepareAndValidate: prepareAndValidate
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
function assertParamsValid(input, begin, size) {
    const inputRank = input.shape.length;
    assert(inputRank === begin.length, () => `Error in slice${inputRank}D: Length of begin ${begin} must ` +
        `match the rank of the array (${inputRank}).`);
    assert(inputRank === size.length, () => `Error in slice${inputRank}D: Length of size ${size} must ` +
        `match the rank of the array (${inputRank}).`);
    for (let i = 0; i < inputRank; ++i) {
        assert(begin[i] + size[i] <= input.shape[i], () => `Error in slice${inputRank}D: begin[${i}] + size[${i}] ` +
            `(${begin[i] + size[i]}) would overflow input.shape[${i}] (${input.shape[i]})`);
    }
}
/** Converts a binary mask to an array of axes. Used in stridedSlice(). */
function maskToAxes(mask) {
    const axes = [];
    let axis = 0;
    while (mask > 0) {
        if (mask & 1) {
            axes.push(axis);
        }
        mask /= 2;
        axis++;
    }
    return axes;
}
/** Computes the output shape given the strided slice params. */
function computeOutShape(begin, end, strides) {
    const size = [];
    for (let axis = 0; axis < begin.length; axis++) {
        size[axis] = Math.ceil((end[axis] - begin[axis]) / strides[axis]);
    }
    return size;
}
// Creates full selection at the elided dimensions. If the dimension matches
// the ellipsis mask, override the current stride value. Otherwise, insert.
function stridesWithElidedDims(strides, ellipsisInsertionIndex, numElidedAxes, inputShape) {
    const newStrides = [...strides];
    for (let i = newStrides.length; i < inputShape.length; i++) {
        newStrides.push(1);
    }
    for (let i = 0; i < numElidedAxes; i++) {
        if (i === 0) {
            newStrides[ellipsisInsertionIndex] = 1;
        }
        else {
            newStrides.splice(ellipsisInsertionIndex, 0 /* num elements to delete */, 1 /* element to add */);
            newStrides.pop();
        }
    }
    return newStrides;
}
function unnormalizeAxis(ellipsisInsertionIndex, numElidedAxes, normalizedAxis) {
    if (normalizedAxis <= ellipsisInsertionIndex) {
        return normalizedAxis;
    }
    return normalizedAxis - (numElidedAxes - 1);
}
function getElidedAxes(numElidedAxes, ellipsisInsertionIndex) {
    const elidedAxes = [];
    for (let i = 0; i < numElidedAxes; i++) {
        elidedAxes.push(ellipsisInsertionIndex + i);
    }
    return elidedAxes;
}
// Normalize the start, end and strides.
function getNormalizedAxes(inputShape, ellipsisAxes, numInterpolatedAxes, begin, end, strides, beginMask, endMask, ellipsisMask) {
    const inputRank = inputShape.length;
    let normalizedBegin = new Array(inputRank), normalizedEnd = new Array(inputRank), normalizedStrides = new Array(inputRank);
    if (ellipsisAxes.length && numInterpolatedAxes > 0) {
        const fullIndex = ellipsisAxes[0];
        // The ellipsis applies to the masked index as well as any dimensions
        // that are interpolated.
        const numElidedAxes = numInterpolatedAxes + 1;
        normalizedBegin = startIndicesWithElidedDims(beginMask, fullIndex, numElidedAxes, begin, inputShape);
        normalizedEnd = stopIndicesWithElidedDims(endMask, fullIndex, numElidedAxes, end, inputShape);
        normalizedStrides =
            stridesWithElidedDims(strides, fullIndex, numElidedAxes, inputShape);
    }
    else {
        for (let axis = 0; axis < inputRank; axis++) {
            normalizedBegin[axis] = startForAxis(beginMask, begin, strides, inputShape, axis, ellipsisMask);
            normalizedEnd[axis] =
                stopForAxis(endMask, end, strides, inputShape, axis, ellipsisMask);
            normalizedStrides[axis] = stridesForAxis(strides, axis, ellipsisMask);
        }
    }
    return {
        begin: normalizedBegin,
        end: normalizedEnd,
        strides: normalizedStrides
    };
}
// Creates full selection at the elided dimensions. If the dimension matches
// the ellipsis mask, override the current start value. Otherwise, insert.
function startIndicesWithElidedDims(beginMask, ellipsisInsertionIndex, numElidedAxes, originalBegin, inputShape) {
    const newIndices = [...inputShape];
    const elidedAxes = getElidedAxes(numElidedAxes, ellipsisInsertionIndex);
    for (let axis = 0; axis < newIndices.length; axis++) {
        if (elidedAxes.indexOf(axis) > -1) {
            newIndices[axis] = 0;
        }
        else {
            const originalAxis = unnormalizeAxis(ellipsisInsertionIndex, numElidedAxes, axis);
            let originalValue = originalBegin[originalAxis];
            if (beginMask & 1 << originalAxis) {
                originalValue = 0;
            }
            newIndices[axis] = originalValue;
        }
    }
    return newIndices;
}
// Creates full selection at the elided dimensions. If the dimension matches
// the ellipsis mask, override the current stop value. Otherwise, insert.
function stopIndicesWithElidedDims(endMask, ellipsisInsertionIndex, numElidedAxes, originalEnd, inputShape) {
    const newIndices = [...inputShape];
    const elidedAxes = getElidedAxes(numElidedAxes, ellipsisInsertionIndex);
    for (let axis = 0; axis < newIndices.length; axis++) {
        if (elidedAxes.indexOf(axis) > -1) {
            newIndices[axis] = Number.MAX_SAFE_INTEGER;
        }
        else {
            const originalAxis = unnormalizeAxis(ellipsisInsertionIndex, numElidedAxes, axis);
            let originalValue = originalEnd[originalAxis];
            if (endMask & 1 << originalAxis) {
                originalValue = Number.MAX_SAFE_INTEGER;
            }
            newIndices[axis] = originalValue;
        }
    }
    for (let i = 0; i < newIndices.length; i++) {
        // Handle negative indices
        const axisSize = inputShape[i];
        if (newIndices[i] < 0) {
            newIndices[i] += axisSize;
        }
        newIndices[i] = clamp(0, newIndices[i], inputShape[i]);
    }
    return newIndices;
}
function stridesForAxis(strides, axis, ellipsisMask) {
    let stride = strides[axis];
    if (ellipsisMask & (1 << axis) || stride == null) {
        stride = 1;
    }
    return stride;
}
function startForAxis(beginMask, startIndices, strides, inputShape, axis, ellipsisMask) {
    // Begin with the specified index
    let start = startIndices[axis];
    const stride = strides[axis] || 1;
    // Check the axis bit from right of masked axes, or the begin index is not set
    // for the axis.
    if (beginMask & 1 << axis || ellipsisMask & 1 << axis || start == null) {
        if (stride > 0) {
            // Forward iteration - use the first element. These values will get
            // clamped below (Note: We could have set them to 0 and axis_size-1, but
            // use lowest() and max() to maintain symmetry with StopForAxis())
            start = Number.MIN_SAFE_INTEGER;
        }
        else {
            // Backward iteration - use the last element.
            start = Number.MAX_SAFE_INTEGER;
        }
    }
    // Handle negative indices
    const axisSize = inputShape[axis];
    if (start < 0) {
        start += axisSize;
    }
    // Clamping
    start = clamp(0, start, axisSize - 1);
    return start;
}
function stopForAxis(endMask, stopIndices, strides, inputShape, axis, ellipsisMask) {
    // Begin with the specified index
    let stop = stopIndices[axis];
    const stride = strides[axis] || 1;
    // Check the axis bit from right of masked axes, or if the stop index is not
    // set for this axis.
    if (endMask & (1 << axis) || ellipsisMask & (1 << axis) || stop == null) {
        if (stride > 0) {
            // Forward iteration - use the last element. These values will get
            // clamped below
            stop = Number.MAX_SAFE_INTEGER;
        }
        else {
            // Backward iteration - use the first element.
            stop = Number.MIN_SAFE_INTEGER;
        }
    }
    // Handle negative indices
    const axisSize = inputShape[axis];
    if (stop < 0) {
        stop += axisSize;
    }
    // Clamping
    // Because the end index points one past the last element, we need slightly
    // different clamping ranges depending on the direction.
    if (stride > 0) {
        // Forward iteration
        stop = clamp(0, stop, axisSize);
    }
    else {
        // Backward iteration
        stop = clamp(-1, stop, axisSize - 1);
    }
    return stop;
}
/**
 * Returns true if the slice occupies a continous set of elements in the
 * 'flat' space.
 */
function isSliceContinous(shape, begin, size) {
    // Index of the first axis that has size > 1.
    let firstNonOneAxis = size.length;
    for (let i = 0; i < size.length; i++) {
        if (size[i] > 1) {
            firstNonOneAxis = i;
            break;
        }
    }
    for (let i = firstNonOneAxis + 1; i < size.length; i++) {
        if (begin[i] > 0 || size[i] !== shape[i]) {
            return false;
        }
    }
    return true;
}
function computeFlatOffset(begin, strides) {
    let flatOffset = begin.length > 0 ? begin[begin.length - 1] : 1;
    for (let i = 0; i < begin.length - 1; i++) {
        flatOffset += begin[i] * strides[i];
    }
    return flatOffset;
}
function parseSliceParams(x, begin, size) {
    // The following logic allows for more ergonomic calls.
    let begin_;
    const xRank = x.shape.length;
    if (typeof begin === 'number') {
        begin_ = [begin, ...new Array(xRank - 1).fill(0)];
    }
    else if (begin.length < xRank) {
        begin_ = begin.concat(new Array(xRank - begin.length).fill(0));
    }
    else {
        begin_ = begin.slice();
    }
    begin_.forEach(d => {
        assert(d !== -1, () => 'slice() does not support negative begin indexing.');
    });
    let size_;
    if (size == null) {
        size_ = new Array(xRank).fill(-1);
    }
    else if (typeof size === 'number') {
        size_ = [size, ...new Array(xRank - 1).fill(-1)];
    }
    else if (size.length < xRank) {
        size_ = size.concat(new Array(xRank - size.length).fill(-1));
    }
    else {
        size_ = size;
    }
    size_ = size_.map((d, i) => {
        if (d >= 0) {
            return d;
        }
        else {
            assert(d === -1, () => `Negative size values should be exactly -1 but got ` +
                `${d} for the slice() size at index ${i}.`);
            return x.shape[i] - begin_[i];
        }
    });
    return [begin_, size_];
}
function sliceInfo(xShape, begin, end, strides, beginMask, endMask, ellipsisMask, newAxisMask, shrinkAxisMask) {
    // make a copy because it may be modified further down.
    let $begin = begin.slice();
    let $end = end.slice();
    let $strides = strides;
    if (strides == null) {
        $strides = new Array($begin.length);
    }
    const ellipsisAxes = maskToAxes(ellipsisMask);
    if (ellipsisAxes.length > 1) {
        throw new Error('Multiple ellipses in slice is not allowed.');
    }
    if (ellipsisMask !== 0 && newAxisMask !== 0) {
        throw new Error('Using both ellipsisMask and newAxisMask is not yet supported.');
    }
    if (ellipsisMask !== 0 && shrinkAxisMask !== 0) {
        throw new Error('Using both ellipsisMask and shrinkAxisMask is not yet supported.');
    }
    const numInterpolatedAxes = xShape.length - $begin.length;
    // Expand the dims of x based on the newAxisMask.
    const expandAxes = maskToAxes(newAxisMask);
    const newShape = xShape.slice();
    expandAxes.forEach(axis => {
        $begin[axis] = 0;
        $end[axis] = 1;
        newShape.splice(axis, 0, 1);
    });
    const { begin: normalizedBegin, end: normalizedEnd, strides: normalizedStrides } = getNormalizedAxes(newShape, ellipsisAxes, numInterpolatedAxes, $begin, $end, $strides, beginMask, endMask, ellipsisMask);
    $begin = normalizedBegin;
    $end = normalizedEnd;
    $strides = normalizedStrides;
    const shrinkAxes = maskToAxes(shrinkAxisMask);
    // Adjust the ends based on the shrink mask.
    shrinkAxes.forEach(axis => {
        $end[axis] = $begin[axis] + 1;
        $strides[axis] = 1;
    });
    // Figure out the output shape.
    const size = computeOutShape($begin, $end, $strides);
    // Remove the axes based on shrinkMask.
    const outShape = size.filter((_, axis) => shrinkAxes.indexOf(axis) === -1);
    const nonStrided = $strides.every(v => v === 1);
    return { nonStrided, $begin, $end, $strides, size, newShape, outShape };
}

var slice_util = /*#__PURE__*/Object.freeze({
    __proto__: null,
    assertParamsValid: assertParamsValid,
    maskToAxes: maskToAxes,
    computeOutShape: computeOutShape,
    stridesWithElidedDims: stridesWithElidedDims,
    getNormalizedAxes: getNormalizedAxes,
    startIndicesWithElidedDims: startIndicesWithElidedDims,
    stopIndicesWithElidedDims: stopIndicesWithElidedDims,
    stridesForAxis: stridesForAxis,
    startForAxis: startForAxis,
    stopForAxis: stopForAxis,
    isSliceContinous: isSliceContinous,
    computeFlatOffset: computeFlatOffset,
    parseSliceParams: parseSliceParams,
    sliceInfo: sliceInfo
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
function assertParamsConsistent(shapes, axis) {
    const rank = shapes[0].length;
    shapes.forEach((shape, i) => {
        assert(shape.length === rank, () => `Error in concat${rank}D: rank of tensors[${i}] must be the same ` +
            `as the rank of the rest (${rank})`);
    });
    assert(axis >= 0 && axis < rank, () => `Error in concat${rank}D: axis must be between 0 and ${rank - 1}.`);
    const firstShape = shapes[0];
    shapes.forEach((shape, i) => {
        for (let r = 0; r < rank; r++) {
            assert((r === axis) || (shape[r] === firstShape[r]), () => `Error in concat${rank}D: Shape of tensors[${i}] (${shape}) ` +
                `does not match the shape of the rest (${firstShape}) ` +
                `along the non-concatenated axis ${i}.`);
        }
    });
}
function computeOutShape$1(shapes, axis) {
    const outputShape = shapes[0].slice();
    for (let i = 1; i < shapes.length; i++) {
        outputShape[axis] += shapes[i][axis];
    }
    return outputShape;
}

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
const PARALLELIZE_THRESHOLD = 30;
function computeOptimalWindowSize(inSize) {
    if (inSize <= PARALLELIZE_THRESHOLD) {
        return inSize;
    }
    return nearestDivisor(inSize, Math.floor(Math.sqrt(inSize)));
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
// Returns the image center in pixels.
function getImageCenter(center, imageHeight, imageWidth) {
    const centerX = imageWidth * (typeof center === 'number' ? center : center[0]);
    const centerY = imageHeight * (typeof center === 'number' ? center : center[1]);
    return [centerX, centerY];
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
/**
 * Gets the new shape of the input Tensor after it's been reshaped
 * to:
 * [blockShape[0], ..., blockShape[M-1], batch / prod(blockShape),
 * inputShape[1], ..., inputShape[N-1]]
 *
 * See step 1: https://www.tensorflow.org/api_docs/python/tf/batch_to_space_nd
 */
function getReshaped(inputShape, blockShape, prod, batchToSpace = true) {
    let reshaped = [];
    if (batchToSpace) {
        reshaped = reshaped.concat(blockShape.slice(0));
        reshaped.push(inputShape[0] / prod);
        reshaped = reshaped.concat(inputShape.slice(1));
    }
    else {
        reshaped = reshaped.concat(inputShape[0]);
        const spatialLength = blockShape.length;
        for (let i = 0; i < spatialLength; ++i) {
            reshaped =
                reshaped.concat([inputShape[i + 1] / blockShape[i], blockShape[i]]);
        }
        reshaped = reshaped.concat(inputShape.slice(spatialLength + 1));
    }
    return reshaped;
}
/**
 * Gets the permutation that will transpose the dimensions of the
 * reshaped tensor to shape:
 *
 * [batch / prod(block_shape),inputShape[1], blockShape[0], ...,
 * inputShape[M], blockShape[M-1],inputShape[M+1], ..., inputShape[N-1]]
 *
 * see step 2: https://www.tensorflow.org/api_docs/python/tf/batch_to_space_nd
 */
function getPermuted(reshapedRank, blockShapeRank, batchToSpace = true) {
    const permuted = [];
    if (batchToSpace) {
        permuted.push(blockShapeRank);
        for (let i = blockShapeRank + 1; i < reshapedRank; ++i) {
            if (i <= 2 * blockShapeRank) {
                permuted.push(i);
                permuted.push(i - (blockShapeRank + 1));
            }
            else {
                permuted.push(i);
            }
        }
    }
    else {
        const permutedBeforeBatch = [];
        const permutedAfterBatch = [];
        for (let i = 1; i < reshapedRank; ++i) {
            if (i >= blockShapeRank * 2 + 1 || i % 2 === 1) {
                permutedAfterBatch.push(i);
            }
            else {
                permutedBeforeBatch.push(i);
            }
        }
        permuted.push(...permutedBeforeBatch);
        permuted.push(0);
        permuted.push(...permutedAfterBatch);
    }
    return permuted;
}
/**
 * Gets the shape of the reshaped and permuted input Tensor before any cropping
 * is applied.  The new shape will be:
 *
 * [batch / prod(blockShape),inputShape[1] * blockShape[0], ...,
 * inputShape[M] * blockShape[M-1],inputShape[M+1], ..., inputShape[N-1]]
 *
 * See step 3: https://www.tensorflow.org/api_docs/python/tf/batch_to_space_nd
 */
function getReshapedPermuted(inputShape, blockShape, prod, batchToSpace = true) {
    const reshapedPermuted = [];
    if (batchToSpace) {
        reshapedPermuted.push(inputShape[0] / prod);
    }
    else {
        reshapedPermuted.push(inputShape[0] * prod);
    }
    for (let i = 1; i < inputShape.length; ++i) {
        if (i <= blockShape.length) {
            if (batchToSpace) {
                reshapedPermuted.push(blockShape[i - 1] * inputShape[i]);
            }
            else {
                reshapedPermuted.push(inputShape[i] / blockShape[i - 1]);
            }
        }
        else {
            reshapedPermuted.push(inputShape[i]);
        }
    }
    return reshapedPermuted;
}
/**
 * Converts the crops argument into the beginning coordinates of a slice
 * operation.
 */
function getSliceBeginCoords(crops, blockShape) {
    const sliceBeginCoords = [0];
    for (let i = 0; i < blockShape; ++i) {
        sliceBeginCoords.push(crops[i][0]);
    }
    return sliceBeginCoords;
}
/**
 * Converts the crops argument into the size of a slice operation.  When
 * combined with getSliceBeginCoords this function allows the reshaped and
 * permuted Tensor to be cropped to its final output shape of:
 *
 * inputShape[1] * blockShape[0] - crops[0,0] - crops[0,1], ...,
 * inputShape[M] * blockShape[M-1] -crops[M-1,0] -
 * crops[M-1,1],inputShape[M+1], ..., inputShape[N-1]]
 *
 * See step 4: https://www.tensorflow.org/api_docs/python/tf/batch_to_space_nd
 */
function getSliceSize(uncroppedShape, crops, blockShape) {
    const sliceSize = uncroppedShape.slice(0, 1);
    for (let i = 0; i < blockShape; ++i) {
        sliceSize.push(uncroppedShape[i + 1] - crops[i][0] - crops[i][1]);
    }
    return sliceSize;
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
const SELU_SCALEALPHA = 1.7580993408473768599402175208123;
const SELU_SCALE = 1.0507009873554804934193349852946;

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
const ERF_P = 0.3275911;
const ERF_A1 = 0.254829592;
const ERF_A2 = -0.284496736;
const ERF_A3 = 1.421413741;
const ERF_A4 = -1.453152027;
const ERF_A5 = 1.061405429;

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
function warn(...msg) {
    if (!env().getBool('IS_TEST')) {
        console.warn(...msg);
    }
}
function log(...msg) {
    if (!env().getBool('IS_TEST')) {
        console.log(...msg);
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
/**
 * Merges real and imaginary Float32Arrays into a single complex Float32Array.
 *
 * The memory layout is interleaved as follows:
 * real: [r0, r1, r2]
 * imag: [i0, i1, i2]
 * complex: [r0, i0, r1, i1, r2, i2]
 *
 * This is the inverse of splitRealAndImagArrays.
 *
 * @param real The real values of the complex tensor values.
 * @param imag The imag values of the complex tensor values.
 * @returns A complex tensor as a Float32Array with merged values.
 */
function mergeRealAndImagArrays(real, imag) {
    if (real.length !== imag.length) {
        throw new Error(`Cannot merge real and imag arrays of different lengths. real:` +
            `${real.length}, imag: ${imag.length}.`);
    }
    const result = new Float32Array(real.length * 2);
    for (let i = 0; i < result.length; i += 2) {
        result[i] = real[i / 2];
        result[i + 1] = imag[i / 2];
    }
    return result;
}
/**
 * Splits a complex Float32Array into real and imag parts.
 *
 * The memory layout is interleaved as follows:
 * complex: [r0, i0, r1, i1, r2, i2]
 * real: [r0, r1, r2]
 * imag: [i0, i1, i2]
 *
 * This is the inverse of mergeRealAndImagArrays.
 *
 * @param complex The complex tensor values.
 * @returns An object with real and imag Float32Array components of the complex
 *     tensor.
 */
function splitRealAndImagArrays(complex) {
    const real = new Float32Array(complex.length / 2);
    const imag = new Float32Array(complex.length / 2);
    for (let i = 0; i < complex.length; i += 2) {
        real[i / 2] = complex[i];
        imag[i / 2] = complex[i + 1];
    }
    return { real, imag };
}
/**
 * Extracts even indexed complex values in the given array.
 * @param complex The complex tensor values
 */
function complexWithEvenIndex(complex) {
    const len = Math.ceil(complex.length / 4);
    const real = new Float32Array(len);
    const imag = new Float32Array(len);
    for (let i = 0; i < complex.length; i += 4) {
        real[Math.floor(i / 4)] = complex[i];
        imag[Math.floor(i / 4)] = complex[i + 1];
    }
    return { real, imag };
}
/**
 * Extracts odd indexed comple values in the given array.
 * @param complex The complex tensor values
 */
function complexWithOddIndex(complex) {
    const len = Math.floor(complex.length / 4);
    const real = new Float32Array(len);
    const imag = new Float32Array(len);
    for (let i = 2; i < complex.length; i += 4) {
        real[Math.floor(i / 4)] = complex[i];
        imag[Math.floor(i / 4)] = complex[i + 1];
    }
    return { real, imag };
}
/**
 * Get the map representing a complex value in the given array.
 * @param complex The complex tensor values.
 * @param index An index of the target complex value.
 */
function getComplexWithIndex(complex, index) {
    const real = complex[index * 2];
    const imag = complex[index * 2 + 1];
    return { real, imag };
}
/**
 * Insert a given complex value into the TypedArray.
 * @param data The array in which the complex value is inserted.
 * @param c The complex value to be inserted.
 * @param index An index of the target complex value.
 */
function assignToTypedArray(data, real, imag, index) {
    data[index * 2] = real;
    data[index * 2 + 1] = imag;
}
/**
 * Make the list of exponent terms used by FFT.
 */
function exponents(n, inverse) {
    const real = new Float32Array(n / 2);
    const imag = new Float32Array(n / 2);
    for (let i = 0; i < Math.ceil(n / 2); i++) {
        const x = (inverse ? 2 : -2) * Math.PI * (i / n);
        real[i] = Math.cos(x);
        imag[i] = Math.sin(x);
    }
    return { real, imag };
}
/**
 * Make the exponent term used by FFT.
 */
function exponent(k, n, inverse) {
    const x = (inverse ? 2 : -2) * Math.PI * (k / n);
    const real = Math.cos(x);
    const imag = Math.sin(x);
    return { real, imag };
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
const ARROW = '->';
const ARROW_REGEX = /->/g;
const COMMA = ',';
const ELLIPSIS = '...';
/**
 * Parse an equation for einsum.
 *
 * @param equation The einsum equation (e.g., "ij,jk->ik").
 * @param numTensors Number of tensors provided along with `equation`. Used to
 *   check matching number of input tensors.
 * @returns An object consisting of the following fields:
 *   - allDims: all dimension names as strings.
 *   - summedDims: a list of all dimensions being summed over, as indices to
 *     the elements of `allDims`.
 *   - idDims: indices of the dimensions in each input tensor, as indices to
 *     the elements of `allDims.
 */
function decodeEinsumEquation(equation, numTensors) {
    equation = equation.replace(/\s/g, ''); // Remove witespace in equation.
    const numArrows = (equation.length - equation.replace(ARROW_REGEX, '').length) /
        ARROW.length;
    if (numArrows < 1) {
        throw new Error('Equations without an arrow are not supported.');
    }
    else if (numArrows > 1) {
        throw new Error(`Equation must contain exactly one arrow ("${ARROW}").`);
    }
    const [inputString, outputString] = equation.split(ARROW);
    assert(inputString.indexOf(ELLIPSIS) === -1, () => `The ellipsis notation ("${ELLIPSIS}") is not supported yet.`);
    const inputTerms = inputString.split(COMMA);
    const numInputs = inputTerms.length;
    if (numTensors !== numInputs) {
        throw new Error(`Expected ${numInputs} input tensors, received ${numTensors}`);
    }
    if (numInputs > 2) {
        throw new Error('Support for more than 2 input tensors is not implemented yet.');
    }
    const allDims = [];
    for (let i = 0; i < outputString.length; ++i) {
        const dimName = outputString[i];
        if (!inputTerms.some(inputTerm => inputTerm.indexOf(dimName) !== -1)) {
            throw new Error(`Output subscripts contain the label ${dimName} ` +
                `not present in the input subscripts.`);
        }
        if (allDims.indexOf(dimName) === -1) {
            allDims.push(dimName);
        }
    }
    for (let i = 0; i < inputString.length; ++i) {
        const dimName = inputString[i];
        if (allDims.indexOf(dimName) === -1 && dimName !== COMMA) {
            allDims.push(dimName);
        }
    }
    const idDims = new Array(inputTerms.length);
    for (let i = 0; i < numInputs; ++i) {
        if (new Set(inputTerms[i].split('')).size !== inputTerms[i].length) {
            throw new Error(`Found duplicate axes in input component ${inputTerms[i]}. ` +
                `Support for duplicate axes in input is not implemented yet.`);
        }
        idDims[i] = [];
        for (let j = 0; j < inputTerms[i].length; ++j) {
            idDims[i].push(allDims.indexOf(inputTerms[i][j]));
        }
    }
    const numDims = allDims.length; // Number of unique dimensions.
    const numOutDims = outputString.length; // Number of output dimensions.
    const summedDims = []; // Dimensions being summed over.
    for (let i = numOutDims; i < numDims; ++i) {
        summedDims.push(i);
    }
    return { allDims, summedDims, idDims };
}
/**
 * Get the permutation for a given input tensor.
 *
 * @param nDims Total number of dimension of all tensors involved in the einsum
 *   operation.
 * @param idDims Dimension indices involve in the tensor in question.
 * @returns An object consisting of the following fields:
 *   - permutationIndices: Indices to permute the axes of the tensor with.
 *   - expandDims: Indices to the dimension that need to be expanded from the
 *     tensor after permutation.
 */
function getEinsumPermutation(nDims, idDims) {
    let permutationIndices = new Array(nDims);
    permutationIndices.fill(-1);
    for (let i = 0; i < idDims.length; ++i) {
        permutationIndices[idDims[i]] = i;
    }
    const expandDims = [];
    for (let i = 0; i < nDims; ++i) {
        if (permutationIndices[i] === -1) {
            expandDims.push(i);
        }
    }
    permutationIndices = permutationIndices.filter(d => d !== -1);
    return { permutationIndices, expandDims };
}
/**
 * Checks that the dimension sizes from different input tensors match the
 * equation.
 */
function checkEinsumDimSizes(nDims, idDims, tensors) {
    const dimSizes = new Array(nDims);
    for (let i = 0; i < tensors.length; ++i) {
        const shape = tensors[i].shape;
        for (let j = 0; j < idDims[i].length; ++j) {
            if (dimSizes[idDims[i][j]] === undefined) {
                dimSizes[idDims[i][j]] = shape[j];
            }
            else {
                assert(dimSizes[idDims[i][j]] === shape[j], () => `Expected dimension ${dimSizes[idDims[i][j]]} at axis ${j} ` +
                    `of input shaped ${JSON.stringify(shape)}, ` +
                    `but got dimension ${shape[j]}`);
            }
        }
    }
}
/**
 * Gets path of computation for einsum.
 *
 * @param summedDims indices to the dimensions being summed over.
 * @param idDims A look up table for the dimensions present in each input
 *     tensor. Each consituent array contains indices for the dimensions in the
 *     corresponding input tensor.
 *
 * @return A map with two fields:
 *   - path: The path of computation, with each element indicating the dimension
 *     being summed over after the element-wise multiplication in that step.
 *   - steps: With the same length as `path`. Each element contains the indices
 *     to the input tensors being used for element-wise multiplication in the
 *     corresponding step.
 */
function getEinsumComputePath(summedDims, idDims) {
    const path = summedDims;
    const steps = [];
    let nSteps = 0;
    if (summedDims.length === 0) {
        // Einsum that involes no summing: e.g., transpose and outer product.
        path.push(-1);
    }
    nSteps = summedDims.length + 1;
    for (let i = 0; i < nSteps; ++i) {
        steps.push([]);
    }
    const computedTermIndices = [];
    for (let i = 0; i < path.length; ++i) {
        const summedDim = path[i];
        const termIndices = findTermsWithDim(idDims, summedDim);
        for (const termIndex of termIndices) {
            if (computedTermIndices.indexOf(termIndex) === -1) {
                steps[i].push(termIndex);
                computedTermIndices.push(termIndex);
            }
        }
    }
    return { path, steps };
}
/** Determines if an axes permutation is the identity permutation. */
function isIdentityPermutation(perm) {
    return perm.every((dim, index) => dim === index);
}
function findTermsWithDim(idDims, dim) {
    const termIndices = [];
    for (let i = 0; i < idDims.length; ++i) {
        if (idDims[i].length === 0 || idDims[i].indexOf(dim) !== -1 || dim === -1) {
            termIndices.push(i);
        }
    }
    return termIndices;
}

/**
 * Prepare the split size array. When the input is a number, the axis is evenly
 * divided among the split size. When the input contains the negative value, the
 * rest of the axis is allocated toward that.
 */
function prepareSplitSize(x, numOrSizeSplits, axis = 0) {
    let splitSizes = [];
    if (typeof (numOrSizeSplits) === 'number') {
        assert(x.shape[axis] % numOrSizeSplits === 0, () => 'Number of splits must evenly divide the axis.');
        splitSizes =
            new Array(numOrSizeSplits).fill(x.shape[axis] / numOrSizeSplits);
    }
    else {
        const numOfNegs = numOrSizeSplits.reduce((count, value) => {
            if (value === -1) {
                count += 1;
            }
            return count;
        }, 0);
        assert(numOfNegs <= 1, () => 'There should be only one negative value in split array.');
        const negIndex = numOrSizeSplits.indexOf(-1);
        // Allow the number of split array to be -1, which indicates the rest
        // of dimension is allocated to that split.
        if (negIndex !== -1) {
            const total = numOrSizeSplits.reduce((a, b) => b > 0 ? a + b : a);
            numOrSizeSplits[negIndex] = x.shape[axis] - total;
        }
        assert(x.shape[axis] === numOrSizeSplits.reduce((a, b) => a + b), () => 'The sum of sizes must match the size of the axis dimension.');
        splitSizes = numOrSizeSplits;
    }
    return splitSizes;
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
function segOpComputeOptimalWindowSize(inSize, numSegments) {
    let done = false;
    let res;
    if (inSize <= PARALLELIZE_THRESHOLD) {
        res = inSize;
        done = true;
    }
    else {
        res = nearestDivisor(inSize, Math.floor(Math.sqrt(inSize)));
    }
    while (!done) {
        if (res > numSegments || res === inSize) {
            done = true;
        }
        else {
            res = nearestDivisor(inSize, res + 1);
        }
    }
    return res;
}
function computeOutShape$2(aShape, axis, numSegments) {
    const outShape = [];
    const rank = aShape.length;
    for (let dim = 0; dim < rank; dim++) {
        if (dim !== axis) {
            outShape.push(aShape[dim]);
        }
        else {
            outShape.push(numSegments);
        }
    }
    return outShape;
}
function collectGatherOpShapeInfo(x, indices, axis, batchDims) {
    const indicesRank = indices.shape.length;
    const xRank = x.shape.length;
    if (batchDims !== 0) {
        if (batchDims < -indicesRank || batchDims > indicesRank) {
            throw new Error(`Expect batchDims in the range of [-${indicesRank}, ${indicesRank}], but got ${batchDims}`);
        }
    }
    if (batchDims < 0) {
        batchDims += indicesRank;
    }
    if (batchDims > xRank) {
        throw new Error(`batchDims (${batchDims}) must be less than rank(x) (
    ${xRank}).`);
    }
    if (axis < batchDims) {
        throw new Error(`batchDims (${batchDims}) must be less than or equal to axis (${axis}).`);
    }
    for (let i = 0; i < batchDims; ++i) {
        if (x.shape[i] !== indices.shape[i]) {
            throw new Error(`x.shape[${i}]: ${x.shape[i]} should be equal to indices.shape[${i}]: ${indices.shape[i]}.`);
        }
    }
    const dimSize = x.shape[axis];
    const outputShape = [];
    let batchSize = 1;
    let outerSize = 1;
    let sliceSize = 1;
    for (let i = 0; i < batchDims; ++i) {
        outputShape.push(x.shape[i]);
        batchSize *= x.shape[i];
    }
    for (let i = batchDims; i < axis; i++) {
        outputShape.push(x.shape[i]);
        outerSize *= x.shape[i];
    }
    for (let i = batchDims; i < indicesRank; i++) {
        outputShape.push(indices.shape[i]);
    }
    for (let i = axis + 1; i < xRank; i++) {
        outputShape.push(x.shape[i]);
        sliceSize *= x.shape[i];
    }
    return { batchSize, sliceSize, outerSize, dimSize, outputShape };
}

var segment_util = /*#__PURE__*/Object.freeze({
    __proto__: null,
    segOpComputeOptimalWindowSize: segOpComputeOptimalWindowSize,
    computeOutShape: computeOutShape$2,
    collectGatherOpShapeInfo: collectGatherOpShapeInfo
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
function fromUint8ToStringArray(vals) {
    try {
        // Decode the bytes into string.
        return vals.map(val => decodeString(val));
    }
    catch (err) {
        throw new Error(`Failed to decode encoded string bytes into utf-8, error: ${err}`);
    }
}
function fromStringArrayToUint8(strings) {
    return strings.map(s => encodeString(s));
}

var backend_util = /*#__PURE__*/Object.freeze({
    __proto__: null,
    slice_util: slice_util,
    segment_util: segment_util,
    fromUint8ToStringArray: fromUint8ToStringArray,
    fromStringArrayToUint8: fromStringArrayToUint8,
    upcastType: upcastType,
    axesAreInnerMostDims: axesAreInnerMostDims,
    combineLocations: combineLocations,
    computeOutAndReduceShapes: computeOutAndReduceShapes,
    expandShapeToKeepDim: expandShapeToKeepDim,
    assertAxesAreInnerMostDims: assertAxesAreInnerMostDims,
    getAxesPermutation: getAxesPermutation,
    getUndoAxesPermutation: getUndoAxesPermutation,
    getInnerMostAxes: getInnerMostAxes,
    getBroadcastDims: getBroadcastDims,
    getReductionAxes: getReductionAxes,
    assertAndGetBroadcastShape: assertAndGetBroadcastShape,
    assertParamsConsistent: assertParamsConsistent,
    computeOutShape: computeOutShape$1,
    computeDilation2DInfo: computeDilation2DInfo,
    computePool2DInfo: computePool2DInfo,
    computePool3DInfo: computePool3DInfo,
    computeConv2DInfo: computeConv2DInfo,
    computeConv3DInfo: computeConv3DInfo,
    computeDefaultPad: computeDefaultPad,
    tupleValuesAreOne: tupleValuesAreOne,
    eitherStridesOrDilationsAreOne: eitherStridesOrDilationsAreOne,
    convertConv2DDataFormat: convertConv2DDataFormat,
    getFusedDyActivation: getFusedDyActivation,
    getFusedBiasGradient: getFusedBiasGradient,
    applyActivation: applyActivation,
    shouldFuse: shouldFuse,
    PARALLELIZE_THRESHOLD: PARALLELIZE_THRESHOLD,
    computeOptimalWindowSize: computeOptimalWindowSize,
    getImageCenter: getImageCenter,
    getReshaped: getReshaped,
    getPermuted: getPermuted,
    getReshapedPermuted: getReshapedPermuted,
    getSliceBeginCoords: getSliceBeginCoords,
    getSliceSize: getSliceSize,
    prepareAndValidate: prepareAndValidate,
    validateUpdateShape: validateUpdateShape,
    validateInput: validateInput,
    calculateShapes: calculateShapes,
    SELU_SCALEALPHA: SELU_SCALEALPHA,
    SELU_SCALE: SELU_SCALE,
    ERF_P: ERF_P,
    ERF_A1: ERF_A1,
    ERF_A2: ERF_A2,
    ERF_A3: ERF_A3,
    ERF_A4: ERF_A4,
    ERF_A5: ERF_A5,
    warn: warn,
    log: log,
    mergeRealAndImagArrays: mergeRealAndImagArrays,
    splitRealAndImagArrays: splitRealAndImagArrays,
    complexWithEvenIndex: complexWithEvenIndex,
    complexWithOddIndex: complexWithOddIndex,
    getComplexWithIndex: getComplexWithIndex,
    assignToTypedArray: assignToTypedArray,
    exponents: exponents,
    exponent: exponent,
    decodeEinsumEquation: decodeEinsumEquation,
    getEinsumPermutation: getEinsumPermutation,
    checkEinsumDimSizes: checkEinsumDimSizes,
    getEinsumComputePath: getEinsumComputePath,
    isIdentityPermutation: isIdentityPermutation,
    prepareSplitSize: prepareSplitSize
});

export { fromStringArrayToUint8 as a, computeOutShape$1 as b, computeFlatOffset as c, assertParamsConsistent as d, collectGatherOpShapeInfo as e, fromUint8ToStringArray as f, getImageCenter as g, parseSliceParams as h, isSliceContinous as i, prepareSplitSize as j, getNormalizedAxes as k, computeOutShape as l, maskToAxes as m, backend_util as n, gather_nd_util as o, prepareAndValidate as p, slice_util as s };
