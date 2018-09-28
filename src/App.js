import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux';
import {nextStep} from './actions/index.js';
import OmniForms from './components/OmniForms';
import * as TodoActions from './actions'

class App extends Component {
  render() {
    return (
      <div className="App">
        <OmniForms />
      </div>
    );
  }
}

// function mapStateToProps(state, ownProps) {
//   return {
//     isActive:state.steps.isActive
//   };
// }
//
// const mapDispatchToProps = dispatch => ({
//   setActive: () => {
//     dispatch(nextStep)
//   }
// })

//export default connect(mapStateToProps,mapDispatchToProps)(App);
export default App;
