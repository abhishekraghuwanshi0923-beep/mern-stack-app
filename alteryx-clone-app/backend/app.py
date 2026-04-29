from flask import Flask, request, jsonify
from etl_logic import process_data

app = Flask(__name__)

@app.route('/', methods=['GET'])
def health():
    return jsonify({"status": "Backend is running"}), 200

@app.route('/api/process', methods=['POST'])
def process_pipeline():
    data = request.json
    try:
        result = process_data(data)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)