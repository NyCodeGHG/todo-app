import { Checkbox, FormControlLabel, Grid, makeStyles, TextField } from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";


export default function TodoDialog({ todo, setTodo }) {

    function handleDateChange(dueDate) {
        setTodo({
            ...todo,
            dueDate
        });
    }

    function handleDoneChange(event) {
        setTodo({
            ...todo,
            done: event.target.checked
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

    return (<Grid>
        <Grid item xs={ 12 }>
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
        <Grid item xs={ 12 }>
            <TextField
                margin="dense"
                id="information"
                label="Additional information"
                type="text"
                multiline
                onChange={ handleInformationChange }
                value={ todo.information }
                rows={ 6 }
            />
        </Grid>
        <Grid item xs={ 12 }>
            <DateTimePicker
                onChange={ handleDateChange }
                value={ todo.dueDate }
                margin="dense"
                id="date"
                label="Due Date"/>
        </Grid>
        <Grid item xs={ 12 }>
            <FormControlLabel
                labelPlacement="end"
                checked={ todo.done }
                onChange={ handleDoneChange }
                control={
                    <Checkbox/>
                } label="Done"/>
        </Grid>
    </Grid>);
}