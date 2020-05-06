import React, { useState } from "react";
import { withStyles, TextField } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import ReactPhoneInput from "material-ui-phone-number";
import { mergeData } from "./localStorage";

const genders = [
  {
    value: "male",
    label: "Чоловіча",
  },
  {
    value: "female",
    label: "Жіноча",
  },
];

const styles = (theme) => ({
  field: {
    margin: "10px 0",
  },
  countryList: {
    ...theme.typography.body1,
  },
});

function Contacts() {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [gender, setGender] = React.useState("");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="p-4 d-flex flex-column">
      <form autoComplete="off">
        <div className="row d-flex flex-row">
          <TextField
            label="Фамілія"
            required
            error={!lastName}
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              mergeData({ lastName: e.target.value });
            }}
          />
          <TextField
            label="Ім'я"
            required
            error={!firstName}
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              mergeData({ firstName: e.target.value });
            }}
            className="ml-4"
          />
          <TextField
            label="По-батькові"
            required
            error={!patronymic}
            value={patronymic}
            onChange={(e) => {
              setPatronymic(e.target.value);
              mergeData({ patronymic: e.target.value });
            }}
            className="ml-4"
          />

          <TextField
            required
            select
            label="Стать"
            error={!gender}
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
              mergeData({ gender: e.target.value });
            }}
            className="ml-4 col-1"
          >
            {genders.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div className="row mt-2">
          <TextField
            label="Пошта"
            type="email"
            error={!email}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              mergeData({ email: e.target.value });
            }}
          />
          <ReactPhoneInput
            label="Телефон"
            required
            type="tel"
            error={!phone}
            value={phone}
            onChange={(value) => {
              setPhone(value);
              mergeData({ phone: value });
            }}
            defaultCountry="ua"
            className="ml-4"
          />
        </div>

        <div className="row mt-2" />
      </form>
    </div>
  );
}
export default withStyles(styles)(Contacts);
