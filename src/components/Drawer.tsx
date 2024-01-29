import React, { memo, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "../features/store";
import DrawerTableSection from "./DrawerTableSection";
import { getUserTransactions } from "../features/TransactionsSlice/TransactionsSlice";
import ChartSection from "./ChartSection";
import { setActiveUser } from "../features/UsersSlice/UsersSlice";

const MyDrawer = () => {
  const dispatch = useDispatch();
  const { activeUser } = useSelector((state) => state.usersSlice);

  useEffect(() => {
    if (activeUser?.id) {
      dispatch(getUserTransactions(activeUser.id));
    }
  }, [activeUser]);

  const deleteActiveUser = () => {
    dispatch(setActiveUser({}));
  };

  return (
    <React.Fragment>
      <Drawer
        anchor={"right"}
        PaperProps={{
          sx: (theme) => ({
            width: "470px",
            [theme.breakpoints.down("sm")]: {
              width: "100%",
            },
          }),
        }}
        open={!!activeUser.id}
        onClose={deleteActiveUser}
      >
        <Box
          sx={{
            paddingX: "20px",
            paddingY: "56px",
            background: "#121825",
          }}
          role="presentation"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{ color: "white", fontSize: "20px", fontWeight: "600" }}
            >
              {activeUser.email}
            </Typography>
            <CloseIcon
              onClick={deleteActiveUser}
              sx={{ color: "white" }}
              fontSize="large"
            />
          </Box>
          <Typography
            sx={{
              color: "white",
              marginY: "20px",
              fontSize: "20px",
              fontWeight: "600",
            }}
          >
            Использование токенов
          </Typography>
          <ChartSection />
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "500",
              textAlign: "center",
              color: "#616D8D",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              columnGap: "8px",
            }}
          >
            <Box
              sx={{
                width: "12px",
                height: "12px",
                background: "#1C64F2",
                borderRadius: "2px",
              }}
            />
            {activeUser.email}
          </Typography>
          <Typography
            sx={{
              color: "white",
              marginY: "20px",
              fontSize: "20px",
              fontWeight: "600",
            }}
          >
            История операций
          </Typography>
          <DrawerTableSection />
        </Box>
      </Drawer>
    </React.Fragment>
  );
}

export default memo(MyDrawer);
