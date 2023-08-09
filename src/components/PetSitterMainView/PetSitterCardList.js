import React from "react";

const PetSitterCardList = (props) => {
  return (
    <div>
      {props.petSitterList.map((item, index) => {
        return (
          <div key={index}>
            <p>{item.sitterHouse}</p>
            <p>{item.userAddress}</p>
            <p>{item.sitterMsg}</p>
            <p>{item.sitterTem}</p>
            <p>{item.userName}</p>
          </div>
        );
      })}
    </div>
  );
};

export default PetSitterCardList;
