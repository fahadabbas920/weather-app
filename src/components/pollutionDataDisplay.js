// import { useState } from "react";
import { timeConverter } from "./funcLibrary";
const PollutionDataDisplay = ({ pollutionData }) => {
  function handleCBtnPD() {
    document.getElementById("pollutionData").style.display = "none";
  }
  //   const pollArrayRend = [];
  //   const pollArrayDT = [];
  //   const pollArrayAQI = [];

//   const [render, setrender] = useState(false);

  if (pollutionData) {
    console.log(pollutionData);

    //     console.log(pollutionData.list)
    //     ////////// console.log(pollutionData.list[0].components)
    //     const pollutionArray = pollutionData.list;

    //    ///// // console.log(pollutionArray)

    //     for (let i = 0; i < pollutionArray.length; i++) {

    //     ////  // ///////  console.log(pollutionData.list[i].components);

    //         pollArrayDT.push(pollutionData.list[i].dt)
    //         pollArrayAQI.push(pollutionData.list[i].dt)
    //         pollArrayRend.push(pollutionData.list[i].components);
    //     }
  } else {
    console.log("Enter Data");
  }

  // function handlePill (){

  // }
  //   const pollArray = [];
  let i = -1;
  // function handlerender(){
  //     pollArray.push(
  //     pollutionData.list.map(() => {
  //         // console.log("haha")
  //         i++;
  //         return (
  //           <div>
  //             <h6>daytime: {timeConverter(pollutionData.list[i].dt)}</h6>
  //             <h6>aqi: {pollutionData.list[i].main.aqi}</h6>
  //             <ul>
  //               <li>
  //                 co :{pollutionData.list[i].components.co}, nh3 :
  //                 {pollutionData.list[i].components.nh3}, no :
  //                 {pollutionData.list[i].components.no}, no2 :
  //                 {pollutionData.list[i].components.no2}, o3 :
  //                 {pollutionData.list[i].components.o3}, pm2_5 :
  //                 {pollutionData.list[i].components.mp2_5}, pm10 :
  //                 {pollutionData.list[i].components.mp10}, so2 :
  //                 {pollutionData.list[i].components.so2}
  //               </li>
  //             </ul>
  //           </div>
  //         );
  //       })
  //       )
  // }

  // const ren =

  return (
    <div id="pollutionData">
      <button
        onClick={() => {
          handleCBtnPD();
        }}
        id="closeBtnPD"
      >
        X Close
      </button>
      {/* <button
        onClick={() => {
          //   console.log(pollArrayRend);
        //   setrender(true)
        //   handlerender()
        //   console.log(pollArray)
        }}
      >
        Pill
      </button> */}
      {pollutionData ? (
        pollutionData.list.map(() => {
          // console.log("haha")
          i++;
          return (
            <div key={i} id="pollutionDataDisplayDiv">
              <span>daytime: {timeConverter(pollutionData.list[i].dt)}</span>
              <span> / aqi: {pollutionData.list[i].main.aqi}</span>
              <ul>
                <li>co :____{pollutionData.list[i].components.co}</li>
                <li>nh3 :____{pollutionData.list[i].components.nh3}</li>
                <li>no :____{pollutionData.list[i].components.no}</li>
                <li>no2 :____{pollutionData.list[i].components.no2}</li>
                <li>o3 :____{pollutionData.list[i].components.o3}</li>
                <li>pm2_5 :____{pollutionData.list[i].components.pm2_5}</li>
                <li>pm10 :____{pollutionData.list[i].components.pm10}</li>
                <li>so2 :____{pollutionData.list[i].components.so2}</li>
              </ul>
            </div>
          );
        })
      ) : (
        <p>Get Weather Data First</p>
      )}
      {/* {render ? pollArray : <p>Missed</p>} */}
      {/* {pollArray} */}
      {}
    </div>
  );
};

export default PollutionDataDisplay;
