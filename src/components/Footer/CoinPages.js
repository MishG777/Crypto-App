//this component is connected to the Coins.js
//here are all pages buttons, when i click a number it goes to appropriate page
import classes from "./CoinPages.module.css";
import PageButtons from "../UI/PageButtons";

export const CoinPages = ({ setFetchNextPage, showPagesNumHandler }) => {
  const pagesArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className={classes.CoinPages}>
      {pagesArray.map((page) => (
        <PageButtons
          onClick={() => {
            setFetchNextPage(page);
            showPagesNumHandler(page);
            // window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          key={Math.random()}
        >
          {page}
        </PageButtons>
      ))}
    </div>
  );
};
