import React, { useState } from 'react';
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
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    
    leader: '',
    teamMembers: [],
    contactInfo: {
      email: '',
      phone: '',
    },
    projectInfo: {
      projectTitle: '',
      projectDescription: '',
      goal: '',
      risks: '',
      projectType: '',
      startingDate: '',
      completionDate: '',
    },
    supervisor: {
      name: '',
      email: '',
    },
    budgetDetails: null,
    isChecked: false
  });

  

  const handleButtonClick = () => {
    if (currentStep === steps.length) {
      setComplete(true);

      // Submit the form
      submitFormData();

      navigate('/');

    } else {
      setCurrentStep((prev) => prev + 1);
       
    }

  };

  const handleFormDataChange = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const submitFormData = async () => {
    // try {
    //   const response = await axios.post('/api/fundreq', formData);
    //   if (response.data.success) {
    //     console.log('Fund request submitted successfully');
    //   } else {
    //     console.log('Failed to submit the request', response.data.message);
    //   }
    // } catch (error) {
    //   console.error('Error submitting form:', error);
    // }
  };




    return (
      <div className='bodyContainer'>
        <p className="application-form-title">Application Form</p>
        <div className="stepperContainer">
           <Stepper currentStep={currentStep} steps={steps} complete={complete}/>
        </div>
        <div className="formContainer">
          <ApplicationForm currentStep={currentStep} onFormDataChange={handleFormDataChange} formData={formData}/>
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

