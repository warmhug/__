
## python

- [Python Data Science Handbook](https://jakevdp.github.io/PythonDataScienceHandbook/)
- [那些让人惊艳的Python库](https://mp.weixin.qq.com/s?__biz=MzI1NTAyMjgwNA==&mid=2457510474&idx=1&sn=6ddcb7b2e519a595c3bf3ba1a05f8fa8)

mac 需要安装 xcode (会附带 gcc) ，虽然自带了 Python ，但还是使用 Homebrew 安装 Python 为好。
Homebrew 会自动安装好 Setuptools 和 pip ，Setuptools提供 easy_install 命令，实现通过网络（通常Internet）下载和安装第三方Python包。

[macOS Sierra 安装 opencv 最简单方法](http://www.pyimagesearch.com/2016/12/19/install-opencv-3-on-macos-with-homebrew-the-easy-way/)

```sh
python -m http.server [port]  # Python 3 起服务器
python -m SimpleHTTPServer 3435  # python2 起服务器

brew install python python3  # 一起安装 2.7.x 和 3.x

# 检测是否生效。 https://docs.brew.sh/Homebrew-and-Python.html
which python  # right: /usr/local/bin/python  not: /usr/bin/python
which python2  # right: /usr/local/bin/python  not: /usr/bin/python
which python3 # right: /usr/local/bin/python3 not: /usr/bin/python3
python -V   # system Python interpreter
python2 -V  # Homebrew installed Python 2 interpreter
python3 -V  # Homebrew installed Python 3 interpreter (if installed)

# 使用 homebrew 安装的 python2 覆盖 “系统默认的” python2
# https://stackoverflow.com/questions/45622838/homebrew-python-2-7-vs-os-x-python-2-7
export PATH="$(brew --prefix python)/libexec/bin:$PATH"

# outdated: create some symbolic links
# brew linkapps python / python3

# sudo easy_install pip  # brew install python 时默认已经安装了？
sudo pip install virtualenv virtualenvwrapper  # 虚拟环境工具
```
