import React, { Component } from 'react';
import { connect } from "react-redux";
import { Input, RadioGroup, Row, Select, Form } from 'formsy-react-components';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import Icon from './Icons.js';
import { addForm, nextStep } from '../actions/index';
import validator from 'validator';
import { Popup } from 'semantic-ui-react';

class MyComp4 extends Component {
  constructor (props) {
  super(props)

  this.state = {
    taxassessee: '',
    taxidentification:'',
    identificationtype:'',
    country:'',
    formErrors: {taxassessee: '',taxidentification:'',country:'',identificationtype:''},
    assesseeValid: true,
    taxidentificationValid:false,
    countryValid:false,
    identificationtypeValid:false,
    formValid: false,
    showForm6:true,
    showForm7:false,
    opened: false,
    activeStep:'Assessee'
  }
}

handleUserInput = (e,f) => {
  const name = e;
  const value = f
  this.validateField(name, value)
}

toggleBox = () => {
  const { opened } = this.state;
  this.setState({
      opened: !opened,
  });
}

validateField = (fieldName,value) => {
  let fieldValidationErrors = this.state.formErrors;
  let assesseeValid = this.state.assesseeValid;
  let countryValid = this.state.countryValid;
  let taxidentificationValid = this.state.taxidentificationValid;
  let identificationtypeValid = this.state.identificationtypeValid

  switch(fieldName) {
    case 'assessee':
      assesseeValid = value.length >= 0;
      fieldValidationErrors.taxassessee = assesseeValid ? '' : ' is invalid';
      break;
    case 'taxidentification':
      taxidentificationValid = validator.isLength(value,{min:6,max: 25});
      fieldValidationErrors.taxidentification =  taxidentificationValid ? '' : ' is invalid';
      break;
    case 'identificationtype':
      identificationtypeValid = value.length >= 0;
      fieldValidationErrors.identificationtype =  identificationtypeValid ? '' : ' is invalid';
      break;
    case 'country':
      countryValid = value.length >= 0;
      fieldValidationErrors.country = countryValid ? '' : ' is invalid';
      break;
    default:
      null
      break;
  }
  this.setState({formErrors: fieldValidationErrors,
                  assesseeValid: assesseeValid,
                  countryValid:countryValid,
                  taxidentificationValid:taxidentificationValid,
                  identificationtypeValid:identificationtypeValid,
                  [fieldName]: value,
                }, this.validateForm);
}

  validateForm = () => {
    this.setState({formValid: this.state.assesseeValid});
  }

  errorClass = (error) => {
    return(error.length === 0 ? '' : 'has-error');
  }

  submitForm = (data) => {
    if(true){
      this.props.addForm(data)
      this.props.setActive('Address')
    }else{
      alert("Not valid input")
    }
  }


  render(){
    const {setActive, isActive} = this.props
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
      taxidentification: (
        <div>
          <h4 className={this.state.taxidentificationValid ? "validator_title valid" : "validator_title invalid"}> TIN RULES </h4>
          <li className={this.state.taxidentificationValid ? "rules_list valid" : "rules_list"}>
            <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
            <i className="icon_invalid"> <Icon type="circle_error"/> </i>
            <span className="error_message">{this.state.taxidentificationValid ? "Valid" : "Valid"}</span>
          </li>
        </div>
      )
    }

    const radioOptions = [
      {value: 'yes', label: 'Yes'},
      {value: 'no', label: 'No'},
    ];
    const { opened } = this.state;

    // let idtype = {'label':'Select Identification Type'}
    // _.forEach(constants.formConstants.master.IDTYP,function(k,v){
    //   constants.formConstants.master.IDTYP[v]['label'] = k['text']
    // })
    // //constants.formConstants.master.IDTYP.splice(0,0,idtype)
    //
    // let country = {value:'select',label:'Select Country'}
    // _.forEach(constants.countries,function(k,v){
    //   constants.countries[v]['label'] = k['description']
    //   constants.countries[v]['value'] = k['key_field']
    // })
    // //constants.countries.splice(0,0,country)
    // console.log(constants.countries);

    return(
      <Form onSubmit={this.submitForm} className="custom-classname-is-rendered Form1" >
        <fieldset>
          <Toggle
            defaultChecked={ false }
            name="assessee"
            label='Are you a tax assessee in other country?'
            onAriaLabel='This toggle is checked. Press to uncheck.'
            offAriaLabel='This toggle is unchecked. Press to check.'
            onText='Yes'
            offText='No'
            onClick = {this.toggleBox}
            onChange={this.handleUserInput}
            className="assesseToggle"
          />

            {opened && (
              <div>
                <Select
                  name="country"
                  label="Country"
                  value={this.state.country}
                  onChange={this.handleUserInput}
                  options={singleSelectOptions}
                  required
                />
                <Popup
                 trigger={
                   <Input
                     name="taxidentification"
                     label="Tax identification number"
                     type="text"
                     value={this.state.taxidentification}
                     onChange={this.handleUserInput}
                     autoComplete="off"
                     placeholder="Enter TIN"
                     validations={{isLength: 10}}
                     validationErrors={{
                       isLength: 'Please provide correct TIN.'
                     }}
                     required
                   />
                 }
                 position="right center"
                 content={popOverValidations.taxidentification}
                 on='focus'
                />

                <Select
                  name="identificationtype"
                  label="Identification type"
                  value={this.state.identificationtype}
                  onChange={this.handleUserInput}
                  options={singleSelectOptions}
                  required
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
  return{ formsReducer: state.formsReducer,isActive: state.steps.isActives};
}

const mapDispatchToProps = dispatch => {
  return {
    setActive: (e) => dispatch(nextStep(e)),
    addForm: formdetails => dispatch(addForm(formdetails))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyComp4);
