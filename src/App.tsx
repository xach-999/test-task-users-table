import { useEffect } from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import Drawer from "./components/Drawer";
import HeaderSection from "./components/HeaderSection";
import PaginationSection from "./components/PaginationSection";
import UsersTableSeaction from "./components/UsersTableSeaction";
import SearchSection from "./components/SearchSection";
import { useDispatch } from "./features/store";
import { getUsers } from "./features/UsersSlice/UsersSlice";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers({}));
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#0E0C15",
        minHeight: "100vh",
      }}
    >
      <HeaderSection />
      <Box
        sx={(theme) => ({
          padding: "0 24px 32px 24px",
          [theme.breakpoints.down("sm")]: {
            padding: "0",
            "& > :first-child": {
              borderRadius: "0",
            },
          },
        })}
      >
        <Box
          sx={{
            borderRadius: "17px",
            background: "#121825",
          }}
        >
          <Typography
            sx={{
              paddingX: 4,
              paddingY: 3,
              fontSize: "22px",
              fontWeight: "600",
              color: "white",
              borderBottom: "1px solid #222B44",
            }}
          >
            Моя организация
          </Typography>
          <Box sx={{ paddingX: 4, paddingY: 3 }}>
            <Typography
              sx={{
                fontSize: "22px",
                fontWeight: "600",
                color: "white",
              }}
            >
              Пользователи
            </Typography>
            <SearchSection />
            <UsersTableSeaction />
            <PaginationSection />
          </Box>
        </Box>
      </Box>
      <Drawer />
    </Box>
  );
}
