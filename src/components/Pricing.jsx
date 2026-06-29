
export default function Pricing() {
  const plans = [
    { name: "Basic", price: "$20" },
    { name: "Pro", price: "$40" },
    { name: "Elite", price: "$60" },
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <h2 className="text-center text-3xl font-bold text-yellow-500 mb-10">
        Pricing
      </h2>

      <div className="container mx-auto grid md:grid-cols-3 gap-6 px-6">
        {plans.map((p, i) => (
          <div key={i} className="p-6 bg-gray-100 rounded-xl text-center">
            <h3 className="text-xl font-bold">{p.name}</h3>
            <p className="text-2xl my-4">{p.price}</p>
            <button className="btn-primary">Choose</button>
          </div>
        ))}
      </div>
    </section>
  );
}