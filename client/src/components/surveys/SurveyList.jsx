import { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    return this.props.surveys.reverse().map(survey => {
        return(
            <div key={survey.title} className='card blue-grey darken-1'>
                <div className='card-content white-text'>
                    <span className='card-title'>{survey.title}</span>
                    <p>{survey.body}</p>
                    <p className='right'>Sent on: {new Date(survey.dateSent).toLocaleDateString()}</p>
                    <p>Completion: {`${((survey.yes + survey.no)/survey.totalSent*100).toFixed()}%`}</p>
                </div>
                <div className='card-action'>
                    <span className='card-title white-text'>Votes</span>
                    <hr />
                    <a href="">Yes: {survey.yes}</a>
                    <a href="">No: {survey.no}</a>
                    <p className='right white-text'></p>
                </div>
            </div>
        )
    })
  }

  render() {
    return (
        <div>
            {this.renderSurveys()}
        </div>
    );
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
