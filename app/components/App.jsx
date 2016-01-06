import AltContainer from 'alt-container';
import React from 'react';
import Notes from './Notes.jsx';
import { Button } from 'react-bootstrap';

import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

export default class App extends React.Component {

  render() {

    const notes = this.state.notes;

    return (
      <div className="container">
        <div className="page-header">
          <Button className="add-note" bsStyle="primary" bsSize="xsmall" onClick={this.addNote}>+</Button>
					<AltContainer
						stores={[NoteStore]}
						inject={{
							notes: () => NoteStore.getState().notes
						}}
					>
            <Notes notes={notes} onEdit={this.editNote} onDelete={this.deleteNote} />
   				</AltContainer>
        </div>
      </div>
      );  
  }

  addNote() {
		NoteActions.create({task: 'New task'});
  }

	editNote(id, task) {
		NoteActions.update({id, task});
	}

	deleteNote(id) {
		NoteActions.delete(id);
	}
}
