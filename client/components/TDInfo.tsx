import * as React from "react";
import Image from "next/image"; 
import CheckedIcon from "/public/icon/info-checked.svg";

export enum infoTypes { 
  INFO, 
  CHECKED
}

const data = [
  {
    type: infoTypes.INFO,
    // icon: InfoIcon,
    color: "ml-1",
    label: "",
  },
  {
    type: infoTypes.CHECKED,
    component: (
      <Image src={CheckedIcon} width={20} height={20} layout={"fixed"} />
    ),
    color: "mr-1 text-red text-xl",
    label: "",
  }, 
];

interface IInfoProps {
  value?: string | number;
  type: infoTypes;
  className?: string;
  onClick?: Function;
}
export const Info = ({ type, value, className, onClick }: IInfoProps) => {
  const info = data.find((item) => item.type === type);

  return (
    <div
      className={
        "cursor-pointer flex items-center w-max transition transition-all " +
        className
      }
      onClick={() => onClick && onClick()}
    >
      {!!info?.icon && <Image src={info.icon} alt={icon} />}
      {info?.component}
      <span className={"transition transition-all " + info.color}>
        {info.label || value}
      </span>
    </div>
  );
};