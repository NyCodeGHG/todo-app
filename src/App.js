import React, { useState } from 'react';
import './App.css';
import TodoList from "./todo-list/TodoList";
import { Fab, makeStyles } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";

const useStyles = makeStyles({
    'add-button': {
        position: 'fixed',
        left: 16,
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
        },
        {
            id: 1,
            title: 'Do homework',
            information: 'Do my homework I got from my school. This is a longer description. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
            dueDate: new Date(2021, 1, 15, 15, 3),
            done: true
        },
        {
            id: 2,
            title: 'Collect flowers',
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
