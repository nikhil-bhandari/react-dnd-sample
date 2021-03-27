import {DragSource} from "react-dnd";
import React from "react";
import {getEmptyImage} from "react-dnd-html5-backend";

class DraggableCard extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    const {connectDragPreview} = this.props;
    if (connectDragPreview) {
      connectDragPreview(getEmptyImage(), {
        captureDraggingState: true,
      });
    }
  }

  render() {
    const {connectDragSource, render, draggableItem} = this.props;

    return <>
      {connectDragSource(
        <div ref={this.ref}>
          {render(draggableItem)}
        </div>
      )}
    </>
  }
}

const cardSource = {
  isDragging(props, monitor) {
    return monitor.getItem().id === props.draggableItem.id
  },

  beginDrag(props) {
    return {type: "NEW", data: props.draggableItem};
  },

  endDrag(props, monitor) {
    if (!monitor.didDrop()) {
      props.onCancel(monitor.getItem().index);
      monitor.getItem().index = undefined;
    }
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

export default DragSource("CARD", cardSource, collect)(DraggableCard)
