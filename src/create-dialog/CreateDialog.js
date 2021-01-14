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

    function handleDateChange(dueDate) {
        setTodo({
            ...todo,
            dueDate
        });
    }

    function handleDoneChange(event) {
        setTodo({
            ...todo,
            done: event.target.value
        });
    }

    function handleInformationChange(event) {
        setTodo({
            ...todo,
            information: event.target.value
        });
    }

    function handleTitleChange(event) {
        setTodo({
            ...todo,
            title: event.target.value
        });
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
                <Grid>
                    <Grid item xs={ 11 }>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Title"
                            type="text"
                            required
                            value={ todo.title }
                            onChange={ handleTitleChange }
                        />
                    </Grid>
                    <Grid item xs={ 11 }>
                        <TextField
                            margin="dense"
                            id="information"
                            label="Additional information"
                            type="text"
                            multiline
                            onChange={ handleInformationChange }
                            value={ todo.information }
                            rows={ 4 }
                        />
                    </Grid>
                    <Grid item xs={ 11 }>
                        <DateTimePicker
                            onChange={ handleDateChange }
                            value={ todo.dueDate }
                            margin="dense"
                            id="date"
                            label="Due Date"/>
                    </Grid>
                    <Grid item xs={ 5 }>
                        <FormControlLabel
                            labelPlacement="end"
                            control={
                                <Checkbox
                                    margin="dense"
                                    id="done"
                                    value={ todo.done }
                                    onChange={ handleDoneChange }/>
                            } label="Done"/>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={ handleClose }>Cancel</Button>
                <Button color="primary" onClick={ handleCreation } disabled={ todo.title === '' }>Save</Button>
            </DialogActions>
        </Dialog>
    )
}