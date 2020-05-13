.PHONY: build clean
build: clean
	mkdir -p ../public_html/packet-lab/
	cp -r dist/ ../public_html/packet-lab/
clean:
	rm -rf ../public_html/packet-lab/
