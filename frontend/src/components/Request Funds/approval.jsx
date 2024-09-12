import React from 'react';


const Approval= () => {
  return (
    <div className="container">
        <p class="contact-info-title">Approval of the Project</p>

        <p class="contact-info-lecturer">Information about the Lecture In-charge</p>
        
      <div className="form-row">
        <div className="form-label">
          <label htmlFor="lecturer_name">Name</label>
        </div>
        <div className="form-input">
            <input type="text" id="lecturer_name" name="lecturer_name" className="form-control" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-label">
          <label htmlFor="lecturer_email">Email Address</label>
        </div>
        <div className="form-input">
            <input type="text" id="lecturer_email" name="lecturer_email" className="form-control" />
        </div>
      </div>


    </div>

);
};

export default Approval;