#  mock

模拟服务器

开发

```powershell
git clone https://github.com/jim-xiao-feng/element-admin.git
cd element-admin
yarn install
yarn dev
```

 部署

```powershell
# 安装 pm2
npm install -g pm2
yarn build
pm2 start ecosystem.config.js --env production
```

