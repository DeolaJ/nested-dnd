/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-lines-per-function */
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import Row from './row';
import Regular from './regular';

const FieldCard = ({
  type, ctrl, index, elementType, newFieldClicked, deleteField,
  deleteRowField,
}) => {
  switch (type) {
    case 'element': {
      return (
        <Draggable
          draggableId={elementType}
          index={index}
        >
          {(provided, snapshot) => (
            <>
              <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                // isDragging={snapshot.isDragging}
                className="elementWrapper"
                onClick={() => {
                  const isRow = elementType === 'row';
                  newFieldClicked(isRow);
                }}
              >
                <p>{elementType}</p>
              </div>
              {/* {
                snapshot.isDragging && (
                  <div className="elementWrapper">
                    <p>{ctrl.props.title}</p>
                  </div>
                )
              } */}
            </>
          )}
        </Draggable>
      );
    }

    case 'field': {
      const Fields = {
        row: Row,
        regular: Regular,
      };
      const FieldComponent = Fields[ctrl.type];
      return (
        <Draggable
          draggableId={ctrl.id}
          index={index}
        >
          {(provided, snapshot) => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              // isDragging={snapshot.isDragging}
              className="fieldWrapper"
            >
              <FieldComponent
                ctrl={ctrl}
                deleteRowField={deleteRowField}
              />
              <button type="button" onClick={() => deleteField(ctrl)}>
                Delete field
              </button>
            </div>
          )}
        </Draggable>
      );
    }

    default: return null;
  }
};

FieldCard.defaultProps = {
  elementType: '',
  id: '',
  index: 0,
  deleteField: () => null,
  newFieldClicked: () => null,
  ctrl: {},
};

FieldCard.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string,
  index: PropTypes.number,
  ctrl: PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.string,
    controls: PropTypes.array,
    title: PropTypes.string,
  }),
  elementType: PropTypes.string,
  deleteField: PropTypes.func,
  deleteRowField: PropTypes.func,
  newFieldClicked: PropTypes.func,
};

export default FieldCard;
