import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import FormModal from '../components/Modal/FormModal';

const Events = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return ( 
    <React.Fragment>
      <Button variant="dark" onClick={handleShow}>Add Event</Button>
      <FormModal 
        title="Add New Event"
        btnName="submit"
        show={show}
        handleClose={handleClose}
      />
    </React.Fragment>
   );
}
 
export default Events;