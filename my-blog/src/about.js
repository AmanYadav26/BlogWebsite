import React from 'react';
import video from './video.mp4';

const Aboutus = () => {
    return (
        <div>
            <video width="320" height="240" controls>
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}

export default Aboutus;
