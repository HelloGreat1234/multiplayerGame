import MovingCharacter from "./movingCharecter";
import './movingCharacter.css'
import database from "./FireBaseConfig";
import { ref,set, onValue, onChildChanged, onChildAdded, onDisconnect, get } from "firebase/database";
import { useEffect, useState, useRef } from "react";

const Map = () =>{

    const [players,SetPlayers] = useState([]);

    const reference = ref(database,'users/' )

    useEffect(()=>{

        
        onChildAdded(reference,(snapshot)=>{
            console.log("these")
            const player = snapshot.val()
            SetPlayers(prevPlayers => [...prevPlayers, {id : snapshot.key, ...player}])
        })
        
        onChildChanged(reference, (snapshot) => {
            const updatedPlayer = snapshot.val();
            SetPlayers(prevPlayers =>
                prevPlayers.map(player =>
                    player.id === snapshot.key ? { ...player, ...updatedPlayer } : player
                )
            );
        })
    },[])
        
    const generateUserId = () => {
        const randomPart = Math.random().toString(36).substr(2, 9);
        const timestampPart = Date.now().toString(36);
        return `${randomPart}${timestampPart}`;
    };

    const userRefId = useRef('');

    const UserName = "Garvit";

    useEffect(() => {
        const Id = generateUserId();
        console.log(Id);
        userRefId.current = Id;
        writeUserData(Id, 1000, 100, UserName, "red"); // Call writeUserData once when component mounts

        const removeOnDisconnect = onDisconnect(ref(database, `users/${Id}`));
        removeOnDisconnect.remove()
            .then(() => console.log("User removed on disconnect"))
            .catch((error) => console.log("Error removing user on disconnect:", error));

        return () => {
            removeOnDisconnect.cancel(); // Cancel onDisconnect listener when component unmounts
        };
    }, []);

    const isMoving = useRef(false);
    const characterRef = useRef(null);
    const directionRef = useRef({
        ArrowUp: false,
        ArrowDown: false,
        ArrowRight: false,
        ArrowLeft: false
    });
    const speed = 50; // Adjust the speed as needed
    const stopDelay = 100; // Adjust the delay before stopping movement

    useEffect(() => {
        const handleKeyDown = (e) => {
            console.log("Key press down")
            if (directionRef.current.hasOwnProperty(e.key)) {
                isMoving.current = true;
                directionRef.current[e.key] = true;
            }
        };

        const handleKeyUp = (e) => {
            if (directionRef.current.hasOwnProperty(e.key)) {
                directionRef.current[e.key] = false;
                setTimeout(() => {
                    if (!Object.values(directionRef.current).some(Boolean)) {
                        isMoving.current = false;
                    }
                }, stopDelay);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    const moveCharacter = async () => {
        // console.log(characterRef)
        if (isMoving.current) {
            // console.log("I am here")
            const userRef = ref(database,`users/${userRefId.current}`)
            const snapshot = await get(userRef)
            let x,y;
            if(snapshot){
                x = snapshot.val().x
                y = snapshot.val().y
            }
            // let x = characterRef.current.offsetLeft;
            // let y = characterRef.current.offsetTop;
            const newX = calculateNewPosition(x, directionRef.current.ArrowLeft, directionRef.current.ArrowRight, window.innerWidth - 30);
            const newY = calculateNewPosition(y, directionRef.current.ArrowUp, directionRef.current.ArrowDown, window.innerHeight - 30);

            console.log("reached here and pusihin this value", newX, newY);
            isMoving.current = false;
            writeUserData(userRefId.current, newX, newY, UserName, "red");

            // characterRef.current.style.left = `${newX}px`;
            // characterRef.current.style.top = `${newY}px`;
        }
    };

    const calculateNewPosition = (currentPos, isNegative, isPositive, maxPosition) => {
        const delta = speed * (isNegative ? -1 : 0) + speed * (isPositive ? 1 : 0);
        return Math.max(0, Math.min(currentPos + delta, maxPosition));
    };

    useEffect(() => {
        const step = () => {
            moveCharacter();
            window.requestAnimationFrame(step);
        };

        step();
    }, []);

    const writeUserData = (userId, x, y, UserName, color) => {
        const reference = ref(database, 'users/' + userId);
        console.log("this is user ID", userId);
        try {
            set(reference, {
                UserName: UserName,
                x: x,
                y: y,
                color: color
            });
            console.log("Write user data");
        } catch (error) {
            console.log(error);
        }
    };

    // onDisconnect()

    return(
        <div className="map" id="map">
            {players?.map((e) => {
                return(

                    <MovingCharacter x = {e.x} y = {e.y} color = {e.color}/>
                );
            })}
            
        </div>
    );
}

export default Map