import React, { useCallback, useState, useEffect } from "react";

import LinearProgress from "@material-ui/core/LinearProgress";
import { useDropzone } from "react-dropzone";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import DescriptionIcon from "@material-ui/icons/Description";
import Divider from "@material-ui/core/Divider";
import CheckIcon from "@material-ui/icons/Check";
import Fab from "@material-ui/core/Fab";
import { green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    marginTop: 20,
    marginRight: "auto",
    marginLeft: "auto",
  },
}));

function CreditModule() {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  let startLoad = false;

  const classes = useStyles();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!startLoad) return;
      setProgress((p) => {
        if (p > 100) {
          setCompleted(true);
          clearInterval(interval);
          return 100;
        }
        return p + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    startLoad = true;
    setFiles(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="p-4 d-flex flex-column">
      <div {...getRootProps()} className="border border-primary p-2">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Так, сюди!</p>
        ) : (
          <p>Загрузіть файли щодо вашого освітнього кредитного модуля</p>
        )}
      </div>

      <List className="mt-5">
        {files.map((file) => {
          return (
            <>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <DescriptionIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={file.name} />
              </ListItem>
              <Divider variant="inset" component="li" />
            </>
          );
        })}
      </List>
      {progress !== 0 && (
        <>
          <LinearProgress
            value={progress}
            variant="determinate"
            className="mt-5"
          />
          {completed && (
            <Fab
              aria-label="save"
              color="primary"
              className={classes.buttonProgress}
            >
              <CheckIcon />
            </Fab>
          )}
        </>
      )}
    </div>
  );
}
export default CreditModule;
