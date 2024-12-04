import { useState } from 'react';
import { useEffect } from 'react';

// import FormCreatePost from './formCreatePost';

import Posts from '../data/Posts';


function Main() {

    // Invece di tanti USE-STATE per ciascun field, uso un solo USE-STATE del FORM al cui interno specifico le KEYS
    const [formFields, setFormFields] = useState({
        title: '',
        content: '',
        img: '',
        category: '',
        published: false,
        tags: [],
    })

    const [Feed, setFeed] = useState([]);


    const handleFormFieldsChange = (e) => {
        // Se il valore è TEXT o CHECKBOX rendo due risultati diversi tramite TERNARY-OPERATOR
        const receivedValue = (e.target.type === 'checkbox' ? e.target.checked : e.target.value);

        // Assegno dinamicamente tutti i VALUE del FORM tramite le info che ci fornisce l'EVENT e la KEY dinamica tramite il NAME dell'INPUT
        setFormFields({
            // Importo tutte le KEYS da NON modificare così come sono
            ...formFields,
            // Modifico solo la KEY con il nome dell'INPUT, che deve coincidere con quello delle KEYS del FORM assegnate nello USE-STATE dinamico
            [e.target.name]: receivedValue,
        });

        console.log(e.target.checked)
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
            published: formFields.published,
            tags: formFields.tags,
        }
        // Creo un NUOVO ARRAY contenente tutto ciò che era nell'Array originale + il NUOVO OBJECT
        const updatedFeed = [...Feed, newPost,]
        // Imposto lo USE-STATE sul nuovo Array aggiornato
        setFeed(updatedFeed);
        // Svuoto la casella dell'INPUT assegnando un valore vuoto al Field

        alert('Creation successful')
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

                        {/* <FormCreatePost
                            handleSubmit={handleFormSubmit}
                            handleFieldsChange={handleFormFieldsChange}
                            title={formFields.title}
                            content={formFields.content}
                            img={formFields.img}
                            published={formFields.published}
                        /> */}

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

                                {/* TAGS */}
                                {/* <label htmlFor="tagsField">Tags</label>
                                <select name="tags" id="tagsField" onChange={handleFormFieldsChange} value={formFields.tags} multiple>
                                    <option value="a">a</option>
                                    <option value="b">b</option>
                                    <option value="c">c</option>
                                </select> */}

                                {/* PUBLISHED */}
                                <label htmlFor="publishedField">Publish</label>
                                {/* <input type="text" name='published' id='publishedField' value={formFields.published} onChange={handleFormFieldsChange} className='valueInput' required /> */}
                                <input type="checkbox" checked={formFields.published} name='published' id='publishedField' onChange={handleFormFieldsChange} className='valueInput' />
                            </div>

                            <button>Create post</button>
                        </form>
                    </section>

                    {/* POST SECTION */}
                    <section className='feed'>
                        <h3 className=''>Post List</h3>

                        <ul className='feedList'>
                            {/* CONDIZIONE PER LA STAMPA SU DOM */}
                            {Feed.length ?
                                Feed
                                    .filter(post => post.published === true)
                                    .map((post, index) => (
                                        <li key={index} className='feedItem'>
                                            <div className='left'>
                                                <h4>{post.title}</h4>
                                                <p><strong>{post.category + ' - '}</strong></p>
                                                <p>{post.content}</p>
                                                <p>{post.tags}</p>
                                            </div>

                                            <div className='right'>
                                                <p>{post.published ? 'published' : 'draft'}</p>
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