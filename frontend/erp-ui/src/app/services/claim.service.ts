import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Claim, ClaimComment, ClaimStats } from '../models/claim.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.apiUrl = this.config.getClaimsApiUrl();
  }

  getClaims(status?: string, category?: string, priority?: string): Observable<Claim[]> {
    let params = new HttpParams();
    if (status) {
      params = params.set('status', status);
    }
    if (category) {
      params = params.set('category', category);
    }
    if (priority) {
      params = params.set('priority', priority);
    }
    return this.http.get<Claim[]>(this.apiUrl, { params });
  }

  getClaim(id: number): Observable<Claim> {
    return this.http.get<Claim>(`${this.apiUrl}/${id}`);
  }

  createClaim(claim: Partial<Claim>): Observable<Claim> {
    return this.http.post<Claim>(this.apiUrl, claim);
  }

  updateClaim(id: number, claim: Partial<Claim>): Observable<Claim> {
    return this.http.put<Claim>(`${this.apiUrl}/${id}`, claim);
  }

  updateClaimStatus(id: number, status: string, resolution?: string): Observable<Claim> {
    return this.http.patch<Claim>(`${this.apiUrl}/${id}/status`, { status, resolution });
  }

  assignClaim(id: number, assignedTo: string): Observable<Claim> {
    return this.http.patch<Claim>(`${this.apiUrl}/${id}/assign`, { assignedTo });
  }

  deleteClaim(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getComments(claimId: number): Observable<ClaimComment[]> {
    return this.http.get<ClaimComment[]>(`${this.apiUrl}/${claimId}/comments`);
  }

  addComment(claimId: number, comment: string): Observable<ClaimComment> {
    return this.http.post<ClaimComment>(`${this.apiUrl}/${claimId}/comments`, { comment });
  }

  getStats(): Observable<ClaimStats> {
    return this.http.get<ClaimStats>(`${this.apiUrl}/stats`);
  }
}
