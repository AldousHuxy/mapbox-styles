import mapboxgl from '../lib/mapboxgl';
import { useEffect, useRef, useState } from 'react';

export const Map = () => {
    const mapRef = useRef<HTMLDivElement>(null)

    const style: string = 'mapbox://styles/milehighfd/clzljah8d003101pb3yd58njv/draft'
    const [longitude, setLongitude] = useState<number>(-105.14041076866356)
    const [latitude, setLatitude] = useState<number>(39.714421827364156)
    const [zoom, setZoom] = useState<number>(9)

    useEffect(() => {
        const map = new mapboxgl.Map({ container: mapRef.current!, style, center: [longitude, latitude],  zoom })
    
        map.addControl(new mapboxgl.NavigationControl(), 'top-right')
    
        map.on('move', () => {
            setLongitude(parseInt(map.getCenter().lng.toFixed(4)))
            setLatitude(parseInt(map.getCenter().lat.toFixed(4)))
            setZoom(parseInt(map.getZoom().toFixed(2)))
        })

        return () => map.remove()
    }, [])

    return (
        <>
            <div style={{
                backgroundColor: 'rgb(35 55 75 / 90%)',
                color: '#fff',
                padding: '6px 12px',
                fontFamily: 'monospace',
                zIndex: 1,
                position: 'absolute',
                top: 0,
                left: 0,
                margin: '12px',
                borderRadius: '4px'
            }}>
                Longitude: {longitude} | Latitude: {latitude} | Zoom: {zoom}
            </div>
            <div ref={mapRef} style={{ height: '100vh' }} />
        </>
    )
}