'use client'
import Image from "next/image";
import styles from "./page.module.css";
import axios from "axios";
import { useEffect, useReducer, useRef, useState } from "react";
import Card from "./card";
import Popup from "./popup";
import '@fortawesome/fontawesome-free/css/all.css';
export default function Home() {
  const [events, setEvents] = useState()
  const [arr, setArr] = useState([])
  const [filter, setFilter] = useState(['All'])
  const [isActive, setIsActive] = useState({})
  const [activeTitle, setActiveTitle] = useState({})
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const all_cards = useRef()
  const handleButtonClick = (index, title) => {
    const updatedState = { ...isActive, [index]: !isActive[index] }
    const updatedTitle = { ...activeTitle, [title]: !activeTitle[title] }

    if (title === 'All') {
      setArr(all_cards.current)
      setIsActive({ [index]: updatedState[index] });
      setActiveTitle({})
    }
    else {
      const updated_cards = all_cards.current.filter(item => updatedTitle[item.title] === true)
      if (updated_cards.length == 0) {
        setArr(all_cards.current)
        setIsActive(updatedState);
      }
      else {
        setArr(updated_cards)
        setIsActive({ ...updatedState, 0: false });

      }
      setActiveTitle(updatedTitle)

    }


  };

  const handleViewMore = () => {
    setShowAll(true);
  };

  const openPopup = (index) => {
    setSelectedImage(index);
  };

  const closePopup = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get('https://tidy-fellowship-f2bac71330.strapiapp.com/api/events', {
        headers: {
          Authorization: `bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
        }
      })
      setEvents(res.data.data)
    }

    fetchEvents()



  }, [])

  useEffect(() => {
    if (events) {
      const fetchImages = async () => {
        const updated_arr = await Promise.all(events.map(async (item, index) => {
          try {
            const img = await axios.get(`https://tidy-fellowship-f2bac71330.strapiapp.com/api/upload/files/${item.id}`, {
              headers: {
                Authorization: `bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
              }
            })
            return { id: item.id, ...item.attributes, img: img.data.url }
          }
          catch (error) {
            const img = await axios.get(`https://tidy-fellowship-f2bac71330.strapiapp.com/api/upload/files/1`, {
              headers: {
                Authorization: `bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
              }
            })
            return { id: item.id, ...item.attributes, img: img.data.url }
          }

        }))

        return updated_arr
      }
      fetchImages().then((updated_arr) => {
        const titles = updated_arr.map(item => item.title)
        let uniqueFilters = [...filter, ...new Set(titles)]
        all_cards.current = updated_arr
        setFilter(uniqueFilters)
        setArr(updated_arr)
      })

    }

  }, [events])


  return (
    <>
      <div className="header">
        <Image src='/images/logo.png' width={82} height={96} alt='logo' ></Image>
        <div className="school-info">
          <button className="school-item">The School</button>
          <button className="school-item">Academics</button>
          <button className="school-item">Life @ DBTR</button>
          <button className="school-item">Contact Us</button>
          <button className="csr">CSR</button>
          <button className="donate">Donate <Image className='heart' src='/images/heart.png' width={18} height={15} alt='heart' ></Image></button>
        </div>
      </div>
      <div className='imageContainer'>
        <Image src='/images/banner.png' width={1250} height={449} alt='banner' style={{ margin: 0 }}></Image>
        <div className='textOverlay-1'>Our Events gallery</div>
        <div className='textOverlay-2'>Events at DBTR are filled with joyous occasions, cultural gatherings, and learning opportunities that bring us all together.</div>
      </div>
      <div className="cards-parent">

        {filter.length > 0 && (
          <div className="button-filter">
            {filter.map((item, id) => {
              return (

                <button className={`button ${isActive[id] ? 'active' : 'inactive'}`} key={id} onClick={() => handleButtonClick(id, item)}>{item}</button>

              )

            }
            )}

          </div>


        )}
      </div>
      <div>
        <div className="cards-parent">
          {arr.length > 0 && (
            arr.slice(0, showAll ? arr.length : 6).map((item, index) => <Card key={item.id} card={item} onImageClick={() => openPopup(index)} />)
          )}
        </div>
        {!showAll && (
          <div className="view-more">
            <button className="csr" onClick={handleViewMore}>
              View more
            </button>
          </div>

        )}
        {selectedImage !== null && (
          <Popup images={arr}
            selectedImageIndex={selectedImage}
            onClose={closePopup}
          />
        )}

      </div>

      <div className="cards-parent-school">
        <div className="footer-item">
          <Image src='/images/logo.png' width={82} height={96} alt='logo' ></Image>
        </div>

        <div className="footer-item">
          <div className="footer-child school-name">DBTR National Higher Secondary School</div>
          <div className="footer-child school-motto" >Virtuousness is Life</div>
          <div className="footer-child">Established in 1901, DBTR is situated in the temple town of Mayiladuthurai.</div>
        </div>
        <div className="footer-item">
          <div className="footer-child">QUICK LINKS</div>
          <div className="footer-child">Admissions</div>
          <div className="footer-child">Alumni association</div>
          <div className="footer-child">Donate</div>
          <div className="footer-child">Events</div>
        </div>
        <div className="footer-item">
          <div className="footer-child school-name">Contact</div>
          <div className="footer-child">DBTR NHSS,
            Mahadhana Street,
            Kamarajar Salai,
            Mayiladuthurai,
            Tamilnadu – 609001</div>
          <div className="footer-child">+91.436.422.3272</div>
          <div className="footer-child">contact@nationalhighschool.in</div>
        </div>
        <div className="footer-item">
          <div className="footer-child school-name">
            Big or small, you can make an impact.
          </div>
          <button className="donate-2">Donate <Image className='heart' src='/images/heart.png' width={18} height={15} alt='heart' ></Image></button>

        </div>


      </div>

      <div className="cards-parent-2">
        <div className="footer-socials">
          <div>
            © DBTR 2023, All Rights Reserved | Sitemap
          </div>
          <Image src='/images/Group 36411.png' width={217} height={23} alt='pepper' ></Image>
        </div>



        <div className="footer-item-2">

          <div className="company-creds">
            <div className='design'>Designed by </div>
            <Image src='/images/Pepper_Square_Logo.png' width={258} height={20} alt='pepper' ></Image>
          </div>

        </div>
      </div>

    </>
  );
}
