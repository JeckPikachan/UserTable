import {Component, OnInit, TemplateRef, ViewChild, ViewContainerRef, ViewRef} from '@angular/core';
import {Location} from "@angular/common";

@Component({
  selector: 'app-document-creator',
  templateUrl: './document-creator.component.html',
  styleUrls: ['./document-creator.component.css', "../../../node_modules/ng2-dnd/bundles/style.css"]
})
export class DocumentCreatorComponent implements OnInit {

  private blockSizes = {
    '60/40': 60,
    '40/60': 40,
    '70/30': 70,
    '30/70': 30,
    '50/50': 50,
    '100': 100
  };
  private views = [];

  @ViewChild("workingSpace", {read: ViewContainerRef}) workingSpace: ViewContainerRef;
  @ViewChild("blocks") blocks: TemplateRef<any>;

  private isOpen: boolean = false;

  constructor(private location: Location) { }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

  openMenu(): void {
    this.isOpen = true;
  }

  closeMenu(): void {
    this.isOpen = false;
  }

  addBlock(blockSizes: number): void {
    // this.workingSpace.createEmbeddedView(this.blocks, {$implicit: blockSizes});
    let view = {blockSize: blockSizes};
    this.views.push(view);
  }

  removeBlock(index: number): void {
    this.views.splice(index, 1);
  }

}
