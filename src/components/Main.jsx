import { useState } from 'react';
import Posts from '../data/Posts';


function Main() {

    const titleField = '';

    return (
        <>
            <main>
                <div className="container debug">

                    {/* FORM SECTION */}
                    <section>
                        <form action="" className='debug'>
                            <h3 className='debug'>Insert Form</h3>

                            <label htmlFor="postTitle">Title</label>
                            <input type="text" className='debug' id='postTitle' />

                        </form>
                    </section>

                    {/* POST SECTION */}
                    <section>

                    </section>

                </div>
            </main >
        </>
    )
}

export default Main