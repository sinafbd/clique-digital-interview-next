import React from "react";

interface LineChartProps {
  data: { time: string; temperature: number }[];
}

const CustomLineChart: React.FC<LineChartProps> = ({ data }) => {
  const viewBoxWidth = 500;
  const viewBoxHeight = 300;
  const padding = 40;

  const maxValue = Math.max(...data.map((d) => d.temperature));
  const minValue = Math.min(...data.map((d) => d.temperature));
  const range = maxValue - minValue;

  const xScale = (index: number) =>
    (index / (data.length - 1)) * (viewBoxWidth - 2 * padding) + padding;
  const yScale = (value: number) =>
    ((maxValue - value) / range) * (viewBoxHeight - 2 * padding) + padding;

  const getPathData = () => {
    if (data.length < 2) return "";

    const points = data.map((point, i) => {
      const x = xScale(i);
      const y = yScale(point.temperature);
      return [x, y];
    });

    let path = `M${points[0][0]},${points[0][1]}`;

    for (let i = 0; i < points.length - 1; i++) {
      const [cpsX, cpsY] = points[i];
      const [cpeX, cpeY] = points[i + 1];
      const midPointX = (cpsX + cpeX) / 2;
      path += ` Q ${cpsX},${cpsY} ${midPointX},${
        (cpsY + cpeY) / 2
      } T ${cpeX},${cpeY}`;
    }

    return path;
  };

  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      className="w-full h-auto"
    >
      <path d={getPathData()} fill="none" stroke="#F48403" strokeWidth="2" />
      {data.map((d, i) => (
        <circle
          key={d.time}
          cx={xScale(i)}
          cy={yScale(d.temperature)}
          r="3"
          fill="#F48403"
        />
      ))}
      <g>
        {data.map((d, i) => (
          <text
            key={d.time}
            x={xScale(i)}
            y={viewBoxHeight - padding + 25}
            fontSize="10"
            textAnchor="middle"
            fill="#ffffff"
          >
            {new Date(d.time).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </text>
        ))}
      </g>
    </svg>
  );
};

export default CustomLineChart;
