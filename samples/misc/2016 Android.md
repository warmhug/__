# Android

> 2016-06

> 使用了 Android 最新支持的 ConstraintLayout 布局。  
>
> 注意点: app/build.gradle 里的`targetSdkVersion`要和预览的手机设备 skdVersion 一样。

官方文档：https://developer.android.com/training/index.html

优化

- [优化布局性能](https://developer.android.com/training/improving-layouts/optimizing-layout.html#Inspect)
- [滚动怎么更顺滑](https://developer.android.com/training/improving-layouts/smooth-scrolling.html)

Android 反编译 apk 工具：apktool / dex2jar / jd-gui / <http://www.javadecompilers.com/> (在线工具)

- [Android 开发知识图谱](https://blog.csdn.net/xyz_lmn/article/details/41411355)
- [广泛使用的开源二维码扫描代码 zxing](https://github.com/zxing/zxing)

android 使用颜色格式包含[`ARGB`](https://developer.android.com/guide/topics/resources/more-resources.html#Color)，这在[IE 6-8](https://beijingyoung.com/articles/rgba-argb-converter/)里也支持，[转换方式](https://css-tricks.com/8-digit-hex-codes/)。
chrome62 will support [`#RGBA`/`#RRGGBBAA`](https://www.chromestatus.com/feature/5685348285808640) 8-digit hex color.

[android 应用架构](http://www.jianshu.com/p/3edcf85539a6)

Android NDK向前但不向后兼容，利用NDK针对android-17生成的so文件可以在android-22上运行，反之却不行。
这点与Android SDK的兼容性不一样，在SDK14上编译的应用，在API23上也是可以运行的；
在SDk23上的编译的应用，只要minSdkVersion小于14，同样在API14上可以运行。

浏览器内核区别：手机系统官方浏览器、Chrome、UC、QQ、android控件里的webview、自己开发的APP里引用的 Webview，内核都不一样。

#### Android emulator

~~如果未设置环境变量, 到 <ANDROID_SDK_root>/tools 目录, 双击 android, 如果设置了环境变量, 命令行运行`android`会打开
"Android SDK Manager"。~~ （新的 android 模拟器只能通过 Android Studio 打开）再在菜单中选择 Tools -> Manage AVDs (或命令行运行`android avd`), 打开 "Android Virtual Device (AVD) Manager" 会看到虚拟机列表，如果为空, 点击按钮 "Create..." 创建虚拟机。

```sh
adb shell input text 'text'  # 向 avd 里粘贴文字，只有一个虚拟机开着

adb devices
adb -s emulator-5554 shell input text 'my%stext'
# 如果有空格、特殊字符等, 会报错: Error: Invalid arguments for command: text usage: input ...
# 对这些字符 ( ) < > | ; & * \ ~ " ' 加上反斜杠 \ 转义, 空格用 %s 转义
```


### Java / Android 环境安装

首先安装 [JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
(oracle官网从 jdk1.7 开始才有 Mac 版的安装包，单独的[jdk6 地址](https://support.apple.com/kb/DL1572?locale=zh_CN))

> 安装 JDK 后，如何确认 mac java 安装路径，并设置`JAVA_HOME`环境变量：<http://chessman-126-com.iteye.com/blog/2162466>
> 根据苹果的官方说明，Mac OS X 10.5 及以后的版本应该使用 /usr/libexec/java_home 命令来确定 JAVA_HOME

安装 [Android Studio 和 Android SDK](https://developer.android.com/studio/index.html)
(安装好 studio 后会提示安装 sdk， Google 已不直接让单独安装 sdk 了！！)

Android NDK 下载：<https://developer.android.com/ndk/downloads/index.html>

添加环境变量：`export ANDROID_HOME=/../android-sdk` 至 `~/.bashrc` 或 `~/.zshrc` 。

[解决](http://blog.kuoruan.com/24.html) Android SDK Manager 下载慢无法更新：

- 方法一：打开地址：<http://ping.chinaz.com/> 分别测试 dl.google.com 和 dl-ssl.google.com 的IP地址，将获取到的IP写入hosts文件。
- 方法二：使用国内镜像源`mirrors.neusoft.edu.cn`/`ubuntu.buct.edu.cn`/`mirrors.dormforce.net`
- 方法三: 直接从仓库网站下载再导入,如 [Android SDK | “Android 6.0”](https://afterroot.wordpress.com/2016/01/01/android-sdk-android-6-0-package-direct-links/)。如何导入呢?

    稍微注意能发现: Android AVD Manager 里的每一个安装项目都和 <ANDROID_SDK_root> 目录下的子目录名相对应。
    比如下载了 sysimg_arm-23_r03.zip 文件, 应该将此文件解压到 <ANDROID_SDK_root>/system-images/android-23 目录下,
    再重启 Android AVD Manager 会看到 "Android 6.0 (API 23) 节点下的 "ARM EABI v7a System Image | API 23, rev 3"
    的 status 从 "Not installed" 变为 "Installed" , 导入成功。(注意有些目录比较大、很占空间)

#### Maven

[Unable to import Maven project into IntelliJ IDEA](http://stackoverflow.com/questions/12701347/unable-to-import-maven-project-into-intellij-idea)

maven依赖找不到

- 先在用户目录（~/.m2）下的 settings.xml 里，添加内网mvn仓库源。
- 若不行，再把maven安装目录（xx/apache-maven-3.3.3/conf）下的 settings.xml 替换为与用户目录下 settings.xml 一致。
- 若还不行，删掉用户目录（~/.m2/repository）下已下载的所有依赖，在项目目录下`mvn install -DskipTests`重新安装。

#### Eclipse

遇到问题，先在项目目录`mvn clean`，再点击eclipse菜单里project菜单项下的`clean...`。
eclipse 配置 jre：preferences --> Java --> Installed JREs --> search .

导入Java工程：

1. 在项目目录下运行：`mvn eclipse:eclipse` 将maven项目转化为eclipse项目（生成两个eclipse导入所需的配置文件）
2. 再eclipse导入
3. 修改代码后执行`mvn compile`或`mvn test`检验

eclipse 不能读取到环境变量`System.out.print(System.getenv("JAVA_HOME"))`返回null，需要从 terminal 中打开
`open /Applications/eclipse/Eclipse.app`。[更多](http://stackoverflow.com/questions/603785/environment-variables-in-mac-os-x?lq=1)

#### mysql 启动错误

启动 `系统偏好设置 -> MySQL` 时，提示`is not owned by the mysql or _mysql user`。
解决：`sudo chown -R  _mysql:wheel  /usr/local/mysql/data`
