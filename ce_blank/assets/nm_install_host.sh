#!/bin/sh
# Copyright 2013 The Chromium Authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.

set -e

DIR="$( cd "$( dirname "$0" )" && pwd )"
if [ $(uname -s) == 'Darwin' ]; then
  if [ "$(whoami)" == "root" ]; then
    # Due to macOS permission changes we need to put the host in /Applications
    HOST_PATH="/Applications/nm_nodejs.mjs"
    cp "$DIR/nm_nodejs.mjs" $HOST_PATH

    TARGET_DIR="/Library/Google/Chrome/NativeMessagingHosts"
    chmod a+x "$DIR/nm_nodejs.mjs"
  else
    # Due to macOS permission changes we need to put the host in ~/Applications
    HOST_PATH="/Users/$USER/Applications/nm_nodejs.mjs"
    cp "$DIR/nm_nodejs.mjs" $HOST_PATH

    TARGET_DIR="$HOME/Library/Application Support/Google/Chrome/NativeMessagingHosts"
  fi
else
  HOST_PATH="$DIR/nm_nodejs.mjs"
  if [ "$(whoami)" == "root" ]; then
    TARGET_DIR="/etc/opt/chrome/native-messaging-hosts"
    chmod a+x "$DIR/nm_nodejs.mjs"
  else
    TARGET_DIR="$HOME/.config/google-chrome/NativeMessagingHosts"
  fi
fi

HOST_NAME=nm_nodejs

# Create directory to store native messaging host.
mkdir -p "$TARGET_DIR"

# Copy native messaging host manifest.
cp "$DIR/$HOST_NAME.json" "$TARGET_DIR"

# Update host path in the manifest.
ESCAPED_HOST_PATH=${HOST_PATH////\\/}
sed -i -e "s/HOST_PATH/$ESCAPED_HOST_PATH/" "$TARGET_DIR/$HOST_NAME.json"

# Set permissions for the manifest so that all users can read it.
chmod o+r "$TARGET_DIR/$HOST_NAME.json"

echo Native messaging host $HOST_NAME has been installed.
