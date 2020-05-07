import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CheckIcon from "@material-ui/icons/Check";
import Fab from "@material-ui/core/Fab";
import { Link } from "react-router-dom";
import LastStep from "./lastStep";
import CreditModule from "./currentCreditModule";
import University from "./university";
import Review from "./review";
import { clearData, initData, uploadData } from "./localStorage";

import Contacts from "./contacts";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    "Контактні дані",
    "Дані поточного освітного кредитного модуля",
    "Університет для релокації",
    "Відгук",
    "Відправка документів",
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Contacts />;
    case 1:
      return <CreditModule />;
    case 2:
      return <University />;
    case 3:
      return <Review />;
    case 4:
      return <LastStep />;
    default:
      return <div>error</div>;
  }
}

const handleLastStep = async () => {
  await uploadData();
  clearData();
};

export default () => {
  initData();
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const steps = getSteps();

  const isStepOptional = (step) => step === 3;

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      await handleLastStep();
    }

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Опціональний</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              Ви - молодець, заповнили усі дані!
              <br />
              <Fab color="primary" className="my-3">
                <CheckIcon />
              </Fab>
              <br />
              Можете перейти на{" "}
              <Link to="/list">список людей, що подали документи</Link>
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              На початок
            </Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Назад
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Пропустити
                </Button>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? "Закінчити" : "Далі"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
