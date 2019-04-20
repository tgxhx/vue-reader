#!/bin/sh

img=vue-reader

hash=`git log | head -1 | awk '{print $2}'`
short=${hash:0:10}
timestamp=$(date '+%Y%m%d-%H%M')
tag=${timestamp}-${short}

baseDir=$(pwd)
echo ${baseDir}

echo "build start."
cd ${baseDir} && npm install
cd ${baseDir} && npm run build || exit 0
echo "build done."

container=vue-reader
docker stop ${container}
docker rm ${container}

echo "build image start."
cd ${baseDir}
docker build -t ${img} . || exit 0
echo "build image end."

docker run --name ${container}  -p 8082:8082 -d ${img} || exit 0

echo image: ${img}
echo tag: ${tag}
echo container: ${container}

echo "All Done."
