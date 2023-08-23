import React from 'react';
import { Emoji } from "react-apple-emojis"

const IconMap = (iconName, classnames = '', iconStyle = {}, size = 20) => {
  // let size = 20;
  let icon = null;
  switch(iconName) {
    case 'snowflake': {
      icon = <Emoji name="snowflake" className={classnames} width={size} height={size} />
    break; }
    case 'fire': {
      icon = <Emoji name="fire" className={classnames} width={size} height={size} />
    break; }

  }
  return icon;
};

export default IconMap;