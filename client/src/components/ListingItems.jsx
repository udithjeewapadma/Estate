import { Link } from "react-router-dom";
import{MdLocationOn} from 'react-icons/md';
import {FaBath, FaBed} from 'react-icons/fa';

export default function ListingItems({listing}) {
  return (
    <div className=" bg-white flex shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
        <Link to={`/listing/${listing._id}`}>
            <img src={listing.imageUrls[0]} alt="listing cover" className=" h-[300px] sm:h-[200px] w-full object-cover hover:scale-105 transition-scale duration-300" />

            <div className=" p-2 flex flex-col gap-1 w-full">
                <p className=" text-lg font-semibold text-slate-700 truncate">{listing.name}</p>
                <div className=" flex items-center gap-1">
                    <MdLocationOn className=" h-4 w-4 text-green-700" />
                    <p className=" text-sm text-slate-600 truncate w-full">{listing.address}</p>
                </div>
                <p className=" text-sm text-slate-600 line-clamp-2">{listing.description}</p>
                <p className=" text-slate-500 mt-2 font-semibold">
                    ${listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
                    {listing.type === 'rent' && ' / month'}
                </p>
                <div className=" text-slate-700 flex gap-3">
                    <div className=" font-bold text-xs flex gap-1">
                        <FaBed className=" h-4 w-4" />
                        {listing.bedrooms > 1? `${listing.bedrooms} Beds` : `${listing.bedrooms} Bed`}
                    </div>

                    <div className=" font-bold text-xs flex gap-1">
                        <FaBath className=" h-4 w-4" />
                        {listing.bathrooms > 1? `${listing.bathrooms} Baths` : `${listing.bathrooms} Bath`}
                    </div>
                </div>
            </div>

        </Link>



    </div>
  )
}
