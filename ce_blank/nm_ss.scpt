tell application "System Events" to tell process "ClashX"
  tell menu bar item 1 of menu bar 2
    # delay 1
    click
    # -- Command O
    # key code 31 using command down
    # -- Command R
    key code 15 using command down
    # click menu item "更多设置" of menu 1
  end tell
end tell
