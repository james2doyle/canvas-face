import * as tf from '@tensorflow/tfjs';

const urls = {
  model: 'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json',
  metadata: 'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json'
};

const SentimentThreshold = {
  Positive: 0.66,
  Neutral: 0.33,
  Negative: 0
}

const PAD_INDEX = 0;
const OOV_INDEX = 2;

async function loadModel(url: string) {
  try {
    const model = await tf.loadLayersModel(url);
    return model;
  } catch (err) {
    console.log(err);
  }
}

async function loadMetadata(url: string) {
  try {
    const metadataJson = await fetch(url);
    const metadata = await metadataJson.json();
    return metadata;
  } catch (err) {
    console.log(err);
  }
}

const model = await loadModel(urls.model);
const metadata = await loadMetadata(urls.metadata);

function padSequences(sequences, maxLen, padding = 'pre', truncating = 'pre', value = PAD_INDEX) {
  return sequences.map(seq => {
    if (seq.length > maxLen) {
      if (truncating === 'pre') {
        seq.splice(0, seq.length - maxLen);
      } else {
        seq.splice(maxLen, seq.length - maxLen);
      }
    }

    if (seq.length < maxLen) {
      const pad = [];
      for (let i = 0; i < maxLen - seq.length; ++i) {
        pad.push(value);
      }
      if (padding === 'pre') {
        seq = pad.concat(seq);
      } else {
        seq = seq.concat(pad);
      }
    }

    return seq;
  });
}

function getSentimentScore(text: string) {
  const inputText = text.trim().toLowerCase().replace(/(\.|\,|\!)/g, '').split(' ');
  // Convert the words to a sequence of word indices.
  const sequence = inputText.map(word => {
    let wordIndex = metadata.word_index[word] + metadata.index_from;
    if (wordIndex > metadata.vocabulary_size) {
      wordIndex = OOV_INDEX;
    }
    return wordIndex;
  });
  // Perform truncation and padding.
  const paddedSequence = padSequences([sequence], metadata.max_len);
  const input = tf.tensor2d(paddedSequence, [1, metadata.max_len]);

  const predictOut = model.predict(input);
  const score = predictOut.dataSync()[0];
  predictOut.dispose();

  return score;
}

const form = document.querySelector('#form') as HTMLFormElement;
const sentimentBox = document.querySelector('#sentiment') as HTMLElement;
if (form && sentimentBox) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const text = formData.get('text') as string;

    const sentiment_score = getSentimentScore(text);
    sentimentBox.classList.remove('positive', 'neutral', 'negative');
    sentimentBox.innerHTML = sentiment_score;

    if (sentiment_score > SentimentThreshold.Positive) {
      sentimentBox.classList.add('positive');
    } else if (sentiment_score > SentimentThreshold.Neutral) {
      sentimentBox.classList.add('neutral');
    } else if (sentiment_score >= SentimentThreshold.Negative) {
      sentimentBox.classList.add('negative');
    }

    return false;
  });
}
