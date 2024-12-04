import { useState } from 'react';
import Posts from '../data/Posts';


function Main() {

    const [titleField, setTitleField] = useState('Default');

    const [Feed, setFeed] = useState([]);


    const handleInputChange = (e) => {
        setTitleField(e.target.value);
    }

    const handleFormSubmit = (e) => {
        // Evito che il Submit ricarichi la pagina tramite "e" (EVENT), che è un OBJECT automaticamente fornito contenente tutte le info dell'evento lanciato
        e.preventDefault();
        // Assegno i valori delle KEYS del nuovo OBJECT che sto creando
        const newPost = {
            title: titleField,
        }
        // Creo un NUOVO ARRAY contenente tutto ciò che era nell'Array originale + il NUOVO OBJECT
        const updatedFeed = [...Feed, newPost,]
        // Imposto lo USE-STATE sul nuovo Array aggiornato
        setFeed(updatedFeed);
        // Svuoto la casella dell'INPUT assegnando un valore vuoto al Field
        setTitleField('');
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

                            <label htmlFor="postTitle">Title</label>
                            <input type="text" name='postTitle' id='postTitle' value={titleField} onChange={handleInputChange} />

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