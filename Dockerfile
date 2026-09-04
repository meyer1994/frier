FROM docker.io/cloudflare/sandbox:next

RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

RUN pip3 install httpbin gunicorn --break-system-packages
