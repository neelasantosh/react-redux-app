import React from 'react';
import { Control, Form, actions } from 'react-redux-form';
import UserForms from './userForms.js'

class UserForm extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div>
        <Form
          model="user"
        >
          <label htmlFor="user.firstName">First name:</label>
          <Control.text model="user.firstName" id="user.firstName" />

          <label htmlFor="user.lastName">Last name:</label>
          <Control.text model="user.lastName" id="user.lastName" />

        </Form>
        <UserForms />
      </div>
    );
  }
}

export default UserForm;
