import React from 'react';

const AboutProject= () => {
  return (
    <div className="container">
        <p class="contact-info-title">About Project</p>
      <div className="form-row">
        <div className="form-label">
          <label htmlFor="projectname">Project Title</label>
        </div>
        <div className="form-input">
            <input type="text" id="projectname" name="projectname" className="form-control" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-label">
          <label htmlFor="description">Project Description</label>
        </div>
        <div className="form-input">
        <textarea id="description" name="description" className="form-control" style={{height: '50px'}}></textarea>
        </div>
      </div>

      <div className="form-row">
        <div className="form-label">
          <label htmlFor="goals">What are the project goals and how they will be reached</label>
        </div>
        <div className="form-input">
            <textarea id="goals" name="goals" className="form-control" style={{height: '100px'}}></textarea>
        </div>
      </div>

      <div className="form-row">
        <div className="form-label">
          <label htmlFor="risks">What are the risks that would have an impact on the successful delivery of the project and what is your plan to overcome them?</label>
        </div>
        <div className="form-input">
            <textarea id="risks" name="risks" className="form-control" style={{height: '150px'}}></textarea>
        </div>
      </div>

      <div className="form-row">
        <div className="form-label">
          <label htmlFor="projectType">Project Type</label>
        </div>
        <div className="form-input">
          <div className="radio-group">
            <div className="radio-item">
              <input type="radio" id="coursework" name="projectType" value="1" />
              <label htmlFor="coursework">Coursework</label>
            </div>
            <div className="radio-item">
              <input type="radio" id="competition" name="projectType" value="2" />
              <label htmlFor="competition">Competition</label>
            </div>
            <div className="radio-item">
              <input type="radio" id="hobby" name="projectType" value="3" />
              <label htmlFor="hobby">Hobby</label>
            </div>
            <div className="radio-item">
              <input type="radio" id="other" name="projectType" value="4" />
              <label htmlFor="other">Other</label>
            </div>
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="form-label">
          <label htmlFor="startingDate">The Expected Starting Date</label>
        </div>
        <div className="form-input">
                <input type="date" id="startingDate" name="startingDate" className='date-input' />
            </div>
        </div>

        <div className="form-row">
        <div className="form-label">
          <label htmlFor="endingDate">When will your project be completed</label>
        </div>
        <div className="form-input">
          <input type="date" id="endingDate" name="endingDate" className='date-input'/>
        </div>
      </div>

      <div className="form-row">
        <div className="report">
          <label>
            How much will it cost to complete the project? Attach a detailed budget report (estimated cost of equipment) and clarify the requirements of the purchasing equipment.
          </label>
          <span className="error-text">
            Note: Applications submitted without this information cannot be considered for funding.
          </span>
          <p className="file-instructions">
            Attach the budget report in the .pdf format, 10MB max
          </p>
          <input type="file" id="fileInput" accept=".pdf" className='pdf-input' />
        </div>
      </div>

      <div className="form-row">
        <div className="report">
          <input type="checkbox" id="isChecked" name="isChecked" />
          <label htmlFor="isChecked" style={{paddingLeft: '15px'}}>I, the Project Lead hereby confirm the above-mentioned information is accurate as per my understanding.</label>
        </div>
    </div>

           

    </div>
  );
};

export default AboutProject;