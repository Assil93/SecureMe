export class Notification {
  body: string;
  title: string;
  content_available: boolean;
  priority: string;
  sound: string;
  color: string;
  subtitle: string;

  constructor(body: string, title: string) {
    this.body = body;
    this.title = title;
    this.content_available = true;
    this.priority = 'high';
    this.sound = 'default';
    this.color = '#e60000';
  }
}
