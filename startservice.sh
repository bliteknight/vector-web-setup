#!/bin/bash
export ROOT_DIR=/opt/nodeapps/vector-web-setup

/usr/bin/forever start -a -w --watchDirectory $ROOT_DIR \
--sourceDir $ROOT_DIR \
-l $ROOT_DIR/logs/forever.log \
-o $ROOT_DIR/logs/out.log \
-e $ROOT_DIR/logs/error.log \
server.js