import React from "react";
import styled from "styled-components";
import { useState } from "react";
import TodoList from "./TodoList";
import TodoListAdd from "./TodoListAdd";
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
    align-items: center;
    width: 80%;
    border-bottom: 1px solid #d3d3d3;
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
`;
const ListAdd = styled.button`
   margin-left: 10px;
   color:darkgray;
   outline: none;
   border: none;
   background-color: white;
`;
const TitleAddBox = styled.div`
    display: flex;
    align-items: center;
`;
const SecondTitle = styled.div`
    font-size: 30px;

    font-weight: bold;
`;

const TodoTemp = () => {
    const [addList, isAddList] = useState(false);
    const handleView = () => {
        isAddList(!addList);
    }
    return (

        <TodoTempBox>
            <TodoTitle>Vanilla JS DRAG & DROP Todo List 구현</TodoTitle>
            <TodoListTitle>
                <TitleAddBox>
                    <SecondTitle>todoList</SecondTitle>
                    <ListAdd onClick={handleView}>보기 추가</ListAdd>
                    {addList ? <TodoListAdd /> : <></>}
                </TitleAddBox>
                <TodoSearch />
            </TodoListTitle>
            <TodoList />
        </TodoTempBox>

    );
}
export default TodoTemp;