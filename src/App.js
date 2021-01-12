import React, { useState } from 'react';
import './App.css';
import TodoList from "./todo-list/TodoList";
import { Fab, makeStyles } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";

const useStyles = makeStyles({
    'add-button': {
        position: 'absolute',
        right: 16,
        bottom: 16
    }
});

function App() {

    const classes = useStyles();
    const [ todos, setTodos ] = useState([
        {
            id: 0,
            title: 'Buy some apples',
            information: 'Buy some apples in the supermarket.',
            dueDate: new Date(2021, 1, 15, 15, 3),
            done: false
        }
    ]);

    return (
        <div className="App">
            <TodoList todos={ todos } setTodos={ setTodos }/>
            <Fab color="primary" className={ classes["add-button"] } children={ (<AddIcon/>) }/>
        </div>
    );
}

export default App;
