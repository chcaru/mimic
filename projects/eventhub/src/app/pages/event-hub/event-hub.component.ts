import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  templateUrl: './event-hub.component.html',
  styleUrls: ['./event-hub.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventHubComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
