import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { CopyToClipboard } from "react-copy-to-clipboard";

const TextFieldComponent = (returnData) => {
  const { type } = returnData;
  const [incomingData, setIncomingData] = useState(returnData.returnData);

  useEffect(() => {
    setIncomingData(returnData.returnData);
  }, [returnData]);

  return (
    <div className="flex-center">
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: 800 },

          maxWidth: "100%",
          justifyContent: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="filled-multiline-static"
            label={type === "ascii" ? "ASCII" : "JSON"}
            multiline={type === "ascii" ? false : true}
            rows={25}
            variant="filled"
            fullWidth
            value={
              incomingData
                ? JSON.stringify(incomingData, null, " ")
                : "Waiting for the request to be sent..."
            }
          />
        </div>

        <Button
          variant="contained"
          color="secondary"
          sx={{ m: 1 }}
          size="small"
        >
          <CopyToClipboard
            text={JSON.stringify(incomingData, null, " ")}
            // onCopy={() => this.setState({ copied: true })}
          >
            <span>Copy to clipboard</span>
          </CopyToClipboard>
        </Button>
      </Box>
    </div>
  );
};
export { TextFieldComponent };
