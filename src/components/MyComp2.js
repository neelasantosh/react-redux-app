import React, { Component } from 'react';
import { connect } from "react-redux";
import { Form, Input,Row } from 'formsy-react-components';
import { addForm, nextStep } from '../actions/index';
import validator from 'validator';
import { Popup } from 'semantic-ui-react';
import Icon from './Icons.js';
import moment from 'moment';

class MyComp2 extends Component{
  constructor(props){
    super(props)
    this.state = {
        name: '',
        email:'',
        dateofbirth: '',
        placeofbirth: '',
        fathername:'',
        mothername:'',
        spousename:'',
        formErrors: {name: '', email:'', dateofbirth: '',placeofbirth:'',fathername: '',mothername: '',spousename: ''},
        nameValid: false,
        emailValid:false,
        dateofbirthValid: false,
        motherValid:false,
        fatherValid:false,
        spouseValid:false,
        formValid: false,
        showForm2:true,
        showForm3:false,
        activeStep:'Personal',
        nameAlphaValid:false,
        spousenameAlphaValid:false,
        fathernameAlphaValid:false,
        mothernameAlphaValid:false
      }
  }

  handleUserInput = (e,f) => {
    const name = e;
    const value = f;
    this.validateField(name, value)
  }

  handleClick = (e) => {
    this.setState({target: e.target})
  };

  handleDateInput = (e, f) => {
    this.validateField('dateofbirth', f)
  }

