import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

function createData(fieldId, fieldName, fieldType, fieldValue) {
  return { fieldId, fieldName, fieldType, fieldValue };
}

const TableComponent = () => {
  const URL = `${process.env.REACT_APP_SERVER}${process.env.REACT_APP_API}`;
  const [jsonObj, setJsonObj] = useState({});
  const [isoFields, setIsoFields] = useState({});
  const [isoFieldsConfig, setIsoFieldsConfig] = useState({});
  const [isoDonePushing, setIsoDonePushing] = useState(false);
  const [rows, setRows] = useState([createData("000", "MTI", "n")]);

  const handleChange = (e) => {
    let name = e.target.name;
    let id = e.target.id;
    let value = e.target.value;
    setJsonObj((jsonObj) => {
      return { ...jsonObj, [id]: value };
    });
  };

  console.log(jsonObj);

  const getFields = async () => {
    try {
      let res = await axios.get(`${URL}/iso8583/fields`);
      let resConfig = await axios.get(`${URL}/iso8583/config`);
      setIsoFields(res.data);
      setIsoFieldsConfig(resConfig.data);
      pushToRows();
    } catch (error) {
      console.log(error);
    }
  };

  const pushToRows = () => {
    for (let elment in isoFields) {
      let isoConfig = isoFieldsConfig[elment];
      let isoConfigFixedLength = isoConfig.fixedLength;
      let isoConfigType = isoConfig.contentType;
      let isoConfigContentLength = isoConfig.contentLength;
      let isoConfigMaxLength = isoConfig.maxLength;

      let contentLengthDots = isoConfigContentLength === 2 ? ".." : "...";

      let isoToArray = isoConfigFixedLength
        ? `${isoConfigType}  ${isoConfigContentLength}`
        : `${isoConfigType} ${contentLengthDots} ${isoConfigMaxLength}`;
      rows.push(createData(elment, isoFields[elment], isoToArray, "123456"));
    }
    setIsoDonePushing(true);
  };

  const createRows = () => {
    return (
      <>
        {rows.map((row) => (
          <TableRow
            key={uuidv4()}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row" align="center">
              {row.fieldId}
            </TableCell>
            <TableCell align="left">{row.fieldName}</TableCell>
            <TableCell align="left">{row.fieldType}</TableCell>
            <TableCell align="center">
              <TextField
                required={row.fieldName === "MTI" ? true : false}
                label={row.fieldName === "MTI" ? "Required" : ""}
                variant="filled"
                id={row.fieldId}
                name={row.fieldName}
                type={row.fieldType.substring(0, 1) === "n" ? "number" : "text"}
                inputProps={{ min: 0 }}
                onChange={(e) => handleChange(e)}
                value={jsonObj[row.fieldId]}
              />
            </TableCell>
          </TableRow>
        ))}
      </>
    );
  };

  useEffect(() => {
    getFields();
  }, []);

  useEffect(() => {
    pushToRows();
  }, [isoFields]);

  useEffect(() => {
    createRows();
  }, [isoDonePushing]);

  return (
    <TableContainer component={Paper} sx={{ height: 800 }}>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Id
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Name
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Type
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Value
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{createRows()}</TableBody>
      </Table>
    </TableContainer>
  );
};

export { TableComponent };
