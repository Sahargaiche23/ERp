export interface Notification {
  id: string;
  userId: string;
  type: 'CLAIM_CREATED' | 'CLAIM_ASSIGNED' | 'CLAIM_STATUS_CHANGED' | 'CLAIM_COMMENTED' | 'SYSTEM';
  title: string;
  message: string;
  claimId?: string;
  read: boolean;
  createdAt: Date;
}

export interface NotificationService {
  getNotifications(): Notification[];
  markAsRead(id: string): void;
  createNotification(notification: Omit<Notification, 'id' | 'createdAt'>): void;
}
