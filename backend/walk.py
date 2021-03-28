from os import walk
import os
import re
mypath="/home/yifei/Documents/capstone-data/dnn_data-20210327T191050Z-001"
l=[]
for (dirpath, dirnames, filenames) in walk(mypath):
    for file in filenames:
        l.append((dirpath,file))



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
    #print(data_type, neural_net,city,building_type, full_path)
    print(building_type)