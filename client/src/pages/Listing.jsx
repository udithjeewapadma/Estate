import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';

export default function Listing() {
    SwiperCore.use([Navigation]);
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setloading] = useState(false);
    const [error, setError] = useState(false)
    useEffect (()=> {
        const fetchListing = async()=> {
            try {
                setloading(true);
                const res = await fetch(`/api/listing/get/${params.listingId}`);
                const data = await res.json();
                if(data.success === false){
                    setError(true);
                    setloading(false);
                    return;
                }
                setListing(data); 
                setloading(false);
                setError(false)
            } catch (error) {
                setError(true);
                setloading(false);

            }

        };
        fetchListing();
    }, [params.listingId])
  return (
    <main>
        {loading && <p className=' text-center my-6 text-2xl'>Loading..</p>}
        {error && <p className=' text-center my-6 text-2xl'>Something went wrong!</p>}
        {listing && !loading && !error && (
            <div>
            <Swiper navigation>
                {listing.imageUrls.map((url)=>(
                    <SwiperSlide key={url}>
                        <div className=' h-[430px]' style={{background: `url(${url}) center no-repeat`, backgroundSize: 'cover'}}>

                        </div>

                    </SwiperSlide>
                ))}
                
            </Swiper>
            </div>
        )}

    </main>
  )
}
