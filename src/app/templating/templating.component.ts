import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {Country} from "../country";

@Component({
  selector: 'templating',
  templateUrl: './templating.component.html',
  styleUrls: ['./templating.component.css']
})
export class TemplatingComponent implements OnInit {

  @Input()
  headerTemplate: TemplateRef<any>;

  @Input()
  bodyTemplate: TemplateRef<any>;

  @Input()
  data: any[];

  private myContext ;

  constructor() { }

  ngOnInit() {
    this.myContext = {$implicit: this.data, count: this.data.length};
  }

}
