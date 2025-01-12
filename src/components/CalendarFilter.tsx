import { Dispatch, SetStateAction, useEffect, useState } from "react";

import {
  InputLabel,
  MenuItem,
  FormControl,
  Box,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { API } from "../utils/API";

type Country = {
  name: string;
  countryCode: string;
};

export const CalendarFilter = ({
  setCountry,
  currentCountry = "UA",
  setTaskFilter,
}: {
  setCountry: Dispatch<SetStateAction<string>>;
  currentCountry: string;
  setTaskFilter: Dispatch<SetStateAction<string>>;
}) => {
  const [countries, setCountries] = useState<Country[] | null>(null);

  const handleChange = (event: SelectChangeEvent) => {
    setCountry(event.target.value as string);
  };

  useEffect(() => {
    API.getAllCountries().then((data) => setCountries(data));
  }, []);

  return (
    <Box
      sx={{
        marginBottom: "0.5rem",
        display: "flex",
        gap: "2rem",
      }}
    >
      <FormControl
        fullWidth
        variant="standard"
        sx={{ display: "flex", flexDirection: "row", gap: "2rem" }}
      >
        <InputLabel id="country-select-label">Country</InputLabel>
        <Select
          sx={{ width: "10rem" }}
          labelId="country-select-label"
          id="country-select"
          value={countries ? currentCountry : ""}
          label="Country"
          onChange={handleChange}
        >
          {countries &&
            countries?.map((country) => {
              return (
                <MenuItem key={country.countryCode} value={country.countryCode}>
                  {country.name}
                </MenuItem>
              );
            })}
        </Select>
        <TextField
          id="standard-basic"
          label="Search task"
          variant="standard"
          onChange={(e) => setTaskFilter(e.target.value)}
        />
      </FormControl>
    </Box>
  );
};
