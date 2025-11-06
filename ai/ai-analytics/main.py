from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional
import numpy as np
from scipy import stats
from datetime import datetime
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="AI Analytics Service",
    description="Advanced analytics and forecasting service",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalyticsRequest(BaseModel):
    data: List[float]
    metric: str

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.post("/analyze")
async def analyze(request: AnalyticsRequest):
    try:
        if not request.data or len(request.data) < 2:
            raise HTTPException(status_code=400, detail="Data must contain at least 2 points")
        
        data = np.array(request.data)
        
        # Calculate advanced statistics
        quartiles = np.percentile(data, [25, 50, 75])
        variance = np.var(data)
        
        # Detect outliers using IQR method
        iqr = quartiles[2] - quartiles[0]
        lower_bound = quartiles[0] - 1.5 * iqr
        upper_bound = quartiles[2] + 1.5 * iqr
        outliers = data[(data < lower_bound) | (data > upper_bound)]
        
        # Calculate trend using linear regression
        x = np.arange(len(data))
        slope, intercept, r_value, p_value, std_err = stats.linregress(x, data)
        
        result = {
            "metric": request.metric,
            "timestamp": datetime.now().isoformat(),
            "statistics": {
                "mean": float(np.mean(data)),
                "median": float(np.median(data)),
                "std": float(np.std(data)),
                "variance": float(variance),
                "min": float(np.min(data)),
                "max": float(np.max(data)),
                "quartiles": {
                    "q1": float(quartiles[0]),
                    "q2": float(quartiles[1]),
                    "q3": float(quartiles[2])
                },
                "range": float(np.max(data) - np.min(data)),
                "coefficient_variation": float(np.std(data) / np.mean(data)) if np.mean(data) != 0 else 0
            },
            "trend": {
                "direction": "increasing" if slope > 0 else "decreasing" if slope < 0 else "stable",
                "slope": float(slope),
                "r_squared": float(r_value ** 2),
                "p_value": float(p_value),
                "confidence": "high" if abs(r_value) > 0.7 else "medium" if abs(r_value) > 0.4 else "low"
            },
            "outliers": {
                "count": int(len(outliers)),
                "values": outliers.tolist(),
                "percentage": float(len(outliers) / len(data) * 100)
            },
            "data_quality": {
                "sample_size": len(data),
                "completeness": 100.0,
                "normality_test": float(stats.shapiro(data)[1]) if len(data) >= 3 else None
            }
        }
        
        logger.info(f"Analysis completed for metric: {request.metric}")
        return result
    
    except Exception as e:
        logger.error(f"Analysis error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/forecast")
async def forecast(request: AnalyticsRequest):
    data = np.array(request.data)
    
    # Simple linear regression for forecasting
    n = len(data)
    x = np.arange(n)
    coeffs = np.polyfit(x, data, 1)
    
    # Forecast next 3 periods
    forecast_periods = 3
    future_x = np.arange(n, n + forecast_periods)
    forecast_values = np.polyval(coeffs, future_x)
    
    return {
        "forecast": forecast_values.tolist(),
        "trend_coefficient": float(coeffs[0])
    }
