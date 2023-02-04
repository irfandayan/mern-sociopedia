import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Sociopedia
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Sociopedia, the Social Media for Sociopaths!
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#00D5FA",
            mb: "20px",
          }}
        >
          <InfoOutlinedIcon />
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "14px",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
              ml: "2px",
              mt: "2px",
            }}
          >
            Use email: someguy@gmail.com & password: test
          </Typography>
        </Box>

        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
