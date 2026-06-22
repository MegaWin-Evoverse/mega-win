export function getTurboValue<T>(isTurbo: boolean, normalValue: T, turboValue: T): T {
  return isTurbo ? turboValue : normalValue;
}
