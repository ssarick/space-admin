export function getTimezone(): string | number {
  const timezone = Intl
    ?.DateTimeFormat?.()
    ?.resolvedOptions?.()
    ?.timeZone;

  if (timezone) return timezone;

  return new Date().getTimezoneOffset();
}
