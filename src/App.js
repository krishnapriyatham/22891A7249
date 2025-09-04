import React, { useState } from "react";
import ShortenerPage from "./pages/ShortenerPage";
import StatsPage from "./pages/StatsPage";
import { LoggingProvider } from "./context/LoggingContext";
import { Container, Button } from "@mui/material";

function App() {
  const [urls, setUrls] = useState([]);
  const [view, setView] = useState("shortener");

  const handleShorten = (record) => {
    setUrls([...urls, record]);
  };

  return (
    <LoggingProvider>
      <Container>
        <Button sx={{ m: 2 }} onClick={() => setView("shortener")}>Shortener</Button>
        <Button sx={{ m: 2 }} onClick={() => setView("stats")}>Statistics</Button>

        {view === "shortener" && <ShortenerPage onShorten={handleShorten} />}
        {view === "stats" && <StatsPage urls={urls} />}
      </Container>
    </LoggingProvider>
  );
}

export default App;
