import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit">
        IPL Betting Payments 1
      </Link>{' '}
      
    </Typography>
  );
}

function getCurrentDate(){
  const separator='-';
  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  
  return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
  }



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: '100%',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    fontSize: 'smaller'
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  buttonClass: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    fontStyle: 'italic',
    margin: '10px 0'
  }
}));

export default function Dashboard() {
  
  const [ranks, setRanks] = React.useState([]);
  React.useEffect(() => {
    const getTopRankers = () => {
        fetch('https://ipl-backend-service-dot-ipl-deployment.et.r.appspot.com/cb-ipl/getRank', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        json: true
    }).then(function(response) {
        return response.json();
    }).then(function(parsedJson) {
      setRanks(parsedJson);
    }); 
    }
    getTopRankers();
}, [])
  

  const [matches, setMatches] = React.useState([]);
  React.useEffect(() => {
  const getTodaysMatch = () => {
      const todaysdate = getCurrentDate();
      
      fetch(`https://ipl-backend-service-dot-ipl-deployment.et.r.appspot.com/cb-ipl/match/date/${todaysdate}`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      json: true
  }).then(function(response) {
      return response.json();
  }).then(function(parsedJson) { 
    setMatches(parsedJson.matches);
  }); 
  }
  getTodaysMatch();
}, [])

const [userInfo, setUserInfo] = React.useState([]);
const [fullTeamName, setFullTeamName] = React.useState('');
React.useEffect(() => {
const getUserInfo = () => {
    fetch(`https://ipl-backend-service-dot-ipl-deployment.et.r.appspot.com/cb-ipl/${sessionStorage.username}`, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    json: true
}).then(function(response) {
    return response.json();
}).then(function(parsedJson) { 
  setUserInfo(parsedJson.users);
  setFullTeamName(parsedJson.teamName);
}); 
}
getUserInfo();
}, [])

const [open, setOpen] = React.useState(false);
const [successOpen, setSuccessOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessOpen(false);
    setOpen(false);
  };

function placeABet(matchId, placedOn) {
   
    fetch(`https://ipl-backend-service-dot-ipl-deployment.et.r.appspot.com/cb-ipl/bets/${userInfo[0].id}/${matchId}/${userInfo[0].username}/${placedOn}`, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //mode: 'no-cors',
  }).then((response) => {
    if (response.status!==200) {
      setOpen(true)
    }
    else{
      setSuccessOpen(true)
    }

  })
}

  const classes = useStyles();
  
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const currentDate = getCurrentDate();

 
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>

          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
           Welcome, {userInfo.length && userInfo[0].fullName}! Your home team is {userInfo.length && userInfo[0].homeTeamCode}
          </Typography>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}  align="right">
           Your Points: {userInfo.length && userInfo[0].totalPoints}
          </Typography>
        </Toolbar>
      </AppBar>
      
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={classes.paper}>
                {/* <Chart /> */}    
                {matches.map((match) => (
                    <div className={classes.buttonClass}>
                    <Button variant="contained" color="primary" onClick = {() => placeABet(match.id, match.team1)}>{match.team1}</Button>
                    <span>vs</span> 
                    <Button variant="contained" color="primary" onClick = {() => placeABet(match.id, match.team2)}>{match.team2}</Button>
                  </div>
                ) )}
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={classes.paper}>
                {/* <Deposits /> */}
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                      <TableCell ><b>RANK</b></TableCell>
                        <TableCell ><b>NAME</b></TableCell>
                        <TableCell ><b>HOME TEAM</b></TableCell>
                        <TableCell align="right" ><b>POINTS</b></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {ranks.map((row,index) => (
                        <TableRow key={row.name}>
                          <TableCell>{index+1}</TableCell>
                          <TableCell align="left" >{row.name}</TableCell>
                          <TableCell>{row.homeTeam}</TableCell>
                          <TableCell align="right">{row.points}</TableCell>

                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>            
              </Paper>
            </Grid>
            
            {/* Recent Orders */}
            {/* <Grid item xs={12}>
              <Paper className={classes.paper}>
              </Paper>
            </Grid> */}
          </Grid>
        </Container>
      </main>
      <Snackbar open={successOpen} autoHideDuration={600} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success">Bet Placed!</Alert>
      </Snackbar>
      <Snackbar open={open} autoHideDuration={800} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">There was an error</Alert>
      </Snackbar>
    </div>
  );
}
