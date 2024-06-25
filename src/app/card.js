import './globals.css'
import Image from 'next/image'

export default function Card({ card, onImageClick }) {
    return (
        <div className="card-container">
            <img src={card.img} className='image' onClick={onImageClick}></img>


            <div className='info'>
                <div>{card.title}</div>
                <div className='date'>
                    <Image src='/images/Vector.png' width={14} height={14} alt='date' className='date-icon'></Image>
                    <div>{card.date}</div>
                </div>

            </div>

        </div>
    )
}