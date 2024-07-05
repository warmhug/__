#!/bin/sh
# Copyright 2013 The Chromium Authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.

set -e

if [ "$(uname -s)" = "Darwin" ]; then
  if [ "$(whoami)" = "root" ]; then
    HOST_PATH="/Applications/nm_sh"
    rm $HOST_PATH
    TARGET_DIR="/Library/Google/Chrome/NativeMessagingHosts"
  else
    HOST_PATH="/Users/$USER/Applications/nm_sh"
    rm $HOST_PATH
    TARGET_DIR="$HOME/Library/Application Support/Google/Chrome/NativeMessagingHosts"
  fi
else
  if [ "$(whoami)" = "root" ]; then
    TARGET_DIR="/etc/opt/chrome/native-messaging-hosts"
  else
    TARGET_DIR="$HOME/.config/google-chrome/NativeMessagingHosts"
  fi
fi

HOST_NAME=nm_sh
rm "$TARGET_DIR/nm_sh.json"
echo "Native messaging host $HOST_NAME has been uninstalled."
