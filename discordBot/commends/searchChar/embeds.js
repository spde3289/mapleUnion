const setExchangeStatus = (arr, index) => {
  const fields = [];
  const TitleList = ["환산", "헥사환산"];
  const list = ["무릉", "보스 300", "보스 380"];

  arr.map((el, index) => {
    if (TitleList.includes(el)) {
      fields.push({
        name: `<< ${el} >>`,
        value: " ",
      });
    } else if (list.includes(el)) {
      fields.push({
        name: el,
        value: arr[index - 1],
        inline: true,
      });
      if (el === "보스380") {
        fields.push({
          name: "",
          value: "",
        });
      }
    }
  });

  return fields;
};

module.exports = {
  setExchangeStatus: setExchangeStatus,
};
