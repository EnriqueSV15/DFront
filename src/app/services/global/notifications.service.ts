import { Injectable } from '@angular/core';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Message } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private messageService: MessageService) { }

  success(content: string, title?: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: this.cutContent(content) });
  }

  info(content: string, title?: string) {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: this.cutContent(content) });
  }

  warning(content: string, title?: string) {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: this.cutContent(content) });
  }

  error(content: string, title?: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: this.cutContent(content) });
  }

  custom(content: string, title?: string) {
    this.messageService.add({ severity: 'custom', summary: 'Custom', detail: this.cutContent(content), icon: 'pi-file' });
  }

  private cutContent(content: string) {
    /*
    if (content.length > 150) {
      return content.substring(0, 150) + '...';
    }
    */
    return content;
  }

}