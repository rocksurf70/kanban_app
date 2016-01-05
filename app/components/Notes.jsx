import React from 'react';
import Note from './Note.jsx';

export default ({notes, onEdit}) => {
  return (
    <ul className="notes">{notes.map((note) => {
      return (
        <li className="note" key={note.id}>
          <Note task={note.task} onEdit={onEdit.bind(null, note.id)} />
        </li>
        );
    })}
    </ul>
  );
}
