import React, { useState, useEffect } from "react";
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
  Snackbar,
  Alert,
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
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: { primary: { main: "#2678E1" } },
  typography: { fontFamily: "Fredoka, sans-serif" },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  overflow: "hidden",
  borderRadius: 20,
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "row",
  maxHeight: "90vh",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    maxHeight: "none",
  },
}));

// 🔹 API helper (runs local + render in parallel)
const API_LOCAL = "http://localhost:3001/api/users";
const API_RENDER = "https://taskhawk-backend.onrender.com/api/users";

const callBoth = async (endpoint, options) => {
  const [localRes, renderRes] = await Promise.allSettled([
    fetch(`${API_LOCAL}${endpoint}`, options),
    fetch(`${API_RENDER}${endpoint}`, options),
  ]);

  // Prefer local response if available
  if (localRes.status === "fulfilled" && localRes.value.ok) {
    return localRes.value;
  }
  if (renderRes.status === "fulfilled" && renderRes.value.ok) {
    return renderRes.value;
  }

  throw new Error("Both APIs failed");
};

function SignupPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [step, setStep] = useState(1); // 1 = signup, 2 = OTP verify
  const [otp, setOtp] = useState("");

  // Timer for OTP
  const [timer, setTimer] = useState(120); // 2 minutes in seconds
  const [resendDisabled, setResendDisabled] = useState(true);

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Countdown timer
  useEffect(() => {
    if (step !== 2) return;

    if (timer <= 0) {
      setResendDisabled(false);
      return;
    }

    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, step]);

  // Helper to show snackbar
  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // 🔹 Handle signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      showSnackbar("Passwords do not match!", "error");
      return;
    }

    try {
      const res = await callBoth("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        showSnackbar("OTP sent to your email", "success");
        setStep(2);
        setTimer(120);
        setResendDisabled(true);
      } else {
        showSnackbar(data.message || "Something went wrong", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      showSnackbar("Server error", "error");
    }
  };

  // 🔹 Handle OTP verification
  const handleVerifyOtp = async () => {
    try {
      const res = await callBoth("/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp }),
      });

      const data = await res.json();
      if (res.ok) {
        showSnackbar("Email verified successfully", "success");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        showSnackbar(data.message || "OTP verification failed", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      showSnackbar("Server error", "error");
    }
  };

  // 🔹 Handle Resend OTP
  const handleResendOtp = async () => {
    try {
      const res = await callBoth("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        showSnackbar("OTP resent successfully", "success");
        setTimer(120);
        setResendDisabled(true);
      } else {
        showSnackbar(data.message || "Failed to resend OTP", "error");
      }
    } catch (error) {
      console.error(error);
      showSnackbar("Server error", "error");
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

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
          {/* Left image */}
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
              "& img": { width: "100%", height: "100%", objectFit: "cover" },
            }}
          >
            <img src={Signup} alt="Signup illustration" />
          </Box>

          {/* Right form */}
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#2678E1",
                color: "white",
                textAlign: "center",
                py: 4,
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                {step === 1 ? "Sign Up As" : "Verify OTP"}
              </Typography>
            </Box>

            <Box
              component="form"
              onSubmit={step === 1 ? handleSubmit : (e) => e.preventDefault()}
              sx={{
                padding: 5,
                overflowY: "auto",
                overflowX: "hidden",
                flex: 1,
              }}
            >
              {step === 1 ? (
                <>
                  <Typography
                    variant="h6"
                    align="center"
                    fontWeight="bold"
                    sx={{ mb: 3 }}
                  >
                    Create Your Account
                  </Typography>

                  <Grid container spacing={2}>
                    {/* First Name */}
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Typography variant="body2" fontWeight="500">
                        First Name
                      </Typography>
                      <TextField
                        fullWidth
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ mt: 1 }}
                      />
                    </Grid>

                    {/* Last Name */}
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Typography variant="body2" fontWeight="500">
                        Last Name
                      </Typography>
                      <TextField
                        fullWidth
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ mt: 1 }}
                      />
                    </Grid>

                    {/* Email */}
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Typography variant="body2" fontWeight="500">
                        Email
                      </Typography>
                      <TextField
                        fullWidth
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        type="email"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ mt: 1 }}
                      />
                    </Grid>

                    {/* Phone */}
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Typography variant="body2" fontWeight="500">
                        Phone
                      </Typography>
                      <TextField
                        fullWidth
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        type="tel"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Phone />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ mt: 1 }}
                      />
                    </Grid>

                    {/* Password */}
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Typography variant="body2" fontWeight="500">
                        Password
                      </Typography>
                      <TextField
                        fullWidth
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
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
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        sx={{ mt: 1 }}
                      />
                    </Grid>

                    {/* Confirm Password */}
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Typography variant="body2" fontWeight="500">
                        Confirm Password
                      </Typography>
                      <TextField
                        fullWidth
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
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
                              >
                                {showConfirmPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        sx={{ mt: 1 }}
                      />
                    </Grid>
                  </Grid>

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

                  <Button
                    type="submit"
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

                  <Typography align="center" sx={{ mt: 2 }}>
                    Already have an account?{" "}
                    <Link href="/login" underline="hover">
                      Log in
                    </Link>
                  </Typography>
                </>
              ) : (
                <>
                  <Typography
                    variant="h6"
                    align="center"
                    fontWeight="bold"
                    sx={{ mb: 3 }}
                  >
                    Enter OTP sent to {formData.email}
                  </Typography>

                  <TextField
                    fullWidth
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    sx={{ mb: 2 }}
                  />

                  <Typography variant="body2" align="center" sx={{ mb: 2 }}>
                    Expires in: {formatTime(timer)}
                  </Typography>

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleVerifyOtp}
                    sx={{ borderRadius: "20px", py: 1.2, mb: 1 }}
                  >
                    Verify OTP
                  </Button>

                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={handleResendOtp}
                    disabled={resendDisabled}
                    sx={{ borderRadius: "20px", py: 1.2 }}
                  >
                    Resend OTP
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </StyledPaper>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
            variant="filled"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}

export default SignupPage;
