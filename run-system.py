import os
if(os.system("node -v").len() > 12):
    print("Node.js is not installed")
    print("Please install the bundled Node.js to run this application")
    print("Press Enter to quit...")
    input()
    exit()
