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
location /api/ {
    proxy_pass http://localhost:8000/; # mock server
}

location / {
    root   html/element-admin;
    index  index.html;
    try_files $uri $uri/ /index.html;
}
```
