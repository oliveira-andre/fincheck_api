import { ArgumentMetadata, ParseUUIDPipe } from "@nestjs/common";

export class OptionalParseUUIDPipe extends ParseUUIDPipe {
  override async transform(value: string, metadata: ArgumentMetadata) {
    if (typeof value === 'undefined' || !value) {
      return '';
    }

    return super.transform(value, metadata);
  }
}