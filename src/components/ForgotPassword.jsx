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

const theme = createTheme({
  palette: { primary: { main: "#2678E1" } },
  typography: { fontFamily: "Fredoka, sans-serif" },
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

  // ✅ Create refs at the top level
  const otpRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return; // only digits allowed
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs[index + 1].current.focus(); // move to next input
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs[index - 1].current.focus(); // move to previous input
    }
  };

  const handleSendOtp = async () => {
    if (!email) {
      setSnackbar({
        open: true,
        message: "Enter your email",
        severity: "error",
      });
      return;
    }
    try {
      const res = await fetch(
        "http://localhost:3001/api/users/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      if (!res.ok) throw new Error(data.message || "Failed to send OTP");

      setSnackbar({ open: true, message: data.message, severity: "success" });
      setStep(2);
    } catch (error) {
      setSnackbar({ open: true, message: error.message, severity: "error" });
    }
  };

  const handleVerifyOtp = () => {
    const otpCode = otp.join("");
    if (!otpCode || otpCode.length !== 6) {
      setSnackbar({
        open: true,
        message: "Enter valid 6-digit OTP",
        severity: "error",
      });
      return;
    }
    setStep(3);
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setSnackbar({
        open: true,
        message: "Passwords do not match",
        severity: "error",
      });
      return;
    }
    try {
      const otpCode = otp.join("");
      const res = await fetch(
        "http://localhost:3001/api/users/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp: otpCode, newPassword }),
        }
      );

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      if (!res.ok) throw new Error(data.message || "Failed to reset password");

      setSnackbar({ open: true, message: data.message, severity: "success" });

      setTimeout(() => {
        navigate("/login"); // navigate to login
      }, 2000);

      setStep(1);
      setEmail("");
      setOtp(["", "", "", "", "", ""]);
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setSnackbar({ open: true, message: error.message, severity: "error" });
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

            <Box
              sx={{
                padding: 5,
                overflowY: "auto",
                overflowX: "hidden",
                flex: 1,
              }}
            >
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
