import { makeBEM } from "utils";

export interface LoaderProps {
  position?: "absolute";
  type?: "gradient" | "solid";
  diameter?: number;
  color?: string;
  duration?: number;

  topChildren?: React.ReactNode;
  bottomChildren?: React.ReactNode;
}

const bem = makeBEM("loader");

export const Loader: React.FC<LoaderProps> = ({
  position = "absolute",
  color = "#7570d4",
  type = "solid",
  diameter = 100,
  duration = 1500,
}) => {
  const strokeWidth = 24;

  return (
    <div className={bem("wrapper", [position])}>
      <svg
        viewBox={type === "solid" ? "0 0 36 36" : "0 0 200 200"}
        className={bem(null, [type])}
        fill="none"
        width={diameter}
        height={diameter}
        color={color}
      >
        {type === "solid" ? (
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            strokeLinecap="round"
            stroke={color}
            strokeWidth={strokeWidth / 10}
            style={{ animationDuration: `${duration}ms` }}
          />
        ) : (
          <>
            <defs>
              <linearGradient id="spinner-secondHalf">
                <stop offset="0%" stopOpacity="0" stopColor="currentColor" />
                <stop
                  offset="100%"
                  stopOpacity="0.5"
                  stopColor="currentColor"
                />
              </linearGradient>
              <linearGradient id="spinner-firstHalf">
                <stop offset="0%" stopOpacity="1" stopColor="currentColor" />
                <stop
                  offset="100%"
                  stopOpacity="0.5"
                  stopColor="currentColor"
                />
              </linearGradient>
            </defs>

            <g
              strokeWidth={strokeWidth}
              style={{ animationDuration: `${duration}ms` }}
            >
              <path
                stroke="url(#spinner-firstHalf)"
                d={`M ${strokeWidth / 2} 100 A ${100 - strokeWidth / 2} ${
                  100 - strokeWidth / 2
                } 0 0 1 ${200 - strokeWidth / 2} 100`}
              />
              <path
                stroke="url(#spinner-secondHalf)"
                d={`M ${200 - strokeWidth / 2} 100 A ${100 - strokeWidth / 2} ${
                  100 - strokeWidth / 2
                } 0 0 1 ${strokeWidth / 2} 100`}
              />
            </g>
          </>
        )}
      </svg>
    </div>
  );
};
