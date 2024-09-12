import React, { useEffect, useRef, useState } from 'react';
import Stepper from './stepper';
import Button from './submitButton';
import ApplicationForm from './form';
import './RequestFunds.css';
import {useNavigate} from "react-router-dom";


const RequestFunds  = () => {
  const steps = ['Contact Information', 'About the Project', 'Approval'];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (currentStep === steps.length) {
      setComplete(true);
      navigate('/');
      

    } else {
      setCurrentStep((prev) => prev + 1);
       
    }

  };


    return (
      <div className='bodyContainer'>
        <p class="application-form-title">Application Form</p>
        <div className="stepperContainer">
           <Stepper currentStep={currentStep} steps={steps} complete={complete}/>
        </div>
        <div className="formContainer">
          <ApplicationForm currentStep={currentStep} />
        </div>
        {!complete && (
        <div className="buttonContainer">
          <Button onClick={handleButtonClick}>
            {currentStep === steps.length ? 'Submit' : 'Next'}
          </Button>
        </div>
      )}
        
      </div>
    )
  }
  
  export default RequestFunds

