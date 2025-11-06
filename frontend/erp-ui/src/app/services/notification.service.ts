import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Notification } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  public notifications$ = this.notificationsSubject.asObservable();

  constructor() {
    // Charger les notifications du localStorage au démarrage
    this.loadNotifications();
  }

  private loadNotifications(): void {
    const stored = localStorage.getItem('notifications');
    if (stored) {
      try {
        const notifications = JSON.parse(stored);
        this.notificationsSubject.next(notifications);
      } catch (e) {
        console.error('Error loading notifications:', e);
      }
    }
  }

  private saveNotifications(): void {
    localStorage.setItem('notifications', JSON.stringify(this.notificationsSubject.value));
  }

  getNotifications(): Observable<Notification[]> {
    return this.notifications$;
  }

  getUnreadCount(): number {
    return this.notificationsSubject.value.filter(n => !n.read).length;
  }

  createNotification(notification: Omit<Notification, 'id' | 'createdAt'>): void {
    const newNotification: Notification = {
      ...notification,
      id: this.generateId(),
      createdAt: new Date()
    };

    const current = this.notificationsSubject.value;
    this.notificationsSubject.next([newNotification, ...current]);
    this.saveNotifications();
  }

  markAsRead(id: string): void {
    const updated = this.notificationsSubject.value.map(n =>
      n.id === id ? { ...n, read: true } : n
    );
    this.notificationsSubject.next(updated);
    this.saveNotifications();
  }

  markAllAsRead(): void {
    const updated = this.notificationsSubject.value.map(n => ({ ...n, read: true }));
    this.notificationsSubject.next(updated);
    this.saveNotifications();
  }

  deleteNotification(id: string): void {
    const updated = this.notificationsSubject.value.filter(n => n.id !== id);
    this.notificationsSubject.next(updated);
    this.saveNotifications();
  }

  clearAll(): void {
    this.notificationsSubject.next([]);
    localStorage.removeItem('notifications');
  }

  private generateId(): string {
    return `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Notifications spécifiques
  notifyClaimCreated(claimId: string, citizenName: string, subject: string): void {
    this.createNotification({
      userId: 'chief', // Envoyer au CHIEF
      type: 'CLAIM_CREATED',
      title: '📝 Nouvelle Réclamation',
      message: `${citizenName} a créé une réclamation: "${subject}"`,
      claimId,
      read: false
    });
  }

  notifyClaimAssigned(claimId: string, agentName: string, subject: string): void {
    this.createNotification({
      userId: 'agent', // Envoyer à l'AGENT
      type: 'CLAIM_ASSIGNED',
      title: '📋 Réclamation Assignée',
      message: `Vous avez été assigné à: "${subject}"`,
      claimId,
      read: false
    });
  }

  notifyClaimStatusChanged(claimId: string, status: string, subject: string): void {
    this.createNotification({
      userId: 'citizen', // Envoyer au CITIZEN
      type: 'CLAIM_STATUS_CHANGED',
      title: '🔔 Statut Mis à Jour',
      message: `Votre réclamation "${subject}" est maintenant: ${status}`,
      claimId,
      read: false
    });
  }
}
