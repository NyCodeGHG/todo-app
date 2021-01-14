import React, { useEffect, useState } from 'react';
import './App.css';
import TodoList from "./todo-list/TodoList";
import { Fab, makeStyles } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import CreateDialog from "./create-dialog/CreateDialog";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

const useStyles = makeStyles({
    'add-button': {
        position: 'fixed',
        left: 16,
        bottom: 16
    }
});

function App() {

    const classes = useStyles();
    const [ createOpen, setCreateOpen ] = useState(false);
    const [ todos, setTodos ] = useStickyState([], 'todos');

    const createTodo = (newTodo) => {
        const ids = todos.map(todo => todo.id);
        const id = Math.max(...ids) + 1;
        const todo = {
            id,
            title: newTodo.title,
            information: newTodo.information,
            dueDate: newTodo.dueDate,
            done: newTodo.done
        };
        setTodos([ ...todos, todo ]);
    };

    return (
        <MuiPickersUtilsProvider utils={ MomentUtils }>
            <div className="App">
                <TodoList todos={ todos } setTodos={ setTodos }/>
                <Fab onClick={ () => setCreateOpen(true) } color="primary" className={ classes["add-button"] }
                     children={ (<AddIcon/>) }/>
                <CreateDialog createTodo={ createTodo } open={ createOpen } setOpen={ setCreateOpen }/>
            </div>
        </MuiPickersUtilsProvider>
    );
}

export default App;

function useStickyState(defaultValue, key) {
    const [ value, setValue ] = useState(() => {
        const stickyValue = localStorage.getItem(key);

        return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [ key, value ]);

    return [ value, setValue ];
}