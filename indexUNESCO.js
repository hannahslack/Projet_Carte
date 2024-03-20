var mymap = L.map('mymap').setView([42.7, 0.0338], 11.5);
var osmLayer = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
});


// These add all the other possible layers form OSM

var esriImagery = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/t\ile/{z}/{y}/{x}', {
    attribution: '&copy; <a href="https://www.esri.com">Esri</a>, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  }
);

var osmRoads = L.tileLayer(
  ' https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', { 
    attribution: '&copy; <a href="https://www.esri.com">Esri</a>, HERE, Garmin, USGS, Intermap, INCREMENT P, NRCan, Esri Japan, METI, Esri China (Hong Kong), Esri Korea, Esri (Thailand), NGCC, (c) OpenStreetMap contributors, and the GIS User Community'
  }
);

var osmTopo = L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: '&copy; <a href="http://www.esri.com">Esri</a>, HERE, Garmin, Intermap, increment P Corp., GEBCO, USGS, FAO, NPS, NRCAN, GeoBase, IGN, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), (c) OpenStreetMap contributors, and the GIS User Community'
});

// this defines the default layer that will be visible upon opening the page (I think topo is the best but à voir)
osmTopo.addTo(mymap);


// this adds buttons so that we can actually see the maps when we open the page
var baseLayers = {
  "OpenStreetMap": osmLayer,
  "Photos aériennes ESRI": esriImagery,
  "OpenStreetMap carte routière": osmRoads,
  "OpenStreetMap carte topographique": osmTopo,
};
var overlays = {};
L.control.layers(baseLayers, overlays).addTo(mymap);


// adds a bunch of different kinds of markers
var icones = {};

icones['mountain'] = L.icon({
  iconUrl: 'Icons/mountainicon.svg',
  iconSize: [22, 30],
  iconAnchor:   [14, 40],
  popupAnchor:  [0, -40]
});

icones['village'] = L.icon({
  iconUrl: 'Icons/villageicon.svg',
  iconSize: [22, 30],
  iconAnchor:   [14, 30],
  popupAnchor:  [0, -40]
});

icones['parking'] = L.icon({
  iconUrl: 'Icons/parkingicon.svg',
  iconSize: [22, 30],
  iconAnchor:   [14, 30],
  popupAnchor:  [0, -40]
});

// defines the POI (points of interest) as variables and attributes an icon and a description to them
var POI = {
  VGV: { nom: "Village de Gavarnie", icone: "village", descr: "Ce village est un beau point de départ pour vos aventures, et offre de nombreuses possibilités d'hébergement, restauration, achats, ...<br><br> <a href='https://www.valleesdegavarnie.com/infos-pratiques/nos-offices-de-tourisme/' target='_blank'>Office de tourisme</a><br>", coords: [42.7352, -0.01030], image: "Photos/gavarnievillage.jpeg" },
  MP: { nom: "Monte Perdido", icone: "mountain", descr: "Le Mont Perdu est le troisième sommet le plus haut des Pyrénées, et son nom décrit le caractère isolé de ce sommet. La montagne a une géologie calcaireuse, riche en fossiles, et provient d'une sédimentation marine. <br><br><b>Altitude:</b> 3'355 m<br>", coords: [42.6756, 0.0338], image: "Photos/montperdu.jpeg" },
  REFG: { nom: "Refugio de Goriz", icone: "parking", descr: "Départ ou fin de la marche. Possibilité de s'héberger et se restaurer dans le refuge, selon disponibilités. <br><br> <a href='https://maps.app.goo.gl/98G9TWygfJ6oE5a29' target='_blank'>Vers Google Maps</a><br>", coords: [42.6633, 0.0150], image: "Photos/refugiogoriz.jpeg" },
  MAX: { nom: "Cirque de Gavarnie", icone: "mountain", descr: "Magnifique cirque, les parois rocheuses sont simplement impressionantes, et les chutes d'eau vous feront rêver!", coords: [42.695297, -0.007112], image: "Photos/cirquegavarnie.jpeg" },
  PIN: { nom: "Parking Vallée Pineta", icone: "parking", descr: "Le parking Pradera de Pineta se trouve au bout de la vallée de Pineta, et s'offre comme superbe point de départ pour des randonnées dans la nature environnante. Le parking est grand et il y même un point d'information touristique dans le cas où vous chercheriez de plus amples informations.<br><br> <a href='https://maps.app.goo.gl/KeYJphc626myPiA97' target='_blank'>Vers Google Maps</a><br>", coords: [42.67645, 0.08585], image: "Photos/pinetavalley.jpeg" },
  CAS: { nom: "Cascada del Cinca", icone: "mountain", descr: "La Cascada del Cinca est une maginique cascade que l'on peut bien observer depuis la randonnée qui passe à côté. Cette cascade magnifique est l'une des plus grande en Espagne.", coords: [42.6846, 0.0587], image: "Photos/cascadadelcinca.jpeg" },
  PGA: { nom: "Parking de Gavarnie", icone: "parking", descr: "Grand parking pour commencer votre randonnée au Cirque de Gavarnie. <br><br> <a href='https://maps.app.goo.gl/oa61yr7Rp6UEMYVm9' target='_blank'>Vers Google Maps</a><br>", coords: [42.730788, -0.008005], image: "Photos/parkinggavarnie.jpeg" },
  CES: { nom: "Cirque d'Estaubé", icone: "mountain", descr: "Bien que moins connu que son voisin le cirque de Gavarnie, le cirque d'Estaubé est vraiment magnifique avec ses impressionants murs de roche. ", coords: [42.710272, 0.050793], image: "Photos/cirqueestaube.jpg" },
  LLR: { nom: "Llanos la Larri", icone: "mountain", descr: "Ce vaste plateau montagnard vous fera rêver avec ses chevaux en liberté et la belle cascade au bout de la vallée. ", coords: [42.687125, 0.084596], image: "Photos/lalarri.jpg" }
};


