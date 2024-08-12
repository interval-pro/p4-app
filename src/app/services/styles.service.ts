import { ElementRef, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StylesService {
  private renderer: Renderer2;

  constructor(
    rendererFactory: RendererFactory2,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  createAndAppendStyle(elRef: ElementRef, style: string) {
    style = style.replace('body', '#site');

    const styleElement = this.renderer.createElement('style');
    styleElement.innerHTML = style;
    this.renderer.appendChild(elRef.nativeElement, styleElement);
  }

  removeStyle(elRef: ElementRef) {
    const styleElement = elRef.nativeElement.querySelector('style');
    if (!styleElement) return;
    this.renderer.removeChild(elRef.nativeElement, styleElement);
  }
}
