import React from "react";

import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import universities from "./universities.json";
import { mergeData } from "./localStorage";

const getOptionLabel = (option) => {
  return (
    option["Назва закладу освіти"] ||
    option["Коротка назва"] ||
    option["Назва закладу освіти (англ.)"]
  );
};

function CreditModule() {
  return (
    <div className="p-4 d-flex flex-row">
      <div className="d-flex flex-column">
        Вкажіть ваш поточний університет
        <Autocomplete
          className="mt-2"
          options={universities}
          onChange={(_event, value) => {
            mergeData({ homeUniversity: value });
          }}
          getOptionLabel={getOptionLabel}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Вкажіть університет"
              variant="outlined"
            />
          )}
        />
      </div>
      <div className="ml-5 d-flex flex-column">
        Вкажіть університет, у який хочете вступити
        <Autocomplete
          className="mt-2"
          options={universities}
          onChange={(_event, value) => {
            mergeData({ targetUniversity: value });
          }}
          getOptionLabel={getOptionLabel}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Вкажіть бажаний університет"
              variant="outlined"
            />
          )}
        />
      </div>
    </div>
  );
}
export default CreditModule;
