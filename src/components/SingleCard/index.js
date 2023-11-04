import coverImg from "../../assets/img/cover.png"

export default function SingleCard({cardItem, handleClickCard, flipped}) {
    return (
        <div className="card-item">
            <div className={flipped ? "flipper" : ""}>
                <img className="front" src={cardItem.src} alt="Img Here..." />
                <img className="back" src={coverImg} alt="Img Here..." onClick={() => {handleClickCard(cardItem)}}/>
            </div>
        </div>
    )
}