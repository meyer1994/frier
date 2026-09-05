FROM docker.io/cloudflare/sandbox:0.12.9

RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/*

RUN wget -q https://github.com/coder/code-server/releases/download/v4.96.2/code-server-4.96.2-linux-amd64.tar.gz && \
    tar -xzf code-server-4.96.2-linux-amd64.tar.gz && \
    mv code-server-4.96.2-linux-amd64 /usr/lib/code-server && \
    ln -s /usr/lib/code-server/bin/code-server /usr/bin/code-server && \
    rm code-server-4.96.2-linux-amd64.tar.gz

EXPOSE 8443

# here for reference, cloudflare sandbox does not execut the CMD
CMD ["code-server", "--bind-addr", "0.0.0.0:8443", "--auth", "none", "--disable-telemetry"]
