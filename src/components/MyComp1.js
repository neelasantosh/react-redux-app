import React, { Component } from 'react';
import { connect } from "react-redux";
import { Form, Input, Row } from 'formsy-react-components';
import { addForm, nextStep } from '../actions/index';
import validator from 'validator';
import { Popup } from 'semantic-ui-react';
import Icon from './Icons.js'

class MyComp1 extends Component{
  constructor(props){
    super(props)
    this.state = {
      pancard:'',
      pancardValid: false,
      pancardLengthValid:false,
      pancardSpecialValid:false,
      formValid: false,
      formErrors: {pancard: ''},
    }
  }


  handleUserInput = (e,f) => {
    const name = e;
    const value = f
    this.validateField(name, value)
  }

  handleClick = (e) => {
    this.setState({ target: e.target });
  };

  validateField = (fieldName, value) => {
    let fieldValidationErrors = this.state.formErrors;
    let pancardValid = this.state.pancardValid;
    let pancardLengthValid = this.state.pancardLengthValid
    let pancardSpecialValid = this.state.pancardSpecialValid
    switch(fieldName) {
      case 'pancard':
        // pancardValid = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/.test(value);
        pancardValid = validator.isAlphanumeric(value)
        fieldValidationErrors.pancard = pancardValid ? '' : ' is invalid';
        pancardLengthValid = validator.isLength(value,{min:10,max: 10})
        fieldValidationErrors.pancard = pancardLengthValid ? '' : 'is invalid';
        pancardSpecialValid = validator.blacklist(value,!/[^a-zA-Z0-9]/)
        fieldValidationErrors.pancard = pancardSpecialValid ? '' :'is invalid'
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    pancardValid: pancardValid,
                    pancardLengthValid:pancardLengthValid,
                    pancardSpecialValid:pancardSpecialValid,
                    [fieldName]: value,
                  }, this.validateForm);
  }

  validateForm = () => {
    this.setState({formValid: this.state.pancardValid && this.state.pancardLengthValid && this.state.pancardSpecialValid});
  }

  errorClass = (error) => {
    return(error.length === 0 ? '' : 'has-error');
  }

  submitForm = (data) => {
    if(this.state.formValid){
      this.props.addForm(data)
      this.props.setActive('personal')
//      this.setState({ pancard: ""});
    }else{
      alert("Wrong Input")
    }
  }


  render(){
    const {setActive, isActive} = this.props
    const popoverHoverFocus = (
      <div>
        <h4 className={this.state.pancardValid ? "validator_title valid" : "validator_title invalid"}> PANCARD RULES </h4>
        <li className={this.state.pancardValid ? "rules_list valid" : "rules_list"}>
          <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
          <i className="icon_invalid"> <Icon type="circle_error"/> </i>
          <span className="error_message">{this.state.pancardValid ? "Aplhanumeric" : " AlphaNumeric"}</span>
        </li>
        <li className={this.state.pancardLengthValid ? "rules_list valid" : "rules_list"}>
          <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
          <i className="icon_invalid"> <Icon type="circle_error"/> </i>
          <span className="error_message">{this.state.pancardLengthValid ? "10 Digits" : "10 Digits"}</span>
        </li>
        <li className={this.state.pancardSpecialValid ? "rules_list valid" : "rules_list"}>
          <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
          <i className="icon_invalid"> <Icon type="circle_error"/> </i>
          <span className="error_message">{this.state.pancardSpecialValid ? "No Special Char's" : "No Special Char's"}</span>
        </li>
      </div>
    );

    return(
      <div className="container">
        <Form onSubmit={this.submitForm} className="custom-classname-is-rendered Form1" >
          <Popup
             trigger={
               <Input
                 name="pancard"
                 label="Pancard Number"
                 type="text"
                 value={this.state.pancard}
                 onChange={this.handleUserInput}
                 onClick={this.handleClick}
                 autoComplete="off"
                 placeholder="Enter pancard number"
                 help="This field should not autocomplete."
                 validations={{isLength: 10}}
                 validationErrors={{
                   isLength: 'Please provide correct pancard number.',
                 }}
                 required
              />
             }
             position='right center'
             content={popoverHoverFocus}
             on='focus'
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
                 id='personal'
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


export default connect(mapStateToProps, mapDispatchToProps)(MyComp1);
