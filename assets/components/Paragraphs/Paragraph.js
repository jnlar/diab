import * as React from 'react';

export function SmallText(props) {
  return (
    <small className="font-normal leading-normal mt-0 mb-4 text-gray-800">
      {props.children}
    </small>
  )
}
