//All the setting related to the Mapbox 
export const MAP_ACCESS_TOKEN = process.env.VUE_APP_MAP_ACCESS_TOKEN;
export const MAP_STYLE = "mapbox://styles/mapbox/streets-v11";
export const MAP_GEO_JSON_LAYER =  {
                                        'id': 'symbols',
                                        'type': 'symbol',
                                        'source': 'points',
                                        'layout': {
                                            'icon-image': 'rocket-15'
                                        }};
export const MAP_GEO_JSON_SOURCE = "https://bitbucket.org/idda/coding-challenges/raw/88be221f75a1b108c9e5f7222906b2735c147ac8/testBlob.json";