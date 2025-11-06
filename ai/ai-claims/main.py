from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI(title="AI Claims Service")

class Claim(BaseModel):
    text: str

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.post("/classify")
async def classify(claims: List[Claim]):
    # Placeholder: naive keyword-based category
    def cat(t):
        s=t.lower()
        if "route" in s or "voirie" in s: return "voirie"
        if "lampe" in s or "éclairage" in s: return "eclairage"
        if "dechet" in s or "ordure" in s: return "dechets"
        return "autre"
    return {"categories": [cat(c.text) for c in claims]}

@app.post("/sentiment")
async def sentiment(claims: List[Claim]):
    # Placeholder: negative if 'colere' or 'plainte' in text
    def score(t):
        s=t.lower()
        if any(k in s for k in ["colere","plainte","mecontent"]):
            return -0.6
        return 0.3
    return {"scores": [score(c.text) for c in claims]}
