import Creator from "../Home/Creator.jsx"
import Devotional from "../Home/Devotional.jsx"
import Hero from "../Home/Hero.jsx"
import Trending from "../Home/Trending.jsx"

function Home() {
   
    

    return (
        <>
        <div className="bg-pink-300">
        
        < Hero/>
        <Trending/>
        <Devotional/>
        <Creator/>
       
        </div>
        </>
        
    )
}

export default Home
