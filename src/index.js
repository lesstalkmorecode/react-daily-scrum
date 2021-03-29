import React, {Fragment, useState, useEffect, useRef, createRef, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css'


export const DailyScrum = memo(({seconds, header, userList}) => {
    const miliseconds = seconds * 1000;
    const userMiliseconds = seconds * 1000 / userList.length;

    const [timerCircumference, setTimerCircumference] = useState(0);
    const [miniTimerCircumference, setMiniTimerCircumference] = useState(0);
    const [countdown, setCountdown] = useState(miliseconds);
    const [miniCountdown, setMiniCountdown] = useState(userMiliseconds);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isDailyDone, setIsDailyDone] = useState(false);

    const countRef = useRef(null);
    const miniCountRef = useRef(null);
    const ref = useRef([]);

    const [users, setUsers] = useState();

    useEffect(() => {
        const shuffleUsers = shuffle(userList);
        setUsers(
            shuffleUsers.map(function (user, key) {
                return {
                    "name": user,
                    "time": null,
                    "isTalking": key == 0 ? true : false,
                }
            })
        ) 
        ref.current = shuffleUsers.map((_, i) => ref.current[i] ?? createRef())

        return () => {
            clearInterval(countRef.current || 0);
            clearInterval(miniCountRef.current || 0);
        }
      },[])

    const shuffle = (array) => {
        const arr = [...array];
        var currentIndex = arr.length, temporaryValue, randomIndex;
      
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          temporaryValue = arr[currentIndex];
          arr[currentIndex] = arr[randomIndex];
          arr[randomIndex] = temporaryValue;
        }
      
        return arr;
    }


    const startTimer = () => { 
        if (isPlaying === true) {
            clearInterval(countRef.current || 0);
            clearInterval(miniCountRef.current || 0);

            setIsPlaying(false);
      
          } else if (countdown > 1) {
            setIsPlaying(true);
      
            countRef.current = window.setInterval(() => {
                setCountdown(countdown => countdown -10);
            },
              10
            );

            miniCountRef.current = window.setInterval(() => {
                setMiniCountdown(miniCountdown => miniCountdown -10);
            },
              10
            );
        }      
    };

    useEffect(() => {
        if (countdown === 0) {
          clearInterval(countRef.current || 0);
          setIsPlaying(false);
        }
    }, 
        [countdown]
    );

    useEffect(() => {
        if (miniCountdown < 10) {
            handleMiniCountdownReset();
        }
    },
        [miniCountdown]
    );

    const handleMiniCountdownReset = () => {
        clearInterval(miniCountRef.current || 0);

        let nextUserIndex;
        const newUsers = [...users];

        newUsers.map((user, index) => {
            if (user.isTalking == true) {
                user.time = userMiliseconds - miniCountdown;
                user.isTalking = false;
                nextUserIndex = index+1;
            }
        });

        if (nextUserIndex < newUsers.length) {
            newUsers[nextUserIndex].isTalking = true;
            setMiniCountdown(userMiliseconds);
           
            miniCountRef.current = window.setInterval(() => {
                setMiniCountdown(miniCountdown => miniCountdown -10);
            },
                10
            );

            if (ref.current[nextUserIndex]) {
                ref.current[nextUserIndex].current.scrollIntoView();
            }

        } else {
            setMiniCountdown(0);
            clearInterval(countRef.current || 0);
            setIsPlaying(false);
            setIsDailyDone(true);
        }

        setUsers(newUsers); 
    }    

    const measuredRef = useCallback(
        node => {
          if (node !== null) {
            setTimerCircumference(node.getTotalLength());
          }
        },
        []
    );

    const strokeDashoffset = () => {
        return timerCircumference -  (countdown / miliseconds) * timerCircumference;
    } 
    
    const miniMeasuredRef = useCallback(
        x => {
          if (x !== null) {
            setMiniTimerCircumference(x.getTotalLength());
          }
        },
        []
    );

    const strokeMiniDashoffset = () => {
        return miniTimerCircumference - (miniCountdown  / userMiliseconds) * miniTimerCircumference;
    } 

    const formatTime = (milisec) => {
        var minutes = Math.floor(milisec / 60000);
        var seconds = ((milisec % 60000) / 1000).toFixed(0);
        const getSeconds =  `0${seconds % 60}`.slice(-2)
        const getMinutes =  `0${minutes % 60}`.slice(-2);
        return `${getMinutes}:${getSeconds}`;
    }

    const items = users && users.slice()
        .map((item, i) => (
            <Fragment  key={`${item.name}${i}`}>
                <div 
                    ref={ref.current[i]}
                    className={styles.user__name} 
                    style={{color: (item.isTalking == true && countdown < miliseconds) ? "rgb(200 93 210)" : ""}}
                >
                    {item.name}
                </div>
                <div> 
                    {item.time && formatTime(item.time)}
                </div>
                <div>
                    {
                        item.isTalking && 
                        <button 
                            disabled={!isPlaying} 
                            onClick={handleMiniCountdownReset}
                            style={{
                                pointerEvents: isPlaying ? "all" : "none",
                            }}
                        >
                            Skip
                        </button>
                    }
                </div>
            </Fragment>
        ));

    return (
        <div className={styles.grid__daily}>
            <div className={styles.grid__header}>{header}</div>
            <div className={styles.grid__timer}>
                <div className={styles.timer}>
                    <div 
                        className={styles.timer__text}
                    >
                        <p>
                            {formatTime(countdown)}
                        </p>
                        <button 
                            onClick={startTimer}
                            style={{
                                pointerEvents: (countdown === 0 || isDailyDone === true)  ? "none" : "all",
                                cursor: countdown === 0 ? "none" : "pointer",
                            }}
                            className={isPlaying ? styles.timer__pause : styles.timer__play}
                        > 
                        </button>
                    </div>
                    <svg width="210px" viewBox="0 0 260 258">
                        <path 
                            fill="none" 
                            stroke="black" 
                            strokeWidth="3" 
                            d="M 199 175 Z A 40 40 90 1 1 193.7 74.6 A 100 100 90 1 0 200 175 Z" />
                        <path 
                            fill="none" 
                            stroke="rgba(175, 240, 175)" 
                            strokeWidth="3" 
                            className={styles.timer__animation}
                            ref={measuredRef}
                            strokeDashoffset={strokeDashoffset()}
                            strokeDasharray={timerCircumference}
                            d="M 199 175 Z A 40 40 90 1 1 193.7 74.6 A 100 100 90 1 0 200 175 Z" />
                        <path 
                            fill="none" 
                            stroke="black" 
                            strokeWidth="4" 
                            className={styles.minitimer__path}
                            d="M 199 166 Z Z M 199 166 A 1 1 0 0 1 194 86" />
                        <path 
                            fill="none" 
                            stroke="black" 
                            stroke="rgba(200, 93, 210)" 
                            strokeWidth="4" 
                            className={styles.minitimer__animation}
                            d="M 199 166 Z Z M 199 166 A 1 1 0 0 1 194 86" 
                            ref={miniMeasuredRef}
                            strokeDashoffset={strokeMiniDashoffset()}
                            strokeDasharray={miniTimerCircumference}/>
                    </svg>
                    <div className={styles.minitimer__text}>
                        {formatTime(miniCountdown)}
                    </div>
                </div>
            </div>
            <div className={styles.grid__users}>
                {items}
            </div>  
        </div>
        
    );

});

DailyScrum.propTypes = {
    seconds: PropTypes.number.isRequired,
    header: PropTypes.string.isRequired,
    userList: PropTypes.arrayOf(PropTypes.string).isRequired
}