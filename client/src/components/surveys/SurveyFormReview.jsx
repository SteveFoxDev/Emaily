import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as actions from "../../actions";
import formFields from "./formFields";

const SurveyFormReview = ({ onCancel, formValues, submitSurvey }) => {
  const navigate = useNavigate();
  const reviewFields = () => {
    return (
      <div>
        {formFields.map((f) => (
          <div key={f.name}>
            <label>{f.label}</label>
            <div>{formValues[f.name]}</div>
          </div>
        ))}
      </div>
    );
  };
  return (
    <div className="container ">
      <h5>Please confirm your entries</h5>
      {reviewFields()}
      <button className="btn red accent-2" onClick={onCancel}>
        Back
      </button>
      <button
        onClick={() => submitSurvey(formValues, navigate)}
        className="btn blue-grey right"
      >
        Send Survey
        <i className="material-icons right">send</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values,
  };
}

export default connect(mapStateToProps, actions)(SurveyFormReview);
