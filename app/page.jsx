import AuthButton from "@/components/ui/AuthButton";
import { Button } from "@/components/ui/button";
import ProductForm from "@/components/ui/ProductForm";
import { createClient } from "@/utils/supabase/server";
import { Bell, LogIn, Rabbit, Shield, TrendingDown } from "lucide-react";
import Image from "next/image";


export default async function Home() {

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

const products = [];

const FEATURES = [
  {
    icon: Rabbit,
    title: "Fast Price Tracking",
    description:
      "Checks prices automatically in the background — even on pages with dynamic content.",
  },
  {
    icon: Shield,
    title: "Reliable on Every Store",
    description:
      "Works smoothly across major e-commerce sites without breaking or getting blocked.",
  },
  {
    icon: Bell,
    title: "Alerts That Matter",
    description:
      "We only notify you when the price actually drops — not for random changes.",
  },
];


  return (
    <main className="min-h-screen bg-linear-to-br from-amber-50 via-white to-amber-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        {/* logo , auth */}
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image
              src={"/logo.jpg"}
              width={65}
              height={100}
              alt="DaamTrack"
              className="h-10 w-auto"
            />
          </div>

        <AuthButton user={user}/>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-6 py-2 rounded-full text-sm font-medium mb-6">
            Simple • Clean • Built for real shoppers
          </div>

          <h2 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Track Prices Before They Drop
          </h2>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Add any product link, and we’ll keep an eye on it for you. Get
            notified when the price falls — no manual checking, no hassle.
          </p>

          <ProductForm user={user}></ProductForm>

          {/* Features -> NOT LOGGED IN*/}
          {products.length === 0 && (
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
              {FEATURES.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="bg-white p-6 rounded-xl border border-amber-200"
                >
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Icon className="w-6 h-6 text-amber-600" />
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-2">
                    {title}
                  </h3>

                  <p className="text-sm text-gray-600">{description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {user && products.length === 0 && (
        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12">
            <TrendingDown className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products yet
            </h3>
            <p className="text-gray-600">
              Add your first product above to start tracking prices!
            </p>
          </div>
        </section>
      )}


    </main>
  );
}
