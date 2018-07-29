export class Data {
  body: string;
  title: string;
  content_available: boolean;
  priority: string;

  constructor(body: string, title: string) {
    this.body = body;
    this.title = title;
    this.content_available = true;
    this.priority = 'high';
  }
}
