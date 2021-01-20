import {Checkbox, FormControlLabel, Grid, TextField} from "@material-ui/core";
import {KeyboardDateTimePicker} from '@material-ui/pickers'
import Alert from '@material-ui/lab/Alert';

export default function TodoDialog({todo, setTodo}) {

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
        {(todo.dueDate < Date.now() && todo.dueDate !== null) && <Grid item xs={12}>
            <Alert severity="warning">Warning: Date is in the past!</Alert>
        </Grid>}
        <Grid item xs={12}>
            <TextField
                inputProps={{
                    maxLength: 25
                }}
                autoFocus
                margin="dense"
                id="name"
                label="Title"
                type="text"
                required
                maxLength={30}
                value={todo.title}
                onChange={handleTitleChange}
            />
        </Grid>
        <Grid item xs={12}>
            <TextField
                inputProps={{
                    maxLength: 300
                }}
                margin="dense"
                id="information"
                label="Additional information"
                type="text"
                multiline
                rowsMax={30}
                onChange={handleInformationChange}
                value={todo.information}
                rows={6}
            />
        </Grid>
        <Grid item xs={12}>
            <KeyboardDateTimePicker
                onChange={handleDateChange}
                value={todo.dueDate}
                margin="dense"
                id="date"
                label="Due Date"/>
        </Grid>
        <Grid item xs={12}>
            <FormControlLabel
                labelPlacement="end"
                checked={todo.done}
                onChange={handleDoneChange}
                control={
                    <Checkbox/>
                } label="Done"/>
        </Grid>
    </Grid>);
}
