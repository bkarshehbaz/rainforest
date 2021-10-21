const express = require("express");
const bodyParser = require("body-parser");

var axios = require("axios");

const { response, application } = require("express");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// B01N1UETP6,B07SLQHCWH,B07ZRYRHHK,B08SHXLYF3,B083JMJ22P,B07HGRJWY9,B08KF19Q2M,B08WHGB1QN,B00GQP0XTQ,B07FBZVWB4,B00GQP0XTQ,B00GQP0Z9E,  B07R995F4X,B08M3F8PQ2,B08M3B5BJS,B00GQP11E2,B00GQP13XG,B097Q3425Y,B07RWK5T4N,B01MF9X3XZ,B097Q141VZ,
// var asins = [
// B00GQP0XTQ,
// B00GQP0Z9E,
// B07R995F4X,
// B08M3F8PQ2,
// B08M3B5BJS,
// B00GQP11E2,
// B00GQP13XG,
// B097Q3425Y,
// B07RWK5T4N,
// B01MF9X3XZ,
// B097Q141VZ,
// ];
var data = [];
function GetData(params) {
  console.log(
    "###########################################################################################"
  );
  // make the http GET request to Rainforest API
  axios
    .get("https://api.rainforestapi.com/request", { params })
    .then((response) => {
      // print the JSON response from Rainforest API
      console.log(JSON.stringify(response.data, 0, 2));
      data.push(JSON.stringify(response.data, 0, 2));
    })
    .catch((error) => {
      // catch and print the error
      console.log(error);
    });
}

app.use("/", async (req, res) => {
  console.log(req.query);

  var array = await req.query.asins.split(",");

  console.log(req.query.country);
  // console.log(array);

  var responses = [];
  var completed_requests = 0;

  for (i in array) {
    const params = {
      api_key: "19D50C4A0BE04AD894AD426DCC60B206",
      type: "product",
      amazon_domain: `${req.query.country}`,
      asin: array[i],
    };

    axios
      .get("https://api.rainforestapi.com/request", { params })
      .then((response) => {
        responses.push(response.data);
        completed_requests++;
        if (completed_requests == array.length) {
          // All download done, process responses array
          res.send(responses);
        }
      })
      .catch((error) => {
        // catch and print the error
        console.log(error);
      });
  }

  // for (let index = 0; index < array.length; index++) {
  //   // set up the request parameters

  //   const params = {
  //     api_key: "19D50C4A0BE04AD894AD426DCC60B206",
  //     type: "product",
  //     amazon_domain: "amazon.com",
  //     asin: array[index],
  //   };

  //   await GetData(params);
  //   // console.log("DAta ###################################", data);
  // }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Application is listening on Port " + port));
