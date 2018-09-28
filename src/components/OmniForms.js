import React, { Component } from 'react';
import { Step } from 'semantic-ui-react';
import MyComp1 from './MyComp1.js'
import { nextStep } from '../actions'
import { connect } from "react-redux";
import MyComp2 from './MyComp2';
import MyComp3 from './MyComp3';
import MyComp4 from './MyComp4';
import MyComp5 from './MyComp5';
import MyComp6 from './MyComp6';
import MyComp7 from './MyComp7';

const mapStateToProps = state => {
  return { isActive: state.steps.isActive }
}


class OmniForm extends Component {
  render() {
    const {setActive, isActive} = this.props
    return(
      <div className="container omniform">
        <Step.Group size='small' widths={8}>
          <Step id='login' onClick={setActive} active={isActive === 'login' ? true : false}>
             <Step.Content>
               <Step.Title className="stepTitle">Pan Card</Step.Title>
               <Step.Description className="stepDescription">Choose Pan Card</Step.Description>
             </Step.Content>
          </Step>

          <Step id='personal' active={isActive === 'personal' ? true : false} onClick={setActive}>
             <Step.Content>
               <Step.Title className="stepTitle">Personal Info</Step.Title>
               <Step.Description className="stepDescription">Choose Personal Info</Step.Description>
             </Step.Content>
          </Step>

          <Step onClick={setActive} id='occupation' active={isActive === 'occupation' ? true : false}>
            <Step.Content>
              <Step.Title className="stepTitle">Occupation</Step.Title>
              <Step.Description className="stepDescription">Choose Occupation</Step.Description>
            </Step.Content>
          </Step>

          <Step onClick={setActive} id="Assessee" active={isActive === 'Assessee' ? true : false}>
            <Step.Content>
              <Step.Title className="stepTitle">Assessee</Step.Title>
              <Step.Description className="stepDescription">Choose Assessee</Step.Description>
            </Step.Content>
          </Step>

          <Step onClick={setActive} id="Address" active={isActive === 'Address' ? true : false}>
            <Step.Content>
              <Step.Title className="stepTitle">Address</Step.Title>
              <Step.Description className="stepDescription">Choose Address</Step.Description>
            </Step.Content>
          </Step>

          <Step onClick={setActive} id="Bankdetails" active={isActive === 'Bankdetails' ? true : false}>
            <Step.Content>
              <Step.Title className="stepTitle">Bank Details</Step.Title>
              <Step.Description className="stepDescription">Choose Bank Details</Step.Description>
            </Step.Content>
          </Step>

          <Step onClick={setActive} id="DematMode" active={isActive === 'DematMode' ? true : false}>
            <Step.Content>
              <Step.Title className="stepTitle">Demat Mode</Step.Title>
              <Step.Description className="stepDescription">Choose Demat Mode</Step.Description>
            </Step.Content>
          </Step>
        </Step.Group>

        {(() => {
          switch(isActive){
            case 'login':
              return <MyComp1 />
              break;
            case 'personal':
              return <MyComp2 />
              break;
            case 'occupation':
              return <MyComp3 />
              break;
            case 'Assessee':
              return <MyComp4 />
              break;
            case 'Address':
              return <MyComp5 />
              break;
            case 'Bankdetails':
              return <MyComp6 />
              break;
            case 'DematMode':
              return <MyComp7 />
              break;
            default:
              return 'Error'
          }
        })()}
      </div>
    )
  }
}


const mapDispatchToProps = dispatch => {
  return {
    setActive: (e) => dispatch(nextStep(e.target.id))
  };
};

const OmniForms = connect(mapStateToProps, mapDispatchToProps)(OmniForm)

export default OmniForms
