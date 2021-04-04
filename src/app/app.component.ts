import { Component } from '@angular/core';

import { hotColdObservable } from './rxjs/hot-cold-observable';
import { run } from './rxjs/operators.js';
import { run as errorHandlingRun } from './rxjs/error-handling.js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'learn-rxjs';

  constructor() {
    // hotColdObservable();

    // run();

    errorHandlingRun();
  }
}
