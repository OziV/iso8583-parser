import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Apis = () => {
  const SERVER = process.env.REACT_APP_SERVER + process.env.REACT_APP_API;

  return (
    <div className="flex-center">
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <ListItemButton>
          <ListItemText>
            <h5>{SERVER}</h5>
            <p>Body object ⇒ msg: MSG</p>
          </ListItemText>
        </ListItemButton>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText>
                <CopyToClipboard text={`${SERVER}/parser/ascii`}>
                  <span>
                    <span className="margin-right">POST</span> /parser/ascii
                  </span>
                </CopyToClipboard>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText>
                <CopyToClipboard text={`${SERVER}/parser/json`}>
                  <span>
                    <span className="margin-right">POST</span> /parser/json
                  </span>
                </CopyToClipboard>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText>
                <CopyToClipboard text={`${SERVER}/iso8583/fields`}>
                  <span>
                    <span className="margin-right">GET</span> /iso8583/fields
                  </span>
                </CopyToClipboard>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText>
                <CopyToClipboard text={`${SERVER}/iso8583/config`}>
                  <span>
                    <span className="margin-right">GET</span> /iso8583/config
                  </span>
                </CopyToClipboard>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </div>
  );
};

export default Apis;
