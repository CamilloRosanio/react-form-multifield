import { useState } from 'react';
import Posts from '../data/Posts';


function Main() {

    // Invece di tanti USE-STATE per ciascun field, uso un solo USE-STATE del FORM al cui interno specifico le KEYS
    const [formFields, setFormFields] = useState({
        title: '',
        content: '',
        img: '',
        category: '',
        state: '',
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
            content: formFields.content,
            img: formFields.img,
            category: formFields.category,
            state: formFields.state,
        }
        // Creo un NUOVO ARRAY contenente tutto ciò che era nell'Array originale + il NUOVO OBJECT
        const updatedFeed = [...Feed, newPost,]
        // Imposto lo USE-STATE sul nuovo Array aggiornato
        setFeed(updatedFeed);
        // Svuoto la casella dell'INPUT assegnando un valore vuoto al Field

        console.log(Feed);
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
                <div className="container">

                    {/* FORM SECTION */}
                    <section>
                        <form action="" className='formContainer' onSubmit={handleFormSubmit}>
                            <h2 className=''>Create Post</h2>

                            {/* INPUTS */}
                            <div className='inputContainer'>
                                {/* TITLE */}
                                <label htmlFor="titleField">Title</label>
                                <input type="text" name='title' id='titleField' value={formFields.title} onChange={handleFormFieldsChange} className='valueInput' required />

                                {/* CONTENT */}
                                <label htmlFor="contentField">Content</label>
                                <input type="text" name='content' id='contentField' value={formFields.content} onChange={handleFormFieldsChange} className='valueInput' required />

                                {/* IMG */}
                                <label htmlFor="imgField">Image</label>
                                <input type="text" name='img' id='imgField' value={formFields.img} onChange={handleFormFieldsChange} className='valueInput' />

                                {/* CATEGORY */}
                                <label htmlFor="categoryField">Category</label>
                                <select name="category" id="categoryField" onChange={handleFormFieldsChange} className='valueInput' required>
                                    <option value="React">React</option>
                                    <option value="HTML">HTML</option>
                                    <option value="Node.js">Node.js</option>
                                </select>

                                {/* STATE */}
                                <label htmlFor="stateField">State</label>
                                <input type="text" name='state' id='stateField' value={formFields.state} onChange={handleFormFieldsChange} className='valueInput' required />
                            </div>

                            <button className='button block'>Create post</button>
                        </form>
                    </section>

                    {/* POST SECTION */}
                    <section className='feed'>
                        <h3 className=''>Post List</h3>

                        <ul className='feedList'>
                            {/* CONDIZIONE PER LA STAMPA SU DOM */}
                            {Feed.length ?
                                Feed.map((post, index) => (
                                    <li key={index} className='feedItem'>
                                        <div className='left'>
                                            <h4>{post.title}</h4>
                                            <p><strong>{post.category}</strong></p>
                                            <p>{post.content}</p>
                                        </div>

                                        <div className='right'>
                                            <button type='button' onClick={() => modifyTitle(index)} className='button gold'>Modify Title</button>
                                            <button type='button' onClick={() => deletePost(index)} className='button red'>Delete</button>
                                        </div>
                                    </li>
                                )) :
                                <h3 className='feedItem'>No posts available</h3>
                            }
                        </ul>
                    </section>

                </div>
            </main >
        </>
    )
}

export default Main