import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FormControl,
  FormHelperText,
  MenuItem,
  TextField,
} from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../config";

const timeOptions = [
  { value: "day", label: "Days", max: 15 },
  { value: "hr", label: "Hours", max: 24 },
  { value: "min", label: "Minutes", max: 60 },
  { value: "sec", label: "Seconds", max: 60 },
];

export default function TopBadge() {
  const { id } = useParams();
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [value, setValue] = useState(24);

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    validateInput();
  }, [selectedIndex, value]);

  const handleMenuItemClick = (idx) => {
    setSelectedIndex(idx);
  };

  const handleInputChange = (e) => {
    const val = Number(e.target.value);
    if (e.target.value.length > 2) {
      setErrorMsg("Only 2 digits are allowed");
    } else {
      setValue(val);
    }
  };

  const validateInput = () => {
    const selectedOption = timeOptions[selectedIndex];
    const max = selectedOption.max;

    if (value < 1) {
      setErrorMsg(`Minimum expires ${selectedOption.label} is 1`);
    } else if (value > max) {
      setErrorMsg(`Maximum expires ${selectedOption.label} is ${max}`);
    } else {
      setErrorMsg("");
    }
  };
  const callAPi = async () => {
    const data = {
      time: value,
      type: timeOptions[selectedIndex].value,
    };
    const res = await axios.post(`${baseUrl}api/v1/update-expires-time`, data);
    console.log(res, data);
  };
  useEffect(() => {
    if (!errorMsg) {
      const handler = setTimeout(() => {
        callAPi();
      }, 350);
      return () => {
        clearTimeout(handler);
      };
    }
  }, [value, selectedIndex]);

  return (
    <div className="flex justify-between bg-gray-50 py-4 rounded-md px-3 border-l-green-500 border-l-8">
      <div className="flex gap-4 items-start">
        <b className="select-none pt-1">Expires After:</b>
        <FormControl variant="standard">
          <div className="flex gap-4 items-center ">
            <TextField
              sx={{ minWidth: "20px", width: "40px", textAlign: "center" }}
              variant="standard"
              value={value}
              type="number"
              name="expires"
              inputMode="numeric"
              onChange={handleInputChange}
              error={!!errorMsg}
              className={`${errorMsg && "animate-shake"}`}
            />

            <TextField
              id="standard-select-currency"
              select
              defaultValue="hr"
              variant="standard"
            >
              {timeOptions.map((option, idx) => (
                <MenuItem
                  key={option.value}
                  onClick={() => handleMenuItemClick(idx)}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          {errorMsg && (
            <FormHelperText id="my-helper-text" error={!!errorMsg}>
              {errorMsg}
            </FormHelperText>
          )}
        </FormControl>
      </div>

      <div className="flex">
        <b className="font-semibold select-none">Code</b> {" : "}{" "}
        <h2 className="text-blue-500 font-medium select-text">{id}</h2>
      </div>
    </div>
  );
}
