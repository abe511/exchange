
const style = {
  border: "1px solid green",
  width:"600px",
  height:"400px"
};



export default function Chart() {


  return (
    <>
      <p>Chart</p>
      <div style={style}></div>
      <p>Legend: Sell ---  Buy --- </p>
    </>
  );
}