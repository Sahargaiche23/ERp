from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI(title="AI Budget Service")

class Feature(BaseModel):
    x: List[float]

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.post("/predict_cost")
async def predict_cost(features: List[Feature]):
    # Placeholder: sum of features as cost estimate
    return {"predictions": [sum(f.x) for f in features]}
