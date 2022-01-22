import { useEffect, useState } from "react";

export default function Path({path, nodes, cellSize, animSpeed}) {
  const [countNodes, setCountNodes] = useState(10000);

  // useEffect(() => {
  //   const id = setInterval(() => setCountNodes(c => {
  //     if (c < nodes.length) {
  //       return c + (animSpeed || 5);
  //     } else {
  //       clearInterval(id);
  //       return c;
  //     }
  //   }), 50);

  //   return () => {
  //     clearInterval(id);
  //     setCountNodes(0);
  //   }
  // }, [nodes]);

  return (
    <>
    {countNodes >= nodes.length && path.map(([x, y], i) => (
      <circle cx={x*cellSize} cy={y*cellSize} r="2" key={i} stroke="#bee3f8"/>
    ))}

    {nodes.map((node, i) => i < countNodes && node.parent ? (
      <line 
        key={i} 
        x1={node.parent.pos[0] * cellSize}
        y1={node.parent.pos[1] * cellSize}
        x2={node.pos[0] * cellSize} 
        y2={node.pos[1] * cellSize} 
        stroke="green"
      />
    ) : null)}
    
    {countNodes >= nodes.length && 
      <polyline points={`${path.map(([x, y]) => `${x*cellSize},${y*cellSize} `)}`} stroke="red" fill="none" strokeWidth="3"/>
    }
    </>
  );
}