import React from 'react';


const ContactInfo= () => {
  return (
    <div className="formSection">
      <p className="contact-info-title">Contact Information</p>
      <div className="form-row">
        <div className="form-label">
          <label htmlFor="name">Full names of the Applicants</label>
        </div>
        <div className="form-input">
          {[...Array(5)].map((_, index) => (
            <input
              key={index}
              type="text"
              id={`name${index}`}
              name={`name${index}`}
              className="form-control"
            />
          ))}
        </div>
      </div>

      <div className="form-row">
        <div className="form-label">
          <label htmlFor="regname">Lead's Name</label>
        </div>
        <div className="form-input">
          <input type="text" id="regname" name="regname" className="form-control" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-label">
          <label htmlFor="email">Email Address</label>
        </div>
        <div className="form-input">
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            placeholder="Enter your email"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-label">
          <label htmlFor="contactNo">Contact Number</label>
        </div>
        <div className="form-input">
          <input
            type="tel"
            id="contactNo"
            name="contactNo"
            className="form-control"
            placeholder="0xx-xxxxxxx"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;




