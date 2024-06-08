
# misc

https://earthworm.cuixueshe.com/
https://gitblog.io/

Excel 模糊匹配 <http://club.excelhome.net/thread-1048885-1-1.html>

- [GitHub search?q=stars](https://github.com/search?q=stars:%3E1&s=stars&type=Repositories)、[GitHub topics/javascript](https://github.com/topics/javascript)
- [搜 issue](https://help.github.com/articles/searching-issues/)
  - 搜索“某repo”里有“某个评论者”参与的包含的“某个词”的 issue: [warmhug + ant-design-mobile](https://github.com/search?utf8=%E2%9C%93&q=xxxx+commenter%3Awarmhug+repo%3Aant-design%2Fant-design-mobile&type=Issues)
  - 搜索“某user”里有“某个评论者”参与的包含的“某个词”的 issue: [warmhug + xxxx](https://github.com/search?utf8=%E2%9C%93&q=xxxx+commenter%3Awarmhug+user%3Aant-design&type=Issues)
  - 搜索“某人”创建的在“body”里包含“某个词”的 issue: [warmhug + xx](https://github.com/search?utf8=%E2%9C%93&q=xx+in%3Abody+author%3Awarmhug&type=Issues)


## Charles 抓包
> 2019 2024
- 注意
  - 公司里默认安装的vpn软件、公司wifi的代理选项默认会打开“自动发现代理”的配置，需要关闭后、才能使用Charles代理。
  - 使用没有 被设置代理的 浏览器（比如 Chrome **翻墙代理需要关掉**）
- HTTPs 支持：
   - Help -> SSL Proxying -> Install Charles Root Certificate (挨着的 **模拟器** / **手机 **证书都装)
      - 注意：**手机上安装的 证书 和 连接的 mac 电脑要匹配。使用新电脑需要重新给手机安装证书。**
   - 在 macOS 钥匙串访问 里信任证书，iOS 设置里信任证书。
   - 在 Charles 里菜单 Proxy -> “Proxy Setting” Port: 8888 / “SSL Proxying Settings - SSL Proxying - add” 内容 Host:* 、Port:443
   - 在 iOS (**不用连数据线**) WiFi 设置 HTTP 代理，服务器输入 电脑 ip、端口 8888
- 其他：
   - 关闭 mac 端包的抓取：菜单 Proxy 将 maxOS Proxy 取消选中 （这样 iOS 模拟器里也抓不了）
   - 抓取支付宝 RPC 请求：支付宝 可切换环境包 设置关闭 mmtp 开关
   - 映射本地 js 文件、调试代码：菜单 Tools -> Map Remote / Map Local…
   - 为请求配置跨域CORS：菜单 Tools -> Rewrite -> 勾选 Enable Rewrite -> Add -> Add -> Rewrite Rule -> Type 选 URL, Where 勾选 Request, Match Value 填 `http(s?):\/\/pintu.testxx.xx\/(?!(service)\/)`勾选Regex , Replace value 填 `https://127.0.0.1:28064/` 勾选 Replace all


## Git / Npm

[Git Aliases](https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases)、[git-open](https://github.com/paulirish/git-open) 自动打开 git 远程仓库地址

`.gitconfig` 文件

```sh
[alias]
	st = status
	co = checkout
	ci = commit
	br = branch
[user]
	name = warmhug
	email = hualei5280@gmail.com
```

```sh
# 生成 ssh key rsa证书已经被废弃 使用另一种生成方式
# https://confluence.atlassian.com/bitbucketserverkb/ssh-rsa-key-rejected-with-message-no-mutual-signature-algorithm-1026057701.html
ssh-keygen -t ed25519 -C hualei.hl@xx.com
ssh-add ~/.ssh/id_ed25519
# 再把 ~/.ssh/id_ed25519.pub 文件内容添加到 gitlab

# 内部仓库、设置内部邮箱
git config user.name "然则"
git config user.email "hualei.hl@xx-inc.com"
# github 给特定目录 设置单独的 name email, 新建 .gitconfig-github 文件, 在 .gitconfig 里新增以下命令
[includeIf "gitdir:~/inner/-/"]
  	path = .gitconfig-github

# 全局默认设置 code ~/.gitconfig
git config --l
git config --global alias.st status

# 以下对 pnpm yarn 同样生效
# node-sass 需要单独设置国内源
npm config set sass_binary_site=https://npm.taobao.org/mirrors/node-sass
npm config get registry # 查看源
npm config list
npm login --registry=https://registry-cnpm.xx.work  # 命令行登录 registry
npm install tnpm -g --registry="http://registry.npm.xx.com" # 使用 cnpm 加速
yarn install --registry https://registry.npm.taobao.org/  #指定源
yarn config set registry <url-to-your-registry>
npm view lerna
npx lerna list  # 免全局安装

node hello.js &  # 后台运行程序
ps -ef | grep node  # 找到进程对应的ID 在第二列
ps -ef | grep adb  # 有时候 adb devices 没反应 需要杀掉进程重启
lsof -i:8087   # 查找出占用了某个端口的程序和其对应的PID
kill 3747(进程id)  # 杀掉后台进程
kill -9 $(lsof -ti:3000,3001)  # 杀掉端口占用的进程
kill -9 *pid*  # 强制杀掉进程
```

head caret tilde 区别 https://scarletsky.github.io/2016/12/29/tilde-and-caret-in-git/

```sh
# 分支
git checkout -b xx origin/xx    # 新建xx分支，并跟踪远程xx分支
git branch -d xx       # 删除分支xx
git push origin :xx    # 删除远程分支xx
git push origin xx:xx  # 上传我本地的xx分支到远程仓库中去，仍称它为xx分支

git diff [version1] [version2]   # 查看版本差异

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
```

### git 实践

```sh
# git 三板斧
# 一板基础斧 add，commit，pull/push，checkout，revert
# 二板合作斧 merge，rebase，stash，cherry-pick
# 三板优雅斧 commit --amend，rebase -i
```

业内成熟的 GIT 分支模型 https://cloud.githubusercontent.com/assets/36899/7315642/015f534c-eaa2-11e4-9882-b7cc7535fb72.png

图中共有五种分支，这五种分支可分为两大类：

- 只读分支：`master` 和 `develop`，不可直接 commit/push，只能 merge，会长久存在远程仓库中；
- 开发分支：`feature`, `release` 和 `hotfixes`，可以直接 commit/push，不会长久存在远程仓库中。

* master: 线上部署的分支，是最稳定的，只接受来自 `release` 和 `hotfixes` 的 MR。
* develop: 处于开发状态的最新分支，接受来自 `feature` 和 `release` 的 MR。
* feature: 分支为功能开发分支，一个功能对应一个 feature。

1. 需要发布一个版本时，基于 develop 分支创建一个 `release-` 前缀的分支；
2. 在 release 分支上，可以切一些 `bugfix-` 分支修复一些 bug，提 MR 至对应 release 分支；
3. 当 release 分支稳定没有问题后，发一个 MR 到 master，并且同时发一个 MR 到 develop 分支；
4. 合并 MR 后，master 可以打一个 tag，标记版本号；删除 release 分支。

1. 基于 master 创建一个 `hotfix-` 前缀的分支；
2. 开发完成并且测试通过后，提一个 MR 到 master，并且同时发一个 MR 到 develop 分支；
3. 合并两个 MR 后，master 可以打一个 tag 做标记；删除 hotfix 分支。

commit 规范

1. 每个功能点或 bug 务必创建 issue，并在 commit 信息中加上 issue 信息，比如：`git commit -m "feat: 支持新功能 #210"`，`closes #214, #215`，当合并 MR 时，可以自动关闭关联的 issue。

```sh
# https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y
git commit -m "feat(schema): 支持枚举类型 #210"    <- 表明是属于 schema 模块的功能点
git commit -m "chore(style): 修复文字换行问题 #213" <- 表明是针对样式的修复
git commit -m "fix: closes #222"                 <- 表明是修复 #222 的一个 bug
git commit -m "refactor(activity): ..."          <- 表明是针对活动的一些重构
git commit -m "docs: 说明如何支持枚举类型"           <- 表明是文档相关的 commit
git commit -m "test: remove only"                <- 表明是修复测试用例的 commit
```

issue

- 开发任务的 issue ，一般都已经明确目标，格式：`[功能模块]功能描述` 功能模块表明这个 issue 是属于哪个模块。
- 非开发任务的 issue，比如：需求、讨论、方案、系分。标题应尽量简明，描述中可详细展开说明，可以 `cc @xx`。
- 每个 issue 看情况加上 labels，labels 类型（[示例](http://024028.oss-cn-hangzhou-zmf.aliyuncs.com/uploads/fengdie/fengdie-web/2483775ac8f9f7f113f3611cabe3ffbc/Snip20151016_29.png)）：`BUG` 缺陷 `IMPROVEMENT` 功能优化点 `TODO` 待排需求 `需求` 待讨论的需求和议题 `文档` 包含使用说明、发布日志，可以移入 wiki。






# automate (Android)
https://llamalab.com/automate/

权限设置：开启无障碍 允许后台弹出界面 显示悬浮窗 桌面快捷方式。
添加桌面图标：在flow beginning里 install home screen shortcut

语法：
拼接变量 `"my string" ++ myVar` 或 `mystring{myVar}`。
正则表达式(java版本): `matches(txt, "(?s)\\s*+(?:https?://)?+(?:www\\.)?+(?:m\\.)?+(.+?)/?+\\s*+")[1]`。
函数: `contains(txt, "https://")` 等。
Content view 组件的 Content MIME type: `video/mp4` 等类型。
一些 APP 的 Package 和 Activity class:
`com.android.chrome` / `com.google.android.apps.chrome.Main`

社区优秀应用：Search Engine 、 Tab Browser 、 Text to Speech 、Web dialogs (inspect layout, better support) 、 Microsoft Rewards Auto-Search

### 通过分享使用 百度/Google 搜索

情况分析：
- 从普通软件分享的文字是 `你好` 这样的纯文本。
- 从 edge 浏览器bing网站菜单栏的“分享按钮”直接点击分享的文字是 `https://cn.bing.com/search?q=test&qs=HS` 这种纯粹的url。
- 从 edge 浏览器bing搜索结果网页内选中文字后、弹出的分享按钮点击是 `"你好" https://cn.bing.com/search?q=test&qs=HS` 这种 纯文本+URL，需要去掉其中的链接。

实现：
1. 使用 Content shared 组件，设置 Content MIME type 为 Any / Text，Content text 为 txt。
2. 上一步 txt 值可能是 `纯文本、纯文本+URL、纯URL` 三者中的某一种，使用 Expression true 组件来做 if 判断。
   1. 先判断是否为http开头的纯URL、if语句为 `#txt < 4 ? 0 : slice(txt, 0, 4) = "http"` 如果值为真、这时只是bing(或者你自己的默认)搜索引擎链接，用表达式 `matches(txt, ".*([?&])q=(.*?)&.*")[1]` 提取 url 后边的 q 参数值。
   2. 否则再判断是否是 `纯文本+URL`(注意文本和URL之间有换行符)，设置中间变量 txt1 为 `matches(txt, "\"(.*)\"([\\s\\S]*)http.*")[1]` 这个正则能匹配换行符、并提取出了其中的纯文本文字。
   3. 再使用 Expression true 组件判断 `txt1 != ""` 值为真、则使用 Variable set 组件、设置 txt 为 txt1。不为真、则是 `纯文本` 的情况、直接返回 txt 即可。
3. 最终打开的链接: `"https://www.google.com/search?q=" ++ txt` 和 `"https://www.baidu.com/s?wd=" ++ txt`


### 直接打开 天猫精灵-我的设备 页面

使用 App start 组件，package 选择 `com.alibaba.ailabs.tg` Activity class 选择 `com.alibaba.ailabs.tg.home.MyIotHomeActivity`


### 处理 onedriver 里 txt 文件
使用 Dialog choice 组件，在 Choices 输入框输入
```json
{
  "content://com.microsoft.skydrive.content.external/Drive/ID/1/Item/RID/4B2D0681F143BB23%216901/Stream/1/Property/_life.txt": "life",
  "content://com.microsoft.skydrive.content.external/Drive/ID/1/Item/RID/4B2D0681F143BB23%216902/Stream/1/Property/_misc.txt": "misc"
}
```
勾选 Show window 选项、才能弹出弹窗。
> 其中 json 里的 URL 来自 小米默认浏览器 打开 onedriver txt 文件时的路径，使用这个路径、也可以在 automate 这里打开。
再使用 App start 组件，package 选择 `cn.wps.moffice_eng.xiaomi.lite` Activity class 选择 `cn.wps.moffice.plugin.app.entrance.WriterEntranceActivity`


### 亮度升高
set screen brightness 为 0.4，因为 小米改动了系统默认亮度、这里0.5是最亮的。


### 复制日期时间
设置变量 dt "{Now;dateFormat;yyyy-MM-dd_HH-mm}" 设置 clipboard 为 dt。




# Scriptable (iOS/mac)

[mac scriptable](https://scriptable.app/mac-beta/)
[scriptable docs](https://docs.scriptable.app/)
[reddit 社区](https://www.reddit.com/r/Scriptable/)
[automators 社区](https://talk.automators.fm/t/file-bookmarks-sync/5729)
https://github.com/dersvenhesse/awesome-scriptable
https://github.com/evilbutcher/Scriptables
https://routinehub.co/

[捷径汇总](https://www.jianshu.com/p/ec131155c58d)
https://ifttt.com/ 通过获取“智能开关、iOS提醒事项日历”等各类服务的API、再设置 if.then 逻辑、在手机上打开才能运行。注意：没有像“iOS快捷指令”app的系统权限、不能调用其他app。

iOS<=16 版本，小组件里列表内容 没有click等点击事件、只可以通过url打开Safari或其他app。

[icon_themer & Fancy Icon Maker](https://www.reddit.com/r/shortcuts/comments/p30bnu/icon_themer_alternative/) 新版 iOS 已失效。

iOS内容限制：转到“设置” > “屏幕时间” > “内容和隐私限制” > 选择“内容限制”-”网页内容“。

[appintents](https://developer.apple.com/documentation/appintents/)

学习

```js
// 通过查看 APP 里的 Gallery 示例代码，能全面了解各种功能和写法。

console.log(config);
// 输入参数
let input = (args.widgetParameter == null) ? 'no' : args.widgetParameter;
console.log(input);

// 桌面 widget 设置
let widget = new ListWidget()
let wTxt = widget.addText('显示的文字')
wTxt.textColor = Color.white();
widget.setPadding(16,16,16,0)
widget.spacing = -3
let gradient = new LinearGradient()
gradient.colors = [new Color("FF6F91"), new Color("FF9671")]
gradient.locations = [0.5, 1]
widget.backgroundGradient = gradient
Script.setWidget(widget)

// DocumentPicker 不能在 widget 里运行
let fileURLs = await DocumentPicker.open(["public.plain-text"])
let txt = FileManager.local().readString(fileURLs[0])
console.log(txt);

// 在 iCloud Scriptable 目录里创建 _my_note.txt
let fm = FileManager.iCloud()
fm.writeString(fm.joinPath(fm.documentsDirectory(), '_my_note.txt'), 'aa');

// https://talk.automators.fm/t/read-icloud-file-outside-scriptable-directory/3959
// 由于沙箱机制，只能读取 scripable 所在目录内的文件，iCloud 内其他目录文件读取不了。
let fm = FileManager.iCloud()
let dirPath = fm.documentsDirectory()
console.log(dirPath)
console.log(fm.joinPath(dirPath, "test.txt"))
console.log(fm.libraryDirectory())
// 文件书签 https://www.macstories.net/stories/beyond-the-tablet/9/
// APP 设置 -> File Bookmarks 添加 file 或 direction 之后可以读取
// 可以 writeString 编程修改，也可以直接手动修改关联的原文件、修改后自动更新。
console.log(fm.bookmarkExists('test.txt'))
console.log(fm.readString(fm.bookmarkedPath('test.txt')))
let wr = fm.writeString(fm.bookmarkedPath('test.txt'), 'aa\nbb\ncc')
let raw = fm.readString(fm.bookmarkedPath('test.txt'))
console.log(wr);
console.log(raw);
console.log(fm.allFileBookmarks())

// 读取剪贴板 注意 console log 的参数只能一个
var clipboardContents = Pasteboard.paste();
console.log(`Clipboard contents: ${clipboardContents}`);

// widget 里只能配置 url, 不能调用 Safari 等系统APP的API
if (config.runsInWidget) {
  let widget = createWidget(items)
  Script.setWidget(widget)
  Script.complete()
} else {
  //QuickLook.present(createWidget(items));
  Safari.open(appURL)
}
```

应用

```js
// 参考 gallery 里的 News Widget 小组件
// 增加打开 shortcuts 相应指令的功能
function addItem(container, { date, url, text }) {
  const item = container.addStack();
  item.url = url;
  item.setPadding(4,4,4,4);

  const textObj = item.addText(text);
  textObj.font = Font.mediumSystemFont(13);
  textObj.textColor = Color.darkGray();
  textObj.lineLimit = 1;
}
function createUI(container, wData) {
  const out = container.addStack();
  wData.forEach(items => {
    const col = out.addStack();
    col.layoutVertically();
    items.forEach(item => {
      addItem(col, item);
    });
    out.addSpacer(10);
  });
}
function cURL(name) {
  let scUrl = new CallbackURL("shortcuts://x-callback-url/run-shortcut");
  scUrl.addParameter("name", name);
  return scUrl.getURL();
}
const data = [
  [
    { url: 'scriptable://', text: 'scriptable' },
    { url: cURL('卧室关灯'), text: '卧室关灯' },
    { url: cURL('开插座'), text: '开插座' },
    { url: cURL('关插座'), text: '关插座' },
  ],
  [
    { url: 'shortcuts://', text: 'shortcuts' },
    { url: cURL('获取时间'), text: '获取时间' },
    { url: cURL('番茄计时'), text: '番茄计时' },
    { url: cURL('豆瓣实时'), text: '豆瓣实时' },
  ],
  [
    { url: cURL('打开keep'), text: '打开keep' },
    { url: 'weread://', text: '微信读书' },
    { url: 'googletranslate://', text: 'Google翻译' },
    { url: 'googlechrome://www.google.com.hk/#newwindow=1', text: 'Chrome搜索' },
  ],
];
const widget = new ListWidget();
createUI(widget, data)
Script.setWidget(widget);
widget.presentMedium();
Script.complete();
```


```js
// 参考自 https://talk.automators.fm/t/reading-contents-of-a-file/8865/2
// Random number generator
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}
let fm = FileManager.iCloud()
let raw = fm.readString(fm.joinPath(fm.documentsDirectory(), '_my_note.txt'))
// let raw = fm.readString(fm.bookmarkedPath('_my_note'))
let quotes = raw.split("\n").filter(item => item && item != '========');
//console.log(quotes)
let lines = quotes.length;
let idx = getRndInteger(2, lines);
let widget = new ListWidget()
let wTxt = widget.addText(`[${(idx / lines).toFixed(2)}] ${quotes[idx]}`);
wTxt.minimumScaleFactor = 0.8;
widget.backgroundColor = new Color('dddddd');
Script.setWidget(widget);
widget.presentMedium();
Script.complete();
```


```js
// 主文件内容。加载远程文件 remote.js 并执行其中代码。
const codeFilename = "remote"
const gitHubUrl = "http://localhost:9999/remote.js"
// Determine if the user is using iCloud.
let files = FileManager.local()
const iCloudInUse = files.isFileStoredIniCloud(module.filename)
// If so, use an iCloud file manager.
files = iCloudInUse ? FileManager.iCloud() : files
// Determine if the Weather Cal code exists and download if needed.
const pathToCode = files.joinPath(files.documentsDirectory(), codeFilename + ".js")
if (!files.fileExists(pathToCode)) {
  const req = new Request(gitHubUrl)
  const codeString = await req.loadString()
  files.writeString(pathToCode, codeString)
}
// Import the code.
if (iCloudInUse) { await files.downloadFileFromiCloud(pathToCode) }
const code = importModule(codeFilename)
// Run the initial setup or settings menu.
let preview
if (config.runsInApp) {
  preview = await code.runSetup(Script.name(), iCloudInUse)
  console.log(preview);
  if (!preview) return
}
const widget = new ListWidget();
widget.refreshAfterDate = new Date(Date.now()+1000*60*60*24*30*12);
const text = widget.addText('aaa bbb');
text.textColor = new Color('C5EA9C');
widget.backgroundColor = new Color('FFFFA1');
Script.setWidget(widget);
// If we're in app, display the preview.
if (config.runsInApp) {
  if (preview == "small") { widget.presentSmall() }
  else if (preview == "medium") { widget.presentMedium() }
  else { widget.presentLarge() }
}
Script.complete();


// 远程文件 remote.js 作为主文件的 module 被 import 进去
module.exports = {
  // Initialize shared properties.
  initialize(name, iCloudInUse) {
    this.name = name
    this.fm = iCloudInUse ? FileManager.iCloud() : FileManager.local()
    this.bgPath = this.fm.joinPath(this.fm.libraryDirectory(), this.name)
    this.now = new Date()
    this.data = {}
    this.initialized = true
  },
  async runSetup(name, iCloudInUse, codeFilename, gitHubUrl) {
    if (!this.initialized) this.initialize(name, iCloudInUse)
    const backgroundSettingExists = this.fm.fileExists(this.bgPath)
    console.log(this.bgPath);
    console.log(backgroundSettingExists);
    await this.generatePrompt("Weather Cal is set up.", 'message', ["Continue"])
    return await this.setWidgetBackground()
  },
  async setWidgetBackground() {
    return 'large';
  },
  // Generic implementation of an alert.
  async generatePrompt(title,message,options) {
    const alert = new Alert()
    alert.title = title
    if (message) alert.message = message
    const buttons = options || ["OK"]
    for (button of buttons) { alert.addAction(button) }
    console.log(alert);
    // if (!options) await alert.present()
    return alert
  },
};
```


```js
// 创建目录、解析远程json
// https://github.com/wa91/quote-widget/blob/main/Quote
let fm = FileManager.iCloud();
let cachePath = fm.joinPath(fm.documentsDirectory(), "subDir");
console.log(cachePath);
if(!fm.fileExists(cachePath)){
  fm.createDirectory(cachePath)
}
const date = new Date();
let raw = new Date(Number(fm.readString(fm.joinPath(cachePath, "lastread"))));
let past= new Date(new Date(date.getTime()) - (60 * 60 * 1000));
console.log(past)
console.log(raw)
if (raw<past) {
let req = new Request('https://zenquotes.io/api/random');
  let json = await req.loadJSON();
  fm.writeString(fm.joinPath(cachePath, "lastread"), String(date.getTime()));
  fm.writeString(fm.joinPath(cachePath, "quote"), json[0].q);
  fm.writeString(fm.joinPath(cachePath, "author"), json[0].a);
}
let quote = fm.readString(fm.joinPath(cachePath, "quote"));
let author = fm.readString(fm.joinPath(cachePath, "author"));
var size =14;
if (quote.length > 80) {
  size= 10;
}
```



# plantuml

2022-08 Uml 图问题：不能给文字加链接。https://draw.io

```plantuml
@startuml

header Page Header

title
* demo https://www.planttext.com
* 语法
https://plantuml.com/color
https://plantuml.com/style-evolution
https://plantuml.com/creole
https://plantuml.com/preprocessing
https://plantuml.com/archimate-diagram
https://plantuml.com/sequence-diagram
https://plantuml.com/activity-diagram-legacy
https://plantuml.com/activity-diagram-beta
https://plantuml.com/link
https://plantuml.com/stdlib
https://stackoverflow.com/questions/15448606
end title

'单行注释 single comment
' 只要出现 (xx) 第一个元素就变成了 actor
' usecase 图里不能使用 if else 语句

!$var = "定义变量"
rectangle aa as "long name"

note left
$var
多行注释
**bold** --stroked-- __underlined__
~~waved~~
//斜体样式// This line is in italics
----
This one contains som <b>HTML</b>
<size:18><b>加重 <color:red>颜色
<back:cadetblue>background color</back>
<u:#ADD1B2>underlined</u>
<s:green>stroked</s>
EmojiTwo <:1f600:> <:innocent:> <#green:sunny:> <#0:sunglasses:>
[[https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md emoji-cheat-sheet]]
..Conclusion..
....
Example of Tree
|_ First line
|_ **Bom (Model)**
  |_ prop1
....
* 这是 list
* This line contains a bullet
** sub list
====
# num 1
## num 2
# num 3
end note

@enduml
```


```plantuml
title 基本元素示例
'skinparam actorStyle awesome
' hide footbox
' box SBCP

[bb]
(usecase)
' participant "First" as F
' participant "Second" as S
boundary Boundary
actor b #pink;line:red;line.bold;text:red
usecase c #palegreen;line:green;line.dashed;text:green
usecase UC1 as "You can use
several lines."

User --> (Use)
User --> (UseCase) : A small label \n new line
User --> (bar1) #line:red;line.bold;text:red  : red bold

' U -> F  : "start"
' F -> S

```


```plantuml
' left to right direction

title 综合示例
skinparam class {
  ArrowColor red
}
skinparam rectangle {
  BorderColor Blue
}
circle jaAlias as ja #red
rectangle "u u u" as Up #line.dashed
rectangle Down

ja -u[#green,dashed]-> Up
ja -d[dotted]-> Down

' #green:(A)
' #red:Drink Homebrew;
' #AAA:结束;
' kill

' |#dee4e8|swimlanes|
' start
' |#daf0fe|swimlanes1|
' end

```




---
应用

```plantuml
@startuml
:sss;
split
   :A;
   kill
split again
   :B;
   detach
split again
   :C;
   kill
end split
@enduml
```


```plantuml
@startuml
title 无分支条件

[*] --> active
active -right-> inactive : disable
inactive -left-> active  : enable
inactive --> closed  : close
active --> closed  : close
closed --> [*]
@enduml
```


```plantuml
@startuml

left to right direction
'top to bottom direction

rectangle Arrows
rectangle C
rectangle D
rectangle E

Arrows --> C
Arrows --> D
Arrows --[hidden]> E

@enduml
```


```plantuml
@startuml
left to right direction
'top to bottom direction

rectangle Arrows
note top : aaa\nbbb
rectangle A
rectangle B
rectangle C
rectangle D
rectangle E

Arrows --> A
A --> B
A --> C
Arrows -u-> D
Arrows -u-> E
Arrows -u-> F

@enduml
```


```plantuml
@startuml
left to right direction

rectangle ima as "Issues Management" #lightgreen
rectangle qac as "Quick Access"
rectangle jse as "JS Overview \n [[https://baidu.com JS Error List]]"
rectangle req as "Request Overview \n [[https://baidu.com Error Request List]]"
rectangle res as "Resource Overview \n [[https://baidu.com Error Resource List]]"
rectangle per as "Performance Overview \n [[https://baidu.com Worst Performing Pages]]"

qac --> ima : direct link to
jse --> ima : manage issues
req --> ima : manage issues
res --> ima : manage issues
per --> ima : manage issues

@enduml
```


```plantuml
@startuml

!$rfcs = "进入 apm_web_rfcs 空间"
!$coll = "收集需求"
!$new  = "新建需求\n添加基本描述"
!$rc   = "选择 slardar/apmplus 空间，同步创建新需求 或关联已有需求"
!$entr = "进入 slardar/apmplus 空间"
!$main = '在 slardar/apmplus 空间做需求管理 \n 会 <u>自动同步</u> 部分状态变更 到 rfcs 空间的相应需求'
!$fm   = "在 slardar/apmplus 空间完成 线上验收"
!$fr   = "rfcs 空间相应需求 手动再确认"
!$stop = "终止"

rectangle $coll #A9DCDF
rectangle frr as "$fr" #lightgreen
rectangle $stop #ddd

:Actor: -u-> $coll : bp/oncall
$coll -r-> ($new) : $rfcs
($new) -r-> ($rc) : 转为正式需求
($new) -d-> ($stop) : 伪需求
($rc) -d-> ($main) : $entr
($main) -d-> frr : $fm

@enduml
```


```plantuml
' a 不能变成 :a:
a -> b
if "a" then
  -->[true] "Some Action"
else
  ->[false] "Something else"
endif
```


```plantuml
'甘特图

@startgantt
/'
单行注释、放在 单引号之间，多行注释前后加斜杠
[正式上线] lasts 1 day and starts at 2020/03/20
'/
'skinparam classFontSize 10'

scale 2
project starts the 2019/12/16
saturday are closed
sunday are closed
2020/01/01 is closed
2020/01/22 to 2020/02/02 is closed
2019/12/16 to 2019/12/30 are named [十二月]
2020/01/01 to 2020/01/31 are named [一月]
'2020/02/01 to 2020/02/30 are named [二月]'

-- 开发阶段（灰色背景是节假日、不计入总时间） --
[环境准备] as [hj] lasts 2 days and is colored in Lavender/LightBlue
then [首页 3d] lasts 3 days
[流程管理 4d] as [lc] lasts 4 days
[hj] -> [lc]

[<size:13><b>交付中心 <color:red>11d] as [jf] lasts 11 days
[jf] starts at [lc]'s end and is colored in Yellow/Green
[列表 3d] lasts 3 days and starts at [jf]'s start
[大图 3d] lasts 3 days and starts at [jf]'s start
[明细 3d] lasts 3 days and starts at [jf]'s start
[大图 3d] lasts 3 days and starts at [jf]'s start
[任务 3d] lasts 3 days and starts at [jf]'s start
[权限 5d] as [qx] lasts 5 days and starts at [jf]'s end

-- 测试阶段 --
[集成测试 5d] as [jc] lasts 5 days and is colored in Fuchsia/FireBrick
[qx] -> [jc]

@endgantt

```












# markdown 语法

Marp https://devtool.tech/html-md

:+1: :smile: :smiley: :laughing:
- [emoji-cheat-sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet/)
- [Emoji Unicode Tables](http://www.unicode.org/emoji/charts/full-emoji-list.html)

任务 `- [] 跑步` 或 `- [x] 吃饭`；普通链接 [test](http://example.net "optional") 。图片 ![img | center | 100x100](https://zos.alipayobjects.com/rmsportal/lcLKYXUWPbqkavfJbMGx.png "optional")。

| Item      |    Value | Qty  |
| :---- | ----:| :--: |
| Computer  | 1600 USD |  5   |

<details>
  <summary>Is this production ready?</summary>
  Next.js has been powering `https://zeit.co` since its inception.
</details>








# Linux / Unix


```sh
# man 查看命令帮助文档。 例如：使用 man ascii 来查看 ASCII 表。
ctrl + w      # 删除前一个单词
ctrl + u / k  # 清除光标到 行首 / 行尾 的内容
ctrl + a / e  # 移动到所在 行首 / 行尾
esc + b / f   # 移动到所在单词的 词首 / 词尾
ctrl + c      # 退出某进程（不是 command）
ctrl + r      # 查找输入过的命令
cammand + k / ctrl + l / clear  # 清屏

d  # 向后滚动 n 行，比如 `git diff` / `man less` 显示很多内容、可快速查看
u  # 向前滚动 n 行
G  # 直接跳到最后一行
h  # 显示帮助

mv ./filename ./filename  # 移动文件/目录，重命名文件
echo ttt > ./file.txt  # 覆盖文件原内容并重新输入内容，若文件不存在则创建文件
echo ttt >> ./file.txt  # 向文件追加内容，原内容将保存
true > ./file.txt  # 清空 file.txt 文件内容
> file.txt  # 创建一个空文件，比 touch 短
cat error.txt >> acc.txt  # 把 error.txt 文件内容输出到 acc.txt 文件中

cat [-n] filename  # 由第一行开始显示档案内容, n 显示行号
more filename # 一页一页的显示档案内容. less 与 more 类似，而且可以往前翻页
history 10 # 列出最近执行过10条的命令，默认放在 .bash_history 文件中，默认保存1000条(可以修改)
history | more # 逐屏列出所有的历史记录，!99 执行历史清单中的第99条命令

head/tail filename  # 只看 头/尾 几行(默认10行)
head/tail -n 20 ~/.bashrc  # 显示头二十行

which java  # 查看 java bin 所在的路径，如果是 `/usr/bin/..` 说明是软连接、再运行 ls -l `which java` 即可
chmod u+x test.sh    # 修改权限，脚本可执行
chmod +x demo.py    # 修改权限，脚本可执行

dig [IP地址/域名] +short  # 查询 DNS 包括 NS 记录，A 记录，MX 记录等相关信息的工具
nslookup [IP地址/域名]  # 查询一台机器的 IP 地址和其对应的域名
# 诊断路由节点问题，如丢包、网站访问慢、结合了 "traceroute" 和 "ping" 功能。下载地址 http://rudix.org/packages/mtr.html
# 以报告模式显示：从我的主机到目标主机经过的路由节点以及到各节点数据包的丢包率和 ping 命令的最短/最长时间和标准偏差。
# mtr 详细：https://meiriyitie.com/2015/05/26/diagnosing-network-issues-with-mtr/
mtr -r [IP地址/域名]

alias # 查看系统里别名
w / who # 列出当前登录的所有用户
whoami # 显示当前正进行操作的用户名
tty # 显示终端或伪终端的名称
last # 查看系统最后登录
date # 显示系统的当前日期和时间
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
```

### ssh & scp

scp -r ~/Downloads/build/ root@118.31.47.xx:/home/admin/nginx/
ssh root@118.31.47.xx xyxyxy
cd /home/admin/nginx/
cp -r ./build ./build-back1

### curl

与服务器交互数据的工具，支持 http,https,ftp,ftps,telnet 等多种协议，常被用来抓取网页和监控Web服务器状态。
[命令详解](http://aiezu.com/article/linux_curl_command.html)

格式：`curl [-i带header | -I只输出header ] [URL...]`

```sh
curl https://twitter.com/  # 直接打印内容
curl 'https://api.github.com/user/repos?page=2&per_page=100'  # 有特殊字符需要用引号包裹

curl https://www.baidu.com -o xx.html  # 下载页面到 xx.html 里
# 下载文件并显示简单进度条
curl -# -o centos6.8.iso http://mirrors.aliyun.com/centos/6.8/isos/x86_64/CentOS-6.8-x86_64-minimal.iso
# 断点续传：继续完成上次终止的未完成的下载
curl -# -o centos6.8.iso -C - http://mirrors.aliyun.com/centos/6.8/isos/x86_64/CentOS-6.8-x86_64-minimal.iso

curl https://api.github.com?callback=foo   # jsonp
curl -i "https://api.github.com/repos/vmg/redcarpet/issues?state=closed"  # 输出 header + 内容
curl -i https://api.github.com -H "Origin: http://example.com"  # 设置 CORS
```

### grep

[grep](http://www.cnblogs.com/peida/archive/2012/12/17/2821195.html) 搜索文件内容，会对文件的每一行按照给定的 pattern 进行匹配查找。

格式：`grep [-r递归 -n行号 -i忽略大小写 -I忽略二进制文件] 搜索字符串/正则表达式 [filename]`

```sh
grep -rn 'grep' *  # 以 字符串 grep 来搜索 当前目录及子目录 的所有文件内容
grep grep$ she*.md  # 以 正则表达式 grep$ 来搜索 当前目录下 文件名匹配 she*.md 的内容

# 注意，-r 递归搜索时，使用 *.md 的 filename 无效。
grep -r --include=\*.{cpp,h} pattern ./
grep -rn --include="*.js" pattern *

grep -r --exclude-dir=node_modules pattern /path
grep -r --exclude-dir=node_modules --exclude-dir=dev pattern /path
grep -rI --exclude-dir="\.svn" "pattern" *   # 忽略二进制文件和svn隐藏目录
grep -r --color --exclude-dir={custom,lib,scripts} --exclude={*.xml,error_log} "beta" *

cat test.txt | grep ^u   # 找出以 u开头 的行内容
cat test.txt | grep hat$  # 输出以 hat结尾 的行内容
cat test.txt | grep -E "ed|at"  # 显示包含 ed或者at 字符的内容行
```

### find

[find](http://www.binarytides.com/linux-find-command-examples/) 命令是根据文件的属性进行查找，如文件名，文件大小，所有者，所属组，是否为空，访问时间，修改时间等。
[exclude directory](https://stackoverflow.com/questions/13460482/exclude-a-sub-directory-using-find)

```sh
find  # 在 当前目录以及子目录 列出所有文件
find /etc -name httpd.conf  # 在 /etc 目录下文件 httpd.conf
find . -name '*bash*'    # 在 当前目录以及子目录 下查找文件名中含有字符串 bash 的文件
find . -name "*.js" -not -path "*node_modules*"  # 排除路径中含有 node_modules 的文件
find . -name "*.js" -not -path "*node_modules*" -not -path "*js-css-html*" # 排除多个路径
find . \( -name "*.py" -o -name "*.js" \) -not -path "*node_modules*"  # 查找多个文件类型

find / -amin -10   # 查找在系统中最后10分钟访问的文件(access time)
find / -mmin -5   # 查找在系统中最后5分钟里修改过的文件(modify time)
find / -size -1000k   #查找出小于1000KB的文件

find . -name '*.DS_Store' -type f -delete   # 删除某目录及子目录下的 .DS_Store 文件
```

vim 是 vi 的增强版本。相比vi添加了显示颜色等功能。
![vim 键盘图](https://zos.alipayobjects.com/rmsportal/MOPJrAnojdFvAToZkESi.gif)

```sh
# 编辑模式
输入 i 再输入其他字符。 按 esc 退出，切回命令模式

# 命令模式
导航：h j k space键
ctrl-f  上翻一页
ctrl-b  下翻一页
^     跳至行首
$     跳至行尾
gg    跳至文件的第一行
G     到文件的最后一行
:w   保存
:wq  :x  shift zz 保存修改并退出
:q!  强制退出，放弃修改
u     撤销
ctrl+r   重做（撤销一个撤销）
.     重复上一个编辑命令
==     自动缩进当前行
dd 删除光标所在行， dw 删除一个字(word) ，D 删除到行末
x 删除当前字符，  X 删除前一个字符
yy 复制一行，此命令前可跟数字，标识复制多行，如6yy，表示从当前行开始复制6行
yw 复制一个字 ， y$ 复制到行末
p 粘贴内容到当前行的下面 ，P 粘贴内容到当前行的上面
复制 粘贴（如果粘贴外部内容，在i模式下，直接cmd+v）
按 v 进入可视模式；移动光标键选定内容！w选择单词，y复制(或gy)，p粘贴，x删除，d删除后边

tail -n10 path/filename 查看文件最后10行
?pattern  /pattern     向前后搜索字符串pattern
:s/vivian/sky/g 替换当前行所有 vivian 为 sky
:%s/source_pattern/target_pattern/g  全局替换

[vi编辑器使用color-scheme](http://alvinalexander.com/linux/vi-vim-editor-color-scheme-colorscheme)
```

Unix 遵循的原则是 KISS (Keep it simple, stupid) do one thing and do it well。
Linux 分为内核版、发行版。比较常用的发行版有 redhat、ubuntu 等。服务器端大多使用 redhat\centos，没有图形界面，因为图形界面占用更多系统资源，造成不稳定，被攻击的可能性更大。

- Linux 严格区分大小写。所有内容以文件形式保存，包括硬件。如：键盘 /dev/stdin 显示器 /dev/stdout
- Linux 不靠扩展名区分文件类型，靠权限区分。（.gz .tgz .sh等文件扩展名只是为了方便管理员查看）

shell 是一个命令行解释器。shell 是壳，kernel 是内核。shell 把用户敲进去的命令、翻译为 linux 内核能识别的语言。
linux 下有些命令是 shell 自带的，有些命令是别人写好装进来的(如 ls )，用 `whereis ls` 来区别。
sh: Bourne Shell 的缩写，可以说是目前所有 Shell 的祖先。 bash : Bourne Again Shell 的缩写，是 sh 的一个进阶版本。bash 是目前大多数 Linux 发行版和苹果的 Mac OS X 操作系统的默认 Shell。
[bash-guide](https://github.com/Idnan/bash-guide)
[mac-shell 介绍](http://ntop001.github.io/2015/06/06/mac-shell/)、
[Zsh 和 Bash 的不同](https://xshell.net/shell/bash_zsh.html)，在 zsh 的 terminal 里运行 bash 脚本，可能有兼容问题，需要用 `emulate bash/sh` 切换为仿真模式。
安装 CentOS (min 版) 后，登录系统会显示 `localhost login:` 填入 root 、然后输入安装时设置的密码。

```sh
# shell 变量声明：
变量名=变量值 (等号前后不能有空格) # 例如 NODE_ENV='PRODUCTION' gulp build
echo $变量名
echo $PATH  # 查看PATH环境变量
echo $SHELL # csh 是 C Shell。bash，sh，zsh 是 Bourne Shell 的变种。
env / printenv JAVA_HOME  # 打印环境变量

>  >>  &>  &>>  2>&1  # 输出重定向
# 管道符 |

# shell 变量叠加：
x=123
x="$x"456  (或 x=${x}456)
echo $x

$n $* $@ $#    # 位置参数变量
$? $$ $!   # 预定义变量

符号：单引号、双引号、反引号、$()、$、#、\
通配符、正则表达式 是不同的东西。正则是包含匹配，通配符是完全匹配。正则匹配文件内容字符串，通配符匹配文件名。

#!/bin/sh  # 如果文件开头的 shebang 为 `#!/bin/bash` 会使用 bash 执行命令，而不管系统默认的 shell 是否为 bash。如果没写 shebang，那么此脚本文件会被用户当前的 Shell 所执行。

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

```sh
# Windows Dos cmd 里操作技巧： 命令帮助 /? 例如：md /? ，for /?

echo ... > A.txt    # 重定向输出，此时创建文本文件 A.txt;
echo ... >> A.txt   # 向 A.txt 文件中追加信息...
del *.txt # 删除文件

chcp 65001  # 换成UTF-8代码页
chcp 936 # 可以换回默认的GBK

# 环境变量
set  # 查看当前可用的所有环境变量（=系统变量+用户变量）
set PATH  # 查看某个环境变量，如PATH
set xxx=aa  # 添加环境变量，如xxx=aa
set PATH=%PATH%;d:\xxx  # 在某个环境变量（如PATH）后添加新的值（如d:\xxx）

echo %cd%  # %cd% 可用在 批处理文件中 或 命令行中，其内容为命令的执行路径或批处理文件的执行路径
%0  # 代指批处理文件自身
%~d0   # 是指批处理所在的盘符
%~dp0   # 是盘符加路径，只可以用在批处理文件中，由它所在的批处理文件的目录位置决定
cd %~dp0  # 进入批处理所在目录
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
