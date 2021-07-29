# element-admin
vue+vue-router+vuex+elementUI的管理系统
## 开发

```bash
# 下载项目
git clone https://github.com/jim-xiao-feng/element-admin.git

# 进入项目文件夹
cd element-admin

# 安装依赖
npm install

# 运行
npm run start

it will automatically open http://localhost:3000
```
## 生产
```bash
# compile
npm run build
```

##### 配置 `nginx` :

```nginx
server {
  listen        3000;
  server_name   localhost;

  location /api/ {
    proxy_pass http://127.0.0.1:8000/;
  }

  location / {
    root   html/element-admin;
    index  index.html;
    try_files $uri $uri/ /index.html;
  }
}
```
