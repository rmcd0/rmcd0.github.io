---
title: "Custom Maps style & Snazzy Maps"
description: "A custom Google Maps style made with Snazzy Maps, for a personal printout."
type: post
lang: en
tags: ["tools"]
image: "/assets/img/posts/2021-12-08-0-t3sy8DnsQSiLIlNd-97ad00.webp"
imageAlt: "Dark blue map of a peninsula with pink roads, on a salmon background"
permalink: "/custom-map-style/"
imageCaption: "Island of Jersey"
alsoOn: "https://medium.com/@rmcd0/custom-maps-style-snazzy-maps-781856186811"
---

This is a theme I worked out for myself in order to make an actual print-out as a gift on a canva or aluminium support — result further below. Colours are joyful and it gives sort of a “60’s spirit” to the map.

[Snazzy Maps](https://snazzymaps.com) is a very cool and user friendly tool developed in #C and React by [Adam Krogh](https://adamkrogh.com), where you can explore many Google Maps styles that the community has published (under creative commons and free to use). I don’t know if such a thing exists for Open Street Map, it would be even better! Gotta check that.

You can also create your own style, of course, by playing with the site editor in a WYSIWYG way, or by uploading your own JSON as long as it respects [Google Maps style array](https://developers.google.com/maps/documentation/javascript/json-styling-overview). Good point: you can use Snazzy Maps without creating an account, except if you want to save your work, and can download up to 10 PNG images per day.

My style here is named ‘Providential’ (no idea why, that’s what came to mind when I had to save it). Note that it renders nicer in terms of contrast on geographical areas with a minimum proportion of water (seashore, lake, river), and tends to render “messy” on a city area with a denser road network. In cities surrounded by a ring highway alimented from several roads, this style makes them look like a heart with arteria. I like it.

See for yourself:

![City of Caen, Normandy](/assets/img/posts/2021-12-08-0-9L9XQvEAcgAu5-7D-c61cc6.webp)
*City of Caen, Normandy*

To use this style, you can simply go to the [editor page](https://snazzymaps.com/editor) and copy-paste JSON extract below. Enjoy!

```
[
    {
        "featureType": "all",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "weight": 0.4
            },
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#2b3f57"
            },
            {
                "weight": 0.1
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "color": "#6c5b7b"
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f55f77"
            },
            {
                "weight": 3
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
            {
                "weight": 0.8
            },
            {
                "color": "#ffffff"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text",
        "stylers": [
            {
                "weight": 1.3
            },
            {
                "color": "#FFFFFF"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f55f77"
            },
            {
                "weight": 1.1
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "weight": 0.7
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f55f77"
            },
            {
                "weight": 0.4
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.station.airport",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.station.rail",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "saturation": "0"
            }
        ]
    },
    {
        "featureType": "transit.station.rail",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "transit.station.rail",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "transit.station.rail",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.station.rail",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
Movi                "color": "#f3b191"
            },
            {
                "visibility": "on"
            }
        ]
    }
]
```

---

## Canva print

Here’s how an actual print out of the city of Cádiz, Spain, renders on a canva painting-like:

![The custom map printed on canvas: dark blue land and pink roads](/assets/img/posts/2021-12-08-1-bvIE41Y25_YrqSA6zEM78w-2f0a7b.webp)

![Close-up of the printed map canvas](/assets/img/posts/2021-12-08-1-SM5PffQ5tPaWC6VIRFguTg-eb44ae.webp)

I extracted my PNG from Snazzy Maps, then used German company [Saal Digital](http://saal-digital.fr) services, which I can definitely recommend: timely print & delivery, fair prices (~35€ for the 40x40cm canva above), great quality. Their free software, Saal Design, is easy to grasp. They offer prints on many other supports like PVC, photo paper, glass, aluminium.

FWIW, about aluminium, I also ordered a personalized frame from them, a 40x60cm version of Bitcoin whitepaper — that was my own gift to myself this year^^

Costed me around 35€ too. Of course the artist here is yourself so there’s no sales royalties and you can create any design you want.

![Bitcoin WP — banana for scale :)](/assets/img/posts/2021-12-08-1-e_MCbNfgV749c7Wif75IqA-025b77.webp)
*Bitcoin WP — banana for scale :)*
