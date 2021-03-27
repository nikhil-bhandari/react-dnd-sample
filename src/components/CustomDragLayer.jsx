import React from "react";
import {DragLayer} from 'react-dnd'

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  textAlign: 'left'
};

function getItemStyles(props) {
  const {initialOffset, currentOffset} = props;
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }
  let {x, y} = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  };
}

class CustomDragLayer extends React.Component {

  render() {

    if (!this.props.isDragging) {
      return null;
    }

    return (<div style={layerStyles}>
      <div style={getItemStyles(this.props)}>
        <DragPreview item={this.props.item}/>
      </div>
    </div>)
  }
}


export class DragPreview extends React.Component {
  render() {
    const {item} = this.props;
    return (
      <div>
        Preview
        <img src={item.data.image} alt={item.data.name}/>
      </div>
    );
  }
}

export default DragLayer(collect)(CustomDragLayer)
