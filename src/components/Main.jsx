import { useState } from 'react';
import Posts from '../data/Posts';


function Main() {

    const [titleField, setTitleField] = useState('Default');


    const handleInputChange = (e) => {
        console.log(e.target.value);

        setTitleField(e.target.value);
    }

    const handleFormSubmit = (e) => {
        // Evito che il Submit ricarichi la pagina tramite "e" (EVENT)
        // "e" è un OBJECT contenente tutte le info dell'evento lanciato
        e.preventDefault();
    }

    const deletePost = (deleteIndex) => {
        alert('Delete this post');
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
                            {Posts.map((post, index) =>
                                <li key={post.id} className='debug'>
                                    <h4>{post.title}</h4>
                                    <p>{post.content}</p>

                                    <button type='button' onClick={() => deletePost(index)}>Delete button</button>
                                </li>
                            )}
                        </ul>
                    </section>

                </div>
            </main >
        </>
    )
}

export default Main