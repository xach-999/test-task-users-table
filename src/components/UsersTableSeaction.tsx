import { memo, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "../features/store";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Box, styled } from "@mui/material";
import TableSortLabel from "@mui/material/TableSortLabel";
import {
  User,
  getUsers,
  setActiveUser,
  setOrderBy,
} from "../features/UsersSlice/UsersSlice";
import CircularProgress from "@mui/material/CircularProgress";

const HeaderTableCell = styled(TableCell)(() => ({
  color: "#9CA3AF",
  backgroundColor: "#0E0C15",
  fontSize: "12px",
  fontWeight: "500",
  paddingTop: "14px",
  paddingBottom: "14px",
  border: "none",
  textAlign: "center",
}));

const BodyTableCell = styled(TableCell)(() => ({
  color: "white",
  fontSize: "12px",
  fontWeight: "500",
  padding: "23px 20px",
  borderBottom: "1px solid #313E62 !important",
  textAlign: "center",
}));

const UsersTableSeaction = () => {
  const dispatch = useDispatch();
  const { loading, users, orderBy } = useSelector((state) => state.usersSlice);

  useEffect(() => {
    if (orderBy) {
      dispatch(getUsers({}));
    }
  }, [orderBy]);

  const sortTable = () => {
    dispatch(setOrderBy(orderBy === "desc" ? "asc" : "desc"));
  };

  const selectActiveUser = (user: User) => {
    dispatch(
      setActiveUser({
        id: user.id,
        email: user.email,
      })
    );
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ bgcolor: "#121825", boxShadow: "none" }}
    >
      <Table
        sx={{ bgcolor: "#121825" }}
        size="small"
        aria-label="a dense table"
      >
        <TableHead>
          <TableRow>
            <HeaderTableCell
              sx={{
                borderBottomLeftRadius: "8px",
                borderTopLeftRadius: "8px",
              }}
            >
              Email
            </HeaderTableCell>
            <HeaderTableCell>Имя</HeaderTableCell>
            <HeaderTableCell>Роль</HeaderTableCell>
            <HeaderTableCell>Подписка</HeaderTableCell>
            <HeaderTableCell>
              <TableSortLabel
                sx={{
                  color: "#9CA3AF !important",
                  "& .MuiTableSortLabel-icon": {
                    color: "#9CA3AF !important",
                  },
                }}
                active={!!orderBy}
                direction={orderBy}
                onClick={sortTable}
              >
                Токены
              </TableSortLabel>
            </HeaderTableCell>

            <HeaderTableCell
              sx={{
                borderBottomRightRadius: "8px",
                borderTopRightRadius: "8px",
              }}
            >
              Действия
            </HeaderTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading &&
            users.map((user: User) => (
              <TableRow
                onClick={() => selectActiveUser(user)}
                key={user.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  bgcolor: "#121825",
                }}
              >
                <BodyTableCell>{user.email}</BodyTableCell>
                <BodyTableCell>{user.name}</BodyTableCell>
                <BodyTableCell>{user.role}</BodyTableCell>
                <BodyTableCell>Free</BodyTableCell>
                <BodyTableCell>{user.subscription.tokens}</BodyTableCell>
                <BodyTableCell>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      columnGap: "10px",
                    }}
                  >
                    <BorderColorIcon
                      sx={{ fontSize: "18px" }}
                      color="primary"
                      cursor="pointer"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <DeleteIcon
                      sx={{ fontSize: "18px" }}
                      cursor="pointer"
                      color="primary"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </Box>
                </BodyTableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {loading && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "150px",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </TableContainer>
  );
};

export default memo(UsersTableSeaction);
