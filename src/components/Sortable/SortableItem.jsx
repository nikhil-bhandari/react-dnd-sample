import React, {forwardRef, useImperativeHandle, useRef} from "react";
import {DragSource, DropTarget} from "react-dnd";

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
};

const SortableItem = forwardRef(function ({item, isDragging, connectDragSource, connectDropTarget, render}, ref) {
  const elementRef = useRef(null);
  connectDragSource(elementRef);
  connectDropTarget(elementRef);
  const opacity = isDragging ? 0 : 1;
  useImperativeHandle(ref, () => ({
    getNode: () => elementRef.current,
  }));
  return (<div ref={elementRef} style={{...style, opacity}}>
    {render(item)}
  </div>);
});


export const drop = (props, monitor, component) => {
  const item = monitor.getItem();
  const index = item.index;
  if (item.type === "NEW") {
    props.onDrop(item, index);
    item.index = undefined;
  }
}

const isDraggingUpwards = (dragIndex, hoverIndex, middle, top) => {
  return dragIndex > hoverIndex && top > middle;
}

const isDraggingDownwards = (dragIndex, hoverIndex, middle, top) => {
  return dragIndex < hoverIndex && top < middle;
}

function getPosition(node, monitor) {
  // Determine rectangle on screen
  const hoverBoundingRect = node.getBoundingClientRect();
  // Get vertical middle
  const middle = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
  // Determine mouse position
  const clientOffset = monitor.getClientOffset();
  // Get pixels to the top
  const top = clientOffset.y - hoverBoundingRect.top;

  return {
    top, middle
  }
}

const hover = (props, monitor, component) => {
  if (!component) {
    return null;
  }

  const node = component.getNode();

  if (!node) {
    return null;
  }

  const dragIndex = monitor.getItem().index;
  const hoverIndex = props.index;

  if (dragIndex === hoverIndex) {
    return;
  }

  const {top, middle} = getPosition(node, monitor);

  if (isDraggingDownwards(dragIndex, hoverIndex, middle, top) || isDraggingUpwards(dragIndex, hoverIndex, middle, top)) {
    return;
  }

  if (dragIndex === undefined) {
    props.onAdd(monitor.getItem(), hoverIndex);
  } else {
    props.onMove(dragIndex, hoverIndex);
  }

  monitor.getItem().index = hoverIndex;
}


export default DropTarget("CARD", {
  drop,
  hover,
}, (connect) => ({
  connectDropTarget: connect.dropTarget(),
}))(DragSource("CARD", {
  beginDrag: (props) => ({
    index: props.index,
    data: props.item
  }),
}, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(SortableItem));
