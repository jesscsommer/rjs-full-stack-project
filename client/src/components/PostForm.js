import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const defaultTheme = createTheme();

const PostForm = () => {
    return(
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="m">
                <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                            required
                            fullWidth
                            id="filled-multiline-static"
                            multiline
                            placeholder="Placeholder"
                            variant="filled"
                            InputProps={{endAdornment: 
                                <Button
                                    startIcon={<HistoryEduIcon />}
                                    >
                                        Post</Button>}}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            </Container>
        </ThemeProvider>
    )
}

export default PostForm