import React from 'react';
import { Check, Loader2 } from 'lucide-react';
import { usePricing } from '../features/pricing/hooks/usePricing';

const Pricing: React.FC = () => {
  const { data: plans, isLoading, isError } = usePricing();

  return (
    <section id="pricing" className="py-20 relative bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold tracking-wide uppercase text-sm">
            Subscription Plans
          </span>
          <h2 className="section-title">
            Flexible Membership <span className="gradient-text">Pricing</span>
          </h2>
          <p className="section-subtitle">
            Choose the membership that best fits your goals. Upgrade, downgrade, or cancel anytime.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12 text-primary">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : isError ? (
          <p className="text-center text-red-400">Failed to load pricing plans from API.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {plans?.map((plan) => (
              <div
                key={plan.id}
                className={`relative glass-card p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 ${
                  plan.isPopular ? 'border-2 border-primary shadow-2xl shadow-primary/20' : ''
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                    Most Popular
                  </div>
                )}

                <div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-black text-white">{plan.price}</span>
                    <span className="text-gray-400 font-medium">{plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                        <div className="bg-primary/20 p-1 rounded-full text-primary">
                          <Check className="w-4 h-4" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className={`w-full py-3.5 rounded-xl font-bold transition-all duration-200 ${
                    plan.isPopular
                      ? 'btn-primary shadow-lg shadow-primary/30'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  Choose {plan.name}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Pricing;
