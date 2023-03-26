import React from "react";
import styled from "styled-components";

import TodoList from "./TodoList";
import TodoSearch from "./TodoSearch";

const TodoTempBox = styled.div`
    width: 100%;
    margin: 0 auto; 
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const TodoTitle = styled.div`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 40px;
    border-bottom: 2px solid #d3d3d3;
    display: flex;
`;
const TodoListTitle = styled.div`
    margin-bottom: 5px;
    width: 60%;
    text-align: center;
    display: flex;
    justify-content: space-between;
`;


const TodoTemp = () => {

    return (

        <TodoTempBox>
            <TodoTitle>Vanilla JS DRAG & DROP Todo List 구현</TodoTitle>
            <TodoListTitle>
                <div>todoList0</div>
                <TodoSearch/>
            </TodoListTitle>
            <TodoList />
        </TodoTempBox>

    );
}
export default TodoTemp;