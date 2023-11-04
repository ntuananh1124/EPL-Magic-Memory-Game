import { cardsImage } from "../../constant";
import "./MainGame.scss";
import { useEffect, useState } from "react";
import SingleCard from "../../components/SingleCard";

export default function MainGame() {
    const [cards, setCards] = useState([]);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    let [turn, setTurn] = useState(0);

    const handleShuffle = () => {
        const shuffledCards = [...cardsImage, ...cardsImage]
            .map(card => {
                return {
                    ...card,
                    id: Math.random()
                }
            })
            .sort(() => Math.random() - 0.5)
            setCards(shuffledCards)
            // updateTurn()
    }

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            if (choiceOne.src === choiceTwo.src) {
                console.log("matched");
                setCards(prevCards => {
                    let newCards = prevCards.map(card => {
                        if (card.src === choiceOne.src) {
                            return {...card, matched: true}
                        }
                        else return card
                    })
                    return newCards
                })
                updateTurn()
            } else {
                console.log("not matched");
                setTimeout(() => {
                    updateTurn()
                }, 500)
                // updateTurn()
            }
        }
    }, [choiceOne, choiceTwo])
    
    console.log(cards);

    const handleClickCard = (cardItem) => {
        // console.log(cardItem);
        choiceOne ? setChoiceTwo(cardItem) : setChoiceOne(cardItem);
    }

    const updateTurn = () => {
        setTurn(turn+=1);
        setChoiceOne(null)
        setChoiceTwo(null)
    }

    return (
        <>
            <div className="main-game">
                <div className="main-game__name-button" style={cards.length > 0 ? {rowGap: 15} : {}}>
                    <h1 className="main-game__name">EPL Magic Memory</h1>
                    {cards.length === 0 && <i className="note">*Click here to create new game</i>}
                    <button onClick={handleShuffle}>{cards.length > 0 ? "Restart" : "Create New Game"}</button>
                </div>
                <div className="grid">
                    {cards.length > 0 && 
                        cards.map(cardItem => 
                                <SingleCard key={cardItem.id} cardItem={cardItem} handleClickCard={handleClickCard} flipped={cardItem === choiceOne || cardItem === choiceTwo || cardItem.matched}/>
                            )
                    }
                </div>
            </div>
        </>
    )
}