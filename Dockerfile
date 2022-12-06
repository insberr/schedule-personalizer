FROM node:18

# rust stage

# Get Ubuntu packages
RUN apt-get update && apt-get install -y \
    build-essential \
    curl

# Get Rust
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- --profile minimal -y

ENV PATH="/root/.cargo/bin:${PATH}"

# end rust stage


WORKDIR /app
COPY .yarn ./.yarn
COPY .yarnrc.yml ./
COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . .
RUN yarn build

FROM lipanski/docker-static-website:latest

COPY --from=0 /app/dist .