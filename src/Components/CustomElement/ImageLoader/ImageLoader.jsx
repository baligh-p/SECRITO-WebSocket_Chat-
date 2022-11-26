import { useRef, useState } from 'react'

const ImageLoader = ({ src, alt, className, click }) => {
    const img = useRef(null)
    const [loading, setLoading] = useState(true)
    return (
        <div onClick={click} className={className}>
            <img onLoad={() => { setLoading(false) }} ref={img} className={`t-w-full t-h-full ${!loading ? '' : 'hidden'}`} src={src} alt={alt} />
            <div className={`h-full w-full bg-gray-300/80 animate-pulse ${loading ? '' : 'hidden'}`}></div>
        </div>
    )
}

export default ImageLoader    