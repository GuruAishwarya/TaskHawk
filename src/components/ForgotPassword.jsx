import React, { useState, useRef } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  ThemeProvider,
  createTheme,
  Snackbar,
  Alert,
} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Signup from "./../Assets/Signup.png";
import axios from "axios";

// 🔹 MUI theme with Fredoka
const theme = createTheme({
  palette: { primary: { main: "#2678E1" } },
  typography: { fontFamily: "Fredoka, sans-serif" },
});

// 🔹 Styled Paper
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

// 🔹 API base URL (same as Login.jsx)
const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://taskhawk-backend.onrender.com/api/users"
    : "http://localhost:3001/api/users";

function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const otp0 = useRef(null);
  const otp1 = useRef(null);
  const otp2 = useRef(null);
  const otp3 = useRef(null);
  const otp4 = useRef(null);
  const otp5 = useRef(null);
  const otpRefs = [otp0, otp1, otp2, otp3, otp4, otp5];

  const showSnackbar = (message, severity = "success") =>
    setSnackbar({ open: true, message, severity });

  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) otpRefs[index + 1].current.focus();
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0)
      otpRefs[index - 1].current.focus();
  };

  // Step 1: Send OTP
  const handleSendOtp = async () => {
    if (!email) return showSnackbar("Enter your email", "error");
    try {
      const { data } = await axios.post(`${API_BASE}/forgot-password`, {
        email,
      });
      showSnackbar(data.message, "success");
      setStep(2);
    } catch (error) {
      showSnackbar(
        error.response?.data?.message || "Failed to send OTP",
        "error"
      );
    }
  };

  // Step 2: Verify OTP locally
  const handleVerifyOtp = () => {
    const otpCode = otp.join("");
    if (!otpCode || otpCode.length !== 6)
      return showSnackbar("Enter valid 6-digit OTP", "error");
    setStep(3);
  };

  // Step 3: Reset password
  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword)
      return showSnackbar("Passwords do not match", "error");
    try {
      const otpCode = otp.join("").toString();
      const { data } = await axios.post(`${API_BASE}/reset-password`, {
        email,
        otp: otpCode,
        newPassword,
      });
      showSnackbar(data.message, "success");
      setTimeout(() => navigate("/login"), 2000);
      setStep(1);
      setEmail("");
      setOtp(["", "", "", "", "", ""]);
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      showSnackbar(
        error.response?.data?.message || "Failed to reset password",
        "error"
      );
    }
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
            <img src={Signup} alt="Forgot password" />
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
                Forgot Password
              </Typography>
            </Box>

            <Box sx={{ p: 5, overflowY: "auto", flex: 1 }}>
              {step === 1 && (
                <>
                  <Typography
                    variant="h6"
                    align="center"
                    fontWeight="bold"
                    sx={{ mb: 3 }}
                  >
                    Reset Your Password
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                      sx: { height: 40, borderRadius: "30px", mt: 2 },
                    }}
                  />
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 3, borderRadius: "20px", py: 1.2 }}
                    onClick={handleSendOtp}
                  >
                    Send OTP
                  </Button>
                </>
              )}

              {step === 2 && (
                <>
                  <Typography
                    variant="h6"
                    align="center"
                    fontWeight="bold"
                    sx={{ mb: 3 }}
                  >
                    Enter OTP
                  </Typography>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", gap: 2 }}
                  >
                    {otp.map((digit, index) => (
                      <TextField
                        key={index}
                        value={digit}
                        onChange={(e) => handleOtpChange(e.target.value, index)}
                        onKeyDown={(e) => handleOtpKeyDown(e, index)}
                        inputRef={otpRefs[index]}
                        inputProps={{
                          maxLength: 1,
                          placeholder: "-",
                          style: { textAlign: "center", fontSize: "20px" },
                        }}
                        sx={{ width: 60, "& input": { p: "10px" } }}
                      />
                    ))}
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 3, borderRadius: "20px", py: 1.2 }}
                    onClick={handleVerifyOtp}
                  >
                    Verify
                  </Button>
                </>
              )}

              {step === 3 && (
                <>
                  <Typography
                    variant="h6"
                    align="center"
                    fontWeight="bold"
                    sx={{ mb: 3 }}
                  >
                    Set New Password
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Enter new password"
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
                      sx: { height: 40, borderRadius: "30px", mt: 2 },
                    }}
                  />
                  <TextField
                    fullWidth
                    placeholder="Confirm new password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                      sx: { height: 40, borderRadius: "30px", mt: 2 },
                    }}
                  />
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 3, borderRadius: "20px", py: 1.2 }}
                    onClick={handleResetPassword}
                  >
                    Reset Password
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
          <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}

export default ForgotPassword;
