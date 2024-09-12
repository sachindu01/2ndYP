import React from 'react';
import ContactInfo from './contactInfo';
import AboutProjetc from './aboutProject';
import Approval from './approval';
import './form.css';

const ApplicationForm = ({ currentStep }) => {
  return (
    <div>
      {currentStep === 1 && (
        <div>
          <ContactInfo/>
        </div>
      )}
      {currentStep === 2 && (
        <div>
          <AboutProjetc/>
        </div>
      )}
      {currentStep === 3 && (
        <div>
          <Approval/>
        </div>
      )}
    </div>
  );
};

export default ApplicationForm;
