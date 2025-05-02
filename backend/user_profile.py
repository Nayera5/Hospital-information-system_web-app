from flask import Flask, request, render_template, jsonify, Blueprint, current_app
from werkzeug.utils import secure_filename
import os
from db import db_connection

prof = Blueprint('user_profile', __name__)

con = db_connection()

@prof.route('/edit/<int:user_id>', methods=['PUT'])
def edit_profile(user_id):
    email = request.form.get("email")
    new_password = request.form.get('new_password')
    old_password = request.form.get('old_password')
    name = request.form.get('name')
    pic = request.files.get('pic')
    phone = request.form.get('phone')
    age = request.form.get('age')

    cursor = con.cursor()

    if pic:
        filename = secure_filename(pic.filename)
        filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], filename).replace("\\", "/")
        pic.save(filepath)
    else:
        cursor.execute("SELECT pic FROM users WHERE id=%s", (user_id,))
        existing_pic = cursor.fetchone()
        if existing_pic:
            filename = existing_pic[0]
        else:
            filename = ''  

    cursor.execute("SELECT password, role FROM users WHERE id=%s", (user_id,))
    res = cursor.fetchone()

    if not res:
        return jsonify({"message": "User not found"}), 404

    old_pass, role = res

    if old_pass != old_password:
        return jsonify({"message": "Old password is incorrect!"}), 401

    cursor.execute("UPDATE users SET email=%s, password=%s, name=%s, phone=%s, pic=%s, age=%s WHERE id=%s",
                   (email, new_password, name, phone, filename, age, user_id))

    if role == 'doctor':
        cursor.execute("UPDATE doctors SET name=%s, doc_phone=%s, dage=%s WHERE do_id=%s",
                       (name, phone, age, user_id))
    elif role == 'patient':
        cursor.execute("UPDATE patients SET name=%s, phone=%s, age=%s WHERE pid=%s",
                       (name, phone, age, user_id))

    con.commit()
    return jsonify({
        "message": "User Updated successfully",
        "email": email,
        "password": new_password,
        "name": name,
        "phone": phone,
        "age": age,
        "pic": f"http://localhost:5000/uploads/{filename}" 
    })


@prof.route('/get_profile/<int:user_id>', methods=['GET'])
def get_profile(user_id):
    if not user_id:
        return jsonify({"error": "Missing user_id"}), 400

    try:
        cursor = con.cursor()
        cursor.execute("SELECT role FROM users WHERE id = %s", (user_id,))
        user_role = cursor.fetchone()

        if not user_role:
            return jsonify({"message": "User not found"}), 404

        if user_role[0] == 'patient':
            cursor.execute("""
                SELECT 
                    users.id, users.email, users.password, users.role, users.pic,
                    patients.name, patients.age, patients.gender, patients.phone, patients.blood_type
                FROM users
                JOIN patients ON users.id = patients.pid
                WHERE patients.pid = %s
            """, (user_id,))
            user = cursor.fetchone()

            if user:
                pic_name = os.path.basename(user[4]) 
                profile = {
                    "id": user[0],
                    "email": user[1],
                    "password": user[2],
                    "role": user[3],
                    "pic": f"http://127.0.0.1:5000/uploads/{pic_name}" ,
                    "name": user[5],
                    "age": user[6],
                    "gender": user[7],
                    "phone": user[8],
                    "blood_type": user[9]
                }
                return jsonify(profile), 200
            else:
                return jsonify({"message": "Patient data not found"}), 404

        elif user_role[0] == 'doctor':
            cursor.execute("""
                SELECT 
                    users.id, users.email, users.password, users.role, users.pic,
                    doctors.name, doctors.specialty, doctors.gender, doctors.doc_phone, doctors.dage
                FROM users
                JOIN doctors ON users.id = doctors.do_id
                WHERE doctors.do_id = %s
            """, (user_id,))
            user = cursor.fetchone()

            if user:
                pic_name = os.path.basename(user[4]) 
                doctor_profile = {
                    "id": user[0],
                    "email": user[1],
                    "password": user[2],
                    "role": user[3],
                    "pic": f"http://127.0.0.1:5000/uploads/{pic_name}" ,
                    "name": user[5],
                    "specialty": user[6],
                    "gender": user[7],
                    "phone": user[8],
                    "age": user[9]
                }
                return jsonify(doctor_profile), 200
            else:
                return jsonify({"message": "Doctor data not found"}), 404

        else:
            return jsonify({"message": "Invalid user role"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500
