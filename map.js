import Map from 'ol/Map.js';
import View from 'ol/View.js';
import ImageLayer from 'ol/layer/Image';
import TileLayer from 'ol/layer/Tile.js';
import { ImageWMS, OSM, TileWMS, XYZ } from 'ol/source';
import ImageTile from 'ol/source/ImageTile.js';

const key = 'XXHXgbVEutyuM6ludtzM';
const attributions =
    '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
    '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

const osm = new TileLayer({
    source: new OSM(),
});

const outdoor = new TileLayer({
    source: new ImageTile({
        attributions: attributions,
        url: 'https://api.maptiler.com/maps/outdoor-v4/{z}/{x}/{y}.png?key=' + key,
        tileSize: 512,
        maxZoom: 22,
    }),
});

const opentopomap = new TileLayer({
    source: new ImageTile({
        url: 'https://a.tile.opentopomap.org/{z}/{x}/{y}.png',
        attributions: 'Kartendaten: © OpenStreetMap-Mitwirkende, SRTM | Kartendarstellung: © OpenTopoMap (CC-BY-SA)',
    }),
});

const cyclOsm = new TileLayer({
    source: new ImageTile({
        url: 'https://a.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
        attributions: 'Kartendaten: © OpenStreetMap-Mitwirkende, Tiles: © CyclOSM, Lizenz: CC-BY-SA',
    }),
});

const aerialLayer = new TileLayer({
    source: new ImageTile({
        attributions: attributions,
        url: 'https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=' + key,
        tileSize: 512,
        maxZoom: 20,
    }),
});

const dop = new TileLayer({
    source: new TileWMS({
        attributions: attributions,
        params: { 'LAYERS': 'nw_dop_rgb', 'TILED': true },
        url: 'https://www.wms.nrw.de/geobasis/wms_nw_dop?service=WMS',
        tileSize: 512
    }),
});

const dopCir = new TileLayer({
    source: new TileWMS({
        attributions: attributions,
        params: { 'LAYERS': 'nw_dop_cir', 'TILED': true },
        url: 'https://www.wms.nrw.de/geobasis/wms_nw_dop?service=WMS',
        tileSize: 512
    }),
});

const view = new View({
    center: [
        803969.2804989766,
        6563044.043200138
    ],
    zoom: 13,
});

const map1 = new Map({
    target: 'map1',
    layers: [osm],
    view: view,
});

const map2 = new Map({
    target: 'map2',
    layers: [opentopomap],
    view: view,
});

const map1Selector = document.getElementById('layerSelect1');
const map2Selector = document.getElementById('layerSelect2');

const layerMap = {
    osm,
    opentopomap,
    dop,
    dopCir,
    cyclOsm,
    outdoor
};

function update(evt) {
    const map = evt.target.id === 'layerSelect1' ? map1 : map2;
    const layer = layerMap[evt.target.value];
    if (layer) map.setLayers([layer]);
}
map1Selector.addEventListener('change', update);
map2Selector.addEventListener('change', update);


// window.onload = (event) => {

//     selectButton.addEventListener('change', (evt) => {
//     });
// };

