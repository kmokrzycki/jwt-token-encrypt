#!/bin/bash

# Bake below process to docker

source ~/.bashrc
nvm install 8.6.0
nvm use 8.6.0
npm list -g | grep yarn || npm install yarn -g

yarn install
yarn build
yarn test &&

# npm publish .
