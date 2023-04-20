type StorageKey = string

export function getItem<T = unknown>(key: StorageKey, fallbackInitialState: T) {
  try {
    const storageValue = localStorage.getItem(key)

    if (storageValue) {
      const parsed = JSON.parse(storageValue)
      return parsed
    }
  } catch (error) {
    removeItem(key)
  }

  return fallbackInitialState
}

export function setItem<T = string | object>(key: StorageKey, value: T) {
  if (typeof value === 'string') {
    localStorage.setItem(key, value)
  } else {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

export function removeItem(key: StorageKey) {
  localStorage.removeItem(key)
}
