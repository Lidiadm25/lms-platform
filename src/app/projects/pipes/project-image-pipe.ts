import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'projectImage',
})
export class ProjectImagePipe implements PipeTransform {

  transform(value: null | string): string {
    if(value === null) {
      return 'https://as2.ftcdn.net/jpg/05/97/47/95/1000_F_597479556_7bbQ7t4Z8k3xbAloHFHVdZIizWK1PdOo.jpg'
    }
    return value;
  }

}
