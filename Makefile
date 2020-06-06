.PHONY: build clean data
build: clean
	mkdir -p ../public_html/packet-lab/
	cp -r dist/ ../public_html/packet-lab/
clean:
	rm -rf ../public_html/packet-lab/
cleandata:
	rm -rf ./public/data/
data: cleandata
	mkdir ./public/data/
	python3 ./scripts/monitor-status-fake-data.py > ./public/data/monitors-status.jsonl
