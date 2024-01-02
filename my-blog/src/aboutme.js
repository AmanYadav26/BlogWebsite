import image from './assests/download.jpg'
import './aboutme.css'
const Aboutme = () => {
    return (
        <>
            <section className="d-flex justify-content-between mt-5 shadow-lg">
                <div className="aboutme">
                    <h2 className="text-danger text-start  px-3 mt-2">GET TO KNOW ME</h2>
                    <h5 className="heading text-danger text-start mt-5 px-3">Integrity in coverage,
                        <br />
                        flexibility in code
                    </h5>
                    <p className="text-muted text-start mt-2 px-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam vitae sint molestiae. Omnis, voluptates cum. Ad sint perspiciatis dolorem fugit voluptatem explicabo. Tempore sequi nihil ratione enim natus eius dolorem harum dolores magnam rerum. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus, nostrum.</p>
                    <p className="text-start mt-1 px-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum reiciendis suscipit deleniti? Sit eum deserunt nam. Lorem ipsum dolor sit amet.</p>
                    <button className="btn btn-secondary text-start mt-4 px-3 mb-3">Get in Touch</button>
                </div>
                <div className="image">

                </div>
            </section>

        </>

    );
}

export default Aboutme;
