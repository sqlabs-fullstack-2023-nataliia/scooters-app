import { useState, useEffect } from 'react';
import { useScooterStore, Scooter } from '../store/useScooterStore';
import ScooterRow from '../components/ScooterRow';
import { ToastContainer, toast } from 'react-toastify';
import React from 'react';

const ScooterScreen = () => {

  const [scooterModel, setScooterModel] = useState('');
  const [scooterType, setScooterType] = useState('');
  const [scooterBattery, setScooterBattery] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const { scooters, addScooter, updateScooter, deleteScooter, fetchScooters } = useScooterStore();

  const deleteItem = async (id: string) => {
    const isConfirm = window.confirm("Do you want to delete this?");
    if (isConfirm) {
      await deleteScooter(id)
      toast.success("Scooter deleted!!!");
    }
  }

  const updateItem = async (id: string, scooter: Scooter) => {
    await updateScooter(id, scooter);
    toast.success("Scooter updated!!!");
  }

  const createScooter = async () => {

    if (parseInt(scooterBattery) > 100 || parseInt(scooterBattery) < 0) {
      toast.error('Dont try to mess with me');
    } else {
      await addScooter({
        scooterModel: scooterModel,
        scooterType: scooterType,
        scooterBattery: scooterBattery,
        location: { lat: latitude, long: longitude }
      })
      setLatitude('');
      setLongitude('');
      setScooterBattery('');
      setScooterModel('');
      setScooterType('');
      toast.success("Scooter created!!!");
    }
  }

  useEffect(() => {
    fetchScooters();
  }, []);


  return (
    <div className='container'>
      <ToastContainer />
      <div className='row give-me-some-top-space'>
        <div className='col-lg-3'>
          <h2>Add new scooter &#128640;</h2>
          <br />
          <input value={scooterModel} onChange={(e) => setScooterModel(e.target.value)} className='form-control' placeholder='Scooter model' />
          <select value={scooterType} onChange={(e) => setScooterType(e.target.value)} className='form-select'>
            <option value="">Please select type...</option>
            <option value="scooter">Scooter</option>
            <option value="bicycle">Bicycle</option>
          </select>
          <input value={scooterBattery} onChange={(e) => setScooterBattery(e.target.value)} className='form-control' placeholder='Battery' />
          <input value={latitude} onChange={(e) => setLatitude(e.target.value)} className='form-control' placeholder='Latitude' />
          <input value={longitude} onChange={(e) => setLongitude(e.target.value)} className='form-control' placeholder='Longitude' />
          <button onClick={createScooter} className='btn btn-success'>Create new scooter</button>
        </div>
        <div className='col-lg-9'>
          <h2>Scooters list</h2>
          <br />
          {
            scooters.map((scooter) => (
              <ScooterRow
                key={scooter._id}
                scooter={scooter}
                updateItem={updateItem}
                deleteItem={deleteItem} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default ScooterScreen