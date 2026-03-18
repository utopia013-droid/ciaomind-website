# CIAOMIND 官方网站

CIAOMIND S.B. S.R.L. 官方网站 - 连接东方与西方的文化桥梁

## 项目概述

本项目是一个基于 Next.js 14 的现代化企业官网,采用静态生成(SSG)方案,支持中意双语,完美适配各类设备。

### 核心功能

- ✅ 响应式设计(移动端/平板/桌面)
- ✅ 中意双语支持
- ✅ 六个核心页面(首页/关于/服务/团队/联系/法律)
- ✅ SEO 优化
- ✅ 高性能加载
- ✅ 现代化设计

### 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **国际化**: next-intl
- **图标**: Lucide React
- **部署**: Cloudflare Pages / Vercel

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm start
```

## 项目结构

```
ciaomind-website/
├── app/                    # Next.js App Router
│   ├── [lang]/            # 国际化路由
│   │   ├── layout.tsx     # 语言布局
│   │   ├── page.tsx       # 首页
│   │   ├── about/         # 关于我们
│   │   ├── services/      # 服务
│   │   ├── team/          # 团队
│   │   ├── contact/       # 联系
│   │   └── legal/         # 法律页面
│   ├── globals.css        # 全局样式
│   └── layout.tsx         # 根布局
├── components/            # 可复用组件
│   ├── Header.tsx         # 导航栏
│   ├── Footer.tsx         # 页脚
│   ├── Hero.tsx          # 首页英雄区
│   ├── ServiceCard.tsx   # 服务卡片
│   ├── TeamMember.tsx    # 团队成员
│   ├── ContactForm.tsx   # 联系表单
│   └── ui/               # UI 组件
├── lib/                  # 工具函数
│   └── i18n.ts          # 国际化配置
├── messages/             # 翻译文件
│   ├── it.json          # 意大利语
│   └── zh.json          # 中文
├── data/                # 结构化数据
│   ├── team.ts          # 团队数据
│   ├── services.ts      # 服务数据
│   └── company.ts       # 公司信息
└── public/              # 静态资源
    └── images/          # 图片资源
```

## 部署指南

### Cloudflare Pages 部署

#### 方法一: 通过 Git 集成部署(推荐)

1. 将代码推送到 GitHub/GitLab
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
3. 进入 Pages → Create a project
4. 选择 "Connect to Git"
5. 授权并选择仓库
6. 配置构建设置:
   - **构建命令**: `npm run build`
   - **输出目录**: `out`
   - **环境变量**: 无需额外配置

#### 方法二: 直接上传部署

1. 本地构建项目:
   ```bash
   npm run build
   ```

2. 登录 Cloudflare Dashboard
3. 进入 Pages → Create a project
4. 选择 "Direct Upload"
5. 上传 `out` 目录

### Vercel 部署

1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 "New Project"
4. 导入 GitHub 仓库
5. Vercel 会自动检测 Next.js 并配置
6. 点击 "Deploy"

## 环境变量

本项目无需额外环境变量。

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

MIT License

## 联系方式

- 邮箱: info@ciaomind.it
- 网站: https://www.ciaomind.it
- 地址: Via Roma, 123, 00100 Roma, Italia

## 设计规范

### 品牌色彩

- 主色: 深海军蓝 `#0F234B`
- 强调色: 精致珊瑚红 `#DA4644`
- 文字色: 炭灰色 `#2D2D2D`
- 背景色: 米白色 `#F8F9FA`

### 字体系统

- 标题: Inter, 700 weight
- 副标题: Inter, 600 weight
- 正文: Inter, 400 weight

## 性能优化

- ✅ 图片自动优化(WebP/AVIF)
- ✅ 字体子集化
- ✅ 代码分割
- ✅ 懒加载
- ✅ 静态生成(SSG)

---

**© 2026 CIAOMIND S.B. S.R.L. 版权所有**
