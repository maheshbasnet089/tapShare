import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  CircularProgress,
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
  { value: "never", label: "Unlimited" }, // NEW OPTION
];

export default function TopBadge() {
  const { id } = useParams();

  const [selectedIndex, setSelectedIndex] = useState(1);
  const [value, setValue] = useState(24);
  const [isChanged, setIsChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const index = localStorage.getItem("exp-index");
    const val = localStorage.getItem("exp-value");

    if (index !== null) {
      setSelectedIndex(Number(index));
    }

    if (val !== null) {
      setValue(Number(val));
    }
  }, []);

  useEffect(() => {
    validateInput();
  }, [selectedIndex, value]);

  const handleMenuItemClick = (idx) => {
    setSelectedIndex(idx);
    setIsChanged(true);
  };

  const handleInputChange = (e) => {
    const input = e.target.value;

    if (input.length > 2) {
      setErrorMsg("Only 2 digits are allowed");
      return;
    }

    setValue(Number(input));
    setIsChanged(true);
  };

  const validateInput = () => {
    const selectedOption = timeOptions[selectedIndex];

    // Unlimited selected
    if (selectedOption.value === "never") {
      setErrorMsg("");

      if (isChanged) {
        setLoading(true);

        const handler = setTimeout(() => {
          callAPI();
        }, 500);

        return () => clearTimeout(handler);
      }

      return;
    }

    const max = selectedOption.max;

    if (value < 1) {
      setErrorMsg(`Minimum expires ${selectedOption.label} is 1`);
      setLoading(false);
      return;
    }

    if (value > max) {
      setErrorMsg(`Maximum expires ${selectedOption.label} is ${max}`);
      setLoading(false);
      return;
    }

    setErrorMsg("");

    if (isChanged) {
      setLoading(true);

      const handler = setTimeout(() => {
        callAPI();
      }, 500);

      return () => clearTimeout(handler);
    }
  };

  const callAPI = async () => {
    const response = await axios.get("https://api64.ipify.org?format=json");
    const ipAddress = response.data.ip;

    const selectedType = timeOptions[selectedIndex].value;

    const data = {
      type: selectedType,
      ip: ipAddress,
    };

    if (selectedType !== "never") {
      data.time = value;
    }

    const userId = localStorage.getItem("userId");

    try {
      const res = await axios.post(
        `${baseUrl}api/v1/update-expires-time/${userId}`,
        data
      );

      console.log(res.data);

      localStorage.setItem("exp-type", selectedType);
      localStorage.setItem("exp-index", selectedIndex);

      if (selectedType !== "never") {
        localStorage.setItem("exp-value", value);
      }
    } catch (error) {
      setErrorMsg(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
      setIsChanged(false);
    }
  };

  return (
    <div className="flex justify-between bg-gray-50 py-4 rounded-md px-3 border-l-green-500 border-l-8">
      <div className="flex gap-4 items-start">
        <b className="select-none pt-1">Expires After:</b>

        <FormControl variant="standard">
          <div className="flex gap-4 items-center">

            <TextField
              sx={{
                minWidth: "20px",
                width: "60px",
                textAlign: "center",
              }}
              variant="standard"
              type="number"
              value={
                timeOptions[selectedIndex].value === "never"
                  ? ""
                  : value
              }
              disabled={timeOptions[selectedIndex].value === "never"}
              onChange={handleInputChange}
              error={!!errorMsg}
              placeholder={
                timeOptions[selectedIndex].value === "never"
                  ? "∞"
                  : ""
              }
              className={`${errorMsg ? "animate-shake" : ""}`}
            />

            <TextField
              select
              variant="standard"
              value={timeOptions[selectedIndex].value}
            >
              {timeOptions.map((option, idx) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  onClick={() => handleMenuItemClick(idx)}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            {loading && <CircularProgress size={20} />}
          </div>

          {errorMsg && (
            <FormHelperText error>
              {errorMsg}
            </FormHelperText>
          )}
        </FormControl>
      </div>

      <div className="flex">
        <b className="font-semibold select-none">Code</b>
        <span className="mx-1">:</span>
        <h2 className="text-blue-500 font-medium select-text">
          {id}
        </h2>
      </div>
    </div>
  );
}