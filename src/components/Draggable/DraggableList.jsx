import React from "react";
import DraggableCard from "./DraggableCard";

export default class DraggableList extends React.Component {
  render() {
    const {items, onCancel, render} = this.props;
    return <div>
      {items.map(item => <DraggableCard key={item.id} render={render} draggableItem={item} onCancel={onCancel}/>)}
    </div>
  }
}
