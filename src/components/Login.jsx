import React, { useState } from "react";
import axios from "axios";
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
  width: "100%",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    maxHeight: "none",
  },
}));

// 🔹 API base URL (local only)
const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://taskhawk-backend.onrender.com"
    : "http://localhost:3001/api/users";

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
      const { data } = await axios.post(`${API_BASE}/login`, formData);
      showSnackbar("Login successful", "success");
      localStorage.setItem("token", data.token);
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      showSnackbar(
        error.response?.data?.message || "Invalid credentials",
        "error"
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 2, sm: 4 },
          height: { xs: "auto", md: "100vh" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <StyledPaper>
          {/* Left side image */}
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              height: { xs: "200px", sm: "280px", md: "auto" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
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
                py: { xs: 2, md: 4 },
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                fontSize={{ xs: 16, sm: 18 }}
              >
                Login As
              </Typography>
            </Box>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ p: { xs: 2, sm: 3, md: 5 }, overflowY: "auto", flex: 1 }}
            >
              <Typography
                variant="h6"
                align="center"
                fontWeight="bold"
                sx={{ mb: 3, fontSize: { xs: 16, sm: 18 } }}
              >
                Welcome Back
              </Typography>

              {/* Email */}
              <Typography
                variant="body2"
                fontWeight="500"
                textAlign="left"
                sx={{ fontSize: { xs: 12, sm: 14 } }}
              >
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
                      <Email fontSize="small" />
                    </InputAdornment>
                  ),
                  sx: {
                    height: { xs: 36, sm: 40 },
                    borderRadius: "30px",
                    mt: 2,
                    fontSize: { xs: 12, sm: 14 },
                  },
                }}
              />

              {/* Password */}
              <Box sx={{ mt: 3 }}>
                <Typography
                  variant="body2"
                  fontWeight="500"
                  textAlign="left"
                  sx={{ fontSize: { xs: 12, sm: 14 } }}
                >
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
                        <Lock fontSize="small" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: {
                      height: { xs: 36, sm: 40 },
                      borderRadius: "30px",
                      mt: 2,
                      fontSize: { xs: 12, sm: 14 },
                    },
                  }}
                />
              </Box>

              {/* Remember + Forgot */}
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-between",
                  alignItems: { xs: "flex-start", sm: "center" },
                  gap: 1,
                }}
              >
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label={
                    <Typography sx={{ fontSize: { xs: 12, sm: 14 } }}>
                      Remember me
                    </Typography>
                  }
                />
                <Link
                  href="/forgot"
                  underline="hover"
                  sx={{ fontSize: { xs: 12, sm: 14 } }}
                >
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
                  py: { xs: 1, sm: 1.2 },
                  fontSize: { xs: 13, sm: 15 },
                }}
              >
                Let me in
              </Button>

              {/* Signup redirect */}
              <Typography
                align="center"
                sx={{ mt: 2, fontSize: { xs: 12, sm: 14 } }}
              >
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
