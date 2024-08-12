import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItems from '../components/ListingItems';


export default function Home() {

  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
    fetchRentListings();
    fetchSaleListings();

  }, []);

  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-4 p-20 px-4 max-w-5xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-5xl'>
          Find your next <span className='text-purple-600'>perfect</span>
          <br />
          place with ease
        </h1>
        <div className="text-gray-500 text-md sm:text-md">
          Udith Estate is the best place to find your next perfect place to live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link to={'/search'} className='text-sm sm:text-sm text-blue-800 font-bold hover:underline'>Let's get started..</Link>
      </div>

      {/* swiper */}
      <Swiper navigation>
        {offerListings && offerListings.length > 0 && offerListings.map((listing) => (
          <SwiperSlide key={listing._id}>
            <div
              style={{ background: `url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize: 'cover' }}
              className="h-[500px]"
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* listing results for offer sale and rent */}

      <div className=" max-w-5xl mx-auto p-3 flex flex-col gap-8 my-10">
        {
          offerListings && offerListings.length > 0 && (
            <div className="">
              <div className=" my-3 rounded-lg">
                <h2 className=' text-2xl font-semibold text-slate-600'>Recent Offers</h2>
                <Link className=' text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>
                  show more offers
                </Link>
              </div>
              <div className=" flex flex-wrap gap-1">
                {
                  offerListings.map((listing)=> (
                    <ListingItems listing={listing} key={listing._id} />
                  ))
                }
              </div>
            </div>
          )
        }

        {
          rentListings && rentListings.length > 0 && (
            <div className="">
              <div className=" my-3 rounded-lg">
                <h2 className=' text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
                <Link className=' text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>
                  show more places for rent
                </Link>
              </div>
              <div className=" flex flex-wrap gap-1">
                {
                  rentListings.map((listing)=> (
                    <ListingItems listing={listing} key={listing._id} />
                  ))
                }
              </div>
            </div>
          )
        }

        {
          saleListings && saleListings.length > 0 && (
            <div className="">
              <div className=" my-3 rounded-lg">
                <h2 className=' text-2xl font-semibold text-slate-600'>Recent places for Sale</h2>
                <Link className=' text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>
                  show more places for sale
                </Link>
              </div>
              <div className=" flex flex-wrap gap-1">
                {
                  saleListings.map((listing)=> (
                    <ListingItems listing={listing} key={listing._id} />
                  ))
                }
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
}
