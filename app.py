from flask import Flask, render_template
import os

app = Flask("Overhaul")

@app.route('/', methods=['GET'])
def main():
    return render_template('game.html')

if __name__ == "__main__":
    app.config['SECRET_KEY'] = os.urandom(12)
    app.run(debug=True)