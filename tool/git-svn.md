
# git

工作区(working tree)，暂存区（index）

git pull --rebase 拉远程的主分支
git rebase -i  重写历史
回滚一个 rebasing：使用 git reflog 查看 git 操作历史，然后强制 reset head。

### submodule
[详解](http://www.kafeitu.me/git/2012/03/27/git-submodule.html)

#### 初始化
git submodule add git@mygithost:billboard lib/billboard
git submodule init  
git submodule update  

#### 操作
带有submodule的某个仓库里，其中自己的分支 branch1 合并来自其他分支 branch2 的修改，
发现两个分支的 submodule 的 HEAD 引用不同：
  - 要使用 branch1（自己原本的），不进行操作
  - 要使用 branch2 分支的 submodule，运行：`git submodule update`
  - 如果这两个分支的submodule 引用可能都不是最新、最稳定的；进入submodule目录，运行`git push origin master`拉取submodule稳定版本。
然后`git add [submodule path]`，再推送上去

[submodules增删改](https://chrisjean.com/git-submodules-adding-using-removing-and-updating/)

### log
git log
git log -p -2 显示最近的两次更新

git diff [version1] [version2]  查看版本差异

### 分支
git branch    列出分支清单（分支前的 * 字符：表示当前所在的分支）  
git branch -v   查看各个分支最后一个提交对象的信息  
git branch -a/-r   查看所有分支 (git clone只会显示master分支)  

git branch xx     新建分支xx  
git checkout xx   切换到分支xx（HEAD指向此分支）  
git checkout -b xx   新建并直接切换到xx分支

git checkout -b xx origin/xx    新建xx分支，并跟踪远程xx分支
git checkout --track origin/xx   新建xx分支，并跟踪远程xx分支

git branch -d xx     删除分支xx
git push origin :xx  删除远程分支xx
git push origin xx:xx  上传我本地的xx分支到远程仓库中去，仍称它为xx分支  
git push origin xx   推送到xx分支

git merge xx  合并xx分支到某分支（例如：合并到主分支，先切到master 再git merge xx）  
git merge --no-ff xx
git merge origin/xx   远程上有xx分支，并且git fetch origin，执行此命令，将合并此分支  


### 操作tag
git tag -a 0.0.1 -m 'Release version 0.0.1'  打标签  
git tag -l                列出全部的tag清單  
git push origin --tags    推送所有标签到服务器  

git tag -d 0.0.1   删除标签  
git push origin :refs/tags/0.0.1

git checkout tag_name

### 回退恢复：
你的修改就可能存在三块区域中，working tree、index或者commit之后的历史对象区域。

#### working tree (add之前)
- use "git checkout -- <file>..." to discard changes in working directory
- git checkout .

- git clean -df  Remove untracked directories in addition to untracked files.
- git clean -f  删除untracked files（即远程仓库没有这个文件，新加的文件）

#### index内的回滚 (commit之前)
git reset
git reset HEAD <file>...  如果已经用add 命令把文件加入stage了，就先需要从stage中撤销
git reset HEAD^    回退所有内容到上一个版本
git reset HEAD^ a.py    回退a.py这个文件的版本到上一个版本  
git reset 057d    回退到某个版本  

#### commit之后的回滚
--soft 不修改本地文件
--hard 本地的文件修改都被丢弃

git reset --soft HEAD^    撤销commit，重新做
git reset --hard origin/master   将本地的状态回退到和远程的一样

    $ git branch topic/wip     (1) 新建分支wip
    $ git reset --hard HEAD~3  (2) 原分支上把最近三次提交丢弃
    $ git checkout topic/wip   (3) 切换到wip分支，继续工作


#### git reset误操作恢复：  
git reflog       生成某个串，例如98abc5a  
git reset --hard 98abc5a  


### rebase操作
> git rebase  用于把一个分支的修改合并到当前分支。

如果修改了某个公用代码的BUG，这个时候就应该是把所有的OEM版本分支rebase到这个修复BUG的分支上来

[详情](http://gitbook.liuhui998.com/4_2.html)、[1](http://my.oschina.net/MinGKai/blog/142517)


### 暂存未提交的修改
使用git stash保存当前的工作现场，那么就可以切换到其他分支进行工作，
或者在当前分支上完成其他紧急的工作，比如修订一个bug测试提交

git stash                   隐藏未提交的修改  
git stash pop               恢复上次未提交的修改  
git stash list              列出各个stash版本  
git stash apply stash@{1}   恢复到某个stash版本  


### fork & pull request
- [pull request](http://www.worldhello.net/gotgithub/04-work-with-others/010-fork-and-pull.html)

1、点击github上要fork的仓库的fork按钮，本地repo会有一份拷贝  
2、clone一份到本地：git clone git@github.com:[your_username]/xxx.git  
3、跟踪原本的仓库：  

    cd xxx
    git remote add upstream git://github.com/[ori_username]/xxx.git  
    git fetch upstream -- 获取原始代码库的更新

4、推送提交

    git push origin master

5、原本仓库更新，获取更新

    git fetch upstream
    git merge upstream/master


### 查看状态：
ls                      查看本地文件  
git status
git config                      配置个人信息  
gitk                       查看仓库的各类信息的gui  
gitk --all



生成ssh key: ssh-keygen -t rsa -C "your_email@youremail.com"

### 配置：
git config --global alias.st status
git config --global color.ui true

#### .gitconfig 文件内容示例

    [user]
      name = hualei.hl
      email = hualei.hl@xxx.com
    [alias]
      st = status
      ci = commit
      br = branch
      co = checkout
      df = diff
    [push]
      default = simple


### 存取操作：
touch xx                                 创建文件  
git init                                 初始化

git remote add origin git@xxx.git        加入服务器
git pull origin master                  接收github仓库数据  

git push -u origin master                第一次推送  
git push

git pull
git fetch origin    同步远程服务器上的数据到本地  
git fetch xx        获取服务器上的xx分支


### 提交上传：
**git add .**               加入新文件  
**git add -A**              加入new delete modify过的文件  
git commit -m "xxx"     提交  
git commit -a           将modify过的文件提交，自动打开编辑器  
git commit -a -m "xxx"  将modify过的文件提交并注释，不必再用git add  


## 其他问题

由于Mac下文件名大小写不敏感，造成git下如果改了名字，譬如小写改大些，推送到linux服务器的时候会没有效果，Github上的也是小写。 所以，如果在mac上改文件名，需要用下面的命令

    $ git mv --force myfile MyFile

加入ignore的文件或目录已存在，先清空cache： git rm -r --cached node_modules



# svn 常用操作

----------

> `svn checkout xxx`切换分支后、但目录里有上个分支的空文件夹？因为里边有`.DS_Store`文件未被删除，需要将其删除。

* svn checkout/co path（path是服务器上的目录）

* svn status/st path（目录下的文件和子目录的状态，正常状态不显示）
    - "!"：本地执行了删除，但是未执行“svn del”的状态。
    - "?"：本地新加了一个文件，但是未执行“svn add”的状态。
    - "A"：本地新加了一个文件，且执行了“svn add”的状态。
    - "X"：执行了“svn external”的状态。
    - "D"：本地执行了删除，且执行了“svn del”的状态。
    - "M"：本地修改了该文件时的状态。
    - "K"：被锁定
    - "C"表示：冲突状态，是重点关注状态之一。产生的场景：A\B 两个开发修改同一
处代码，其中 A 开发已经提交，B 开发在 svn up 的时候，就会出现 conflict 的提
示，需要在解决冲突后，再 svn resolved 下

* svn log/info path
* svn log main.cpp --limit 4   只显示最近4条log信息

* svn list/ls path 显示path目录下的所有属于版本库的文件和目录
* svn blame file --force
* svn diff [文件]：查看你修改了哪些代码（相对于服务器上分支的最新版本）

* svn add *
* svn add file/*/*.php(添加当前目录下所有的php文件)

* svn update/up 如果后面没有目录，默认将当前目录以及子目录下的所有文件都更新到最新版
* svn delete svn://192.168.1.1/pro/domain/test.php -m “delete test file”
* svn del xxx     删除文件：

* svn commit/ci -m “xxx” file   无file时提交当前目录所有文件

svn merge：合并分支，将老的修改合并到最新拉出的分支。
    - svn log –-stop-on-copy
http://svn.alibaba-inc.com/repos/ali_cn/olps/trading/branches/2010090
7_3591_8
    - svn merge --dry-run -r257834:HEAD
http://svn.alibaba-inc.com/repos/ali_cn/olps/trading/branches/2010082
3_lihongxiao_test


## 代码回滚
### 代码没有被提交（没commit）
* svn revert file   回退某文件
* svn revert -R dir  回退某个目录及其子目录（Recursive,递归）

### 改动已经被提交（commit）
1. svn up -- 拿到最新版本号
2. svn log [something] -- 找到要回滚的版本号
3. svn merge -r 新修订版序号:旧修订版序号 your_file_path  -- 回滚到旧版本代码
4. svn commit -m “恢复到某修订版（某修订版作废）”  -- 提交代码


## 解决冲突（合并别人的修改）

    操作：
    1. svn up/update
    2. 修改文件，解决冲突
    3. svn resolved file

    示例：
    $ svn update
    C  sandwich.txt   //冲突文件
    Updated to revision 2.

    $ ls sandwich.*
    sandwich.txt  sandwich.txt.mine  sandwich.txt.r2  sandwich.txt.r1

    只是希望取消你的修改，你可以仅仅拷贝Subversion为你生成的文件替换你的工作拷贝
    $ cp sandwich.txt.r2 sandwich.txt
    $ svn resolved sandwich.txt

    你决定取消自己的修改并且重新编辑，你可以恢复你的修改
    $ svn revert sandwich.txt
    Reverted 'sandwich.txt'
    $ ls sandwich.*
    sandwich.txt
    当你恢复一个冲突的文件时，不需要再运行svn resolved



[svn忽略文件/文件夹](http://huanyue.iteye.com/blog/750108)
