export interface Claim {
  id: string;
  citizenName: string;
  citizenEmail: string;
  citizenPhone: string;
  category: 'INFRASTRUCTURE' | 'SANITATION' | 'LIGHTING' | 'SECURITY' | 'ADMINISTRATIVE' | 'OTHER';
  subject: string;
  description: string;
  address: string;
  status: 'NEW' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED' | 'REJECTED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
  resolution?: string;
  response?: string;
  attachments?: string[];
}

export interface ClaimComment {
  id: number;
  claimId: string;
  author: string;
  comment: string;
  createdAt: Date;
}

export interface ClaimStats {
  total: number;
  new: number;
  inProgress: number;
  resolved: number;
  closed: number;
  rejected: number;
  byCategory: { [key: string]: number };
  byPriority: { [key: string]: number };
  averageResolutionTime: number;
}
