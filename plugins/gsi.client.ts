// plugins/gsi.client.ts
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    document.head.appendChild(script);
});