for (var k in POI) {
  var points = POI[k];
  var iconeMarqueur = icones['parking'];
  if (points.icone == 'mountain' || points.icone == 'village') {
    iconeMarqueur = icones[points.icone];
  }

  var marqueur = L.marker(points.coords, { icon: iconeMarqueur }).addTo(mymap);

  // Use a string to define the content of the popup, including a dynamic image
  marqueur.bindPopup("<b>" + points.nom + "</b><br>" + points.descr + "<br><img src='" + points.image + "' alt='Image' width='200' height='150'>");
}


L.geoJSON(troischemins, {
  style: function (feature) {
    return {
      color: feature.properties.color,
      weight: 3,
      opacity: 0.7
    };
  },
  onEachFeature: function (feature, layer) {
    layer.bindPopup("Path Name: " + feature.properties.name);
  }
}).addTo(mymap);



// Define descriptions for each path

var pathDescriptions = {
  randocascade: { nom: "Randonnée à la Cascade del Cinca", descr: "Randonnée à faire sur une journée. Cette boucle vous permettra de vous immerger dans la beauté du parc, en passant par l'impressionante cascade del Cinca. <br><br><b>Difficulté:</b> moyen<b><br>Longueur:</b> 9.8 km<br><b>Dénivélation:</b> 443 m<br>",URL: "https://www.alltrails.com/en-gb/explore/trail/spain/huesca/cascada-del-cinca-llanos-de-la-larri-lagos-de-la-munia" },
  randogavarnie: { nom: "Randonnée au Cirque de Gavarnie", descr: "Super randonnée de famille, accessible à tous, avec des vues magnifiques. <br><br><b>Difficulté:</b> facile<br><b>Longueur:</b> 10.0 km<br><b>Dénivélation:</b> 479 m<br>", URL: "https://www.alltrails.com/en-gb/explore/trail/france/hautes-pyrenees/gavarnie-gavarnie-cirque" },
  randogoriz: { nom: "Trek de traversée Refugio de Goriz - Gavarnie", descr: "Ce trek est parfait pour faire une randonnée un peu plus longue et pour profiter d'une nuit en montagne.<br><br><b>Difficulté:</b> difficile<br><b>Longueur:</b> 15.3 km<br><b>Dénivélation:</b> 653 m<br>", URL: "https://www.alltrails.com/en-gb/explore/trail/spain/huesca/refugio-de-goriz-gavarnie" }
};

L.geoJSON(troischemins, {
  style: function (feature) {
    return {
      color: feature.properties.color,
      weight: 3,
      opacity: 0.7
    };
  },
  onEachFeature: function (feature, layer) {
    // Use the path name as the key to get the description
    var pathDescription = pathDescriptions[feature.properties.name];

    // Construct popup content based on the structure of pathDescriptions
    var popupContent = "<b>" + (pathDescription ? pathDescription.nom : "Default Title") + "</b><br>";
    if (pathDescription) {
      popupContent += pathDescription.descr;

      if (pathDescription.URL) {
        popupContent += "<br><a href='" + pathDescription.URL + "' target='_blank'>Plus d'infos</a>";
      }
    } else {
      // Default description
      popupContent += "Default description";
    }

    layer.bindPopup(popupContent, {
      closeButton: false,  
      autoClose: false    
    });
  }
}).addTo(mymap);




