#!/bin/bash
gitpush(){
  data=`date +%Y-%m-%d_%H:%M:%S`
  git add -A
  git commit -m "$data"
  git push origin dev
}
echo '开始执行任务'
npm run build
echo '构建完成'
gitpush
echo '推送完成'
git subtree push --prefix=dist origin master
echo '更新完成'