# e-chalan-download-service

steps to push docker image
1. docker buildx build --platform linux/amd64 -t my-node-app . --output type=docker
2. docker save my-node-app > my-node-app.tar
3. scp -i "./acabc-key.pem" ./my-node-app.tar ec2-user@ec2-3-111-30-66.ap-south-1.compute.amazonaws.com:~/
4. docker load < my-node-app.tar
5. docker run -d --restart unless-stopped -p 3000:3000 my-node-app
6. sudo systemctl restart nginx