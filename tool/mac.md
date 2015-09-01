# mac

服务器：python -m SimpleHTTPServer 3435（port）

从Chrome里下载的一个文件，文件权限不够，从本地ip便访问不到。显示简介，更改「共享与权限」里的everyone为「只读」

单词自动补全：在内置的文本编辑器里，输入几个字母后，点击 Escape 键，OS X 就会提示多个单词。

## terminal

* pmset noidle — 阻止电脑睡眠
* date --- 显示系统的当前日期和时间
* cal -- 显示日历
* say hello world  — 说话


### item2 
- 选中即复制，选中某个路径或者某个词汇，iterm2 自动复制
- 另一种是 command+f,弹出iterm2的查找模式，按 tab 或 shift+tab

#### 其他

    将 文件或文件夹拖放到Terminal窗口上，显示完整路径

    finder标题栏显示全路径：defaults write com.apple.finder _FXShowPosixPathInTitle -bool YES

    dock上增加最近打开程序的选项：
    defaults write com.apple.dock persistent-others -array-add '{ "tile-data" = { "list-type" = 1; }; "tile-type" = "recents-tile"; }'
    然后再执行 killall Dock

    禁止在网络（远程）文件夹中创建.DS_Store文件：
    defaults write com.apple.desktopservices DSDontWriteNetworkStores true  

    Mac App Store 下载失败如何解决：
    `defaults write com.apple.appstore ShowDebugMenu -bool true`
    这样可以打开Mac App Store的Debug菜单，清空Cookies或Reset Application重置一下程序即可


### homebrew 
安装：
`ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`  

使用：`brew install/uninstall macvim`  （应用安装在`/usr/local/Cellar/`目录）

其他命令：
`brew doctor`、`brew list`、`brew update`、
`brew remove <application-name>`、`brew search`


#### 启用Apache
    
    打开“终端(terminal)”，输入 sudo apachectl -v
    输入 sudo apachectl start，这样Apache就启动了
    Apache的安装目录在：/etc/apache2/
    
    终端运行“sudo vi /etc/apache2/httpd.conf”，打开Apche的配置文件
    修改 DocumentRoot "/Library/WebServer/Documents" 为自定义路径
    再更改 <Directory "/Library/WebServer/Documents"> 也为上边自定义路径
    
    使目录可见：
    把`<Directory>` 节点下的`Options FollowSymLinks Multiviews` 
    改为`Options Indexes FollowSymLinks MultiViews`
    
    打开php：
    找到`#LoadModule php5_module libexec/apache2/libphp5.so`
    去掉前边的`#`号
        
    重启Apache    
    sudo apachectl restart 
    
    sudo apachectl stop

#### nginx
    
    安装：brew install nginx
    启动：sudo nginx
    测试：http://localhost:8080
    
    打开配置文件：/usr/local/etc/nginx/nginx.conf
    更改 http → server 区块里的配置如下：
        location / {
            #root   html;
            root    /Users/hua/my;
            index  index.html index.htm;
            autoindex on;
        }    
    
    关闭：sudo nginx -s stop 
    重启：sudo nginx -s stop && sudo nginx
    


