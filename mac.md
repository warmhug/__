
## Mac 系统设置 / 软件

- 点击和手势: 触控板。1 勾选 “轻点来点按” 2 启用词典：查询与数据检测器 - 选择三指轻点 3 更多手势 - 应用Expose。
- 三指拖移窗口: 辅助功能 -> 鼠标与触控板 -> 触控板选项 -> 启用拖移 -> 三指拖移。
- 触发角: 调度中心 -> 触发角 (左上角:启动台, 左下角:显示器睡眠, 右上角:调度中心, 右下角:桌面)。
- 快捷键: 键盘 -> 快捷键 -> 输入法 选择 `cmd+空格`，在 “服务” 里勾选或不选。另可修改 App 的快捷键。
- dock: 程序坞 -> 不勾选 “在程序坞中显示最近使用的应用程序”(最后一项) 显示隐藏 `cmd+alt+d`。
- 通知: 通知中心 -> 勾选 “当显示器进入睡眠状态时/当屏幕锁定时”
- 系统顶部菜单栏: 按住 `Command` 再拖动图标，改变右边图标顺序。Finder 工具栏: 按 `cmd + alt`，拖动 app 到工具栏。
- 文本替换: 键盘 -> 文本，「command + A」全选、拖拽到 Finder 会生成 “用户词典.plist” 的文件。
- m1 外接显示器分辨率低: 显示器 -> 按住 Option 键的同时点击“缩放”。
- 快捷指令: iOS -> Apple ID -> iCloud -> 使用iCloud的APP -> 显示全部 找到 快捷指令 勾选同步。
- QuickLook: 搜索下载 QLMarkdown / QLStephen / QuickLookJSON 并放到 `~/Library/QuickLook` 或 `/Library/QuickLook` 目录。如果不生效、`killall Finder` 重启 Finder。

- 查看ip地址: 设置 - wifi - 详细信息。查看域名路由 `traceroute developer.chrome.com` 或 `ping xxx`。
- 在启动系统登录后、添加自动打开的程序：System Preferences(系统偏好设置) > Users Groups(用户与群组) > Login items(登录项) 点击"+"、找到自己写的可执行 bash 文件，加入即可。
- iBook 缓存位置 ~/Library/Containers/com.apple.BKAgentService/Data/Documents/iBooks

```sh
# http://apple.stackexchange.com/questions/102452/can-i-undo-changes-made-via-defaults-write
defaults read com.apple.screencapture  # 查看系统截图设置
defaults write com.apple.screencapture type jpg  # 将系统截屏后图片保存为 jpg 格式
defaults write com.apple.screencapture location ~/Downloads/  # 修改截屏图片保存路径

sudo spctl --master-disable  # 允许安装”任何来源“的软件，解决「xxx.app已损坏」问题
xattr -cr /Applications/Movist.app  # macOS 14.4 以上版本，需要运行此命令后 再右键打开

xcode-select --install  # 安装 git gcc

csrutil disable  # 关闭 sip 关机、按住电源键(非m1按下`Cmd R`) 选择实用工具->终端
csrutil status  # 查看状态

pmset noidle  # 阻止电脑睡眠 同时按住 shift、control、电源键，关闭显示器
cmd + shift + . # 在 finder 切换显示“隐藏文件”
```

- AppCleaner / iZip Unarchiver / Paste(收费) Clipy Maccy CopyClip / iStat-Menus / hidden-bar Vanilla Dozer / Smoothscroll / ngrok inlets(GitHub) / webtorrent-desktop / https://snapdrop.net / https://archive.org/web / Thor / Apptivate / ttyd / xtermjs

