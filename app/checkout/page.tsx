"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, getTotalPrice } =
    useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<"delivery" | "payment">(
    "delivery"
  );
  const [deliveryData, setDeliveryData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });

  const handleDeliveryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeliveryData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\s/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim();
      if (formattedValue.length > 19)
        formattedValue = formattedValue.slice(0, 19);
    }

    // Format expiry date as MM/YY
    if (name === "expiryDate") {
      formattedValue = value.replace(/\D/g, "");
      if (formattedValue.length >= 2) {
        formattedValue =
          formattedValue.slice(0, 2) + "/" + formattedValue.slice(2, 4);
      }
      if (formattedValue.length > 5)
        formattedValue = formattedValue.slice(0, 5);
    }

    // Limit CVV to 4 digits
    if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
    }

    setPaymentData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const isDeliveryComplete = () => {
    return (
      deliveryData.fullName.trim() !== "" &&
      deliveryData.email.trim() !== "" &&
      deliveryData.phone.trim() !== "" &&
      deliveryData.address.trim() !== "" &&
      deliveryData.city.trim() !== "" &&
      deliveryData.state.trim() !== "" &&
      deliveryData.postalCode.trim() !== ""
    );
  };

  const isPaymentComplete = () => {
    const cardNumberDigits = paymentData.cardNumber.replace(/\s/g, "");
    return (
      paymentData.cardName.trim() !== "" &&
      cardNumberDigits.length >= 13 &&
      cardNumberDigits.length <= 19 &&
      paymentData.expiryDate.length === 5 &&
      paymentData.cvv.length >= 3 &&
      paymentData.cvv.length <= 4
    );
  };

  const handleDeliverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isDeliveryComplete()) {
      setCurrentStep("payment");
      toast.success("Delivery details saved!");
    } else {
      toast.error("Please fill in all delivery details");
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPaymentComplete()) {
      toast.error("Please fill in all payment details correctly");
      return;
    }

    // Basic card validation
    const cardNumberDigits = paymentData.cardNumber.replace(/\s/g, "");
    if (cardNumberDigits.length < 13 || cardNumberDigits.length > 19) {
      toast.error("Please enter a valid card number");
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2500));

      // Simulate potential payment failure (10% chance for demo)
      const paymentSuccess = Math.random() > 0.1;

      if (paymentSuccess) {
        // Show success toast first
        toast.success("Payment successful! Order confirmed.", {
          icon: "✅",
          duration: 3000,
        });

        // Clear cart after a brief delay
        setTimeout(() => {
          clearCart();
        }, 500);

        // Redirect to products page after showing success
        setTimeout(() => {
          router.push("/products");
        }, 2000);
      } else {
        setIsProcessing(false);
        toast.error(
          "Payment failed. Please check your card details and try again.",
          {
            duration: 4000,
          }
        );
      }
    } catch (error) {
      setIsProcessing(false);
      toast.error("An error occurred during payment. Please try again.");
      console.error("Payment error:", error);
    }
  };

  const totalPrice = getTotalPrice();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white py-16 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Your cart is empty
          </h1>
          <button
            onClick={() => router.push("/products")}
            className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 relative">
      {/* Full Page Loader Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center animate-fadeIn">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl animate-scaleIn">
            <div className="mb-6">
              <svg
                className="animate-spin h-16 w-16 mx-auto text-accent"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-primary mb-2">
              Processing Payment
            </h3>
            <p className="text-gray-600">
              Please wait while we process your payment...
            </p>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">
          Checkout
        </h1>

        {/* Progress Steps */}
        <div className="mb-8 flex items-center justify-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  currentStep === "delivery"
                    ? "bg-accent text-white scale-110"
                    : currentStep === "payment"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {currentStep === "payment" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                ) : (
                  "1"
                )}
              </div>
              <span
                className={`ml-2 font-medium ${
                  currentStep === "delivery" || currentStep === "payment"
                    ? "text-primary"
                    : "text-gray-400"
                }`}
              >
                Delivery
              </span>
            </div>
            <div
              className={`h-1 w-24 transition-all duration-300 ${
                currentStep === "payment" ? "bg-accent" : "bg-gray-200"
              }`}
            ></div>
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  currentStep === "payment"
                    ? "bg-accent text-white scale-110"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                2
              </div>
              <span
                className={`ml-2 font-medium ${
                  currentStep === "payment" ? "text-primary" : "text-gray-400"
                }`}
              >
                Payment
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cart Items */}
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6">
              Order Summary
            </h2>
            <div className="space-y-4 mb-6">
              {cart.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center bg-secondary p-4 rounded-lg animate-slideUp hover:shadow-md transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-primary truncate">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {item.selectedColor || item.color}{" "}
                      {item.selectedSize
                        ? `• ${item.selectedSize}`
                        : item.spec
                        ? `• ${item.spec}`
                        : ""}
                    </p>
                    <p className="text-accent font-semibold">
                      ₦{item.price.toLocaleString("en-NG")}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-opacity-80 transition-all duration-300 hover:scale-110 active:scale-95"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-opacity-80 transition-all duration-300 hover:scale-110 active:scale-95"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-4 text-red-500 hover:text-red-700 transition-all duration-300 hover:scale-110 active:scale-95"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-xl font-bold text-primary">
                <span>Total:</span>
                <span className="text-accent">
                  ₦{totalPrice.toLocaleString("en-NG")}
                </span>
              </div>
            </div>
          </div>

          {/* Forms Section */}
          <div>
            {currentStep === "delivery" ? (
              <div className="animate-slideInRight">
                <h2 className="text-2xl font-semibold text-primary mb-6">
                  Delivery Details
                </h2>
                <form onSubmit={handleDeliverySubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-primary mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      value={deliveryData.fullName}
                      onChange={handleDeliveryChange}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-primary mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={deliveryData.email}
                      onChange={handleDeliveryChange}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300"
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-primary mb-2"
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={deliveryData.phone}
                      onChange={handleDeliveryChange}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300"
                      placeholder="+234 800 000 0000"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-primary mb-2"
                    >
                      Street Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      required
                      value={deliveryData.address}
                      onChange={handleDeliveryChange}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300"
                      placeholder="123 Main Street"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-primary mb-2"
                      >
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        required
                        value={deliveryData.city}
                        onChange={handleDeliveryChange}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300"
                        placeholder="Lagos"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium text-primary mb-2"
                      >
                        State *
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        required
                        value={deliveryData.state}
                        onChange={handleDeliveryChange}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300"
                        placeholder="Lagos State"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="postalCode"
                      className="block text-sm font-medium text-primary mb-2"
                    >
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      required
                      value={deliveryData.postalCode}
                      onChange={handleDeliveryChange}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300"
                      placeholder="100001"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!isDeliveryComplete()}
                    className="w-full bg-accent text-white py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center shadow-lg hover:shadow-xl"
                  >
                    Continue to Payment
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5 ml-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </button>
                </form>
              </div>
            ) : (
              <div className="animate-slideInRight">
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5 text-green-600 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-sm text-green-700">
                      Delivery details saved. You can{" "}
                      <button
                        onClick={() => setCurrentStep("delivery")}
                        className="text-green-600 underline font-semibold hover:text-green-800"
                      >
                        edit
                      </button>{" "}
                      if needed.
                    </p>
                  </div>
                </div>

                <h2 className="text-2xl font-semibold text-primary mb-6">
                  Payment Details
                </h2>
                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="cardName"
                      className="block text-sm font-medium text-primary mb-2"
                    >
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      required
                      value={paymentData.cardName}
                      onChange={handlePaymentChange}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cardNumber"
                      className="block text-sm font-medium text-primary mb-2"
                    >
                      Card Number *
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      required
                      value={paymentData.cardNumber}
                      onChange={handlePaymentChange}
                      maxLength={19}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="expiryDate"
                        className="block text-sm font-medium text-primary mb-2"
                      >
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        required
                        value={paymentData.expiryDate}
                        onChange={handlePaymentChange}
                        maxLength={5}
                        placeholder="MM/YY"
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="cvv"
                        className="block text-sm font-medium text-primary mb-2"
                      >
                        CVV *
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        required
                        value={paymentData.cvv}
                        onChange={handlePaymentChange}
                        maxLength={4}
                        placeholder="123"
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isProcessing || !isPaymentComplete()}
                    className="w-full bg-accent text-white py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center shadow-lg hover:shadow-xl"
                  >
                    {isProcessing ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
