import torch
import warnings
from transformers import AutoModelForCausalLM, AutoTokenizer

# Load the model and tokenizer from the local directory
model_path = "./local_model"
model = AutoModelForCausalLM.from_pretrained(model_path)
tokenizer = AutoTokenizer.from_pretrained(model_path)

# Define your input text
input_text = "Note: only one word answer please Instruction: Predict in one word as patient or healthy Input: Pelvis_position_x: 0.112116621, Pelvis_position_y: 0.92100409, Pelvis_position_z: 0.633407894, Pelvis_extension: -1.542080594, Pelvis_lateral_flexion_rotation: -0.364000551, Pelvis_axial_rotation: 1.59640589"

# Tokenize the input text
input_ids = tokenizer(input_text, return_tensors="pt").input_ids

# Generate predictions
with torch.no_grad() and warnings.catch_warnings():
    warnings.simplefilter("ignore")
    output = model.generate(input_ids, max_length=200)

# Decode the generated tokens
output_text = tokenizer.decode(output[0], skip_special_tokens=True)

print("Generated text:", output_text)
