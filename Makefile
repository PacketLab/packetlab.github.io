.PHONY: build clean data
build: clean
	mkdir -p ../public_html/packet-lab/
	cp -r dist/* ../public_html/packet-lab/
deploy_caida:
	BASE_URL="/~vspillai/packet-lab/"
	npm run build
	git add --all .
	git commit -m "Build for CAIDA deployment"
	git push origin vue-spa
deploy:
	BASE_URL="/"
	npm run build
	git add --all .
	git commit -m "Build for packetlab.github.io deployment"
	git push deploy vue-spa 
clean:
	rm -rf ../public_html/packet-lab/
cleandata:
	rm -rf ./public/data/
data: cleandata
	mkdir ./public/data/
	python3 ./scripts/monitor-status-fake-data.py > ./public/data/monitors-status.jsonl
