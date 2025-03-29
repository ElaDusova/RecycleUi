import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

/**
 * Root component of the Recycle-Ui application.
 * Initializes Flowbite for UI components on startup.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Recycle-Ui';

    /**
   * Lifecycle hook that is called after component initialization.
   * Initializes Flowbite for UI components.
   */
  ngOnInit(): void {
    initFlowbite();
  }
}
