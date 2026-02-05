import AuthButton from "@/components/ui/AuthButton";
import { Button } from "@/components/ui/button";
import ProductForm from "@/components/ui/ProductForm";
import { createClient } from "@/utils/supabase/server";
import { Bell, LogIn, Rabbit, Shield, TrendingDown } from "lucide-react";
import Image from "next/image";
import { getProducts } from "./actions";
import ProductCard from "@/components/ui/ProductCard";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const products = user ? await getProducts() : [];

  const FEATURES = [
    {
      icon: Rabbit,
      title: "Fast Price Tracking",
      description:
        "Runs silently in the background — even on dynamic product pages.",
    },
    {
      icon: Shield,
      title: "Works Everywhere",
      description:
        "Compatible with major e-commerce sites without breaking.",
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description:
        "We notify you only when prices actually drop.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
          <Image
  src="/logo.jpg"
  width={70}
  height={50}
  alt="DaamTrack"
  className="object-contain"
/>

          </div>
          <AuthButton user={user} />
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-slate-200 text-slate-700 px-5 py-2 rounded-full text-sm font-medium mb-6">
            Price tracking that just works
          </div>

          <h2 className="text-5xl font-bold mb-4 tracking-tight">
            Never Miss a Price Drop
          </h2>

          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
            Paste a product link. We track it. You get notified when it’s
            cheaper. Simple.
          </p>

          <ProductForm user={user} />

          {/* Features (logged out) */}
          {products.length === 0 && (
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
              {FEATURES.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-sm transition"
                >
                  <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Icon className="w-6 h-6 text-indigo-600" />
                  </div>

                  <h3 className="font-semibold mb-2">{title}</h3>
                  <p className="text-sm text-slate-600">{description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Products */}
      {user && products.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pb-20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">
              Your Tracked Products
            </h3>
            <span className="text-sm text-slate-500">
              {products.length}{" "}
              {products.length === 1 ? "product" : "products"}
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 items-start">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {user && products.length === 0 && (
        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <div className="bg-white rounded-xl border border-slate-200 p-12">
            <TrendingDown className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Nothing tracked yet
            </h3>
            <p className="text-slate-600">
              Add a product above and we’ll watch the price for you.
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
