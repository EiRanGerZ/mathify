package com.mathify.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import com.midtrans.Config;
import com.midtrans.service.MidtransSnapApi;
import com.midtrans.service.impl.MidtransSnapApiImpl;

@WebServlet("/checkout")
public class CheckoutServlet extends HttpServlet {
    
    private MidtransSnapApi snapApi;
    private String clientKey;

    @Override
    public void init() throws ServletException {
        // Initialize Midtrans configuration
        String serverKey = System.getenv("MIDTRANS_SERVER_KEY");
        clientKey = System.getenv("MIDTRANS_CLIENT_KEY");
        
        serverKey = (serverKey != null) ? serverKey.trim() : "";
        clientKey = (clientKey != null) ? clientKey.trim() : "";
        
        Config config = Config.builder()
            .setSERVER_KEY(serverKey)
            .setCLIENT_KEY(clientKey)
            .setIsProduction(true) // Production mode
            .build();
            
        snapApi = new MidtransSnapApiImpl(config);
    }

    @Override
    protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws ServletException, IOException {
        
        try {
            // Create a unique order ID for testing
            String orderId = "TEST-" + UUID.randomUUID().toString().substring(0, 8);
            
            // Build the transaction parameters
            Map<String, Object> transactionDetails = new HashMap<>();
            transactionDetails.put("order_id", orderId);
            transactionDetails.put("gross_amount", 150000); // 150,000 IDR
            
            Map<String, Object> params = new HashMap<>();
            params.put("transaction_details", transactionDetails);
            
            // Get the snap token from Midtrans
            String snapToken = snapApi.createTransactionToken(params);
            
            // Pass the token and client key to the JSP
            request.setAttribute("snapToken", snapToken);
            request.setAttribute("clientKey", clientKey);
            
        } catch (Exception e) {
            e.printStackTrace();
            request.setAttribute("error", "Midtrans API Error: " + e.getMessage());
        }
        
        request.getRequestDispatcher("/WEB-INF/jsp/pages/checkout/index.jsp")
                .forward(request, response);
    }
}
