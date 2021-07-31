import { ref, Ref } from 'vue';

function sharedRef<T>(key: string, value: T): Ref;
function sharedRef(key: string): Ref;

const sharedMap = new Map();
function sharedRef<T>(key: string, value?: T): Ref {
  if (sharedMap.has(key)) {
    return sharedMap.get(key);
  }

  let newRef = ref(value);

  sharedMap.set(key, newRef);

  return newRef;
}

export { sharedRef, sharedMap };
