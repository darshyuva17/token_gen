import React, { useState } from 'react';
import { 
  Container, 
  TextField, 
  Button, 
  Grid, 
  Paper, 
  Typography,
  Box
} from '@mui/material';

function App() {
  const [formData, setFormData] = useState({
    blueTokens: '',
    bluePrefix: '',
    bluePerRow: '',
    redTokens: '',
    redPrefix: '',
    redPerRow: ''
  });

  const [tokens, setTokens] = useState({ blue: [], red: [] });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const generateTokens = () => {
    const blueTokens = Array.from({ length: parseInt(formData.blueTokens) }, (_, i) => 
      `${formData.bluePrefix}${i + 1}`
    );
    const redTokens = Array.from({ length: parseInt(formData.redTokens) }, (_, i) => 
      `${formData.redPrefix}${i + 1}`
    );
    setTokens({ blue: blueTokens, red: redTokens });
  };

  const clearForm = () => {
    setFormData({
      blueTokens: '',
      bluePrefix: '',
      bluePerRow: '',
      redTokens: '',
      redPrefix: '',
      redPerRow: ''
    });
    setTokens({ blue: [], red: [] });
  };

  const renderTokens = (tokens, perRow, color) => {
    const rows = [];
    for (let i = 0; i < tokens.length; i += parseInt(perRow)) {
      rows.push(
        <Grid container spacing={1} key={i}>
          {tokens.slice(i, i + parseInt(perRow)).map((token, index) => (
            <Grid item key={index}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 1, 
                  backgroundColor: color, 
                  color: 'white',
                  width: '100px',
                  textAlign: 'center'
                }}
              >
                {token}
              </Paper>
            </Grid>
          ))}
        </Grid>
      );
    }
    return rows;
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Token Generator
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Number of blue tokens"
            name="blueTokens"
            value={formData.blueTokens}
            onChange={handleChange}
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Prefix for blue tokens"
            name="bluePrefix"
            value={formData.bluePrefix}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Blue tokens per row"
            name="bluePerRow"
            value={formData.bluePerRow}
            onChange={handleChange}
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Number of red tokens"
            name="redTokens"
            value={formData.redTokens}
            onChange={handleChange}
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Prefix for red tokens"
            name="redPrefix"
            value={formData.redPrefix}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Red tokens per row"
            name="redPerRow"
            value={formData.redPerRow}
            onChange={handleChange}
            type="number"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={generateTokens}>
            Generate
          </Button>
          <Button variant="outlined" color="secondary" onClick={clearForm} sx={{ ml: 2 }}>
            Clear
          </Button>
        </Grid>
      </Grid>
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Blue Tokens
        </Typography>
        {renderTokens(tokens.blue, formData.bluePerRow, 'blue')}
      </Box>
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Red Tokens
        </Typography>
        {renderTokens(tokens.red, formData.redPerRow, 'red')}
      </Box>
    </Container>
  );
}

export default App;