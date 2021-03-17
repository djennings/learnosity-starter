var Learnosity = require('learnosity-sdk-nodejs');
var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

app.get('/', function (req, res) {
    var learnositySdk = new Learnosity();
    var request = learnositySdk.init(
        // service type
        "questions",
        // security details
        {
            "consumer_key": "yis0TYCu7U9V4o7M",
            "domain":       "localhost",
            "user_id":      "a-user-id"
        },
        // secret
        "74c5fd430cf1242a527f6223aebd42d30464be22",
        // request details - this must come from authoring?
        {
            "type":       "local_practice",
            "state":      "initial",
            "questions":  [
                {
                    "response_id":         "60005",
                    "type":                "association",
                    "stimulus":            "Match the cities to the parent nation.",
                    "stimulus_list":       ["London", "Dublin", "Paris", "Sydney"],
                    "possible_responses":  ["Australia", "France", "Ireland", "England"],
                    "validation": {
                    "score": 1,
                        "value": ["England", "Ireland", "France", "Australia"]
                    }
                }
            ]
        }
    );

    res.json(request);
});
app.listen(3010, function () {
    console.log('Example app listening on port 3010!');
});
