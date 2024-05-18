import pandas as pd

# Load the CSV file
df = pd.read_csv("workout-data.csv", sep="\t")

# Extract header
header = df.columns.tolist()

# Define recommended workout plan
workout_plan = """Bridge: 3 sets of 12-15 reps.
Side Plank: 3 sets of 30 seconds to 1 minute holds per side.
Lunges: 3 sets of 10-12 reps per leg.
Woodchopper: 3 sets of 12-15 reps per side."""

# Initialize an empty list to store formatted rows
formatted_rows = []

# Iterate through each row in the DataFrame
for index, row in df.iterrows():
    # Extract data points
    data_points = row.tolist()
    # Format the data points
    formatted_data = ", ".join([f"{header[i]}: {data_points[i]}" for i in range(len(header))])
    # Combine data points and workout plan
    output_text = f"<s>[INST] Recommend workout plan based on these data points. In your response, only give 4 exercises names along with its reps. Do not include anything else in your response, only what is asked. {formatted_data} [/INST] {workout_plan} </s>"
    # Append to the list of formatted rows
    formatted_rows.append([output_text])

# Create a new DataFrame with the formatted rows
new_df = pd.DataFrame(formatted_rows, columns=["text"])

# Save the new DataFrame to a CSV file
new_df.to_csv("output.csv", index=False)
