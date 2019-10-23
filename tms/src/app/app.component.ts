import { Component } from '@angular/core';
// import octicons from 'octicons';
import { Subscription } from 'rxjs';
import { Role } from './shared/models/role.model';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TutorMS';

}
/**
 * The value for each day of the week, based on the `en-US` locale
 *
 * @publicApi
 */
export enum WeekDay {
  Sunday = 0,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday
}
