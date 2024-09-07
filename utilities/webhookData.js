const mongoose = require("mongoose");
const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");

function getFeedback(body) {
  const p = new Path("/api/surveys/:surveyId/:choice");

  const events = _.chain(body)
    .map(({ email, url, event }) => {
      if (event === "click") {
        const match = p.test(new URL(url).pathname);
        if (match && mongoose.isValidObjectId(match.surveyId)) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      }
    })
    .compact()
    .uniqBy("email", "surveyId")
    .value();

  return events;
}

module.exports = getFeedback;
