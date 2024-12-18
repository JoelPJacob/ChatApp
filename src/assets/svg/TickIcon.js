import * as React from "react"
import Svg, { Path } from "react-native-svg"

function TickIcon(props) {
  return (
    <Svg
      width="800px"
      height="800px"
      viewBox="0 0 60 60"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M800 510a30 30 0 1130-30 30 30 0 01-30 30zm-16.986-23.235a3.484 3.484 0 010-4.9l1.766-1.756a3.185 3.185 0 014.574.051l3.12 3.237a1.592 1.592 0 002.311 0l15.9-16.39a3.187 3.187 0 014.6-.027l1.715 1.734a3.482 3.482 0 010 4.846l-21.109 21.451a3.185 3.185 0 01-4.552.03z"
        id="check"
        transform="translate(-770 -450)"
        fill="#699f4c"
        fillRule="evenodd"
      />
    </Svg>
  )
}

export default TickIcon
