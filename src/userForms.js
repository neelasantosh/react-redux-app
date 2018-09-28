
import React, { Component } from 'react';
import { Control, Form, actions } from 'react-redux-form';

export default class UserForms extends Component {

  handleSubmit(user) {
    console.log(user);
  }

  render() {
    return (
      <Form
        model="user"
        onSubmit={(user) => this.handleSubmit(user)}
      >
        <label htmlFor="user.mothername">Mother name:</label>
        <Control.text model="user.mothername" id="user.mothername" />

        <label htmlFor="user.fathername">Father name:</label>
        <Control.text model="user.fathername" id="user.fathername" />

        <button type="submit">
          Submit
        </button>
      </Form>
    );
  }
}
