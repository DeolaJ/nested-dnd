/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-lines-per-function */
import React from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import FieldCard from './field-card';

const Sidebar = ({
  newFieldClicked,
}) => {
  const elementsArray = ['regular', 'row'];

  return (
    <div className="sidebar">
      <Droppable
        droppableId="elements-tab"
        isDropDisabled
      >
        {(provided) => (
          <div
            className="element-tab-wrapper"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {
              elementsArray.map((element, index) => (
                <React.Fragment key={element}>
                  <FieldCard
                    type="element"
                    elementType={element}
                    index={index}
                    newFieldClicked={newFieldClicked}
                  />
                </React.Fragment>
              ))
            }
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

Sidebar.propTypes = {
  newFieldClicked: PropTypes.func.isRequired,
};

export default Sidebar;
