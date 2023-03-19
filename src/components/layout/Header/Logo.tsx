import { useColorMode } from "@chakra-ui/react";
import * as React from "react"

interface Props {
    width?: number;
    height?: number;
    style?: React.CSSProperties;
}
export function Logo(props:Props) {
  const { colorMode } = useColorMode()
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 60.000000 65.000000"
      colorInterpolationFilters="sRGB"
      style={{
        margin: "auto",
        ...props.style
      }}
      {...props}
    >
      <g fill="#333" className="iconlinesvg-g iconlinesvg">
        <g className="tp-name">
          <g transform="translate(3 15)">
            <path
              className="image-rect"
              fill="none"
              d="M0 0H54.0279650882521V45.34982296556213H0z"
            />
            <svg
              width={54.0279650882521}
              height={45.34982296556213}
              className="image-svg-svg primary"
              overflow="visible"
              {...props}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -0.0014229005901142955 117.42215728759766 98.5614242553711"
                {...props}
              >
                <g fillRule="evenodd">
                  <path d="M92.13 58.67L71.17 95a2.37 2.37 0 002 3.55h41.93a2.36 2.36 0 002-3.55l-21-36.31a2.37 2.37 0 00-4.1 0" fill={colorMode === "light" ? '#111' : '#fff'}/>
                  <path
                    d="M87 49.74L60.86 95a7.15 7.15 0 01-6.17 3.56h-9l19.59-33.94a4.82 4.82 0 10-8.35-4.82L34.56 98.53H24.11l25-43.26a4.82 4.82 0 00-8.35-4.82L13 98.53H0L55.53 2.37a4.73 4.73 0 018.2 0L87 42.62a7.13 7.13 0 010 7.12"
                    fill="#f76b0a"
                  />
                </g>
              </svg>
            </svg>
          </g>
        </g>
      </g>
    </svg>
  )
}

