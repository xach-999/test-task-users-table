import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import defaultAvatar from "../assets/images/default-avatar.png";
import organization from "../assets/images/organization.png";
import { memo } from "react";

const HeaderSection = () => {
  return (
    <Box sx={{ paddingX: 3, paddingY: 4 }}>
      <Box
        sx={{
          borderRadius: "17px",
          background: "#121825",
          display: "flex",
          justifyContent: "space-between",
          paddingX: 3,
          paddingY: 2,
          alignItems: "center",
        }}
      >
        <Box
          sx={(theme) => ({
            display: "flex",
            columnGap: "44px",
            alignItems: "center",
            [theme.breakpoints.down("sm")]: {
              justifyContent: "space-between",
              width: "100%",
            },
          })}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: "22px",
              fontWeight: "600",
            }}
          >
            BitTest
          </Typography>
          <Box
            sx={{
              display: "flex",
              columnGap: "10px",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                paddingX: "4px",
                borderRadius: "4px",
                background: "#222B44",
              }}
            >
              <img src={organization} width={16} height={16} />
            </Box>
            <Typography
              sx={{
                color: "white",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              Моя организация
            </Typography>
          </Box>
        </Box>

        <Box
          sx={(theme) => ({
            padding: "8px 16px",
            borderRadius: "6px",
            border: "1px solid #222B44",
            background: "#121825",
            display: "flex",
            alignItems: "center",
            columnGap: "12px",
            [theme.breakpoints.down("sm")]: {
              display: "none",
            },
          })}
        >
          <img src={defaultAvatar} />
          <Box>
            <Typography
              sx={{
                color: "#616D8D",
                fontSize: "12px",
                fontWeight: "400",
              }}
            >
              Вы авторизованы
            </Typography>
            <Typography
              sx={{
                color: "white",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Администратор
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default memo(HeaderSection);