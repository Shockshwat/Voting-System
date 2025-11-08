"""Entry point to launch the Flask development server.

This avoids spawning a subshell (was using os.system) and works cross-platform.
Usage (PowerShell):
        python run.py
"""

from server import app


def main():
    app.run(host="127.0.0.1", port=8000, debug=True)


if __name__ == "__main__":
    main()
