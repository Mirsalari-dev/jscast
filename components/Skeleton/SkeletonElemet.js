import React from 'react'
const SkeletonElemet = ({type}) => {

     const classes = `skeleton ${type}`

  return (
    <div className={classes}>
         
    </div>
  )
}

export default SkeletonElemet