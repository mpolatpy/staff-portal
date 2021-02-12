import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    form_items: {
        padding: theme.spacing(2),
        textAlign: 'center',
        // margin: theme.spacing(2)
    },
    card: {
        padding: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: "1px solid",
        borderColor: "#d3d3d3"
    },
    formRow: {
        marginBottom: theme.spacing(1),
        // display: 'flex',
        width: "80%",
        // flexDirection: 'center',
        justifyContent: 'space-around'
    },
    newDiv: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'center',
        border: "1px solid",
        borderColor: "#d3d3d3",
        padding: theme.spacing(5)
    }
}));