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
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';

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
  if (date.toString().length === 1) {
    date =  '0' + date;
  }
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
  matchesTable:{
    paddingBottom: '50px'
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
  }).then(async function(parsedJson) { 
    const x = [];
    for(let i=0; i<parsedJson.matches.length; i++) {
      const stat = await getStatsForMatch(parsedJson.matches[i].id);
      //debugger;
      x.push({...parsedJson.matches[i],stat})
    }
    setMatches(x);

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
const [invalidTime, setInvalidTimeOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessOpen(false);
    setOpen(false);
    setInvalidTimeOpen(false);
  };

function getCurrentTime(){
    const separator=':';
    let newDate = new Date()
    let hrs = newDate.getHours().toString();
    if (hrs.length === 1) {
      hrs = '0' + hrs;
    }
    let mins = newDate.getMinutes().toString();
    if (mins.length === 1) {
      mins = '0' + hrs;
    }
    let secs = newDate.getSeconds().toString();
    if (secs.length === 1) {
      secs = '0' + hrs;
    }
    return hrs+separator+mins+separator+secs;
}


function isValidBettingTime(matchNumber) {
  if (matchNumber == 1) {
    if (getCurrentTime() > '15:00:00' && getCurrentTime() < '23:59:59') {
      return false;
    }
    return true;
  }
  if (matchNumber == 2) {
    if (getCurrentTime() > '18:59:00' && getCurrentTime() < '23:59:59') {
      return false;
    }
    return true;
  }

      
  if (getCurrentTime()> '18:45:00' && getCurrentTime() < '23:59:59') {
    setInvalidTimeOpen(true);
    return false;
  }
  return true;
}


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

function betOtherDetails(matchId) {
  
  fetch(`https://ipl-backend-service-dot-ipl-deployment.et.r.appspot.com/cb-ipl/bet/match-details/${matchId}/${userInfo[0].id}?toss=${tossValue[matchId] || ''}&batsman=${batsman[matchId] || ''}&bowler=${bowler[matchId] || ''}`, {
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

const [stats, setStats] = React.useState({});

async function getStatsForMatch (matchId) {
  const matchStats = await fetch(`https://ipl-backend-service-dot-ipl-deployment.et.r.appspot.com/cb-ipl/bet/stats/${matchId}`, {
  method: 'GET', // *GET, POST, PUT, DELETE, etc.
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  json: true
}) 
return matchStats.json();
}
  

const batsmen = [
  { name: 'Less than 100', team: 'Runs' },
  { name: '100-120', team: 'Runs' },
  { name: '120-140', team: 'Runs' },
  { name: '140-160', team: 'Runs' },
  { name: '160-180', team: 'Runs' },
  { name: '180-200', team: 'Runs' },
  { name: '200-210', team: 'Runs' },
  { name: 'Greater than 210', team: 'Runs' }
];

const bowlers = [
  { name: 'Less than 100', team: 'Runs' },
  { name: '100-120', team: 'Runs' },
  { name: '120-140', team: 'Runs' },
  { name: '140-160', team: 'Runs' },
  { name: '160-180', team: 'Runs' },
  { name: '180-200', team: 'Runs' },
  { name: '200-210', team: 'Runs' },
  { name: 'Greater than 210', team: 'Runs' }
];

const options = batsmen.map((option) => {
  const team = option.team;
  return {
    ...option,
  };
});

const bowlerOptions = bowlers.map((bowler) => {
  const team = bowler.team;
  return {
    ...bowler,
  };
});

const classes = useStyles();

const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


const [selectedIndex, setSelectedIndex] = React.useState(1);

const handleListItemClick = (event, index) => {
  setSelectedIndex(index);
};

const [tossValue, setTossValue] = React.useState({});
const [batsman, setBatsman] = React.useState({});
const [bowler, setBowler] = React.useState({});

const handleTossChange = (event,id) => {
  setTossValue({...tossValue,[id]:event.target.value});
};

const handleBatsmanChange = (value,id) => {
  setBatsman({...batsman,[id]:value.name});
};

const handleBowlerChange = (value,id) => {
  setBowler({...bowler,[id]:value.name});
};





const currentDate = getCurrentDate();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>

          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
           Welcome {userInfo.length && userInfo[0].fullName}! Your home team is {userInfo.length && userInfo[0].homeTeamCode}
          </Typography>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}  align="right">
           Your Points: {userInfo.length && userInfo[0].totalPoints}
          </Typography>
        </Toolbar>
      </AppBar>
      
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3} >
            {/* Chart */}
            <Grid item xs={12} md={12} lg={12}>
           
              
              <Paper className={classes.paper}>
                {/* <Chart /> */}    
                {matches.map((match) => (
                    <div className={classes.matchesTable}>

                    <div className={classes.buttonClass}>
                      <Button variant="contained" color="primary" onClick = {() => isValidBettingTime(match.game) ? placeABet(match.id, match.team1) : setInvalidTimeOpen(true)}>{match.team1}</Button>
                      <span>vs</span> 
                      <Button variant="contained" color="primary" onClick = {() => isValidBettingTime(match.game) ? placeABet(match.id, match.team2):  setInvalidTimeOpen(true)}>{match.team2}</Button>
                    </div>
                    
                    <Paper className={classes.paper}>
                    <Grid container spacing={3} justify="center">
                        <Grid item container justify="center" xs={12} md={3} lg={3}>
                     
                     <FormControl component="fieldset">
                        <FormLabel component="legend">Increase my stakes</FormLabel>
                        <RadioGroup aria-label="Stakes" name="Stakes" value={tossValue[match.id]} onChange={(event) => handleTossChange(event,match.id)} defaultChecked >
                          <FormControlLabel value='2' control={<Radio />} label='Double it!'  />
                          <FormControlLabel value='3' control={<Radio />} label='Triple it!' />
                        </RadioGroup>
                    </FormControl>
                        </Grid>
                        <Grid item container justify="center" alignItems="center" xs={12} md={3} lg={3}> 
                    <Autocomplete
                      id="grouped-demo"
                      options={options.sort((a, b) => -b.team.localeCompare(a.team))}
                      groupBy={(option) => option.team}
                      getOptionLabel={(option) => option.name}
                      style={{ width: 300 }}
                      renderInput={(params) => <TextField {...params} label="Delhi Score" variant="outlined" />}
                      onChange={(event, newValue) => {
                        handleBatsmanChange(newValue,match.id);
                      }}
                    /> 
                        </Grid>           
                        <Grid item container justify="center" alignItems="center" xs={12} md={3} lg={3}>
                    <Autocomplete
                      id="grouped-demo"
                      options={bowlerOptions.sort((a, b) => -b.team.localeCompare(a.team))}
                      groupBy={(bowler) => bowler.team}
                      getOptionLabel={(bowler) => bowler.name}
                      style={{ width: 300 }}
                      renderInput={(params) => <TextField {...params} label="Mumbai Score" variant="outlined" />}
                      onChange={(event, newValue) => {
                        handleBowlerChange(newValue,match.id);
                      }}
                    /> 
                      </Grid>
                      <Grid item container justify="center" alignItems="center" xs={12} md={3} lg={3}>
                     <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      className={classes.button}
                      style={{ height: 56 }}
                      startIcon={<SaveIcon />}
                      onClick={() => isValidBettingTime(match.game) ? betOtherDetails(match.id) : setInvalidTimeOpen(true)}                     
                    >
                     Save my bet
                    </Button>
                    </Grid>
                    </Grid>
                    </Paper>
                    </div>


                ) )}
              </Paper>   
              <Paper className={classes.paper}>
                {/* <Chart /> */}    
                <h2><b><center>जनता का मिज़ाज़</center></b></h2>
                {matches.map((match) => (
                    <div>
                    <h><b><center>{match.team1} = {match.stat[match.team1]}%, {match.team2} = {match.stat[match.team2]}%</center></b></h>
                    <br></br>
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
      <Snackbar open={invalidTime} autoHideDuration={2000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">You are trying to place a bet in a window during which placing a bet is disabled</Alert>
      </Snackbar>
    </div>
  );
}