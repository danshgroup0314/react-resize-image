import React, {useState} from "react";
import './App.css';
import ImageResize from "./components/ImageResizer";

function App() {
    const [imageToResize, setImageToResize] = useState(undefined);
    const [resizedImage, setResizedImage] = useState(undefined);

    const [resizedImageURL, setResizedImageURL] = useState(undefined);

    const onUploadFile = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setImageToResize(event.target.files[0]);
        }
    };

    const onUpdateFileURL = (event) => {
        console.log(event.target.parentNode.querySelector('input').value)

        const imgSrc = event.target.parentNode.querySelector('input').value

        // Create Img Element with URL
        const imgElement = document.createElement('img')
        imgElement.src = imgSrc
        imgElement.crossOrigin = 'anonymous'
        imgElement.style.display = 'none'
        document.body.appendChild(imgElement)
        
        // Create canvas
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        // Set width and height
        canvas.width = 300
        canvas.height = 300
        // Draw the image
        ctx.drawImage(imgElement, 0, 0, 300, 300)

        // Remove Img Element
        imgElement.remove()

        setResizedImageURL(canvas.toDataURL('image/jpeg'))
    };

    return (
        <div className="app">
            <h1>Image Resizer</h1>
            <p>
                Please, upload an image and it will be showed both original and resized by
                50%
            </p>
            <input
                type="file"
                accept="image/*"
                onChange={onUploadFile}
            />
            <br />
            <p>Sample Image : <i>https://bafybeiecox4ps4tevdxcl2wus3lzbohbb7etus6s4df464hbjjl6hv34ne.ipfs.nftstorage.link/3450.png?ext=png</i></p>
            <div>
                <input
                    type="text"
                />
                <button onClick={onUpdateFileURL}>Load and Resize</button>
                <br />
            </div>
            <div>
                {
                    resizedImageURL && 
                    <div>
                        <h2>Resized Image from URL</h2>
                        <img alt="Resized Asset" src={resizedImageURL} />
                    </div>
                }
            </div>
            <div>
                <ImageResize
                    imageToResize={imageToResize}
                    onImageResized={(resizedImage) => setResizedImage(resizedImage)}
                />
            </div>
            {
                resizedImage &&
                <div>
                    <h2>Resized Image</h2>
                    <img alt="Resized Asset" src={resizedImage} />
                </div>
            }
        </div>
    );
}

export default App;
