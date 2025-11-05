"use client";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-secondary to-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center animate-slideUp">
            {/* <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              About Section Eight
            </h1> */}
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed text-black">
              Where Quality Meets Style - Curating Premium Products for Your
              Lifestyle
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Mission Section */}
          <div className="mb-20 animate-slideUp">
            <div className="bg-gradient-to-r from-secondary to-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Our Mission
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  At Section Eight, we are passionate about curating premium
                  products that enhance your lifestyle and reflect your unique
                  personality. We believe that great products should be
                  accessible to everyone.
                </p>
                <p>
                  Our mission is to provide you with carefully selected products
                  that combine exceptional craftsmanship, timeless design, and
                  outstanding value. Every item in our collection is chosen with
                  meticulous attention to detail.
                </p>
                <p>
                  We work directly with manufacturers and artisans to bring you
                  the best quality at fair prices, ensuring that quality meets
                  style in every purchase.
                </p>
              </div>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 animate-slideUp">
              <div className="bg-gradient-to-br from-accent to-accent/80 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4 text-center group-hover:text-accent transition-colors">
                Quality First
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                We only offer products that meet our high standards of quality
                and durability. Every item is carefully vetted before it reaches
                you.
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 animate-slideUp animation-delay-200">
              <div className="bg-gradient-to-br from-accent to-accent/80 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4 text-center group-hover:text-accent transition-colors">
                Customer Focus
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Your satisfaction is our top priority. We're here to help you
                find the perfect products and provide exceptional service every
                step of the way.
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 animate-slideUp animation-delay-400">
              <div className="bg-gradient-to-br from-accent to-accent/80 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4 text-center group-hover:text-accent transition-colors">
                Sustainable
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                We're committed to sustainable practices and ethical sourcing.
                Our products are chosen with environmental and social
                responsibility in mind.
              </p>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="bg-gradient-to-br from-secondary/50 to-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100 animate-slideUp">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
              Why Choose Section Eight?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <div className="bg-accent text-white rounded-lg p-3 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">
                    Curated Selection
                  </h3>
                  <p className="text-gray-600">
                    Each product is handpicked by our team of experts to ensure
                    quality and style.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-accent text-white rounded-lg p-3 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m18 0v2.625A1.125 1.125 0 0118.375 18h-2.25m-6 0H3.375m0 0H1.5m1.5 0v-2.25m0-2.25v-2.25m0 0h15m-15 0v2.25m0 2.25v2.25m0 0h15m-15 0H3.375m0 0H1.5m15 0v2.25m0-2.25v2.25m0 2.25H21.75m-15 0h15"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">
                    Fast Delivery
                  </h3>
                  <p className="text-gray-600">
                    Quick and reliable shipping across Nigeria to get your
                    products to you fast.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-accent text-white rounded-lg p-3 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">
                    Secure Payment
                  </h3>
                  <p className="text-gray-600">
                    Your transactions are safe and secure with our encrypted
                    payment system.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-accent text-white rounded-lg p-3 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">
                    30-Day Returns
                  </h3>
                  <p className="text-gray-600">
                    Not satisfied? Return your purchase within 30 days for a
                    full refund.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
