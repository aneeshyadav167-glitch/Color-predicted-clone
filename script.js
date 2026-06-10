// Load trained model from file
async function loadModel() {
  try {
 const handler = tf.io.fileSystem('model.json');
 return await tf.loadLayersModel(handler);
  } catch (error) {
 console.error('Error loading model:', error);
  }
}

// Predict next number based on input period number
async function predictNextNumber(input) {
  const model = await loadModel();
  if (!model) return null; // Model not loaded

  // Convert input to tensor
  const tensor = tf.tensor2d([input], [1]);

  // Make prediction
  const output = model.predict(tensor);

  // Get predicted value and dispose tensors to free memory
  const prediction = output.dataSync()[0];
  tensor.dispose();
  output.dispose();

  return prediction;
}

document.getElementById('submit').addEventListener('click', async () => {
  const periodInput = document.getElementById('period').value;
  
  if (!periodInput || isNaN(periodInput)) {
 alert("Please enter a valid period number.");
 return;
  }

  const predictedNumber = await predictNextNumber(parseInt(periodInput));
  
  if (predictedNumber !== null) {
 document.getElementById('result').innerText = `Predicted Next Number: ${predictedNumber}`;
  } else {
 document.getElementById('result').innerText = 'Failed to make prediction.';
 console.error("Prediction failed.");
  }
});
