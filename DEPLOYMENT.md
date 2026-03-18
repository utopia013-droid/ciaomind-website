# CIAOMIND 网站部署指南

## 项目已成功构建! 🎉

构建已完成,静态文件已生成在 `.next` 目录中。

## 部署方案

### 方案 1: Cloudflare Pages 部署(推荐)

由于您已经拥有 Cloudflare 账号,这是最推荐的方案。

#### 步骤 1: 推送代码到 Git 仓库

1. 在 GitHub/GitLab 上创建新仓库
2. 在项目根目录执行:

```bash
git init
git add .
git commit -m "Initial commit: CIAOMIND website"
git remote add origin <您的仓库地址>
git push -u origin main
```

#### 步骤 2: 在 Cloudflare Pages 中连接 Git

1. 访问 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 进入 **Workers & Pages** → **Create Application**
3. 选择 **Pages** → **Connect to Git**
4. 授权并选择您的仓库

#### 步骤 3: 配置构建设置

在 Cloudflare Pages 配置页面,设置:

- **项目名称**: ciaomind-website
- **生产分支**: main
- **构建命令**:
  ```
  npm run build
  ```
- **输出目录**: `.next` (注意:不是 out,因为我们使用 SSG 模式)
- **根目录**: (留空)

#### 步骤 4: 环境变量(可选)

本网站无需额外环境变量,可以跳过此步骤。

#### 步骤 5: 部署

点击 **Save and Deploy**,Cloudflare 会自动:
1. 克隆您的代码
2. 安装依赖
3. 构建项目
4. 部署到全球 CDN

等待几分钟后,您的网站就可以访问了!

### 方案 2: Cloudflare Pages 直接上传

如果您不想使用 Git,可以直接上传静态文件。

#### 步骤 1: 导出静态文件

由于项目配置为 SSG 模式,静态文件已经在 `.next` 目录中。

#### 步骤 2: 打包文件

```bash
# Windows PowerShell
Compress-Archive -Path .next\* -DestinationPath ciaomind-site.zip
```

#### 步骤 3: 上传到 Cloudflare Pages

1. 访问 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 进入 **Workers & Pages** → **Create Application**
3. 选择 **Pages** → **Direct Upload**
4. 拖拽 `ciaomind-site.zip` 文件
5. 等待部署完成

### 方案 3: Vercel 部署(备选)

Vercel 是 Next.js 的官方部署平台,配置最简单。

#### 步骤 1: 推送代码到 GitHub

(同方案 1 的步骤 1)

#### 步骤 2: 在 Vercel 中导入项目

1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 **New Project**
4. 导入您的 GitHub 仓库
5. Vercel 会自动检测 Next.js 并配置构建设置

#### 步骤 3: 部署

点击 **Deploy**,等待几分钟即可完成。

## 域名配置

### Cloudflare Pages

1. 在项目设置中点击 **Custom domains**
2. 添加您的域名(如: ciaomind.it)
3. 根据提示添加 DNS 记录

### Vercel

1. 在项目设置中点击 **Domains**
2. 添加您的域名
3. 按照指示配置 DNS

## 性能优化建议

### 启用 Cloudflare 缓存

在 Cloudflare Pages 设置中:
- 启用 **Cache Level: Standard**
- 启用 **Browser Cache TTL: 1 day**
- 启用 **Edge Cache TTL: 1 hour**

### 图片优化

- 添加真实的团队照片到 `public/images/` 目录
- 使用 WebP 格式以减小文件大小
- 添加适当的 alt 文本以提高 SEO

### CDN 加速

Cloudflare Pages 和 Vercel 都提供全球 CDN,无需额外配置。

## 监控和分析

### Cloudflare Analytics

Cloudflare Pages 提供免费的访问分析:
- 访问量统计
- 地理分布
- 设备类型
- 性能指标

### Google Analytics(可选)

如果需要更详细的统计分析:
1. 注册 [Google Analytics](https://analytics.google.com)
2. 获取追踪 ID
3. 在 `app/layout.tsx` 中添加分析代码

## 常见问题

### 构建失败

如果构建失败,请检查:
- Node.js 版本(建议使用 18.x 或 20.x)
- 依赖是否正确安装(`npm install`)
- TypeScript 配置是否正确

### 页面空白

如果部署后页面空白:
- 检查浏览器控制台是否有错误
- 确认所有文件都已上传
- 清除浏览器缓存后重试

### 图片不显示

确保:
- 图片文件已放入 `public/images/` 目录
- 文件路径正确
- 图片格式支持(jpg, png, webp 等)

## 更新网站

### Git 部署方式

只需:
1. 修改代码
2. 提交并推送到 Git
3. Cloudflare/Vercel 会自动重新部署

### 直接上传方式

需要:
1. 修改代码
2. 重新构建(`npm run build`)
3. 重新打包并上传到 Cloudflare Pages

## 技术支持

如果遇到问题:

1. **Cloudflare Pages 文档**: https://developers.cloudflare.com/pages/
2. **Vercel 文档**: https://vercel.com/docs
3. **Next.js 文档**: https://nextjs.org/docs

---

**祝部署顺利! 🚀**

如需帮助,请联系: info@ciaomind.it
