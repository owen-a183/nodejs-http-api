const http = require('http');
const fs = require('fs');

//create server 
http.createServer((req, res) => {
    //filestream read data from local 'dummy.json'
    fs.readFile('dummy.json', 'utf8', (error, data) => {
        if (error) {
            res.end('<h1>No file source (json) detected<h1/><h2>Please add your json file<h2/>')
            return
        }
        // console.log(data)
        if (req.method !== 'GET') {
            console.log("this is not a post req")
        } else {
            if (req.url === '/') { //route "/"
                res.end('<h1>Hello You!<h1/><h2>Go to <a href="/foodjson">/foodjson</a> ' +
                    'or <a href="/foodtable">/foodtable</a> ' +
                    'or <a href="/0">/{index}</a><h2/>') //end response and return html
            } 
            else if (req.url === '/foodjson') {
                res.end(data) //return plain json
            }
            else if (req.url === '/foodtable') {
                dataObj = JSON.parse(data)
                // console.log(dataObj)
                // dataObj
                var table = "<table border=\"1\"><thead><td>#</td><td>Food</td><td>Description</td></thead>"; //table header
                for (let key in dataObj) { //foreach element in dataObj
                    //add a row of dataObj
                    table += `<tr><td>${parseInt(key) + 1}</td><td>${JSON.stringify(dataObj[key].foodName)}</td><td>${JSON.stringify(dataObj[key].foodDescription)}</td></tr>`;
                }
                table += "</table>"; //end table
                res.end(table)
            }
            else if (!isNaN(req.url.substring(1))) {
                var inputNum = req.url.substring(1)
                dataObj = JSON.parse(data)
                var lastObj = Object.keys(dataObj)[Object.keys(dataObj).length - 1]
                console.log(lastObj)
                console.log(inputNum)
                console.log(dataObj[inputNum])
                if (inputNum <= lastObj && inputNum >= 0) {//if index is in range
                    
                    res.end(`${JSON.stringify(dataObj[req.url.substring(1)])}`) //return plain json
                }
                else {//if index is not in range
                    res.end("Index number not valid")
                }
            }
            else //route not found
                res.end('<h1>No available data(404)</h1><h2>Please go to <a href="/foodjson">/foodjson</a> or <a href="/foodtable">/foodtable</a> or <a href="/0">/{index}</a><h2/>')
        }
    })
}).listen(8000) //on port 8000