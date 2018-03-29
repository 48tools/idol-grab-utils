# idol-grab-utils

[![npm version](https://img.shields.io/npm/v/idol-grab-utils.svg?style=flat-square)](https://www.npmjs.org/package/idol-grab-utils)

抓取口袋48（聚聚房间/直播录播源信息）/微博/摩点众筹/摩点微打赏 工具集，提供 HTTP 方式访问 or Node.js API

## 安装

使用 Git 克隆（通过 HTTP 访问）:

```bash
$ git clone https://github.com/dbFlower/idol-grab-utils.git
```

使用 NPM 安装（直接使用 API）:

```bash
$ npm install --save-dev idol-grab-utils
```

直接下载 zip：

```bash
$ wget https://github.com/dbFlower/idol-grab-utils/archive/master.zip
```

## 配置基本信息

若未使用 NPM 安装， 请先安装依赖：

```bash
$ npm i
```

### 开启 HTTP 访问的配置方法

配置 `config.js`
```js
{
  token: '', // HTTP接口的token, 大小写不敏感。 若直接使用服务或不需要验证token则可留空
  pocket48: {
    // 若不需要使用口袋房间消息功能则可不必配置账号密码
    account: '', // 口袋48手机号
    password: '', // 口袋48密码
  },
  port: 3000, // 开发模式端口，修改生产模式端口请编辑 process.json
  IMEI: '866716037125816', // 用于发请求的IMEI码, 15位, 请不要使用自己手机的IMEI以防被封设备
}
```

### 调用 Node.js API 的配置方法

若在服务中需要使用口袋48房间相关api， 请用以下方式配置账号密码：

```js
  const { pocket48 } = require('idol-grab-utils')
  const koudai48 = {
    account: '1xxxxxxxx', // 手机号
    password: 'Your password here',
  }

  Object.assign(pocket48, koudai48)

  // 请不要直接对pocket48进行赋值！
```

## 启动

### 启动 HTTP 服务

调试模式（端口默认为3000）：

```bash
$ npm start
```

生产模式（端口默认为4004）：

```bash
$ npm run pm2
```

### 调用 Node.js API

```js
  const { weiboService } = require('idol-grab-utils')
  // ...some code 
  async function fetchWeibo() {
    const data = await weiboService.getWeibo('3050742117') // 用户 UID 即可。
    // ... 分析微博数据
    // ... 判断是否有新微博
    // ... some code 
  }
```

## 通过 HTTP 访问

所有的接口都支持 GET/POST 两种请求方式。

### token 验证

若开启token验证，则验证每个请求是否携带token。 当前支持三种方式传输token：

#### 在 headers 中发送 token
#### 在 url 中携带 token: ?token=xxxx
#### 在 post 方式请求时将 token 作为 Post Data 发送


## TODO

具体文档的坑还未填

HTTP的所有接口都在 `routes/index.js` 中可以查看

所有Node.js 可以调用的 API 在 `services` 文件夹中