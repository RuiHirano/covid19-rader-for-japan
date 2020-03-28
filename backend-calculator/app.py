from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False  # JSONでの日本語文字化け対策

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})


@app.route('/', methods=['GET'])
def post_json():
    json = request.get_json()  # POSTされたJSONを取得
    print(json)
    return jsonify(json)  # JSONをレスポンス

@app.route('/', methods=['POST'])
def post_calc():
    json = request.get_json()
    print("request is", json)
    return jsonify(json)  # JSONをレスポンス


def process_area(json_data):
    area_data = {}
    data = json_data
    for d in data:
        area = d['area']
        if area in area_data.keys():
            area_data[area] += 1
        else:
            area_data[area] = 1
    return area_data


if __name__ == '__main__':
    app.debug = True   # デバッグモード有効化
    app.run(port='8888')   # どこからでもアクセス可能に


    # test
    # curl -X GET -H "Content-Type: application/json" -d '{"name":"ruihirano"}' http://localhost:8888/
    # curl -X POST -H "Content-Type: application/json" -d '{"name":"ruihirano"}' http://localhost:8888/