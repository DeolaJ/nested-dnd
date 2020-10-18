/* eslint-disable max-lines-per-function */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import Regular from './regular';

const RowField = ({
  id, index, ctrl, rowId, deleteRowField,
}) => {
  return (
    <Draggable
      draggableId={id}
      index={index}
    >
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          // isDragging={snapshot.isDragging}
        >
          <Regular
            ctrl={ctrl}
          />
          <button type="button" onClick={() => deleteRowField(rowId, index)}>
            Delete field
          </button>
        </div>
      )}
    </Draggable>
  );
};

RowField.defaultProps = {
  id: '',
  index: -1,
  rowInternalId: '',
  deleteRowField: () => null,
  ctrl: {},
};

RowField.propTypes = {
  id: PropTypes.string,
  index: PropTypes.number,
  ctrl: PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.string,
    controls: PropTypes.array,
    title: PropTypes.string,
  }),
  rowInternalId: PropTypes.string,
  deleteRowField: PropTypes.func,
};

export default RowField;
