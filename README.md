# 卡丘大转盘

卡拉彼丘（Strinova）爆破模式攻防配装随机转盘。本地打开 `index.html`，或用 `launcher.py` 打成 Windows exe。

数据版本见 `data.js`。如何加新角色 / 新武器并重打包，见 [后续更新说明.md](后续更新说明.md)。

## 本地预览

用浏览器打开 `index.html`（建议用本地文件或任意静态服务器）。

## 打包 exe

需要 Windows、Python 3.11、pywebview、PyInstaller。不要给 `webview.create_window` 传 `icon=`（当前版本不支持）。图标用 Pillow 把 `icon1.jpg` 转成 `icon.ico` 后再：

```bat
pyinstaller --noconfirm --clean --onefile --windowed --name KaqiuSpinner --icon icon.ico --add-data "index.html;." --add-data "app.js;." --add-data "data.js;." --add-data "style.css;." --add-data "icon.jpg;." --add-data "assets;assets" launcher.py
```

## 规则摘要

- 进攻：剪刀手 + 乌尔比诺；防守：欧泊 + 乌尔比诺
- 觉醒 2 / 3 互斥；两边道具不重复；主武器随角色
- 晶源体不进池
