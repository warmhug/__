
# linux 命令格式： 命令 [选项] [参数]

    cd [ .. - ]    mkdir [ p ]    pwd    rm [ rf ]

find . 查看当前目录所有文件/子文件
cat [-n] filename  由第一行开始显示档案内容
more filename 一页一页的显示档案内容. less 与 more 类似，但是比 more 更好的是，他可以往前翻页！
head filename 只看头几行(默认10行)  head -n 20 ~/.bashrc 显示头二十行！
tail filename 只看尾巴几行(默认10行) tail -n 5 ~/.bashrc 只显示最后面五行！

man 查看命令帮助文档。 例如：使用 man ascii 来查看 ASCII 表。

其他命令：
- w/who -- 列出当前登录的所有用户
- whoami -- 显示当前正进行操作的用户名
- tty -- 显示终端或伪终端的名称
- last / lastlog  查看系统最后登录
- history -- 列出最近执行过的几条命令，默认放在.bash_history文件中
    - -c  ：将目前的shell中的所有history内容全部消除，但/root/.bash_history文件中还存在
    - n   ：数字,要列出最近的 n 笔命令列表

### curl
jsonp： curl https://api.github.com?callback=foo
CORS：curl -i https://api.github.com -H "Origin: http://example.com"

curl https://api.github.com
curl -i "https://api.github.com/repos/vmg/redcarpet/issues?state=closed"
curl 'https://api.github.com/user/repos?page=2&per_page=100'

