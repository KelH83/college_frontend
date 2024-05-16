const Footer = () => {

    const date = new Date();
    const year = date.getFullYear();

    return(
        <>
        <p className='footer'>© Copyright Wilson College <span id='copyright'>{year}</span></p>
        </>
    )
}


export default Footer