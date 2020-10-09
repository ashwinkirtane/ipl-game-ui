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
  { name: 'Virat Kohli', team: 'RCB' },
  { name: 'AB de Villiers', team: 'RCB' },
  { name: 'Devdutt Padikkal', team: 'RCB' },
  { name: 'Aaron Finch', team: 'RCB' },
  { name: 'Shivam Dube', team: 'RCB' },
  { name: 'Moeen Ali', team: 'RCB' },

  { name: 'Rohit Sharma', team: 'MI' },
  { name: 'Sherfane Rutherford', team: 'MI' },
  { name: 'Suryakumar Yadav', team: 'MI' },
  { name: 'Chris Lynn', team: 'MI' },
  { name: 'Saurabh Tiwary', team: 'MI' },
  { name: 'Aditya Tare', team: 'MI' },
  { name: 'Ishan Kishan', team: 'MI' },
  { name: 'Quinton de Kock', team: 'MI' },
  { name: 'Hardik Pandya', team: 'MI' },
  { name: 'Kieron Pollard', team: 'MI' },
  { name: 'Krunal Pandya', team: 'MI' },

  { name: 'Ambati Rayudu', team: 'CSK' },
  { name: 'Murali Vijay', team: 'CSK' },
  { name: 'MS Dhoni', team: 'CSK' },
  { name: 'Dwayne Bravo', team: 'CSK' },
  { name: 'Faf du Plessis', team: 'CSK' },
  { name: 'Kedar Jadhav', team: 'CSK' },
  { name: 'Ravindra jadeja', team: 'CSK' },
  { name: 'Shane Watson', team: 'CSK' },
  { name: 'Sam Curran', team: 'CSK' },
  
  { name: 'Shreyas Iyer', team: 'DC' },
  { name: 'Ajinkya Rahane', team: 'DC' },
  { name: 'Prithvi Shaw', team: 'DC' },
  { name: 'Shikhar Dhawan', team: 'DC' },
  { name: 'Shimron Hetmyer', team: 'DC' },
  { name: 'Rishabh Pant', team: 'DC' },
  { name: 'Marcus Stoinis', team: 'DC' },

  { name: 'Karun Nair', team: 'KXIP' },
  { name: 'Chris Gayle', team: 'KXIP' },
  { name: 'Mayank Agarwal', team: 'KXIP' },
  { name: 'Nicholas Pooran', team: 'KXIP' },
  { name: 'Sarfaraz Khan', team: 'KXIP' },
  { name: 'KL Rahul', team: 'KXIP' },
  { name: 'Glenn Maxwell', team: 'KXIP' },

  { name: 'Andre Russell', team: 'KKR' },
  { name: 'Kamlesh Nagarkoti', team: 'KKR' },
  { name: 'Lockie Ferguson', team: 'KKR' },
  { name: 'Nitish Rana', team: 'KKR' },
  { name: 'Shubham Gill', team: 'KKR' },
  { name: 'Siddhesh Lad', team: 'KKR' },
  { name: 'Eoin Morgan', team: 'KKR' },
  { name: 'Dinesh Karthik', team: 'KKR' },
  { name: 'Sunil Narine', team: 'KKR' },
 
  { name: 'Riyan Parag', team: 'RR' },
  { name: 'Steve Smith', team: 'RR' },
  { name: 'Robin Uthappa', team: 'RR' },
  { name: 'David Miller', team: 'RR' },
  { name: 'Jos Butler', team: 'RR' },
  { name: 'Sanju Samson', team: 'RR' },
  { name: 'Ben Stokes', team: 'RR' },
  { name: 'Mahipal Lomror', team: 'RR' },
  { name: 'Yashasvi Jaiswal', team: 'RR' },
  { name: 'Tom Curran', team: 'RR' },
  { name: 'Rahul Tewatia', team: 'RR' },

  { name: 'Kane Williamson', team: 'SRH' },
  { name: 'Abhishek Sharma', team: 'SRH' },
  { name: 'David Warner', team: 'SRH' },
  { name: 'Manish Pandey', team: 'SRH' },
  { name: 'Priyam Garg', team: 'SRH' },
  { name: 'Jonny Bairstow', team: 'SRH' },
  { name: 'Vijay Shankar', team: 'SRH' },
];

