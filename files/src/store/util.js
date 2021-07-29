export function setItem(array, item) {
  const oldItem = array.find(i => i.id == item.id);
  if (oldItem) {
    Object.assign(oldItem, item);
    return oldItem;
  } else {
    array.push(item);
    return item;
  }
}

export function setArray(target, source) {
  const result = [];
  source.forEach(item =>{
    const oldItem = target.find(i => i.id == item.id);
    if (oldItem) {
      Object.assign(oldItem, item);
      result.push(oldItem);
    } else {
      result.push(item);
    }
  });
  return result;
}

export function patchArray(target, source) {
  source.forEach(item =>{
    setItem(target, item);
  });
}

export function findById(array, id) {
  return array.find(i => i.id === id);
}
