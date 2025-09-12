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
  FormControlLabel,
  Checkbox,
  Snackbar,
  Alert,
} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Loginimg from "./../Assets/Login.png";
import { useNavigate } from "react-router-dom";

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

// 🔹 API URLs
const API_LOCAL = "http://localhost:3001/api/users";
const API_RENDER = "https://taskhawk-backend.onrender.com/api/users";

// 🔹 Helper: call both APIs
const callBoth = async (endpoint, options) => {
  const [localRes, renderRes] = await Promise.allSettled([
    fetch(`${API_LOCAL}${endpoint}`, options),
    fetch(`${API_RENDER}${endpoint}`, options),
  ]);

  if (localRes.status === "fulfilled" && localRes.value.ok) {
    return localRes.value;
  }
  if (renderRes.status === "fulfilled" && renderRes.value.ok) {
    return renderRes.value;
  }

  throw new Error("Both APIs failed");
};

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const showSnackbar = (message, severity = "success") =>
    setSnackbar({ open: true, message, severity });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await callBoth("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        showSnackbar("Login successful", "success");
        localStorage.setItem("token", data.token);
        setTimeout(() => navigate("/"), 1500);
      } else {
        showSnackbar(data.message || "Invalid credentials", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      showSnackbar("Server error", "error");
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
              "& img": { width: "100%", height: "100%", objectFit: "cover" },
            }}
          >
            <img src={Loginimg} alt="Login illustration" />
          </Box>

          {/* Right side form */}
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
                Login As
              </Typography>
            </Box>

            <Box
              component="form"
              onSubmit={handleSubmit}
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
                Welcome Back
              </Typography>

              {/* Email */}
              <Typography variant="body2" fontWeight="500" textAlign="left">
                Email Address
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
                  sx: { height: 40, borderRadius: "30px", mt: 2 },
                }}
              />

              {/* Password */}
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" fontWeight="500" textAlign="left">
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
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: { height: 40, borderRadius: "30px", mt: 2 },
                  }}
                />
              </Box>

              {/* Remember + Forgot */}
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <FormControlLabel control={<Checkbox />} label="Remember me" />
                <Link href="/forgot" underline="hover" fontSize="14px">
                  Forgot password?
                </Link>
              </Box>

              {/* Submit button */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  borderRadius: "20px",
                  textTransform: "none",
                  py: 1.2,
                }}
              >
                Let me in
              </Button>

              {/* Signup redirect */}
              <Typography align="center" sx={{ mt: 2 }}>
                Don’t have an account?{" "}
                <Link href="/signup" underline="hover">
                  Sign up
                </Link>
              </Typography>
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

export default Login;
