import csv
from collections import defaultdict
import json
dict_to_jsonify={}
def get_year_dict(city):
    with open(city) as calgary_actual:
        reader=csv.reader(calgary_actual, delimiter=',',quotechar='|')
        year_dict=defaultdict(list)
        
        for j,row in enumerate(reader):
            if j==0:
                years=row
            else:
                for i in range(len(row)):
                    year_dict[years[i]].append(row[i])
    
    return year_dict

cal_actual=get_year_dict('actual_data_calgary.csv')
tor_actual=get_year_dict('actual_data_toronto.csv')
tor_pred=get_year_dict('prediction_data_toronto_destree.csv')
cal_pred=get_year_dict('prediction_data_calgary_destree.csv')
tor_err=get_year_dict('error_data_toronto_destree.csv')
cal_err=get_year_dict('error_data_calgary_destree.csv')

def get_dictionary(city,city_dict):
    arr=[]
    for entry in city_dict:
        arr.append({"City":city,"Year":entry,"Type":"Non-residential","Values":city_dict[entry]})

    return arr

pred=get_dictionary("Calgary",cal_pred)+get_dictionary("Toronto",tor_pred)
act=get_dictionary("Calgary",cal_actual)+get_dictionary("Toronto",tor_actual)
err=get_dictionary("Calgary",cal_err)+get_dictionary("Toronto",tor_err)

with open('pred.json', 'w') as fp:
    json.dump(pred, fp)

with open('act.json', 'w') as fp:
    json.dump(act, fp)

with open('err.json', 'w') as fp:
    json.dump(err, fp)

'''
mongoimport --host   cluster0-shard-00-02.dxkn1.mongodb.net:27017  --db pred --type json \
--file pred.json --jsonArray --authenticationDatabase admin --ssl --username admin --password ece297
'''