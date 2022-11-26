def main():
    try:
        import json
        import os
        import sys
        import progressbar
        import time
        from tkinter.filedialog import askopenfile

        os.chdir(os.path.dirname(os.path.abspath(__file__)))

        class Candidate:
            def __init__(self, name):

                self.name = str(name)
                self.votes = 0

        class Post:
            def __init__(self, post):
                post = str(post).replace("\n", "").strip()
                Candidate1 = Candidate(
                    input(f"Enter the name of first candidate for the post {post}: ")
                )

                Candidate2 = Candidate(
                    input(f"Enter the name of second candidate for the post {post}: ")
                )
                self.post = post

                self.candidates = [
                    Candidate1.name.strip(),
                    Candidate2.name.strip(),
                ]

            def get_details(self):

                return json.loads('{"%s":"%s"}' % (self.post, self.candidates))

        with askopenfile(mode="r", filetypes=[("Text Files", "*.txt")]) as f:
            with open("public\Js\Data.json", "w+") as f1:
                list_obj = {}
                for i in f.readlines():
                    i = Post(f"{i}")
                    list_obj.update(i.get_details())
                json.dump(list_obj, f1)
        print("Data imported successfully, Exporting in JSON format")

        for i in progressbar.progressbar(range(100)):
            time.sleep(0.02)
        print("Data exported successfully in Data.json\nPress Enter to Quit...")
        input()

    except Exception as e:
        print(e)
        time.sleep(4)
        sys.exit()


if __name__ == "__main__":
    main()
