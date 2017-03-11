import React, {Component} from 'react';

export default class Video extends Component {
    render() {
        return(
            <div className="background-video">
			    <video className="video-container video-container-overlay" autoPlay="true" loop="true">
                    <source type="video/mp4"  
                            src="https://static.videezy.com/system/resources/previews/000/001/773/original/timelapseek.mp4" />
                </video>
			</div>
        );
    }
}