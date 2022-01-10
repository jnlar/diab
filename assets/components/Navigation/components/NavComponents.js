import {Link} from "react-router-dom";
import React from "react";

export function NavLinks(props) {
  return (
    <Link
      onClick={props.onClick}
      className={`inline-flex items-center px-6 py-2.5 bg-transparent ${props.textColor} ${props.textSize} leading-tight ${props.uppercase} rounded hover:bg-gray-100 focus:text-blue-700 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 active:text-blue-800 transition duration-300 ease-in-out ` + props.className}
      to={props.to}>
      {props.icon}
      {props.text}
    </Link>
  )
}

export function CustomUl(props) {
  return (
    <ul className={"flex " + props.className}>
      {props.children}
    </ul>
  )
}

export function CustomLi(props) {
  return (
    <li className={props.className}>
      {props.children}
    </li>
  )
}
