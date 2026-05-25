"use client";

import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { FaCoins, FaCheck, FaSpinner, FaArrowRight, FaGoogle } from "react-icons/fa";

const PLANS = [
  {
    id: "starter",
    name: "Starter Pack",
    credits: 100,
    price: "$10",
    desc: "Perfect for testing home staging layouts",
    features: [
      "20 Room AI Staging Generations",
      "Interactive Before/After Sliders",
      "High-Resolution PNG Downloads",
      "Private Staging Gallery Gallery",
      "Standard Staging Speeds"
    ]
  },
  {
    id: "pro",
    name: "Professional Pack",
    credits: 300,
    price: "$25",
    desc: "Ideal for real estate agents & stylists",
    popular: true,
    features: [
      "60 Room AI Staging Generations",
      "Unlimited Gallery Dashboards",
      "High-Res PNG Downloads",
      "Interactive Before/After Sliders",
      "Priority AI Generation Queue",
      "Dedicated Premium Email Support"
    ]
  },
  {
    id: "business",
    name: "Business Pack",
    credits: 750,
    price: "$50",
    desc: "Best for teams & developers",
    features: [
      "150 Room AI Staging Generations",
      "Unlimited Shared Gallery Dashboards",
      "Commercial High-Res Staging License",
      "Instant AI Generation Speeds",
      "Priority 24/7 Dedicated Support",
      "Team Account Credits Sharing"
    ]
  }
];

export default function PricingPage() {
  const { data: session } = useSession();
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [success, setSuccess] = useState(false);
  const [canceled, setCanceled] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("success")) setSuccess(true);
      if (params.get("canceled")) setCanceled(true);
    }
  }, []);

  const handlePurchase = async (planId) => {
    if (!session?.user) { signIn("google"); return; }
    setLoadingPlan(planId);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId })
      });
      if (res.ok) {
        const d = await res.json();
        if (d.url) window.location.href = d.url;
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-100/50 px-3 py-1 rounded-full shadow-sm">
            Pricing Packages
          </span>
          <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight mt-4">
            Simple, Credit-Based Stager Pricing
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            No recurring monthly subscriptions. Buy stager credits, stage rooms, and download photorealistic renderings anytime. 5 credits per room staged.
          </p>
        </div>

        {/* 1. Transaction Alert States */}
        {success && (
          <div className="bg-emerald-50 border border-emerald-250 rounded-2xl p-5 mb-8 text-center max-w-xl mx-auto shadow-sm animate-in fade-in zoom-in duration-200">
            <div className="h-10 w-10 bg-emerald-500 rounded-full flex items-center justify-center text-white mx-auto mb-3 shadow">
              <FaCheck className="text-sm" />
            </div>
            <h3 className="text-sm font-bold text-emerald-950">Purchase Successful!</h3>
            <p className="text-xs text-emerald-600 leading-relaxed mt-1 max-w-sm mx-auto">
              Your credits have been added successfully to your account. You can now return to the workspace to virtually stage new rooms!
            </p>
            <button
              onClick={() => window.location.href = "/"}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-all cursor-pointer shadow-sm shadow-emerald-100"
            >
              Go to Room Stager <FaArrowRight className="text-[9px]" />
            </button>
          </div>
        )}

        {canceled && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8 text-center max-w-xl mx-auto shadow-sm animate-in fade-in zoom-in duration-200">
            <h3 className="text-sm font-bold text-amber-950">Transaction Canceled</h3>
            <p className="text-xs text-amber-600 mt-0.5">
              The Stripe checkout session was closed. No charges were made to your card.
            </p>
          </div>
        )}

        {/* 2. Pricing Package Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PLANS.map((plan) => {
            const isLoading = loadingPlan === plan.id;
            return (
              <div
                key={plan.id}
                className={`bg-white border rounded-2xl overflow-hidden p-6 flex flex-col justify-between shadow-sm transition-all hover:shadow-md hover:scale-[1.01] relative ${
                  plan.popular
                    ? "border-indigo-500 ring-2 ring-indigo-500/10 scale-[1.02] z-10"
                    : "border-slate-100"
                }`}
              >
                {/* Popular Ribbon overlay */}
                {plan.popular && (
                  <span className="absolute top-3 right-3 text-[9px] font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded shadow-sm">
                    Popular Option
                  </span>
                )}

                {/* Tier content */}
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">{plan.name}</h3>
                  <p className="text-[11px] text-slate-400 font-medium mt-1 leading-snug">{plan.desc}</p>
                  
                  {/* Big price display */}
                  <div className="flex items-baseline gap-1 my-5">
                    <span className="text-3xl font-extrabold text-slate-950">{plan.price}</span>
                    <span className="text-xs text-slate-400 font-bold">one-time</span>
                  </div>

                  {/* Feature lists */}
                  <ul className="space-y-2.5 text-xs text-slate-600 mb-6">
                    <li className="flex items-center gap-2 text-indigo-600 font-bold bg-indigo-50/50 border border-indigo-100/35 px-2.5 py-1.5 rounded-lg mb-4">
                      <FaCoins className="text-amber-500 text-xs animate-pulse" />
                      <span>{plan.credits} Stager Credits</span>
                    </li>
                    
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 leading-relaxed">
                        <FaCheck className="text-indigo-500 text-[10px] flex-shrink-0 mt-1" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Action button */}
                <button
                  onClick={() => handlePurchase(plan.id)}
                  disabled={isLoading}
                  className={`w-full py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
                    plan.popular
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100"
                      : "bg-slate-900 hover:bg-slate-800 text-white shadow-slate-100"
                  }`}
                >
                  {isLoading ? (
                    <FaSpinner className="animate-spin text-xs text-white" />
                  ) : !session?.user ? (
                    <>
                      <FaGoogle className="text-[10px] opacity-80" />
                      <span>Sign in to Purchase</span>
                    </>
                  ) : (
                    <span>Get {plan.credits} Credits</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
