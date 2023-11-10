import { cardsImage } from "../../constant";
import "./MainGame.scss";
import { useEffect, useState, useRef } from "react";
import SingleCard from "../../components/SingleCard";
import Footer from "../../components/Footer";

export default function MainGame() {
    const [cards, setCards] = useState([]);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    let [time, setTime] = useState(59);
    let timeArray = String(time).split("").map((num) => Number(num))
    const timeRef = useRef()
    // eslint-disable-next-line
    let [turn, setTurn] = useState(0);
    let [score, setScore] = useState(0);
    const [disabled, setDisable] = useState(false);

    // Shuffle Card:
    const handleShuffle = () => {
        setTime(59);
        setDisable(false)
        const shuffledCards = [...cardsImage, ...cardsImage]
            .map(card => {
                return {
                    ...card,
                    id: Math.random()
                }
            })
            .sort(() => Math.random() - 0.5)
            setCards(shuffledCards);
            setTurn(0);
            setScore(0);
    }

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisable(true);
            if (choiceOne.src === choiceTwo.src) {
                setScore(score => score+=1)
                setCards(prevCards => {
                    let newCards = prevCards.map(card => {
                        if (card.src === choiceOne.src) {
                            return {...card, matched: true}
                        }
                        else return card
                    })
                    return newCards
                })
                updateTurn();
            } else {
                setTimeout(() => {
                    updateTurn()
                }, 600)
            }
        }
    }, [choiceOne, choiceTwo])

    // Countdown Timer:
    useEffect(() => {
        timeRef.current = setInterval(() => {
            setTime(prevTime => prevTime - 1)
        }, 1000)
        if (time <= 0) {
            clearInterval(timeRef.current)
            setDisable(true)
        }
        if (score === cards.length / 2) {
            clearInterval(timeRef.current)
            setDisable(true);
        }
        return () => clearInterval(timeRef.current);
    }, [time])

    const handleClickCard = (cardItem) => {
        choiceOne ? setChoiceTwo(cardItem) : setChoiceOne(cardItem);
    }

    const updateTurn = () => {
        setTurn(turn => turn+=1);
        setChoiceOne(null)
        setChoiceTwo(null)
        setDisable(false);
    }

    return (
        <>
            <div className="main-game">
                <div className="main-game__name-button" style={cards.length > 0 ? {rowGap: 15} : {}}>
                    <h1 className="main-game__name">EPL Magic Memory</h1>
                    {cards.length === 0 && <i className="note">*Click here to create new game</i>}
                    <button onClick={handleShuffle}>{cards.length > 0 ? "Restart" : "Create New Game"}</button>
                </div>
                {cards.length > 0 && 
                <>
                    <div className="grid">
                        {cards.map(cardItem => 
                                    <SingleCard key={cardItem.id} cardItem={cardItem} handleClickCard={handleClickCard} flipped={cardItem === choiceOne || cardItem === choiceTwo || cardItem.matched} disabled={disabled}/>
                            )}
                    </div>
                    <div className="time-score">
                        <div className="time">
                            <span>Time: 00:{timeArray.length === 2 ? `${time}` : `0${time}`}</span>
                        </div>
                        <div className="score">
                            <span>Score: {score}</span>
                        </div>
                    </div>
                    {time === 0 && <h1 className="time-out">TIME OUT!</h1>}
                    {score === cards.length / 2 && <h1 className="you-win">YOU WIN!</h1>}
                </>
                }
            </div>
            <Footer />
        </>
    )
}