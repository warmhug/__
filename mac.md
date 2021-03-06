# mac (macOS Mojave 10.14)

## 系统设置

- 点击和手势: 系统偏好设置 -> 触控板 -> 勾选 “轻点来点按” / 查询与数据检测器 - 选择三指轻点 / 更多手势 - 应用Expose。
- 三指拖移窗口: 系统偏好设置 -> 辅助功能 -> 鼠标与触控板 -> 触控板选项 -> 启用拖移 -> 三指拖移。
- 触发角: 系统偏好设置 -> 调度中心 -> 触发角 (左上角:启动台, 左下角:显示器睡眠, 右上角:调度中心, 右下角:桌面)。
- 快捷键: 系统偏好设置 -> 键盘 -> 快捷键，“输入法”选择 `cmd+空格`，“服务”里勾选或不选。
- dock: 显示隐藏 `cmd+alt+d`, 系统偏好设置 -> 程序坞 - 不勾选 “在程序坞中显示最近使用的应用程序”(最后一项)。
- finder 工具栏: 按下 `cmd + alt`，拖动 app 到工具栏。
- 系统顶部菜单栏: 按住 `Command` 再拖动图标，改变右边图标顺序。
- 文本替换: 系统偏好设置 -> 键盘 -> 文本，「command + A」全选、拖拽到 finder 会生成“用户词典.plist”的文件。
- 通知: 禁止 Enhanced Notifications 在 “勿扰模式” -> 勾选 “当显示器进入睡眠状态时/当屏幕锁定时”
- iCloud文件/备忘录/Safari书签等同步：系统偏好设置 -> iCloud -> iCloud 云盘 (选项…) -> 优化 Mac 储存空间
- 外接显示器旋转：系统偏好设置 -> 显示器 -> 外接窗口 -> 旋转

- 在启动系统登录后、添加自动打开的程序：System Preferences(系统偏好设置) > Users & Groups(用户与群组) > Login items(登录项) 点击"+"、找到自己写的可执行 bash 文件，加入即可。
- iCloud 目录多出了“Keynote / Pages ...“等空目录，是为了引导你安装相应软件，安装完之后、可以在 ”系统偏好设置 -> iCloud -> iCloud Drive -> 选项“里去掉勾选相应项目，文件夹里的空目录自动会消失。
- iBook 缓存位置 ~/Library/Containers/com.apple.BKAgentService/Data/Documents/iBooks

## 软件

