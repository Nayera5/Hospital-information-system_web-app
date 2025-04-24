from flask import Flask, request

app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello world ?"

@app.route('/add')
def add():
        x = request.args.get('x')
        y = request.args.get('y')
        intx=int(x)
        inty=int(y)
        print(intx+inty)
        return f'{intx+inty}'    


if __name__ == "__main__":
    app.run()
