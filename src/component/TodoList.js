import React from "react";
import styled from "styled-components";
import TodoCreate from "./TodoCreate";
import { useState } from "react";
const TodoListBox = styled.div`
    display: flex;
    border-top: 1px solid #d3d3d3;
`;

const TodoList = () => {
    const [countList, setCountList] = useState([0])
   
    return (
        <TodoListBox>
            <TodoCreate title="상태 없음" />
            <TodoCreate title="시작 전" backcolor="red" />
            <TodoCreate title="진행 중" backcolor="#c0eea3"/>
            <TodoCreate title="완료" backcolor="#d3d4d7"/>

        </TodoListBox>
    );
}
export default TodoList;