import React from "react";
import styled from "styled-components";
import TodoCreate from "./TodoCreate";
import { useState } from "react";
import { atom, useRecoilState } from 'recoil';

const TodoListBox = styled.div`
`;
const Add = styled.button`
outline: none;
margin-left: 10px;
padding: 10px;
border-radius: 7px;
background-color: white;
border: 1px solid blue;

`;
const Inputs = styled.input`
   outline: none;
   padding: 20px;
   margin-right: 10px;
   ::placeholder {
    color: red;
    font-size: 18px;
}
`;
const InputBox = styled.div`
    display: flex;

    
`;

export const todoState = atom({
    key: 'todoState',
    default: [],

});
const TodoListAdd = () => {
    const [components, setComponents] = useRecoilState(todoState);
    const [title, setTitle] = useState();
    const [backcolor, setBackcolor] = useState();
    const handleClick = () => {
        setComponents([...components, <TodoCreate key={components.length} title={title} backcolor={backcolor} />]);
        setTitle("");
        setBackcolor("");
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleClick();
        }
    }
    return (
        <TodoListBox>
            <InputBox onKeyPress={handleKeyPress}>
                <Inputs
                    type="text"
                    value={title}
                    onInput={(e) => setTitle(e.target.value)}
                    placeholder="title"
                ></Inputs>
                <Inputs
                    type="text"
                    value={backcolor}
                    onInput={(e) => setBackcolor(e.target.value)}
                    placeholder="Titlecolor"
                ></Inputs>
                <Add onClick={handleClick}>Add List</Add>

            </InputBox>
        </TodoListBox >
    );
}
export default TodoListAdd;