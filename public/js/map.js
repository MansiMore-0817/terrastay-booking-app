    // const coordinates = "<%- JSON.stringify(listing.geometry.coordinates) %>";


    // let mapToken = mapToken;
    // console.log(mapToken);
    mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [77.209, 28.613], // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
    });


    console.log(coordinates);
    
    const marker = new mapboxgl.Marker()
        .setLngLat(coordinates) //Listing.geometry.coordinates
        .addTo(map);