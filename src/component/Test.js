import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { atom } from "recoil";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import TodoCreate from "./TodoCreate";

const getItems = count =>
	Array.from({ length: count }, (v, k) => k).map(k => ({
		id: `item-${k}`,
		content: `item ${k}`
	}));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
	// some basic styles to make the items look a bit nicer
	userSelect: "none",
	padding: grid * 2,
	margin: `0 0 ${grid}px 0`,
    margin: `10px,`,

	// change background colour if dragging
	background: isDragging ? "lightgreen" : "grey",

	// styles we need to apply on draggables
	...draggableStyle
});

const getListStyle = isDraggingOver => ({
	background: isDraggingOver ? "lightblue" : "lightgrey",
	padding: grid,
  width: 250,
  position: "relative"
});

const queryAttr = "data-rbd-drag-handle-draggable-id";

const Test = props => {
	const [placeholderProps, setPlaceholderProps] = useState({});
	const [items, setItems] = useState(getItems(10));

	const onDragEnd = result => {
		// dropped outside the list
		if (!result.destination) {
			return;
		}

    setPlaceholderProps({})
		setItems(items => reorder(items, result.source.index, result.destination.index));
	};

	const onDragUpdate = update => {
    if(!update.destination){
      return;
    }
		const draggableId = update.draggableId;
		const destinationIndex = update.destination.index;

		const domQuery = `[${queryAttr}='${draggableId}']`;
		const draggedDOM = document.querySelector(domQuery);

		if (!draggedDOM) {
			return;
		}
		const { clientHeight, clientWidth } = draggedDOM;

		const clientY = parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) + [...draggedDOM.parentNode.children]
			.slice(0, destinationIndex)
			.reduce((total, curr) => {
				const style = curr.currentStyle || window.getComputedStyle(curr);
				const marginBottom = parseFloat(style.marginBottom);
				return total + curr.clientHeight + marginBottom;
			}, 0);

		setPlaceholderProps({
			clientHeight,
			clientWidth,
      clientY,
      clientX: parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingLeft)
		});
	};

	// Normally you would want to split things out into separate components.
	// But in this example everything is just done in one place for simplicity
	return (
		<DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
            <TodoCreate></TodoCreate>
            <Droppable droppableId="droppable">
				{(provided, snapshot) => (
					<div
						{...provided.droppableProps}
						ref={provided.innerRef}
						style={getListStyle(snapshot.isDraggingOver)}
					>
						{items.map((item, index) => (
							<Draggable key={item.id} draggableId={item.id} index={index}>
								{(provided, snapshot) => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										style={getItemStyle(
											snapshot.isDragging,
											provided.draggableProps.style
										)}
									>
										{item.content}
									</div>
								)}
							</Draggable>
						))}

						{provided.placeholder}
            {/* <CustomPlaceholder snapshot={snapshot} /> */}
            <div style={{
              position: "absolute",
              top: placeholderProps.clientY,
              left: placeholderProps.clientX,
              height: placeholderProps.clientHeight,
              background: "tomato",
              width: placeholderProps.clientWidth
            }}/>
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default Test;
