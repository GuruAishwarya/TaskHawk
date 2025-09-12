import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  ThemeProvider,
  createTheme,
  InputAdornment,
  IconButton,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import {
  Person,
  Email,
  Lock,
  Phone,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Signup from "./../Assets/Signup.png";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2678E1",
    },
  },
  typography: {
    fontFamily: "Fredoka, sans-serif",
  },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  overflow: "hidden",
  borderRadius: 20,
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  display: "flex",
  flexDirection: "row",
  maxHeight: "90vh",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    maxHeight: "none",
  },
}));

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="lg"
        sx={{
          py: 4,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          overflowX: "hidden",
        }}
      >
        <StyledPaper sx={{ width: "100%" }}>
          {/* Left side image */}
          <Box
            sx={{
              width: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              [theme.breakpoints.down("md")]: {
                width: "100%",
                height: "250px",
              },
              "& img": {
                width: "100%",
                height: "100%",
                objectFit: "cover",
              },
            }}
          >
            <img src={Signup} alt="Signup illustration" />
          </Box>

          {/* Right side form */}
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <Box
              sx={{
                backgroundColor: "#2678E1",
                color: "white",
                textAlign: "center",
                py: 4,
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                Sign Up As
              </Typography>
            </Box>

            {/* Form body */}
            <Box
              sx={{
                padding: 5,
                overflowY: "auto",
                overflowX: "hidden",
                flex: 1,
              }}
            >
              <Typography
                variant="h6"
                align="center"
                fontWeight="bold"
                sx={{ mb: 3 }}
              >
                Create Your Account
              </Typography>

              <Grid container spacing={2}>
                {/* Firstname */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="body2" fontWeight="500" textAlign="left">
                    First Name
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Enter your first name"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                      sx: { height: 40, borderRadius: "30px",mt: 2},
                    }}
                  />
                </Grid>

                {/* Lastname */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="body2" fontWeight="500" textAlign="left">
                    Last Name
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Enter your last name"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                      sx: { height: 40, borderRadius: "30px",mt: 2},
                    }}
                  />
                </Grid>

                {/* Email */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="body2" fontWeight="500" textAlign="left">
                    Email
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Enter your email"
                    type="email"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                      sx: { height: 40, borderRadius: "30px",mt: 2},
                    }}
                  />
                </Grid>

                {/* Phone number */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="body2" fontWeight="500" textAlign="left">
                    Phone Number
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Enter your phone number"
                    type="tel"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone />
                        </InputAdornment>
                      ),
                      sx: { height: 40, borderRadius: "30px",mt: 2},
                    }}
                  />
                </Grid>

                {/* Password */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="body2" fontWeight="500" textAlign="left">
                    Password
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      sx: { height: 40, borderRadius: "30px",mt: 2},
                    }}
                  />
                </Grid>

                {/* Confirm Password */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="body2" fontWeight="500" textAlign="left">
                    Confirm Password
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Re-enter your password"
                    type={showConfirmPassword ? "text" : "password"}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                      sx: { height: 40, borderRadius: "30px",mt: 2},
                    }}
                  />
                </Grid>
              </Grid>

              {/* Terms & Conditions */}
              <FormControlLabel
                control={<Checkbox />}
                label={
                  <Typography variant="body2">
                    I agree to the{" "}
                    <Link href="#" underline="hover">
                      Terms and Conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="#" underline="hover">
                      Privacy Policy
                    </Link>
                  </Typography>
                }
                sx={{ mt: 2 }}
              />

              {/* Submit */}
              <Button
                variant="contained"
                fullWidth
                sx={{
                  mt: 1,
                  borderRadius: "20px",
                  textTransform: "none",
                  py: 1.2,
                }}
              >
                Register Now
              </Button>

              {/* Already have account */}
              <Typography align="center" sx={{ mt: 2 }}>
                Already have an account?{" "}
                <Link href="#" underline="hover">
                  Log in
                </Link>
              </Typography>
            </Box>
          </Box>
        </StyledPaper>
      </Container>
    </ThemeProvider>
  );
}

export default SignupPage;
