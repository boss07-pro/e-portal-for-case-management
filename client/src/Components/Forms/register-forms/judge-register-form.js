import { Checkbox, Typography } from "@mui/material";
import "./judge-register-form.css";
import { useEffect, useState } from "react";
import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
  FormControl
} from "@mui/material";
import axios from "axios";

import {CircularProgress} from "@mui/material";
import TextField from '@mui/material/TextField';
import { set } from "mongoose";


const Item = (props) => {
return (
  <div className="judge-input">
    <TextField 
      id="outlined-basic" 
      label={props.placeholder} 
      variant="outlined" 
      value={props.value} 
      onChange={(e) => props.setJudgeDetails({ ...props.judgeDetails , [props.toChange] : e.target.value })}
      sx={{
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor: 'rgb(201, 198, 193)',
          },
        },
        '& .MuiInputLabel-root': {
          '&.Mui-focused': {
            color: 'white', // change as needed
          },
        },
        
      }}
      type={props.type}
      error={props.nameError || props.emailError || props.phoneError || props.casePreferencesError}
      helperText={props.nameError ? props.nameErrorMsg : props.emailError ? props.emailErrorMsg : props.phoneError ? props.phoneErrorMsg : props.casePreferencesError ? props.casePreferencesErrorMsg : ""}
    />
  </div>
);
  };

const JudgeRegisterForm = () => {
  const [caseCategories, setCaseCategories] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState(false);
const [emailError, setEmailError] = useState(false);
const [emailErrorMsg, setEmailErrorMsg] = useState("");
const [phoneErrorMsg, setPhoneErrorMsg] = useState("");
const [nameErrorMsg, setNameErrorMsg] = useState("");
const [casePreferencesErrorMsg, setCasePreferencesErrorMsg] = useState("");
const [phoneError, setPhoneError] = useState(false);
const [casePreferencesError, setCasePreferencesError] = useState(false);
  const [judgeDetails,setJudgeDetails] = useState({
    name: "",
    email: "",
    phone: "",
    casePreferences: selectedOptions
  });

  useEffect(() => {
    setJudgeDetails(prevDetails => ({ ...prevDetails, casePreferences: selectedOptions }));
  }, [selectedOptions]);

  useEffect(() => {
    try {
      axios.get("http://localhost:64000/case-category").then((res) => {
        setCaseCategories(res.data.data[0].caseType);
      });
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const validateForm = () => {
    let isValid = true;
  
    if (!judgeDetails.name) {
      setNameError(true);
      setNameErrorMsg("Name is required");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMsg("");
    }
    
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!judgeDetails.email) {
      setEmailError(true);
      setEmailErrorMsg("Email is required");
      isValid = false;
    } else if(!regex.test(judgeDetails.email)){
      setEmailError(true);
      setEmailErrorMsg("Invalid Email");
      isValid = false;
    }else{
      setEmailError(false);
      setEmailErrorMsg("");
      isValid = true;
    }

    if (!judgeDetails.phone) {
      setPhoneError(true);
      setPhoneErrorMsg("Phone number is required");
      isValid = false;
    } else if(!/^[0-9]{10}$/i.test(judgeDetails.phone)){
        isValid = false;
        setPhoneErrorMsg("Invalid phone number");
        setPhoneError(true);
    } else {
      setPhoneError(false);
      setPhoneErrorMsg("");
      isValid = true;
    }

  
    if (!judgeDetails.casePreferences.length) {
      setCasePreferencesError(true);
      setCasePreferencesErrorMsg("Please select your case preferences");
      isValid = false;
    } else {
      setCasePreferencesError(false);
      setCasePreferencesErrorMsg("");
    }
  
    return isValid;
  };
  const handleJudgeRegister = async () => { 
    if (validateForm()) {
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:64000/judge-register", judgeDetails);
      if(res.status === 200) {
       setMessage("Email sent successfully")
      }
    } catch (error) {
      
      console.log(error.message);
    }finally {
      setIsLoading(false);
    }
  }
};

  return (
    <div className="judge-register-form-main">
      {isLoading && <CircularProgress style={{color: "white"}}/>}
      {message && <Typography variant="h6" color="orange" fontWeight="500" style={{marginBottom:"10px"}}> {message} </Typography>} 
      <Item placeholder="Full Name" type="text" value={judgeDetails.name} toChange="name" judgeDetails={judgeDetails} setJudgeDetails={setJudgeDetails} nameError={nameError} nameErrorMsg={nameErrorMsg}/>
      <Item placeholder="Email" type="email" value={judgeDetails.email} toChange="email" judgeDetails={judgeDetails} setJudgeDetails={setJudgeDetails} emailError={emailError} emailErrorMsg={emailErrorMsg}/>
      <Item placeholder="Phone" type="text" value={judgeDetails.phone} toChange="phone" judgeDetails={judgeDetails} setJudgeDetails={setJudgeDetails} phoneError={phoneError} phoneErrorMsg = {phoneErrorMsg}/>
      <div className="judge-input">
        <Typography variant="h6" color="orange" fontWeight="500" style={{marginBottom:"10px"}}>
          What type of cases do you deal with?
        </Typography>
        <FormControl className="judge-input">
      <InputLabel sx={{borderColor:"white",backdropFilter:"blur(60px)"}}>Multiple Select</InputLabel>
      <Select
        multiple
        value={selectedOptions}
        onChange={(e) => setSelectedOptions(e.target.value)}
        input={<OutlinedInput label="Multiple Select" />}
        error={casePreferencesError}
        helperText={casePreferencesError ? casePreferencesErrorMsg : ""}
        sx={{
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: 'rgb(201, 198, 193)',
            },
          },
          '& .MuiInputLabel-root': {
            '&.Mui-focused': {
              color: 'white', // change as needed
            },
          },
          
        }}
      >
        {Object.keys(caseCategories).map((name) => (
          <MenuItem key={name} value={name} sx={{color: selectedOptions.includes(name) ? "orange" : "white",backgroundColor:'black'}}>
            <button className="select-multiple-opns">{name}</button>
          </MenuItem>
        ))}
      </Select>
    </FormControl> 
        <div></div>
      </div>
      <div className="judge-input">
        <button className="judge-register-submit" onClick={handleJudgeRegister}>Submit</button>
      </div>
    </div>
  );
};

export default JudgeRegisterForm;
