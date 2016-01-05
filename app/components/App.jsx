import uuid from 'node-uuid';
import React from 'react';
import Notes from './Notes.jsx';
import { Button } from 'react-bootstrap';

export default class App extends React.Component {

  constructor(props) { 
    super(props);

    this.state = {
      notes : [
      {
        id: uuid.v4(),
        task: 'Learn webpack'
      },
      {
        id: uuid.v4(),
        task: 'Learn React'
      },
      {
        id: uuid.v4(),
        task: 'Do laundry'
      }
      ]
    };
  }

  render() {

    const notes = this.state.notes;

    return (
      <div className="container">
        <div className="page-header">
          <Button className="add-note" bsStyle="primary" bsSize="xsmall" onClick={this.addNote}>+</Button>
          <Notes notes={notes} onEdit={this.editNote} onDelete={this.deleteNote} />
        </div>
      </div>
      );  
  }

  addNote = () => {
    this.setState({
      notes: this.state.notes.concat([{
        id: uuid.v4(),
        task: 'New task'
      }])
    });
  }

  editNote = (id, task) => {
    const notes = this.state.notes.map((note) => {
      if (note.id === id) {
        note.task = task;
      }

      return note;
    });

    this.setState({notes});
  }

  deleteNote = (id) => {
    this.setState({
      notes: this.state.notes.filter((note) => note.id !== id)});
  }
}
