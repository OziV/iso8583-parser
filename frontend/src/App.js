import { TextFieldComponent } from "./components/TextField";
import { Input } from "./components/Input";
import Json from "../src/pages/Json";
import { useContext, useEffect, useState } from "react";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IsoFields from "./pages/IsoFields";
import Ascii from "./pages/Ascii";
import { MainContext } from ".";
import IsoConfig from "./pages/IsoConfig";
import Apis from "./pages/Apis";

function App() {
  const [type, setType] = useState(null);

  const Header = () => {
    return (
      <div id="continer-main">
        <h1 className="flex-center">ISO8583 Parser</h1>
        <Stack spacing={2} direction="row" className="flex-center">
          <Button
            disabled={type === "json" ? true : false}
            variant="contained"
            color="success"
            onClick={() => setType("json")}
            size="large"
          >
            ASCII ⇒ JSON
          </Button>
          <Button
            disabled={type === "ascii" ? true : false}
            variant="contained"
            color="success"
            onClick={() => setType("ascii")}
            size="large"
          >
            JSON ⇒ ASCII
          </Button>
        </Stack>

        <Stack
          spacing={2}
          direction="row"
          className="flex-center"
          sx={{ m: 1 }}
        >
          <Button
            disabled={type === "fields" ? true : false}
            size="small"
            variant="contained"
            color="warning"
            onClick={() => setType("fields")}
          >
            ISO FIELDS
          </Button>
          <Button
            disabled={type === "config" ? true : false}
            size="small"
            variant="contained"
            color="warning"
            onClick={() => setType("config")}
          >
            ISO Config
          </Button>
          <Button
            disabled={type === "apis" ? true : false}
            size="small"
            variant="contained"
            color="warning"
            onClick={() => setType("apis")}
          >
            APIs
          </Button>
        </Stack>
      </div>
    );
  };

  const Footer = () => {
    const getYear = new Date().getFullYear();

    return (
      <div className="flex-center">
        <h6>© {getYear} OziV</h6>
      </div>
    );
  };

  if (!type) {
    return (
      <>
        <Header />
        <Footer />
      </>
    );
  }

  if (type === "json") {
    return (
      <>
        <Header />
        <Json type={type} />
        <Footer />
      </>
    );
  }

  if (type === "ascii") {
    return (
      <>
        <Header />
        <Ascii type={type} />
        <Footer />
      </>
    );
  }

  if (type === "fields") {
    return (
      <>
        <Header />
        <IsoFields type={type} />
        <Footer />
      </>
    );
  }

  if (type === "config") {
    return (
      <>
        <Header />
        <IsoConfig type={type} />
        <Footer />
      </>
    );
  }

  if (type === "apis") {
    return (
      <>
        <Header />
        <Apis type={type} />
        <Footer />
      </>
    );
  }
}

export default App;
