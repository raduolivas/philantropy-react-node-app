import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';

import { FiPower, FiTrash2 } from "react-icons/fi";

import logoImg from '../../assets/logo.png';
import api from '../../services/api';

import './styles.css';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    useEffect(() =>{
        api.get('profile', {
            headers : {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incident/${id}`, {
                headers:{
                    Authorization: ongId,
                }
            });
            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch(err) {
            alert('Error while deleting item.')
        }
    }

    function handleLogout() {
       localStorage.clear();

       history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={ logoImg } alt="Be the Hero"/>
                <span> Wellcome, { ongName } </span>
                
                <Link className="button" to="/incidents/new" >Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>
            <h1>Registered Cases</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASE:</strong>
                        <p>{ incident.title }</p>

                        <strong>DESCRIPTION</strong>
                        <p>{ incident.description }</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'EUR'}).format(incident.value)}</p>

                        <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
