mapboxgl.accessToken =
  "pk.eyJ1IjoiZWNrb3NuZWVreiIsImEiOiJja2MzcXhxNTYwMGt6MnF0NnAxNjA0cmNpIn0.dzMd2J-wPQ14wVtdSVYiUw";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 10,
  center: [-116.976348, 32.651115],
});

// Fetch stores from API
async function getStores() {
  const res = await fetch("/api/v1/stores");
  const data = await res.json();

  console.log(data);

  const stores = data.data.map((store) => {
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          store.location.coordinates[0],
          store.location.coordinates[1],
        ],
      },
      properties: {
        storeId: store.storeId,
        icon: "shop",
      },
    };
  });
  loadMap(stores);
}

// Load Map with stores
function loadMap(stores) {
  map.on("load", function () {
    map.addSource("point", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: stores,
        //   features: [
        //     {
        //       type: "Feature",
        //       geometry: {
        //         type: "Point",
        //         coordinates: [-116.976348, 32.651115],
        //       },
        //       properties: {
        //           storeId: '0001',
        //           icon: 'shop'
        //       }
        //     },
        //   ],
      },
    });
    map.addLayer({
      id: "points",
      type: "symbol",
      source: "point",
      layout: {
        "icon-image": "{icon}-15",
        "icon-size": 1.5,
        "text-field": "{storeId}",
        "text-font": ["Open Sans Semibold"],
        "text-offset": [0, 0.9],
        "text-anchor": "top",
      },
    });
  });
}

getStores();
