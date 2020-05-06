import React, { useState } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { mergeData } from "./localStorage";

function CreditModule() {
  const [review, setReview] = useState("");
  return (
    <div className="p-4 d-flex flex-row">
      <div className="ml-5 d-flex flex-column">
        Якщо бажаєте, можете написати свій відгук щодо сервісу
        <TextareaAutosize
          aria-label="empty textarea"
          placeholder="Відгук"
          value={review}
          onChange={(e) => {
            setReview(e.target.value);
            mergeData({ review: e.target.value });
          }}
        />
      </div>
    </div>
  );
}
export default CreditModule;
