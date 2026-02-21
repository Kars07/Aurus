import requests

systemPrompt = """You are generating a clinical snapshot. Here are the patient's recent history logs:
[2/21/2026, 8:20:00 PM] Transcript: "my toe has been hurting" | Nudge Delivered: "I'm so sorry..."

You MUST call the 'aurus_reasoning' tool with these exact parameters:
- mode: "clinical"

Do NOT attempt to pass the history logs into the tool call parameters."""

response = requests.post(
    "http://localhost:8000/v1/chat/completions",
    json={
        "messages": [{"role": "user", "content": systemPrompt}],
        "model": "nvidia/nemotron",
        "temperature": 0.1,
        "stream": False
    }
)

print("Status:", response.status_code)
print("Response:", response.text)
