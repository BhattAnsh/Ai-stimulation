from flask import Flask, request, jsonify, make_response
import os
import time
from werkzeug.utils import secure_filename

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE'
    return response

@app.route('/upload', methods=['POST'])
def upload_image():
    file = request.files['image']
    if file:
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        response = jsonify({'message': 'Upload complete!'})
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response, 201
    response = jsonify({'error': 'Invalid file'})
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response, 400

if __name__ == '__main__':
    app.run(debug=True)