import React, { useState } from "react";
import logoImg from "../../assets/logo.png";
import { Link, useHistory} from "react-router-dom";

import { FiArrowLeft } from "react-icons/all";
import api from '../../services/api';

import './styles.css';

export default function NewIncident() {
   const ongId = localStorage.getItem('ongId');

   const [title, setTitle] = useState();
   const [description, setDescription] = useState();
   const [value, setValue] = useState();

   const history = useHistory();

   async function handleCreateIncident(e) {
       e.preventDefault();

       const data = {
           title,
           description,
           value
       }


       try {
            await api.post('incident', data, {
                headers: {
                    Authorization: ongId
                }
            });

            history.push('/profile');
       } catch(err) {

       }
   }

   return  (
       <div className="new-incident-container">
          <div className="content">
             <section>
                <img src={logoImg} alt="Be My Hero"/>
                <h1> Register new case </h1>
                <p>Please describe the issue as people can help.</p>

                <Link className="back-link" to="/">
                   <FiArrowLeft size={16} color="#E02041" />
                   Back to home
                </Link>
             </section>
             <form onSubmit={handleCreateIncident}>
                <input
                    placeholder="Issue title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <input
                    placeholder="Budget in Euros"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />

                <button className="button" type="submit">Cadastrar</button>
             </form>
          </div>
       </div>
   )

}
