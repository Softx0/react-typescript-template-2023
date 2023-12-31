#!/bin/bash
env=$1

TAG_IMAGE=TAG_IMAGE_$env
NODE_ENV=NODE_ENV_$env
PORT=PORT_$env

VITE_REACT_APP_API_URL=REACT_APP_API_URL_$env
VITE_REACT_APP_API_KEY=REACT_APP_API_KEY_$env

echo TAG_IMAGE=${!TAG_IMAGE} >> ../env
echo NODE_ENV=${!NODE_ENV} >> ../env
echo PORT=${!PORT} >> ../env

echo VITE_REACT_APP_API_URL=${!VITE_REACT_APP_API_URL} >> ../env
echo VITE_REACT_APP_API_KEY=${!VITE_REACT_APP_API_KEY} >> ../env