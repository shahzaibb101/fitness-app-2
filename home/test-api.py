import requests

API_URL = "https://bg9jkh4w5yov992t.us-east-1.aws.endpoints.huggingface.cloud"
headers = {
	"Accept" : "application/json",
	"Content-Type": "application/json" 
}

def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.json()

output = query({
	"inputs": "<s>[INST] <<SYS>> You are a helpful assistant. Predict in one word as patient or healthy. <</SYS>> Input: Pelvis_position_x: 0.112116621, Pelvis_position_y: 0.92100409, Pelvis_position_z: 0.633407894, Pelvis_extension: -1.542080594, Pelvis_lateral_flexion_rotation: -0.364000551, Pelvis_axial_rotation: 1.59640589 [/INST]</s>",
	"parameters": {
		"max_new_tokens": 150
	}
})

print(output)