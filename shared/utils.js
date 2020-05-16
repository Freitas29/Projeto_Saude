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
    