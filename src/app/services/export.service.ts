import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  exportAsHtml(element: HTMLElement): string {
    return element.outerHTML;
  }

  async exportAsPdf(element: HTMLElement): Promise<void> {
    const canvas = await html2canvas(element, {
      useCORS: true,
      allowTaint: true,
      logging: true,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: [canvas.width * 0.75, canvas.height * 0.75],
    });

    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, width, height);

    pdf.save('page.pdf');
  }

  exportAsJson(data: any): string {
    return JSON.stringify(data, null, 2);
  }

  downloadFile(content: string, filename: string, contentType: string) {
    const blob = new Blob([content], { type: contentType });
    const link = this.renderer.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }
}