const bowlers = [
  { name: 'Shivam Dube', team: 'RCB' },
  { name: 'Moeen Ali', team: 'RCB' },
  { name: 'Isuru Udana', team: 'RCB' },
  { name: 'Adam Zampa', team: 'RCB' },
  { name: 'Dale Steyn', team: 'RCB' },
  { name: 'Mohammed Siraj', team: 'RCB' },
  { name: 'Navdeep Saini', team: 'RCB' },
  { name: 'Umesh Yadav', team: 'RCB' },
  { name: 'Washington Sundar', team: 'RCB' },
  { name: 'Yuzvendra Chahal', team: 'RCB' },

  { name: 'Hardik Pandya', team: 'MI' },
  { name: 'Kieron Pollard', team: 'MI' },
  { name: 'Krunal Pandya', team: 'MI' },
  { name: 'Rahul Chahar', team: 'MI' },
  { name: 'Jasprit Bumrah', team: 'MI' },
  { name: 'James Pattinson', team: 'MI' },
  { name: 'Mitchell McClenaghan', team: 'MI' },
  { name: 'Trent Boult', team: 'MI' },
  { name: 'Nathan Coulter-Nile', team: 'MI' },

  { name: 'Dwayne Bravo', team: 'CSK' },
  { name: 'Karn Sharma', team: 'CSK' },
  { name: 'Kedar Jadhav', team: 'CSK' },
  { name: 'Ravindra jadeja', team: 'CSK' },
  { name: 'Shane Watson', team: 'CSK' },
  { name: 'Sam Curran', team: 'CSK' },
  { name: 'Deepak Chahar', team: 'CSK' },
  { name: 'Imran Tahir', team: 'CSK' },
  { name: 'Lungisani Ngidi', team: 'CSK' },
  { name: 'Mitchell Santner', team: 'CSK' },
  { name: 'Shardul Thakur', team: 'CSK' },
  { name: 'Piyush Chawla', team: 'CSK' },
  { name: 'Josh Hazlewood', team: 'CSK' },
  
  { name: 'Marcus Stoinis', team: 'DC' },
  { name: 'Anrich Nortje', team: 'DC' },
  { name: 'Avesh Khan', team: 'DC' },
  { name: 'Ravichandran Ashwin', team: 'DC' },
  { name: 'Sandeep Lamichhane', team: 'DC' },
  { name: 'Axar Patel', team: 'DC' },
  { name: 'Harshal Patel', team: 'DC' },
  { name: 'Ishant Sharma', team: 'DC' },
  { name: 'Kagiso Rabada', team: 'DC' },
  { name: 'Mohit Sharma', team: 'DC' },
  { name: 'Amit Mishra', team: 'DC' },

  { name: 'Mandeep Singh', team: 'KXIP' },
  { name: 'Glenn Maxwell', team: 'KXIP' },
  { name: 'Chris Jordan', team: 'KXIP' },
  { name: 'Deepak Hooda', team: 'KXIP' },
  { name: 'James Neesham', team: 'KXIP' },
  { name: 'Mohammad Shami', team: 'KXIP' },
  { name: 'Ravi Bishnoi', team: 'KXIP' },
  { name: 'Sheldon Cottrell', team: 'KXIP' },
  { name: 'Murugan Ashwin', team: 'KXIP' },
  { name: 'Mujeeb Ur Rahman', team: 'KXIP' },

  { name: 'Andre Russell', team: 'KKR' },
  { name: 'Sunil Narine', team: 'KKR' },
  { name: 'Pat Cummins', team: 'KKR' },
  { name: 'Shivam Mavi', team: 'KKR' },
  { name: 'Varun Chakaravarthy', team: 'KKR' },
  { name: 'Chris Green', team: 'KKR' },
  { name: 'Kuldeep Yadav', team: 'KKR' },
  { name: 'Sandeep Warrier', team: 'KKR' },
  { name: 'M Siddharth', team: 'KKR' },
 
  { name: 'Ben Stokes', team: 'RR' },
  { name: 'Mahipal Lomror', team: 'RR' },
  { name: 'Shreyas Gopal', team: 'RR' },
  { name: 'Tom Curran', team: 'RR' },
  { name: 'Jofra Archer', team: 'RR' },
  { name: 'Mayank Markande', team: 'RR' },
  { name: 'Rahul Tewatia', team: 'RR' },
  { name: 'Varun Aaron', team: 'RR' },
  { name: 'Jaydev Unadkat', team: 'RR' },
  { name: 'Kartik Tyagi', team: 'RR' },
  { name: 'Andrew Tye', team: 'RR' },
  { name: 'Oshane Thomas', team: 'RR' },
  { name: 'Akash Singh', team: 'RR' },

  { name: 'Kane Williamson', team: 'SRH' },
  { name: 'Vijay Shankar', team: 'SRH' },
  { name: 'Mitchell Marsh', team: 'SRH' },
  { name: 'Mohammad Nabi', team: 'SRH' },
  { name: 'Basil Thampi', team: 'SRH' },
  { name: 'Rashid Khan', team: 'SRH' },
  { name: 'Sandeep Sharma', team: 'SRH' },
  { name: 'Shahbaz Nadeem', team: 'SRH' },
  { name: 'Siddarth Kaul', team: 'SRH' },
  { name: 'T Natarajan', team: 'SRH' },
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
                        <FormLabel component="legend">Toss</FormLabel>
                        <RadioGroup aria-label="TOSS" name="Toss" value={tossValue[match.id]} onChange={(event) => handleTossChange(event,match.id)} defaultChecked >
                          <FormControlLabel value={match.team1} control={<Radio />} label={match.team1}  />
                          <FormControlLabel value={match.team2} control={<Radio />} label={match.team2} />
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
                      renderInput={(params) => <TextField {...params} label="Batsmen" variant="outlined" />}
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
                      renderInput={(params) => <TextField {...params} label="Bowlers" variant="outlined" />}
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
                <br></br>
                    <h3 style={{ color: 'red' }}><center>NO HOME TEAM CONSTRAINT! Place your bet on any team <u>even if your home team is playing</u></center></h3>
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
