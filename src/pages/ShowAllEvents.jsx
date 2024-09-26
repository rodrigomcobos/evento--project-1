import React from 'react'
import SearchNavBar from '../components/SearchNavBar'
import Footer from '../components/Footer'
import TransparentLogo from '../assets/slides/transparentlogo.png'


const ShowAllEvents = () => {
    // Here we want to display the name of the event category clicked on in the navbar and in the ExplorePage, ie. Sports, Music, etc
    const eventStripName = "All Events"

    return (
        <>
            <SearchNavBar />
            {/* All Events Title Strip */}
            <section className='relative px-4'>
                <div className="relative bg-gradient-to-r from-indigo-400 to-cyan-400 text-white text-center [text-shadow:_0_2px_0_rgb(0_0_0_/25%)] sm:py-24 py-14 mt-8 px-6 max-w-6xl mx-auto rounded-3xl">
                    <h1 className="text-4xl font-bold">{eventStripName}</h1>

                    {/* Transparent logo positioned at the bottom right */}
                    <div className="absolute bottom-0 right-0 h-full w-full pointer-events-none overflow-hidden">
                        <img
                            src={TransparentLogo}
                            alt="Logo"
                            className="object-cover opacity-25%"
                            style={{
                                position: 'absolute',
                                bottom: '-30px',  // Ensures half of the logo is shown
                                right: '-30px',   // Moves it slightly off-screen
                                width: '50%',
                                maxWidth: '275px', // Control the max size of the logo
                            }}
                        />
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default ShowAllEvents