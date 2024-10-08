import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
export const Services = () => {
    // const [services, setServices] = useState([
    //     { id: 1, name: 'Electrical', description: 'Electrical installation and repairs', providersCount: 10, status: 'Active' },
    //     { id: 2, name: 'Cleaning', description: 'Home and office cleaning services', providersCount: 7, status: 'Inactive' },
    //     { id: 3, name: 'Plumbing', description: 'Expert plumbing services for residential needs', providersCount: 5, status: 'Active' },
    //     { id: 4, name: 'AC', description: 'Air conditioning installation and maintenance', providersCount: 3, status: 'Active' },
    //     { id: 5, name: 'RO', description: 'RO water purifier installation and repair', providersCount: 4, status: 'Active' },
    //     { id: 6, name: 'Washing Machine', description: 'Washing machine installation and repair', providersCount: 6, status: 'Inactive' },
    //     { id: 7, name: 'Installation', description: 'General installation services for home appliances', providersCount: 8, status: 'Active' },
    //     { id: 8, name: 'Television', description: 'Television installation and setup', providersCount: 2, status: 'Active' }
    //   ]);
    const [services,setServices] = useState([])

    useEffect(() =>{
      const fetchService = async() => {
        try{
          const response = await axios.get('http://localhost:8088/userRoutes/service')
          setServices(response.data.service)
        }
        catch(error){
          console.log('Error fetching services',error)
        }
      }
      fetchService();
    },[])
    
      // const [newService, setNewService] = useState({ name: '', description: '', providersCount: 0 });
      const [showAddForm, setShowAddForm] = useState(false); // new state to track form visibility
      const [newService,setNewService] = useState('')
      const [description,setDescription] = useState('')
      
      // Add new service
      const handleNewService = async(event) => {
        event.preventDefault();
          const newData = ({newService,description});
          axios
          .post('http://localhost:8088/userRoutes/newservice',newData)
          .then((res)=>{
            setNewService('')
            setDescription('')
            alert('Service added Successfully')
          })
        .catch((error)=> {
          console.log('Error While Creating new Service',error)
        })
      }
      const handleToggleAddForm = () => {
        setShowAddForm(!showAddForm);
      };
      // Toggle service status (active/inactive)
      const handleToggleStatus = (id) => {
        setServices(
          services.map((service) =>
            service.id === id
              ? { ...service, status: service.status === 'Active' ? 'Inactive' : 'Active' }
              : service
          )
        );
      };
    
      // Remove a service
      const handleRemoveService = (id) => {
        setServices(services.filter((service) => service.id !== id));
      };
    
      return (
        <div className="services-management">
          <div className="head"><h2>Services Management</h2>
          <button onClick={handleToggleAddForm} className='add-btn'>Add New Service</button></div>

          {/* Add New Service Form */}
          {showAddForm &&(<form className="add-service-form" onSubmit={handleNewService}>
            <h3>Add New Service</h3>
            <input
              type="text"
              placeholder="Service Name"
              value={newService}
              onChange={(e) => setNewService(e.target.value)}
              required
            />
            <textarea
              placeholder="Service Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
            {/* <input
              type="number"
              placeholder="No. of Providers"
              value={newService.providersCount}
              onChange={(e) => setNewService({ ...newService, providersCount: parseInt(e.target.value, 10) })}
              min="0"
              required
            /> */}
            <button type="submit">Add Service</button>
          </form>
          )}
          {/* Service List */}
          <div className="services-admin-grid">
            {services.map((service) => (
              <div key={service.id} className="service-admin-card">
                <h3>{service.servicename}</h3>
                <p>{service.servicedescription}</p>
                <p><strong>No. of Providers:</strong> {service.providersCount}</p>
                <p><strong>Status:</strong> {service.status}</p>
                <div className="actions">
                  {/* <button
                    onClick={() => handleToggleStatus(service.id)}
                    className={service.status === 'Active' ? 'deactivate' : 'activate'}
                  >
                    {service.status === 'Active' ? 'Deactivate' : 'Activate'}
                  </button> */}
                  <button onClick={() => handleRemoveService(service.id)} className="remove">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
}
