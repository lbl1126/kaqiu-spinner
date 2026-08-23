import os
import sys
import webview

MIN_W, MIN_H = 1100, 760


def app_dir():
    if getattr(sys, "frozen", False):
        return sys._MEIPASS
    return os.path.dirname(os.path.abspath(__file__))


if __name__ == "__main__":
    index = os.path.join(app_dir(), "index.html")
    window = webview.create_window(
        "卡丘大转盘",
        index,
        width=1400,
        height=900,
        min_size=(MIN_W, MIN_H),
    )

    def on_resized(width, height):
        if width < MIN_W or height < MIN_H:
            window.resize(max(width, MIN_W), max(height, MIN_H))

    window.events.resized += on_resized
    webview.start(gui="edgechromium")
