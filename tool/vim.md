

vim是vi的增强版本。相比vi添加了显示颜色等功能。

### 编辑模式
    
    输入 i 再输入其他字符。 按 esc 退出，切回命令模式
    
### 命令模式

    按：h j k space键 导航方向
    ctrl-f  上翻一页
    ctrl-b  下翻一页    
    ^     跳至行首
    $     跳至行尾
    gg    跳至文件的第一行 
    G     到文件的最后一行

    tail -n10 path/filename 查看文件最后10行

    :w   保存
    :wq  :x  shift zz 保存修改并退出
    :q!  强制退出，放弃修改

    u     撤销  
    ctrl+r   重做（撤销一个撤销）
    .     重复上一个编辑命令
    >>     将当前行右移一个单位
    <<     将当前行左移一个单位(一个tab符)
    ==     自动缩进当前行    


    查找 替换
    /pattern     向后搜索字符串pattern  n继续搜索下一个  shift+n
    ?pattern     向前搜索字符串pattern  #继续搜索上一个
    :s/vivian/sky/ 替换当前行第一个 vivian 为 sky
    :s/vivian/sky/g 替换当前行所有 vivian 为 sky
    :%s/source_pattern/target_pattern/g  全局替换

    :s#vivian/#sky/# 替换当前行第一个 vivian/ 为 sky/ (使用 # 作为分隔符，此时中间出现的 / 不会作为分隔符) 

    复制 粘贴（如果粘贴外部内容，在i模式下，直接cmd+v）
    dd 删除光标所在行， dw 删除一个字(word) ，D 删除到行末
    x 删除当前字符，  X 删除前一个字符
    yy 复制一行，此命令前可跟数字，标识复制多行，如6yy，表示从当前行开始复制6行
    yw 复制一个字 ， y$ 复制到行末
    p 粘贴内容到当前行的下面 ，P 粘贴内容到当前行的上面

### visual模式

    按 v 进入可视模式；移动光标键选定内容！w选择单词，y复制(或gy)，p粘贴，x删除，d删除后边


[vi编辑器使用color-scheme](http://alvinalexander.com/linux/vi-vim-editor-color-scheme-colorscheme)

    cd /usr/share/vim/vim72/colors
    ls -- 找出需要的color名字
    然后 in a vi editor session 输入 :colo delek

    