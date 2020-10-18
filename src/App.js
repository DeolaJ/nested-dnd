/* eslint-disable max-lines-per-function */
import React, { useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { DragDropContext } from 'react-beautiful-dnd';
import Sidebar from './components/sidebar';
import DropPage from './components/drop-page';
import './App.scss';

const App = () => {
  const [pageElements, setPageElements] = useState({
    elements: {},
    elementIds: [],
  });
  const [fieldsListKey, setFieldsListKey] = useState(1);

  const newFieldDragged = (result) => {
    const { destination, draggableId } = result;
    const isRow = draggableId === 'row';
    const control = {};
    control.id = `${Date.now()}`;
    control.type = isRow ? 'row' : 'regular';
    control.title = `${control.id.substring(5)} element`;
    if (isRow) {
      control.controls = [];
    }
    const newPageElements = cloneDeep(pageElements);
    // Set at desired index
    newPageElements.elements[control.id] = control;
    newPageElements.elementIds.splice(destination.index, 0, control.id);

    setPageElements(oldPageElements => {
      return {
        ...oldPageElements,
        ...newPageElements,
      }
    })
    if (isRow) {
      const newFieldListKey = Math.random * 10;
      setFieldsListKey(parseFloat(newFieldListKey.toFixed(4), 10))
    }
  };

  const newFieldClicked = (isRow) => {
    const control = {};
    control.id = `${Date.now()}`;
    control.type = isRow ? 'row' : 'regular';
    control.title = `${control.id.substring(5)} element`;
    if (isRow) {
      control.controls = []
    }
    const newPageElements = cloneDeep(pageElements);
    const pageElementIds = newPageElements.elementIds;
    // Set at bottom
    newPageElements.elements[control.id] = control;
    newPageElements.elementIds.splice(pageElementIds.length, 0, control.id);

    setPageElements(oldPageElements => {
      return {
        ...oldPageElements,
        ...newPageElements,
      }
    })
    if (isRow) {
      const newFieldListKey = Math.random * 10;
      setFieldsListKey(parseFloat(newFieldListKey.toFixed(4), 10))
    }
  };

  const newRowFieldDragged = (result) => {
    const { destination } = result;
    const control = {};
    control.type = 'regular';
    control.id = `${Date.now()}`;
    control.title = `${control.id.substring(5)} element`;
    const rowId = destination.droppableId.split(' ')[0];
    const newPageElements = cloneDeep(pageElements);
    // Set at desired index
    newPageElements.elements[rowId].controls.splice(destination.index, 0, control);

    setPageElements(oldPageElements => {
      return {
        ...oldPageElements,
        ...newPageElements,
      }
    })
  };

  const fieldToRow = (result) => {
    const { draggableId, destination } = result;
    const newPageElements = cloneDeep(pageElements);
    let pageElementIds = newPageElements.elementIds;
    const control = newPageElements.elements[draggableId];
    const rowId = destination.droppableId.split(' ')[0];
    // Set at desired index
    delete newPageElements.elements[control.id];
    pageElementIds = pageElementIds.filter((fieldId) => (
      fieldId !== control.id
    ));
    newPageElements.elements[rowId].controls.splice(destination.index, 0, control);
    newPageElements.elementIds = pageElementIds;
  
    setPageElements(oldPageElements => {
      return {
        ...oldPageElements,
        ...newPageElements,
      }
    })
  };

  const reorderRow = (result) => {
    const { destination, source } = result;
    const newPageElements = cloneDeep(pageElements);
    const rowId = destination.droppableId.split(' ')[0];
    const control = newPageElements.elements[rowId].controls[source.index];
    newPageElements.elements[rowId].controls.splice(source.index, 1);
    newPageElements.elements[rowId].controls.splice(destination.index, 0, control);

    setPageElements(oldPageElements => {
      return {
        ...oldPageElements,
        ...newPageElements,
      }
    })
  };

  const moveToRow = (result) => {
    const { destination, source } = result;
    const newPageElements = cloneDeep(pageElements);
    const rowIdSource = source.droppableId.split(' ')[0];
    const rowId = destination.droppableId.split(' ')[0];
    const control = newPageElements.elements[rowIdSource].controls[source.index];
    newPageElements.elements[rowIdSource].controls.splice(source.index, 1);
    newPageElements.elements[rowId].controls.splice(destination.index, 0, control);

    setPageElements(oldPageElements => {
      return {
        ...oldPageElements,
        ...newPageElements,
      }
    })
  };

  const rowToField = (result) => {
    const { source, destination } = result;
    const newPageElements = cloneDeep(pageElements);
    const pageElementIds = newPageElements.elementIds;
    const rowId = source.droppableId.split(' ')[0];
    const control = pageElements.elements[rowId].controls[source.index];
    pageElementIds.splice(destination.index, 0, control.id);
    newPageElements.elements[rowId].controls.splice(source.index, 1);
    newPageElements.elements[control.id] = control;
    newPageElements.elementIds = pageElementIds;

    setPageElements(oldPageElements => {
      return {
        ...oldPageElements,
        ...newPageElements,
      }
    })
  };

  const reorderPageFields = (result) => {
    const { destination, source, draggableId } = result;
    const newPageElements = cloneDeep(pageElements);
    const pageElementIds = newPageElements.elementIds;

    pageElementIds.splice(source.index, 1);
    pageElementIds.splice(destination.index, 0, draggableId);
    newPageElements.elementIds = pageElementIds;
    
    setPageElements(oldPageElements => {
      return {
        ...oldPageElements,
        ...newPageElements,
      }
    })
  }

  const doDragElementEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      ((destination.droppableId === source.droppableId) && (destination.index === source.index))
      || (destination.droppableId === 'elements-tab')
      || (destination.droppableId.includes('row') && (destination.droppableId.split(' ')[0] === draggableId))
      || (draggableId.includes('row') && destination.droppableId.includes('row'))
    ) {
      return;
    }
    // If element is dragged from Elements tab
    if (source.droppableId === 'elements-tab') {
      if (destination.droppableId.includes('row') && (draggableId !== 'row')) {
        // New Row field from elements excluding the add row field
        newRowFieldDragged(result);
      } else {
        newFieldDragged(result);
      }
    }
    // If Page field is dragged
    if (source.droppableId === 'fields-list') {
      if (destination.droppableId.includes('row') && (draggableId !== 'row')) {
        // Regular Field is moved to the Row Field excluding the add row field
        fieldToRow(result);
      } else {
        // Regular field is moved around
        reorderPageFields(result);
      }
    }
    // If Row field is moved around
    if (source.droppableId.includes('row')) {
      if (source.droppableId === destination.droppableId) {
        // Row field is being reordered
        reorderRow(result);
      } else if (destination.droppableId.includes('row')) {
        // Row field is being dropped in a new row
        moveToRow(result);
      } else {
        // Row field is moved to the Fields list
        rowToField(result);
      }
    }
  }

  const deleteField = (control) => {
    const newPageElements = cloneDeep(pageElements);
    let pageElementIds = newPageElements.elementIds;
    delete newPageElements.elements[control.id];
    pageElementIds = pageElementIds.filter((fieldId) => (
      fieldId !== control.id
    ));
    newPageElements.elementIds = pageElementIds;

    setPageElements(oldPageElements => {
      return {
        ...oldPageElements,
        ...newPageElements,
      }
    })
  }

  const deleteRowField = (rowId, index) => {
    const newPageElements = cloneDeep(pageElements);
    newPageElements.elements[rowId].controls.splice(index, 1);

    setPageElements(oldPageElements => {
      return {
        ...oldPageElements,
        ...newPageElements,
      }
    })
  }

  return (
    <div className="App">
      <DragDropContext
        onDragEnd={(result) => doDragElementEnd(result)}
      >
        <Sidebar
          newFieldClicked={newFieldClicked}
        />
        <DropPage
          key={fieldsListKey}
          pageElements={pageElements}
          deleteField={deleteField}
          deleteRowField={deleteRowField}
        />
      </DragDropContext>
    </div>
  );
}

export default App;
