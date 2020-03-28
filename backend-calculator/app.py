from flask import Flask, request, jsonify
from flask_cors import CORS
from typing import NamedTuple, List

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

    # calculation
    stats_calc = StatsCalculator()
    shaped_data = stats_calc.create_data(json)

    print("request is", shaped_data)

    return jsonify(shaped_data)  # JSONをレスポンス


class Patient(NamedTuple):
    id: int


class StatsCalculator():
    def __init__(self):
        self.shaped_data = {}

    def create_data(self, jsondata: object):
        shaped_data = {}
        shaped_data["raw_data"] = jsondata
        
        # by pref
        shaped_data["patients_by_pref"] = self.calc_patients_by_pref(jsondata)

        return shaped_data

    def calc_patients_by_pref(self, jsondata: List[object]):
        mock_result = [
            { "date": '3/1', '北海道': 12, '東京都': 3, '愛知県': 6 },
            { "date": '3/2', '北海道': 15, '東京都': 3, '愛知県': 11 },
            { "date": '3/3', '北海道': 4, '東京都': 4, '愛知県': 14 },
            { "date": '3/4', '北海道': 6, '東京都': 6, '愛知県': 2 },
            { "date": '3/5', '北海道': 8, '東京都': 3, '愛知県': 5 },
            { "date": '3/6', '北海道': 3, '東京都': 5, '愛知県': 13 },
            { "date": '3/7', '北海道': 14, '東京都': 5, '愛知県': 10 },
            { "date": '3/8', '北海道': 24, '東京都': 7, '愛知県': 9 },
            { "date": '3/9', '北海道': 32, '東京都': 8, '愛知県': 3 },
            { "date": '3/10', '北海道': 12, '東京都': 2, '愛知県': 6 },
            { "date": '3/11', '北海道': 15, '東京都': 4, '愛知県': 8 },
            { "date": '3/12', '北海道': 14, '東京都': 6, '愛知県': 16 },
            { "date": '3/13', '北海道': 12, '東京都': 8, '愛知県': 2 },
        ]
        return mock_result
        
    



if __name__ == '__main__':
    app.debug = True   # デバッグモード有効化
    app.run(port='8888')   # どこからでもアクセス可能に


    # test
    # curl -X GET -H "Content-Type: application/json" -d '{"name":"ruihirano"}' http://localhost:8888/
    # curl -X POST -H "Content-Type: application/json" -d '{"name":"ruihirano"}' http://localhost:8888/