export function saveToLocalStorage(key: string, value: any): void {

  localStorage.setItem(key, JSON.stringify(value));

}

export function getFromLocalStorage<T>(key: string): T | null {

  const value = localStorage.getItem(key);

  return value ? JSON.parse(value) as T : null;

}

export function removeFromLocalStorage(key: string): void {

  localStorage.removeItem(key);

}
export function safeRemoveFromLocalStorageArray(key: string, element: any): void {
  const storedValue = getFromLocalStorage<any[]>(key);

  // Check if the stored value is an array.
  if (!Array.isArray(storedValue)) {
    throw new TypeError(`Cannot remove element from non-array value in Local Storage at key: "${key}"`);
  }

  // Find the index of the element to remove.
  const index = storedValue.indexOf(element);

  // Check if the element exists in the array.
  if (index === -1) {
    console.warn(`Element not found in array at key: "${key}"`);
    return; // Nothing to remove.
  }

  // Remove the element from the array.
  storedValue.splice(index, 1);

  // Update the Local Storage value with the modified array.
  saveToLocalStorage(key, storedValue);
}

export function removeAllFromLocalStorage() : void {
  removeFromLocalStorage('selectedShowtime');
  removeFromLocalStorage('selectedSeat');
  removeFromLocalStorage('selectedMovie');
  removeFromLocalStorage('selectedPromotion');
}
