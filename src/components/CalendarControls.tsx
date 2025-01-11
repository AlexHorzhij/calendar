import { Dispatch, SetStateAction, useEffect, useState } from "react";

import {
  InputLabel,
  MenuItem,
  FormControl,
  Box,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { API } from "../utils/API";

type Country = {
  name: string;
  countryCode: string;
};

export const CalendarControls = ({
  setCountry,
  currentCountry = "UA",
}: {
  setCountry: Dispatch<SetStateAction<string>>;
  currentCountry: string;
}) => {
  const [countries, setCountries] = useState<Country[] | null>(null);

  const handleChange = (event: SelectChangeEvent) => {
    setCountry(event.target.value as string);
  };

  useEffect(() => {
    API.getAllCountries().then((data) => setCountries(data));
  }, []);

  return (
    <Box sx={{ width: "15rem", marginBottom: "1rem" }}>
      <FormControl fullWidth variant="standard">
        <InputLabel id="country-select-label">Country</InputLabel>
        <Select
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
      </FormControl>
    </Box>
  );
};
