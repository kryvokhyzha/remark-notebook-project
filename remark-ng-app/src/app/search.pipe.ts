import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(notes, value) {
    if (value === '') {
      return notes;
    }
    const result = notes.filter(note => {
      const textInclude = note.text.includes(value);
      if (!textInclude) {
        return note.title.includes(value);
      }
      return textInclude;
    });
    if (result.length === 0) {
      return [null];
    }
    return result;
  }

}
