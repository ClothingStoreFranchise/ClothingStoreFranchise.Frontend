import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NavItem } from './shared/models/nav-item';
import { NavService } from './shared/services/nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'Frontend';

  @ViewChild('snav') snav: ElementRef;

  constructor(private navService: NavService) {
  }

  ngAfterViewInit() {
    this.navService.snav = this.snav;
  }


}
