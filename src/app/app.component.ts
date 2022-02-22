import { AppService } from './appcallerservice';
import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  user: any;

  constructor(private appService: AppService) {
    this.user = this.appService.getUser();
  }
}
