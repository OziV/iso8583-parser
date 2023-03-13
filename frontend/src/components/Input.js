import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { FormControl, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { v4 as uuidv4 } from "uuid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { TextFieldComponent } from "./TextField";
import { TableComponent } from "./Table";

const URL = `${process.env.REACT_APP_SERVER}${process.env.REACT_APP_API}`;

const InputComponent = (props) => {
  const { type } = props;
  const [msgData, setMsgData] = useState("");
  const [returnData, setReturnData] = useState("");
  const [isBuildJson, setIsBuildJson] = useState(false);

  const handleChange = (e) => {
    setMsgData(e.target.value);
  };

  const handelOnSubmit = (e) => {
    e.preventDefault();
    sendReq(msgData);
  };

  const sendReq = async (msgData) => {
    let res;
    try {
      if (type === "fields") {
        res = await axios.get(`${URL}/iso8583/${type}`);
      } else if (type === "config") {
        res = await axios.get(`${URL}/iso8583/${type}`);
      } else {
        res = await axios.post(`${URL}/parser/${type}`, { msg: msgData });
      }
      let data = res.data;
      setReturnData(data);
      // setMsgData("");
      return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (type === "fields" || type === "config") {
      sendReq();
    }
    setReturnData("");
  }, [type]);

  useEffect(() => {}, [type]);

  const InputBox = (props) => {
    const { type, isBuildJson } = props;

    return (
      <div id="container">
        <form onSubmit={handelOnSubmit}>
          <Box
            sx={{
              width: 800,
              maxWidth: "100%",
              justifyContent: "center",
            }}
            noValidate
          >
            {!isBuildJson ? (
              <>
                <p>
                  e.g. <span>&#10100;</span> "MTI"*: "0100", "dataElements":{" "}
                  <span>&#10100;</span> "2": "1234567891123456" , "3": "123456"
                  ...
                  <span>&#10101;</span>
                  <span>&#10101;</span>
                </p>
                <TextField
                  id="msgData"
                  name="msgData"
                  className="fields-item"
                  multiline={type === "ascii" ? true : false}
                  rows={25}
                  label="MSG"
                  fullWidth
                  onChange={handleChange}
                  value={msgData}
                />
              </>
            ) : (
              <TableComponent />
            )}
          </Box>
          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={2}
            sx={{ pt: 1 }}
          >
            <Button variant="contained" type="submit" size="large">
              SEND
            </Button>
          </Stack>
        </form>
      </div>
    );
  };

  const BtnsForBuildJson = (props) => {
    const { type } = props;

    return (
      <div className="flex-center">
        <Box sx={{ "& button": { m: 1 } }}>
          <div>
            <Button
              disabled={isBuildJson ? false : true}
              variant="contained"
              size="medium"
              onClick={() => setIsBuildJson(false)}
            >
              JSON OBJ
            </Button>
            <Button
              disabled={isBuildJson ? true : false}
              variant="contained"
              size="medium"
              onClick={() => setIsBuildJson(true)}
            >
              BUILD JSON
            </Button>
          </div>
        </Box>
      </div>
    );
  };

  if (type === "json") {
    return (
      <>
        <div id="continer-main">
          <InputBox />
          <TextFieldComponent returnData={returnData} />
        </div>
      </>
    );
  }

  if (type === "ascii") {
    return (
      <>
        <div id="continer-main">
          <BtnsForBuildJson />
          <TextFieldComponent returnData={returnData} type={type} />
          <InputBox type={type} isBuildJson={isBuildJson} />
        </div>
      </>
    );
  }

  if (type === "fields") {
    return (
      <>
        <div id="continer-main">
          <TextFieldComponent returnData={returnData} />
        </div>
      </>
    );
  }

  if (type === "config") {
    return (
      <>
        <div id="continer-main">
          <TextFieldComponent returnData={returnData} />
        </div>
      </>
    );
  }
};
export { InputComponent };
