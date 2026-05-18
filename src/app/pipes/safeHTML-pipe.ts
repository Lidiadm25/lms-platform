import { Pipe, type PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'SafeHTML',
})
export class SafeHTMLPipe implements PipeTransform {

 transformVideoLinks(html: string): string {
  return html.replace(
    /<a[^>]+href="\s*https:\/\/www\.youtube\.com\/embed\/([^"?&\s]+)[^"]*"[^>]*>.*?<\/a>/g,
    (_, videoId) => {
      return `
        <div class="video-preview">
          <iframe
            src="https://www.youtube.com/embed/${videoId}"
            frameborder="0"
            allowfullscreen>
          </iframe>
        </div>
      `;
    }
  );
}
  constructor(private sanitizer : DomSanitizer){

  }

  transform(value: string): SafeHtml {
    if(!value) return ''
    return this.sanitizer.bypassSecurityTrustHtml(this.transformVideoLinks(value));
  }

}
