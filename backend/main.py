
from flask import Flask, request, render_template,jsonify
import psycopg2
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

#connect with neon
con= psycopg2.connect(
    database='userinfo',
    port=5432 ,
    host='ep-spring-mouse-a4vzg8qs-pooler.us-east-1.aws.neon.tech',
    user='neondb_owner' ,
    password='npg_bN0adysl8nch')
# any home page
@app.route('/')
def hello():
    return render_template('index.html')

# login
@app.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    try:
        con = psycopg2.connect(
            database='userinfo',
            port=5432,
            host='ep-spring-mouse-a4vzg8qs-pooler.us-east-1.aws.neon.tech',
            user='neondb_owner',
            password='npg_bN0adysl8nch'
        )
        cursor = con.cursor()
        cursor.execute("SELECT * FROM users WHERE email = %s AND password = %s", (email, password))
        user = cursor.fetchone()

        if user:
            role = user[3]  # Assuming the role is in the 4th column of the 'users' table (adjust index if needed)

            if role == 'doctor':
                return jsonify({"message": "Login successful. Redirecting to doctor page."}), 200
            elif role == 'patient':
                return jsonify({"message": "Login successful. Redirecting to patient page."}), 200
            else:
                return jsonify({"message": "Invalid role."}), 403
        else:
            return jsonify({"message": "The email or password is incorrect."}), 401

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__=='__main__':
    app.run()

