import csv
from collections import defaultdict
import json
from os import walk
import os
import re

dict_to_jsonify={}
def get_dictionary(city,city_dict,building_type):
    arr=[]
    for entry in city_dict:
        arr.append({"City":city,"Year":entry,"Type":building_type,"Values":city_dict[entry]})

    return arr

def get_year_dict(city):
    with open(city) as calgary_actual:
        reader=csv.reader(calgary_actual, delimiter=',',quotechar='|')
        year_dict=defaultdict(list)
        
        for j,row in enumerate(reader):
            if j==0:
                years=row[1:]
            else:
                for i in range(len(row)-1):
                    year_dict[years[i]].append(row[i+1])
    
    return year_dict


mypath="/home/yifei/Documents/capstone-data/dnn_data-20210327T191050Z-001"
l=[]
act,err,pred=[],[],[]

for (dirpath, dirnames, filenames) in walk(mypath):
    for file in filenames:
        l.append((dirpath,file))
p=0
e=0
a=0
for path, s in l:
    full_path=path+'/'+s
    s=s.split("_")
    data_type=s[0]
    neural_net=s[2]
    city=s[3].split(", ")[0]
    building_type=s[4].split(".")[0]

    if city=="St. John":
        city="St. John's"
        building_type=s[5].split(".")[0]
    if city=="Montréal":
        city="Montreal"
    building_type=re.sub(r'[^a-zA-Z -]',"",building_type).split(" ")[0]
    database_entry=get_year_dict(full_path)
   
    if data_type=="prediction":
        p+=1
        #print("pred",len(database_entry))
        pred.extend(get_dictionary(city,database_entry,building_type))
    elif data_type=="error":
        e+=1
        #print("err",len(database_entry))

        err.extend(get_dictionary(city,database_entry,building_type))
    elif data_type=="actual":
        a+=1
       # print("act",len(database_entry))

        act.extend(get_dictionary(city,database_entry,building_type))

print("act",len(act),a,"err",len(err),e,"pred",len(pred),p)
with open('pred.json', 'w') as fp:
    json.dump(pred, fp)

with open('act.json', 'w') as fp:
    json.dump(act, fp)

with open('err.json', 'w') as fp:
    json.dump(err, fp)

'''
mongoimport --host   cluster0-shard-00-01.dxkn1.mongodb.net:27017  --db pred --type json \
--file err.json --jsonArray --authenticationDatabase admin --ssl --username admin --password ece297
'''