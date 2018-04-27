```
{
  $desc: '首页banner',
  $params: {
    pageSize: {
      desc: '分页',
      exp: 2,
    },
    keywords: {
      desc: '关键词',
    },
  },
  $body: {
    list: [{
      mid: 1001,
      name: 'wyz',
      email: '123456789@qq.com',
      mobile: '15011459186',
      dept: '技术部',
      status: '正常',
    }],
    pagination: {
      total: 200,
      pageSize: 20,
      current: 1,
    },
  },
}
```