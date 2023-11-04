import epl from "../../assets/img/eol.png"

export default function Footer() {
    return (
        <footer className="footer">
            <div className="epl-img">
                <img src={epl} alt="This is footer" />
            </div>
        </footer>
    )
}