import AltContainer from 'alt-container';
import React from 'react';
import { Button } from 'react-bootstrap';

import Lanes from './Lanes.jsx';
import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';

export default class App extends React.Component {

  render() {

    return (
      <div className="container">
        <div className="page-header">
          <Button className="add-lane" bsStyle="primary" bsSize="xsmall" onClick={this.addItem}>+</Button>
					<AltContainer
						stores={[LaneStore]}
						inject={{
							lanes: () => LaneStore.getState().lanes || []
						}}
					>
						<Lanes />
   				</AltContainer>
        </div>
      </div>
      );  
	}

	addItem() {
		LaneActions.create({name: 'New Lane'});
 	}
}
