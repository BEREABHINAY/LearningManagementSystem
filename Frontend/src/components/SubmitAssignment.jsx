import React, { useState } from 'react';

function SubmitAssignment() {
  const [file, setFile] = useState(null);
  const [comments, setComments] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting assignment:', { file, comments });
    // API call or other logic here
  };

  return (
    <main>
      <h2>Submit Assignment</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="file">Upload File</label>
        <input type="file" id="file" name="file" onChange={handleFileChange} required />

        <label htmlFor="comments">Comments</label>
        <textarea
          id="comments"
          name="comments"
          rows="4"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        ></textarea>

        <button type="submit">Submit Assignment</button>
      </form>
    </main>
  );
}

export default SubmitAssignment;