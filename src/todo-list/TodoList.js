import {
    Accordion, AccordionActions,
    AccordionDetails,
    AccordionSummary, Button,
    Checkbox,
    FormControlLabel,
    Typography,
    useMediaQuery
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function TodoList({ todos, setTodos }) {

    const isDesktop = useMediaQuery('(min-width: 600px)');

    const handleChange = (id) => {
        const newTodos = todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo);
        setTodos(newTodos);
    }

    return todos.map(todo => {
        return <Accordion key={ todo }>
            <AccordionSummary
                expandIcon={ !isDesktop && <ExpandMoreIcon/> }
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                id="additional-actions1-header">
                <FormControlLabel
                    aria-label="Acknowledge"
                    onClick={ (event) => event.stopPropagation() }
                    onFocus={ (event) => event.stopPropagation() }
                    control={ <Checkbox onChange={ () => handleChange(todo.id) } value={ todo.done }/> }
                    label={ todo.title }
                />
            </AccordionSummary>
            { todo.information && (<AccordionDetails>
                <Typography color="textSecondary">
                    { todo.information }
                </Typography>
            </AccordionDetails>) }
            <AccordionActions>
                <Button variant="contained" color="primary">Edit</Button>
                <Button variant="contained" color="secondary">Delete</Button>
            </AccordionActions>
        </Accordion>
    });
}