//this component is connected to the Coins.js
//here are all pages buttons, when i click a number it goes to appropriate page
import { memo } from "react";
import classes from "./CoinPages.module.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
//import PageButtons from "../UI/PageButtons";

const CoinPages = ({ setFetchNextPage, showPagesNumHandler }) => {
  return (
    <div className={classes.CoinPages}>
      <Stack spacing={2}>
        <Pagination
          count={10}
          color="primary"
          shape="circular"
          onChange={(e, page) => {
            setFetchNextPage(page);
            showPagesNumHandler(page);
          }}
        />
      </Stack>
    </div>
  );
};

export default memo(CoinPages);
