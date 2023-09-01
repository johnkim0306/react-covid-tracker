import * as React from 'react';
import { styled } from '@mui/material/styles';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Button,
  Radio
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './Diagnosis.scss';
import { useState } from 'react';


const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px rgb(16 22 26 / 40%)'
      : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
  backgroundImage:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
      : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background:
      theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#137cbd',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#106ba3',
  },
});

function BpRadio(props) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}

const theme = createTheme({
  components: {
    // Name of the component
    MuiFormControlLabel: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: '1rem',
          color: 'black',
        },
      },
    },
  },
});


const Diagnosis = () => {
  const [error, setError] = React.useState(false);
  const [details, setDetails] = useState({
    name: "",
    email: "",
    gender: "", // Initialize with default value
    fever: '', // Default fever
    throat: '',
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleRadioChange = (event) => {
  //   setDetails((prevDetails) => ({
  //     ...prevDetails,

  //   }))
  //   setValue(event.target.value);
  //   setHelperText(' ');
  //   setError(false);
  // };

  const handleSubmit = () => {
    // Pass the details to another component or perform some action
    console.log('Details1:', details);
  };

  return (
    <div>
      <h2>Diagnosis Form</h2>
      <form>
        <FormControl error={error} variant="standard">
          <FormLabel id="demo-customized-radios">Gender</FormLabel>
          <RadioGroup
            row
            value={details.gender} // Bind the value to the state
            onChange={handleInputChange} // Handle change event
            defaultValue="female"
            aria-labelledby="demo-customized-radios"
            name="customized-radios"
          >
            <FormControlLabel theme={theme} value="female" control={<BpRadio />} label="Female" />
            <FormControlLabel theme={theme} value="male" control={<BpRadio />} label="Male" />
          </RadioGroup>
        </FormControl>

        <FormControl variant="standard">
          <FormLabel id="demo-customized-radios">Fever</FormLabel>
          <RadioGroup
            row
            value={details.fever}
            onChange={handleInputChange}
            aria-labelledby="demo-customized-radios"
            name="fever"
          >
            <FormControlLabel theme={theme} value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel theme={theme} value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset">
          <FormLabel  theme={theme} id="demo-customized-radios">Sore Throat</FormLabel>
          <RadioGroup
            row
            aria-label="sore-throat"
            name="sore-throat"
            value={details.soreThroat}
            onChange={handleInputChange}
          >
            <FormControlLabel theme={theme} value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel theme={theme} value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </form>
    </div>

  );
}
export default Diagnosis; 