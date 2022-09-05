import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  titlePage: string = 'Экран отображения данных ';

  constructor() {}
  ngOnInit(): void {
  }

  changeTitle(title: string) {
    if (title === 'chart') {
      this.titlePage = 'Экран отчета ';
    } else {
      this.titlePage = 'Экран отображения данных ';
    }
  }
}
