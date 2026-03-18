# 🚀 Vercel 部署指南 - CIAOMIND 网站

## ✅ 第一步：验证 GitHub 仓库

**访问您的仓库**:
https://github.com/utopia013-droid/ciaomind-website

**确认以下内容**:
- ✅ 仓库已创建
- ✅ main 分支存在
- ✅ 所有文件已上传（35个文件，8966行代码）
- ✅ 没有敏感信息（密钥已删除）

---

## 🚀 第二步：部署到 Vercel

### 2.1 访问 Vercel

**打开链接**: https://vercel.com/new

### 2.2 导入 GitHub 仓库

1. **登录 Vercel**
   - 点击 "Sign In"
   - 选择 "Continue with GitHub"
   - 授权 Vercel 访问您的 GitHub 账号

2. **导入项目**
   - 在 "Import Git Repository" 部分
   - 找到 `utopia013-droid/ciaomind-website`
   - 点击 "Import"

### 2.3 配置项目设置

**Vercel 会自动检测到 Next.js 并预填充配置**:

```
Framework Preset: Next.js
  - 自动检测 ✅

Project Name: ciaomind-website
  - 可修改为其他名称（如：ciaomind-official）

Root Directory: ./
  - 保持默认

Build Command: npm run build
  - 自动填充 ✅

Output Directory: .next
  - 自动填充 ✅

Install Command: npm install
  - 自动填充 ✅
```

### 2.4 环境变量

**当前项目不需要环境变量**
- 保持默认即可
- 所有配置都已包含在代码中

### 2.5 部署

1. **点击 "Deploy" 按钮**
2. **等待构建完成**（通常需要 2-3 分钟）
3. **构建步骤**:
   - Installing dependencies
   - Building application
   - Uploading to Cloudflare Network

### 2.6 部署成功

**成功后会显示**:
- ✅ Production URL: `https://ciaomind-website.vercel.app`
- ✅ Git Commit: `eaae84a feat: initial clean commit for production deployment`
- ✅ Build Duration: ~2-3 minutes

---

## 🎉 第三步：验证部署

### 3.1 访问网站

**打开生产环境 URL**:
https://ciaomind-website.vercel.app

**检查功能**:
- [ ] 主页正常显示
- [ ] 导航菜单可点击
- [ ] 中英文切换按钮正常
- [ ] 所有页面链接正常工作
  - About (/about)
  - Services (/services)
  - Team (/team)
  - Contact (/contact)
- [ ] 移动端响应式布局正常
- [ ] 页面加载速度快（< 3秒）
- [ ] 没有控制台错误（按 F12 查看）

### 3.2 测试不同语言

**测试中文**:
- 默认访问: `https://ciaomind-website.vercel.app/zh`
- 检查中文显示正常

**测试意大利文**:
- 访问: `https://ciaomind-website.vercel.app/it`
- 检查意大利文显示正常

**测试语言切换**:
- 点击页面右上角的语言切换按钮
- 确认能在中英文之间正常切换

---

## 🎨 第四步：配置自定义域名（可选）

### 4.1 在 Vercel 中添加域名

1. **进入项目设置**
   - 在 Vercel 控制台点击 `ciaomind-website` 项目
   - 点击 "Settings" 标签

2. **添加域名**
   - 点击左侧菜单 "Domains"
   - 输入您的域名（如：`ciaomind.com` 或 `ciaomind.it`）
   - 点击 "Add"

3. **配置 DNS**
   - Vercel 会显示需要添加的 DNS 记录
   - 登录您的域名注册商（如 Cloudflare、GoDaddy 等）
   - 添加以下记录：
     ```
     Type: CNAME
     Name: @（或您的主机名）
     Value: cname.vercel-dns.com
     ```
   - 或使用 A 记录：
     ```
     Type: A
     Name: @
     Value: 76.76.21.21
     ```

4. **等待 DNS 传播**
   - 通常需要几分钟到几小时
   - Vercel 会自动检测并生成 SSL 证书

5. **域名配置完成**
   - 当状态变为 "Valid Configuration" 即可
   - 您的网站现在可以通过自定义域名访问了

---

## 📊 第五步：性能优化（可选）

### 5.1 使用 Google PageSpeed Insights

**访问**: https://pagespeed.web.dev/

**步骤**:
1. 输入网站 URL
2. 点击 "Analyze"
3. 查看评分和建议

**目标分数**:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 100

### 5.2 使用 Lighthouse

**步骤**:
1. 在 Chrome 浏览器中打开网站
2. 按 F12 打开开发者工具
3. 点击 "Lighthouse" 标签
4. 点击 "Analyze page load"
5. 查看报告

---

## 🔄 第六步：持续部署（自动化）

### 6.1 自动部署已启用

**Vercel 自动部署功能**:
- ✅ 每次推送到 main 分支自动触发部署
- ✅ 每次创建 Pull Request 自动预览部署
- ✅ 回滚到之前的版本（一键操作）

### 6.2 日常更新流程

**修改代码后**:
```bash
cd c:/Users/你好/WorkBuddy/20260318061332/ciaomind-website

# 1. 添加修改的文件
git add .

# 2. 提交更改
git commit -m "update: 描述您的更改"

# 3. 推送到 GitHub
git push

# 4. Vercel 自动部署（无需手动操作）
```

### 6.3 查看部署状态

**在 Vercel 控制台**:
- 进入项目
- 点击 "Deployments" 标签
- 查看所有部署历史
- 点击任意部署查看详细信息
- 可以下载构建日志

---

## 🎯 常见问题解决

### 问题 1: 构建失败

**可能原因**:
- Node.js 版本不兼容
- 依赖包版本冲突
- 代码错误

**解决方案**:
1. 在 Vercel 项目设置中指定 Node.js 版本:
   - Settings → Environment Variables
   - 添加: `NODE_VERSION=20`
2. 检查本地构建: `npm run build`
3. 查看完整的构建日志

### 问题 2: 部署成功但页面空白

**可能原因**:
- 构建输出配置错误
- 路由配置问题
- 静态资源路径错误

**解决方案**:
1. 检查 `next.config.mjs` 配置
2. 查看浏览器控制台错误
3. 检查路由配置
4. 尝试重新部署

### 问题 3: 自定义域名无法访问

**可能原因**:
- DNS 记录配置错误
- DNS 传播未完成
- SSL 证书未生成

**解决方案**:
1. 检查 DNS 记录配置
2. 使用 `nslookup` 或 `dig` 检查 DNS
3. 在 Vercel 控制台检查域名状态
4. 等待 24 小时让 DNS 完全传播

---

## 📈 后续优化建议

### 1. 添加分析工具
- Google Analytics
- Vercel Analytics（免费）

### 2. 性能优化
- 图片优化（使用 next/image）
- 代码分割（Next.js 自动处理）
- 缓存策略（Vercel 自动处理）

### 3. SEO 优化
- 添加 meta 标签
- 生成 sitemap.xml
- 配置 robots.txt

### 4. 安全加固
- 启用 HTTPS（Vercel 自动提供）
- 配置安全头
- 定期更新依赖包

---

## 🎓 总结

**您已完成以下步骤**:
1. ✅ 代码推送到 GitHub
2. ✅ 项目在 Vercel 部署
3. ✅ 网站上线访问
4. ✅ 持续部署自动化

**下一步**:
- 访问 https://vercel.com/new 开始部署
- 等待 2-3 分钟即可看到您的网站上线！

---

**祝您部署成功！🚀**

如有任何问题，随时告诉我！
