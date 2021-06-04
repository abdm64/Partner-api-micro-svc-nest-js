
#install redis as event bus 
helm install  redis-mq  bitnami/redis -n cvm-prod


#get the tag from git
SHA=$(git rev-parse HEAD)
#Build images with tags
docker build  -t dmp-api-k8s-registry.com:443/dte-cms-app:latest -t dmp-api-k8s-registry.com:443/dte-cms-app:$SHA -f ./cms-app/Dockerfile ./cms-app
docker build  -t dmp-api-k8s-registry.com:443/dte-dbss-api:latest -t dmp-api-k8s-registry.com:443/dte-dbss-api:$SHA -f ./dbss-api/Dockerfile ./dbss-api
docker build -t dmp-api-k8s-registry.com:443/dte-eligible-api:latest -t dmp-api-k8s-registry.com:443/dte-eligible-api:$SHA -f ./eligible-api/Dockerfile ./eligible-api
docker build -t dmp-api-k8s-registry.com:443/dte-eligible-app:latest -t dmp-api-k8s-registry.com:443/dte-eligible-app:$SHA -f ./eligible-app/Dockerfile ./eligible-app
docker build -t dmp-api-k8s-registry.com:443/getway-api:latest -t dmp-api-k8s-registry.com:443/getway-api:$SHA -f ./getway-api/Dockerfile ./getway-api


#push latest images 
docker push  dmp-api-k8s-registry.com:443/dte-cms-app:latest 
docker push  dmp-api-k8s-registry.com:443/dte-dbss-api:latest 
docker push  dmp-api-k8s-registry.com:443/dte-eligible-api:latest
docker push  dmp-api-k8s-registry.com:443/dte-eligible-app:latest
docker push  dmp-api-k8s-registry.com:443/getway-api:latest
#push git latest images
docker push  dmp-api-k8s-registry.com:443/dte-cms-app:$SHA 
docker push  dmp-api-k8s-registry.com:443/dte-dbss-api:$SHA
docker push  dmp-api-k8s-registry.com:443/dte-eligible-api:$SHA
docker push  dmp-api-k8s-registry.com:443/dte-eligible-app:$SHA
docker push  dmp-api-k8s-registry.com:443/getway-api:$SHA

#apply the deployment files 
kubectl apply -f k8s
#set the latest iamges 
kubectl set image deployments/cms-app-depl cms-app=dmp-api-k8s-registry.com:443/dte-cms-app:$SHA  -n cvm-prod
kubectl set image deployments/dbss-api-depl dbss-api=dmp-api-k8s-registry.com:443/dte-dbss-api:$SHA  -n cvm-prod
kubectl set image deployments/eligible-api-depl eligible-api=dmp-api-k8s-registry.com:443/eligible-api:$SHA  -n cvm-prod
kubectl set image deployments/eligible-app-depl eligible-app=dmp-api-k8s-registry.com:443/eligible-app:$SHA  -n cvm-prod
kubectl set image deployments/getway-api-depl getway-api=dmp-api-k8s-registry.com:443/getway-api:$SHA  -n cvm-prod

