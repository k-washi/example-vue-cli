var mocky = require('mocky');

const basePath = '/api/ex-golang'

mocky.createServer([{
    //GET health
    url: basePath + '/health',
    method: 'get',
    headers: {},
    res: {
        status: 200,
        headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': 'http://localhost:8080'},
        body: JSON.stringify({"health": 200})
    },
},
{//GET rest-api
    url: basePath + '/rest-api',
    method: 'get',
    headers: {},
    res: (req, res, callback) => {
        setTimeout(() => {
            callback(null, {
                status: 200,
                headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': 'http://localhost:8080'},
                body: JSON.stringify({"name": "name", "description": "test", "datas": [ {"id": 1, "name": "test1" }, {"id": 2, "name": "test2" }]})
            });
        }, 1000);
    },
},
{//POST rest-api
    url: basePath + '/rest-api',
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    res: (req, res, callback) => {
        setTimeout(() => {
            callback(null, {
                status: 200,
                headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': 'http://localhost:8080'},
                body: JSON.stringify({"name": "name", "message": "create info and store database"})
            });
        }, 1000);
    },
},
]).listen(80)