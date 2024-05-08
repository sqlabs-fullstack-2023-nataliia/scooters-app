import React, {useState} from 'react';
import { Scooter } from '../store/useScooterStore';
import { FaBatteryEmpty,FaCheckCircle,FaRegTimesCircle,FaBatteryFull,FaBatteryHalf,FaBatteryQuarter,FaBatteryThreeQuarters,FaBicycle } from "react-icons/fa";
import { MdElectricScooter } from "react-icons/md";
import geodist from 'geodist';

interface ScooterRowProps {
    scooter: Scooter;
    deleteItem: (id: string) => void;
    updateItem: (id: string, scooter: Scooter) => void;
}

const ScooterRow: React.FC<ScooterRowProps> = ({scooter, deleteItem, updateItem}) => {

  const battery = scooter.scooterBattery;
  const [isEditView, setIsEditView] = useState(false);

  const [scooterModel, setScooterModel] = useState(scooter.scooterModel);
  const [scooterType, setScooterType] = useState(scooter.scooterType);
  const [scooterBattery, setScooterBattery] = useState(scooter.scooterBattery);
  const [latitude, setLatitude] = useState(scooter.location.lat);
  const [longitude, setLongitude] = useState(scooter.location.long);
  const [isAvailable, setIsAvailable] = useState(scooter.isAvailable);

  const dist = geodist(
    {
      lat: 31.244046539926593,
      lon: 34.786362326590286
    },
    {
      lat: scooter.location.lat,
      lon: scooter.location.long
    },
    {
      exact: true, unit: 'km'
    }
  )
  
  const getBatteryIcon = () => {
    if(battery === 100){
        return <FaBatteryFull size={40} color='#51b07f' />
    } else if(battery >= 75 && battery < 100){
        return <FaBatteryThreeQuarters size={40} color='#51b07f' />
    } else if(battery >= 50 && battery < 75){
        return <FaBatteryHalf size={40} color='#33bbd6' />
    } else if(battery >= 25 && battery < 50){
      return <FaBatteryQuarter size={40} color='#fadb5f' />
    } else {
      return <FaBatteryEmpty size={40} color='#ba4e6d' />
    }
  }

  const getType = () => {
    if(scooter.scooterType === 'scooter'){
      return <MdElectricScooter size={40} color='#51b07f' />
    } else {
      return <FaBicycle size={40} color='#ba4e6d' />
    }
  }

  const getAvailable = () => {
    if(scooter.isAvailable){
      return <FaCheckCircle size={40} color='#51b07f' />
    } else {
      return <FaRegTimesCircle size={40} color='#ba4e6d' />
    }
  }

  const updateScooter = () => {
    const updateScooter = {
      _id: scooter._id,
      scooterModel:scooterModel,
      scooterType:scooterType,
      scooterBattery:scooterBattery,
      isAvailable: isAvailable,
      createdAt: scooter.createdAt,
      location: {
        lat: latitude,
        long: longitude
      }
    }
    updateItem(scooter._id, updateScooter);
    setIsEditView(false);
  }

  return (
    <>
      {
        isEditView ? (
          <div className='row give-me-some-top-space'>
            <div className='col-lg-3'>
                <select value={scooterType} onChange={(e) => setScooterType(e.target.value)} className='form-select'>
                    <option value="scooter">Scooter</option>
                    <option value="bicycle">Bicycle</option>
                </select>
            </div>
            <div className='col-lg-3'><input value={scooterModel} onChange={(e) => setScooterModel(e.target.value)} className='form-control' placeholder='Scooter model' /></div>
            <div className='col-lg-3'><input value={scooterBattery} onChange={(e) => setScooterBattery(parseInt(e.target.value))} className='form-control' placeholder='Battery' /></div>
            <div className='col-lg-3'><input value={latitude} onChange={(e) => setLatitude(parseFloat(e.target.value))} className='form-control' placeholder='Latitude' /></div>
            <div className='col-lg-3'><input value={longitude} onChange={(e) => setLongitude(parseFloat(e.target.value))} className='form-control' placeholder='Longitude' /></div>

            <div className='col-lg-3'>

            <div className="form-check form-switch">
              <input checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} className="form-check-input" type="checkbox" role="switch" />
              <label className="form-check-label">האם פנוי להשכרה</label>
            </div>
              

            </div>
            <div className='col-lg-6' style={{flexDirection:'row', justifyContent:'space-between'}}>
                <button style={{width:'47%'}} onClick={updateScooter} className='btn btn-success btn-sm'>Update</button>
                <button style={{width:'47%'}} onClick={() => setIsEditView(!isEditView)} className='btn btn-warning btn-sm'>Back</button>     
            </div>
        </div>
        ) : (
          <div className='row give-me-some-top-space'>
            <div className='col-lg-1 aligned'>{getType()}</div>
            <div className='col-lg-5'><h2>{scooter.scooterModel}</h2></div>
            <div className='col-lg-2'><h3>{dist.toFixed(2)}<span style={{fontSize:16}}>km</span></h3></div>
            <div className='col-lg-1'>{getBatteryIcon()} %{battery}</div>
            <div className='col-lg-1'>{getAvailable()}</div>
            <div className='col-lg-2 aligned'>
                <button onClick={() => deleteItem(scooter._id)} className='btn btn-danger btn-sm'>Delete</button>
                <button onClick={() => setIsEditView(!isEditView)} className='btn btn-warning btn-sm'>Update</button>     
            </div>
        </div>
        )
      }
    </>
    
  )
}

export default ScooterRow