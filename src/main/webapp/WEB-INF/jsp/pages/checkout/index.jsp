<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mathify - Checkout</title>
    <!-- Load Midtrans Snap JS -->
    <script type="text/javascript"
            src="https://app.midtrans.com/snap/snap.js"
            data-client-key="${clientKey}"></script>
    <style>
        body { font-family: 'Inter', sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background-color: #f3f4f6; }
        .checkout-card { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); text-align: center; max-width: 400px; width: 100%; }
        h1 { color: #1f2937; margin-bottom: 1rem; }
        p { color: #4b5563; margin-bottom: 2rem; }
        .pay-button { background: #3b82f6; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: background 0.2s; width: 100%; }
        .pay-button:hover { background: #2563eb; }
        .error-msg { color: #ef4444; margin-bottom: 1rem; font-weight: 500; }
    </style>
</head>
<body>

    <div class="checkout-card">
        <h1>Premium Upgrade</h1>
        <p>You are about to purchase the Premium Mathify package for <strong>Rp 150.000</strong>.</p>
        
        <% if (request.getAttribute("error") != null) { %>
            <div class="error-msg"><%= request.getAttribute("error") %></div>
        <% } %>

        <button id="pay-button" class="pay-button">Proceed to Payment</button>
    </div>

    <script type="text/javascript">
      // For example trigger on button clicked, or any time you need
      var payButton = document.getElementById('pay-button');
      payButton.addEventListener('click', function () {
        // Trigger snap popup. @TODO: Replace TRANSACTION_TOKEN_HERE with your transaction token
        window.snap.pay('${snapToken}', {
          onSuccess: function(result){
            /* You may add your own implementation here */
            alert("Payment success!"); console.log(result);
          },
          onPending: function(result){
            /* You may add your own implementation here */
            alert("Waiting your payment!"); console.log(result);
          },
          onError: function(result){
            /* You may add your own implementation here */
            alert("Payment failed!"); console.log(result);
          },
          onClose: function(){
            /* You may add your own implementation here */
            alert('You closed the popup without finishing the payment');
          }
        })
      });
    </script>
</body>
</html>
