# element-admin
vue+vue-router+vuex+elementUI的管理系统
## 开发

```bash
# clone the project
git clone https://github.com/jim-xiao-feng/element-admin.git

# enter the project directory
cd element-admin

# install dependency
npm install

# develop
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
