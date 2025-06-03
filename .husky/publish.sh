#!/bin/bash
set -e  # 遇到错误退出

# 1. 构建项目
echo "🚀 开始构建项目..."
yarn build

# 2. 检查 dist 目录是否存在
if [ ! -d "dist" ]; then
    echo "❌ 错误：dist 目录不存在"
    exit 1
fi

echo "📦 添加 dist 到临时提交..."
git add -f dist
COMMIT_MSG="临时部署commit: $(date +'%Y-%m-%d %H:%M')"
git commit -m "$COMMIT_MSG" --no-verify || true

echo "正在拆分子树到临时分支..."
git branch -D gh-pages-temp || true
git subtree split --prefix=dist --branch=gh-pages-temp --rejoin

echo "强制推送到gh-pages分支..."
git push origin gh-pages-temp:gh-pages --force

echo "清理临时分支..."
git branch -D gh-pages-temp

echo "🧹 清理临时提交..."
git reset HEAD~1 --soft

echo "✅ 部署成功！"