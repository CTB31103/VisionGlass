ARG MONGO_IMAGE_VERSION=@sha256:a9898dbcb782bb9bae57660281ffcc8fc6186e674464bdaa613d9e101fc296d3 
FROM mongodb/mongodb-community-server${MONGO_IMAGE_VERSION} as Runner

WORKDIR /scripts

CMD ["sh", "-c", "sh /mongo_setup.sh"]