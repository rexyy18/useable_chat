from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 👇 ADD MODE HERE
class ChatRequest(BaseModel):
    message: str
    mode: str  # mental | health | nutrition


# 🧠 PROMPT BUILDER
def build_prompt(message, mode):
    base = """
You are a friendly, human-like student wellbeing assistant.

Rules:
- Be natural and conversational
- Do NOT diagnose diseases
- Do NOT prescribe medication
- Give helpful, safe suggestions
- Keep responses short and human
"""

    if mode == "mental":
        return f"""{base}
Focus on emotional support and stress.

User: {message}
"""

    elif mode == "health":
        return f"""{base}
Focus on sleep, energy, and physical activity.

User: {message}
"""

    elif mode == "nutrition":
        return f"""{base}
Focus on diet, meals, and healthy eating.

User: {message}
"""

    return f"{base}\nUser: {message}"


def get_bot_response(message, mode):
    prompt = build_prompt(message, mode)

    chat_completion = client.chat.completions.create(
        messages=[{"role": "user", "content": prompt}],
        model="llama-3.3-70b-versatile",
    )

    return chat_completion.choices[0].message.content


@app.post("/chat")
async def chat(request: ChatRequest):
    reply = get_bot_response(request.message, request.mode)
    return {"reply": reply}