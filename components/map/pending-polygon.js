export default function PendingPolygon({points}) {
  return (
    <>
    <polygon points={`${points.map(([x, y]) => `${x},${y} `)}`} fill="rgba(79, 209, 197, .3)" stroke="black"/>
    
    {points.map(([x, y], i) => (
      <circle cx={x} cy={y} r="6" key={i}
              fill={i === 0 ? '#2b6cb0' : '#4299e1'} stroke="#bee3f8" 
              className={i === 0 ? 'pointer' : ''}/>
    ))}
    
    </>
  );
}