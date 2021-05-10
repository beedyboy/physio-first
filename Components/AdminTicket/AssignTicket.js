import React, { Fragment, useContext, useEffect, useState } from 'react'
import UserStore from '../../../stores/UserStore';
import TicketStore from '../../../stores/TicketStore';
import { observer } from 'mobx-react';
import{ Button, Card, CardBody, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, ModalFooter, Row, Col } from 'reactstrap';  

const AssignTicket = ({ticket, open, handleClose}) => {
    const userStore = useContext(UserStore);
    const tickStore = useContext(TicketStore);
    const { info:users, fetchUsers} = userStore;  
    const [formState, setFormState] = useState({
        assigned_to: '',
        ticket_id: ''
    });
    const { assignTicket, sending, close, toggleClose } = tickStore;
    useEffect(() => {
        fetchUsers(); 
      }, [])
       
      useEffect(() => { 
            setFormState(state => ({
                ...state,
                ticket_id: ticket
            }))
      }, [ticket]);

      useEffect(() => {
        if(close === true) { 
         handleClose(); 
        }
        return() => {
          toggleClose()
        }
      }, [close])  
const handleChange = e => {   
    setFormState(state => ({
        ...state,
        assigned_to: e.target.value
    }))
  }
const handleSubmit = e => {
    e.preventDefault();
    assignTicket(formState)
}
const closeBtn = <Button className="close" onClick={handleClose}>&times;</Button>;
 
    return (
        <Fragment>
          <Modal isOpen={open} toggle={handleClose}>
            <ModalHeader toggle={handleClose} close={closeBtn}>Assign Staff</ModalHeader>
         <form noValidate autoComplete="off"  onSubmit={handleSubmit}> 
    <ModalBody>
    <Card>
      <CardBody>  
          <Row> 
          <Col md="12">  
              <FormGroup >
            <Label for="status">Staff</Label> 
               <Input
                 type="select"
                 name="assigned_to"
                 value={formState.assigned_to || ''} 
                 onChange={handleChange}   
                 users={users} 
             >
                 <option value="">Select One</option>
                 {users && users.map((user) =>(
                      <option key={user.id} value={user.id}>{`${user.firstname} ${user.lastname} `}</option>
                 ))}
             </Input>
          </FormGroup> 
              </Col>
          </Row>
     </CardBody>
    </Card> 
    </ModalBody>
    <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
            Close
        </Button> {" "}
        <Button color="primary" disabled={ sending}  type="submit">
        {sending ? (
            <span> Saving changes  <i className="fa fa-spinner"></i></span>
            ): 'Save changes'}
        </Button>
    </ModalFooter>
      </form>
</Modal>
          
        </Fragment>
    )
}

export default observer(AssignTicket)
