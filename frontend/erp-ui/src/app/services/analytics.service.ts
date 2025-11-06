import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ConfigService } from './config.service';

export interface AnalyticsData {
  data: number[];
  metric: string;
}

export interface AnalyticsResult {
  metric: string;
  mean: number;
  median: number;
  std: number;
  min: number;
  max: number;
  trend: string;
}

export interface ForecastResult {
  forecast: number[];
  trend_coefficient: number;
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private baseUrl: string;
  private analyticsCache = new Map<string, any>();
  private isAIAvailable$ = new BehaviorSubject<boolean>(true);

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.baseUrl = this.config.getAIAnalyticsUrl();
    this.checkAIHealth();
  }

  // Check if AI service is available
  private checkAIHealth(): void {
    if (!this.config.isAIEnabled()) {
      this.isAIAvailable$.next(false);
      return;
    }

    this.http.get(`${this.baseUrl}/health`)
      .pipe(
        catchError(() => {
          this.isAIAvailable$.next(false);
          return [];
        })
      )
      .subscribe(() => {
        this.isAIAvailable$.next(true);
      });
  }

  // Get AI availability status
  getAIStatus(): Observable<boolean> {
    return this.isAIAvailable$.asObservable();
  }

  // Analyze data
  analyze(data: number[], metric: string): Observable<AnalyticsResult> {
    const cacheKey = `analyze_${metric}_${JSON.stringify(data)}`;
    
    if (this.config.isCacheEnabled() && this.analyticsCache.has(cacheKey)) {
      return new Observable(observer => {
        observer.next(this.analyticsCache.get(cacheKey));
        observer.complete();
      });
    }

    const request: AnalyticsData = { data, metric };
    
    return this.http.post<AnalyticsResult>(`${this.baseUrl}/analyze`, request)
      .pipe(
        tap(result => {
          if (this.config.isCacheEnabled()) {
            this.analyticsCache.set(cacheKey, result);
            setTimeout(() => this.analyticsCache.delete(cacheKey), this.config.getCacheTTL());
          }
        }),
        catchError(error => {
          console.error('Analytics error:', error);
          throw error;
        })
      );
  }

  // Forecast future values
  forecast(data: number[], metric: string): Observable<ForecastResult> {
    const cacheKey = `forecast_${metric}_${JSON.stringify(data)}`;
    
    if (this.config.isCacheEnabled() && this.analyticsCache.has(cacheKey)) {
      return new Observable(observer => {
        observer.next(this.analyticsCache.get(cacheKey));
        observer.complete();
      });
    }

    const request: AnalyticsData = { data, metric };
    
    return this.http.post<ForecastResult>(`${this.baseUrl}/forecast`, request)
      .pipe(
        tap(result => {
          if (this.config.isCacheEnabled()) {
            this.analyticsCache.set(cacheKey, result);
            setTimeout(() => this.analyticsCache.delete(cacheKey), this.config.getCacheTTL());
          }
        }),
        catchError(error => {
          console.error('Forecast error:', error);
          throw error;
        })
      );
  }

  // Calculate simple statistics locally (fallback)
  calculateLocalStats(data: number[]): AnalyticsResult {
    const sorted = [...data].sort((a, b) => a - b);
    const sum = data.reduce((a, b) => a + b, 0);
    const mean = sum / data.length;
    const variance = data.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / data.length;
    
    return {
      metric: 'local',
      mean,
      median: sorted[Math.floor(sorted.length / 2)],
      std: Math.sqrt(variance),
      min: Math.min(...data),
      max: Math.max(...data),
      trend: data[data.length - 1] > data[0] ? 'increasing' : 'decreasing'
    };
  }

  // Clear cache
  clearCache(): void {
    this.analyticsCache.clear();
  }
}
