import {Notification} from "./notification";
import {Data} from "./data";

export class PushBody {
  to: string;
  notification: Notification;
  data: Data

  constructor(to: string, notification: Notification, data: Data) {
    this.to = to;
    this.notification = notification;
    this.data = data;
  }
}
