import React from "react";
import SortableItem, {drop} from "./SortableItem";
import {DropTarget} from "react-dnd";

class SortableList extends React.Component {
  render() {
    const {items, onAdd, onMove, onDrop, render, connectDropTarget, style, className} = this.props;

    return connectDropTarget(
      <div style={style} className={className}>
        {
          items.map((item, index) => (
            <SortableItem
              key={item.id}
              index={index}
              item={item}
              onAdd={onAdd}
              onMove={onMove}
              onDrop={onDrop}
              render={render}
            />
          ))
        }
      </div>
    )
  }
}

export default DropTarget("CARD", {
  drop
}, (connect) => ({
  connectDropTarget: connect.dropTarget(),
}))(SortableList)
