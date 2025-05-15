@echo off
echo 开始构建和部署过程...

echo 1. 安装依赖...
call pnpm install

echo 2. 构建包...
call pnpm build:package

echo 3. 构建文档...
call pnpm docs:build

echo 构建完成！

echo 您现在可以通过GitHub Actions部署该项目：
echo 1. 提交您的更改到GitHub
echo 2. 推送更改到main分支
echo 3. GitHub Actions将自动部署到GitHub Pages

pause