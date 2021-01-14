import React, { useEffect, useState } from 'react';
import './App.css';
import TodoList from "./todo-list/TodoList";
import { AppBar, Fab, fade, IconButton, InputBase, makeStyles, Menu, MenuItem, Toolbar } from "@material-ui/core";
import { Add as AddIcon, Search as SearchIcon, Sort as SortIcon } from "@material-ui/icons";
import CreateDialog from "./create-dialog/CreateDialog";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import Spacer from "react-spacer";

const useStyles = makeStyles(theme => {
    return {
        'add-button': {
            position: 'fixed',
            left: 16,
            bottom: 16
        },
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
            color: 'white'
        },
        title: {
            flexGrow: 1,
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        search: {
            position: 'relative',
            display: 'flex',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'white',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${ theme.spacing(4) }px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            color: 'white',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        }
    }
});

const options = [
    {
        id: 'default',
        text: 'Default'
    },
    {
        id: 'oldest-first',
        text: 'Oldest First'
    },
    {
        id: 'by-title',
        text: 'By Title'
    }
]

function App() {

    const classes = useStyles();
    const [ createOpen, setCreateOpen ] = useState(false);
    const [ sortMenuEl, setSortMenuEl ] = useState(null);
    const [ selectedIndex, setSelectedIndex ] = useState(0);
    const [ sortMethod, setSortMethod ] = useStickyState('default', 'sorting');
    const [ todos, setTodos ] = useStickyState([], 'todos');
    const [ query, setQuery ] = useState('');

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

    function openSortMenu(event) {
        setSortMenuEl(event.currentTarget);
    }

    function closeSortMenu() {
        setSortMenuEl(null);
    }

    function handleMenuItemClick(event, index) {
        setSelectedIndex(index);
        setSortMenuEl(null);
        setSortMethod(options[index].id);
    }

    function handleQueryChange(event) {
        setQuery(event.target.value);
    }

    return (
        <MuiPickersUtilsProvider utils={ MomentUtils }>
            <div className={ classes.root }>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={ classes.menuButton } onClick={ openSortMenu }>
                            <SortIcon/>
                        </IconButton>
                        <Spacer grow="1"/>
                        <div className={ classes.search }>
                            <div className={ classes.searchIcon }>
                                <SearchIcon/>
                            </div>
                            <InputBase
                                placeholder="Search..."
                                classes={ {
                                    root: classes.root,
                                    input: classes.inputInput
                                } }
                                value={ query }
                                onChange={ handleQueryChange }
                                inputProps={ { 'aria-label': 'search' } }
                            />
                        </div>
                    </Toolbar>
                </AppBar>
                <Menu anchorEl={ sortMenuEl } open={ Boolean(sortMenuEl) } onClose={ closeSortMenu } keepMounted>
                    { options.map((option, index) => (
                        <MenuItem
                            key={ option.id }
                            selected={ index === selectedIndex }
                            onClick={ (event) => handleMenuItemClick(event, index) }
                        >
                            { option.text }
                        </MenuItem>
                    )) }
                </Menu>
                <TodoList query={ query } sortMethod={ sortMethod } todos={ todos } setTodos={ setTodos }/>
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