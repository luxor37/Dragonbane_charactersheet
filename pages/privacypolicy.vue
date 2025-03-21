<template>
  <section class="max-w-4xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Privacy Policy</h1>
    <p class="mb-2 text-sm text-gray-600">Last updated: March 21, 2025</p>
    <p class="mb-4">
      This Privacy Policy describes how [Your App Name] ("we", "us", or "our")
      collects, uses, and shares information when you access and use our
      application (“App”), which is hosted on Netlify and integrates with Google
      services for authentication and file storage. By using our App, you agree
      to the practices described in this policy.
    </p>

    <h2 class="text-2xl font-bold mt-6 mb-2">1. Information We Collect</h2>
    <h3 class="text-xl font-semibold mt-4">
      a. Personal Information from Google Authentication
    </h3>
    <p class="mb-2">
      When you sign in using your Google account, we obtain basic profile
      information such as your name, email address, and profile picture. This
      information is provided solely by Google and is used only for the purpose
      of authenticating you within the App.
    </p>
    <h3 class="text-xl font-semibold mt-4">b. Character Sheet Data</h3>
    <p class="mb-2">
      Our App stores your character sheet locally (via browser local storage)
      and, with your permission, on your personal Google Drive account as a JSON
      file (with a custom extension such as “.dragonborn.json”). No character
      sheet data is stored on our servers.
    </p>
    <h3 class="text-xl font-semibold mt-4">c. Technical Data</h3>
    <p class="mb-2">
      We may automatically collect non-personally identifiable information, such
      as your device type, browser type, and operating system, solely for
      technical and analytical purposes to help us improve the App.
    </p>

    <h2 class="text-2xl font-bold mt-6 mb-2">2. How We Use Your Information</h2>
    <ul class="list-disc ml-6">
      <li>
        <strong>Authentication:</strong> We use your Google account information
        to securely log you into the App.
      </li>
      <li>
        <strong>File Storage & Management:</strong> Your character sheet is
        saved and updated in your own Google Drive account. This process uses
        your permission via Google’s API; we do not access or store these files
        on our own servers.
      </li>
      <li>
        <strong>Local Data Storage:</strong> The App uses browser local storage
        to temporarily hold your character sheet data, ensuring quick access and
        offline support.
      </li>
      <li>
        <strong>Improvement & Analytics:</strong> Technical information may be
        used in aggregate to help us understand usage trends and improve the
        performance and reliability of the App.
      </li>
    </ul>

    <h2 class="text-2xl font-bold mt-6 mb-2">3. Third-Party Services</h2>
    <p class="mb-2">
      <strong>Google Services:</strong> Our App uses Google’s API for
      authentication and file storage. All data used in this process is governed
      by Google’s own privacy policies. We do not alter or misuse the data
      provided by Google.
    </p>
    <p class="mb-2">
      <strong>Hosting Providers:</strong> Our App is hosted on Netlify. We do
      not share any of your personal or character data with Netlify beyond what
      is required to serve the App.
    </p>

    <h2 class="text-2xl font-bold mt-6 mb-2">4. Data Security</h2>
    <p class="mb-2">
      We implement reasonable security measures to protect your information
      against unauthorized access, alteration, disclosure, or destruction.
      However, no method of transmission or storage over the Internet is 100%
      secure. Please review our practices and take necessary precautions when
      using online services.
    </p>

    <h2 class="text-2xl font-bold mt-6 mb-2">5. Your Rights and Choices</h2>
    <p class="mb-2">
      <strong>Access & Update:</strong> You can access and update your character
      sheet data at any time within the App.
    </p>
    <p class="mb-2">
      <strong>Revoking Permissions:</strong> You can revoke our access to your
      Google account data via your Google account settings. Please note that
      doing so may affect your ability to use the App.
    </p>
    <p class="mb-2">
      <strong>Data Deletion:</strong> You can clear your local storage data or
      remove the character sheet file from your Google Drive at any time. If you
      wish to stop using our App, you may do so and delete any stored data on
      your side.
    </p>

    <h2 class="text-2xl font-bold mt-6 mb-2">
      6. Changes to This Privacy Policy
    </h2>
    <p class="mb-2">
      We may update this Privacy Policy from time to time. Any changes will be
      posted on this page with an updated “Last updated” date. We encourage you
      to review our Privacy Policy periodically.
    </p>

    <h2 class="text-2xl font-bold mt-6 mb-2">7. Contact Us</h2>
    <p>
      If you have any questions or concerns about this Privacy Policy or our
      data practices, please contact us at:
      <strong>Email:</strong> [Your Support Email]
    </p>
  </section>
</template>

<script setup lang="ts">
// No additional logic needed for static content.
</script>
