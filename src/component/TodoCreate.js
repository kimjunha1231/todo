import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";


const TodoListBox = styled.div`
  padding: 10px;
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
    border: 1px solid #d3d3d3;
    padding: 10px;
    margin-bottom: 15px;
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


const TodoCreate = ({ title, backcolor }) => {
    const [input, setInput] = useState();
    const [todoList, setTodoList] = useState([]);
    const handleClick = () => {
        const id = todoList.length + 1;
        setTodoList(prev => [
            ...prev,
            {
                id: id,
                content: input,
            }
        ]);
        setInput("")
    }
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
          
                {todoList.map(todo => {
                    return (
                        <List

                            id={todo.id}
                        >
                            {todo.content}
                        </List>
                    )
                })
                }
       
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