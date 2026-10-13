.PHONY: deploy-docker deploy-pm2

deploy-pm2:
	bash ./script/run.pm2.sh

deploy-docker:
	bash ./script/run.docker.sh
