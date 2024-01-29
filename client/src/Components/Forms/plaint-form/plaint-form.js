import { useState, useContext, useEffect } from "react";
import { EmailContext } from "../../../hooks/emailContext";
import axios from "axios";
import "./plaint-form.css";
import { ColorModeContext } from "../../../themes";
import { Typography } from "@mui/material";
const PlaintForm = (props) => {
  const caseType = ["civil", "criminal", "three"];
  const [casee,setCasee] = useState({});
  const [earlierCourts, setEarlierCourts] = useState(false);
  const [option , setOption] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [submit, setSubmit] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);


  const email = useContext(EmailContext);

  const storedPlaintDetails = JSON.parse(
    localStorage.getItem("plaintDetails")
  ); //getting the stored data from the local storage

  useEffect(() => {
    axios
      .get("http://localhost:64000/case-category")
      .then((res) => {
        setCasee(res.data.data[0].caseType);
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);


  const initialDetails = storedPlaintDetails ? storedPlaintDetails : { 
    causeTitlePlaintiff: "",
    causeTitleDefendant: "",
    caseCategory: "",
    caseSubCategory: "",
    numberOfPlaintiff: "",
    numberOfDefendants: "",
  }//

  

  const [plaintDetails, setPlaintDetails] = useState(initialDetails);//initializing the state with the stored data

  //to check whether all the details are filled or not
  const areDetailsFilled = () => {

    return Object.values(plaintDetails).every(value => value !== "" && value !== "None");
  };

  //submitting the plaint details to the database
  const submitPlaintDetails = () => {
    setIsSubmitted(true);
    if(!areDetailsFilled()){
      setError("Please fill all the details");
    }else{
      setError(null);
      props.handleNext(props.activeStep);
      
    }
  };

  //to get the data from the database and store it in the local storage
  const value = (val) => {
    return plaintDetails[val];
  }

  //onChange event handler common for all the input fields
  const onChange = (sub, value) => {
    const updatedDetails = {
      ...plaintDetails,
      [sub]: value,
    };

    setPlaintDetails(updatedDetails);
    localStorage.setItem("plaintDetails", JSON.stringify(updatedDetails));
  };
  const caseTypeOnChange = (sub, val) => {
    if(option !== ""){
      setOption(val);
      const updatedDetails = {
        ...plaintDetails,
        ["caseSubCategory"]: "None",
        [sub]: val,
      };

      setPlaintDetails(updatedDetails);
      localStorage.setItem("plaintDetails", JSON.stringify(updatedDetails));
    }
    else{
      setOption(val);
      if(casee[val].length === 1 && casee[val][0] === "-"){
        const updatedDetails = {
          ...plaintDetails,
          ["caseSubCategory"]: "-",
          [sub]: val,
        };
        setPlaintDetails(updatedDetails);
        localStorage.setItem("plaintDetails", JSON.stringify(updatedDetails));
      }
      else{
        const updatedDetails = {
          ...plaintDetails,
          ["caseSubCategory"]: "None",
          [sub]: val,
        };
        setPlaintDetails(updatedDetails);
        localStorage.setItem("plaintDetails", JSON.stringify(updatedDetails));
      }
  }
  };


  return (
    <>
    {error && <div className="error">{error}</div>}
      <div className="main-div">
        {/* left start  */}
        <div className="left-main">
          {/* form left start  */}
          <div className="left-form">
            <div className="inner-form-elements">
              <div className="title">
                {/* Cause titile plaintiff */}
                <Typography variant="h5" style={{ fontWeight: "500"}}>Cause titile plaintiff</Typography>
              </div>
              <div className="input-element">
                <input
                  type="text"
                  className={`input-field ${isSubmitted && !value("inputFieldName") ? 'input-field-error' : ''}`}
                  placeholder="Cause title plaintiff"
                  value={value("causeTitlePlaintiff")}
                  onChange={(e) => onChange("causeTitlePlaintiff", e.target.value) }
                />
              </div>
            </div>
            <div className="inner-form-elements">
              <div className="title">
                {/* Cause titile Defendant */}
                <Typography variant="h5" style={{ fontWeight: "500"}}>Cause Title Defendant  </Typography>    
                          </div>
              <div className="input-element">
                <input
                  type="text"
                  className="input-field"
                  placeholder="Cause title defendant"
                  value={value("causeTitleDefendant")}
                  onChange={(e) => onChange("causeTitleDefendant", e.target.value)}
                />
              </div>
            </div>
            <div className="inner-form-elements">
              <div className="title">
                {/* Case Category */}
                <Typography variant="h5" style={{ fontWeight: "500"}}>Case Category</Typography>              </div>
              <div className="input-element">
                <select
                  value={value("caseCategory")}
                  className="input-field"
                  onChange={(e) => caseTypeOnChange("caseCategory", e.target.value)}
                >
                  {value("caseCategory") === "" && <option value="none">Select Case Category</option>}
                  {Object.keys(casee).map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="inner-form-elements">
              <div className="title">
                {/* Case SubCategory */}
                <Typography variant="h5" style={{ fontWeight: "500"}}>Case SubCategory</Typography>
              </div>
              <div className="input-element">
                <select
                  className="input-field"
                  value={value("caseSubCategory")}
                  onChange={(e) => onChange("caseSubCategory", e.target.value)}
                >
                {!option &&  <option value="none">Select Case SubCategory</option>}
                  {option && ["None", ...casee[option]].map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* form left end  */}

        {/* left end  */}
        {/* right start  */}
        <div className="right-main">
          <div className="right-form">
            <div className="inner-form-elements">
              <div className="title">
                {/* Number of Plaintiffs */}
                <Typography variant="h5" style={{ fontWeight: "500"}}>Number of Plaintiffs</Typography>
              </div>
              <div className="input-element">
                <input
                  type="number"
                  min={0}
                  className="input-field"
                  placeholder="No. of Plaintiffs"
                  value={value("numberOfPlaintiff")}
                  onChange={(e) => onChange("numberOfPlaintiff", e.target.value)}
                />
              </div>
            </div>
            <div className="inner-form-elements">
              <div className="title">
                {/* Number of Defendants */}
                <Typography variant="h5" style={{ fontWeight: "500"}}>Number of Defendants</Typography>
              </div>
              <div className="input-element">
                <input
                  type="number"
                  min={0}
                  className="input-field"
                  placeholder="No. of Defendants"
                  value={value("numberOfDefendants")}
                  onChange={(e) => onChange("numberOfDefendants", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        {/* right end  */}
      </div>
      <div className="submit-button-div">
        <button className="submit-button" onClick={submitPlaintDetails}>submit</button>
      </div>
    </>
  );
};

export default PlaintForm;