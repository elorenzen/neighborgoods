<template>
  <div class="flex items-center justify-center p-5">
    <ScriptGoogleMaps
      :center="center"
      :markers="markers"
      :api-key="key"
      :mapOptions="{ zoom: 8 }"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const config   = useRuntimeConfig()
const evtStore = useEventStore()
const events   = ref(evtStore.allEvents)
const key      = ref(config.public.gMapKey)
const markers  = ref([])
const center   = ref({ lat: 34.0557, lng: -118.2426})

onMounted(() => {
    setMarkers()
})

const setMarkers = () => {
    events.value.forEach((evt:any) => {
        const coords = JSON.parse(evt.location_coordinates)
        markers.value.push(`${coords.lat},${coords.lng}`)
    })
}

// === NEED TO CREATE MAP ID IN GOOGLE CONSOLE BEFORE USING MAP STYLE ===
// const mapOptions = {
//     zoom: 8,
//     styles: [
//         {
//             "featureType": "water",
//             "elementType": "geometry",
//             "stylers": [
//                 {
//                     "visibility": "on"
//                 },
//                 {
//                     "color": "#aee2e0"
//                 }
//             ]
//         },
//         {
//             "featureType": "landscape",
//             "elementType": "geometry.fill",
//             "stylers": [
//                 {
//                     "color": "#abce83"
//                 }
//             ]
//         },
//         {
//             "featureType": "poi",
//             "elementType": "geometry.fill",
//             "stylers": [
//                 {
//                     "color": "#769E72"
//                 }
//             ]
//         },
//         {
//             "featureType": "poi",
//             "elementType": "labels.text.fill",
//             "stylers": [
//                 {
//                     "color": "#7B8758"
//                 }
//             ]
//         },
//         {
//             "featureType": "poi",
//             "elementType": "labels.text.stroke",
//             "stylers": [
//                 {
//                     "color": "#EBF4A4"
//                 }
//             ]
//         },
//         {
//             "featureType": "poi.park",
//             "elementType": "geometry",
//             "stylers": [
//                 {
//                     "visibility": "simplified"
//                 },
//                 {
//                     "color": "#8dab68"
//                 }
//             ]
//         },
//         {
//             "featureType": "road",
//             "elementType": "geometry.fill",
//             "stylers": [
//                 {
//                     "visibility": "simplified"
//                 }
//             ]
//         },
//         {
//             "featureType": "road",
//             "elementType": "labels.text.fill",
//             "stylers": [
//                 {
//                     "color": "#5B5B3F"
//                 }
//             ]
//         },
//         {
//             "featureType": "road",
//             "elementType": "labels.text.stroke",
//             "stylers": [
//                 {
//                     "color": "#ABCE83"
//                 }
//             ]
//         },
//         {
//             "featureType": "road",
//             "elementType": "labels.icon",
//             "stylers": [
//                 {
//                     "visibility": "off"
//                 }
//             ]
//         },
//         {
//             "featureType": "road.local",
//             "elementType": "geometry",
//             "stylers": [
//                 {
//                     "color": "#A4C67D"
//                 }
//             ]
//         },
//         {
//             "featureType": "road.arterial",
//             "elementType": "geometry",
//             "stylers": [
//                 {
//                     "color": "#9BBF72"
//                 }
//             ]
//         },
//         {
//             "featureType": "road.highway",
//             "elementType": "geometry",
//             "stylers": [
//                 {
//                     "color": "#EBF4A4"
//                 }
//             ]
//         },
//         {
//             "featureType": "transit",
//             "stylers": [
//                 {
//                     "visibility": "off"
//                 }
//             ]
//         },
//         {
//             "featureType": "administrative",
//             "elementType": "geometry.stroke",
//             "stylers": [
//                 {
//                     "visibility": "on"
//                 },
//                 {
//                     "color": "#87ae79"
//                 }
//             ]
//         },
//         {
//             "featureType": "administrative",
//             "elementType": "geometry.fill",
//             "stylers": [
//                 {
//                     "color": "#7f2200"
//                 },
//                 {
//                     "visibility": "off"
//                 }
//             ]
//         },
//         {
//             "featureType": "administrative",
//             "elementType": "labels.text.stroke",
//             "stylers": [
//                 {
//                     "color": "#ffffff"
//                 },
//                 {
//                     "visibility": "on"
//                 },
//                 {
//                     "weight": 4.1
//                 }
//             ]
//         },
//         {
//             "featureType": "administrative",
//             "elementType": "labels.text.fill",
//             "stylers": [
//                 {
//                     "color": "#495421"
//                 }
//             ]
//         },
//         {
//             "featureType": "administrative.neighborhood",
//             "elementType": "labels",
//             "stylers": [
//                 {
//                     "visibility": "off"
//                 }
//             ]
//         }
//     ]
// }
</script>
