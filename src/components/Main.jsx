import { useState } from 'react';
import Posts from '../data/Posts';


function Main() {

    // Invece di tanti USE-STATE per ciascun field, uso un solo USE-STATE del FORM al cui interno specifico le KEYS
    const [formFields, setFormFields] = useState({
        title: '',
    })

    const [Feed, setFeed] = useState([]);


    const handleFormFieldsChange = (e) => {
        // Assegno dinamicamente tutti i VALUE del FORM tramite le info che ci fornisce l'EVENT e la KEY dinamica tramite il NAME dell'INPUT
        setFormFields({
            // Importo tutte le KEYS da NON modificare così come sono
            ...formFields,
            // Modifico solo la KEY con il nome dell'INPUT, che deve coincidere con quello delle KEYS del FORM assegnate nello USE-STATE dinamico
            [e.target.name]: e.target.value,
        });
    }

    const handleFormSubmit = (e) => {
        // Evito che il Submit ricarichi la pagina tramite "e" (EVENT), che è un OBJECT automaticamente fornito contenente tutte le info dell'evento lanciato
        e.preventDefault();
        // Assegno i valori delle KEYS del nuovo OBJECT che sto creando
        const newPost = {
            title: formFields.title,
        }
        // Creo un NUOVO ARRAY contenente tutto ciò che era nell'Array originale + il NUOVO OBJECT
        const updatedFeed = [...Feed, newPost,]
        // Imposto lo USE-STATE sul nuovo Array aggiornato
        setFeed(updatedFeed);
        // Svuoto la casella dell'INPUT assegnando un valore vuoto al Field
        formFields.title = '';
    }

    const modifyTitle = (modifyIndex) => {
        const newTitle = prompt('Insert new Title');

        const updatedFeed = [...Feed];
        updatedFeed[modifyIndex].title = newTitle;

        setFeed(updatedFeed);
    }

    const deletePost = (deleteIndex) => {
        setFeed(Feed.filter((post, index) => index !== deleteIndex));
    }

    return (
        <>
            <main>
                <div className="container debug">

                    {/* FORM SECTION */}
                    <section>
                        <form action="" className='debug' onSubmit={handleFormSubmit}>
                            <h3 className='debug'>Insert Form</h3>

                            <label htmlFor="titleField">Title</label>
                            <input type="text" name='title' id='titleField' value={formFields.title} onChange={handleFormFieldsChange} />

                            <button>Create post</button>

                        </form>
                    </section>

                    {/* POST SECTION */}
                    <section>
                        <h3 className='debug'>Post List</h3>

                        <ul className='debug'>
                            {/* CONDIZIONE PER LA STAMPA SU DOM */}
                            {Feed.length ?
                                Feed.map((post, index) => (
                                    <li key={index} className='debug'>
                                        <h4>{post.title}</h4>
                                        <p>{post.content}</p>

                                        <button type='button' onClick={() => modifyTitle(index)}>Modify Title</button>
                                        <button type='button' onClick={() => deletePost(index)}>Delete button</button>
                                    </li>
                                )) :
                                <h3>No posts available</h3>
                            }
                        </ul>
                    </section>

                </div>
            </main >
        </>
    )
}

export default Main