### grep
grep是根据文件的内容进行查找，会对文件的每一行按照给定的模式(patter)进行匹配查找。  
[介绍](http://www.cnblogs.com/peida/archive/2012/12/17/2821195.html)

基本格式：grep [选项] 搜索字符串/正则表达式 [filename]

    选项：r递归 n行号 i忽略大小写 I忽略二进制文件

    grep pattern *   #搜索 当前目录 的所有文件内容
    grep -rn pattern *   #搜索 当前目录及子目录 的所有文件内容
    grep pattern *.doc       #搜索当前目录下doc文档
    grep '^[^48]' data.doc      #不匹配行首是48的行

    grep -r --include=\*.{cpp,h} pattern rootdir
    grep -ir --include="*.js" pattern *

    grep -r --exclude-dir=node_modules pattern /path/to/search
    grep -r --exclude-dir=node_modules --exclude-dir=dev pattern /path/to/search
    grep -rI --exclude-dir="\.svn" "pattern" *    忽略二进制文件和svn隐藏目录

    grep -r --color --exclude-dir={custom,lib,scripts} --exclude={*.xml,error_log} "beta" *

    cat test.txt | grep ^u   找出以u开头的行内容
    cat test.txt | grep hat$  输出以hat结尾的行内容
    cat test.txt | grep -E "ed|at"  显示包含ed或者at字符的内容行
    cat test.txt | grep -f test2.txt   从文件中（test2.txt）读取关键词进行搜索

### find
find命令是根据文件的属性进行查找，如文件名，文件大小，所有者，所属组，是否为空，访问时间，修改时间等。

    find / -name httpd.conf　　#在根目录下查找文件httpd.conf，表示在整个硬盘查找
    find /etc -name httpd.conf　　#在/etc目录下文件httpd.conf
    find . -name '*srm*' 　　#表示当前目录下查找文件名中含有字符串‘srm’的文件

    find / -amin -10 　　# 查找在系统中最后10分钟访问的文件(access time)
    find / -mmin -5 　　# 查找在系统中最后5分钟里修改过的文件(modify time)
    find / -size -1000k 　　#查找出小于1000KB的文件

    find . -name '*.DS_Store' -type f -delete  删除某目录及子目录下的 .DS_Store 文件

### echo
  echo命令的功能是在显示器上显示一段文字，一般起到一个提示的作用。

  使用 > 指令覆盖文件原内容并重新输入内容，若文件不存在则创建文件。
  使用 >> 指令向文件追加内容，原内容将保存。
  echo "aaa“> /home/root/a.txt

### mv
可用于移动文件/目录，重命名文件

    mv old-file-name  new-file-name


### view
  Basic usage: view <filename>
  man view

### chmod
chmod命令用于改变linux系统文件或目录的访问权限。

chmod u+x test.sh    # 修改权限，脚本可执行

### lsof

    lsof -i:8087   查找出占用了某个端口的程序和其对应的PID
    kill *pid*   杀掉进程

### 软/硬连接
连接有软连接和硬连接(hard link)之分的，软连接(symbolic link)又叫符号连接。符号连接相当于Windows下的快捷方式。不可以对文件夹建立硬连接，我们通常用的还是软连接比较多。
（注意：软连接和mac上的制作替身不同）

格式：ln [option] source_file dist_file （source_file是待建立链接文件的文件，dist_file是新创建的链接文件

    #若权限不足加 sudo
    ln -s source dist        # 建立软连接
    ln source dist           # 建立硬连接
    rm -rf symbolic_name    # 注意不是rm -rf symbolic_name/

软连接可以 跨文件系统，硬连接不可以。软连接可以对一个不存在的文件名进行连接。软连接可以对目录进行连接。硬链接下修改源文件或者连接文件任何一个的时候，其他的文件都会做同步的修改。

## 环境变量操作
- echo $PATH  -- 查看PATH环境变量
- echo $SHELL
    - 如果输出的是：csh或者是tcsh，那么你用的就是C Shell。
    - 如果输出的是：bash，sh，zsh，那么你的用的可能就是Bourne Shell的一个变种。
    - 如果是Bourne Shell。那么你可以把你要添加的环境变量添加到你主目录下面的.profile或者.bash_profile，如果没有文件创建一个

#### shell变量：
设置：NODE_ENV='PRODUCTION' （shell变量，不在环境变量里，printenv NODE_ENV会不存在）
打印：echo $NODE_ENV
设置并运行：NODE_ENV='PRODUCTION' gulp build
取消：unset NODE_ENV

### 环境变量
打印：env ， printenv JAVA_HOME
设置：export NODE_ENV="PRODUCTION" （把shell变量 转为 环境变量）
取消：export -n NODE_ENV （把环境变量 退为 shell变量）

### 永久设置（`.zshrc`设置）

    vi ~/.zshrc
    export VARNAME=value  添加自己要设置的变量
    source ~/.zshrc  使之修改后生效


## 高效率工具

[示例目录](https://github.com/warmhug/work-use/tree/gh-pages/_archive/linux)

[实例](http://stackoverflow.com/questions/13077241/execute-combine-multiple-linux-commands-in-one-line)
、[学习](http://www.linuxnix.com/2012/07/23-awesome-less-known-linuxunix-command-chaining-examples.html)

[SSH原理与运用](http://www.ruanyifeng.com/blog/2011/12/ssh_remote_login.html)、  
[ssh密码登陆](http://superuser.com/questions/655582/how-to-ssh-with-username-and-password-linux)、
[ssh密码登陆1](http://stackoverflow.com/questions/4780893/use-expect-in-bash-script-to-provide-password-to-ssh-command)、  
[expect-inside-a-bash-script](http://stackoverflow.com/questions/15133474/how-to-use-expect-inside-a-bash-script)




# linux学习

Unix遵循的原则是KISS（Keep it simple, stupid）。do one thing and do it well。

Linux分为内核版、发行版。比较常用的发行版有 redhat、ubuntu 等。服务器端大多使用 redhat\centos，没有图形界面，因为图形界面占用更多系统资源，造成不稳定，被攻击的可能性更大。
学linux就别装图形界面，这样虚拟机就不用吃太多内存

- Linux严格区分大小写。
- Linux所有内容以文件形式保存，包括硬件。
    - 如：键盘 /dev/stdin  显示器 /dev/stdout
- Linux不靠扩展名区分文件类型，靠权限区分。（.gz .tgz .sh等文件扩展名只是为了方便管理员查看）

挂载就是把目录和盘符连接在一起的过程。  
挂载命令：mount

.tar.gz格式是先打包为.tar格式，再压缩为.gz格式。

shell是一个命令行解释器。shell是壳，linux是内核。shell把用户敲进去的命令、翻译为linux内核能识别的语言。
linux下有些命令是shell自带的，有些命令是别人写好装进来的(如ls)，用 whereis ls 来区别。

- alias 查看系统里别名
- ctrl+c 退出某进程（不是command键）
- Ctrl+r 查找输入过的命令
- clear / cammand+k -- 清屏
- Ctrl+a 跳到行首
- Ctrl+e 跳到行尾
- Ctrl+u 删除光标位置以前的字符
- Ctrl+k 删除光标位置以后的字符

输出重定向：>  >>  &>  &>>  2>&1
正确输出和错误输出同时保存：  
命令 &> 文件    正确和错误的输出都保存到同一个文件中
命令 > 文件 2>&1    正确和错误的输出都保存到同一个文件中
命令 > 文件1 2>文件2   正确的输出放到文件1，错误的输出放到文件2
如：cat errorFile >> acc.log 2>>error.log

    > file.txt
    创建一个空文件，比touch短。

管道符：
; -- 几个命令并行执行，不管有无报错
&& -- 几个命令依次执行，报错就停止
|| -- 前一条命令报错，后一条命令才会执行，否则不执行。 如：ls && echo yes || echo no
| -- 管道符，很重要

符号：单引号、双引号、反引号、$()、$、#、\

通配符、正则表达式 是不同的东西。正则是包含匹配，通配符是完全匹配。正则匹配文件内容字符串，通配符匹配文件名。

shell变量：

    所有变量都是字符串类型
    声明：变量名=变量值 -- 等号前后不能有空格
    调用：echo $变量名

    变量叠加：
    x=123
    x="$x"456  (或 x=${x}456)
    echo $x

    如path：PATH="$PATH":/dir/sub-dir

    位置参数变量：$n $* $@ $#
    预定义变量：$? $$ $!
