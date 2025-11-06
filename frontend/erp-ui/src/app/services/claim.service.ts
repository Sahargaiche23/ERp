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

  getClaim(id: string): Observable<Claim> {
    return this.http.get<Claim>(`${this.apiUrl}/${id}`);
  }

  createClaim(claim: Partial<Claim>): Observable<Claim> {
    return this.http.post<Claim>(this.apiUrl, claim);
  }

  updateClaim(id: string, claim: Partial<Claim>): Observable<Claim> {
    return this.http.put<Claim>(`${this.apiUrl}/${id}`, claim);
  }

  updateClaimStatus(id: string, status: string, resolution?: string): Observable<Claim> {
    return this.http.patch<Claim>(`${this.apiUrl}/${id}/status`, { status, resolution });
  }

  assignClaim(id: string, assignedTo: string): Observable<Claim> {
    return this.http.patch<Claim>(`${this.apiUrl}/${id}/assign`, { assignedTo });
  }

  deleteClaim(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getComments(claimId: string): Observable<ClaimComment[]> {
    return this.http.get<ClaimComment[]>(`${this.apiUrl}/${claimId}/comments`);
  }

  addComment(claimId: string, comment: string): Observable<ClaimComment> {
    return this.http.post<ClaimComment>(`${this.apiUrl}/${claimId}/comments`, { comment });
  }

  respondToClaim(claimId: string, response: string): Observable<Claim> {
    return this.http.post<Claim>(`${this.apiUrl}/${claimId}/respond`, { response });
  }

  getStats(): Observable<ClaimStats> {
    return this.http.get<ClaimStats>(`${this.apiUrl}/stats`);
  }
}
