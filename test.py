from unittest import TestCase
from app import app, check_answer
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):

    # TODO -- write tests for every view function / feature!
    def test_read_dict(self):
        boggle = Boggle()
        self.assertIsInstance(boggle.words, list)

    def test_make_board(self):
        boggle = Boggle()
        board = boggle.make_board()
        self.assertIsInstance(board, list)

    def test_home_page(self):
        with app.test_client() as client:
            response = client.get("/")

            self.assertIn('board', session)
            self.assertEqual(response.status_code, 200)

    def test_results(self):
        with app.test_client() as client:
            response = client.post(
                "/results", json={"score": 0, "playCount": 1, "high_score": 0})

            self.assertEqual(
                response.json, {"score": 0, "play_count": 1, "high_score": 0})
