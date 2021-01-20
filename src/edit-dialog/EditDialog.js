import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import TodoDialog from "../todo-dialog/TodoDialog";

export default function EditDialog({todo, setTodo, open, setOpen, save}) {
    return (<Dialog maxWidth="xl" open={open} onClose={() => {
        setOpen(false);
    }}>
        <DialogTitle>Edit '{todo.title}'</DialogTitle>
        <DialogContent>
            <TodoDialog setTodo={setTodo} todo={todo}/>
        </DialogContent>
        <DialogActions>
            <Button color="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button disabled={todo.title?.trim() === ''} color="primary" onClick={() => {
                if (todo.title?.trim() !== '') {
                    setOpen(false);
                    save();
                }
            }}>Save</Button>
        </DialogActions>
    </Dialog>)
}
