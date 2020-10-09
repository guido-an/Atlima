import './scss/SectionIntroduction.scss'
import React from 'react'
import GoBackArrow from '../images/go-back-arrow.png'
import { Link } from 'react-router-dom'
import { useLastLocation } from 'react-router-last-location'

const SectionIntroduction = ({ title, saveEditProfile }) => {
  const lastLocation = useLastLocation()
  return (
    <div className='section-introduction'>
      <div>
        {lastLocation ? <Link to={lastLocation.pathname}> <img src={GoBackArrow} /></Link> : undefined}
      </div>
      <h3>{title}</h3>
      {saveEditProfile ? <span onClick={saveEditProfile}>Save</span> : <span />}
    </div>
  )
}

export default SectionIntroduction
