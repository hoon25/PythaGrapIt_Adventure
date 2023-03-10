cd docker
docker-compose up -d
cd ..
echo "###################"
echo "mysql 서버 ON"
echo "###################"

./gradlew build
docker rm -f pgi-was
docker build -f ./Dockerfile -t pgi-was-image .
docker run -itd -p 8080:8080 --name pgi-was pgi-was-image
echo "###################"
echo "springboot 서버 ON"
echo "###################"

cd ../frontend
cp ./package_server.json ./package.json
docker rm -f pgi-web
docker build -f ./Dockerfile -t pgi-web-image .
docker run -itd -p 3000:3000 --name pgi-web pgi-web-image
cp ./package_local.json ./package.json
cd ./springSocket
echo "###################"
echo "react 서버 ON"
echo "###################"

