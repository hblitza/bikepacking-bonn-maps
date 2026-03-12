import ImageTile from "ol/source/ImageTile.js";
import Map from "ol/Map.js";
import { OSM, TileWMS } from "ol/source";
import TileLayer from "ol/layer/Tile.js";
import View from "ol/View.js";

import proj4 from "proj4";
import { register } from "ol/proj/proj4.js";

const osm = new TileLayer({
  source: new OSM(),
});

const opentopomap = new TileLayer({
  source: new ImageTile({
    url: "https://a.tile.opentopomap.org/{z}/{x}/{y}.png",
    attributions:
      "Kartendaten: © OpenStreetMap-Mitwirkende, SRTM | Kartendarstellung: © OpenTopoMap (CC-BY-SA)",
  }),
});

const cyclOsm = new TileLayer({
  source: new ImageTile({
    url: "https://a.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
    attributions:
      "Kartendaten: © OpenStreetMap-Mitwirkende, Tiles: © CyclOSM, Lizenz: CC-BY-SA",
  }),
});

const dop = new TileLayer({
  source: new TileWMS({
    attributions: "© Bezirksregierung Köln. Datenlizenz Deutschland – Zero",
    params: { LAYERS: "nw_dop_rgb", TILED: true },
    url: "https://www.wms.nrw.de/geobasis/wms_nw_dop?service=WMS",
    tileSize: 512,
  }),
});

const dopCir = new TileLayer({
  source: new TileWMS({
    attributions: "© Bezirksregierung Köln. Datenlizenz Deutschland – Zero",
    params: { LAYERS: "nw_dop_cir", TILED: true },
    url: "https://www.wms.nrw.de/geobasis/wms_nw_dop?service=WMS",
    tileSize: 512,
  }),
});

proj4.defs(
  "EPSG:25832",
  "+proj=utm +zone=32 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs",
);
register(proj4);

const view = new View({
  center: [373268.575404, 5616045.834809],
  zoom: 13,
  projection: "EPSG:25832",
});

const map1 = new Map({
  target: "map1",
  layers: [osm],
  view: view,
});

const map2 = new Map({
  target: "map2",
  layers: [opentopomap],
  view: view,
});

const map1Selector = document.getElementById("layerSelect1");
const map2Selector = document.getElementById("layerSelect2");

const layerMap = {
  osm,
  opentopomap,
  dop,
  dopCir,
  cyclOsm,
};

function update(evt) {
  const map = evt.target.id === "layerSelect1" ? map1 : map2;
  const layer = layerMap[evt.target.value];
  if (layer) map.setLayers([layer]);
};

map1Selector.addEventListener("change", update);
map2Selector.addEventListener("change", update);