  validateField = (fieldName, value) => {
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;
    let nameAlphaValid = this.state.nameAlphaValid;
    let dateofbirthValid = this.state.dateofbirthValid;
    let placeofbirthValid = this.state.placeofbirthValid;
    let motherValid = this.state.motherValid;
    let fatherValid =  this.state.fatherValid;
    let spouseValid =  this.state.spouseValid;
    let emailValid = this.state.emailValid;
    let fathernameAlphaValid = this.state.fathernameAlphaValid;
    let mothernameAlphaValid = this.state.mothernameAlphaValid;
    let spousenameAlphaValid = this.state.spousenameAlphaValid;

    switch(fieldName) {
      case 'name':
        nameValid = validator.isLength(value,{min:4,max: 60})
        fieldValidationErrors.name = nameValid ? '' : 'is invalid';
        nameAlphaValid = validator.isAlpha(value)
        fieldValidationErrors.name =  nameAlphaValid ? '' : 'is invalid '
        break;
      case 'dateofbirth':
        dateofbirthValid = value.length >= 6;
        fieldValidationErrors.dateofbirth = dateofbirthValid ? '': ' is too short';
        break;
      case 'placeofbirth':
        placeofbirthValid = validator.isAlpha(value);
        fieldValidationErrors.placeofbirth = placeofbirthValid ? '': 'is invalid';
        break;
      case 'fathername':
        fatherValid = validator.isLength(value,{min:4,max: 60})
        fieldValidationErrors.fathername = fatherValid ? '': 'is invalid';
        fathernameAlphaValid = validator.isAlpha(value)
        fieldValidationErrors.name =  fathernameAlphaValid ? '' : 'is invalid '
        break;
      case 'mothername':
        motherValid = validator.isLength(value,{min:4,max: 60});
        fieldValidationErrors.mothername = motherValid ? '': 'is invalid';
        mothernameAlphaValid = validator.isAlpha(value)
        fieldValidationErrors.name =  mothernameAlphaValid ? '' : 'is invalid '
        break;
      case 'spousename':
        spouseValid = validator.isLength(value,{min:4,max: 60});
        fieldValidationErrors.spousename = spouseValid ? '': 'is invalid';
        spousenameAlphaValid = validator.isAlpha(value)
        fieldValidationErrors.name =  spousenameAlphaValid ? '' : 'is invalid '
        break;
      case 'email':
        emailValid = validator.isEmail(value);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      default:
        null
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    nameValid: nameValid,
                    dateofbirthValid: dateofbirthValid,
                    fatherValid: fatherValid,
                    placeofbirthValid: placeofbirthValid,
                    motherValid:motherValid,
                    spouseValid:spouseValid,
                    emailValid: emailValid,
                    nameAlphaValid:nameAlphaValid,
                    fathernameAlphaValid:fathernameAlphaValid,
                    spousenameAlphaValid:spousenameAlphaValid,
                    mothernameAlphaValid:mothernameAlphaValid,
                    [fieldName]: value,
                  }, this.validateForm);
  }

  validateForm = () => {
    this.setState({formValid: this.state.nameValid});
  }

  errorClass = (error) => {
    return(error.length === 0 ? '' : 'has-error');
  }

  submitForm = (data) => {
    if(this.state.formValid){
      this.props.addForm(data)
      this.props.setActive('occupation')
    }else{
      alert("Wrong input")
    }
      this.setState({ lastname: ""});
  }

  render(){
    const {setActive, isActive} = this.props
    const popOverValidations = {
      name: (
          <div>
          <h4 className={this.state.nameValid ? "validator_title valid" : "validator_title invalid"}> NAME RULES </h4>
          <li className={this.state.nameValid ? "rules_list valid" : "rules_list"}>
            <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
            <i className="icon_invalid"> <Icon type="circle_error"/> </i>
            <span className="error_message">{this.state.nameValid ? "Valid length" : "Valid length"}</span>
          </li>
          <li className={this.state.nameAlphaValid ? "rules_list valid" : "rules_list"}>
            <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
            <i className="icon_invalid"> <Icon type="circle_error"/> </i>
            <span className="error_message">{this.state.nameAlphaValid ? "Valid char's" : "Valid char's"}</span>
          </li>
          </div>
      ),
      email: (
          <div>
          <h4 className={this.state.emailValid ? "validator_title valid" : "validator_title invalid"}> Email RULES </h4>
          <li className={this.state.emailValid ? "rules_list valid" : "rules_list"}>
            <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
            <i className="icon_invalid"> <Icon type="circle_error"/> </i>
            <span className="error_message">{this.state.emailValid ? "Valid email" : "Invalid"}</span>
          </li>
          </div>
      ),
      dob:(
        <div>
        <h4 className={this.state.dateofbirthValid ? "validator_title valid" : "validator_title invalid"}> DOB RULES </h4>
        <li className={this.state.dateofbirthValid ? "rules_list valid" : "rules_list"}>
          <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
          <i className="icon_invalid"> <Icon type="circle_error"/> </i>
          <span className="error_message">{this.state.dateofbirthValid ? "Valid dob" : "Invalid"}</span>
        </li>
        </div>
      ),
      pob:(
        <div>
        <h4 className={this.state.placeofbirthValid ? "validator_title valid" : "validator_title invalid"}>PLACE OF RULES </h4>
        <li className={this.state.placeofbirthValid ? "rules_list valid" : "rules_list"}>
          <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
          <i className="icon_invalid"> <Icon type="circle_error"/> </i>
          <span className="error_message">{this.state.placeofbirthValid ? "Valid place" : "Valid place"}</span>
        </li>
        </div>
      ),
      fathername:(
        <div>
        <h4 className={this.state.fatherValid ? "validator_title valid" : "validator_title invalid"}>FATHER NAME RULES </h4>
        <li className={this.state.fatherValid ? "rules_list valid" : "rules_list"}>
          <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
          <i className="icon_invalid"> <Icon type="circle_error"/> </i>
          <span className="error_message">{this.state.fatherValid ? "Valid length" : "Valid length"}</span>
        </li>
        <li className={this.state.fathernameAlphaValid ? "rules_list valid" : "rules_list"}>
          <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
          <i className="icon_invalid"> <Icon type="circle_error"/> </i>
          <span className="error_message">{this.state.fathernameAlphaValid ? "Valid father name" : "Valid father name"}</span>
        </li>
        </div>
      ),
      mothername:(
        <div>
        <h4 className={this.state.motherValid ? "validator_title valid" : "validator_title invalid"}> MOTHER NAME RULES </h4>
        <li className={this.state.motherValid ? "rules_list valid" : "rules_list"}>
          <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
          <i className="icon_invalid"> <Icon type="circle_error"/> </i>
          <span className="error_message">{this.state.motherValid ? "Valid length" : "Valid length"}</span>
        </li>
        <li className={this.state.mothernameAlphaValid ? "rules_list valid" : "rules_list"}>
          <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
          <i className="icon_invalid"> <Icon type="circle_error"/> </i>
          <span className="error_message">{this.state.mothernameAlphaValid ? "Valid mother name" : "Valid mother name"}</span>
        </li>
        </div>
      ),
      spousename:(
        <div>
        <h4 className={this.state.spouseValid ? "validator_title valid" : "validator_title invalid"}> SPOUSE NAME RULES </h4>
        <li className={this.state.spouseValid ? "rules_list valid" : "rules_list"}>
          <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
          <i className="icon_invalid"> <Icon type="circle_error"/> </i>
          <span className="error_message">{this.state.spouseValid ? "Valid length" : "Valid length"}</span>
        </li>
        <li className={this.state.spousenameAlphaValid ? "rules_list valid" : "rules_list"}>
          <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
          <i className="icon_invalid"> <Icon type="circle_error"/> </i>
          <span className="error_message">{this.state.spousenameAlphaValid ? "Valid spouse name" : "Valid spouse name"}</span>
        </li>
        </div>
      )
    }

    return(
      <div className="container">
        <Form  onSubmit={this.submitForm} className="custom-classname-is-rendered Form1">
            <Popup
              trigger={
                <Input
                  name="name"
                  label="Name"
                  type="text"
                  value={this.state.name}
                  onChange={this.handleUserInput}
                  autoComplete="off"
                  placeholder="Enter Name."
                  onClick={this.handleClick}
                  validations={{minLength: 5, maxLength:60}}
                  validationErrors={{
                    minLength: 'Please provide correct name.',
                    maxLength: 'Please provide correct name.'
                  }}
                  required
                />
              }
              content={popOverValidations.name}
              position='right center'
              on='focus'
            />
            <Popup
              trigger={
                <Input
                  name="email"
                  label="Email"
                  type="text"
                  value={this.state.email}
                  onChange={this.handleUserInput}
                  autoComplete="off"
                  placeholder="Enter your login email."
                  validations="isEmail"
                  validationError="This is not a valid email"
                  onClick={this.handleClick}
                  required
                />
              }
              content={popOverValidations.email}
              on='focus'
              position="right center"
            />

          <div className="form-group row">
            <label className="control-label col-sm-3">Date of Birth <span class="required-symbol"> *</span> </label>

            {/*<Input
                name="dateofbirth"
                value={this.state.dob}
                onChange={this.handleUserInput}
                label="Date of birth"
                type="date"
                placeholder="Enter your date of birth"
                onClick={this.handleClick}
                required
              />
            <div className="col-sm-9">
              <DatePicker name="dateofbirth" dateFormat="YYYY-MM-DD" value={this.state.dateofbirth} onChange={this.handleDateInput} required/>
            </div>*/}
          </div>
          <Popup
            trigger={
              <Input
                name="placeofbirth"
                label="Place of Birth"
                type="text"
                value={this.state.placeofbirth}
                onChange={this.handleUserInput}
                autoComplete="off"
                placeholder="Enter your place of birth"
                validations={{minLength: 5, maxLength:60}}
                validationErrors={{
                  minLength: 'Please provide correct name.',
                  maxLength: 'Please provide correct name.'
                }}
                required
              />
            }
            content={popOverValidations.pob}
            on='focus'
            position="right center"
          />
          <Popup
            trigger={
              <Input
                name="fathername"
                label="Father's name"
                type="text"
                value={this.state.fathername}
                onChange={this.handleUserInput}
                autoComplete="off"
                placeholder="Enter your father name"
                validations={{minLength: 5, maxLength:60}}
                validationErrors={{
                  minLength: 'Please provide correct name.',
                  maxLength: 'Please provide correct name.'
                }}
                required
              />
            }
            content={popOverValidations.fathername}
            on='focus'
            position="right center"
          />
          <Popup
            trigger={
              <Input
                name="mothername"
                label="Mother's name"
                type="text"
                value={this.state.mothername}
                onChange={this.handleUserInput}
                autoComplete="off"
                placeholder="Enter your mother name"
                validations={{minLength: 4, maxLength:60}}
                validationErrors={{
                  minLength: 'Please provide correct name.',
                  maxLength: 'Please provide correct name.'
                }}
                required
              />
            }
            content={popOverValidations.mothername}
            on='focus'
            position="right center"
          />
          <Popup
            trigger={
              <Input
                name="spousename"
                label="Spouse name"
                type="text"
                value={this.state.spousename}
                onChange={this.handleUserInput}
                autoComplete="off"
                placeholder="Enter your spouse name"
                validations={{minLength: 5, maxLength:60}}
                validationErrors={{
                  minLength: 'Please provide correct name.',
                  maxLength: 'Please provide correct name.'
                }}
              />
            }
            content={popOverValidations.spousename}
            on='focus'
            position="right center"
          />
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
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyComp2);
