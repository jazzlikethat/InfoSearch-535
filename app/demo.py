#!flask/bin/python
# -*- coding: utf-8 -*-

import urllib.request
import sys

from flask import Flask, render_template, request, redirect, Response
import random, json

app = Flask(__name__)

@app.route('/')
def output():
	return render_template('/index.html', name='Joe')

@app.route('/receiver', methods = ['GET'])
def worker():
    inurl='http://localhost:8983/solr/BM/select?fl=id,lang,score,text_en,text_ru,text_de,tweet_urls&indent=on&q=Russia%27s%20intervention%20in%20Syria&rows=3440&wt=json'
    data=urllib.request.urlopen(inurl)
    docs = json.load(data)['response']['docs']
    countde=0
    counten=0
    countru=0
    for doc in docs:
        if doc['lang'] in [['en']]:
            counten=counten+1
        if doc['lang'] in [['de']]:
            countde=countde+1
        if doc['lang'] in [['ru']]:
            countru=countru+1
    arr=[countde,counten,countru]
    arr=str(counten)+','+ str(countde)+','+str(countru)
    return arr

if __name__ == '__main__':
	# run!
	app.run()

