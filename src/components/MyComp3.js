import React, { Component } from 'react';
import { connect } from "react-redux";
import { Input, RadioGroup, Row, Select, Form } from 'formsy-react-components';
import Icon from './Icons.js';
import { addForm, nextStep } from '../actions/index';
import validator from 'validator';
import { Popup } from 'semantic-ui-react';

class MyComp3 extends Component {
  constructor (props) {
  super(props)
  this.state = {
    occupation: '',
    income: '',
    grossincome: '',
    formErrors: {occupation: '', income: '',grossincome: ''},
    occupationValid: false,
    incomeValid: false,
    grossincomeValid:false,
    formValid: false,
  }
}

handleUserInput = (e,f) => {
  const name = e;
  const value = f;
  this.validateField(name, value)
}

validateField = (fieldName, value) => {
  let fieldValidationErrors = this.state.formErrors;
  let occupationValid = this.state.occupationValid;
  let incomeValid = this.state.incomeValid;
  let grossincomeValid = this.state.grossincomeValid;

  switch(fieldName) {
    case 'occupation':
      occupationValid = value.length >= 0;
      fieldValidationErrors.occupation = occupationValid ? '' : ' is invalid';
      break;
    case 'income':
      incomeValid = value.length >= 0;
      fieldValidationErrors.income = incomeValid ? '': ' is too short';
      break;
    case 'grossincome':
      grossincomeValid = value.length >= 0;
      fieldValidationErrors.grossincome = grossincomeValid ? '': ' is too short';
      break;
    default:
      break;
  }
  this.setState({formErrors: fieldValidationErrors,
                  occupationValid: occupationValid,
                  incomeValid: incomeValid,
                  grossincomeValid:grossincomeValid,
                  [fieldName]: value,
                }, this.validateForm);
}

validateForm = () => {
  this.setState({formValid: this.state.occupationValid && this.state.incomeValid && this.state.grossincomeValid});
}

errorClass = (error) => {
  return(error.length === 0 ? '' : 'has-error');
}


 submitForm = data => {
   if(this.state.formValid){
     this.props.addForm(data)
     this.props.setActive('Assessee')
   }else{
     alert("Not valid input")
   }
 }


  render(){
    const {setActive, isActive} = this.props
    const popOverValidations = {
      occupation: (
          <div>
          <h4 className={this.state.occupationValid ? "validator_title valid" : "validator_title invalid"}> OCCUPATION RULES </h4>
          <li className={this.state.occupationValid ? "rules_list valid" : "rules_list"}>
            <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
            <i className="icon_invalid"> <Icon type="circle_error"/> </i>
            <span className="error_message">{this.state.occupationValid ? "Valid" : "Invalid"}</span>
          </li>
          </div>
      ),
      income: (
          <div>
          <h4 className={this.state.incomeValid ? "validator_title valid" : "validator_title invalid"}> INCOME RULES </h4>
          <li className={this.state.incomeValid ? "rules_list valid" : "rules_list"}>
            <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
            <i className="icon_invalid"> <Icon type="circle_error"/> </i>
            <span className="error_message">{this.state.incomeValid ? "Valid" : "Invalid"}</span>
          </li>
          </div>
      ),
      grossincome: (
          <div>
          <h4 className={this.state.grossincomeValid ? "validator_title valid" : "validator_title invalid"}> INCOME RULES </h4>
          <li className={this.state.grossincomeValid ? "rules_list valid" : "rules_list"}>
            <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
            <i className="icon_invalid"> <Icon type="circle_error"/> </i>
            <span className="error_message">{this.state.grossincomeValid ? "Valid" : "Invalid"}</span>
          </li>
          </div>
      ),
    }

      //let occupation = {'label':'Select Occupation'}
    // _.forEach(constants.formConstants.master.OCCPN,function(k,v){
    //   constants.formConstants.master.OCCPN[v]['label'] = k['text']
    //   {/*_.remove(constants.formConstants.master.OCCPN,constants.formConstants.master.OCCPN[v]['text'])*/}
    // })
    //   //constants.formConstants.master.OCCPN.splice(0,0,occupation)
    //
    //   //let source = {'label':'Select Source of Income'}
    // _.forEach(constants.formConstants.master.SRCWL,function(k,v){
    //   constants.formConstants.master.SRCWL[v]['label'] = k['text']
    // })
    //   //constants.formConstants.master.SRCWL.splice(0,0,source)
    //
    //   let income = {'label':'Select Range'}
    // _.forEach(constants.formConstants.master.APPIN,function(k,v){
    //   constants.formConstants.master.APPIN[v]['label'] = k['text']
    // })
      //constants.formConstants.master.APPIN.splice(0,0,income)

    const radioOptions = [
      {value: 'yes', label: 'Yes'},
      {value: 'no', label: 'No'},
    ];

    const selectOptions = [
        {value: 'a', label: 'Option A'},
        {value: 'a', label: 'Option A (again)'},
        {value: 'b', label: 'Option B'},
        {
          value: 'c',
          label: 'Option C',
          title: 'This is a title attribute for Option C',
        },
        {value: 'd', label: 'Option D'},

      ];

      const singleSelectOptions = [
        {value: '', label: 'Please select…'},
        ...selectOptions,
      ];

    return(
      <Form onSubmit={this.submitForm} className="custom-classname-is-rendered Form1" >
        <fieldset>
          <Select
            name="occupation"
            label="Occupation"
            value={this.state.occupation}
            onChange={this.handleUserInput}
            options={singleSelectOptions}
            required
          />
        </fieldset>
        <fieldset>
          <Select
            name="income"
            label="Source of income"
            value={this.state.income}
            onChange={this.handleUserInput}
            options={singleSelectOptions}
            required
          />
        </fieldset>
        <fieldset>
          <Select
            name="grossincome"
            label="Gross income"
            value={this.state.grossincome}
            onChange={this.handleUserInput}
            options={singleSelectOptions}
            required
          />
        </fieldset>
        <RadioGroup
          name="activepolitics"
          type="inline"
          label="Are you active in Politics or associated with a Politically Influenced Person?"
          value={this.state.activepolitics}
          onChange={this.handleUserInput}
          options={radioOptions}
          required
        />
        <fieldset>
          <Row>
            <input
              className="resetFormButton ms-Callout-button ms-Button ms-Button--primary"
              onClick={this.resetForm}
              type="reset"
              defaultValue="Reset"
            />
            <input
              className="submitFormButton ms-Callout-button ms-Button ms-Button--primary"
              type="submit"
              defaultValue="Next"
            />
          </Row>
        </fieldset>
      </Form>
    )
  }
}

const mapStateToProps = state => {
  return{ formsReducer: state.formsReducer,isActive: state.steps.isActive};
}

const mapDispatchToProps = dispatch => {
  return {
    setActive: (e) => dispatch(nextStep(e)),
    addForm: formdetails => dispatch(addForm(formdetails))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyComp3);
