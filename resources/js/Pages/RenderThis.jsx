import { useState } from "react";
import TodoList from "./TodoList";
import Notepad from "./Notepad";
export default function RenderThis({todos = [], notepad = []}) {
  
    const [type, setType] = useState("Todo-List");
    return (
        <>
            {type === "Todo-List" ? (
                <TodoList todos={todos}/>
            ) : (
                <Notepad notepad={notepad}/>
            )}
             <label htmlFor="type">Select Type</label>
            <select
                name="type"
                id="type"
                onChange={(e) => setType(e.target.value)}
            >
                <option value="Todo-List">Todo-List</option>
                <option value="Notepad">Notepad</option>
            </select>
        </>
    );
}
