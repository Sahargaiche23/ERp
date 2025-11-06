from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict
from sklearn.ensemble import IsolationForest
import joblib
import os
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="AI Security Service",
    description="Advanced security anomaly detection using Isolation Forest",
    version="2.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = os.environ.get("MODEL_PATH", "/models/isoforest.joblib")
model: Optional[IsolationForest] = None


class TrainItem(BaseModel):
    features: List[float]


class PredictItem(BaseModel):
    features: List[float]


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/train")
async def train(data: List[TrainItem]):
    X = [d.features for d in data]
    clf = IsolationForest(n_estimators=100, contamination=0.05, random_state=42)
    clf.fit(X)
    os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
    joblib.dump(clf, MODEL_PATH)
    global model
    model = clf
    return {"message": "trained", "n_samples": len(X)}


def load_model():
    global model
    if model is None and os.path.exists(MODEL_PATH):
        model = joblib.load(MODEL_PATH)
    return model


@app.post("/predict")
async def predict(item: PredictItem):
    clf = load_model()
    if clf is None:
        return {"error": "model_not_trained"}
    score = -float(clf.score_samples([item.features])[0])  # higher means more anomalous
    label = int(clf.predict([item.features])[0])  # -1 anomalous, 1 normal
    return {"label": label, "anomaly_score": score}


@app.post("/decision")
async def decision(item: PredictItem):
    res = await predict(item)
    if "error" in res:
        return res
    # Simple rule: if anomalous or score above threshold, suggest lock
    lock = (res["label"] == -1) or (res["anomaly_score"] > 0.6)
    return {"lock_suggested": lock, **res}
