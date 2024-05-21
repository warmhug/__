
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
- 在启动系统登录后、添加自动打开的程序：System Preferences(系统偏好设置) > Users & Groups(用户与群组) > Login items(登录项) 点击"+"、找到自己写的可执行 bash 文件，加入即可。
- iBook 缓存位置 ~/Library/Containers/com.apple.BKAgentService/Data/Documents/iBooks

```sh
# http://apple.stackexchange.com/questions/102452/can-i-undo-changes-made-via-defaults-write
defaults read com.apple.screencapture  # 查看系统截图设置
defaults write com.apple.screencapture type jpg  # 将系统截屏后图片保存为 jpg 格式
defaults write com.apple.screencapture location ~/Downloads/  # 修改截屏图片保存路径

# https://gist.github.com/rmcdongit/f66ff91e0dad78d4d6346a75ded4b751
# https://gist.github.com/dvessel/2b6ad97b2da16d445671b39618221aab
open /System/Library/PreferencePanes/Network.prefPane  # 打开网络偏好设置面板
open "x-apple.systempreferences:com.apple.Network-Settings.extension?Proxies"
networksetup -setproxyautodiscovery Wi-Fi on  # 打开 WiFi 里 自动发现代理 开关

sudo spctl --master-disable  # 允许安装”任何来源“的软件，解决「xxx.app已损坏」问题
xattr -cr /Applications/Movist.app  # macOS 14.4 以上版本，需要运行此命令后 再右键打开

xcode-select --install  # 安装 git & gcc

csrutil disable  # 关闭sip。 关机、按住电源键(非m1按下`Cmd R`) 选择实用工具->终端
csrutil status  # 查看状态。

pmset noidle  # 阻止电脑睡眠 同时按住 shift、control、电源键，关闭显示器
cmd + shift + . # 在 finder 切换显示“隐藏文件”
```

- AppCleaner / iZip Unarchiver / Paste(收费) Clipy Maccy CopyClip / iStat-Menus / hidden-bar Vanilla Dozer / Smoothscroll / ngrok inlets(GitHub) / webtorrent-desktop / https://snapdrop.net / https://archive.org/web

