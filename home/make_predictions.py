from transformers import AutoModelForCausalLM, AutoTokenizer

# Load model and tokenizer from the Hugging Face model hub
model_name = "shyzii/Llama-2-7b-chat-finetune-rehab"
model = AutoModelForCausalLM.from_pretrained(model_name)

tokenizer_name = "shyzii/Llama-2-7b-chat-finetune-rehab"
tokenizer = AutoTokenizer.from_pretrained(tokenizer_name)

# Example text generation
prompt = "Note: only one word answer please Instruction: Predict in one word as patient or healthy Input: Pelvis_position_x: 0.112116621, Pelvis_position_y: 0.92100409, Pelvis_position_z: 0.633407894, Pelvis_extension: -1.542080594, Pelvis_lateral_flexion_rotation: -0.364000551, Pelvis_axial_rotation: 1.59640589"
output = model.generate(tokenizer(prompt, return_tensors="pt"), max_length=200)
print(tokenizer.decode(output[0], skip_special_tokens=True))
