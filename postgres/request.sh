wget 'http://overpass-api.de/api/interpreter?data=area["name"="France"]->.boundaryarea;(nwr(area.boundaryarea)[shop=hairdresser][name~"hair|tif",i];);out meta;' -O point.osm
osm2pgsql -d quoifeur -U jbriant -H localhost -S coiffeur.style -W -c point.osm
