# Changes Summary: Midtrans Payment Integration

This document outlines all changes made since the previous git commit to integrate **Midtrans Payment Gateway** into the Mathify application.

---

## 1. Dependency Updates

### [pom.xml](file:///d:/TUGAS%20KULIAH/4/PBO/tubes/mathify/pom.xml)
* Added the Midtrans Java SDK dependency:
  ```xml
  <dependency>
    <groupId>com.midtrans</groupId>
    <artifactId>java-library</artifactId>
    <version>3.2.2</version>
  </dependency>
  ```
* Configured compiler plugin to ignore Lombok annotation processor errors during compile by adding `<proc>none</proc>` to `maven-compiler-plugin` configuration:
  ```xml
  <configuration>
    <source>17</source>
    <target>17</target>
    <proc>none</proc>
  </configuration>
  ```

---

## 2. Docker & Environment Configuration

### [compose.yaml](file:///d:/TUGAS%20KULIAH/4/PBO/tubes/mathify/compose.yaml)
* Exposed Midtrans environment variables from host `.env` file directly to the web service container:
  ```yaml
  - MIDTRANS_MERCHANT_ID=${MIDTRANS_MERCHANT_ID}
  - MIDTRANS_CLIENT_KEY=${MIDTRANS_CLIENT_KEY}
  - MIDTRANS_SERVER_KEY=${MIDTRANS_SERVER_KEY}
  ```

---

## 3. New Backend Controller

### [NEW] [CheckoutServlet.java](file:///d:/TUGAS%20KULIAH/4/PBO/tubes/mathify/src/main/java/com/mathify/controller/CheckoutServlet.java)
* Created a new WebServlet mapped to `/checkout` that handles transaction token generation.
* Initializes the Midtrans SDK `Config` dynamically using the environment variables (`MIDTRANS_SERVER_KEY`, `MIDTRANS_CLIENT_KEY`).
* Set to **Production Mode** (`.setIsProduction(true)`) using your configured live Merchant and API keys.
* Generates a unique transaction token for a checkout amount of `Rp 150.000` via the Midtrans Snap API and forwards the client key and `snapToken` parameters to the checkout front-end.

---

## 4. New Frontend Checkout View

### [NEW] [index.jsp](file:///d:/TUGAS%20KULIAH/4/PBO/tubes/mathify/src/main/webapp/WEB-INF/jsp/pages/checkout/index.jsp)
* Formatted modern UI card detailing the premium purchase with customizable styling.
* Loads the Midtrans Snap SDK JS library directly from the live Production URL:
  ```html
  <script type="text/javascript"
          src="https://app.midtrans.com/snap/snap.js"
          data-client-key="${clientKey}"></script>
  ```
* Attaches an event listener to the **Proceed to Payment** button that triggers the Midtrans Snap pay overlay modal using the generated transaction token (`window.snap.pay('${snapToken}', ...)`).
* Includes callback handlers for transaction outcomes:
  * `onSuccess`
  * `onPending`
  * `onError`
  * `onClose`
