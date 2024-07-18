const obj = {
  a: 1,
  b: 2,
  c: 3,
}

// Object.keys(obj).forEach(prop => (obj[prop] = undefined))
// Object.keys(obj).forEach(prop => delete obj[prop])

// let prop = 'c'
// obj[prop] = undefined

let x = delete obj['a']
