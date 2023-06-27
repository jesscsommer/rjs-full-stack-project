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
            <Container component="main" maxWidth="lg">
                <CssBaseline />
            <Box
            component="form"
            sx={{
                marginTop: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
            >
                    <Grid container justifyContent="center" spacing={2}>
                        <Grid item xs={6}>
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
            </Container>
        </ThemeProvider>
    )
}

export default PostForm