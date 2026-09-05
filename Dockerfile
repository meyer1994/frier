FROM docker.io/cloudflare/sandbox:next

RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://github.com/coder/code-server/releases/download/v4.96.2/code-server-4.96.2-linux-amd64.tar.gz | tar -xzf - -C /opt && \
    ln -s /opt/code-server-4.96.2-linux-amd64/bin/code-server /usr/local/bin/code-server

RUN printf '%s\n' '#!/bin/sh' 'exec /usr/local/bin/code-server --bind-addr 0.0.0.0:8443 --auth none --disable-telemetry' > /start && chmod +x /start

EXPOSE 8443
