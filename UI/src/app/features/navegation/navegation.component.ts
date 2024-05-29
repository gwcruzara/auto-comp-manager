import { Component, Renderer2, ViewChild, inject } from '@angular/core';

@Component({
  selector: 'app-navegation',
  templateUrl: './navegation.component.html',
  styleUrls: ['./navegation.component.scss']
})
export class NavegationComponent {

  public readonly renderer = inject(Renderer2);

  @ViewChild('contentWrapper', { static: false }) contentWrapper: any;

  public mainSidebarHeight(height: any) {
    this.renderer.setStyle(this.contentWrapper.nativeElement, 'min-height', height - 114 + 'px');
  }
}
