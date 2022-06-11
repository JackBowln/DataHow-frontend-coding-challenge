import type geolocation from "@/types/geolocation";
import { reactive, readonly, ref } from "vue";
export default () => {
  const payload = reactive<geolocation>({ latitude: 0, longitude: 0 });


  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;

        payload.latitude = lat.toFixed(2);
        payload.longitude = long.toFixed(2);
      });
    } else {
      throw new Error("Geolocation is not supported by this browser.");
    }
  }
  // exposed
  return {
    payload: readonly(payload),
    getLocation
  };
};
