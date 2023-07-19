import {
  Button,
  Grid,
  InputLabel,
  Link,
  TextField,
  Typography,
  FormLabel,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Box,
} from "@mui/material";
import parse from "html-react-parser";
import { Days, Months, Years } from "../components/date";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  validateName,
  validateNumber,
  validateEmail,
  validatePassword,
} from "../utility/formValidation.js";
import axios from "axios";
import InfoIcon from "@mui/icons-material/Info";

export default function PatientSignup(props) {
  const isPatient = props.type === "patient" ? true : false;
  const navigate = useNavigate();
  const [register, setRegister] = useState(false);
  const [regmsg, setRegmsg] = useState("");

  const [validity, setValidity] = useState({
    fullname: "",
    email: "",
    mobile: "",
    password: "",
    confirmpassword: "",
  });

  const [empty, setEmpty] = useState({
    fullname: true,
    email: true,
    mobile: true,
    password: true,
    confirmpassword: true,
  });

  const date = new Date();
  const [inputs, setInputs] = useState({
    gender: "male",
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const empty = value.lenght == 0 ? true : false;
    setInputs((values) => ({ ...values, [name]: value }));
    setEmpty((values) => ({ ...values, [name]: empty }));
  };

  useEffect(() => {
    if (inputs && inputs.password === inputs.confirmpassword) {
      let valid = true;
      for (let item in validity) {
        if (empty[item] || validity[item].length != 0 || !inputs[item])
          valid = false;
      }
      setRegister(valid);
    } else setRegister(false);
  }, [inputs, validity]);

  const handleBlur = async (e) => {
    const name = e.target.name;
    if (name == "fullname") {
      const value = validateName(e.target.value.trim());
      setValidity((values) => ({ ...values, [name]: value }));
    } else if (name == "mobile") {
      const value = await validateNumber(e.target.value.trim());
      setValidity((values) => ({ ...values, [name]: value }));
    } else if (name == "email") {
      const value = await validateEmail(e.target.value.trim());
      console.log(value);
      setValidity((values) => ({ ...values, [name]: value }));
    } else if (name == "password") {
      const value = validatePassword(e.target.value.trim());
      setValidity((values) => ({ ...values, [name]: value }));
    } else if (name == "confirmpassword") {
      let value = "";
      if (
        inputs.password &&
        inputs.password.length != 0 &&
        inputs.password !== inputs.confirmpassword
      )
        value = "*Password does not match";

      setValidity((values) => ({
        ...values,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    let url = "";
    const month = ("0" + inputs.month).slice(-2);
    const day = ("0" + inputs.day).slice(-2);
    const year = inputs.year;
    const dob = year + "-" + month + "-" + day;

    let obj = {
      firstName: inputs.fullname,
      gender: inputs.gender,
      email: inputs.email,
      password: inputs.password,
      contactNumber: inputs.mobile,
    };

    if (isPatient) {
      obj["profile"] = { dob: dob };
      url = "http://my-doctors.net:8090/patients";
    } else {
      url = "http://my-doctors.net:8090/doctors";
    }

    try {
      let result = await axios.post(url, obj);
      console.log(result);
      for (let item in inputs) {
        setInputs((inputs[item] = ""));
      }
      setRegister(false);
      setRegmsg("Signed up succesfully");
    } catch (error) {
      setRegmsg("Signed up unsuccesfully");
      console.log(error);
    }

    console.log(obj);
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          border: 1,
          paddingX: { xs: 1, md: 5 },
          paddingY: 2,
          borderColor: "#bfbfbf",
        }}
      >
        {regmsg != "" && (
          <Grid item sm={12}>
            <Box
              sx={{
                backgroundColor: "#b3ffb3",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
              }}
            >
              <InfoIcon sx={{ color: "green" }} />{" "}
              <Typography sx={{ color: "black", fontWeight: "bold" }}>
                {regmsg}
              </Typography>
            </Box>
          </Grid>
        )}
        <Grid item sm={12} md={12}>
          <Typography variant="h6" fontWeight={"bold"}>
            Create an account
          </Typography>
        </Grid>
        <Grid item md={12}>
          <InputLabel>Full Name*</InputLabel>
          <TextField
            name="fullname"
            placeholder="Enter name"
            type="text"
            variant="outlined"
            sx={{ width: 1 }}
            value={inputs.fullname || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {validity.fullname.length != 0 && (
            <Box
              component={"span"}
              sx={{
                display: "block",
                color: "red",
                paddingX: 1,
              }}
            >
              {validity.fullname}
            </Box>
          )}
        </Grid>
        <Grid item sm={12} md={12}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender*</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="male"
              name="gender"
              onChange={handleChange}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        {isPatient && (
          <Grid item sm={12} md={12}>
            <InputLabel>Date of birth*</InputLabel>
            <Grid container spacing={3}>
              <Grid item md={4}>
                <Days handleChange={handleChange} />
              </Grid>
              <Grid item md={4}>
                <Months handleChange={handleChange} />
              </Grid>
              <Grid item md={4}>
                <Years handleChange={handleChange} />
              </Grid>
            </Grid>
          </Grid>
        )}
        <Grid item md={12}>
          <InputLabel>Mobile Number*</InputLabel>
          <TextField
            name="mobile"
            placeholder="Enter Mobile Number"
            type="text"
            variant="outlined"
            sx={{ width: 1 }}
            value={inputs.mobile || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {validity.mobile.length != 0 && (
            <Box
              component={"span"}
              sx={{ display: "block", color: "red", paddingX: 1 }}
            >
              {parse(validity.mobile)}
            </Box>
          )}
        </Grid>
        <Grid item md={12}>
          <InputLabel>Email*</InputLabel>
          <TextField
            name="email"
            placeholder="abc@gmail.com"
            type="email"
            variant="outlined"
            sx={{ width: 1 }}
            value={inputs.email || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {validity.email.length != 0 && (
            <Box
              component={"span"}
              sx={{
                display: "block",
                color: "red",
                paddingX: 1,
              }}
            >
              {validity.email}
            </Box>
          )}
        </Grid>
        <Grid item md={12}>
          <InputLabel>Create Password*</InputLabel>
          <TextField
            name="password"
            placeholder="create password"
            type="password"
            variant="outlined"
            sx={{ width: 1 }}
            value={inputs.password || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {validity.password.length != 0 && (
            <Box
              component={"span"}
              sx={{
                display: "block",
                color: "red",
                paddingX: 1,
              }}
            >
              {parse(validity.password)}
            </Box>
          )}
        </Grid>
        <Grid item md={12}>
          <InputLabel>Confirm Password*</InputLabel>
          <TextField
            name="confirmpassword"
            placeholder="confirm password"
            type="password"
            variant="outlined"
            sx={{ width: 1 }}
            value={inputs.confirmpassword || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {validity.confirmpassword.length != 0 && (
            <Box
              component={"span"}
              sx={{
                display: "block",
                color: "red",
                paddingX: 1,
              }}
            >
              {parse(validity.confirmpassword)}
            </Box>
          )}
        </Grid>
        <Grid item sm={12} md={12}>
          <Grid container sx={{ alignItems: "center" }}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ textAlign: { xs: "center", md: "left" } }}
            >
              <Button
                variant="contained"
                sx={{ backgroundColor: "#303f9f" }}
                disabled={!register}
                onClick={handleSubmit}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={12}>
          Already have an account?{" "}
          <Link
            sx={{ cursor: "pointer" }}
            fontWeight={"bold"}
            color={"#303f9f"}
            onClick={() => {
              props.setValue("1");
              props.setImage("/mydoctor/images/login.svg");
              navigate("/mydoctor/auth/login");
            }}
          >
            Sign in
          </Link>
        </Grid>
      </Grid>
    </>
  );
}
