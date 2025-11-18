import { ArgumentMetadata, ParseEnumPipe } from "@nestjs/common";

export class OptionalParseEnumPipe<T = any> extends ParseEnumPipe<T> {
  override async transform(value: T, metadata: ArgumentMetadata) {
    if (typeof value === 'undefined' || !value) {
      return '' as T;
    }

    return super.transform(value, metadata);
  }
}