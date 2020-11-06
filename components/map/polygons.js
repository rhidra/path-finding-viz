function colorFromKey(key) {
  const colors = ['#F56565', '#065A60', '#ED8936', '#ECC94B', '#48BB78', '#212F45', '#38B2AC', '#312244', '#ED64A6', '#4D194D'];
  return colors[key % colors.length];
}

export default function Polygons({polygons}) {
  return (
    <>
    {polygons.map((poly, key) => (
      <polygon 
        key={key} 
        points={`${poly.map(([x, y]) => `${x},${y} `)}`} 
        fill={colorFromKey(key)} 
        opacity=".5"
        stroke="black" 
        className="pointer"
      />
    ))}
    </>
  );
}