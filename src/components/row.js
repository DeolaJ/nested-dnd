/* eslint-disable max-lines */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-lines-per-function */
import React from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import RowField from './row-field';

const Row = ({
  ctrl, deleteRowField,
}) => {
  return (
    <div
      className="row"
    >
      <div
        style={{
          position: 'absolute',
          right: '0',
          top: '0',
          height: '30px',
          width: '30px',
          background: 'red',
        }}
      />
      <Droppable
        droppableId={`${ctrl.id} row`}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            // isDraggingOver={snapshot.isDraggingOver}
          >
            {
              ctrl.controls.length > 0
              && ctrl.controls.map((rowCtrl, index) => {
                return (
                  <RowField
                    key={rowCtrl.id}
                    id={rowCtrl.id}
                    index={index}
                    ctrl={rowCtrl}
                    rowId={ctrl.id}
                    deleteRowField={deleteRowField}
                  />
                );
              })
            }
            {/* {
              <DummyRowComponent />
            } */}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

Row.propTypes = {
  ctrl: PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.string,
    controls: PropTypes.array,
    title: PropTypes.string,
  }).isRequired,
  deleteRowField: PropTypes.func.isRequired,
};

export default Row;
