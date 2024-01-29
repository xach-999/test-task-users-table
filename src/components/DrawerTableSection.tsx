import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "../features/store";
import { getFormat } from "../helpers/helpers";
import { Box, Typography, styled } from "@mui/material";
import { memo } from "react";

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
  padding: "14px 20px",
  borderBottom: "1px solid #313E62 !important",
  textAlign: "center",
}));

const DrawerTableSection = () => {
  const { userTransactions } = useSelector((state) => state.transactionsSlice);

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
            <HeaderTableCell sx={{ borderTopLeftRadius: "8px" }}>
              Тип
            </HeaderTableCell>
            <HeaderTableCell>Сумма</HeaderTableCell>
            <HeaderTableCell sx={{ borderTopRightRadius: "8px" }}>
              Дата
            </HeaderTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userTransactions?.map((row) => (
            <TableRow
              key={row.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                bgcolor: "#121825",
              }}
            >
              <BodyTableCell>{row.type}</BodyTableCell>
              <BodyTableCell
                sx={{
                  color:
                    row.amount > 0
                      ? "#1ABB34"
                      : row.amount < 0
                      ? "#FE4242"
                      : "white",
                }}
              >
                {row.amount > 0 && "+"}
                {row.amount} BTKN
              </BodyTableCell>
              <BodyTableCell>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Typography
                    sx={{
                      width: "min-content",
                      fontSize: "12px",
                    }}
                  >
                    {getFormat(row.created_at)}
                  </Typography>
                </Box>
              </BodyTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default memo(DrawerTableSection);
