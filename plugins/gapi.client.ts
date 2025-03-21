// plugins/gapi.client.ts
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(() => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.async = true;
    document.head.appendChild(script);
});