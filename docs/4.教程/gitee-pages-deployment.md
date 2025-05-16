# Gitee Pages 自动部署指南

本指南将帮助您配置 Gitee Pages 服务以自动部署您的 VuePress 网站。

## 前提条件

1. Gitee 账号
2. 已在 Gitee 上创建的仓库

## 配置步骤

### 1. 设置 Gitee Go 

首先，您需要在 Gitee 仓库上启用 Gitee Go 功能。这是 Gitee 提供的类似于 GitHub Actions 的 CI/CD 服务。

1. 登录您的 Gitee 账号
2. 进入您的项目仓库
3. 点击"服务" -> "Gitee Go"
4. 启用 Gitee Go 服务

### 2. 配置仓库密钥

需要在 Gitee 仓库中添加以下密钥，用于自动部署：

1. 在仓库页面，点击"管理" -> "仓库设置" -> "Gitee Go" -> "环境变量"
2. 添加以下环境变量：
   - `GITEE_USERNAME`: 您的 Gitee 用户名
   - `GITEE_PASSWORD`: 您的 Gitee 密码（或者访问令牌，推荐使用）
   - `GITEE_REPO`: 您的仓库名称，格式为 `用户名/仓库名`

### 3. 关于工作流文件

我们已经在项目的 `.workflow/deploy.yml` 文件中配置了自动部署的工作流。每当您推送代码到 `main` 分支时，或者手动触发工作流时，它会自动构建并部署您的网站。

工作流的主要步骤包括：
1. 检出代码
2. 配置 Node.js 环境
3. 配置 pnpm
4. 安装项目依赖
5. 构建 VuePress 网站
6. 将构建结果部署到 Gitee Pages

### 4. 启用 Gitee Pages

1. 在您的 Gitee 仓库页面，点击"服务" -> "Gitee Pages"
2. 选择部署分支为 `gh-pages`（这是我们在工作流中设置的分支名）
3. 点击"启动" 按钮

### 5. 手动触发首次部署

第一次推送代码后，您可能需要手动触发部署：

1. 在 Gitee 仓库页面，进入"Gitee Go" 工作流列表
2. 找到 "部署 VuePress 网站" 工作流
3. 点击"运行" 按钮触发部署

## 注意事项

- Gitee Pages 服务可能会有一些限制，请确保您了解这些限制
- 对于个人仓库，Gitee Pages 服务需要手动更新，无法完全自动化，每次构建后可能需要手动点击更新按钮
- 如果您有自定义域名，可以在 Gitee Pages 设置中配置

## 故障排除

如果您在部署过程中遇到问题：

1. 检查工作流日志，查看错误信息
2. 确保您的密钥配置正确
3. 确保您的仓库分支名称与工作流配置中的一致

如有其他问题，请参考 [Gitee Go 官方文档](https://gitee.com/help/articles/4229) 