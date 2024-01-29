import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import searchCircle from "../assets/images/search-circle.png";
import { useDispatch, useSelector } from "../features/store";
import {
  getUsers,
  setActivePage,
  setSearch,
} from "../features/UsersSlice/UsersSlice";
import { memo } from "react";

const SearchSection = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => state.usersSlice);

  const onChangeValue = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  const OnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(getUsers({ page: 1 }));
    dispatch(setActivePage(1));
  };

  return (
    <form onSubmit={OnSubmit}>
      <FormControl fullWidth sx={{ my: 3 }}>
        <OutlinedInput
          sx={{
            input: {
              color: "white",
              fontSize: "14px",
              fontWeight: "400",
            },
          }}
          onChange={onChangeValue}
          value={search}
          placeholder="Поиск"
          startAdornment={
            <InputAdornment position="start">
              <img
                src={searchCircle}
                width={16}
                height={16}
                onClick={OnSubmit}
                style={{ cursor: "pointer" }}
              />
            </InputAdornment>
          }
        />
      </FormControl>
    </form>
  );
}

export default memo(SearchSection);