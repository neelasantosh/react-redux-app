import React, { Component } from 'react';
import { connect } from "react-redux";
import { Input, RadioGroup, Row, Select, Form } from 'formsy-react-components';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import Icon from './Icons.js';
import { addForm, nextStep } from '../actions/index';
import validator from 'validator';
import { Popup } from 'semantic-ui-react';

class MyComp7 extends Component {
  constructor (props) {
  super(props)

  this.state = {
    demat: '',
    nsdl:'',
    dpname:'',
    beneficiaryid:'',
    cdsldp:'',
    formErrors: {demat: '',nsdl:'',dpname:'',beneficiaryid:'',cdsldp:''},
    dematValid: false,
    nsdlValid: false,
    dpnameValid: false,
    beneficiaryidValid: false,
    cdsldpValid: false,
    opened: false
  }

}

handleUserInput = (e,f) => {
  const name = e;
  const value = f;
  console.log(name,value);
  this.validateField(name, value)
}

toggleBox = () => {
  const { opened } = this.state;
  this.setState({
      opened: !opened,
  });
}

validateField = (fieldName,value) => {
  console.log(fieldName,value);
  let fieldValidationErrors = this.state.formErrors;
  let dematValid = this.state.dematValid;
  let nsdlValid = this.state.nsdlValid;
  let dpnameValid = this.state.dpnameValid;
  let beneficiaryidValid = this.state.beneficiaryidValid;
  let cdsldpValid = this.state.cdsldpValid;

  switch(fieldName) {
    case 'demat':
      dematValid = value.length >= 0;
      fieldValidationErrors.country = dematValid ? '' : ' is invalid';
      break;
    case 'nsdl':
      nsdlValid = value.length >= 0;
      fieldValidationErrors.nsdl = nsdlValid ? '' : ' is invalid';
      break;
    case 'dpname':
      dpnameValid = value.length >= 0;
      fieldValidationErrors.dpname = dpnameValid ? '' : ' is invalid';
      break;
    case 'cdsldp':
      cdsldpValid = value.length >= 0;
      fieldValidationErrors.cdsldp = cdsldpValid ? '' : ' is invalid';
      break;
    case 'beneficiaryid':
      beneficiaryidValid = value.length >= 0;
      fieldValidationErrors.beneficiaryid = beneficiaryidValid ? '' : ' is invalid';
      break;
    default:
      break;
  }
  this.setState({formErrors: fieldValidationErrors,
                  dematValid: dematValid,
                  nsdlValid:nsdlValid,
                  dpnameValid:dpnameValid,
                  cdsldpValid:cdsldpValid,
                  beneficiaryidValid:beneficiaryidValid,
                  [fieldName]: value,
                }, this.validateForm);
}

validateForm = () => {
  this.setState({dematValid: this.state.dematValid});
}

errorClass = (error) => {
  return(error.length === 0 ? '' : 'has-error');
}


 submitForm = (data) => {
   if(true){
     this.props.addForm(data)
     //this.props.setActive('DematMode')
   }else{
     alert("Not valid input")
   }
 }

  render(){
    const {setActive, isActive} = this.props
    const popOverValidations = {
      nsdl: (
        <div>
          <h4 className={this.state.nsdlValid ? "validator_title valid" : "validator_title invalid"}> NSDL RULES </h4>
          <li className={this.state.nsdlValid ? "rules_list valid" : "rules_list"}>
            <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
            <i className="icon_invalid"> <Icon type="circle_error"/> </i>
            <span className="error_message">{this.state.nsdlValid ? "Valid" : "Invalid"}</span>
          </li>
        </div>
      ),
      dpname:(
        <div>
          <h4 className={this.state.dpnameValid ? "validator_title valid" : "validator_title invalid"}> DPNAME RULES </h4>
          <li className={this.state.dpnameValid ? "rules_list valid" : "rules_list"}>
            <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
            <i className="icon_invalid"> <Icon type="circle_error"/> </i>
            <span className="error_message">{this.state.dpnameValid ? "Valid" : "Invalid"}</span>
          </li>
        </div>
      ),
      beneficiaryid:(
        <div>
          <h4 className={this.state.beneficiaryidValid ? "validator_title valid" : "validator_title invalid"}> BENEFICIARY RULES </h4>
          <li className={this.state.beneficiaryidValid ? "rules_list valid" : "rules_list"}>
            <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
            <i className="icon_invalid"> <Icon type="circle_error"/> </i>
            <span className="error_message">{this.state.beneficiaryidValid ? "Valid" : "Invalid"}</span>
          </li>
        </div>
      ),
      cdsldp:(
        <div>
          <h4 className={this.state.cdsldpValid ? "validator_title valid" : "validator_title invalid"}> CDSLP DP RULES </h4>
          <li className={this.state.cdsldpValid ? "rules_list valid" : "rules_list"}>
            <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
            <i className="icon_invalid"> <Icon type="circle_error"/> </i>
            <span className="error_message">{this.state.cdsldpValid ? "Valid" : "Invalid"}</span>
          </li>
        </div>
      ),
    }

    const { opened } = this.state;

    return(
      <Form onSubmit={this.submitForm} className="custom-classname-is-rendered Form1">
        <fieldset>
          <Toggle
            defaultChecked={ false }
            name="demat"
            label='Do you want the MF units in Demat Mode?'
            onAriaLabel='This toggle is checked. Press to uncheck.'
            offAriaLabel='This toggle is unchecked. Press to check.'
            onText='Yes'
            offText='No'
            onClick = {this.toggleBox}
            onChange={this.handleUserInput}
            className="dematToggle"
          />

          {opened && (
            <div>
            <Popup
               trigger={
                 <Input
                   name="nsdl"
                   label="NSDL"
                   type="text"
                   value={this.state.nsdl}
                   onChange={this.handleUserInput}
                   autoComplete="off"
                   placeholder="Enter NSDl"
                   required
                 />
               }
               position="right center"
               content={popOverValidations.nsdl}
               on='focus'
             />
              <Popup
                 trigger={
                   <Input
                     name="dpname"
                     label="DP name"
                     type="text"
                     value={this.state.dpname}
                     onChange={this.handleUserInput}
                     autoComplete="off"
                     placeholder="Enter DP name"
                     required
                   />
                 }
                 position="right center"
                 content={popOverValidations.dpname}
                 on='focus'
               />
              <Popup
                 trigger={
                   <Input
                     name="beneficiaryid"
                     label="Beneficiary ID"
                     autoComplete="off"
                     value={this.state.beneficiaryid}
                     onChange={this.handleUserInput}
                     placeholder="Enter Beneficiary ID"
                     required
                   />
                 }
                 position="right center"
                 content={popOverValidations.beneficiaryid}
                 on='focus'
               />
              <Popup
                 trigger={
                   <Input
                     name="cdsldp"
                     label="CDSL DP name"
                     autoComplete="off"
                     value={this.state.cdsldp}
                     onChange={this.handleUserInput}
                     placeholder="Enter CDSL DP name"
                     required
                   />
                 }
                 position="right center"
                 content={popOverValidations.cdsldp}
                 on='focus'
               />
            </div>
          )}
        </fieldset>
        <fieldset>
            <Row>
              <input
                className="resetFormButton ms-Callout-button ms-Button ms-Button--primary"
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
export default connect(mapStateToProps, mapDispatchToProps)(MyComp7);
