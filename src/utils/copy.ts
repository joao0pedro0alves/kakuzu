export function copy<T>(valueToCopy: T): T {
  if (typeof valueToCopy === 'object') return JSON.parse(JSON.stringify(valueToCopy))
  return valueToCopy
}
