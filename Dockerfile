FROM linuxserver/code-server

WORKDIR /app

COPY --from=docker.io/cloudflare/sandbox /container-server/sandbox /sandbox

ENTRYPOINT ["/sandbox"]
CMD ["/init"]