- zip加密: `zip -e output.zip ~/xx.txt` / [zip解密](https://www.jianshu.com/p/bf4a6244180f)
- rar[工具](https://www.rarlab.com/download.htm): `rar a test.rar test/` 压缩 test 目录内容生成 test.rar 文件。
- https://www.keka.io 压缩解压 7z zip 等。mac 选中文件右键 -> 压缩生成zip 或者 服务“使用keka压缩”。
- [zip、rar、7z文件密码破解](https://github.com/jaredsburrows/rarcrack)、[7zcrack](https://github.com/tp7309/tt7zcrack)

- 欧路词典: 修改 ~/Library/Preferences/ com.eusoft.eudic.plist 修改 MAIN_TimesLeft：允许使用次数(任意改) 10000000 重启 （更新 [notion](https://www.notion.so/Eudic-Mac-0b5e993809794576868714f613f637ff)、百度网盘下载 再升级）


## 图像-视频-文件

xnip snipaste lightshot (snip) / licecap (kap gifify) / UPDF / Readiris-ocr / any-video-converter (在线 online-audio-converter.com) / XnConvert(图像处理) / Movist (IINA) / ExifRenamer(重命名图片) / ExifTool [exifr](https://mutiny.cz/exifr/) / HandBrake / MKVToolnix(mkv字幕抽取) / perian(QuickTime 插件) / aria2 / NeatDownloadManager / extract-video-ppt

- sips -z height width [file]   # 修改图片的宽和高, sips -Z 640 *.jpg 批量修改图片的 宽或高 最大值 保持原来宽高比
- 如何下载HLS视频到本地？https://www.zhihu.com/question/35564371/answer/694240638 / https://www.downloadhelper.net

Mac smb 文件共享(速度约1M/s较慢)
在需要共享文件的 Mac 上打开「系统偏好设置-共享-文件共享」会显示类似 smb://192.168.1.9 的共享地址。在另一台 Mac 上打开访达，点左侧的「位置-网络」图标 或者在访达菜单栏选择「前往-连接服务器」。在 iPhone 或 iPad 打开「文件」App，点击右上角选项图标，选择「连接服务器」，连过一次的共享 下次可以直接在「文件」App 的「已共享」里看到。在Windows PC访问 Mac 的共享文件，需要先做一些设置。
这样把一台 Mac 作为「共享盘」，有点 NAS 的意思。 自己搭建 ftp 服务器共享文件。

视频字幕类型有三种：内嵌字幕、外挂字幕、封装软字幕。可以视频转为音频、再提取字幕。
字幕下载 https://subhd.tv  剪映 / 钉钉闪记 / B站必剪 / 迅捷文字转语音(1G内免费)。
Subtitle Edit / Aegisub / Subtitle Workshop / HandBrake / FFmpeg / adobe PR

文件传输: https://snapdrop.net/  https://easychuan.cn/  https://www.wenshushu.cn/
https://github.com/schollz/croc


## chrome

- chrome 同步: Switchy Omega 添加 `*.google*` proxy 规则到前边，打开 `chrome://sync` 看 Local State - Server Connection 是否成功。参考 [1](https://hellodk.cn/post/185)、[2](https://github.com/FelisCatus/SwitchyOmega/issues/1599)。 其他方法：代理软件和浏览器都设为“系统代理”。
- Chrome cmd+t在右侧标签打开 https://superuser.com/a/1260437
- Chrome tab卡死: 菜单 - 窗口 - 任务管理器 - 找到相应tab名 查看内存占用空间排序为空 - 结束进程。
- Chrome 地址栏搜索 无法在新标签页打开结果 https://www.runningcheese.com/tabs
- Chrome extensions: 一键切换(Jomic) 搜索拐杖 下一页(空格键自动翻到下一页) XSwitch Tamper / Disable Content-Security-Policy / Talend API Tester / Web Developer / Neat URL / Copy Tab Info / Open Multiple URLs / 沙拉查词 / User JavaScript and CSS / Wayback Machine / Memex / 一叶 / grammarly.com / Tampermonkey gitpod npmhub / screenity / ChatGPT for Google / Language Reactor /
Side Browser / Sidebar Tab


## 代理

命令行代理 `brew install proxychains-ng` 修改 /usr/local/etc/proxychains.conf 配置文件“末尾”部分内容 `#socks4  127.0.0.1 9050` 改为 `socks5  127.0.0.1 1080`。使用 `proxychains4 -q curl https://twitter.com` 测试是否成功，不成功则需要关闭 sip。

疑问：有些代理服务器、用 SwitchyOmega 首次加载 需要代理的网页 会失败、然后自动刷新 访问成功，[问题跟踪](https://github.com/FelisCatus/SwitchyOmega/issues/1511#issuecomment-433313269)

```txt
[SwitchyOmega Conditions]
@with result
*.github.com +proxy
*.icloud.com +direct
* +direct
```

多设备共享vpn网络：
- 代理模式 https://www.youtube.com/watch?v=xTzubV8-PwM
- 手机当网关路由 https://www.youtube.com/watch?v=H4g1y3ZMWaw
https://www.youtube.com/watch?v=r6nXCgYkXTQ

https://how-did-i-get-here.net/

## oh-my-zsh & iTerm2(不需要)

```sh
# Mac shell 修改方法 https://support.apple.com/zh-cn/HT208050
chsh -s /bin/zsh  # 修改 shell 为 zsh ，系统默认使用 /bin/bash
zsh --version  # Mac 系统自带了 zsh
```

- iTerm2 设置 HotKey 和 Profiles > Keys 里点 + 弹出输入 ⌥→ / ⌥← Action 设置为 Send Escape sequence , f / b
- [cdto](https://github.com/jbtule/cdto) 使用 [2.6 版本](https://github.com/jbtule/cdto/issues/46) 能在 ITerm (不是系统默认 terminal) 里打开当前 Finder 路径.
- 安装 [oh-my-zsh](https://github.com/ohmyzsh/ohmyzsh#manual-installation)、使用 manual install 方式、不需要翻墙，它有很多 Plugins 和 Themes。注意：会在 用户目录 生成新的 `.zshrc`

`.zshrc` 文件

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


## homebrew & ruby & jekyll

```sh
# https://brew.sh/
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



## vs code

按`cmd shift p` 输入 code、zoom 等命令。 在查找(替换)框里按 ctrl + enter 支持多行。
[tab group 建议](https://github.com/microsoft/vscode/issues/100335#issuecomment-964358943)

```js
// 快捷键
[
  { "key": "cmd+d", "command": "editor.action.copyLinesDownAction" },
  // 安装 Terminal 扩展后
  { "key": "alt+`", "command": "terminal.open" }
]
```

配置 multiple root 方便一次性编辑多个项目：创建 `xx.code-workspace` 文件，内容为
> 注意避免多个项目不同编译配置的互相干扰
```js
{
  "folders": [
    { "name": "ROOT", "path": "./" },
    { "name": "slardar", "path": "./slardar" },
  ],
  // 不使用公共的，而使用 某个项目 本地配置的 typescript 编译器
  "settings": {
    "typescript.tsdk": "slardar/node_modules/typescript/lib"
  }
}
```

项目做单独的设置、比如 `xxProj/.vscode/settings.json` 内容
```json
{
  "editor.tabSize": 2,
  "editor.formatOnSave": true,
  "prettier.singleQuote": true,
  "typescript.tsdk": "node_modules/typescript/lib",
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "yarn.lock": true
  }
}
```

[推荐](https://github.com/viatsko/awesome-vscode) 的扩展:
plantuml(设置指定server) / Auto Hide / Live Preview / Markdown All in One / markdown-pdf / marp / filesize / EditorConfig / GitLens / Indent 4-to-2 / SVG Viewer / pangu / Hungry Delete / javascript console utils / Template String Converter

```json
{
  "markdown-pdf.displayHeaderFooter": false,
  "markdown-pdf.margin.bottom": "0.01cm",
  "markdown-pdf.margin.top": "0.01cm",
  "markdown-pdf.margin.left": "0.5cm",
  "markdown-pdf.margin.right": "0.5cm"
}
```


------

## 手机和Windows

```sh
# https://github.com/Genymobile/scrcpy/blob/master/doc/shortcuts.md
# 第一次电脑和手机需要usb线链接，手机打开“开发者选项和usb调试”。
# 手机开发者选项: 建议打开 停用adb授权超时功能(disable ADB authorization timeout)。
# scrcpy --tcpip  # 插入usb线时、设置无线连接。
# scrcpy --tcpip=10.94.62.181  # 通过具体ip地址链接、不用插入usb线。如果ip正确但也连不上 删掉ip 插上线。
# 如下添加更多其他选项。
scrcpy --shortcut-mod=lctrl --stay-awake --turn-screen-off -m1024 -b2M --tcpip=10.94.62.181

# 其他选项 --select-usb  --max-fps 15 --max-size 960
# 快捷键: ctrl p(开电源) o(关屏幕) h(主屏幕) ↑(音量) nn(通知/设置)
```

- 手机软件: Touch-Helper, MX播放器(VLC不能播放加密文件), 开发助手, IP Widget(能看到VPN的地址)。
- 安卓自动化: 微动手势(允许后台弹出界面和显示悬浮窗), automate, quick cursor, kwgt, popup widget, macrodroid, tasker(收费), easytouch, anywhere。

- 电脑控制手机 https://www.zhihu.com/question/46795475 、 anydesk 体验不错、但不能远程操作iPhone，国产抄袭版 todesk 会卡死，Wormhole虫洞 利用 iPhone 的辅助功能-触控 能被三方控制功能实现远程操作、但体验很差。
- iOS快捷指令 朗读的 声音大小和siri一样，不受设置里声音大小的控制，通过设置 Siri 的声音来控制。

- 小米应用设置，右上角三个点，显示所有应用。搜索应用，搜小米画报，点进去，卸载。 可使用 adb 卸载。 第三方充电器都不支持小米私有协议快充。
- 小米多看电纸书[一代](https://item.jd.com/100010633100.html)、安装app[方法](https://www.bilibili.com/video/av893445949/)
- 支持 Mac + Win 读写的U盘格式: exFAT FAT32 NTFS(软件 ntfstool / ParagonNTFS )。
- 2024-04 [Win系统安装盘](https://zhuanlan.zhihu.com/p/273305963)、系统[下载地址](https://hellowindows.cn/)，电脑开机(按F12)设置U盘优先启动。


------

## Apache

```sh
httpd -v  # find the Apache version
sudo apachectl restart / start / stop   # 开关重启
code /etc/apache2/httpd.conf  # 编辑 Apche 的配置文件

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
```

> 出现 403 You dont have permission to access 错误，
> 修改 路径下 各级目录 权限 everyone 为 “只读”，再重启 Apache

访问：<http://localhost> / <http://localhost:9999/>

有些 https 环境下生效，ssl 证书自行生成。结合 nginx https 设置、来全面支持。


## nginx

```sh
brew install nginx  # 安装过程比如缺少 pcre2 ca-certificates 单独 brew install xx 安装
sudo nginx  # 启动
sudo nginx -s stop  # 关闭
sudo nginx -s stop && sudo nginx  # 重启

code /usr/local/etc/nginx/nginx.conf  # intel 打开配置文件
code /opt/homebrew/etc/nginx/nginx.conf # m1

# 更改 http / HTTPS → server 区块里的配置为：
location / {
    #root   html;
    autoindex on;
    root    /Users/hua/inner;
    index  index.html index.htm;
    add_header 'Access-Control-Allow-Origin' '*';
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE';
    add_header 'Access-Control-Allow-Headers' 'Content-Type';
}

http://localhost:8080  # 重启并测试
https://localhost  # 测试 https
```


## 虚拟机

- virtualbox win7 [如图](https://gw.alipayobjects.com/zos/rmsportal/auNTgeEEHVFfWklRjRsK.png)、在家里网络正常，但很奇怪在公司内网不能连接？？
- [虚拟机里的 win 键盘是用的 ctrl 键](https://forums.virtualbox.org/viewtopic.php?f=8&t=63567&hilit=keyboard)
- 安装后重启，或点击菜单 Devices -> Insert Guest Additions CD image… 使能访问 host 电脑并自动调整分辨率
- 设置 Shared Folders

> 注意：当 virtualBox 运行时，Android 官方安装的虚拟机、开不起来！
> 虚拟机里查看 ip 地址可以看到，例如 10.0.2.2 可访问 host 主机的 localhost , Genymotion android emulator 相应ip为 10.0.3.2
