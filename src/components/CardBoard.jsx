import React from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import CustomDragLayer from "./CustomDragLayer";

import {v4 as uuidv4} from 'uuid';
import SortableList from "./Sortable/SortableList";
import DraggableList from "./Draggable/DraggableList";

const contentItems = [{
  id: uuidv4(),
  title: "Something",
  image: "https://picsum.photos/id/1/200/200"
}, {
  id: uuidv4(),
  title: "Something Else",
  image: "https://picsum.photos/id/2/200/200"
}, {
  id: uuidv4(),
  title: "Something different",
  image: "https://picsum.photos/id/3/200/200"
}, {
  id: uuidv4(),
  title: "What?",
  image: "https://picsum.photos/id/4/200/200"
}];

class CardBoard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {done: [], cards: []}
  }

  render() {
    const {state} = this;
    const {cards} = state;
    return (
      <DndProvider backend={HTML5Backend}>
        <div style={{
          display: "flex",
          position: "relative"
        }}>
          <SortableList
            style={{width: "100%", height: "100vh"}}
            items={cards}
            onAdd={this.handleAdd.bind(this)}
            onMove={this.handleMove.bind(this)}
            onDrop={this.handleDrop.bind(this)}
            render={(item) => {
              return <div>
                {item.title}
              </div>
            }}
          />

          <DraggableList
            items={contentItems}
            onCancel={this.handleCancel.bind(this)}
            render={(draggableItem) => {
              return <div
                style={{
                  border: "1px solid #DDD",
                  padding: "5px",
                  margin: "5px",
                  display: "flex",
                  flexDirection: "column"
                }}>
                <a style={{fontWeight: "bold", marginBottom: "10px"}}>{draggableItem.title}</a>
                <img src={draggableItem.image} alt={draggableItem.title}/>
              </div>
            }}
          />
        </div>
        <CustomDragLayer/>
      </DndProvider>
    );
  }

  handleMove(dragIndex, hoverIndex) {
    const cards = this.state.cards.slice();
    const dragCard = cards[dragIndex];

    cards.splice(dragIndex, 1);
    cards.splice(hoverIndex, 0, dragCard);

    this.setState({...this.state, cards});
  }

  handleAdd(card, hoverIndex) {
    const newData = this.state.cards.slice(0); // copy

    newData.splice(hoverIndex, 0, {id: this.state.cards.length + 9999999, title: "...."});

    this.setState({
      ...this.state,
      cards: newData
    })
  }

  handleDrop(item, index) {
    const cards = this.state.cards.slice(0); // copy

    if (!index) {
      cards.push({
        id: uuidv4(),
        title: item.data.title
      })
    }

    this.setState({
      ...this.state,
      cards
    })
  }

  handleCancel(index) {
    if (!index) {
      return;
    }

    const cards = this.state.cards.slice(0); // copy

    cards.splice(index, 1);

    this.setState({
      ...this.state,
      cards
    })
  }
}

export default CardBoard;
