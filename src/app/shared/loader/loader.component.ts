import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  exportAs: 'appLoader'
})
export class LoaderComponent implements OnInit {
  @Input() isLoading: boolean;
  constructor() { }

  ngOnInit() {
  }

}
