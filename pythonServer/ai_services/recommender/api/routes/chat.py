# recommender/api/routes/chat.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from recommender.chatbot.bot import chat

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str

@router.post("/chat", response_model=ChatResponse)
def chat_endpoint(req: ChatRequest):
    try:
        reply = chat(req.message)
        return ChatResponse(reply=reply)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))