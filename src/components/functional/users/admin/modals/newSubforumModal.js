import React, { useState } from 'react';
import propTypes from 'prop-types';

const NewSubforumModal = ({ forum, handleFormReset }) => {
  const [subforumName, setSubforumName] = useState('');

  // Handle adding a new Subforum
  const handleNewSubforum = e => {
    e.preventDefault();
    console.log('New Sub Forum');
    handleFormReset();
  };

  return (
    <form className="modal-form" onSubmit={handleNewSubforum}>
      <h3 className="text-center">New Subforum</h3>
      <h3 className="text-camel text-grey">{`Forum - ${forum.forum}`}</h3>
      <h4>Subforum Name</h4>
      <input
        type="text"
        value={subforumName}
        onChange={e => setSubforumName(e.target.value)}
        minLength="3"
        required
      />
      <button type="submit">Add new Subforum</button>
    </form>
  );
};

NewSubforumModal.propTypes = {
  forum: propTypes.instanceOf(Object).isRequired,
  handleFormReset: propTypes.func.isRequired,
};

export default NewSubforumModal;
