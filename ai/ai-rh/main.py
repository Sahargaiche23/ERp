from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI(title="AI RH Service")

class SeriesPoint(BaseModel):
    ts: str
    value: float

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.post("/forecast")
async def forecast(points: List[SeriesPoint]):
    # Placeholder: return naive forecast = last value
    last = points[-1].value if points else 0.0
    return {"forecast": [last for _ in range(14)]}
