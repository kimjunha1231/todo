import React from "react";
import styled from "styled-components";
import {
    useRecoilValue,
} from 'recoil';
import { todoState } from "./TodoListAdd";


const TodoListBox = styled.div`
display: flex;
   align-items: center;
    margin-top: 10px;

`;
const List = styled.div`

`;

const TodoList = () => {

    const todo = useRecoilValue(todoState);
    return (
        <TodoListBox>
            {todo.map(function (content) {
                return (
                    <List>{content}</List>
                )
            }
            )}


        </TodoListBox >
    );
}
export default TodoList;