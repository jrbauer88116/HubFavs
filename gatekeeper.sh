#!/bin/sh
lsof -ti:9999 | xargs kill
lsof -ti:9838 | xargs kill
cp -fr gatekeeper.json ./node_modules/gatekeeper/config.json