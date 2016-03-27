import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import '!style!css!react-datepicker/dist/react-datepicker.min.css';

export default class InvestmentAddForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      startDate: moment(),
      endDate: moment().add(1,'years'),
      submitButtonDisabled: false,
      alertMessage: null
    }
  }
  
  handleTimeChange(isStartDate, date) {
    if (isStartDate) {
      this.setState({
        startDate: date
      });
    }
    else {
      this.setState({
        endDate: date
      });
    }
  }
  
  handleSubmit(event) {
    event.preventDefault();
    var investment = {
      name: this.refs.investorName.value,
      value: parseFloat(this.refs.value.value),
      rate: 0.09,
      start: this.state.startDate.format('YYYY/MM/DD'),
      end: this.state.endDate.format('YYYY/MM/DD')
    }
    if (isNaN(investment.value)) {
      this.setState({
        alertMessage: 'Investment value is not a number'
      });
      return;
    }
    
    this.setState({
      submitButtonDisabled: true
    })
    
    this.props.addInvestment(investment)
      .catch(function(err) {
        this.setState({
          submitButtonDisabled: false,
          alertMessage: err
        })
      }.bind(this));
  }
  
  render() {
    var alertComponent = null;
    if (this.state.alertMessage) {
      alertComponent = (
        <div className="alert alert-danger" role="alert">
          {this.state.alertMessage}
        </div>
      );
    }
    // in form-inline, space is important to separate form-groups
    return (
      <div className="row">
        <div className="col-xs-12">
          <div className="btn-group">
            <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#addInvestmentCollapse" aria-expanded="false" aria-controls="collapseExample">
              Add Investment
            </button>
          </div>
        </div>
        <div className="collapse col-xs-12" id="addInvestmentCollapse">
          {alertComponent}
          <form className="form-inline">
            <div className="form-group">
              <input className="form-control" ref="investorName" type="text" placeholder="Investor Name" required />
            </div> <div className="form-group">
              <input className="form-control" ref="value" type="text" placeholder="Value (x10000 VND)" required />
            </div> <div className="form-group">
              <input className="form-control" ref="rate" type="text" placeholder="Rate = 9%" readOnly required />
            </div> <div className="form-group">
              <DatePicker ref="startDate" dateFormat="MMMM DD, YYYY" placeholderText="Start Date" selected={this.state.startDate} onChange={this.handleTimeChange.bind(this, true)} />
            </div> <div className="form-group">
              <DatePicker ref="endDate" dateFormat="MMMM DD, YYYY" placeholderText="End Date" selected={this.state.endDate} onChange={this.handleTimeChange.bind(this, false)} />
            </div> <div className="form-group"> 
              <button className="btn btn-primary" refs="submit" type="submit" disabled={this.state.submitButtonDisabled} onClick={this.handleSubmit.bind(this)}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}