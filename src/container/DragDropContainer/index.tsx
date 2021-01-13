import React, { useState } from 'react';
import styled from 'styled-components';

interface TCircle {
  diameter: number;
  translateX: number;
  translateY: number;
  isOverlap: Boolean;
}

interface TRectangle {
  width: number;
  height: number;
  border: number;
  margin: number;
}

const CIRCLE: TCircle = {
  diameter: 100,
  translateX: 0,
  translateY: 0,
  isOverlap: false
}

const RECTANGLE: TRectangle = {
  width: 200,
  height: 200,
  border: 5,
  margin: 50
}

const OVERLAP = {
  minX: (CIRCLE.diameter + RECTANGLE.width + RECTANGLE.margin + RECTANGLE.border * 2) * -1,
  maxX: RECTANGLE.margin * -1,
  minY: (RECTANGLE.height - CIRCLE.diameter / 2 + RECTANGLE.border) * -1,
  maxY: RECTANGLE.height - CIRCLE.diameter / 2 + RECTANGLE.border
}

function DragDropContainer() {
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const [circleX, setCircleX] = useState(0);
  const [circleY, setCircleY] = useState(0);
  const [isOverlap, setIsOverlap] = useState(false);

  const handleDragStart = (e: React.DragEvent<Element>) => {
    const { clientX, clientY } = e;
    setCircleX(clientX);
    setCircleY(clientY);
  }

  const handleDragEnd = (e: React.DragEvent<Element>) => {
    const { clientX, clientY } = e;

    const distanceX = clientX - circleX + posX;
    const distanceY = clientY - circleY + posY;

    setTranslateX(distanceX);
    setTranslateY(distanceY);
    setCircleX(0);
    setCircleY(0);
    setPosX(distanceX);
    setPosY(distanceY);
    if (distanceX > OVERLAP.minX && distanceX < OVERLAP.maxX
      && distanceY > OVERLAP.minY && distanceY < OVERLAP.maxY) {
      setIsOverlap(true);
    } else setIsOverlap(false);
  }

  return <Wrapper>
    <Box />
    <Circle
      draggable
      onDragStart={(e: React.DragEvent<Element>) => handleDragStart(e)}
      onDragEnd={(e: React.DragEvent<Element>) => handleDragEnd(e)}
      isOverlap={isOverlap}
      translateX={translateX}
      translateY={translateY}
      diameter={CIRCLE.diameter}
    />
  </Wrapper>
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Box = styled.div`
  width: ${RECTANGLE.width}px;
  height: ${RECTANGLE.height}px;
  border: ${RECTANGLE.border}px solid #333;
  margin: ${RECTANGLE.margin}px;
`;

const Circle = styled.div<TCircle>`
  width: ${props => props.diameter}px;
  height: ${props => props.diameter}px;
  border-radius: 50%;
  background-color: ${props => props.isOverlap ? 'red' : 'green'};
  transform: ${props => `translate(${props.translateX}px, ${props.translateY}px)`};
`;

export default DragDropContainer;