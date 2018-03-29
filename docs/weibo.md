# Weibo

获取微博内容

## 通过 HTTP 访问

/weibo/:uid

## API

## Weibo 

### HTTP

`/weibo/:uid`

### Service

#### weiboService.getWeibo(uid)

```js
  const { weiboService } = require('idol-grab-utils')
  
  weiboService.getWeibo(uid).then(function(data) {
    // 处理微博数据
  })
```
