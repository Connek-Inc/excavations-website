<script>
    import { onMount } from "svelte";
    import paymentData from "./paymentData";
    import { language } from "./store/store";
   
    

async function sendPaymentRequest(token) {
  const paymentResponse = await fetch("https://api.moneris.com/gateway/v2/purchase", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...$paymentData,
      payment_id: "your_unique_payment_id",
      order_id: "your_unique_order_id",
      amount: "10.00",
      language: "eng",
      payment_method: "credit_card",
      crypt_type: "01",
      cvd: $paymentData.cvv
    })
  });

  if (paymentResponse.ok) {
    const paymentData = await paymentResponse.json();
    console.log("Pago exitoso:", paymentData);
  } else {
    console.error("Error en la solicitud de pago:", paymentResponse);
  }
}

async function handlePayment() {
  // Obtén el token de acceso utilizando tus credenciales de cliente
  // Puedes personalizar esta función según las necesidades de tu aplicación
  const clientId = "YOUR_CLIENT_ID";
  const clientSecret = "YOUR_CLIENT_SECRET";

  try {
    const response = await fetch("https://api.moneris.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.access_token;
      await sendPaymentRequest(token);
    } else {
      console.error("Error al obtener el token de acceso:", response);
    }
  } catch (error) {
    console.error("Error en la solicitud de pago:", error);
  }
}

</script>

<div id='moneris-form' class="lg:px-16 sm:px-4 px-4">
    <div class="flex justify-center items-center">
        <div class="flex flex-col w-full">
            <div class="mb-5">
                <label for="amount" class="mb-2 text-sm text-gray-600">Amount</label>
                <input type="number" bind:value={paymentData.amount} name="amount" id="amount" placeholder='Amount' required
                class="pl-4 pr-12 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 
                                
                                focus:border-transparent w-full"
                            >
            </div>
        </div>
    </div>
</div>  
<div id='moneris-form' class="lg:px-16 sm:px-4 px-4">
    <div class="flex justify-center items-center">
        <div class="flex flex-col w-full">
            <div class="mb-5">
                <label for="card_number" class="mb-2 text-sm text-gray-600">Card Number:</label>
                <input type="text" bind:value={paymentData.cardNumber} name="card_number" id="card_number" placeholder='Card Number' required
                class="pl-4 pr-12 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 
                                
                                focus:border-transparent w-full"
                            >
            </div>
        </div>
    </div>
</div>  
<div id='moneris-form' class="lg:px-16 sm:px-4 px-4">
    <div class="flex justify-center items-center">
        <div class="flex flex-col w-full">
            <div class="mb-5">
                <label for="expiryDate" class="mb-2 text-sm text-gray-600">Expiry Date:</label>
                <input type="text" bind:value={paymentData.expiryDate} name="expiryDate" id="expiryDate" placeholder='Expiry Date' required
                class="pl-4 pr-12 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 
                                
                                focus:border-transparent w-full"
                            >
            </div>
        </div>
    </div>
</div>  
<div id='moneris-form' class="lg:px-16 sm:px-4 px-4">
    <div class="flex justify-center items-center">
        <div class="flex flex-col w-full">
            <div class="mb-5">
                <label for="expiryDate" class="mb-2 text-sm text-gray-600">CVV:</label>
                <input type="text" bind:value={paymentData.cvv} name="cvv" id="cvv" placeholder='CVV' required
                class="pl-4 pr-12 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 
                                
                                focus:border-transparent w-full"
                            >
            </div>
        </div>
    </div>
</div>  

<div class="mt-10 flex justify-center items-center">
    <button on:click={handlePayment} class="p-4 text-sm w-48 font-medium text-black bg-[#febd17] rounded">
    {#if $language == 'en'}
        Send
    {:else}
        Envoyer    
    {/if}
    </button>
</div>
