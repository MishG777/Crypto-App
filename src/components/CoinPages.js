//this component is connected to the Coins.js
//here are all pages buttons, when i click a number it goes to appropriate page
import classes from "./CoinPages.module.css";
import PageButtons from "./UI/PageButtons";

export const CoinPages = ({ setFetchNextPage }) => {
  return (
    <div className={classes.CoinPages}>
      <PageButtons
        onClick={() => {
          setFetchNextPage(1);
        }}
      >
        1
      </PageButtons>
      <PageButtons
        onClick={() => {
          setFetchNextPage(2);
        }}
      >
        2
      </PageButtons>
      <PageButtons
        onClick={() => {
          setFetchNextPage(3);
        }}
      >
        3
      </PageButtons>
      <PageButtons
        onClick={() => {
          setFetchNextPage(4);
        }}
      >
        4
      </PageButtons>
    </div>
  );
};
