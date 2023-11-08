import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'dateFormat' })
export class DateFormatPipe implements PipeTransform {
  transform(value: Date): string {
    value = new Date(value);

    const fixFormat = (date: number): string => String(date).padStart(2, '0');

    return `${fixFormat(value.getDate())}/${fixFormat(value.getMonth())}/${fixFormat(value.getFullYear())}-${fixFormat(value.getHours())}:${fixFormat(value.getMinutes())}:${fixFormat(value.getSeconds())}`;
  }
}
