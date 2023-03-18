import webbrowser
import os

from threading import Thread


def main():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))


if __name__ == "__main__":
    Thread(target=main).start()
    webbrowser.open_new_tab("public\\index.html")
