---
source: https://carbon.now.sh/?bg=rgba%2829%2C129%2C215%2C1%29&t=nord&wt=none&l=text%2Fx-csharp&ds=true&dsyoff=20px&dsblur=68px&wc=true&wa=true&pv=56px&ph=56px&ln=false&fl=1&fm=Hack&fs=14px&lh=133%25&si=false&es=2x&wm=false
---
![[banner.png]]

```
const pluckDeep = key => obj => key.split('.').reduce((accum, key) => accum[key], obj)
```

```
const compose = (...fns) => res => fns.reduce((accum, next) => next(accum), res)
```

```
const unfold = (f, seed) => {
```

```
  const go = (f, seed, acc) => {
```

```
    const res = f(seed)
```

```
    return res ? go(f, res[1], acc.concat([res[0]])) : acc
```

```
  return go(f, seed, [])
```