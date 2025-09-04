import React, { useState } from "react";
import { TextField, Button, Card, CardContent, Typography, Grid } from "@mui/material";
import { generateShortCode, validateUrl } from "../utils/urlUtils";
import { useLogger } from "../context/LoggingContext";

const ShortenerPage = ({ onShorten }) => {
  const [urls, setUrls] = useState([{ longUrl: "", validity: "", shortcode: "" }]);
  const logger = useLogger();

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const addUrlField = () => {
    if (urls.length < 5) {
      setUrls([...urls, { longUrl: "", validity: "", shortcode: "" }]);
    }
  };

  const handleSubmit = () => {
    urls.forEach((urlData) => {
      if (!validateUrl(urlData.longUrl)) {
        logger.error("Invalid URL provided", urlData.longUrl);
        return;
      }

      const code = urlData.shortcode || generateShortCode();
      const expiry = urlData.validity ? parseInt(urlData.validity) : 30; // default 30 mins
      const shortUrl = `${window.location.origin}/${code}`;

      const record = {
        ...urlData,
        code,
        shortUrl,
        expiry,
        createdAt: new Date().toISOString(),
        clicks: [],
      };

      logger.info("Shortened URL created", record);
      onShorten(record);
    });
  };

  return (
    <Card sx={{ m: 2, p: 2 }}>
      <CardContent>
        <Typography variant="h5">Shorten Your URLs</Typography>
        {urls.map((url, index) => (
          <Grid container spacing={2} key={index} sx={{ mt: 2 }}>
            <Grid item xs={12} md={5}>
              <TextField
                label="Original URL"
                fullWidth
                value={url.longUrl}
                onChange={(e) => handleChange(index, "longUrl", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Validity (minutes)"
                fullWidth
                value={url.validity}
                onChange={(e) => handleChange(index, "validity", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Custom Shortcode (optional)"
                fullWidth
                value={url.shortcode}
                onChange={(e) => handleChange(index, "shortcode", e.target.value)}
              />
            </Grid>
          </Grid>
        ))}
        <Button sx={{ mt: 2 }} variant="outlined" onClick={addUrlField}>
          + Add Another URL
        </Button>
        <Button sx={{ mt: 2, ml: 2 }} variant="contained" onClick={handleSubmit}>
          Shorten
        </Button>
      </CardContent>
    </Card>
  );
};

export default ShortenerPage;
