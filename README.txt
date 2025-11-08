
Voting System
=============

Overview
--------
A simple Flask-based voting application. Users vote for candidates for a list of posts. Votes are stored in a JSON file on the server. A results endpoint calculates winners and an Excel export can be generated via `result.py`.

Features
--------
* Interactive voting UI (JavaScript + Flask backend)
* Dark / light theme toggle
* JSON persistence of vote counts
* Endpoint to update vote data (`POST /updatejson`)
* Endpoint to fetch current data (`GET /getjson`)
* Endpoint to fetch winners (`GET /results`)
* Script to build initial candidate list from a posts text file (`import-data.py`)
* Script to export winners to Excel (`result.py`)

Project Structure (key files)
-----------------------------
* `server.py` - Flask app and API endpoints
* `run.py` - Entry point to run the dev server
* `templates/index.html` - Voting page template
* `static/Js/main.js` - Voting logic (fetch/update JSON)
* `templates/Data/Data.json` - Persisted vote data
* `result.py` - Functions to compute winners and export to Excel
* `import-data.py` - Interactive script to seed candidate data
* `merge.py` - Merges two JSON vote files (for aggregating results)

Setup
-----
1. Create and activate a virtual environment (optional but recommended).
2. Install dependencies:
	 ```
	 pip install -r requirements.txt
	 ```
3. Seed candidate data (optional):
	 ```
	 python import-data.py
	 ```
	 Select your `Posts.txt` file when prompted and enter candidate names.
4. Run the server:
	 ```
	 python run.py
	 ```
5. Open `http://127.0.0.1:8000` in your browser to vote.

API Endpoints
-------------
* `GET /getjson` returns the full vote data array.
* `POST /updatejson` accepts the full updated vote data array and overwrites the JSON file.
* `GET /results` returns an object mapping each post to the winning candidate.

Data Format
-----------
```json
[
	{
		"post": "Owner",
		"candidates": [
			{"name": "Alice", "votes": 3},
			{"name": "Bob", "votes": 5}
		]
	}
]
```

Exporting Results
-----------------
Run:
```
python result.py
```
This creates `results.xlsx` listing each post and the winning candidate.

Merging Vote Files
------------------
If you collected votes in separate JSON files, place a second file named `final.json` beside `merge.py` containing the same structure and edit the paths if needed, then run:
```
python merge.py
```
It sums votes per candidate (matching by position and order) and rewrites `final.json` with merged totals.

Future Improvements
-------------------
* Add per-user authentication & one-vote-per-user enforcement
* Record individual ballots rather than only aggregated counts
* Input form for creating posts and candidates via the web interface
* Add unit tests (pytest) for validation and result logic
* Better error handling and logging

License
-------
Currently unspecified. Add a license file if you intend to distribute.

