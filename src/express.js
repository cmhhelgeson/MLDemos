const axios = require('axios')

const args = process.argv.slice(2);

const baseUrl = "http://surveyapp.bawtreehostedapps.com/"
const survey_id = args[0];
const question_id = args[1];

const surveyUrl = `surveys/export-powerpoint-csv/?survey=${survey_id}&cross_tab_question=${question_id}`
const finalUrl = baseUrl + surveyUrl;


console.log("Getting" + finalUrl)


axios.get(finalUrl).then((response) => {
    console.log(response.data);
})

