// https://github.com/sindresorhus/type-fest/blob/78019f42ea888b0cdceb41a4a78163868de57555/source/opaque.d.ts#L65
export type DateTime = string & { readonly __opaque__: 'DateTime' };

export function toDateTime(dateOrString: string | Date): DateTime {
  const date =
    typeof dateOrString === 'string' ? new Date(dateOrString) : dateOrString;
  return date.toISOString() as DateTime;
}

export function parseDateTime(dateTime: DateTime): Date {
  if (typeof dateTime !== 'string') {
    throw new Error('Conversion Error');
  }

  return new Date(dateTime);
}

export function parseDateTimeOptional(dateTime?: DateTime): Date | null {
  if (dateTime == null) {
    return null;
  }

  if (typeof dateTime !== 'string') {
    throw new Error('Conversion Error');
  }

  return new Date(dateTime);
}