- xnip snipaste lightshot (snip) / licecap (kap gifify) / UPDF / Readiris-ocr / any-video-converter (在线 online-audio-converter.com) / XnConvert(图像处理) / Movist (IINA) / ExifRenamer(重命名图片) / ExifTool [exifr](https://mutiny.cz/exifr/) / HandBrake / MKVToolnix(mkv字幕抽取) / perian(QuickTime 插件) / aria2 / NeatDownloadManager / extract-video-ppt

- [添加快捷键](https://superuser.com/a/1260437)、 chrome 同步 [1](https://hellodk.cn/post/185)、[2](https://github.com/FelisCatus/SwitchyOmega/issues/1599)。
- Chrome extensions: 一键切换(Jomic) 搜索拐杖 下一页(空格键自动翻到下一页) XSwitch Tamper / Disable Content-Security-Policy / Talend API Tester / Web Developer / Neat URL / Copy Tab Info / Open Multiple URLs / 沙拉查词 / User JavaScript and CSS / Wayback Machine / Memex / 一叶 / grammarly.com / Tampermonkey gitpod npmhub / screenity / ChatGPT for Google / Language Reactor / Side Browser / Sidebar Tab / Porter Plug / ModHeader / Sider ChatGPT / Video Speed Controller

- zip加密: `zip -e output.zip ~/xx.txt` / [zip解密](https://www.jianshu.com/p/bf4a6244180f)
- rar[工具](https://www.rarlab.com/download.htm): `rar a test.rar test/` 压缩 test 目录内容生成 test.rar 文件。
- https://www.keka.io 压缩解压 7z zip 等。mac 选中文件右键 -> 压缩生成zip 或者 服务“使用keka压缩”。
- [zip、rar、7z文件密码破解](https://github.com/jaredsburrows/rarcrack)、[7zcrack](https://github.com/tp7309/tt7zcrack)

- 欧路词典: 修改 ~/Library/Preferences/ com.eusoft.eudic.plist 修改 MAIN_TimesLeft：允许使用次数(任意改) 10000000 重启 （更新 [notion](https://www.notion.so/Eudic-Mac-0b5e993809794576868714f613f637ff)、百度网盘下载 再升级）

- sips -z height width [file]   # 修改图片的宽和高, sips -Z 640 *.jpg 批量修改图片的 宽或高 最大值 保持原来宽高比
- 如何下载HLS视频到本地？https://www.zhihu.com/question/35564371/answer/694240638  https://www.downloadhelper.net
- 文件传输: https://snapdrop.net/  https://easychuan.cn/  https://www.wenshushu.cn/  https://github.com/schollz/croc
- Mac smb 文件共享(速度约1M/s较慢): 在需要共享文件的 Mac 上打开「系统偏好设置-共享-文件共享」会显示类似 smb://192.168.1.9 的共享地址。在另一台 Mac 上打开访达，在菜单栏选择「前往-连接服务器」。在 iPhone 或 iPad 打开「文件」App，点击右上角选项图标，选择「连接服务器」。 另外搭建 ftp 服务器共享文件。
- 视频字幕类型有三种：内嵌字幕、外挂字幕、封装软字幕。可以视频转为音频、再提取字幕。 字幕下载 https://subhd.tv  剪映 / 钉钉闪记 / B站必剪 / 迅捷文字转语音。 Subtitle Edit / Aegisub / Subtitle Workshop / HandBrake / FFmpeg
- [学英语](https://earthworm.cuixueshe.com/) [GitHub Issues blog](https://gitblog.io/)

- virtualbox win7 [如图](https://gw.alipayobjects.com/zos/rmsportal/auNTgeEEHVFfWklRjRsK.png)、在家里网络正常，但很奇怪在公司内网不能连接？？
- [虚拟机里的 win 键盘是用的 ctrl 键](https://forums.virtualbox.org/viewtopic.php?f=8&t=63567&hilit=keyboard)

markdown 表情 :+1: :smile: :smiley: :laughing:
- [emoji-cheat-sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet/)
- [Emoji Unicode Tables](http://www.unicode.org/emoji/charts/full-emoji-list.html)

[whistle](https://wproxy.org/) 规则配置: `https://aa.bb.xx 127.0.0.1:28064 excludeFilter://^/service`

Charles 抓包 (2019 2024)
- 注意
  - 公司里默认安装的vpn软件、公司wifi的代理选项默认会打开“自动发现代理”的配置，需要关闭后、才能使用Charles代理。
  - 使用没有 被设置代理的 浏览器（比如 Chrome **翻墙代理需要关掉**）
- HTTPs 支持：
   - Help -> SSL Proxying -> Install Charles Root Certificate (挨着的 **模拟器** / **手机 **证书都装)
      - 注意：**手机上安装的 证书 和 连接的 mac 电脑要匹配。使用新电脑需要重新给手机安装证书。**
   - 在 macOS 钥匙串访问 里信任证书，iOS 设置里信任证书。
   - 菜单 Proxy -> Proxy Setting -> Port: 8888 /
   - 菜单 Proxy -> SSL Proxying Settings -> SSL Proxying -> add -> Host: *  Port: 443
   - 在 iOS (**不用连数据线**) WiFi 设置 HTTP 代理，服务器输入 电脑 ip、端口 8888
- 其他：
   - 关闭 mac 端包的抓取：菜单 Proxy 将 maxOS Proxy 取消选中 （这样 iOS 模拟器里也抓不了）
   - 抓取支付宝 RPC 请求：支付宝 可切换环境包 设置关闭 mmtp 开关
   - 映射本地 js 文件、调试代码：菜单 Tools -> Map Remote / Map Local…
   - 拦截请求：菜单 Tools -> Rewrite -> 勾选 Enable Rewrite -> Add -> Add -> Rewrite Rule -> Type 选 URL, Where 勾选 Request, Match Value 填 `http(s?):\/\/aa.bb.xx\/(?!(service)\/)`勾选Regex , Replace value 填 `https://127.0.0.1:28064/` 勾选 Replace all
   - （点击配置框的问号、发现是使用的 Perl-style regular expressions）


## vs code

- 搜索排除项 `.next, dist, .yaml, *-lock.json`
- 按`cmd shift p` 输入 code、zoom 等命令。 在查找(替换)框里按 ctrl + enter 支持多行。 [tab group 建议](https://github.com/microsoft/vscode/issues/100335#issuecomment-964358943)
- vscode 里 eslint 报错、找不到报错原因，使用 cmd+shift+p 输入 reload window 重启 vscode 即可。
- 端口 [转发](https://code.visualstudio.com/docs/editor/port-forwarding) 实现 [内网穿透](https://51.ruyo.net/18562.html)，目前已被 [国内禁用](https://github.com/microsoft/vscode-remote-release/issues/9438)

```js
// [可选]创建 xx.code-workspace 配置 Multi-root Workspaces
// 或者在 Multi-root Workspaces 的 .vscode/settings.json
// 修改 typescript 编译器， 工作区修改 lint 配置
{
  "folders": [
    { "name": "ROOT", "path": "./" },
    { "name": "slardar", "path": "./slardar" },
  ],
  "settings": {
    "typescript.tsdk": "slardar/node_modules/typescript/lib"
    "eslint.workingDirectories": [{"mode": "auto"}]
  }
}
```

对项目做单独的设置、比如 `xxProj/.vscode/settings.json` 内容
```json
{
  "editor.tabSize": 2,
  "prettier.singleQuote": true,
  "typescript.tsdk": "node_modules/typescript/lib",
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
  }
}
```

扩展 [推荐](https://github.com/viatsko/awesome-vscode):
plantuml(设置指定server) / Auto Hide / Live Preview / Markdown All in One / markdown-pdf / marp / filesize / EditorConfig / GitLens / Indent 4-to-2 / SVG Viewer / pangu / Hungry Delete / javascript console utils / Template String Converter / REST Client / Docs View / Terminal Keeper

```json
// 快捷键 设置
[
  { "key": "cmd+d", "command": "editor.action.copyLinesDownAction" },
  { "key": "alt+`", "command": "terminal.open" }
]
// markdown-pdf 扩展设置
{
  "markdown-pdf.displayHeaderFooter": false,
  "markdown-pdf.margin.bottom": "0.01cm",
  "markdown-pdf.margin.top": "0.01cm",
  "markdown-pdf.margin.left": "0.5cm",
  "markdown-pdf.margin.right": "0.5cm"
}
```


## 手机和Windows

```sh
# https://github.com/Genymobile/scrcpy/blob/master/doc/shortcuts.md
# https://github.com/Genymobile/scrcpy/blob/master/doc/connection.md#tcpip-wireless
# 第一次电脑和手机需要usb线链接，手机打开“开发者选项和usb调试”。
# 手机开发者选项: 建议打开 停用adb授权超时功能(disable ADB authorization timeout)。
# scrcpy --tcpip  # 插入usb线时、先设置无线连接，之后不用插入usb线、通过具体ip地址链接。
# scrcpy --tcpip=10.94.62.181  # 如果ip正确但也连不上 删掉ip 插上线。
# 如下添加更多其他选项。
scrcpy --shortcut-mod=lctrl --stay-awake --turn-screen-off -m1024 -b2M --tcpip=10.94.62.181

# 其他选项 --select-usb  --max-fps 15 --max-size 960
# 快捷键: ctrl p(开电源) o(关屏幕) h(主屏幕) ↑(音量) nn(通知/设置)
# 其他
# https://github.com/Uj947nXmRqV2nRaWshKtHzTvckUUpD/ethernally
# https://joynaruto.com/archives/1029
```

- 手机软件: Touch-Helper, MX播放器(VLC不能播放加密文件), 开发助手, IP Widget(能看到VPN的地址)。
- 安卓自动化: 微动手势(允许后台弹出界面和显示悬浮窗), automate, quick cursor, kwgt, popup widget, macrodroid, tasker(收费), easytouch, anywhere。
- adb 自动化: https://blog.ferstar.org/post/use-tasker-do-some-funny-things/

- 电脑控制手机 https://www.zhihu.com/question/46795475 、 anydesk 体验不错、但不能远程操作iPhone，国产抄袭版 todesk 会卡死，Wormhole虫洞 利用 iPhone 的辅助功能-触控 能被三方控制功能实现远程操作、但体验很差。
- iOS快捷指令 朗读的 声音大小和siri一样，不受设置里声音大小的控制，通过设置 Siri 的声音来控制。

- 小米应用设置，右上角三个点，显示所有应用。搜索应用，搜小米画报，点进去，卸载。 可使用 adb 卸载。 第三方充电器都不支持小米私有协议快充。
- 小米多看电纸书[一代](https://item.jd.com/100010633100.html)、安装app[方法](https://www.bilibili.com/video/av893445949/)
- 支持 Mac + Win 读写的U盘格式: exFAT FAT32 NTFS(软件 ntfstool / ParagonNTFS )。
- 2024-04 [Win系统安装盘](https://zhuanlan.zhihu.com/p/273305963)、系统[下载地址](https://hellowindows.cn/)，电脑开机(按F12)设置U盘优先启动。


## Git / Npm

[Git Aliases](https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases)、[git-open](https://github.com/paulirish/git-open) 自动打开 git 远程仓库地址

git 三板斧
一板基础斧 add，commit，pull/push，checkout，revert
二板合作斧 merge，rebase，stash，cherry-pick
三板优雅斧 commit --amend，rebase -i

业内成熟的 GIT 分支模型 https://cloud.githubusercontent.com/assets/36899/7315642/015f534c-eaa2-11e4-9882-b7cc7535fb72.png

GitHub commit 或合并 MR 时，可以自动修改 issue 状态、关闭关联的 issue。参考 commit 规范

- [GitHub search?q=stars](https://github.com/search?q=stars:%3E1&s=stars&type=Repositories)、[GitHub topics/javascript](https://github.com/topics/javascript)
- [搜 issue](https://help.github.com/articles/searching-issues/)
  - 搜索“某repo”里有“某个评论者”参与的包含的“某个词”的 issue: [warmhug + ant-design-mobile](https://github.com/search?utf8=%E2%9C%93&q=xxxx+commenter%3Awarmhug+repo%3Aant-design%2Fant-design-mobile&type=Issues)
  - 搜索“某user”里有“某个评论者”参与的包含的“某个词”的 issue: [warmhug + xxxx](https://github.com/search?utf8=%E2%9C%93&q=xxxx+commenter%3Awarmhug+user%3Aant-design&type=Issues)
  - 搜索“某人”创建的在“body”里包含“某个词”的 issue: [warmhug + xx](https://github.com/search?utf8=%E2%9C%93&q=xx+in%3Abody+author%3Awarmhug&type=Issues)

```sh
# `.gitconfig` 文件
[alias]
	st = status
	co = checkout
	ci = commit
	br = branch
[user]
	name = warmhug
	email = hualei5280@gmail.com

# 生成 ssh key rsa证书已经被废弃 使用另一种生成方式
# https://confluence.atlassian.com/bitbucketserverkb/ssh-rsa-key-rejected-with-message-no-mutual-signature-algorithm-1026057701.html
ssh-keygen -t ed25519 -C hualei.hl@xx.com
ssh-add ~/.ssh/id_ed25519
# 再把 ~/.ssh/id_ed25519.pub 文件内容添加到 gitlab

# 配置 ssh 走 clash 代理， code ~/.ssh/config
Host github.com
  ProxyCommand nc -X connect -x 127.0.0.1:7890 %h %p

# 内部仓库、设置内部邮箱
git config user.name "然则"
git config user.email "hualei.hl@xx-inc.com"
# github 给特定目录 设置单独的 name email, 新建 .gitconfig-github 文件, 在 .gitconfig 里新增以下命令
[includeIf "gitdir:~/inner/-/"]
  	path = .gitconfig-github

# 全局默认设置 code ~/.gitconfig
git config --l
git config --global alias.st status

# head caret tilde 区别 https://scarletsky.github.io/2016/12/29/tilde-and-caret-in-git/

# 分支
git checkout -b xx origin/xx    # 新建xx分支，并跟踪远程xx分支
git branch -d xx       # 删除分支xx
git push origin :xx    # 删除远程分支xx
git push origin xx:xx  # 上传我本地的xx分支到远程仓库中去，仍称它为xx分支

git pull -p # remove all your local branches which are remotely deleted.
git pull --rebase       # 同 git fetch + git rebase

git fetch origin  # 同步远程repos, 更新本地仓库的所有 origin/* 分支信息
git merge origin/xx    # 远程上有 xx 分支，并且 git fetch  执行此命令，将合并此分支
git merge --no-ff xx   # 不执行"快进式合并"，始终多产生 merge 信息，便于追踪

# 合并/删除多个 commit 为一个 https://www.jianshu.com/p/4a8f4af4e803
# 修改已提交的 commit message 修改后，其后续的 commit hash 将全部改变、会影响协作同学 https://stackoverflow.com/questions/5032374/accidentally-pushed-commit-change-git-commit-message/5032614#5032614
git log   # 找到要删除/合并 commit 之前一个 commit_id
git log -p fileName
git rebase -i [commit_id]

git rebase origin/master  # 把远程 master 更新作为当前分支基线
git add .  # 先 git status/diff 如果没有 代码变更 但有文件变化、只需 add 不需 commit 再运行下一步的 continue
git rebase --continue  # 先 git add --all 再 continue、有多个 commit 依次执行。
git push -f  # 强制提交

# 使用 rebase 代替 merge 避免生成类似 merge branch “branch_name” 历史记录
# 公共仓库不建议使用 rebase https://www.fossil-scm.org/fossil/doc/trunk/www/rebaseharm.md
# https://robots.thoughtbot.com/git-interactive-rebase-squash-amend-rewriting-history
# merge 和 rebase 的问题：
#- 如果用 rebase ，需要经常 reapply 其他提交的改动， commit 的时间顺序也会乱掉。
#- 如果用最直接的 merge ，会产生重复无用的比如 Merge pull request pull_id from xx_branch 或者 Merge branch “branch_name” 信息，不利于 review 提交记录。

# 回退恢复：
## working tree (add之前，原始状态)
git checkout .
git clean -xdf # 删除所有 .gitignore 里指定的文件或目录，包括新建文件、node_modules 等

## index 内的回滚 (add后 commit之前，暂存区)
git reset [file | 057d]    # 回退文件、或回退到某个版本
git reset HEAD^    # 回退所有内容到上一个版本
git reset HEAD^ a.py    # 回退 a.py 这个文件的版本到上一个版本
git reflog  # 撤销 reset 时 找到撤销前的 commit_id 再 git reset 即可

## commit 之后的回滚
git reset --[soft | hard] [HEAD^ | 057d]  # --soft 不修改本地文件 --hard 本地的文件修改都被丢弃
git reset --hard origin/master   # 将本地的状态回退到和远程的一样

## 回滚远程主干代码，并且 不抹掉 提交记录 产生新纪录
git revert commit_id
git revert -n commit_id..  #  把从 commit_id 到 head 的所有提交 revert 掉 -n 表示只产生一条记录

## 增加某个 commit 方法 cherry-pick
git cherry-pick 62ecb3 # 一般用于将 bugfix commit pick 到不同版本上
# 如果需要从另一个仓库的分支cherry-pick，先fetch其他仓库
git fetch <other-repo-url> <other-branch>
git cherry-pick <other-repo-commit-hash>

## 修改提交信息 修改注释 https://help.github.com/articles/changing-a-commit-message/
git commit --amend  # 修改 most recently commit 比如加 --reset-author

git stash [pop | list | drop]   # 暂存未提交的修改

# remote
git remote add origin git@xxx.git    # 加入服务器
git remote -v  # 列出现有的远程地址
git remote set-url origin xxx  # 改变远程地址为 xxx

# 操作tag
git tag 0.0.1       # 打轻量标签
git tag -a 0.0.1 -m 'Release version 0.0.1'
git push origin v1.5
git push [origin] --tags    # 推送所有标签到服务器
git fetch --all --tags    # 拉取远程 tags
git checkout -b new_branch_name tag_name    # 基于指定的 tag 创建新分支


# 以下对 pnpm yarn 同样生效。 node-sass 需要单独设置国内源
npm config list
npm config get registry # 查看源
npm config set sass_binary_site=https://npm.taobao.org/mirrors/node-sass
npm login --registry=https://registry-cnpm.xx.work  # 命令行登录 registry

# https://registry.npm.taobao.org/ -> https://registry.npmmirror.com
npm i --registry https://registry.npmmirror.com
npm view lerna
npx lerna list  # 免全局安装
yarn config set registry <url-to-your-registry>
yarn install --registry https://registry.npmmirror.com  #指定源

# 查看本地安装的模块，加 -g 为全局
npm ls --depth 2
npm ls --all
npm ls --package-lock-only
npm ls --link --global
which `npm root -g`

node hello.js &  # 后台运行程序 background process
```


## 代理

[clash文档](https://a76yyyy.github.io/clash/zh_CN/)
> 远程控制：菜单 -> 控制台 -> 右键 -> 检查元素 -> 查看网络 -> 端口和秘钥 (或者 设置 -> Api端口/秘钥)
> 在浏览器打开 `http://127.0.0.1:58147/ui/#/proxies`

```yaml
# code ~/.config/clash/config.yaml
rules:
  # 设置 qq.com / wechat.com / pan.baidu.com 等走 proxy 相当于是 vps 能绕过公司访问限制
  - DOMAIN-SUFFIX,ksyun.com,Proxy
  - 'DOMAIN-KEYWORD,google,Proxy'
  - DOMAIN-SUFFIX,cn,DIRECT
  - DOMAIN-KEYWORD,-cn,DIRECT
  - DOMAIN-SUFFIX,local,DIRECT
  - IP-CIDR,192.168.0.0/16,DIRECT
  - GEOIP,CN,DIRECT
  - MATCH,DIRECT
```

bash 脚本自动设置代理
```sh
# https://gist.github.com/rmcdongit/f66ff91e0dad78d4d6346a75ded4b751
# https://gist.github.com/dvessel/2b6ad97b2da16d445671b39618221aab
# https://community.jamf.com/t5/jamf-pro/scripting-quot-exclude-simple-hostnames-quot/m-p/64445
open /System/Library/PreferencePanes/Network.prefPane  # 打开网络偏好设置面板
open "x-apple.systempreferences:com.apple.Network-Settings.extension?Proxies"
networksetup
networksetup -setproxyautodiscovery Wi-Fi on  # 打开 WiFi 里 自动发现代理 开关
networksetup -getsecurewebproxy Wi-Fi/Ethernet  # 获取 WiFi 或 以太网 代理配置
networksetup -getproxybypassdomains Wi-Fi  # 忽略这些主机与域的代理设置
networksetup -listallnetworkservices  # 获取所有网络服务

# 设置别名
alias pset='networksetup -setwebproxy Wi-Fi 127.0.0.1 7890 && networksetup -setsecurewebproxy Wi-Fi 127.0.0.1 7890 && networksetup -setsocksfirewallproxy Wi-Fi 127.0.0.1 7890 && networksetup -setproxybypassdomains Wi-Fi 192.168.0.0/16,10.0.0.0/8,172.16.0.0/12,127.0.0.1,localhost,*.local,timestamp.apple.com,sequoia.apple.com,seed-sequoia.siri.apple.com'
alias psystem='networksetup -setwebproxystate Wi-Fi on && networksetup -setsecurewebproxystate Wi-Fi on && networksetup -setsocksfirewallproxystate Wi-Fi on'
alias upsystem='networksetup -setwebproxystate Wi-Fi off && networksetup -setsecurewebproxystate Wi-Fi off && networksetup -setsocksfirewallproxystate Wi-Fi off'
```

终端代理
```sh
# 直接在 ClashX 菜单里复制
export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890
# 设置别名
alias proxy="export http_proxy=http://127.0.0.1:1087;export https_proxy=http://127.0.0.1:1087;"
```

测试代理是否成功: `curl -v https://www.google.com` 不能用 ping
> ping 使用的是ICMP协议，ICMP处于网络层(第三层)，而SOCKS5是传输层代理协议(第四层)，HTTP和HTTPS是应用层协议(第五层或者第七层)，协议层不同是无法代理的。

> 可选: 终端代理 `brew install proxychains-ng` 修改 /usr/local/etc/proxychains.conf 配置文件“末尾”部分内容 `#socks4  127.0.0.1 9050` 改为 `socks5  127.0.0.1 1080`。 使用 `proxychains4 -q curl https://www.google.com` 测试是否成功，不成功则需要关闭 sip
> SwitchyOmega 自动刷新后 二次访问成功，[问题跟踪](https://github.com/FelisCatus/SwitchyOmega/issues/1511#issuecomment-433313269)

多设备共享vpn网络：
- 代理模式 https://www.youtube.com/watch?v=xTzubV8-PwM
- 手机当网关路由 https://www.youtube.com/watch?v=H4g1y3ZMWaw
- [安卓手机充当软路由](https://www.youtube.com/watch?v=r6nXCgYkXTQ) [网络链路](https://how-did-i-get-here.net/)


## supervisor ttyd

进程守护工具 supervisor
> https://soulteary.com/2023/03/12/stable-web-terminal-services-using-docker-nginx-and-ttyd.html
> https://gist.github.com/fadhlirahim/78fefdfdf4b96d9ea9b8
> https://gist.github.com/Pezhvak/297b058d9c449b39d321409cd041899c
> https://github.com/Supervisor/supervisor/issues/1514

- `brew install ttyd`
- `mkdir /usr/local/etc/supervisor.d && touch $_/my_conf.ini`
- `(open -e)code /usr/local/etc/supervisor.d/my_conf.ini` 文件内容如下：
```sh
[program:ttyd]
directory = /Users/hua/
command = ttyd -W -a zsh
autostart = true
startsecs = 10
autorestart = true
startretries = 100000
stdout_logfile = /tmp/ttyd.log
```
- 运行 `sudo supervisorctl reread && sudo supervisorctl update`
- 验证 `ps -ef | grep ttyd`

安装 web shell [ttyd](https://github.com/tsl0922/ttyd)

```sh
# 浏览器打开 http://localhost:7681/
brew install ttyd
ttyd -W -a zsh

# test.sh
# ```sh
# #!/bin/bash
# echo "Start session $1 $2"
# /bin/zsh
# ```
# 测试参数
ttyd -p 9999 -W -a ./test.sh
# http://localhost:9999/?disableLeaveAlert=true&arg=aa&arg=bb
ttyd -p 9999 -W -a zsh
# http://localhost:9999/?disableLeaveAlert=true&arg=test.sh&arg=aa&arg=bb
```



## zsh homebrew ruby jekyll

- `chsh -s /bin/zsh` 修改 shell 为 zsh  https://support.apple.com/zh-cn/HT208050
- iTerm2 设置 HotKey 和 Profiles > Keys 里点 + 弹出输入 ⌥→ / ⌥← Action 设置为 Send Escape sequence , f / b
- [cdto](https://github.com/jbtule/cdto) 使用 [2.6 版本](https://github.com/jbtule/cdto/issues/46) 能在 ITerm (不是系统默认 terminal) 里打开当前 Finder 路径.
- 安装 [oh-my-zsh](https://github.com/ohmyzsh/ohmyzsh#manual-installation)

`code ~/.zshrc` 文件

```sh
# 安装 java 参考：http://chessman-126-com.iteye.com/blog/2162466

# bin 目录加入环境变量
export PATH=$HOME/bin:/usr/local/bin:$PATH

# 使用 homebrew 安装的 python2 覆盖 “系统默认的” python2
# export PATH="$(brew --prefix python)/libexec/bin:$PATH"
export HOMEBREW_BOTTLE_DOMAIN=http://7xkcej.dl1.z0.glb.clouddn.com  # homebrew 加速
### brew install autojump 后提示需要添加的内容
[ -f /usr/local/etc/profile.d/autojump.sh ] && . /usr/local/etc/profile.d/autojump.sh

export EDITOR='vim'
#export PS1="\u \w$"

# 以下 zshrc 模板去掉了很多没用到的命令和注释
# 完整模板看这里：https://github.com/robbyrussell/oh-my-zsh/blob/master/templates/zshrc.zsh-template
#
# Path to your oh-my-zsh installation.
export ZSH=$HOME/.oh-my-zsh
# Set name of the theme to load. Look in ~/.oh-my-zsh/themes/
ZSH_THEME="ys"
# Which plugins would you like to load? (plugins can be found in ~/.oh-my-zsh/plugins/*)
# Add wisely, as too many plugins slow down shell startup.
plugins=(git)
source $ZSH/oh-my-zsh.sh

# 运行 alias 查看所有别名
alias cz="code ~/.zshrc"
alias sz="source ~/.zshrc"
```


```sh
# brew 国内源 https://www.jianshu.com/p/bea984d27cd2
cd "$(brew --repo)"
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote -v
brew update / list
brew info ruby
```

```sh
# mac 自带的 ruby 在运行 jekyll 时有问题，需要新安装 ruby@3
brew install ruby
# 过程中有些依赖出错、就相应单独安装，比如 brew install libyaml / readline / ...
ruby -v   # 在 .zshrc 里加入 ruby@3 的 bin 路径，新打开 terminal 查看
which ruby / gem  # 查看目录
gem env # 查看更详细信息

# 关闭sip (System Integrity Protection in macOS v10.11)
# https://jekyllrb.com/docs/troubleshooting/
gem install -n /usr/local/bin jekyll

jekyll serve   # 启动
gem install jekyll-feed jekyll-paginate jekyll-redirect-from jekyll-seo-tag  # 安装 jekyll plugins
```


## Apache 和 nginx

```sh
# Apache
# 出现 403 You dont have permission to access 错误， 修改 路径下 各级目录 权限 everyone 为 “只读”，再重启
# 访问：http://localhost http://localhost:9999
httpd -v  # find the Apache version
sudo apachectl restart / start / stop   # 开关重启
code /etc/apache2/httpd.conf  # 编辑 Apche 的配置文件


# 在 Indexes 前，加 + 代表允许目录浏览；加 – 代表禁止目录浏览。
#DocumentRoot "/Library/WebServer/Documents"
# 在 index template 里插入自定义 meta. http://httpd.apache.org/docs/2.4/mod/mod_autoindex.html
IndexHeadInsert "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />"
DocumentRoot "/Users/hua/inner"
<Directory "/Users/hua/inner">
    Options Indexes FollowSymLinks MultiViews
    MultiviewsMatch Any
    AllowOverride None
    Require all granted
    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Headers "Origin, X-Requested-With, Content-Type, Accept"
    Header set Access-Control-Allow-Credentials: true
</Directory>
<VirtualHost *:80>
  <FilesMatch "\.(md|cpp|php)$">
    AddDefaultCharset utf-8
    Header always set Content-Type "text/plain; charset: utf-8"
  </FilesMatch>
</VirtualHost>

Listen 9999
<Directory "/Users/hua/Downloads">
    Options Indexes FollowSymLinks MultiViews
    MultiviewsMatch Any
    AllowOverride None
    Require all granted
</Directory>
<VirtualHost *:9999>
    DocumentRoot "/Users/hua/Downloads"
    ServerName me.com
</VirtualHost>


# nginx
brew install nginx
sudo nginx -s stop && sudo nginx  # 重启
code /usr/local/etc/nginx/nginx.conf  # intel 打开配置文件
code /opt/homebrew/etc/nginx/nginx.conf # m1

# 更改 http / HTTPS → server 区块里的配置
location / {
    #root   html;
    autoindex on;
    root    /Users/hua/inner;
    index  index.html index.htm;
    add_header 'Access-Control-Allow-Origin' '*';
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE';
    add_header 'Access-Control-Allow-Headers' 'Content-Type';
}
```


## Linux / Unix 学习

- Unix 遵循的原则是 KISS (Keep it simple, stupid) do one thing and do it well。
- Linux 严格区分大小写。所有内容以文件形式保存，包括硬件。如：键盘 /dev/stdin 显示器 /dev/stdout
- Linux 不靠扩展名区分文件类型，靠权限区分。（.gz .tgz .sh等文件扩展名只是为了方便管理员查看）
- shell 是一个命令行解释器。shell 是壳，kernel 是内核。shell 把用户敲进去的命令、翻译为 linux 内核能识别的语言。
- sh: Bourne Shell 的缩写，可以说是目前所有 Shell 的祖先。 bash : Bourne Again Shell 的缩写，是 sh 的一个进阶版本。[Zsh 和 Bash 的不同](https://xshell.net/shell/bash_zsh.html)

```sh
chmod u+x test.sh
chmod a+x test.sh
ls -l `which java`   # which java 查看 java bin 所在的路径

# 创建 ~/inner/aa/
mkdir -p ~/inner/aa
mkdir -p ~/inner/aa && touch $_/file.txt

mv ./filename ./filename  # 移动文件/目录，重命名文件
echo ttt > ./file.txt  # 覆盖文件原内容并重新输入内容，若文件不存在则创建文件
echo ttt >> ./file.txt  # 向文件追加内容，原内容将保存
cat [-n] filename  # 由第一行开始显示档案内容, n 显示行号
cat error.txt  # 查看 error.txt 文件内容

history 10 # 列出最近执行过10条的命令，默认放在 .bash_history 文件中，默认保存1000条
more filename # 一页一页的显示档案内容.
head/tail filename  # 只看 头/尾 几行(默认10行)
head/tail -n 20 ~/.bashrc  # 显示头二十行

nslookup [IP地址/域名]  # 查询一台机器的 IP 地址和其对应的域名
mtr -r [IP地址/域名]

top # 或 top -o cpu 按 q 退出
nettop # 网络使用情况 按 q 退出
ps -ax
ps -ef | grep node  # 找到进程对应的ID 在第二列
ps -ef | grep adb  # 有时候 adb devices 没反应 需要杀掉进程重启
lsof -i:8087   # 查找出占用了某个端口的程序和其对应的PID
kill 3747(进程id)  # 杀掉后台进程
kill -9 $(lsof -ti:3000,3001)  # 杀掉端口占用的进程
kill -9 *pid*  # 强制杀掉进程

open -a Activity\ Monitor # 打开活动监视器。 或者 "Activity Monitor"
man open # 查看 open 用法

alias # 查看系统里别名
w / who # 列出当前登录的所有用户
whoami # 显示当前正进行操作的用户名
tty # 显示终端或伪终端的名称
last # 查看系统最后登录
date # 显示系统的当前日期和时间 date "+%Y-%m-%d_%H:%M:%S"
say hello world  # 说话

# 软连接可以跨文件系统，硬连接不可以。软连接可以对一个不存在的文件名进行连接。软连接可以对目录进行连接。硬链接下修改源文件或者连接文件任何一个的时候，其他的文件都会做同步的修改。
ln -s source_file dist        # 建立软连接 #若权限不足加 sudo
ln -s ../source/*.bar .        # 建立软连接，在当前目录
ln source_file dist           # 建立硬连接
# 在桌面生成软连接（快捷方式）
ln -s /Applications/Xcode.app/Contents/Developer/Applications/Simulator.app ~/Desktop
ln -sv ~/Library/Mobile\ Documents/com~apple~CloudDocs/ ~/iCloud\ Drive
# 或者加入到 zsh/bash 中
alias simulator='open /Applications/Xcode.app/Contents/Developer/Applications/Simulator.app'

# ssh & scp
scp -r ~/Downloads/build/ root@118.31.47.xx:/home/admin/nginx/
ssh root@118.31.47.xx xyxyxy
cd /home/admin/nginx/
cp -r ./build ./build-back1

# curl 可以 下载文件并显示简单进度条。断点续传：继续完成上次终止的未完成的下载
curl 'https://api.github.com/user/repos?page=2&per_page=100'  # 有特殊字符需要用引号包裹
curl https://www.baidu.com -o xx.html  # 下载页面到 xx.html 里
curl -i https://api.github.com -H "Origin: http://example.com"  # 设置 CORS

grep -rn 'grep' *  # 以 字符串 grep 来搜索 当前目录及子目录 的所有文件内容
grep grep$ she*.md  # 以 正则表达式 grep$ 来搜索 当前目录下 文件名匹配 she*.md 的内容

grep -r --include=\*.{cpp,h} pattern ./
grep -r --exclude-dir=node_modules pattern /path

cat test.txt | grep ^u   # 找出以 u开头 的行内容
cat test.txt | grep hat$  # 输出以 hat结尾 的行内容
cat test.txt | grep -E "ed|at"  # 显示包含 ed或者at 字符的内容行

find  # 在 当前目录以及子目录 列出所有文件
find /etc -name httpd.conf  # 在 /etc 目录下文件 httpd.conf
find . -name '*bash*'    # 在 当前目录以及子目录 下查找文件名中含有字符串 bash 的文件
find . -name "*.js" -not -path "*node_modules*" -not -path "*js-css-html*" # 排除多个路径

find / -mmin -5   # 查找在系统中最后5分钟里修改过的文件(modify time)
find . -name '*.DS_Store' -type f -delete   # 删除某目录及子目录下的 .DS_Store 文件

# ![vim 键盘图](https://zos.alipayobjects.com/rmsportal/MOPJrAnojdFvAToZkESi.gif)
# [vi编辑器使用color-scheme](http://alvinalexander.com/linux/vi-vim-editor-color-scheme-colorscheme)
:w   保存
:wq  :x  shift zz 保存修改并退出
:q!  强制退出，放弃修改

u     撤销
dd 删除光标所在行， dw 删除一个字(word) ，D 删除到行末
x 删除当前字符，  X 删除前一个字符
yy 复制一行，此命令前可跟数字，标识复制多行，如6yy，表示从当前行开始复制6行
yw 复制一个字
y$ 复制到行末
p 粘贴内容到当前行的下面
P 粘贴内容到当前行的上面


# shell 变量声明：
变量名=变量值 (等号前后不能有空格) # 例如 NODE_ENV='PRODUCTION' gulp build
echo $变量名
echo $PATH  # 查看PATH环境变量
echo $SHELL
env / printenv JAVA_HOME  # 打印环境变量

# shell 变量叠加：
x=123
x="$x"456  # 或 x=${x}456
echo $x
echo `which node` >> log.txt

HOST_PATH="/Applications/aaa bb/dd/ee/nm_sh"
ESCAPED_HOST_PATH=${HOST_PATH////\\/}
echo $ESCAPED_HOST_PATH
echo "args: $1 $2"

# npm push beta
push_beta="branch=$(git rev-parse --symbolic-full-name --abbrev-ref HEAD) && lerna version prerelease --preid ${branch} --yes"

echo "进行 xx 操作 \n\r" \
&& cd ~/my/work/project/xx \
&& spm build && spm deploy \
# 对引号进行转义
expect -c "spawn ssh admin@xx.net
expect \"password:\"
send \"password22\r\"
send \"cd ccbin && ./ccupdate.sh \n\"
interact "
```


### system_login 系统脚本

```sh
#!/bin/bash
exists(){
  command -v "$1" >/dev/null 2>&1
}
# use forever as joke server manager
if exists forever; then
  echo 'MY_Info: forever has been installed'
else
  echo 'MY_Info: execute "npm install forever -g"'
  npm install forever -g
fi
JOKE_PATH=~/inner/__/js-css-html/joke
if [ -d "$JOKE_PATH"/node_modules ]; then
  echo "MY_Info: the node_modules folder already exists in $JOKE_PATH"
else
  echo "MY_Info: execute 'npm install' command in $JOKE_PATH"
  cd $JOKE_PATH
  npm install
fi
ls
printf "\n"
read -n1 -rsp $'Press any key to exit...\n'
```
