from flask import Flask, request, render_template,jsonify,Blueprint,current_app
from werkzeug.utils import secure_filename
import os
from db import db_connection

sign=Blueprint('sign',__name__)

con=db_connection()


@sign.route('/reg', methods=['POST'])
def register():
    print(request.form)
    print(request.files)

    email = request.form.get('email')
    password = request.form.get('password')
    role=request.form.get('role')
    name=request.form.get('name')
    pic=request.files.get('pic')
    gender=request.form.get('gender')
    age = request.form.get('age')
    phone=request.form.get('phone')


    #save the picture if there
    if pic:
        filename = secure_filename(pic.filename)
        filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], filename).replace("\\", "/")
        pic.save(filepath)
    else:
        return jsonify({"message": "Enter a picture please"}),409


    cursor = con.cursor()

    # does user exist??
    cursor.execute("select * from users where email=%s", (email,))
    result=cursor.fetchone()

    if result:
        return jsonify({"message": "User Already exists"}),409
        
    else:
        cursor.execute("INSERT INTO users (email, password, role,name,pic,gender,age,phone) VALUES (%s, %s, %s,%s, %s,%s, %s,%s) returning id", (email, password, role,name,filepath,gender,age,phone))
        user_id = cursor.fetchone()[0]
            
        if role == 'patient':
                blood_type = request.form.get('blood_type')
                cursor.execute("INSERT INTO patients (pid,name,age,gender,blood_type,phone) VALUES (%s,%s, %s,%s,%s, %s)", (user_id,name,age,gender,blood_type,phone))
        elif role == 'doctor':
                specialty = request.form.get('specialty')
                cursor.execute("INSERT INTO doctors (do_id,name,specialty,gender,doc_phone,dage) VALUES (%s,%s,%s,%s,%s,%s)", (user_id,name,specialty,gender,phone,age))

        con.commit()
        return jsonify({"message": "User registered successfully", "name": name, "user_id": user_id})






@sign.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    try:
        cursor = con.cursor()
        cursor.execute("SELECT id , role FROM users WHERE email = %s AND password = %s", (email, password))
        user = cursor.fetchone()

        if user:
            id,role = user
              # the role is in the 4th column of the 'users' table

            if role == 'doctor':
                return jsonify({"message": "Login successful. Redirecting to doctor page."
                                ,"user_id": id
                                ,"role":role}), 200
            elif role == 'patient':
                return jsonify({"message": "Login successful. Redirecting to patient page."
                                ,"user_id": id
                                ,"role":role}), 200
            else:
                return jsonify({"message": "Invalid role."}), 403
        else:
            return jsonify({"message": "The email or password is incorrect."}), 401

    except Exception as e:
        return jsonify({"error": str(e)}), 500
