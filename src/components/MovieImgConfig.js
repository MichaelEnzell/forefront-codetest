import React, { useState, useEffect } from 'react';

export default function MovieImgConfig() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [image_size, setSize] = useState([]);
    const [image_base_url, setBaseUrl] = useState([]);

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/configuration?api_key=d519e808e67c97221db30c08eaf8bd09")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setSize(result.images.backdrop_sizes);
                    setBaseUrl(result.images.base_url);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    return (
        <p>{image_base_url + image_size[1]}</p>
    )
}
