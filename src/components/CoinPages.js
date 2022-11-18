//this component is connected to the Coins.js
//here are all pages buttons, when i click a number it goes to appropriate page

export const CoinPages = ({ setFetchNextPage }) => {
  return (
    <div>
      <button
        onClick={() => {
          setFetchNextPage(1);
        }}
      >
        1
      </button>
      <button
        onClick={() => {
          setFetchNextPage(2);
        }}
      >
        2
      </button>
      <button
        onClick={() => {
          setFetchNextPage(3);
        }}
      >
        3
      </button>
      <button
        onClick={() => {
          setFetchNextPage(4);
        }}
      >
        4
      </button>
    </div>
  );
};
