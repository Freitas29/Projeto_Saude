export function groupBy(arr, fn) {
    return arr
      .map(typeof fn === 'function' ? fn : val => val[fn])
      .reduce((acc, val, i) => {
        acc[val] = (acc[val] || []).concat(arr[i])
        return acc
      }, {})
  }


export function sleep(ms){ 
    return new Promise(resolve => setTimeout(resolve, ms))
}
    

export function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
