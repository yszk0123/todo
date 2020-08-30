// https://github.com/sindresorhus/type-fest/blob/78019f42ea888b0cdceb41a4a78163868de57555/source/opaque.d.ts#L65
export type DateTime = string & { readonly __opaque__: 'DateTime' };

export function toDateTime(dateOrString: string | Date): DateTime {
  const date =
    typeof dateOrString === 'string' ? new Date(dateOrString) : dateOrString;
  return date.toISOString() as DateTime;
}

// FIXME
export function fromLocalDateString(localDateString: string): DateTime {
  const isLocal = !/T[-+]?\d+:\d+(?::\d+)(?:\.\d+)?$|Z$/.test(localDateString);
  return isLocal
    ? (`${toDateTime(localDateString)}T${getTimezoneString()}` as DateTime)
    : toDateTime(localDateString);
}

export function parseDateTime(dateTime: DateTime): Date {
  if (typeof dateTime !== 'string') {
    throw new Error('Conversion Error');
  }

  return new Date(dateTime);
}

export function parseDateTimeOptional(dateTime?: DateTime | null): Date | null {
  if (dateTime == null) {
    return null;
  }

  if (typeof dateTime !== 'string') {
    throw new Error('Conversion Error');
  }

  return new Date(dateTime);
}

function getTimezoneString() {
  const offset = new Date().getTimezoneOffset();
  const absOffset = Math.abs(offset);
  const hour = Math.floor(absOffset / 60);
  const minute = absOffset % 60;
  const hourString = hour < 10 ? `0${hour}` : `${hour}`;
  const minuteString = minute < 10 ? `0${minute}` : `${minute}`;
  const signString = offset < 0 ? '+' : '-';
  return `${signString}${hourString}:${minuteString}`;
}
