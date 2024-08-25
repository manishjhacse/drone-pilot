import React, { useEffect, useState } from 'react'
import axios from "axios"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ShowMap from '../container/ShowMap';
import { toast } from 'react-hot-toast';
export default function MapPage() {
  const [loading, setLoading] = useState(false)
  const [pilots, setPilots] = useState(null);
  const [adminLocation, setAdminLocation] = useState(null);
  const [range, setRange] = useState("")
  const getAllPilots = async () => {
    const url = import.meta.env.VITE_BASE_URL;
    try {
      setLoading(true)
      const response = await axios.get(`${url}/`)
      setPilots(response.data)
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }
  const getAdminLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      setAdminLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }
  useEffect(() => {
    getAllPilots();
    getAdminLocation();
  }, [])
  const handleTopPilots = async () => {
    if (range === "" || isNaN(Number(range))) {
      toast.error('Please enter a valid range')
      return;
    }
    if (!adminLocation) {
      getAdminLocation()
    }
    const url = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.post(`${url}/best`, {
        latitude: adminLocation.latitude,
        longitude: adminLocation.longitude,
        range: Number(range)
      })
      setPilots(response.data)
      if (response.data.length === 0) {
        toast.error("No pilot available")
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handlePilotInRange = async () => {
    const url = import.meta.env.VITE_BASE_URL;
    if (range === "") {
      try {
        const response = await axios.get(`${url}/`)
        setPilots(response.data)
        return
      } catch (err) {
        console.log(err)
        return
      }
    }
    if (isNaN(Number(range))) {
      toast.error('Please enter a valid range')
      return;
    }
    if (!adminLocation) {
      getAdminLocation()
    }
    try {
      const response = await axios.post(`${url}/inrange`, {
        latitude: adminLocation?.latitude,
        longitude: adminLocation?.longitude,
        range: Number(range)
      })
      setPilots(response.data)
      if (response.data.length === 0) {
        toast.error("No pilot available")
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className='relative h-screen w-screen py-5 md:w-10/12 gap-5 md:px-5 px-2 mx-auto flex flex-col'>
      <div className=' flex mx-auto md:flex-row gap-3 flex-col'>

        <input onChange={(e) => {
          setRange(e.target.value)
        }} className='outline-none border border-black px-2 py-1 rounded-md' type="text" placeholder='Range (in K.M)' />
        <div className='flex flex-wrap gap-3'>
          <button onClick={handleTopPilots} className='px-2 py-1 rounded-md font-semibold text-[14px] bg-blue-500 hover:bg-blue-700 transition-all duration-200' >Top 10 Pilots</button>
          <button onClick={handlePilotInRange} className='px-2 py-1 rounded-md font-semibold text-[14px] bg-blue-500 hover:bg-blue-700 transition-all duration-200'>All Pilots</button>
        </div>
      </div>

      <ShowMap className="h-full" pilots={pilots} adminLocation={adminLocation} />

      <div className={`px-4 z-20 py-4 ${loading?"scale-100":"scale-0"} transition-all duration-150 rounded-md bg-gray-700 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white h-[200px] w-[200px] flex flex-col items-center justify-center gap-3`}>
        <span className='border-l-2  border-white h-10 w-10 animate-spin rounded-full'></span>
        <span className='font-semibold'>Loading...</span>
      </div>
    </div>
  )
}
