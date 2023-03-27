import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const TodoListBox = styled.div`
  padding: 10px;
    width: 400px;
    flex-wrap: wrap;

`;
const TodoInput = styled.input`
    font-size: 18px;
    background-color:#d3d3d3;
    outline: none;
    font-weight: bold;
    width: 90%;
    border: 1.2px solid #d3d3d3;
    
    padding: 10px 10px 10px 10px;
    ::placeholder {
    font-size: 18px;
}
`;
const InputBox = styled.div`
    background-color: #d3d3d3;
    padding: 7px;
    display: flex;
    margin-bottom: 10px;
    border-radius: 6px;
    align-items: center;
`
const Add = styled.button`
    width: 20%;
    
    background-color: #d3d3d3;
    border: 1.2px solid #d3d3d3;
`;
const Count = styled.div`
    color: #d3d3d3;
    font-weight: bold;
    font-size: 20px;
`;
const List = styled.div`
    font-size: 15;
    font-weight: bold;
    border-radius: 5px;
    background-color: white;
    border: 1px solid #d3d3d3;
    padding: 10px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;

    
`;
const ListName = styled.div`
    font-size: 20px;
    background-color: ${props => props.color};
    margin-right: 10px;
    padding: 5px;
    border-radius: 7px;
    
`;
const ListTop = styled.div`
    display: flex;
    align-items: center;
    margin-left: 2px;
    margin-bottom: 10px;
`;

const Delete = styled.button`
    background-color: #d3d3d3;
    border-radius: 4px;
    border: none;
`;



const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const queryAttr = "data-rbd-drag-handle-draggable-id";

const TodoCreate = ({ title, backcolor }) => {
    const [input, setInput] = useState();
    const [todoList, setTodoList] = useState([]);
    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        setTodoList(items => reorder(items, result.source.index, result.destination.index));
    };

    const onDragUpdate = (update) => {
        if (!update.destination) {
            return;
        }
        const draggableId = update.draggableId;
        const domQuery = `[${queryAttr}='${draggableId}']`;
        const draggedDOM = document.querySelector(domQuery);
        if (!draggedDOM) {
            return;
        }
    }
    
    const handleClick = () => {
        const id = todoList.length + 1;
        setTodoList(prev => [
            ...prev,
            {
                id: `${id}`,
                content: `${input}`,
            }
        ]);
        setInput("")
    }
    const handleDelete = (id) =>{
        setTodoList((todoList) => todoList.filter((todo) => todo.id !==id));
    };
   
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleClick();
        }
    }
    return (
        <TodoListBox>
            <ListTop>
                <ListName color={backcolor}>{title}</ListName>

                <Count>{todoList.length}</Count>
            </ListTop>
            <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {todoList.map((item, index) => (
                                <Draggable
                                    key={item.id} draggableId={item.id} index={index} F
                                >
                                    {(provided,) => (
                                        <List
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            {item.content}
                                            <Delete onClick={() =>handleDelete(item.id)} >삭제</Delete>
                                        </List>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            <InputBox onKeyPress={handleKeyPress}>
                <TodoInput
                    value={input} onInput={(e) => setInput(e.target.value)}
                    type="textarea"
                    placeholder="새로 만들기"
                >
                </TodoInput>
                <Add onClick={() => handleClick()}  >추가</Add>
            </InputBox>

        </TodoListBox >

    );
}

export default TodoCreate;