import React from 'react';
import './App.css';
// import colorPicker from './colorPicker';
// import ColorPicker from './colorPicker';

import MovingCharacter from './movingCharecter';
import Map from './Map';

function App() {
  // const characterRef = useRef(null);
  // const xRef = useRef(0); // Ref for x-coordinate
  // const yRef = useRef(0); // Ref for y-coordinate

  // const [isMoving, setIsMoving] = useState(false);

  // const movingDir = useRef({
  //   ArrowDown: false,
  //   ArrowUp: false,
  //   ArrowLeft: false,
  //   ArrowRight: false,
  // });

  // const speed = 1.9;

  // const moveCharacter = useCallback(() => {
  //   let newX = xRef.current;
  //   let newY = yRef.current;

  //   if (isMoving) {
  //     if (movingDir.current.ArrowDown) {
  //       newY += speed; // Adjust y position for down
  //     }
  //     if (movingDir.current.ArrowUp) {
  //       newY -= speed; // Adjust y position for up
  //     }
  //     if (movingDir.current.ArrowRight) {
  //       newX += speed; // Adjust x position for right
  //     }
  //     if (movingDir.current.ArrowLeft) {
  //       newX -= speed; // Adjust x position for left
  //     }

  //     xRef.current = newX;
  //     yRef.current = newY;

  //     if (characterRef.current) {
  //       characterRef.current.style.top = `${newY}px`;
  //       characterRef.current.style.left = `${newX}px`;
  //     }
  //   }
  // }, [isMoving]);

  // useEffect(() => {
  //   const step = () => {
  //     moveCharacter();
  //     window.requestAnimationFrame(step);
  //   };

  //   step();

  //   const handleKeyDown = (e) => {
  //     setIsMoving(true);
  //     movingDir.current[e.key] = true;
  //   };

  //   const handleKeyUp = (e) => {
  //     movingDir.current[e.key] = false;

  //     // Check if any arrow key is still pressed
  //     const isAnyKeyStillPressed = Object.values(movingDir.current).some(
  //       (isPressed) => isPressed
  //     );
  //     if (!isAnyKeyStillPressed) {
  //       setIsMoving(false);
  //     }
  //   };

  //   document.addEventListener('keydown', handleKeyDown);
  //   document.addEventListener('keyup', handleKeyUp);

  //   return () => {
  //     document.removeEventListener('keydown', handleKeyDown);
  //     document.removeEventListener('keyup', handleKeyUp);
  //   };
  // }, [moveCharacter]);

  return (
    <div className="App">
      {/* <div className="App-header"> */}
        {/* <div
          className="character"
          id="character"
          ref={characterRef}
          style={{ top: `0px`, left: `0px` }}
        />
        <div className='light'>

        </div> */}
        {/* <ColorPicker/> */}
          {/* <MovingCharacter/> */}
          <Map/>
      {/* </div> */}
    </div>
  );
}

export default App;
