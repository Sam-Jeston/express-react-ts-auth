import { merge } from 'lodash'

export function cookieParser (cookies: string): {[cookieKey: string]: string} {
  return cookies.split(';')
    .map(c => {
      if (c[0] === ' ') {
        return c.substring(1)
      } else {
        return c
      }
    })
    .map(c => c.split('='))
    .map(c => ({[c[0]]: c[1]}))
    .reduce((acc, val) => {
      merge(acc, val)
      return acc
    }, {})
}

export function deleteCookie (name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}
