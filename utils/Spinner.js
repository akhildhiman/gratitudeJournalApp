import React from "react"
import { css } from "@emotion/core"
import ClipLoader from "react-spinners/ClipLoader"

const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
`
const Spinner = () => {
    return (
        <div className="sweet-loading">
        <ClipLoader
          css={override}
          size={50}
          color={"#38bc12"}
        />
      </div>
    )
}

export default Spinner

