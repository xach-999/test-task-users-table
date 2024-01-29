import React, { memo } from "react";
import { Box } from "@mui/system";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch, useSelector } from "../features/store";
import { getUsers, setActivePage } from "../features/UsersSlice/UsersSlice";

const PaginationSection = () => {
  const dispatch = useDispatch();
  const { pages, activePage } = useSelector((state) => state.usersSlice);

  const onChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(setActivePage(page));
    dispatch(getUsers({ page }));
  };

  return (
    <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
      <Pagination
        page={activePage}
        count={pages || 1}
        shape="rounded"
        color="primary"
        onChange={onChangePage}
        renderItem={(item) => (
          <PaginationItem
            sx={{ color: "white" }}
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
    </Box>
  );
}

export default memo(PaginationSection);