> macOS 10.12 “安全性与隐私”里去掉了允许安装”任何来源“的软件设置，可以在终端里运行`sudo spctl --master-disable`打开
> 「xxx.app已损坏,打不开.你应该将它移到废纸篓」，并非你安装的软件已损坏，而是 Mac 系统的安全设置问题，因为这些应用都是破解或者汉化的, 解决方法是改变 Mac 系统安全设置. [国外典型程序员：生产力装备](https://blog.stephenwolfram.com/2019/02/seeking-the-productive-life-some-details-of-my-personal-infrastructure/)

- 系统: AppCleaner / iZip Unarchiver / iStat-Menus / hidden-bar Vanilla Dozer / Slidepad(本地) / Hammerspoon / aria2 / imazing / Fenêtre Lite / Spectacle / ParagonNTFS / QuickLinks / Acrobat / uBar / afloat / Sloth / Smoothscroll / androidfiletransfer / OmniDiskSweeper / Readiris

- 开发: MacDown / Marp / charles / Gas Mask / [color-note](https://itunes.apple.com/us/app/color-note/id1099028591) / meld / Fork / Sequel-pro / ngrok inlets(GitHub) / axure RP(公司) / npkill(删除node_modules) / httptoolkit.tech / screen.so

- 画图: PPT / photopea / omnigraffle / PlantUML planttext.com draw.io terrastruct / Visual_Paradigm / Visio / asciiflow.com / iThoughtsX / ProcessOn / mindnode lite / 幕布

- 图像: cmd + shift + 5 截图或录视频 / lightshot (snip jietu(qq) Skitch) / licecap (kap gifify) / any-video-converter (在线 online-audio-converter.com) / XnConvert(图像处理) / Movist (IINA) / ExifRenamer(重命名图片) / ExifTool [exifr](https://mutiny.cz/exifr/) / HandBrake / MKVToolnix(mkv字幕抽取) / perian(QuickTime插件) / NeatDownloadManager

- 其他: webtorrent-desktop / Kotobee Author / Remote Mouse / [web 历史](https://archive.org/web/web.php) / Enounce MySpeed 加减速网页 flash 播放速度，注意需要专门的卸载工具
- Chrome: Tamper / Wayback Machine / Memex / 一叶 / grammarly.com / doc-viewer Office PPT幻灯片编辑器 / Tampermonkey gitpod npmhub / screenity

### 手机软件

捷径社区, 全历史, 今日热榜, 语音合成助手, OplayerLite, TapEdit, TextNut, Typical, 白描, Stream, 无忧电话录音, 安兔兔测评, 悟空遥控, DVR Link, 透明家 创业邦 心理FM / 心理测试 / 门萨智商测试, IFTTT, Splashtop, andromouse.
游戏：big hunter, brain dots。
查看 app URL scheme: 下载 ipa 文件，修改后缀为 .zip 解压缩，进入 Payload/xx.app 右键显示包内容、找到直接根目录下的 info.plist 文件 xcode 打开、找到 Bundle identifier 再搜索相应的 URL Schemes 即可。Android 下载 apk 文件，通过 在线反编译工具 查看`AndroidManifest.xml`文件内容里的 intent-filter scheme 值。 [iOS12捷径汇总](https://www.jianshu.com/p/ec131155c58d) / [捷径盒](https://jiejinghe.com/) / [查看某个 app 的更新频率](https://www.applyzer.com/)

### U盘格式兼容性

- 支持 Mac + Win 的读写格式: exFAT、FAT32、NTFS(在Mac上读写需要额外装支持软件)。
- 支持大于 4G 的文件: exFAT、NTFS (FAT32不支持)。
- 在 Win 上格式化时、选择 exFAT 格式即可，并且勾选“快速格式化”(不勾选可能不行)。
- 重装 Win 系统用老毛桃制作“U盘启动工具”，另外在此 <http://msdn.itelly.net/> 下载 Win 系列纯净系统 ISO 镜像文件 (可以是不同U盘))。开机(比如按F12)设置U盘优先启动、重启会自动进入PE模式，再点击“老毛桃PE装机工具”，选择U盘中的系统镜像、选择分区C、确定后，勾选“格式化分区[NTFS自动]”和“添加引导[C]”，勾选“完成后重启”、点击确定。

## 快捷键

```sh
pmset noidle  # 阻止电脑睡眠。 同时按住 shift、control、电源键，关闭显示器
单词自动补全：在内置的文本编辑器里，输入几个字母后，点击 Escape 键，OS X 就会提示多个单词。

cmd + shift + . / G / D / F # 在 finder 切换显示“隐藏文件” / 跳转 / 桌面 / 最近使用的全部文件
cmd + shift + 3/4  # 截图保存成文件，加 control 只是保存在剪贴板

sips -z height width [file]   # 修改图片的宽和高为指定值
sips -Z 640 *.jpg   # 批量修改图片的 宽或高 为指定值(最大值变为 640)，保持原来宽高比例
# http://apple.stackexchange.com/questions/102452/can-i-undo-changes-made-via-defaults-write
defaults read com.apple.screencapture  # 查看系统截图设置
defaults write com.apple.screencapture type jpg  # 将系统截屏后图片保存为 jpg 格式
defaults write com.apple.screencapture location ~/Downloads/  # 修改截屏图片保存路径
defaults delete com.apple.screencapture name  # 撤销修改截图名

## Chrome
Command + L  # 光标定位到地址栏，输入搜索词 并按 Alt + Enter 键在 新标签页中
Command + 1/2/3  # 跳到相应标签
Command + Alt + →/←  # 选择 上/下 一个标签
```

---------

## iTerm2 & oh-my-zsh & homebrew

- iTerm2 的 Preferences > Keys 里 HotKey 设置为 Command + `
- iTerm2 的 Profiles > Keys 里点 + 弹出输入 ⌥→ / ⌥← Action 设置为 Send Escape sequence , f / b
- iTerm2 的 Profiles > Window - Transparency 设置透明度 / Style 设置为 `Full-Width Top of Screen`
- [cdto - 在 ITerm 里打开当前 Finder 路径](https://github.com/jbtule/cdto)

```sh
zsh --version  # Mac 系统自带了 zsh
chsh -s /bin/zsh  # 修改 shell 为 zsh ，系统默认使用 /bin/bash 作为 default shell
# 只在 iTerm2 里修改 shell : `Preferences -> Profiles -> Default -> General -> Command`
```

美化 zsh 界面：安装 [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)，它有很多 Plugins 和 Themes。注意：会在 用户目录 生成新的 `.zshrc`

```sh
# homebrew - macOS 不可或缺的套件管理器 (安装不成功可查找 homebrew 国内源)
# https://tourcoder.com/homebrew-slowly/
brew help / list / update  # https://brew.sh/
```

## shadowsocks

```sh
## 方法一：terminal 里的 curl 能走代理
### 查看 ShadowsocksX-NG 客户端 http 代理端口 (通过软件设置查看)，并在 .zshrc 里加入
alias proxyh='export http_proxy=http://127.0.0.1:1087 https_proxy=http://127.0.0.1:1087'

## 方法二：所有请求都能走
brew install proxychains-ng

# 修改 /usr/local/etc/proxychains.conf 配置文件“末尾”部分内容，如下：
#socks4  127.0.0.1 9050
socks5  127.0.0.1 1080

proxychains4 curl https://twitter.com/  
# 测试是否成功 不成功则需要
# 重启 Mac，按下 Cmd + R 选择实用工具->终端，输入 `csrutil disable` 关闭 sip, 输入`csrutil status`查看状态
proxy curl https://twitter.com/  # 方便点、在 .zshrc 里设置 `alias proxy="proxychains4 -q"`
```

shadowsocks 代理模式分为「PAC自动模式」和「全局模式」，全局模式“并不是”所有app都走代理(比如 terminal 不走)。
配合 [SwitchyOmega](https://www.switchyomega.com/) 方便增删特定网址到代理列表中。
代理模式切换时，系统的「偏好设置－网络－高级－代理」里会跟着切换。
疑问：有些代理服务器、用 SwitchyOmega 首次加载 需要代理的网页 会失败、然后自动刷新 访问成功，[问题跟踪](https://github.com/FelisCatus/SwitchyOmega/issues/1511#issuecomment-433313269)

```txt
[SwitchyOmega Conditions]
@with result

*.github.com +proxy
*.medium.com +proxy
*.icloud.com +direct

* +direct
```

---------

## vs code

- 配置文件路径: `~/Library/Application\ Support/Code/User`
- 安装 code 命令：`cmd + shift + p` Shell Command: Install 'code' command in PATH
- 配置项: Preferences > Settings > settings.json
- 在查找(替换)框里按 ctrl + enter 支持多行

```js
// 快捷键
[
  { "key": "cmd+d", "command": "editor.action.copyLinesDownAction" },
  // 安装 Terminal 扩展后
  { "key": "alt+`", "command": "terminal.open" }
]
```

扩展，安装目录: `~/.vscode/extensions`

Terminal / Live Server / markdownlint / filesize / EditorConfig / GitLens / Settings Sync /
Indent 4-to-2 / beautify react-beautify Auto Close(Rename) Tag / SVG Viewer /
pangu / Hungry Delete / javascript console utils
[https://github.com/viatsko/awesome-vscode](https://github.com/viatsko/awesome-vscode) /
Task Explorer / sftp / Web Template Studio


---------

## 虚拟机

- virtualbox win7 网络设置为 bridged adapter (name: wifi) [如图](https://gw.alipayobjects.com/zos/rmsportal/auNTgeEEHVFfWklRjRsK.png)、在家里网络正常，但很奇怪在公司内网不能连接？？
- [虚拟机里的 win 键盘是用的 ctrl 键](https://forums.virtualbox.org/viewtopic.php?f=8&t=63567&hilit=keyboard)
- 安装后重启，或点击菜单 Devices -> Insert Guest Additions CD image… 使能访问 host 电脑并自动调整分辨率
- 设置 Shared Folders

> 注意：当 virtualBox 运行时，Android 官方安装的虚拟机、开不起来！  
> 虚拟机里查看 ip 地址可以看到，例如 10.0.2.2 可访问 host 主机的 localhost , Genymotion android emulator 相应ip为 10.0.3.2

---------

## Apache

[Get Apache, MySQL, PHP and phpMyAdmin working on OSX](https://coolestguidesontheplanet.com/get-apache-mysql-php-phpmyadmin-working-osx-10-10-yosemite/) 、
[apache_virtualhosts](http://lowagie.com/apache_virtualhosts)

[设置 CORS 跨域访问](https://stackoverflow.com/questions/40178363/request-header-field-x-requested-with-is-not-allowed-by-access-control-allow-hea)

```sh
httpd -v  # find the Apache version
sudo apachectl restart / start / stop   # 开关重启
code /etc/apache2/httpd.conf  # 编辑 Apche 的配置文件

找到 "#LoadModule php5_module libexec/apache2/libphp5.so"  去掉前边的`#`号，打开php

改变 localhost 目录指向：

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

> 如果出现 403 You dont have permission to access 错误，修改目录权限 everyone 为“只读”，再重启 Apache

访问：<http://localhost> / <http://localhost:9999/>

有些 API 比如 html5 getUserMedia / geolocation 必须要在 https 环境下生效，参考配置如下(ssl 证书另外自行生成)：

- <http://www.jianshu.com/p/bd016015efe7>
- <http://www.cnblogs.com/y500/p/3596473.html>

结合以下 nginx https 设置、来全面支持。

---------

## nginx

```sh
brew install nginx  
sudo nginx  # 启动
sudo nginx -s stop  # 关闭
sudo nginx -s stop && sudo nginx  # 重启

code /usr/local/etc/nginx/nginx.conf  # 打开配置文件

# 更改 http / HTTPS → server 区块里的配置为：
location / {
    #root   html;
    root    /Users/hua/inner;
    autoindex on;
    index  index.html index.htm;
}

https 设置: https://www.jianshu.com/p/fe0fadb38600
https 设置: https://www.jianshu.com/p/fc1e81efc867

http://localhost:8080  # 重启并测试
https://localhost  # 测试 https
```

---------

system_login 系统脚本

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

---------

## 路由器设置

windows下 ipconfig 查出的 “默认网关” 地址一般就是 “路由器ip” 地址；对应 mac 上的 “偏好设置－网络－高级－TCP／ip下的路由器”。

> 路由器不需要链接网线到电脑上。遇到问题，先路由器复位

tplink-WR720N 迷你型无线路由器(跟普通路由器不同)
默认管理IP: 192.168.1.253 子网掩码: 255.255.255.0 账号密码: admin，默认模式为 AP 模式（其他有 3G / Router 模式）

路由器直接通电，不用插入网线，电脑/手机连接上“路由器名称（不带密码）”，浏览器输入“默认管理IP”、找到“无线设置”-“基本设置”-“SSID号”-“无线网络安全设置” 设置完毕即可。

- AP 模式：一般用于“租房/宾馆”等有网线（电脑能直接连网线上网）但没有无线网的地方。用网线直接连到路由器 LAN 端口，即可直接使用路由器的无线网。
- Router 模式：需要确保路由器 “LAN 网段” 和 “WAN 网段” 不在一个段内。可以在 AP 模式下，查看 IP和DNS地址，如果此时 IP地址 是 192.168.1.xx ，那么切到 Router 模式下，WAN 口的地址填上刚才的 IP和DNS地址，LAN 口的 IP地址 改为 192.168.2.253(xx) ，这样就不在一个网段了。再用网线直接连到路由器 WAN 端口，DHCP 可以打开，然后可上网。
