//随机函数
function randomNum(m, n) {
  return Math.floor(Math.random() * (n - m + 1) + m);
}
//随机颜色
function randomColor() {
  return (
    "rgb(" +
    randomNum(0, 255) +
    "," +
    randomNum(0, 255) +
    "," +
    randomNum(0, 255) +
    ")"
  );
}
let checkCodes = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  0,
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];
let checkCode = "";
let code;
//生成验证码
function generateCode() {
  //获得cnavas画布
  let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");
  checkCode = "";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.fillStyle = "#DFF0D8";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < 4; i++) {
    code = checkCodes[randomNum(0, checkCodes.length - 1)];
    checkCode += code;
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.strokeStyle = randomColor();
    ctx.font = "30px serif";
    ctx.rotate((Math.PI / 180) * randomNum(-8, 8));
    ctx.strokeText(code, 10 + i * 20, 30);
    ctx.beginPath();
    ctx.moveTo(randomNum(0, canvas.width), randomNum(0, canvas.height));
    ctx.lineTo(randomNum(0, canvas.width), randomNum(0, canvas.height));
    ctx.stroke();
    ctx.restore();
  }
  return checkCode;
}
export default generateCode;
//更换验证码
// $("#changeCode").click(function() {
// 	checkCode = "";
// 	generateCode();
// });
