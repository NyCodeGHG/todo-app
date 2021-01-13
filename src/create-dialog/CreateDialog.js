import { Dialog, DialogContent, DialogTitle, TextField } from "@material-ui/core";

export default function CreateDialog(props) {
    const { open, setOpen, createTodo } = props;

    function handleClose() {
        setOpen(false);
    }

    return (
        <Dialog open={ open }
                onClose={ handleClose }
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
            <DialogTitle>Create a new todo</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Title"
                    type="text"
                    required
                />
            </DialogContent>
        </Dialog>
    )
}