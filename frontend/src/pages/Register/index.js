import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import api from '../../services/api'
import logoImg from '../../assets/logo.png';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data ={
            name,
            email,
            whatsapp,
            city,
            uf
        };

        try {
            const response = await api.post('ongs', data);
            alert(`Access Id: ${response.data.id}`);
            history.push('/');
        } catch {
            alert('Erro while login');
        }

    }
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be My Hero"/>
                    <h1> Signup </h1>
                    <p>Signup, join the platform and help people around the world</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Back to Login page
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input
                        placeholder="ONG"
                        value={name}
                        onChange={e => setName(e.target.value)}/>
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}/>
                    <input
                        placeholder="Phone Number"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}/>
                    <div className="input-group">
                        <input
                            placeholder="City"
                            value={city}
                            onChange={e => setCity(e.target.value)}/>
                        <input
                            placeholder="CNt"
                            style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}/>
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>

    )
}
