import React, {PropTypes} from "react";
import Dotdotdot from "react-dotdotdot";

export default function ExpandableText(props) {
  const {expanded, clamp, children, ...rest} = props;

  return (
    <span {...rest}>
      {expanded ?
        <span>
          {children}
        </span> :
        <Dotdotdot clamp={clamp}>
          {children}
        </Dotdotdot>
      }
    </span>
  );
}
