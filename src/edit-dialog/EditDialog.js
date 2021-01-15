import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import TodoDialog from "../todo-dialog/TodoDialog";

export default function EditDialog({ todo, setTodo, open, setOpen, save }) {
    return (<Dialog fullWidth open={ open } onClose={ () => {
        setOpen(false);
    } }>
        <DialogTitle>Edit '{ todo.title }'</DialogTitle>
        <DialogContent>
            <TodoDialog setTodo={ setTodo } todo={ todo }/>
        </DialogContent>
        <DialogActions>
            <Button color="secondary" onClick={ () => setOpen(false) }>Cancel</Button>
            <Button color="primary" onClick={ () => {
                setOpen(false);
                save();
            } }>Save</Button>
        </DialogActions>
    </Dialog>)
}