import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Grid,
    TextField
} from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";
import { useState } from "react";
import TodoDialog from "../todo-dialog/TodoDialog";

const defaultTodo = {
    title: '',
    dueDate: null,
    information: '',
    done: false
};

export default function CreateDialog(props) {
    const { open, setOpen, createTodo } = props;
    const [ todo, setTodo ] = useState(defaultTodo);

    function handleClose() {
        setOpen(false);
        setTodo(defaultTodo);
    }

    function handleCreation() {
        createTodo(todo);
        handleClose();
    }

    return (
        <Dialog maxWidth="sm" open={ open }
                onClose={ handleClose }
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
            <DialogTitle>Create a new todo</DialogTitle>
            <DialogContent>
                <TodoDialog todo={ todo } setTodo={ setTodo }/>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={ handleClose }>Cancel</Button>
                <Button color="primary" onClick={ handleCreation } disabled={ todo.title === '' }>Save</Button>
            </DialogActions>
        </Dialog>
    )
}