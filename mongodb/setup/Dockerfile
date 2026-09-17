ARG MONGO_IMAGE_VERSION
FROM mongo${MONGO_IMAGE_VERSION}

COPY ./replica-set-configs.js /
COPY setup.sh /

EXPOSE ${MONGO_PORT}
ENTRYPOINT [ "/bin/bash" ]
CMD ["/setup.sh"]