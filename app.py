from string import hexdigits
from flask import Flask, request, render_template, jsonify, session
from boggle import Boggle

app = Flask(__name__)
app.config['SECRET_KEY'] = "nmksndflsd00039394"

boggle_game = Boggle()


@app.route('/')
def home_page():
    board = boggle_game.make_board()
    session["board"] = board

    return render_template("game.html", board=board)


@app.route("/check-answers")
def check_answer():
    word = request.args["word"]
    board = session["board"]
    results = boggle_game.check_valid_word(board, word)

    return jsonify({'results': results})


@app.route("/results", methods=["POST"])
def store_results():
    score = request.json["score"]
    play_count = request.json["playCount"]
    session["highestScore"] = 0

    if score > session["highestScore"]:
        session["highestScore"] = score

    high_score = session["highestScore"]

    return jsonify(score=score, play_count=play_count, high_score=high_score)
