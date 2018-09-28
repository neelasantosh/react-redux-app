import React, { Component } from 'react';
import { connect } from "react-redux";
import { Input, RadioGroup, Row, Select, Form } from 'formsy-react-components';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import Icon from './Icons.js';
import { addForm, nextStep } from '../actions/index';
import validator from 'validator';
import { Popup } from 'semantic-ui-react';

class MyComp6 extends Component {
  constructor (props) {
  super(props)

  this.state = {
    bankname: '',
    accountnumber:'',
    ifsc:'',
    micr:'',
    branchname:'',
    accounttype:'',
    brachpin:'',
    pancard:'',
    holdnature:'',
    formErrors: {bankname: '',accountnumber:'',accounttype:'',ifsc:'',micr:'',branchname:'',pancard:'',branchpin:'',holdnature:''},
    banknameValid: false,
    accountnumberValid:false,
    accounttypeValid:false,
    holdnatureValid:false,
    ifscValid:false,
    micrValid:false,
    branchpinValid:false,
    pancardValid:false,
    branchnameValid:false,
    accountnumberalphaValid:false,
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
  let banknameValid = this.state.banknameValid;
  let accountnumberValid  = this.state.accountnumberValid;
  let ifscValid=this.state.ifscValid;
  let micrValid=this.state.micrValid;
  let branchnameValid=this.state.branchnameValid;
  let branchpinValid=this.state.branchpinValid;
  let pancardValid=this.state.pancardValid;
  let accounttypeValid=this.state.accounttypeValid;
  let holdnatureValid = this.state.holdnatureValid;
  let accountnumberalphaValid = this.state.accountnumberalphaValid;

  switch(fieldName) {
    case 'bankname':
      banknameValid = value.length >= 0;
      fieldValidationErrors.country = banknameValid ? '' : ' is invalid';
      break;
    case 'accountnumber':
      accountnumberValid = validator.isLength(value,{min:6,max: 40});
      fieldValidationErrors.accountnumber = accountnumberValid ? '' : ' is invalid';
      accountnumberalphaValid = validator.isAlphanumeric(value)
      fieldValidationErrors.accountnumber = accountnumberalphaValid ? '' : ' is invalid';
      break;
    case 'ifsc':
      ifscValid = value.length >= 0;
      fieldValidationErrors.ifsc = ifscValid ? '' : ' is invalid';
      break;
    case 'micr':
      micrValid = value.length >= 0;
      fieldValidationErrors.micr = micrValid ? '' : ' is invalid';
      break;
    case 'branchname':
      branchnameValid = value.length >= 0;
      fieldValidationErrors.branchname = branchnameValid ? '' : ' is invalid';
      break;
    case 'branchpin':
      branchpinValid = value.length >= 0;
      fieldValidationErrors.branchpin = branchpinValid ? '' : ' is invalid';
      break;
    case 'pancard':
      pancardValid = value.length == 10;
      fieldValidationErrors.pancard = pancardValid ? '' : ' is invalid';
      break;
    case 'holdnature':
      holdnatureValid = value.length == 10;
      fieldValidationErrors.holdnature = holdnatureValid ? '' : ' is invalid';
      break;
    case 'accounttype':
      accounttypeValid = value.length == 10;
      fieldValidationErrors.accounttype = accounttypeValid ? '' : ' is invalid';
      break;
    default:
      break;
  }
  this.setState({formErrors: fieldValidationErrors,
                  banknameValid: banknameValid,
                  accountnumberValid:accountnumberValid,
                  ifscValid:ifscValid,
                  micrValid:micrValid,
                  branchnameValid:branchnameValid,
                  branchpinValid:branchpinValid,
                  pancardValid:pancardValid,
                  accounttypeValid:accounttypeValid,
                  holdnatureValid:holdnatureValid,
                  [fieldName]: value,
                }, this.validateForm);
}

validateForm = () => {
  this.setState({formValid: this.state.banknameValid});
}

errorClass = (error) => {
  return(error.length === 0 ? '' : 'has-error');
}


submitForm = (data) => {
  if(this.state.formValid){
    this.props.addForm(data)
    this.props.setActive('DematMode')
  }else{
    alert("Not valid input")
  }
}


  render(){
    const {setActive, isActive} = this.props
    // _.forEach(constants.formConstants.master.BANK,function(k,v){
    //   constants.formConstants.master.BANK[v]['label'] = k['text']
    // })
    //
    // _.forEach(constants.formConstants.master.ACTTY,function(k,v){
    //   constants.formConstants.master.ACTTY[v]['label'] = k['text']
    // })
    //
    // _.forEach(constants.formConstants.master.HOLDN,function(k,v){
    //   constants.formConstants.master.HOLDN[v]['label'] = k['text']
    // })

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

    const popOverValidations = {
      accountnumber: (
        <div>
          <h4 className={this.state.accountnumberValid ? "validator_title valid" : "validator_title invalid"}> ACCOUNTNUMBER RULES </h4>
          <li className={this.state.accountnumberValid ? "rules_list valid" : "rules_list"}>
            <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
            <i className="icon_invalid"> <Icon type="circle_error"/> </i>
            <span className="error_message">{this.state.accountnumberValid ? "Valid Length" : "Valid Length"}</span>
          </li>
          <li className={this.state.accountnumberalphaValid ? "rules_list valid" : "rules_list"}>
            <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
            <i className="icon_invalid"> <Icon type="circle_error"/> </i>
            <span className="error_message">{this.state.accountnumberalphaValid ? "Valid" : "Valid"}</span>
          </li>
        </div>
      ),
      ifsc: (
        <div>
          <h4 className={this.state.ifscValid ? "validator_title valid" : "validator_title invalid"}> IFSC RULES </h4>
          <li className={this.state.ifscValid ? "rules_list valid" : "rules_list"}>
            <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
            <i className="icon_invalid"> <Icon type="circle_error"/> </i>
            <span className="error_message">{this.state.ifscValid ? "Valid" : "Valid"}</span>
          </li>
        </div>
      ),
      micr: (
        <div>
          <h4 className={this.state.micrValid ? "validator_title valid" : "validator_title invalid"}> MICR RULES </h4>
          <li className={this.state.micrValid ? "rules_list valid" : "rules_list"}>
            <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
            <i className="icon_invalid"> <Icon type="circle_error"/> </i>
            <span className="error_message">{this.state.micrValid ? "Valid" : "Valid"}</span>
          </li>
        </div>
      ),
      branchname: (
        <div>
          <h4 className={this.state.branchnameValid ? "validator_title valid" : "validator_title invalid"}> BRANCHNAME RULES </h4>
          <li className={this.state.branchnameValid ? "rules_list valid" : "rules_list"}>
            <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
            <i className="icon_invalid"> <Icon type="circle_error"/> </i>
            <span className="error_message">{this.state.branchnameValid ? "Valid" : "Valid"}</span>
          </li>
        </div>
      ),
      branchpin: (
        <div>
          <h4 className={this.state.branchpinValid ? "validator_title valid" : "validator_title invalid"}> BRANCH CITY PIN RULES </h4>
          <li className={this.state.branchpinValid ? "rules_list valid" : "rules_list"}>
            <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
            <i className="icon_invalid"> <Icon type="circle_error"/> </i>
            <span className="error_message">{this.state.branchpinValid ? "Valid" : "Valid"}</span>
          </li>
        </div>
      ),
      pancard: (
        <div>
          <h4 className={this.state.pancardValid ? "validator_title valid" : "validator_title invalid"}> PANCARD RULES </h4>
          <li className={this.state.pancardValid ? "rules_list valid" : "rules_list"}>
            <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
            <i className="icon_invalid"> <Icon type="circle_error"/> </i>
            <span className="error_message">{this.state.pancardValid ? "Valid" : "Valid"}</span>
          </li>
        </div>
      ),
    }
    return(
      <Form onSubmit={this.submitForm} className="custom-classname-is-rendered Form1">
        <fieldset>
        <Select
          name="bankname"
          value={this.state.bankname}
          onChange={this.handleUserInput}
          label="Bank name"
          options={singleSelectOptions}
          required
        />
        <Select
          name="accounttype"
          value={this.state.accounttype}
          onChange={this.handleUserInput}
          label="Account Type"
          options={singleSelectOptions}
          required
        />
        <Popup
         trigger={
           <Input
             name="accountnumber"
             value={this.state.accountnumber}
             onChange={this.handleUserInput}
             label="Account Number"
             type="text"
             placeholder="Enter your bank account number"
             required
           />
         }
         position="right center"
         content={popOverValidations.accountnumber}
         on='focus'
       />
        <Popup
           trigger={
             <Input
               name="ifsc"
               value={this.state.ifsc}
               onChange={this.handleUserInput}
               label="IFSC code"
               type="text"
               placeholder="Enter your IFSC code"
               required
             />
           }
           position="right center"
           content={popOverValidations.ifsc}
           on='focus'
         />
        <Popup
           trigger={
             <Input
               name="micr"
               value={this.state.micr}
               onChange={this.handleUserInput}
               label="MICR code"
               type="text"
               placeholder="Enter your MICR code"
               required
             />
           }
           position="right center"
           content={popOverValidations.micr}
           on='focus'
         />
        <Popup
           trigger={
             <Input
               name="branchname"
               value={this.state.branchname}
               onChange={this.handleUserInput}
               label="Branch Name"
               type="text"
               placeholder="Enter your Branch Name"
               required
             />
           }
           position="right center"
           content={popOverValidations.branchname}
           on='focus'
         />

        <Popup
           trigger={
             <Input
               name="branchpin"
               value={this.state.branchpin}
               onChange={this.handleUserInput}
               label="Branch city pin code"
               type="text"
               placeholder="Enter your branch city pin code"
               required
             />
           }
           position="right center"
           content={popOverValidations.branchpin}
           on='focus'
         />
        <Popup
         trigger={
            <Input
               name="pancard"
               label="Pancard Number"
               type="text"
               value={this.state.pancard}
               onChange={this.handleUserInput}
               autoComplete="off"
               placeholder="Enter pancard number"
               help="This field should not autocomplete."
               validations={{isLength: 10}}
               validationErrors={{
                 isLength: 'Please provide correct pancard number.'
               }}
               required
             />
           }
         position="right center"
         content={popOverValidations.pancard}
         on='focus'
       />

        <Select
          name="holdnature"
          value={this.state.holdnature}
          onChange={this.handleUserInput}
          label="Hold Nature"
          options={singleSelectOptions}
          required
        />
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
export default connect(mapStateToProps, mapDispatchToProps)(MyComp6);
