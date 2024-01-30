let dateList = [];

const setDate = (i) => {
  let d = new Date();
  let sel_day = -i; //일자를 조절하시면 됩니다. -1이면 하루전/ +1이면 내일
  d.setDate(d.getDate() + sel_day);

  let year = d.getFullYear();
  let month = ("0" + (d.getMonth() + 1)).slice(-2);
  let day = ("0" + d.getDate()).slice(-2);
  let dt = year + "-" + month + "-" + day;

  dateList.push({ name: dt, value: dt });
};

for (let i = 1; i <= 11; i++) {
  setDate(i);
}

module.exports = {
  dateList: dateList,
};
