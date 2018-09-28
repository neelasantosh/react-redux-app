import React, { Component } from 'react';
import { connect } from "react-redux";
import { Input, RadioGroup, Row, Select, Form } from 'formsy-react-components';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import Icon from './Icons.js';
import { addForm, nextStep } from '../actions/index';
import validator from 'validator';
import { Popup } from 'semantic-ui-react';

class MyComp5 extends Component {
  constructor (props) {
  super(props)

  this.state = {
    addressline1: '',
    addressline2:'',
    addressline3:'',
    pin:'',
    countryname:'',
    cityname:'',
    addresstype:'',
    states:'',
    adressprooftype:'',
    formErrors: {states:'',addressline1: '',addressline2:'',addressline3:'',pin:'',countryname:'',cityname:'',addresstype:'',addressprooftype:''},
    addressline1Valid: false,
    stateValid:false,
    addressline2Valid:false,
    addressline3Valid:false,
    cityValid:false,
    addresstypeValid:false,
    addressprooftypeValid:false,
    countrynameValid:false,
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
  let addressline1Valid = this.state.addressline1Valid;
  let addressline2Valid = this.state.addressline2Valid;
  let addressline3Valid = this.state.addressline3Valid;
  let pinValid = this.state.pinValid;
  let countrynameValid = this.state.countrynameValid;
  let addresstypeValid = this.state.addresstypeValid;
  let addressprooftypeValid = this.state.addressprooftypeValid;
  let cityValid = this.state.cityValid;
  let stateValid = this.state.stateValid;

  switch(fieldName) {
    case 'addressline1':
      addressline1Valid = value.length >= 0;
      fieldValidationErrors.addressline1 = addressline1Valid ? '' : ' is invalid';
      break;
    case 'addressline2':
      addressline2Valid = value.length >= 0;
      fieldValidationErrors.addressline2 = addressline2Valid ? '' : ' is invalid';
      break;
    case 'addressline3':
      addressline3Valid = value.length >= 0;
      fieldValidationErrors.addressline3 = addressline3Valid ? '' : ' is invalid';
      break;
    case 'pin':
      pinValid = value.length >= 0;
      fieldValidationErrors.pin = pinValid ? '' : ' is invalid';
      break;
    case 'states':
      stateValid = value.length >= 0;
      fieldValidationErrors.states = stateValid ? '' : ' is invalid';
        break;
    case 'countryname':
      countrynameValid = value.length >= 0;
      fieldValidationErrors.countryname = countrynameValid ? '' : ' is invalid';
      break;
    case 'addresstype':
      addresstypeValid = value.length >= 0;
      fieldValidationErrors.addresstype = addresstypeValid ? '' : ' is invalid';
      break;
    case 'addressprooftype':
      addressprooftypeValid = value.length >= 0;
      fieldValidationErrors.addressprooftype = addressprooftypeValid ? '' : ' is invalid';
      break;
    case 'cityname':
      cityValid = value.length >= 0;
      fieldValidationErrors.cityname = cityValid ? '' : ' is invalid';
      break;
    default:
      break;
  }
  this.setState({formErrors: fieldValidationErrors,
                  addressline1Valid: addressline1Valid,
                  addressline2Valid: addressline2Valid,
                  addressline3Valid:addressline3Valid,
                  pinValid:pinValid,
                  countrynameValid:countrynameValid,
                  addressprooftypeValid:addressprooftypeValid,
                  addresstypeValid:addresstypeValid,
                  cityValid:cityValid,
                  stateValid:stateValid,
                  [fieldName]: value,
                }, this.validateForm);
}

validateForm = () => {
  this.setState({formValid: this.state.addressline1Valid});
}

errorClass = (error) => {
  return(error.length === 0 ? '' : 'has-error');
}

 submitForm = (data) => {
   if(true){
     this.props.addForm(data)
     this.props.setActive('Bankdetails')
   }else{
     alert("Not valid input")
   }
}


  render(){
    const {setActive, isActive} = this.props
    const popOverValidations = {
      countryname: (
        <div>
          <h4 className={this.state.countrynameValid ? "validator_title valid" : "validator_title invalid"}> COUNTRY RULES </h4>
          <li className={this.state.countrynameValid ? "rules_list valid" : "rules_list"}>
            <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
            <i className="icon_invalid"> <Icon type="circle_error"/> </i>
            <span className="error_message">{this.state.countrynameValid ? "Valid" : "Invalid"}</span>
          </li>
        </div>
      ),
      addressline1:(
        <div>
          <h4 className={this.state.addressline1Valid ? "validator_title valid" : "validator_title invalid"}> ADDRESS RULES </h4>
          <li className={this.state.addressline1Valid ? "rules_list valid" : "rules_list"}>
            <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
            <i className="icon_invalid"> <Icon type="circle_error"/> </i>
            <span className="error_message">{this.state.addressline1Valid ? "Valid" : "Invalid"}</span>
          </li>
        </div>
      ),
      addressline2:(
        <div>
          <h4 className={this.state.addressline2Valid ? "validator_title valid" : "validator_title invalid"}> ADDRESS RULES </h4>
          <li className={this.state.addressline2Valid ? "rules_list valid" : "rules_list"}>
            <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
            <i className="icon_invalid"> <Icon type="circle_error"/> </i>
            <span className="error_message">{this.state.addressline2Valid ? "Valid" : "Invalid"}</span>
          </li>
        </div>
      ),
      addressline3:(
        <div>
          <h4 className={this.state.addressline3Valid ? "validator_title valid" : "validator_title invalid"}> ADDRESS RULES </h4>
          <li className={this.state.addressline3Valid ? "rules_list valid" : "rules_list"}>
            <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
            <i className="icon_invalid"> <Icon type="circle_error"/> </i>
            <span className="error_message">{this.state.addressline3Valid ? "Valid" : "Invalid"}</span>
          </li>
        </div>
      ),
      pin:(
        <div>
          <h4 className={this.state.pinValid ? "validator_title valid" : "validator_title invalid"}> PIN RULES </h4>
          <li className={this.state.pinValid ? "rules_list valid" : "rules_list"}>
            <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
            <i className="icon_invalid"> <Icon type="circle_error"/> </i>
            <span className="error_message">{this.state.pinValid ? "Valid" : "Invalid"}</span>
          </li>
        </div>
      ),
    }

    // const country = {value:'select',label:'Select Country'}
    // _.forEach(constants.countries,function(k,v){
    //   constants.countries[v]['label'] = k['description']
    //   constants.countries[v]['value'] = k['key_field']
    // })
    // constants.countries.slice(0,0,country)
    //
    // const state = {value:'select',label:'Select State'}
    // _.forEach(constants.state,function(k,v){
    //   constants.state[v]['label'] = k['description']
    //   constants.state[v]['value'] = k['key_field']
    // })
    // //constants.state.splice(0,0,state)
    //
    // const city = {value:'select','label':'Select City'}
    // _.forEach(constants.formConstants.master.CITY,function(k,v){
    //   constants.formConstants.master.CITY[v]['label'] = k['text']
    // })
    // //constants.formConstants.master.CITY.splice(0,0,city)
    //
    // const idtype = {value:'select','label':'Select ID'}
    // _.forEach(constants.formConstants.master.IDTYP,function(k,v){
    //   constants.formConstants.master.IDTYP[v]['label'] = k['text']
    // })
    // //constants.formConstants.master.IDTYP.splice(0,0,idtype)
    //
    // const addtype = {value:'select','label':'Select Address Type'}
    // _.forEach(constants.addresstype,function(k,v){
    //   constants.addresstype[v]['label'] = k['address_type_description']
    //   constants.addresstype[v]['value'] = k['address_type']
    // })
    //constants.addresstype.splice(0,0,addtype)

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
      <Form
        onSubmit={this.submitForm}
        className="custom-classname-is-rendered Form1"
      >
      <fieldset>
      <Popup
         trigger={
           <Input
             name="addressline1"
             value={this.state.addressline1}
             onChange={this.handleUserInput}
             label="Address"
             type="text"
             placeholder="Door Number,Apartment Name"
             required
           />
         }
         position="right center"
         content={popOverValidations.addressline1}
         on='focus'
       />
       <Popup
         trigger={
           <Input
             name="addressline2"
             value={this.state.addressline2}
             onChange={this.handleUserInput}
             label="Street / Area"
             type="text"
             placeholder="Street"
             required
           />
         }
         position="right center"
         content={popOverValidations.addressline2}
         on='focus'
       />
      <Popup
         trigger={
           <Input
             name="addressline3"
             value={this.state.addressline3}
             onChange={this.handleUserInput}
             label="Address Line"
             type="text"
             placeholder="Address Line"
           />
         }
         position="right center"
         content={popOverValidations.addressline3}
         on='focus'
       />
      <Popup
         trigger={
           <Input
             name="pin"
             value={this.state.pin}
             onChange={this.handleUserInput}
             label="Pin"
             type="text"
             validations={{minLength: 4, maxLength:10}}
             validationErrors={{
               minLength: 'Please provide correct pin number.',
               maxLength: 'Please provide correct pin number.'
             }}
             placeholder="Enter your pin code"
             required
           />
         }
         position="right center"
         content={popOverValidations.pin}
         on='focus'
       />
      <Select
        name="countryname"
        label="Country"
        value={this.state.countryname}
        onChange={this.handleUserInput}
        options={singleSelectOptions}
        required
      />

      <Select
        name="states"
        value={this.state.states}
        onChange={this.handleUserInput}
        label="State"
        options={singleSelectOptions}
        required
      />

      <Select
        name="city"
        value={this.state.cityname}
        onChange={this.handleUserInput}
        label="City"
        options={singleSelectOptions}
        required
      />

      <Select
        name="adresstype"
        value={this.state.addresstype}
        onChange={this.handleUserInput}
        label="Address Type"
        options={singleSelectOptions}
        required
      />

      <Select
        name="adressprooftype"
        value={this.state.addressproofType}
        onChange={this.handleUserInput}
        label="Address Proof Type"
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
export default connect(mapStateToProps, mapDispatchToProps)(MyComp5);
