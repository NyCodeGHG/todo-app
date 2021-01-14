import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    Grid,
    makeStyles,
    useMediaQuery
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useState } from "react";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        verticalAlign: 'middle'
    },
    column: {
        flexBasis: '40%',
    },
    fat: {
        fontWeight: 600
    }
}));

const compareAlphabetically = (a, b) => {
    return a.title.toLowerCase() > b.title.toLowerCase();
};

function sort(sortMethod, todos) {
    switch (sortMethod) {
        case 'default': {
            return todos.sort(compareAlphabetically);
        }
        case 'oldest-first': {
            return todos.filter(todo => todo.dueDate).sort((a, b) => {
                return a.dueDate > b.dueDate;
            });
        }
        case 'by-title': {
            return todos.filter(todo => !todo.dueDate).sort(compareAlphabetically);
        }
    }
}

export default function TodoList({ todos, setTodos, sortMethod, query }) {

    const [ open, setOpen ] = useState(false);
    const [ dialogTodo, setDialogTodo ] = useState({});
    const isDesktop = useMediaQuery('(min-width: 600px)');
    const classes = useStyles();

    const handleChange = (event, id) => {
        const newTodos = todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo);
        setTodos(newTodos);
    };

    const showDeleteDialog = (event, id) => {
        setDialogTodo(todos.find(todo => todo.id === id));
        setOpen(true);
    };

    const deleteTodo = (event, id) => {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
    };

    const matchesQuery = todo => {
        return todo.description?.toLowerCase().includes(query.toLowerCase().trim()) ||
            todo.title.toLowerCase().includes(query.toLowerCase().trim());
    }

    let renderTodos = sort(sortMethod, todos);

    if (query.trim() !== '') {
        renderTodos = renderTodos.filter(todo => matchesQuery(todo));
    }

    const accordions = renderTodos.map(todo => {
        return <Accordion key={ todo.id }>
            <AccordionSummary
                expandIcon={ !isDesktop && <ExpandMoreIcon/> }
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                id="additional-actions1-header">
                <FormControlLabel
                    onClick={ (event) => event.stopPropagation() }
                    onFocus={ (event) => event.stopPropagation() }
                    checked={ todo.done === true || todo.done === 'true' }
                    onChange={ (event) => handleChange(event, todo.id) }
                    control={ <Checkbox/> }
                    label={ todo.title }>
                </FormControlLabel>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={ 3 }>
                    { todo.dueDate &&
                    <Grid className={ classes.fat } item xs={ 12 }>{ moment(todo.dueDate).calendar() }</Grid> }
                    { todo.information && <Grid item xs={ 12 }>{ todo.information }</Grid> }
                </Grid>
            </AccordionDetails>
            <AccordionActions>
                <Button variant="contained" color="primary">Edit</Button>
                <Button onClick={ (event) => showDeleteDialog(event, todo.id) }
                        variant="contained"
                        color="secondary">Delete</Button>
            </AccordionActions>
        </Accordion>
    });

    const handleClose = () => {
        setOpen(false);
    }

    const deleteDialog = (<Dialog open={ open }
                                  onClose={ handleClose }
                                  aria-labelledby="alert-dialog-title"
                                  aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{ "Confirm deletion" }</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete '{ dialogTodo.title }'
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={ handleClose } color="primary">
                Abort
            </Button>
            <Button onClick={ (event) => {
                handleClose();
                deleteTodo(event, dialogTodo.id);
            } } color="secondary" autoFocus>
                Delete
            </Button>
        </DialogActions>
    </Dialog>);

    return (<>
        { accordions }
        { deleteDialog }
    </>);
}
